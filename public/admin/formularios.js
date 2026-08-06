(async function init() {
  const session = await requireSession();
  const content = renderShell('formularios', { title: 'Formulários', user: session });
  content.appendChild(UI.el('p', { class: 'page-lead' }, [
    document.createTextNode('Envios do formulário de orçamento. '),
    UI.mockBadge('o site ainda não persiste submissões — dados de exemplo'),
  ]));

  const statusOptions = [{ value: '', label: 'Todos' }, { value: 'novo', label: 'Novo' }, { value: 'respondido', label: 'Respondido' }];
  const table = UI.dataTable({
    title: 'Formulário de orçamento',
    columns: [
      { key: 'nome', label: 'Nome', sortable: true },
      { key: 'email', label: 'E-mail' },
      { key: 'assunto', label: 'Assunto' },
      { key: 'quando', label: 'Recebido', sortable: true, render: (s) => timeAgo(s.quando) },
      { key: 'status', label: 'Status', render: (s) => UI.badge(s.status === 'novo' ? 'Novo' : 'Respondido', s.status === 'novo' ? 'info' : 'success') },
    ],
    filters: [{ key: 'status', label: 'Status', value: '', options: statusOptions }],
    fetchPage: ({ page, pageSize, search, filters, sortKey, sortDir }) => {
      let items = MOCK.formSubmissions.filter((s) => {
        if (filters.status && s.status !== filters.status) return false;
        if (search && !`${s.nome} ${s.email} ${s.assunto}`.toLowerCase().includes(search.toLowerCase())) return false;
        return true;
      });
      if (sortKey) items = [...items].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1) * (sortDir === 'asc' ? 1 : -1));
      return paginate(items, { page, pageSize });
    },
    pageSize: 8,
    searchPlaceholder: 'Pesquisar por nome, e-mail ou assunto…',
    emptyState: { icon: '✉️', title: 'Nenhum envio ainda' },
    rowActions: (s) => [UI.el('a', { class: 'btn btn--sm', href: `mailto:${s.email}`, text: 'Responder' })],
  });
  content.appendChild(table.el);
})();
