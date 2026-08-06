const ANALYTICS_TABS = [
  { key: 'visao-geral', label: 'Visão Geral' },
  { key: 'paginas', label: 'Páginas' },
  { key: 'trafego', label: 'Origem de Tráfego' },
  { key: 'eventos', label: 'Eventos' },
  { key: 'conversoes', label: 'Conversões' },
];

(async function init() {
  const session = await requireSession();
  const hashKey = (location.hash || '#visao-geral').slice(1);
  const initialKey = ANALYTICS_TABS.some((t) => t.key === hashKey) ? hashKey : 'visao-geral';

  const content = renderShell(`analytics-${initialKey}`, { title: 'Analytics', user: session });
  content.appendChild(UI.el('p', { class: 'page-lead' }, [
    document.createTextNode('Comportamento de visitantes no site. '),
    UI.mockBadge(),
  ]));

  let realPages = [];
  try {
    const res = await apiFetch('/api/pages');
    realPages = await res.json();
  } catch (err) { /* segue só com mock se a API falhar */ }

  const panel = UI.el('div', { class: 'fade-in' });
  const tabsBar = UI.tabs({
    items: ANALYTICS_TABS,
    activeKey: initialKey,
    onChange: (key) => { location.hash = key; renderPanel(key); },
  });
  content.appendChild(tabsBar);
  content.appendChild(panel);

  window.addEventListener('hashchange', () => {
    const key = location.hash.slice(1);
    if (ANALYTICS_TABS.some((t) => t.key === key)) renderPanel(key);
  });

  renderPanel(initialKey);

  function realPageName(mockName, i) {
    return realPages[i] ? realPages[i].title : mockName;
  }

  function renderPanel(key) {
    updateActiveNav(`analytics-${key}`);
    panel.innerHTML = '';
    panel.classList.remove('fade-in');
    void panel.offsetWidth;
    panel.classList.add('fade-in');

    if (key === 'visao-geral') {
      const stats = UI.el('div', { class: 'stats-grid' }, [
        UI.statCard({ icon: ICONS.analytics, label: 'Visitas (7 dias)', value: String(MOCK.acessosPorDia.data.reduce((a, b) => a + b, 0)), mock: true }),
        UI.statCard({ icon: ICONS.clock, label: 'Tempo médio', value: '2m 24s', mock: true }),
        UI.statCard({ icon: ICONS.devices, label: 'Taxa de rejeição', value: '38%', deltaTone: 'down', delta: '-3,1% vs. semana anterior', mock: true }),
        UI.statCard({ icon: ICONS.target, label: 'Conversão', value: MOCK.conversoes.taxa, mock: true }),
      ]);
      panel.appendChild(stats);

      const row = UI.el('div', { class: 'grid-2' });
      const c1 = UI.el('canvas');
      row.appendChild(UI.card({ title: 'Acessos', mock: true, bodyNode: UI.el('div', { class: 'ui-chart-wrap' }, [c1]) }));
      const c2 = UI.el('canvas');
      row.appendChild(UI.card({ title: 'Dispositivos', mock: true, bodyNode: UI.el('div', { class: 'ui-chart-wrap ui-chart-wrap--sm' }, [c2]) }));
      panel.appendChild(row);
      UI.chart(c1, { type: 'line', data: { labels: MOCK.acessosPorDia.labels, datasets: [{ label: 'Acessos', data: MOCK.acessosPorDia.data, borderColor: '#7c71f5', backgroundColor: 'rgba(124,113,245,0.15)', tension: 0.35, fill: true }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
      UI.chart(c2, { type: 'doughnut', data: { labels: MOCK.dispositivos.labels, datasets: [{ data: MOCK.dispositivos.data, backgroundColor: ['#7c71f5', '#d4689f', '#c9a04a'] }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } } } });
    }

    if (key === 'paginas') {
      const rows = MOCK.paginasMaisAcessadas.map((r, i) => ({ ...r, pagina: realPageName(r.pagina, i) }));
      const table = UI.dataTable({
        title: 'Páginas mais acessadas',
        columns: [
          { key: 'pagina', label: 'Página', sortable: true },
          { key: 'visitas', label: 'Visitas', sortable: true },
          { key: 'tempoMedio', label: 'Tempo médio' },
        ],
        fetchPage: ({ page, pageSize, search, sortKey, sortDir }) => {
          let items = rows.filter((r) => !search || r.pagina.toLowerCase().includes(search.toLowerCase()));
          if (sortKey) items = [...items].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (sortDir === 'asc' ? 1 : -1));
          return paginate(items, { page, pageSize });
        },
        pageSize: 8,
        searchPlaceholder: 'Pesquisar página…',
      });
      panel.appendChild(table.el);
    }

    if (key === 'trafego') {
      const body = UI.el('div');
      MOCK.origemTrafego.forEach((t) => {
        body.appendChild(UI.el('div', { style: 'margin-bottom:14px;' }, [
          UI.el('div', { style: 'display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px;' }, [UI.el('span', { text: t.origem }), UI.el('span', { text: `${t.pct}%` })]),
          UI.el('div', { class: 'ui-progress' }, [UI.el('div', { class: 'ui-progress__fill', style: `width:${t.pct}%` })]),
        ]));
      });
      panel.appendChild(UI.card({ title: 'Origem de tráfego', mock: true, bodyNode: body }));
    }

    if (key === 'eventos') {
      const table = UI.dataTable({
        title: 'Eventos rastreados',
        columns: [
          { key: 'evento', label: 'Evento', sortable: true },
          { key: 'ocorrencias', label: 'Ocorrências', sortable: true },
          { key: 'ultima', label: 'Última ocorrência', sortable: true, render: (e) => timeAgo(e.ultima) },
        ],
        fetchPage: ({ page, pageSize, search, sortKey, sortDir }) => {
          let items = MOCK.eventos.filter((e) => !search || e.evento.toLowerCase().includes(search.toLowerCase()));
          if (sortKey) items = [...items].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (sortDir === 'asc' ? 1 : -1));
          return paginate(items, { page, pageSize });
        },
        pageSize: 8,
        searchPlaceholder: 'Pesquisar evento…',
      });
      panel.appendChild(table.el);
    }

    if (key === 'conversoes') {
      const stats = UI.el('div', { class: 'stats-grid' }, [
        UI.statCard({ icon: ICONS.target, label: 'Taxa de conversão', value: MOCK.conversoes.taxa, mock: true }),
        UI.statCard({ icon: ICONS.check, label: 'Conversões no mês', value: String(MOCK.conversoes.totalMes), delta: `meta: ${MOCK.conversoes.metaMes}`, deltaTone: 'neutral', mock: true }),
      ]);
      panel.appendChild(stats);
      const c3 = UI.el('canvas');
      panel.appendChild(UI.card({ title: 'Evolução da taxa de conversão', mock: true, bodyNode: UI.el('div', { class: 'ui-chart-wrap' }, [c3]) }));
      UI.chart(c3, { type: 'line', data: { labels: ['Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'], datasets: [{ label: 'Conversão (%)', data: MOCK.conversoes.historico, borderColor: '#3fb974', backgroundColor: 'rgba(63,185,116,0.15)', tension: 0.35, fill: true }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } } });
    }
  }
})();
