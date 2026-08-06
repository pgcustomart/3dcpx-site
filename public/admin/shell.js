/* ── Casca comum do CMS: sidebar agrupado + topbar ──────────────────
   Toda tela nova chama renderShell(activeKey, opts) e recebe de volta
   o container onde deve montar seu próprio conteúdo. */

const NAV_GROUPS = [
  {
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: 'dashboard', href: 'index.html' },
      { key: 'paginas', label: 'Páginas', icon: 'pages', href: 'paginas.html' },
      { key: 'blocos', label: 'Blocos', icon: 'blocks', href: 'blocos.html' },
      { key: 'midia', label: 'Mídia / Uploads', icon: 'media', href: 'midia.html' },
      { key: 'menus', label: 'Menus', icon: 'menus', href: 'menus.html' },
      { key: 'formularios', label: 'Formulários', icon: 'forms', href: 'formularios.html' },
    ],
  },
  {
    title: 'Analytics',
    items: [
      { key: 'analytics-visao', label: 'Visão Geral', icon: 'analytics', href: 'analytics.html#visao-geral' },
      { key: 'analytics-paginas', label: 'Páginas', icon: 'pages', href: 'analytics.html#paginas' },
      { key: 'analytics-trafego', label: 'Origem de Tráfego', icon: 'globe', href: 'analytics.html#trafego' },
      { key: 'analytics-eventos', label: 'Eventos', icon: 'bolt', href: 'analytics.html#eventos' },
      { key: 'analytics-conversoes', label: 'Conversões', icon: 'target', href: 'analytics.html#conversoes' },
    ],
  },
  {
    title: 'Segurança',
    items: [
      { key: 'seguranca-historico', label: 'Histórico de Versões', icon: 'history', href: 'seguranca.html#historico' },
      { key: 'seguranca-lixeira', label: 'Lixeira', icon: 'trash', href: 'seguranca.html#lixeira' },
      { key: 'seguranca-backups', label: 'Backups', icon: 'backup', href: 'seguranca.html#backups' },
    ],
  },
  {
    title: 'Configurações',
    items: [
      { key: 'config-usuarios', label: 'Usuários', icon: 'users', href: 'config.html#usuarios' },
      { key: 'config-seo', label: 'SEO', icon: 'seo', href: 'config.html#seo' },
      { key: 'config-integracoes', label: 'Integrações', icon: 'integrations', href: 'config.html#integracoes' },
      { key: 'config-logs', label: 'Logs', icon: 'logs', href: 'config.html#logs' },
    ],
  },
];

function renderShell(activeKey, { title = '', user = null, backHref = null } = {}) {
  // Preserva qualquer markup estático que a página já tinha no <body> (ex.: os
  // painéis/modais do editor de blocos em page.html) — só reanexa depois do shell,
  // sem apagar nada que outro script (como page.js) já espera encontrar pelo id.
  const preexisting = Array.from(document.body.children);
  document.body.innerHTML = '';
  document.body.classList.add('shell-body');

  const overlay = UI.el('div', { class: 'shell__overlay' });
  const sidebar = UI.el('aside', { class: 'shell__sidebar' });
  sidebar.appendChild(UI.el('div', { class: 'shell__brand' }, [
    UI.el('span', { class: 'shell__brand-mark', text: '3D' }),
    UI.el('span', { class: 'shell__brand-name', text: 'CPX CMS' }),
  ]));

  const nav = UI.el('nav', { class: 'shell__nav' });
  NAV_GROUPS.forEach((group) => {
    if (group.title) nav.appendChild(UI.el('div', { class: 'shell__nav-title', text: group.title }));
    group.items.forEach((item) => {
      const a = UI.el('a', {
        class: 'shell__nav-item' + (item.key === activeKey ? ' active' : ''),
        href: item.href,
        'data-key': item.key,
      });
      a.appendChild(icon(item.icon, 18));
      a.appendChild(UI.el('span', { text: item.label }));
      nav.appendChild(a);
    });
  });
  sidebar.appendChild(nav);

  const main = UI.el('div', { class: 'shell__main' });
  const menuToggle = UI.el('button', { class: 'shell__menu-toggle', type: 'button', 'aria-label': 'Menu' }, [icon('menus', 20)]);
  const topbarLeft = UI.el('div', { class: 'shell__topbar-left' }, [
    menuToggle,
    backHref ? UI.el('a', { class: 'shell__back', href: backHref, text: '← Voltar' }) : null,
    UI.el('h1', { class: 'shell__title', text: title }),
  ]);
  const userEmail = UI.el('span', { class: 'shell__user-email', text: user ? user.email : '' });
  const logoutBtn = UI.el('button', { class: 'btn btn--sm', type: 'button', text: 'Sair', id: 'shellLogoutBtn' });
  const topbar = UI.el('header', { class: 'shell__topbar' }, [
    topbarLeft,
    UI.el('div', { class: 'shell__topbar-right' }, [userEmail, logoutBtn]),
  ]);

  const content = UI.el('div', { class: 'shell__content', id: 'shellContent' });
  main.appendChild(topbar);
  main.appendChild(content);

  document.body.appendChild(overlay);
  document.body.appendChild(sidebar);
  document.body.appendChild(main);
  preexisting.forEach((node) => document.body.appendChild(node));

  wireLogout(logoutBtn);
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  });
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  }));

  return content;
}

// Usado pelas telas com abas internas (analytics/seguranca/config) para
// realçar o sub-item certo no sidebar sem recarregar a página inteira.
function updateActiveNav(activeKey) {
  document.querySelectorAll('.shell__nav-item').forEach((a) => a.classList.remove('active'));
  const link = document.querySelector(`.shell__nav-item[data-key="${activeKey}"]`);
  if (link) link.classList.add('active');
}
