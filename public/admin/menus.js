// Espelho somente-leitura de NAV_ITEMS em src/render/layout.js — o menu principal
// do site ainda é definido no código, não há endpoint para editá-lo pelo painel.
const REAL_NAV_ITEMS = [
  { slug: 'index', href: 'index.html', label: 'Home' },
  { slug: 'solucoes', href: 'solucoes.html', label: 'Soluções' },
  { slug: 'engenharia-reversa', href: 'engenharia-reversa.html', label: 'Eng. Reversa' },
  { slug: 'portfolio', href: 'portfolio.html', label: 'Portfólio' },
  { slug: 'sobre', href: 'sobre.html', label: 'Sobre' },
  { slug: 'orcamento', href: 'orcamento.html', label: 'Orçamento' },
];

(async function init() {
  const session = await requireSession();
  const content = renderShell('menus', { title: 'Menus', user: session });
  content.appendChild(UI.el('p', { class: 'page-lead' }, [
    document.createTextNode('Menu principal do site — hoje definido em código ('),
    UI.el('code', { text: 'src/render/layout.js' }),
    document.createTextNode('). '),
    UI.mockBadge('edição em breve'),
  ]));

  const table = UI.dataTable({
    title: 'Menu principal',
    columns: [
      { key: 'label', label: 'Rótulo' },
      { key: 'href', label: 'Link' },
      { key: 'slug', label: 'Página associada' },
    ],
    fetchPage: ({ page, pageSize, search }) => {
      const items = REAL_NAV_ITEMS.filter((i) => !search || i.label.toLowerCase().includes(search.toLowerCase()));
      return paginate(items, { page, pageSize });
    },
    pageSize: 10,
    searchPlaceholder: 'Pesquisar item de menu…',
    rowActions: () => [UI.el('button', {
      class: 'btn btn--sm', type: 'button', text: 'Editar', disabled: true,
      title: 'Edição de menus pelo painel ainda não implementada',
    })],
  });
  content.appendChild(table.el);

  content.appendChild(UI.el('div', { class: 'section-block' }, [
    UI.el('button', {
      class: 'btn btn--primary btn--sm', type: 'button', text: '+ Novo menu',
      onclick: () => UI.toast('Múltiplos menus ainda não são suportados pelo backend — em breve.', { variant: 'info' }),
    }),
  ]));
})();
