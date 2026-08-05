(async function init() {
  await requireSession();
  wireLogout(document.getElementById('logoutBtn'));

  const content = document.getElementById('content');
  try {
    const res = await apiFetch('/api/pages');
    const pages = await res.json();

    if (!pages.length) {
      content.innerHTML = '<div class="empty-state">Nenhuma página encontrada. Rode "npm run seed".</div>';
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'pages-grid';
    pages.forEach((page) => {
      const a = document.createElement('a');
      a.className = 'page-card';
      a.href = `page.html?slug=${encodeURIComponent(page.slug)}`;
      a.innerHTML = `<div class="page-card__title">${escapeHtml(page.title)}</div><div class="page-card__slug">${escapeHtml(page.slug)}</div>`;
      grid.appendChild(a);
    });

    content.innerHTML = '';
    content.appendChild(grid);
  } catch (err) {
    content.innerHTML = '<div class="empty-state">Erro ao carregar páginas.</div>';
  }
})();

function escapeHtml(v) {
  const div = document.createElement('div');
  div.textContent = v;
  return div.innerHTML;
}
