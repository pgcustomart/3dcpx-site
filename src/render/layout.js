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
      <a href="index.html" class="nav__logo">3D<span>CPX</span></a>
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

function renderDocument(slug, mainHtml, footerHtml) {
  const meta = PAGE_META[slug] || { title: '3DCPX', description: '' };
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
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
  <script src="assets/js/script.js"></script>
</body>
</html>
`;
}

module.exports = { renderDocument, PAGE_META };
