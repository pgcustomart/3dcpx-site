const NAV_ITEMS = [
  { slug: 'index', href: 'index.html', label: 'Home' },
  { slug: 'solucoes', href: 'solucoes.html', label: 'Soluções' },
  { slug: 'engenharia-reversa', href: 'engenharia-reversa.html', label: 'Eng. Reversa' },
  { slug: 'portfolio', href: 'portfolio.html', label: 'Portfólio' },
  { slug: 'sobre', href: 'sobre.html', label: 'Sobre' },
  { slug: 'orcamento', href: 'orcamento.html', label: 'Orçamento' },
];

const PAGE_META = {
  index: {
    title: '3DCPX | Impressão 3D, engenharia reversa e prototipagem',
    description: 'Impressão 3D industrial, engenharia reversa e prototipagem para indústria, arquitetura e produto, com escolha de material, controle dimensional e acompanhamento técnico do briefing à peça pronta.',
  },
  solucoes: {
    title: '3DCPX | Soluções em impressão 3D e engenharia reversa',
    description: 'Prototipagem rápida, engenharia reversa, peças funcionais, modelagem 3D, pós-processamento e produção sob demanda, com material e processo definidos conforme a aplicação de cada peça.',
  },
  'engenharia-reversa': {
    title: '3DCPX — Engenharia Reversa',
    description: 'Digitalizamos peças físicas, reconstruímos modelos 3D e entregamos peças novas — idênticas ou melhoradas. Precisão de 0,05mm, arquivo CAD editável e relatório dimensional.',
  },
  portfolio: {
    title: '3DCPX — Portfólio',
    description: 'Projetos de impressão 3D, engenharia reversa e prototipagem entregues pela 3DCPX para indústria, arquitetura, produto e pesquisa.',
  },
  sobre: {
    title: '3DCPX — Sobre',
    description: 'Conheça Pedro, o engenheiro fundador da 3DCPX, e a oficina própria com impressoras FDM industrial, resina SLA, scanner 3D e área de acabamento.',
  },
  orcamento: {
    title: '3DCPX — Orçamento',
    description: 'Solicite um orçamento para impressão 3D, engenharia reversa ou prototipagem. Resposta em até 24h. Sem compromisso.',
  },
};

function renderNav(activeSlug) {
  const links = NAV_ITEMS.map(
    (item) => `<a href="${item.href}"${item.slug === activeSlug ? ' class="active"' : ''}>${item.label}</a>`
  ).join('\n        ');

  return `
  <header class="nav" id="nav">
    <div class="nav__inner container">
      <a href="index.html" class="nav__logo"><img src="assets/images/logo/logo-dark-bg.png" alt="3DCPX" width="64" height="32" /></a>
      <nav class="nav__links" id="navLinks">
        ${links}
      </nav>
      <a href="orcamento.html" class="btn btn--primary nav__cta">Iniciar Projeto</a>
      <button class="nav__hamburger" id="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

// Domínio público — Railway injeta RAILWAY_PUBLIC_DOMAIN automaticamente em produção;
// fallback cobre execução local/preview onde a env var não existe.
const SITE_URL = process.env.RAILWAY_PUBLIC_DOMAIN
  ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}`
  : 'https://3dcpx-site-production.up.railway.app';

// Scripts extras carregados só em páginas específicas (evita peso morto nas demais).
// A galeria do portfólio consome dados reais gerados por scripts/migrate-portfolio-images.js.
const PAGE_SCRIPTS = {
  portfolio: ['assets/js/portfolio-data.js', 'assets/js/portfolio-gallery.js'],
};

function renderDocument(slug, mainHtml, footerHtml) {
  const meta = PAGE_META[slug] || { title: '3DCPX', description: '' };
  const pageUrl = `${SITE_URL}/${slug === 'index' ? '' : slug + '.html'}`;
  const ogImage = `${SITE_URL}/assets/images/og-image.png`;
  const extraScripts = (PAGE_SCRIPTS[slug] || [])
    .map((src) => `\n  <script src="${src}"></script>`)
    .join('');
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />

  <link rel="icon" type="image/x-icon" href="assets/icons/favicon.ico" />
  <link rel="icon" type="image/png" sizes="32x32" href="assets/icons/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="assets/icons/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="assets/icons/apple-touch-icon.png" />
  <link rel="manifest" href="assets/icons/site.webmanifest" />
  <meta name="theme-color" content="#0a0a0a" />

  <meta property="og:type" content="website" />
  <meta property="og:locale" content="pt_BR" />
  <meta property="og:site_name" content="3DCPX" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${ogImage}" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="assets/css/styles.css" />
</head>
<body>
${renderNav(slug)}
  <main>
${mainHtml}
  </main>
${footerHtml}
  <button class="back-to-top" id="backToTop" aria-label="Voltar ao topo">
    <svg viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
  <script src="assets/js/script.js"></script>${extraScripts}
</body>
</html>
`;
}

module.exports = { renderDocument, PAGE_META };
