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

function portfolioFilters() {
  return `
        <div class="portfolio__filters reveal">
          <button class="filter-btn active" data-filter="all">Todos</button>
          <button class="filter-btn" data-filter="industria">Indústria</button>
          <button class="filter-btn" data-filter="arquitetura">Arquitetura</button>
          <button class="filter-btn" data-filter="produto">Produto</button>
          <button class="filter-btn" data-filter="reversa">Eng. Reversa</button>
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
              <span>${q}</span>
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

module.exports = {
  wrapSection,
  reEngVisualHome,
  reEngVisualFull,
  useCasesTabs,
  portfolioFilters,
  inProgressProjects,
  workshopGallery,
  contactFormSection,
  faqSection,
};
