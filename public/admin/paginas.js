(async function init() {
  const session = await requireSession();
  const content = renderShell('paginas', { title: 'Páginas', user: session });
  content.appendChild(UI.el('p', { class: 'page-lead', text: 'Todas as páginas do site e seus blocos de conteúdo.' }));

  const tableSlot = UI.el('div');
  content.appendChild(tableSlot);
  tableSlot.appendChild(UI.skeleton('row', 4));

  let pages = [];
  try {
    const res = await apiFetch('/api/pages');
    pages = await res.json();
    const withCounts = await Promise.all(
      pages.map(async (p) => {
        try {
          const r = await apiFetch(`/api/pages/${encodeURIComponent(p.slug)}/blocks`);
          const data = await r.json();
          const blocks = data.blocks || [];
          const lastUpdated = blocks.reduce((max, b) => (b.updated_at && b.updated_at > max ? b.updated_at : max), '');
          return { ...p, totalBlocks: blocks.length, visibleBlocks: blocks.filter((b) => b.visible).length, lastUpdated };
        } catch {
          return { ...p, totalBlocks: null, visibleBlocks: null, lastUpdated: '' };
        }
      })
    );
    pages = withCounts;
  } catch (err) {
    tableSlot.innerHTML = '';
    tableSlot.appendChild(UI.errorState({ message: 'Erro ao carregar páginas.', onRetry: () => window.location.reload() }));
    return;
  }

  tableSlot.innerHTML = '';
  const table = UI.dataTable({
    columns: [
      { key: 'title', label: 'Página', sortable: true, render: (p) => UI.el('strong', { text: p.title }) },
      { key: 'slug', label: 'Slug', sortable: true },
      {
        key: 'route',
        label: 'Rota pública',
        render: (p) => UI.el('a', { href: PAGE_ROUTE_BY_SLUG[p.slug] || '#', target: '_blank', text: PAGE_ROUTE_BY_SLUG[p.slug] || '—' }),
      },
      {
        key: 'totalBlocks',
        label: 'Blocos',
        sortable: true,
        render: (p) => (p.totalBlocks === null ? '—' : `${p.visibleBlocks}/${p.totalBlocks} visíveis`),
      },
      { key: 'lastUpdated', label: 'Atualizado', sortable: true, render: (p) => timeAgo(p.lastUpdated) },
    ],
    fetchPage: ({ page, pageSize, search, sortKey, sortDir }) => {
      let items = pages.filter((p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase()));
      if (sortKey) {
        items = [...items].sort((a, b) => {
          const av = a[sortKey] ?? '';
          const bv = b[sortKey] ?? '';
          return (av > bv ? 1 : av < bv ? -1 : 0) * (sortDir === 'asc' ? 1 : -1);
        });
      }
      return paginate(items, { page, pageSize });
    },
    pageSize: 8,
    searchPlaceholder: 'Pesquisar página…',
    emptyState: { icon: '📄', title: 'Nenhuma página encontrada', message: 'Rode "npm run seed" para popular o banco.' },
    rowActions: (p) => [
      UI.el('a', { class: 'btn btn--sm', href: `page.html?slug=${encodeURIComponent(p.slug)}`, text: 'Editar blocos' }),
    ],
  });
  tableSlot.appendChild(table.el);
})();
