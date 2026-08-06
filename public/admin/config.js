const CONFIG_TABS = [
  { key: 'usuarios', label: 'Usuários' },
  { key: 'seo', label: 'SEO' },
  { key: 'integracoes', label: 'Integrações' },
  { key: 'logs', label: 'Logs' },
];

(async function init() {
  const session = await requireSession();
  const hashKey = (location.hash || '#usuarios').slice(1);
  const initialKey = CONFIG_TABS.some((t) => t.key === hashKey) ? hashKey : 'usuarios';

  const content = renderShell(`config-${initialKey}`, { title: 'Configurações', user: session });
  content.appendChild(UI.el('p', { class: 'page-lead', text: 'Usuários, SEO, integrações e logs do sistema.' }));

  let realPages = [];
  try {
    const res = await apiFetch('/api/pages');
    realPages = await res.json();
  } catch (err) { /* segue só com mock se a API falhar */ }

  const panel = UI.el('div', { class: 'fade-in' });
  const tabsBar = UI.tabs({
    items: CONFIG_TABS,
    activeKey: initialKey,
    onChange: (key) => { location.hash = key; renderPanel(key); },
  });
  content.appendChild(tabsBar);
  content.appendChild(panel);

  window.addEventListener('hashchange', () => {
    const key = location.hash.slice(1);
    if (CONFIG_TABS.some((t) => t.key === key)) renderPanel(key);
  });

  renderPanel(initialKey);

  function renderPanel(key) {
    updateActiveNav(`config-${key}`);
    panel.innerHTML = '';

    if (key === 'usuarios') {
      const rows = [
        { email: session.email, papel: 'Administrador', ultimoAcesso: new Date().toISOString(), status: 'ativo', real: true },
        ...MOCK.outrosUsuarios.map((u) => ({ ...u, real: false })),
      ];
      const table = UI.dataTable({
        title: 'Usuários com acesso ao painel',
        columns: [
          { key: 'email', label: 'E-mail', sortable: true, render: (u) => UI.el('span', {}, [document.createTextNode(u.email + (u.real ? ' (você) ' : ' ')), !u.real ? UI.mockBadge() : null]) },
          { key: 'papel', label: 'Papel' },
          { key: 'ultimoAcesso', label: 'Último acesso', sortable: true, render: (u) => timeAgo(u.ultimoAcesso) },
          { key: 'status', label: 'Status', render: (u) => UI.badge(u.status === 'ativo' ? 'Ativo' : 'Inativo', u.status === 'ativo' ? 'success' : 'neutral') },
        ],
        fetchPage: ({ page, pageSize, search }) => {
          const items = rows.filter((u) => !search || u.email.toLowerCase().includes(search.toLowerCase()));
          return paginate(items, { page, pageSize });
        },
        pageSize: 8,
        searchPlaceholder: 'Pesquisar usuário…',
      });
      panel.appendChild(table.el);
      panel.appendChild(UI.el('div', { class: 'section-block' }, [
        UI.el('button', { class: 'btn btn--primary btn--sm', type: 'button', text: '+ Convidar usuário', onclick: () => UI.toast('Gestão de múltiplos usuários ainda não existe no backend (só admin_users por seed/CLI) — em breve.', { variant: 'info', duration: 4200 }) }),
      ]));
    }

    if (key === 'seo') {
      const body = UI.el('div');
      const source = realPages.length ? realPages : Object.keys(MOCK.seoScorePorPagina).map((slug) => ({ slug, title: slug }));
      source.forEach((p) => {
        const score = MOCK.seoScorePorPagina[p.slug] ?? 70;
        const tone = score >= 80 ? 'success' : score >= 60 ? 'warning' : 'danger';
        body.appendChild(UI.el('div', { style: 'margin-bottom:14px;' }, [
          UI.el('div', { style: 'display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;' }, [UI.el('span', { text: p.title }), UI.el('span', { text: `${score}/100` })]),
          UI.el('div', { class: 'ui-progress' }, [UI.el('div', { class: `ui-progress__fill ui-progress__fill--${tone}`, style: `width:${score}%` })]),
        ]));
      });
      panel.appendChild(UI.card({ title: 'SEO score por página', mock: true, bodyNode: body }));
    }

    if (key === 'integracoes') {
      const table = UI.dataTable({
        title: 'Integrações disponíveis',
        columns: [
          { key: 'nome', label: 'Serviço', sortable: true },
          { key: 'status', label: 'Status', render: (i) => UI.badge(i.status, i.status === 'conectado' ? 'success' : 'neutral') },
        ],
        fetchPage: ({ page, pageSize, search }) => {
          const items = MOCK.integracoes.filter((i) => !search || i.nome.toLowerCase().includes(search.toLowerCase()));
          return paginate(items, { page, pageSize });
        },
        pageSize: 8,
        searchPlaceholder: 'Pesquisar integração…',
        rowActions: (i) => [UI.el('button', { class: 'btn btn--sm', type: 'button', text: 'Conectar', onclick: () => UI.toast(`Integração com ${i.nome} ainda não implementada.`, { variant: 'info' }) })],
      });
      panel.appendChild(table.el);
    }

    if (key === 'logs') {
      const table = UI.dataTable({
        title: 'Logs de atividade',
        columns: [
          { key: 'acao', label: 'Ação', sortable: true },
          { key: 'ator', label: 'Ator' },
          { key: 'quando', label: 'Quando', sortable: true, render: (l) => timeAgo(l.quando) },
          { key: 'nivel', label: 'Nível', render: (l) => UI.badge(l.nivel === 'alerta' ? 'Alerta' : 'Info', l.nivel === 'alerta' ? 'warning' : 'info') },
        ],
        filters: [{ key: 'nivel', label: 'Nível', value: '', options: [{ value: '', label: 'Todos' }, { value: 'info', label: 'Info' }, { value: 'alerta', label: 'Alerta' }] }],
        fetchPage: ({ page, pageSize, search, filters, sortKey, sortDir }) => {
          let items = MOCK.logs.filter((l) => {
            if (filters.nivel && l.nivel !== filters.nivel) return false;
            if (search && !`${l.acao} ${l.ator}`.toLowerCase().includes(search.toLowerCase())) return false;
            return true;
          });
          if (sortKey) items = [...items].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (sortDir === 'asc' ? 1 : -1));
          return paginate(items, { page, pageSize });
        },
        pageSize: 8,
        searchPlaceholder: 'Pesquisar log…',
      });
      panel.appendChild(table.el);
    }
  }
})();
