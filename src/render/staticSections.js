// Seções que ainda não têm um tipo de bloco no catálogo do painel admin.
// Ficam como HTML estático (não editável via /admin nesta fase) para preservar
// 100% do conteúdo e da interatividade (tabs, filtros, FAQ accordion, formulário)
// que já existem no site. Ver aviso no relatório final sobre como estender o
// catálogo de blocos para tornar essas seções editáveis também.

function wrapSection({ sectionClass, sectionId, tag, title, sub, inner }) {
  return `
    <section class="${sectionClass}"${sectionId ? ` id="${sectionId}"` : ''}>
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">${tag}</div>
          <h2 class="section-title">${title}</h2>
          ${sub ? `<p class="section-sub">${sub}</p>` : ''}
        </div>
        ${inner}
      </div>
    </section>`;
}

// Diagrama de 4 etapas (versão ícones SVG) — usado ao lado do bloco featured_service na Home
function reEngVisualHome() {
  return `
          <div class="reverse-eng__visual reveal">
            <div class="re-visual">
              <div class="re-step"><div class="re-step__num">01</div><div class="re-step__label">Peça física</div><div class="re-step__icon"><svg viewBox="0 0 40 40" fill="none"><rect x="8" y="12" width="24" height="16" rx="3" stroke="currentColor" stroke-width="1.2"/><path d="M14 12V10M26 12V10M14 28v2M26 28v2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></div></div>
              <div class="re-arrow">→</div>
              <div class="re-step"><div class="re-step__num">02</div><div class="re-step__label">Escaneamento</div><div class="re-step__icon"><svg viewBox="0 0 40 40" fill="none"><path d="M8 16V10h6M32 16V10h-6M8 24v6h6M32 24v6h-6" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 14v12M14 20h12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg></div></div>
              <div class="re-arrow">→</div>
              <div class="re-step"><div class="re-step__num">03</div><div class="re-step__label">Modelo 3D</div><div class="re-step__icon"><svg viewBox="0 0 40 40" fill="none"><path d="M20 6L34 14V26L20 34L6 26V14L20 6Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M20 6V34M6 14L20 22L34 14" stroke="currentColor" stroke-width="1.2"/></svg></div></div>
              <div class="re-arrow">→</div>
              <div class="re-step"><div class="re-step__num">04</div><div class="re-step__label">Peça nova</div><div class="re-step__icon"><svg viewBox="0 0 40 40" fill="none"><path d="M20 8L32 14V26L20 32L8 26V14L20 8Z" fill="rgba(124,113,245,0.15)" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M14 20l4 4 8-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>
            </div>
          </div>`;
}

// Diagrama de 4 etapas (versão com fotos reais) — engenharia-reversa.html
function reEngVisualFull() {
  const steps = [
    ['01', 'Peça física', 'assets/images/engenharia-reversa/er-peca-original.jpg', 'Peça física original antes do escaneamento'],
    ['02', 'Escaneamento', 'assets/images/engenharia-reversa/er-escaneamento.jpg', 'Scanner 3D digitalizando a peça'],
    ['03', 'Modelo 3D', 'assets/images/engenharia-reversa/er-modelo-cad.jpg', 'Modelo 3D renderizado em software CAD'],
    ['04', 'Peça nova', 'assets/images/engenharia-reversa/er-peca-impressa.jpg', 'Peça nova impressa, resultado do processo'],
  ];
  const stepsHtml = steps
    .map(
      ([num, label, img, alt], i) => `${i > 0 ? '<div class="re-arrow">→</div>' : ''}
              <div class="re-step">
                <div class="re-step__num">${num}</div>
                <div class="re-step__label">${label}</div>
                <div class="re-step__icon re-step__icon--placeholder">
                  <img src="${img}" alt="${alt}" width="320" height="320" loading="lazy" decoding="async" />
                </div>
              </div>`
    )
    .join('\n              ');
  return `
          <div class="reverse-eng__visual reveal">
            <div class="re-visual">${stepsHtml}</div>
          </div>`;
}

function useCasesTabs() {
  const tabs = [
    {
      id: 'industria',
      label: 'Indústria',
      active: true,
      title: 'Para a Indústria',
      body: 'Reposição de peças descontinuadas, fixtures, gabaritos e protótipos funcionais. Reduzimos o tempo de parada de linha e eliminamos a dependência de fornecedores únicos.',
      bullets: [
        'Peças de reposição em 48–72h',
        'Gabaritos e fixtures personalizados',
        'Protótipos para validação antes de ferramental',
        'Engenharia reversa de componentes legados',
      ],
      cta: 'Solicitar orçamento industrial',
      icon: '<svg viewBox="0 0 80 60" fill="none"><rect x="10" y="20" width="60" height="25" rx="3" stroke="currentColor" stroke-width="1.2"/><path d="M20 20V15M35 20V12M50 20V15M60 20V12" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/><path d="M10 35h60" stroke="currentColor" stroke-width="1.2"/><circle cx="25" cy="42" r="4" stroke="currentColor" stroke-width="1.2"/><circle cx="55" cy="42" r="4" stroke="currentColor" stroke-width="1.2"/></svg>',
      iconLabel: 'Indústria & Manufatura',
    },
    {
      id: 'arquitetura',
      label: 'Arquitetura',
      title: 'Para Arquitetura',
      body: 'Maquetes de precisão, elementos decorativos, protótipos de projeto e peças únicas para obras. Do detalhe arquitetônico ao modelo em escala completo.',
      bullets: [
        'Maquetes em escala com precisão milimétrica',
        'Elementos decorativos e de revestimento',
        'Protótipos de mobiliário e fixtures',
        'Peças únicas em materiais especiais',
      ],
      cta: 'Solicitar orçamento',
      icon: '<svg viewBox="0 0 80 60" fill="none"><path d="M40 10L70 30V50H10V30L40 10Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><rect x="30" y="35" width="20" height="15" stroke="currentColor" stroke-width="1.2"/><path d="M40 30v-8" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
      iconLabel: 'Arquitetura & Projetos',
    },
    {
      id: 'produto',
      label: 'Produto & Startup',
      title: 'Para Produto & Startups',
      body: 'Do MVP ao pitch: entregamos protótipos com encaixe e acabamento reais, prontos para validar a ideia com investidores e usuários antes de qualquer investimento em moldes.',
      bullets: [
        'Protótipos funcionais para pitch e apresentação',
        'Iterações rápidas de design',
        'Testes de ergonomia e usabilidade',
        'Pequenas séries para testes de mercado',
      ],
      cta: 'Solicitar orçamento',
      icon: '<svg viewBox="0 0 80 60" fill="none"><path d="M25 45C25 33 15 28 15 20C15 13 20 8 30 8C35 8 38 10 40 13C42 10 45 8 50 8C60 8 65 13 65 20C65 28 55 33 55 45H25Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/><path d="M28 45h24" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
      iconLabel: 'Produto & Inovação',
    },
    {
      id: 'pesquisa',
      label: 'Pesquisa & Saúde',
      title: 'Para Pesquisa & Saúde',
      body: 'Modelos anatômicos, dispositivos médicos customizados, fixtures para laboratório e peças para equipamentos científicos com materiais biocompatíveis.',
      bullets: [
        'Modelos anatômicos para treinamento cirúrgico',
        'Próteses e órteses sob medida',
        'Equipamentos e fixtures para laboratório',
        'Materiais biocompatíveis certificados',
      ],
      cta: 'Solicitar orçamento',
      icon: '<svg viewBox="0 0 80 60" fill="none"><path d="M40 10C28 10 20 18 20 28C20 38 28 50 40 50C52 50 60 38 60 28C60 18 52 10 40 10Z" stroke="currentColor" stroke-width="1.2"/><path d="M40 20v8l5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M28 28h24" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2"/></svg>',
      iconLabel: 'Pesquisa & Saúde',
    },
  ];

  const tabButtons = tabs
    .map((t) => `<button class="tab-btn${t.active ? ' active' : ''}" data-tab="${t.id}">${t.label}</button>`)
    .join('\n          ');

  const panels = tabs
    .map(
      (t) => `
          <div class="tab-panel${t.active ? ' active' : ''}" id="tab-${t.id}">
            <div class="tab-panel__inner">
              <div class="tab-panel__text">
                <h3>${t.title}</h3>
                <p>${t.body}</p>
                <ul>${t.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
                <a href="orcamento.html" class="btn btn--outline">${t.cta}</a>
              </div>
              <div class="tab-panel__visual">
                <div class="tab-placeholder">${t.icon}<span>${t.iconLabel}</span></div>
              </div>
            </div>
          </div>`
    )
    .join('');

  return `
    <section class="use-cases" id="casos">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Por tipo de cliente</div>
          <h2 class="section-title">Qual é o seu caso?</h2>
          <p class="section-sub">Selecione o perfil mais próximo e veja como trabalhamos para você.</p>
        </div>
        <div class="use-cases__tabs reveal">${tabButtons}</div>
        <div class="use-cases__content">${panels}</div>
      </div>
    </section>`;
}

// Galeria real do portfólio — fotos reais dos projetos (não vem do CMS).
// Filtros, grid, paginação ("ver mais") e lightbox são montados no client
// por assets/js/portfolio-gallery.js a partir de assets/js/portfolio-data.js
// (gerado por scripts/migrate-portfolio-images.js a partir das fotos do cliente).
function realPortfolioGallery() {
  return `
    <section class="portfolio" id="projetos" style="padding-top: 88px;">
      <div class="container">
        <div class="portfolio__filters reveal" id="pfFilters"></div>
        <div class="pf-grid" id="pfGrid"></div>
        <div class="pf-loadmore-wrap">
          <button class="btn btn--ghost" id="pfLoadMore">Ver mais projetos</button>
        </div>
        <p class="pf-loadmore-count" id="pfLoadMoreCount"></p>
      </div>
    </section>

    <div class="pf-lightbox" id="pfLightbox">
      <div class="pf-lightbox__inner">
        <button class="pf-lightbox__close" id="pfLbClose" aria-label="Fechar">✕</button>
        <div class="pf-lightbox__frame">
          <button class="pf-lightbox__nav pf-lightbox__prev" id="pfLbPrev" aria-label="Foto anterior">‹</button>
          <img class="pf-lightbox__img" id="pfLbImage" src="" alt="" />
          <button class="pf-lightbox__nav pf-lightbox__next" id="pfLbNext" aria-label="Próxima foto">›</button>
        </div>
        <div class="pf-lightbox__meta">
          <div>
            <div class="pf-lightbox__title" id="pfLbTitle"></div>
            <div class="pf-lightbox__cat" id="pfLbCat"></div>
          </div>
          <div class="pf-lightbox__count" id="pfLbCount"></div>
        </div>
      </div>
    </div>`;
}

function inProgressProjects() {
  return `
    <section class="in-progress" id="em-andamento">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Em andamento</div>
          <h2 class="section-title">Projetos em desenvolvimento</h2>
          <p class="section-sub">Uma visão do que está acontecendo na oficina agora.</p>
        </div>
        <div class="in-progress__grid">

          <div class="progress-card reveal">
            <div class="progress-card__header">
              <div class="status-badge status-badge--printing"><span class="dot dot--pulse"></span> Imprimindo</div>
              <span class="progress-card__material">Nylon PA12</span>
            </div>
            <h4>Peças estruturais para robótica</h4>
            <p>Conjunto de 14 componentes para braço robótico articulado de 6 eixos</p>
            <div class="progress-bar"><div class="progress-bar__fill" style="--pct: 68%"></div></div>
            <span class="progress-card__eta">ETA: 2 dias</span>
          </div>

          <div class="progress-card reveal">
            <div class="progress-card__header">
              <div class="status-badge status-badge--modeling"><span class="dot dot--blue"></span> Modelagem</div>
              <span class="progress-card__material">Resina ABS-like</span>
            </div>
            <h4>Maquete hospitalar 1:50</h4>
            <p>Hospital de 4 andares com detalhamento interno e área externa para apresentação ao conselho</p>
            <div class="progress-bar"><div class="progress-bar__fill" style="--pct: 35%"></div></div>
            <span class="progress-card__eta">ETA: 5 dias</span>
          </div>

          <div class="progress-card reveal">
            <div class="progress-card__header">
              <div class="status-badge status-badge--finishing"><span class="dot dot--green"></span> Acabamento</div>
              <span class="progress-card__material">ABS pintado</span>
            </div>
            <h4>Protótipo de embalagem cosmética</h4>
            <p>Frasco premium com tampa rosqueada e texturas de superfície — 3 variações de design</p>
            <div class="progress-bar"><div class="progress-bar__fill" style="--pct: 88%"></div></div>
            <span class="progress-card__eta">ETA: Amanhã</span>
          </div>

        </div>
      </div>
    </section>`;
}

function workshopGallery() {
  return `
          <div class="workshop__gallery reveal">
            <div class="gallery-grid">
              <div class="gallery-item gallery-item--main">
                <div class="gallery-placeholder gallery-placeholder--1">
                  <img src="assets/images/oficina/oficina-vista-geral.jpg" alt="Vista geral da oficina 3DCPX" width="800" height="480" loading="lazy" decoding="async" />
                </div>
              </div>
              <div class="gallery-item">
                <div class="gallery-placeholder gallery-placeholder--2">
                  <img src="assets/images/oficina/oficina-impressora-fdm.jpg" alt="Impressora FDM industrial em operação" width="480" height="280" loading="lazy" decoding="async" />
                </div>
              </div>
              <div class="gallery-item">
                <div class="gallery-placeholder gallery-placeholder--3">
                  <img src="assets/images/oficina/oficina-scanner-3d.jpg" alt="Scanner 3D em uso na oficina" width="480" height="280" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>`;
}

function contactFormSection() {
  return `
    <section class="cta-final" id="contato" style="padding-top: 88px;">
      <div class="cta-final__bg"><div class="cta-final__glow"></div></div>
      <div class="container">
        <div class="cta-final__inner reveal">
          <div class="section-tag section-tag--center">Formulário de contato</div>
          <h2 class="cta-final__title">Seu projeto tem solução.<br />Vamos encontrá-la juntos.</h2>
          <p class="cta-final__sub">Sem compromisso. Sem complicação. Resposta em até 24h.</p>
          <div class="cta-final__form">
            <form class="contact-form" id="contactForm">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Nome</label>
                  <input type="text" id="name" name="name" placeholder="Seu nome" required />
                </div>
                <div class="form-group">
                  <label for="email">E-mail</label>
                  <input type="email" id="email" name="email" placeholder="seu@email.com" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="phone">WhatsApp</label>
                  <input type="tel" id="phone" name="phone" placeholder="(00) 00000-0000" />
                </div>
                <div class="form-group">
                  <label for="type">Tipo de projeto</label>
                  <select id="type" name="type">
                    <option value="">Selecione...</option>
                    <option>Prototipagem rápida</option>
                    <option>Engenharia reversa</option>
                    <option>Peças funcionais</option>
                    <option>Modelagem 3D</option>
                    <option>Maquete</option>
                    <option>Produção em série</option>
                    <option>Outro</option>
                  </select>
                </div>
              </div>
              <div class="form-group form-group--full">
                <label for="message">Descreva o projeto</label>
                <textarea id="message" name="message" rows="5" placeholder="O que você precisa? Pode ser uma ideia, um problema, ou apenas 'tenho uma peça quebrada e preciso de uma nova'. Qualquer informação já nos ajuda a começar."></textarea>
              </div>
              <div class="form-actions">
                <button type="submit" class="btn btn--primary btn--lg btn--full">Enviar solicitação</button>
                <p class="form-note">Ou fale direto pelo <a href="https://wa.me/5500000000000">WhatsApp</a> — resposta ainda mais rápida.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>`;
}

function faqSection() {
  const items = [
    ['Preciso ter um arquivo 3D para solicitar orçamento?', 'Não. Você pode enviar uma foto, um desenho técnico, uma peça física para escaneamento ou apenas uma descrição do que precisa. Nossa equipe faz a modelagem e te apresenta o modelo antes de imprimir.'],
    ['Qual é o prazo de entrega?', 'Depende da complexidade. Protótipos simples saem em 24–48h após aprovação do orçamento. Projetos com modelagem, séries maiores ou acabamento especial podem levar de 5 a 15 dias úteis. O prazo exato é informado no orçamento antes de qualquer cobrança.'],
    ['Qual material devo escolher?', 'Não precisa saber — é nossa função recomendar o material certo com base na aplicação, esforço mecânico, temperatura e acabamento desejado. Trabalhamos com PLA, ABS, PETG, ASA, TPU, Nylon PA12, PC, Resina SLA e materiais compostos.'],
    ['Vocês atendem fora do Brasil?', 'Sim. Fazemos modelagem e consultoria remota para qualquer localidade. A entrega física é via correios internacionais ou transportadora internacional, com custo de frete calculado no orçamento.'],
    ['Emitem nota fiscal?', 'Sim. Somos empresa regularizada (CNPJ) e emitimos NF-e para todos os pedidos, incluindo os para pessoa física. Aceitamos PJ com PO e contratos de fornecimento contínuo.'],
    ['O arquivo 3D que envio fica seguro?', 'Absolutamente. Assinamos NDA mediante solicitação e nunca compartilhamos ou reutilizamos arquivos de clientes. Seus dados e arquivos pertencem a você.'],
    ['Qual é o tamanho máximo que conseguem imprimir?', 'Nosso volume máximo em FDM é de 350×350×400mm por peça única. Para objetos maiores, fazemos impressão em partes e montagem com encaixes projetados para serem invisíveis no produto final.'],
    ['Fazem contratos de fornecimento recorrente?', 'Sim. Para clientes industriais ou empresas com demanda regular, estruturamos contratos de fornecimento contínuo com SLA de resposta dedicado, prioridade de fila de impressão e condições comerciais especiais.'],
  ];
  const list = items
    .map(
      ([q, a]) => `
          <div class="faq-item reveal">
            <button class="faq-item__q" aria-expanded="false">
              <span class="faq-item__text">${q}</span>
              <span class="faq-item__icon">+</span>
            </button>
            <div class="faq-item__a"><p>${a}</p></div>
          </div>`
    )
    .join('');
  return `
    <section class="faq" id="faq">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Dúvidas frequentes</div>
          <h2 class="section-title">FAQ</h2>
        </div>
        <div class="faq__list">${list}</div>
      </div>
    </section>`;
}

// Ícones de traço único (viewBox 40x40, stroke-width 1.4) — mesma linguagem visual
// dos ícones de re-step/solution card já usados no site (ver reEngVisualFull acima
// e SOLUTION_ICONS em blockRenderers.js). Um por pergunta do FAQ da Home.
const HOME_FAQ_ICONS = {
  calendario: '<svg viewBox="0 0 40 40" fill="none"><rect x="7" y="9" width="26" height="24" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M7 16h26" stroke="currentColor" stroke-width="1.4"/><path d="M13 6v6M27 6v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M13 22h4M13 27h4M23 22h4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  documento: '<svg viewBox="0 0 40 40" fill="none"><path d="M12 6h11l6 6v20a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M23 6v6h6" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M14 20h12M14 25h12M14 30h8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  cubo3d: '<svg viewBox="0 0 40 40" fill="none"><path d="M20 5 34 13v14L20 35 6 27V13L20 5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M20 20 34 13M20 20 6 13M20 20v15" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  scanner: '<svg viewBox="0 0 40 40" fill="none"><path d="M8 15V9a2 2 0 0 1 2-2h6M32 15V9a2 2 0 0 0-2-2h-6M8 25v6a2 2 0 0 0 2 2h6M32 25v6a2 2 0 0 1-2 2h-6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 13v14M13 20h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  engrenagem: '<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="6" stroke="currentColor" stroke-width="1.4"/><path d="M20 8v4M20 28v4M8 20h4M28 20h4M11.5 11.5l2.8 2.8M25.7 25.7l2.8 2.8M11.5 28.5l2.8-2.8M25.7 14.3l2.8-2.8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  predio: '<svg viewBox="0 0 40 40" fill="none"><rect x="10" y="6" width="20" height="28" rx="1.5" stroke="currentColor" stroke-width="1.4"/><path d="M15 12h2M23 12h2M15 18h2M23 18h2M15 24h2M23 24h2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M17 34v-6h6v6" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
  cartao: '<svg viewBox="0 0 40 40" fill="none"><rect x="5" y="10" width="30" height="20" rx="3" stroke="currentColor" stroke-width="1.4"/><path d="M5 16h30" stroke="currentColor" stroke-width="1.4"/><path d="M10 24h8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
  caminhao: '<svg viewBox="0 0 40 40" fill="none"><path d="M4 12h18v14H4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M22 18h7l5 5v3h-12z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="11" cy="29" r="2.6" stroke="currentColor" stroke-width="1.4"/><circle cx="28" cy="29" r="2.6" stroke="currentColor" stroke-width="1.4"/></svg>',
  upload: '<svg viewBox="0 0 40 40" fill="none"><path d="M12 25v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M20 6v17M14 13l6-7 6 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  headset: '<svg viewBox="0 0 40 40" fill="none"><path d="M8 21v-2a12 12 0 0 1 24 0v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><rect x="5" y="21" width="7" height="10" rx="2.5" stroke="currentColor" stroke-width="1.4"/><rect x="28" y="21" width="7" height="10" rx="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M35 31v2a4 4 0 0 1-4 4h-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>',
};

// FAQ da Home — conteúdo institucional fixo (não vem do CMS, mesmo padrão de faqSection()
// acima). Cada item tem um ícone próprio (HOME_FAQ_ICONS) e alimenta o JSON-LD FAQPage
// para SEO. Accordion reaproveita a mesma classe (.faq-item__q) e o mesmo JS de
// script.js usado no FAQ da página de Orçamento — sem duplicar lógica de interação.
function homeFaq() {
  const items = [
    ['calendario', 'Quanto tempo leva um projeto?', 'Cada projeto tem um prazo diferente, conforme complexidade, acabamento e quantidade de peças. Protótipos simples saem em 24–48h após aprovação do orçamento; projetos com modelagem, séries maiores ou acabamento especial podem levar de 5 a 15 dias úteis. O prazo exato é informado no orçamento, antes de qualquer cobrança.'],
    ['documento', 'Como funciona o orçamento?', 'O orçamento é elaborado depois que analisamos as informações e os arquivos que você envia — pode ser um arquivo 3D, uma foto, um desenho técnico ou apenas a descrição do que você precisa. Com base nisso, definimos processo, material e prazo, e enviamos o valor em até 24h, sem compromisso.'],
    ['cubo3d', 'Vocês trabalham com impressão 3D?', 'Sim. Trabalhamos com impressão 3D profissional em diferentes tecnologias e materiais — PLA, ABS, PETG, Nylon PA12, resina SLA e outros — escolhidos de acordo com a aplicação, o esforço mecânico e o acabamento que a peça precisa.'],
    ['scanner', 'Vocês fazem engenharia reversa?', 'Sim. Escaneamos a peça física, reconstruímos o modelo 3D em CAD e entregamos uma peça nova — idêntica ou melhorada — com validação dimensional completa.'],
    ['engrenagem', 'Quais materiais são utilizados?', 'Trabalhamos com PLA, ABS, PETG, resinas e outros materiais técnicos, escolhidos conforme a aplicação de cada peça: resistência mecânica, temperatura, flexibilidade ou acabamento visual.'],
    ['predio', 'Vocês atendem empresas?', 'Sim. Desenvolvemos protótipos, dispositivos, gabaritos, fixtures e produção seriada para indústria, arquitetura, produto e pesquisa, com contratos de fornecimento contínuo quando necessário.'],
    ['cartao', 'Como funciona o pagamento?', 'O pagamento é definido conforme a negociação de cada projeto, considerando valor, prazo e forma de entrega. As condições são combinadas junto com o orçamento, antes do início da produção.'],
    ['caminhao', 'Vocês enviam para todo o Brasil?', 'Sim. Enviamos para todo o território nacional, com o custo de frete calculado e informado já no orçamento.'],
    ['upload', 'Posso enviar meu projeto?', 'Sim. Você pode enviar desenhos, fotos, referências ou arquivos 3D — não precisa ter um modelo pronto. Nossa equipe cuida da modelagem e te apresenta o projeto antes de qualquer impressão.'],
    ['headset', 'Como entrar em contato?', 'Você pode falar com a gente pelo WhatsApp ou pelo formulário de contato disponível no site. Respondemos em até 24h.'],
  ];

  const list = items
    .map(
      ([icon, q, a]) => `
          <div class="faq-item reveal">
            <button class="faq-item__q" aria-expanded="false">
              <span class="faq-item__q-main">
                <span class="faq-item__svg">${HOME_FAQ_ICONS[icon]}</span>
                <span class="faq-item__text">${q}</span>
              </span>
              <span class="faq-item__icon">+</span>
            </button>
            <div class="faq-item__a"><p>${a}</p></div>
          </div>`
    )
    .join('');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([, q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
  // "</" escapado defensivamente para não fechar a tag <script> caso o conteúdo mude no futuro.
  const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/<\//g, '<\\/')}</script>`;

  return `
    <section class="faq" id="faq">
      <div class="container">
        <div class="section-header reveal">
          <div class="section-tag">Dúvidas frequentes</div>
          <h2 class="section-title">Perguntas <em>frequentes.</em></h2>
          <p class="section-sub">Tudo o que você precisa saber antes de começar o seu projeto.</p>
        </div>
        <div class="faq__list">${list}</div>
      </div>
      ${jsonLdScript}
    </section>`;
}

module.exports = {
  wrapSection,
  reEngVisualHome,
  reEngVisualFull,
  useCasesTabs,
  realPortfolioGallery,
  inProgressProjects,
  workshopGallery,
  contactFormSection,
  faqSection,
  homeFaq,
};
