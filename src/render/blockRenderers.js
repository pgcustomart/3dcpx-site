const { escapeHtml, richText } = require('./escape');

function ctaButton(texto, link, cssClass) {
  if (!texto || !link) return '';
  return `<a href="${escapeHtml(link)}" class="${cssClass}">${escapeHtml(texto)}</a>`;
}

// variant: 'home' (hero completo com fundo/badge) | 'page' (page-header simples de página interna)
function renderHero(content, { variant = 'home' } = {}) {
  const c = content || {};
  if (variant === 'page') {
    return `
    <section class="page-header">
      <div class="page-header__grid"></div>
      <div class="page-header__glow"></div>
      <div class="container">
        <div class="page-header__inner">
          <h1 class="page-header__title">${richText(c.titulo)}</h1>
          <p class="page-header__sub">${escapeHtml(c.subtitulo)}</p>
        </div>
      </div>
      ${c.imagem_url ? `<img class="page-header__photo" src="${escapeHtml(c.imagem_url)}" alt="" width="1920" height="500" loading="eager" fetchpriority="high" decoding="async" />` : ''}
      <div class="page-header__overlay"></div>
    </section>`;
  }

  return `
    <section class="hero" id="hero">
      <div class="hero__bg">
        ${c.imagem_url ? `<img class="hero__photo" src="${escapeHtml(c.imagem_url)}" alt="" width="1920" height="1080" loading="eager" fetchpriority="high" decoding="async" />` : ''}
        <div class="hero__overlay"></div>
        <div class="hero__grid"></div>
        <div class="hero__glow"></div>
        <div class="hero__glow-rose"></div>
      </div>
      <div class="container hero__inner">
        <h1 class="hero__headline reveal">${richText(c.titulo)}</h1>
        <p class="hero__sub reveal">${escapeHtml(c.subtitulo)}</p>
        <div class="hero__actions reveal">
          ${ctaButton(c.cta_texto, c.cta_link, 'btn btn--primary btn--lg')}
          ${ctaButton(c.cta_secundario_texto, c.cta_secundario_link, 'btn btn--ghost btn--lg')}
        </div>
      </div>
      <div class="hero__scroll-hint">
        <span>scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>`;
}

function renderStatsBar(content) {
  const stats = (content && content.stats) || [];
  const items = stats
    .map(
      (s, i) => `${i > 0 ? '<div class="stat__divider"></div>' : ''}
          <div class="stat">
            <span class="stat__num">${escapeHtml(s.valor)}</span>
            <span class="stat__label">${escapeHtml(s.label)}</span>
          </div>`
    )
    .join('\n');
  return `
    <section class="stats-bar-block">
      <div class="container">
        <div class="hero__stats reveal">
          ${items}
        </div>
      </div>
    </section>`;
}

function renderSectorTicker(content) {
  const setores = (content && content.setores) || [];
  const track = setores
    .map((s) => `<span class="ticker__item">${escapeHtml(s)}</span><span class="ticker__sep">·</span>`)
    .join('\n            ');
  return `
    <section class="social-proof" id="prova-social">
      <div class="container">
        <p class="social-proof__label">Setores atendidos pela 3DCPX</p>
        <div class="social-proof__ticker">
          <div class="ticker__track">
            ${track}
            ${track}
          </div>
        </div>
      </div>
    </section>`;
}

function renderProblemCards(content) {
  const c = content || {};
  const cards = (c.cards || [])
    .map(
      (card) => `
              <li>
                <div class="list-icon">→</div>
                <div>
                  <strong>${escapeHtml(card.titulo)}</strong>
                  <span>${escapeHtml(card.descricao)}</span>
                </div>
              </li>`
    )
    .join('');
  return `
    <section class="no-file" id="sem-arquivo">
      <div class="container">
        <div class="no-file__inner">
          <div class="no-file__text reveal">
            <div class="section-tag">${escapeHtml(c.subtitulo)}</div>
            <h2 class="section-title">${richText(c.titulo)}</h2>
            <ul class="no-file__list">${cards}</ul>
          </div>
        </div>
      </div>
    </section>`;
}

function renderSolutionsGrid(content) {
  const c = content || {};
  const header =
    c.titulo || c.subtitulo
      ? `
        <div class="section-header reveal">
          ${c.subtitulo ? `<div class="section-tag">${escapeHtml(c.subtitulo)}</div>` : ''}
          ${c.titulo ? `<h2 class="section-title">${richText(c.titulo)}</h2>` : ''}
        </div>`
      : '';
  const cards = (c.cards || [])
    .map(
      (card) => `
          <div class="solution-card${card.destaque ? ' solution-card--highlight' : ''} reveal">
            ${card.destaque ? '<div class="solution-card__badge">Mais solicitado</div>' : ''}
            <h3>${escapeHtml(card.titulo)}</h3>
            <p>${escapeHtml(card.descricao)}</p>
            ${(card.tags || []).length ? `<div class="solution-card__tags">${card.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join('')}</div>` : ''}
          </div>`
    )
    .join('');
  return `
    <section class="solutions">
      <div class="container">
        ${header}
        <div class="solutions__grid">${cards}</div>
      </div>
    </section>`;
}

function renderProcessSteps(content) {
  const passos = (content && content.passos) || [];
  const steps = passos
    .map(
      (p, i) => `${i > 0 ? '<div class="process__connector"></div>' : ''}
          <div class="process__step reveal">
            <div class="process__num">${escapeHtml(p.numero)}</div>
            <div class="process__body">
              <p>${escapeHtml(p.texto)}</p>
            </div>
          </div>`
    )
    .join('');
  return `<div class="process">${steps}</div>`;
}

function renderFeaturedService(content) {
  const c = content || {};
  const bullets = (c.bullets || [])
    .map((b) => `<li><span class="accent-dot">▪</span> ${escapeHtml(b)}</li>`)
    .join('');
  return `
          <div class="reverse-eng__text reveal">
            <div class="section-tag">Serviço em destaque</div>
            <h2 class="section-title">${escapeHtml(c.titulo)}</h2>
            <p class="section-body">${escapeHtml(c.descricao)}</p>
            <ul class="re-features">${bullets}</ul>
            <div style="display:flex; gap:12px; flex-wrap:wrap; margin-top:8px;">
              ${ctaButton(c.cta_texto, c.cta_link, 'btn btn--primary')}
              ${ctaButton(c.cta_secundario_texto, c.cta_secundario_link, 'btn btn--outline')}
            </div>
          </div>`;
}

function categoriaSlug(categoria) {
  const map = {
    'Engenharia Reversa': 'reversa',
    Arquitetura: 'arquitetura',
    Produto: 'produto',
    Indústria: 'industria',
  };
  return map[categoria] || 'geral';
}

function renderPortfolioGrid(content, { filtersHtml = '', sectionId = '' } = {}) {
  const c = content || {};
  const header =
    c.titulo || c.subtitulo
      ? `
        <div class="section-header reveal">
          ${c.subtitulo ? `<div class="section-tag">${escapeHtml(c.subtitulo)}</div>` : ''}
          ${c.titulo ? `<h2 class="section-title">${escapeHtml(c.titulo)}</h2>` : ''}
        </div>`
      : '';
  const cards = (c.projetos || [])
    .map(
      (p) => `
          <div class="portfolio-card reveal" data-category="${escapeHtml(categoriaSlug(p.categoria))}">
            <div class="portfolio-card__img">
              <img src="${escapeHtml(p.imagem_url)}" alt="${escapeHtml(p.titulo)}" width="400" height="400" loading="lazy" decoding="async" />
              <div class="portfolio-card__overlay">
                <span class="portfolio-card__cat">${escapeHtml(p.categoria)}</span>
              </div>
            </div>
            <div class="portfolio-card__info">
              <h4>${escapeHtml(p.titulo)}</h4>
              <p>${escapeHtml(p.descricao)}</p>
              <span class="material-tag">${escapeHtml(p.material)}</span>
            </div>
          </div>`
    )
    .join('');
  return `
    <section class="portfolio"${sectionId ? ` id="${sectionId}"` : ''}>
      <div class="container">
        ${header}
        ${filtersHtml}
        <div class="portfolio__grid">${cards}</div>
      </div>
    </section>`;
}

// variant: 'compact' (bloco resumido da Home) | 'full' (página Sobre)
function renderFounderBio(content, { variant = 'full' } = {}) {
  const c = content || {};
  const textoParagrafos = (c.texto || '')
    .split('\n\n')
    .filter(Boolean)
    .map((p) => `<p class="${variant === 'full' ? 'section-body' : 'studio__bio'}">${escapeHtml(p)}</p>`)
    .join('');

  if (variant === 'compact') {
    return `
          <div class="studio__person reveal">
            <div class="section-tag">Sobre</div>
            <div class="studio__name">${escapeHtml(c.nome)}</div>
            <div class="studio__role">${escapeHtml(c.cargo)}</div>
            ${textoParagrafos}
            <blockquote class="studio__quote">"${escapeHtml(c.citacao)}"</blockquote>
            ${ctaButton(c.cta_texto, c.cta_link, 'btn btn--ghost btn--sm')}
          </div>`;
  }

  return `
    <section class="about" id="sobre">
      <div class="container">
        <div class="about__inner">
          ${c.imagem_url ? `
          <div class="about__photo reveal">
            <div class="photo-placeholder">
              <div class="photo-placeholder__img">
                <img src="${escapeHtml(c.imagem_url)}" alt="Retrato de ${escapeHtml(c.nome)}" width="480" height="640" loading="lazy" decoding="async" />
              </div>
            </div>
          </div>` : ''}
          <div class="about__text reveal">
            <div class="section-tag">Sobre</div>
            <h2 class="section-title">${escapeHtml(c.nome)} — <em>${escapeHtml(c.cargo)}.</em></h2>
            ${textoParagrafos}
            <div class="about__quote">"${escapeHtml(c.citacao)}"</div>
            <div class="about__links">
              ${ctaButton(c.cta_texto, c.cta_link, 'btn btn--primary btn--sm')}
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

// variant: 'compact' (Home) | 'full' (página Sobre)
function renderWorkshopSpecs(content, { variant = 'full' } = {}) {
  const c = content || {};
  const itens = (c.itens || [])
    .map(
      (item) =>
        variant === 'compact'
          ? `
              <div class="studio__spec-row">
                <div class="studio__spec-dot"></div>
                <div class="studio__spec-info">
                  <strong>${escapeHtml(item.titulo)}</strong>
                  <span>${escapeHtml(item.descricao)}</span>
                </div>
              </div>`
          : `
              <div class="spec-item">
                <strong>${escapeHtml(item.titulo)}</strong>
                <span>${escapeHtml(item.descricao)}</span>
              </div>`
    )
    .join('');

  if (variant === 'compact') {
    return `
          <div class="studio__workshop reveal">
            <div class="section-tag studio__workshop-tag">${escapeHtml(c.subtitulo)}</div>
            <h3 class="studio__workshop-title">${richText(c.titulo)}</h3>
            <div class="studio__specs-compact">${itens}</div>
            ${ctaButton(c.cta_texto, c.cta_link, 'btn btn--ghost btn--sm')}
          </div>`;
  }

  return `
          <div class="workshop__text reveal">
            <div class="section-tag">${escapeHtml(c.subtitulo)}</div>
            <h2 class="section-title">${richText(c.titulo)}</h2>
            <div class="workshop__specs">${itens}</div>
            ${ctaButton(c.cta_texto, c.cta_link, 'btn btn--ghost btn--sm')}
          </div>`;
}

function renderCtaFinal(content) {
  const c = content || {};
  return `
    <section class="cta-simple">
      <div class="cta-simple__glow"></div>
      <div class="container">
        <div class="cta-simple__inner reveal">
          <h2 class="cta-simple__title">${richText(c.titulo)}</h2>
          <p class="cta-simple__sub">${escapeHtml(c.subtitulo)}</p>
          <div class="cta-simple__actions">
            ${ctaButton(c.cta_texto, c.cta_link, 'btn btn--primary btn--lg')}
            ${ctaButton(c.cta_secundario_texto, c.cta_secundario_link, 'btn btn--ghost btn--lg')}
          </div>
          ${c.whatsapp_link ? `<p class="cta-note">Ou fale direto pelo <a href="${escapeHtml(c.whatsapp_link)}">WhatsApp</a></p>` : ''}
        </div>
      </div>
    </section>`;
}

function renderFooter(content) {
  const c = content || {};
  const redes = (c.redes_sociais || [])
    .map((r) => `<a href="${escapeHtml(r.link)}" aria-label="${escapeHtml(r.nome)}">${escapeHtml(r.nome)}</a>`)
    .join('');
  const servicos = (c.servicos || [])
    .map((s) => `<a href="${escapeHtml(s.link)}">${escapeHtml(s.texto)}</a>`)
    .join('');
  const empresa = (c.empresa || [])
    .map((e) => `<a href="${escapeHtml(e.link)}">${escapeHtml(e.texto)}</a>`)
    .join('');

  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <a href="index.html" class="nav__logo">3D<span>CPX</span></a>
          <p>${escapeHtml(c.descricao)}</p>
          <div class="footer__social">${redes}</div>
        </div>
        <div class="footer__cols">
          <div class="footer__col">
            <h5>Serviços</h5>
            ${servicos}
          </div>
          <div class="footer__col">
            <h5>Empresa</h5>
            ${empresa}
          </div>
          <div class="footer__col">
            <h5>Contato</h5>
            <a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>
            <a href="${escapeHtml(c.whatsapp_link)}">WhatsApp</a>
            <span>${escapeHtml(c.horario)}</span>
          </div>
        </div>
      </div>
      <div class="footer__bottom">
        <p>© 2025 3DCPX. Todos os direitos reservados.</p>
        <p>CNPJ: ${escapeHtml(c.cnpj)}</p>
      </div>
    </div>
  </footer>`;
}

const renderers = {
  hero: renderHero,
  stats_bar: renderStatsBar,
  sector_ticker: renderSectorTicker,
  problem_cards: renderProblemCards,
  solutions_grid: renderSolutionsGrid,
  process_steps: renderProcessSteps,
  featured_service: renderFeaturedService,
  portfolio_grid: renderPortfolioGrid,
  founder_bio: renderFounderBio,
  workshop_specs: renderWorkshopSpecs,
  cta_final: renderCtaFinal,
  footer: renderFooter,
};

function renderBlock(block, options = {}) {
  const renderer = renderers[block.type];
  if (!renderer) {
    return `<!-- tipo de bloco desconhecido: ${escapeHtml(block.type)} -->`;
  }
  return renderer(block.content, options);
}

module.exports = { renderers, renderBlock };
