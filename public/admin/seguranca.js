const SEGURANCA_TABS = [
  { key: 'historico', label: 'Histórico de Versões' },
  { key: 'lixeira', label: 'Lixeira' },
  { key: 'backups', label: 'Backups' },
];

(async function init() {
  const session = await requireSession();
  const hashKey = (location.hash || '#historico').slice(1);
  const initialKey = SEGURANCA_TABS.some((t) => t.key === hashKey) ? hashKey : 'historico';

  const content = renderShell(`seguranca-${initialKey}`, { title: 'Segurança', user: session });
  content.appendChild(UI.el('p', { class: 'page-lead', text: 'Histórico de alterações, itens excluídos e backups do site.' }));

  let allBlocks = [];
  let dbOnline = true;
  try {
    const res = await apiFetch('/api/pages');
    const pages = await res.json();
    const perPage = await Promise.all(
      pages.map(async (p) => {
        const r = await apiFetch(`/api/pages/${encodeURIComponent(p.slug)}/blocks`);
        const data = await r.json();
        return (data.blocks || []).map((b) => ({ ...b, pageTitle: p.title, pageSlug: p.slug }));
      })
    );
    allBlocks = perPage.flat();
  } catch (err) {
    dbOnline = false;
  }

  const panel = UI.el('div', { class: 'fade-in' });
  const tabsBar = UI.tabs({
    items: SEGURANCA_TABS,
    activeKey: initialKey,
    onChange: (key) => { location.hash = key; renderPanel(key); },
  });
  content.appendChild(tabsBar);
  content.appendChild(panel);

  window.addEventListener('hashchange', () => {
    const key = location.hash.slice(1);
    if (SEGURANCA_TABS.some((t) => t.key === key)) renderPanel(key);
  });

  renderPanel(initialKey);

  function notImplementedYet(action) {
    UI.toast(`${action} — depende de uma tabela de versionamento que ainda não existe no banco. Em breve.`, { variant: 'info', duration: 4200 });
  }

  function renderPanel(key) {
    updateActiveNav(`seguranca-${key}`);
    panel.innerHTML = '';

    if (key === 'historico') {
      if (!dbOnline) {
        panel.appendChild(UI.errorState({ message: 'Não foi possível carregar o histórico.', onRetry: () => window.location.reload() }));
        return;
      }
      const sorted = [...allBlocks].filter((b) => b.updated_at).sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
      const table = UI.dataTable({
        title: `${sorted.length} alterações registradas`,
        columns: [
          { key: 'type', label: 'Bloco', render: (b) => UI.badge(BLOCK_TYPE_LABELS[b.type] || b.type, 'neutral') },
          { key: 'pageTitle', label: 'Página', sortable: true },
          { key: 'label', label: 'Conteúdo', render: (b) => stripTags(blockLabel(b)) },
          { key: 'updated_at', label: 'Atualizado', sortable: true, render: (b) => timeAgo(b.updated_at) },
        ],
        fetchPage: ({ page, pageSize, search, sortKey, sortDir }) => {
          let items = sorted.filter((b) => !search || `${b.pageTitle} ${blockLabel(b)}`.toLowerCase().includes(search.toLowerCase()));
          if (sortKey) items = [...items].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (sortDir === 'asc' ? 1 : -1));
          return paginate(items, { page, pageSize });
        },
        pageSize: 8,
        searchPlaceholder: 'Pesquisar no histórico…',
        emptyState: { icon: '🕓', title: 'Nenhuma alteração registrada ainda' },
        rowActions: (b) => [
          UI.el('button', {
            class: 'btn btn--sm', type: 'button', text: 'Ver versões',
            onclick: () => openVersionsModal(b),
          }),
        ],
      });
      panel.appendChild(table.el);
    }

    if (key === 'lixeira') {
      const table = UI.dataTable({
        title: 'Itens excluídos',
        columns: [
          { key: 'item', label: 'Item', sortable: true },
          { key: 'excluidoEm', label: 'Excluído em', sortable: true, render: (i) => timeAgo(i.excluidoEm) },
          { key: 'excluidoPor', label: 'Excluído por' },
        ],
        fetchPage: ({ page, pageSize, search }) => {
          const items = MOCK.lixeira.filter((i) => !search || i.item.toLowerCase().includes(search.toLowerCase()));
          return paginate(items, { page, pageSize });
        },
        pageSize: 8,
        searchPlaceholder: 'Pesquisar item excluído…',
        emptyState: { icon: '🗑️', title: 'Lixeira vazia' },
        rowActions: (i) => [
          UI.el('button', { class: 'btn btn--sm', type: 'button', text: 'Restaurar', onclick: () => UI.confirmModal({ title: 'Restaurar item', message: `Restaurar "${i.item}"?`, confirmLabel: 'Restaurar', onConfirm: () => notImplementedYet('Restaurar') }) }),
          UI.el('button', { class: 'btn btn--sm btn--danger', type: 'button', text: 'Excluir definitivo', onclick: () => UI.confirmModal({ title: 'Excluir definitivamente', message: `Esta ação não pode ser desfeita. Excluir "${i.item}"?`, confirmLabel: 'Excluir', danger: true, onConfirm: () => notImplementedYet('Exclusão definitiva') }) }),
        ],
      });
      panel.appendChild(UI.el('div', { style: 'margin-bottom:12px;' }, [UI.mockBadge()]));
      panel.appendChild(table.el);
    }

    if (key === 'backups') {
      const actionsBar = UI.el('div', { class: 'section-block' }, [
        UI.el('button', { class: 'btn btn--primary btn--sm', type: 'button', text: '+ Criar backup agora', onclick: () => notImplementedYet('Criar backup') }),
      ]);
      panel.appendChild(actionsBar);
      const table = UI.dataTable({
        title: 'Backups',
        columns: [
          { key: 'nome', label: 'Nome', sortable: true },
          { key: 'data', label: 'Data', sortable: true, render: (b) => formatDate(b.data) },
          { key: 'tamanho', label: 'Tamanho' },
          { key: 'status', label: 'Status', render: (b) => UI.badge(b.status === 'ok' ? 'OK' : 'Falha', b.status === 'ok' ? 'success' : 'danger') },
        ],
        fetchPage: ({ page, pageSize, search, sortKey, sortDir }) => {
          let items = MOCK.backups.filter((b) => !search || b.nome.toLowerCase().includes(search.toLowerCase()));
          if (sortKey) items = [...items].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (sortDir === 'asc' ? 1 : -1));
          return paginate(items, { page, pageSize });
        },
        pageSize: 8,
        searchPlaceholder: 'Pesquisar backup…',
        rowActions: (b) => [UI.el('button', { class: 'btn btn--sm', type: 'button', text: 'Restaurar', onclick: () => UI.confirmModal({ title: 'Restaurar backup', message: `Restaurar o site para "${b.nome}" (${formatDate(b.data)})?`, confirmLabel: 'Restaurar', danger: true, onConfirm: () => notImplementedYet('Restaurar backup') }) })],
      });
      panel.appendChild(table.el);
    }
  }

  function openVersionsModal(block) {
    const label = stripTags(blockLabel(block));
    const versions = MOCK.gerarHistoricoVersoes(`${BLOCK_TYPE_LABELS[block.type] || block.type} — ${label}`);
    const body = UI.el('div', { class: 'ui-timeline' });
    versions.forEach((v, i) => {
      body.appendChild(UI.el('div', { class: 'ui-timeline__item' }, [
        UI.el('div', { class: 'ui-timeline__dot' }),
        UI.el('div', { class: 'ui-timeline__body' }, [
          UI.el('div', { class: 'ui-timeline__title' }, [
            document.createTextNode(v.resumo + ' '),
            v.versao === 'atual' ? UI.badge('atual', 'success') : null,
          ]),
          UI.el('div', { class: 'ui-timeline__meta', text: `${v.autor} · ${formatDate(v.quando)}` }),
          i > 0 ? UI.el('div', { style: 'margin-top:8px;display:flex;gap:8px;' }, [
            UI.el('button', { class: 'btn btn--sm', type: 'button', text: 'Comparar com atual', onclick: () => notImplementedYet('Comparar versões') }),
            UI.el('button', { class: 'btn btn--sm', type: 'button', text: 'Restaurar esta versão', onclick: () => notImplementedYet('Restaurar versão') }),
          ]) : null,
        ]),
      ]));
    });
    UI.modal({ title: 'Histórico de versões', bodyNode: body });
  }
})();
