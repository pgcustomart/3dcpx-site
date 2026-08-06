(async function init() {
  const session = await requireSession();
  const content = renderShell('dashboard', { title: 'Dashboard', user: session });
  content.appendChild(UI.el('p', { class: 'page-lead', text: 'Visão geral do site e do conteúdo administrado pelo CMS.' }));

  const statsGrid = UI.el('div', { class: 'stats-grid' });
  content.appendChild(statsGrid);
  for (let i = 0; i < 8; i++) statsGrid.appendChild(UI.el('div', { class: 'ui-stat' }, [UI.skeleton('line', 3)]));

  const row1 = UI.el('div', { class: 'grid-2 section-block' });
  const row2 = UI.el('div', { class: 'grid-2 section-block' });
  const row3 = UI.el('div', { class: 'section-block' });
  const row4 = UI.el('div', { class: 'grid-3 section-block' });
  content.appendChild(row1);
  content.appendChild(row2);
  content.appendChild(row3);
  content.appendChild(row4);

  // ── dado real: agrega páginas + blocos via endpoints já existentes ──
  let dbOnline = true;
  let pages = [];
  let allBlocks = [];
  try {
    const res = await apiFetch('/api/pages');
    pages = await res.json();
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

  renderStats();
  renderAcessosEDispositivos();
  renderTrafegoEPaginas();
  renderAtividadesRecentes();
  renderBackupsUploadsStatus();

  function renderStats() {
    const visibleBlocks = allBlocks.filter((b) => b.visible).length;
    const typesCount = new Set(allBlocks.map((b) => b.type)).size;
    const cards = [
      { icon: ICONS.pages, label: 'Páginas', value: dbOnline ? String(pages.length) : '—', mock: false },
      { icon: ICONS.blocks, label: 'Blocos de conteúdo', value: dbOnline ? String(allBlocks.length) : '—', mock: false },
      { icon: ICONS.eye, label: 'Blocos visíveis', value: dbOnline ? `${visibleBlocks}/${allBlocks.length}` : '—', mock: false },
      { icon: ICONS.blocks, label: 'Tipos de bloco em uso', value: dbOnline ? String(typesCount) : '—', mock: false },
      { icon: ICONS.analytics, label: 'Visitas (30 dias)', value: '6.2k', delta: '+8,4% vs. mês anterior', deltaTone: 'up', mock: true },
      { icon: ICONS.target, label: 'Taxa de conversão', value: MOCK.conversoes.taxa, delta: `${MOCK.conversoes.totalMes}/${MOCK.conversoes.metaMes} da meta`, deltaTone: 'neutral', mock: true },
      { icon: ICONS.clock, label: 'Tempo médio por página', value: '2m 24s', mock: true },
      { icon: ICONS.storage, label: 'Espaço utilizado', value: `${MOCK.espacoUtilizado.usadoMb} MB`, delta: `de ${(MOCK.espacoUtilizado.totalMb / 1024).toFixed(0)} GB`, deltaTone: 'neutral', mock: true },
    ];
    statsGrid.innerHTML = '';
    cards.forEach((c) => statsGrid.appendChild(UI.statCard(c)));
  }

  function renderAcessosEDispositivos() {
    const acessosCanvas = UI.el('canvas');
    row1.appendChild(UI.card({
      title: 'Acessos (últimos 7 dias)',
      mock: true,
      bodyNode: UI.el('div', { class: 'ui-chart-wrap' }, [acessosCanvas]),
    }));
    UI.chart(acessosCanvas, {
      type: 'line',
      data: {
        labels: MOCK.acessosPorDia.labels,
        datasets: [{ label: 'Acessos', data: MOCK.acessosPorDia.data, borderColor: '#7c71f5', backgroundColor: 'rgba(124,113,245,0.15)', tension: 0.35, fill: true }],
      },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } },
    });

    const devicesCanvas = UI.el('canvas');
    row1.appendChild(UI.card({
      title: 'Dispositivos',
      mock: true,
      bodyNode: UI.el('div', { class: 'ui-chart-wrap ui-chart-wrap--sm' }, [devicesCanvas]),
    }));
    UI.chart(devicesCanvas, {
      type: 'doughnut',
      data: { labels: MOCK.dispositivos.labels, data: MOCK.dispositivos.data, datasets: [{ data: MOCK.dispositivos.data, backgroundColor: ['#7c71f5', '#d4689f', '#c9a04a'] }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } } },
    });
  }

  function renderTrafegoEPaginas() {
    const trafegoBody = UI.el('div');
    MOCK.origemTrafego.forEach((t) => {
      trafegoBody.appendChild(UI.el('div', { style: 'margin-bottom:12px;' }, [
        UI.el('div', { style: 'display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:5px;' }, [
          UI.el('span', { text: t.origem }),
          UI.el('span', { text: `${t.pct}%` }),
        ]),
        UI.el('div', { class: 'ui-progress' }, [UI.el('div', { class: 'ui-progress__fill', style: `width:${t.pct}%` })]),
      ]));
    });
    row2.appendChild(UI.card({ title: 'Origem de tráfego', mock: true, bodyNode: trafegoBody }));

    const paginasSlot = UI.el('div');
    row2.appendChild(UI.card({ title: 'Páginas mais acessadas', mock: true, bodyNode: paginasSlot }));
    const table = UI.dataTable({
      columns: [
        { key: 'pagina', label: 'Página' },
        { key: 'visitas', label: 'Visitas', sortable: true },
        { key: 'tempoMedio', label: 'Tempo médio' },
      ],
      fetchPage: ({ page, pageSize, sortKey, sortDir }) => {
        let items = [...MOCK.paginasMaisAcessadas];
        if (sortKey) items.sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (sortDir === 'asc' ? 1 : -1));
        return paginate(items, { page, pageSize });
      },
      pageSize: 4,
      searchPlaceholder: 'Filtrar página…',
    });
    paginasSlot.appendChild(table.el);
  }

  function renderAtividadesRecentes() {
    const sorted = [...allBlocks].filter((b) => b.updated_at).sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1)).slice(0, 6);
    const timeline = UI.el('div', { class: 'ui-timeline' });
    if (!dbOnline) {
      timeline.appendChild(UI.errorState({ message: 'Não foi possível carregar as atividades recentes.' }));
    } else if (!sorted.length) {
      timeline.appendChild(UI.emptyState({ icon: '🕓', title: 'Nenhuma atividade registrada ainda' }));
    } else {
      sorted.forEach((b) => {
        const label = b.content && (b.content.titulo || b.content.nome) ? stripTags(b.content.titulo || b.content.nome) : (BLOCK_TYPE_LABELS[b.type] || b.type);
        timeline.appendChild(UI.el('div', { class: 'ui-timeline__item' }, [
          UI.el('div', { class: 'ui-timeline__dot' }),
          UI.el('div', { class: 'ui-timeline__body' }, [
            UI.el('div', { class: 'ui-timeline__title', text: `${BLOCK_TYPE_LABELS[b.type] || b.type} atualizado em ${b.pageTitle}` }),
            UI.el('div', { class: 'ui-timeline__meta', text: `${label} · ${timeAgo(b.updated_at)}` }),
          ]),
        ]));
      });
    }
    row3.appendChild(UI.card({ title: 'Atividades recentes', actions: [UI.el('a', { href: 'seguranca.html#historico', class: 'btn btn--sm', text: 'Ver histórico completo' })], bodyNode: timeline }));
  }

  function renderBackupsUploadsStatus() {
    const backupsBody = UI.el('div');
    MOCK.backups.slice(0, 3).forEach((b) => {
      backupsBody.appendChild(UI.el('div', { style: 'display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:12.5px;' }, [
        UI.el('span', { text: b.nome }),
        UI.badge(b.status === 'ok' ? 'OK' : 'Falha', b.status === 'ok' ? 'success' : 'danger'),
      ]));
    });
    row4.appendChild(UI.card({ title: 'Últimos backups', mock: true, actions: [UI.el('a', { href: 'seguranca.html#backups', class: 'btn btn--sm', text: 'Ver todos' })], bodyNode: backupsBody }));

    const uploadsBody = UI.el('div');
    MOCK.uploadsRecentes.slice(0, 3).forEach((u) => {
      uploadsBody.appendChild(UI.el('div', { style: 'display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:12.5px;' }, [
        UI.el('span', { text: u.nome }),
        UI.el('span', { style: 'color:var(--text-2);', text: timeAgo(u.quando) }),
      ]));
    });
    row4.appendChild(UI.card({ title: 'Últimos uploads', mock: true, actions: [UI.el('a', { href: 'midia.html', class: 'btn btn--sm', text: 'Ver mídia' })], bodyNode: uploadsBody }));

    const statusBody = UI.el('div');
    const statusItems = [
      { nome: 'Site', ok: true, real: true },
      { nome: 'PostgreSQL', ok: dbOnline, real: true },
      { nome: 'Cloudinary', ok: MOCK.statusInfra.cloudinary === 'operacional', real: false },
      { nome: 'Railway', ok: MOCK.statusInfra.railway === 'operacional', real: false },
    ];
    statusItems.forEach((s) => {
      statusBody.appendChild(UI.el('div', { style: 'display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--border);font-size:12.5px;' }, [
        UI.el('span', {}, [document.createTextNode(s.nome + ' '), !s.real ? UI.mockBadge() : null]),
        UI.badge(s.ok ? 'Online' : 'Instável', s.ok ? 'success' : 'danger'),
      ]));
    });
    row4.appendChild(UI.card({ title: 'Status do sistema', actions: [UI.el('a', { href: 'config.html#integracoes', class: 'btn btn--sm', text: 'Configurações' })], bodyNode: statusBody }));
  }
})();
