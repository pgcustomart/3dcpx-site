/* ═══════════════════════════════════════════════
   3DCPX — Galeria do Portfólio (dados reais)
   Consome window.PORTFOLIO_PROJECTS / PORTFOLIO_CATEGORIES
   gerados por scripts/migrate-portfolio-images.js
═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('pfGrid');
  const filtersEl = document.getElementById('pfFilters');
  const loadMoreBtn = document.getElementById('pfLoadMore');
  const loadMoreCount = document.getElementById('pfLoadMoreCount');

  if (!grid || !filtersEl || !window.PORTFOLIO_PROJECTS) return;

  const projects = window.PORTFOLIO_PROJECTS;
  const categories = window.PORTFOLIO_CATEGORIES || [];

  const INITIAL_COUNT = 50;
  const BATCH_SIZE = 50;

  let currentFilter = 'all';
  let visibleCount = INITIAL_COUNT;
  let filtered = projects;
  let shown = [];

  function categoryLabel(slug) {
    const found = categories.find(c => c.slug === slug);
    return found ? found.label : slug;
  }

  function renderFilters() {
    const buttons = [{ slug: 'all', label: 'Todos' }, ...categories];
    filtersEl.innerHTML = buttons.map(b =>
      `<button class="filter-btn${b.slug === 'all' ? ' active' : ''}" data-filter="${b.slug}">${b.label}</button>`
    ).join('');
  }

  function getFiltered() {
    return currentFilter === 'all' ? projects : projects.filter(p => p.category === currentFilter);
  }

  function renderGrid() {
    filtered = getFiltered();
    shown = filtered.slice(0, visibleCount);

    grid.innerHTML = shown.map((project, idx) => `
      <article class="pf-card" data-index="${idx}">
        <div class="pf-card__media">
          <span class="pf-card__tag">${categoryLabel(project.category)}</span>
          ${project.count > 1 ? `<span class="pf-card__count">${project.count} fotos</span>` : ''}
          <img src="${project.images[0]}" alt="${project.title}" loading="lazy" decoding="async" />
        </div>
        <div class="pf-card__body">
          <h3 class="pf-card__title">${project.title}</h3>
          <span class="pf-card__count-text">${project.count} foto${project.count > 1 ? 's' : ''}</span>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.pf-card').forEach(card => {
      card.addEventListener('click', () => {
        const project = shown[Number(card.dataset.index)];
        openLightbox(project, 0);
      });
    });

    updateLoadMore();
  }

  function updateLoadMore() {
    const total = filtered.length;

    if (total <= INITIAL_COUNT) {
      loadMoreBtn.style.display = 'none';
      loadMoreCount.textContent = '';
      return;
    }

    const remaining = total - visibleCount;
    if (remaining <= 0) {
      loadMoreBtn.style.display = 'none';
      loadMoreCount.textContent = `Todos os ${total} projetos carregados`;
    } else {
      loadMoreBtn.style.display = '';
      loadMoreBtn.textContent = 'Ver mais projetos';
      loadMoreCount.textContent = `Mostrando ${Math.min(visibleCount, total)} de ${total} projetos`;
    }
  }

  filtersEl.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    visibleCount = INITIAL_COUNT;
    renderGrid();
  });

  loadMoreBtn.addEventListener('click', () => {
    visibleCount += BATCH_SIZE;
    renderGrid();
  });

  /* ── Lightbox ─────────────────────────────── */
  const lightbox = document.getElementById('pfLightbox');
  const lbImage = document.getElementById('pfLbImage');
  const lbTitle = document.getElementById('pfLbTitle');
  const lbCat = document.getElementById('pfLbCat');
  const lbCount = document.getElementById('pfLbCount');

  let lbProject = null;
  let lbIndex = 0;

  function openLightbox(project, startIndex) {
    lbProject = project;
    lbIndex = startIndex;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
    lbImage.src = lbProject.images[lbIndex];
    lbImage.alt = lbProject.title;
    lbTitle.textContent = lbProject.title;
    lbCat.textContent = categoryLabel(lbProject.category);
    lbCount.textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(lbProject.count).padStart(2, '0')}`;
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function nextImage() {
    lbIndex = (lbIndex + 1) % lbProject.count;
    updateLightbox();
  }

  function prevImage() {
    lbIndex = (lbIndex - 1 + lbProject.count) % lbProject.count;
    updateLightbox();
  }

  document.getElementById('pfLbClose').addEventListener('click', closeLightbox);
  document.getElementById('pfLbNext').addEventListener('click', nextImage);
  document.getElementById('pfLbPrev').addEventListener('click', prevImage);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) < 40) return;
    dx < 0 ? nextImage() : prevImage();
  }, { passive: true });

  renderFilters();
  renderGrid();
});
