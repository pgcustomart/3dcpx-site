const { escapeHtml, richText } = require('./escape');

function ctaButton(texto, link, cssClass) {
  if (!texto || !link) return '';
  return `<a href="${escapeHtml(link)}" class="${cssClass}">${escapeHtml(texto)}</a>`;
}

// variant: 'home' (hero completo com fundo/badge) | 'page' (page-header simples de página interna)
// statsContent: só usado no variant 'home' — content bruto do bloco stats_bar que deve
// aparecer DENTRO do hero (estrutura fixa da Home, ver assembleIndex em pageTemplates.js).
function renderHero(content, { variant = 'home', statsContent } = {}) {
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
        <div class="hero__badge reveal">
          <span class="dot dot--gold"></span>
          Impressão 3D Industrial · Modelagem · Prototipagem Rápida
        </div>
        <h1 class="hero__headline reveal">${richText(c.titulo)}</h1>
        <p class="hero__sub reveal">${escapeHtml(c.subtitulo)}</p>
        <div class="hero__actions reveal">
          ${ctaButton(c.cta_texto, c.cta_link, 'btn btn--primary btn--lg')}
          ${ctaButton(c.cta_secundario_texto, c.cta_secundario_link, 'btn btn--ghost btn--lg')}
        </div>
        ${renderHeroStats(statsContent)}
      </div>
      <div class="hero__scroll-hint">
        <span>scroll</span>
        <div class="scroll-line"></div>
      </div>
    </section>`;
}

// Estatísticas embutidas no hero (composição original) — não confundir com
// renderProofNumbers, usado no bloco de prova social logo abaixo do hero.
function renderHeroStats(content) {
  const stats = (content && content.stats) || [];
  if (!stats.length) return '';
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
        <div class="hero__stats reveal">
          ${items}
        </div>`;
}

function renderProofNumbers(content) {
  const stats = (content && content.stats) || [];
  if (!stats.length) return '';
  const items = stats
    .map(
      (s) => `
          <div class="proof-num reveal">
            <strong>${escapeHtml(s.valor)}</strong>
            <span>${escapeHtml(s.label)}</span>
          </div>`
    )
    .join('');
  return `
        <div class="social-proof__numbers">${items}</div>`;
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

// statsContent: content bruto do bloco stats_bar exibido como grid de números
// dentro desta mesma seção (estrutura original "prova social" — ver assembleIndex).
function renderSectorTicker(content, { statsContent } = {}) {
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
        ${renderProofNumbers(statsContent)}
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
            ${c.descricao ? `<p class="section-body">${escapeHtml(c.descricao)}</p>` : ''}
            <ul class="no-file__list">${cards}</ul>
            ${ctaButton(c.cta_texto, c.cta_link, 'btn btn--primary')}
          </div>
          <div class="no-file__visual reveal">
            <div class="visual-card">
              <div class="visual-card__placeholder">
                <div class="placeholder-icon">
                  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 8L56 22V42L32 56L8 42V22L32 8Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                    <path d="M32 8V56M8 22L32 35L56 22" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <span>Objeto físico → Arquivo 3D → Peça impressa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>`;
}

// showCta/sectionId: opções fixas de composição (não vêm do CMS) — controlam se este
// bloco reaparece com o link "ver tudo" ao final, usado só na Home (ver assembleIndex).
// Ícones fixos por título de serviço (estrutura/design original) — não vêm do CMS.
// Cards com título fora deste mapa (ex.: aplicações da página Engenharia Reversa)
// simplesmente não ganham ícone, como já acontecia antes.
const SOLUTION_ICONS = {
  'Prototipagem Rápida': '<svg viewBox="0 0 48 48" fill="none"><path d="M24 4L44 16V32L24 44L4 32V16L24 4Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M24 4V44M4 16L24 28L44 16" stroke="currentColor" stroke-width="1.5"/></svg>',
  'Engenharia Reversa': '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="24" r="18" stroke="currentColor" stroke-width="1.5"/><path d="M24 12V24L32 32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 24H6M42 24H40M24 8V6M24 42V40" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  'Peças Funcionais': '<svg viewBox="0 0 48 48" fill="none"><rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" stroke-width="1.5"/><path d="M16 24H32M24 16V32" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  'Modelagem 3D': '<svg viewBox="0 0 48 48" fill="none"><path d="M24 4L44 24L24 44L4 24L24 4Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M24 12V36M12 24H36" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  'Pós-processamento': '<svg viewBox="0 0 48 48" fill="none"><path d="M8 40L20 28M28 20L40 8M20 28L28 20" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="36" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="36" cy="12" r="4" stroke="currentColor" stroke-width="1.5"/></svg>',
  'Produção sob Demanda': '<svg viewBox="0 0 48 48" fill="none"><path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z" stroke="currentColor" stroke-width="1.5"/><path d="M24 16v8l6 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
};

function renderSolutionsGrid(content, { showCta = false, sectionId = '' } = {}) {
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
    .map((card) => {
      const icon = SOLUTION_ICONS[card.titulo];
      return `
          <div class="solution-card${card.destaque ? ' solution-card--highlight' : ''} reveal">
            ${card.destaque ? '<div class="solution-card__badge">Mais solicitado</div>' : ''}
            ${icon ? `<div class="solution-card__icon">${icon}</div>` : ''}
            <h3>${escapeHtml(card.titulo)}</h3>
            <p>${escapeHtml(card.descricao)}</p>
            ${(card.tags || []).length ? `<div class="solution-card__tags">${card.tags.map((t) => `<span>${escapeHtml(t)}</span>`).join('')}</div>` : ''}
          </div>`;
    })
    .join('');
  return `
    <section class="solutions"${sectionId ? ` id="${sectionId}"` : ''}>
      <div class="container">
        ${header}
        <div class="solutions__grid">${cards}</div>
        ${showCta ? `
        <div class="portfolio__cta reveal">
          <a href="solucoes.html" class="btn btn--outline">Ver todas as soluções e o processo completo →</a>
        </div>` : ''}
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

function renderPortfolioGrid(content, { filtersHtml = '', sectionId = '', showCta = false } = {}) {
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
        ${showCta ? `
        <div class="portfolio__cta reveal">
          <a href="portfolio.html" class="btn btn--outline">Ver portfólio completo →</a>
        </div>` : ''}
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
            <div class="studio__avatar">
              <svg viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="6" stroke="currentColor" stroke-width="1.2"/><path d="M4 28C4 21.4 9.4 16 16 16C22.6 16 28 21.4 28 28" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            </div>
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

// eyebrow/sectionId: rótulo e âncora fixos de composição (não vêm do CMS) —
// variam por página no design original, então só são passados pelo template que precisa.
function renderCtaFinal(content, { eyebrow = '', sectionId = '' } = {}) {
  const c = content || {};
  return `
    <section class="cta-simple"${sectionId ? ` id="${sectionId}"` : ''}>
      <div class="cta-simple__glow"></div>
      <div class="container">
        <div class="cta-simple__inner reveal">
          ${eyebrow ? `<div class="section-tag section-tag--center">${escapeHtml(eyebrow)}</div>` : ''}
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
