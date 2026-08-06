(async function init() {
  const session = await requireSession();
  const content = renderShell('blocos', { title: 'Blocos', user: session });
  content.appendChild(UI.el('p', { class: 'page-lead', text: 'Todos os blocos de conteúdo de todas as páginas, num só lugar.' }));

  const slot = UI.el('div');
  content.appendChild(slot);
  slot.appendChild(UI.skeleton('row', 5));

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
    slot.innerHTML = '';
    slot.appendChild(UI.errorState({ message: 'Erro ao carregar blocos.', onRetry: () => window.location.reload() }));
    return;
  }

  slot.innerHTML = '';
  const pageOptions = [{ value: '', label: 'Todas as páginas' }, ...pages.map((p) => ({ value: p.slug, label: p.title }))];
  const visOptions = [{ value: '', label: 'Todos' }, { value: 'visible', label: 'Visíveis' }, { value: 'hidden', label: 'Ocultos' }];

  const table = UI.dataTable({
    title: `${allBlocks.length} blocos em ${pages.length} páginas`,
    columns: [
      { key: 'type', label: 'Tipo', sortable: true, render: (b) => UI.badge(BLOCK_TYPE_LABELS[b.type] || b.type, 'neutral') },
      { key: 'pageTitle', label: 'Página', sortable: true },
      { key: 'label', label: 'Conteúdo', render: (b) => stripTags(blockLabel(b)) },
      { key: 'visible', label: 'Status', sortable: true, render: (b) => UI.badge(b.visible ? 'Visível' : 'Oculto', b.visible ? 'success' : 'neutral') },
      { key: 'updated_at', label: 'Atualizado', sortable: true, render: (b) => timeAgo(b.updated_at) },
    ],
    filters: [
      { key: 'page', label: 'Página', value: '', options: pageOptions },
      { key: 'vis', label: 'Status', value: '', options: visOptions },
    ],
    fetchPage: ({ page, pageSize, search, filters, sortKey, sortDir }) => {
      let items = allBlocks.filter((b) => {
        if (filters.page && b.pageSlug !== filters.page) return false;
        if (filters.vis === 'visible' && !b.visible) return false;
        if (filters.vis === 'hidden' && b.visible) return false;
        if (search) {
          const hay = `${b.type} ${b.pageTitle} ${blockLabel(b)}`.toLowerCase();
          if (!hay.includes(search.toLowerCase())) return false;
        }
        return true;
      });
      if (sortKey) {
        items = [...items].sort((a, b) => {
          const av = a[sortKey] ?? '';
          const bv = b[sortKey] ?? '';
          return (av > bv ? 1 : av < bv ? -1 : 0) * (sortDir === 'asc' ? 1 : -1);
        });
      }
      return paginate(items, { page, pageSize });
    },
    pageSize: 10,
    searchPlaceholder: 'Pesquisar bloco…',
    emptyState: { icon: '🧱', title: 'Nenhum bloco encontrado', message: 'Ajuste os filtros ou a pesquisa.' },
    rowActions: (b) => [
      UI.el('a', { class: 'btn btn--sm', href: `page.html?slug=${encodeURIComponent(b.pageSlug)}&block=${b.id}`, text: 'Editar' }),
    ],
  });
  slot.appendChild(table.el);
})();
