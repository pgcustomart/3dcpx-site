// Conteúdo migrado das 6 páginas estáticas para o formato de blocks (JSONB).
// Cada bloco segue o schema fixo do tipo, conforme prompt-painel-admin-3dcpx.md.
// Seções que não têm um tipo de bloco correspondente no catálogo (FAQ, formulário de
// contato, tabs "qual é o seu caso", grid de aplicações com detalhe extra, projetos em
// andamento, diagramas visuais de etapas) permanecem como HTML estático nos templates
// de página (src/render/staticSections.js) — ver aviso no relatório final.

const WHATSAPP_LINK = 'https://wa.me/5500000000000';

const FOOTER_CONTENT = {
  descricao: 'Impressão 3D industrial e engenharia reversa, com produção própria do briefing à peça pronta.',
  redes_sociais: [
    { nome: 'Instagram', link: '#' },
    { nome: 'LinkedIn', link: '#' },
    { nome: 'WhatsApp', link: WHATSAPP_LINK },
  ],
  servicos: [
    { texto: 'Prototipagem Rápida', link: 'solucoes.html' },
    { texto: 'Engenharia Reversa', link: 'engenharia-reversa.html' },
    { texto: 'Peças Funcionais', link: 'solucoes.html' },
    { texto: 'Modelagem 3D', link: 'solucoes.html' },
    { texto: 'Pós-processamento', link: 'solucoes.html' },
  ],
  empresa: [
    { texto: 'Sobre Pedro', link: 'sobre.html' },
    { texto: 'A Oficina', link: 'sobre.html' },
    { texto: 'Portfólio', link: 'portfolio.html' },
    { texto: 'FAQ', link: 'orcamento.html' },
  ],
  email: 'contato@3dcpx.com.br',
  whatsapp_link: WHATSAPP_LINK,
  horario: 'Atendimento: Seg–Sex, 8h–18h',
  cnpj: '00.000.000/0001-00',
};

const SOLUTION_CARDS_HOME = [
  { titulo: 'Prototipagem Rápida', descricao: 'Do conceito ao objeto em horas. Ideal para validação de forma, encaixe e ergonomia antes de investir em ferramental.', tags: ['PLA', 'ABS', 'PETG', 'Resina'], destaque: false },
  { titulo: 'Engenharia Reversa', descricao: 'Convertemos peças físicas em arquivos digitais com precisão dimensional. Indicado para reposição de componentes descontinuados.', tags: ['Escaneamento', 'CAD', 'Metrologia'], destaque: true },
  { titulo: 'Peças Funcionais', descricao: 'Componentes para uso real, fabricados em materiais de alto desempenho para suportar carga, calor e desgaste mecânico.', tags: ['Nylon', 'PC', 'TPU', 'ASA'], destaque: false },
  { titulo: 'Modelagem 3D', descricao: 'Criamos modelos paramétricos a partir de desenhos, fotos ou descrições técnicas. Da ideia ao arquivo pronto para impressão.', tags: ['CAD', 'STEP', 'STL', 'OBJ'], destaque: false },
  { titulo: 'Pós-processamento', descricao: 'Acabamento, pintura, primer, lixamento e tratamento superficial para peças prontas para apresentação ou uso final.', tags: ['Acabamento', 'Pintura', 'Montagem'], destaque: false },
  { titulo: 'Produção sob Demanda', descricao: 'Pequenas séries e lotes para mercado, exposição ou uso industrial. Sem mínimo, sem ferramental.', tags: ['Séries', 'Lotes', 'Repetitivos'], destaque: false },
];

const SOLUTION_CARDS_SOLUCOES = [
  { titulo: 'Prototipagem Rápida', descricao: 'Do conceito ao objeto em horas. Validação de forma, encaixe e ergonomia antes de qualquer investimento em ferramental ou moldes.', tags: ['PLA', 'ABS', 'PETG', 'Resina'], destaque: false },
  { titulo: 'Engenharia Reversa', descricao: 'Convertemos peças físicas em arquivos digitais com precisão dimensional. Indicado para reposição de componentes descontinuados e produtos sem documentação.', tags: ['Escaneamento', 'CAD', 'Metrologia'], destaque: true },
  { titulo: 'Peças Funcionais', descricao: 'Componentes para uso real, fabricados em materiais de alto desempenho que suportam carga, temperatura extrema e desgaste mecânico.', tags: ['Nylon', 'PC', 'TPU', 'ASA'], destaque: false },
  { titulo: 'Modelagem 3D', descricao: 'Criamos modelos paramétricos a partir de desenhos, fotos ou descrições. Da ideia ao arquivo em formato pronto para impressão ou fabricação.', tags: ['CAD', 'STEP', 'STL', 'OBJ'], destaque: false },
  { titulo: 'Pós-processamento', descricao: 'Acabamento, pintura, primer, lixamento e tratamento superficial. Peças prontas para apresentação, exposição ou uso final imediato.', tags: ['Acabamento', 'Pintura', 'Montagem'], destaque: false },
  { titulo: 'Produção sob Demanda', descricao: 'Pequenas séries e lotes repetitivos para mercado, exposição ou uso industrial. Sem mínimo de peças, sem investimento em ferramental.', tags: ['Séries', 'Lotes', 'Repetitivos'], destaque: false },
];

const pages = [
  {
    slug: 'index',
    title: 'Home',
    blocks: [
      {
        type: 'hero',
        content: {
          titulo: 'Do modelo digital<br />à peça física.',
          subtitulo: 'Do briefing à peça final: engenharia aplicada, seleção criteriosa de material e controle dimensional em cada etapa. Para indústria, arquitetura e produto.',
          imagem_url: 'assets/images/hero/hero-home.jpg',
          cta_texto: 'Iniciar Projeto',
          cta_link: 'orcamento.html',
          cta_secundario_texto: 'Ver Portfólio →',
          cta_secundario_link: 'portfolio.html',
        },
      },
      {
        type: 'stats_bar',
        content: {
          stats: [
            { valor: '+800', label: 'Projetos entregues' },
            { valor: '5 anos', label: 'De operação' },
            { valor: '12+', label: 'Materiais disponíveis' },
          ],
        },
      },
      {
        type: 'sector_ticker',
        content: {
          setores: [
            'Indústria Automotiva',
            'Arquitetura & Construção',
            'Produto & Design',
            'Saúde & Medicina',
            'Aeroespacial',
            'Educação & Pesquisa',
          ],
        },
      },
      {
        type: 'stats_bar',
        content: {
          stats: [
            { valor: '97%', label: 'de aprovação na primeira entrega' },
            { valor: '48h', label: 'prazo médio para protótipos simples' },
            { valor: '0,1mm', label: 'resolução de camada mínima' },
            { valor: 'SLA 24h', label: 'resposta garantida para orçamentos' },
          ],
        },
      },
      {
        type: 'problem_cards',
        content: {
          titulo: 'Não tem arquivo 3D? <br /><em>Partimos do que você tem.</em>',
          subtitulo: 'Problema resolvido',
          descricao: 'A maioria dos clientes chega sem modelo digital: uma peça física, um desenho, uma foto ou apenas uma descrição do problema. A partir daí, cuidamos da modelagem, do escaneamento e da engenharia reversa necessária para chegar ao arquivo de impressão.',
          cards: [
            { titulo: 'Tenho uma peça física', descricao: 'Fazemos escaneamento 3D e engenharia reversa' },
            { titulo: 'Tenho um desenho ou croqui', descricao: 'Modelamos em 3D a partir do seu material' },
            { titulo: 'Tenho apenas uma ideia', descricao: 'Briefing → conceito → modelo → impressão' },
          ],
          cta_texto: 'Quero começar assim',
          cta_link: 'orcamento.html',
        },
      },
      {
        type: 'solutions_grid',
        content: {
          titulo: 'Soluções para cada etapa <br />do seu projeto',
          subtitulo: 'O que fazemos',
          cards: SOLUTION_CARDS_HOME,
        },
      },
      {
        type: 'featured_service',
        content: {
          titulo: 'Engenharia Reversa',
          descricao: 'Peça descontinuada? Componente sem documentação? Digitalizamos, reconstruímos o modelo paramétrico e entregamos uma peça nova, idêntica ao original ou com melhorias definidas junto com você.',
          bullets: [
            'Precisão dimensional de até 0,05mm',
            'Entrega de arquivo CAD editável',
            'Validação dimensional com relatório',
          ],
          cta_texto: 'Saiba mais',
          cta_link: 'engenharia-reversa.html',
          cta_secundario_texto: 'Solicitar orçamento',
          cta_secundario_link: 'orcamento.html',
        },
      },
      {
        type: 'portfolio_grid',
        content: {
          titulo: 'Projetos em destaque',
          subtitulo: 'Portfólio',
          projetos: [
            { imagem_url: 'assets/images/engenharia-reversa/portfolio-reversa.jpg', categoria: 'Engenharia Reversa', titulo: 'Peça de reposição automotiva', descricao: 'Componente descontinuado recriado via escaneamento 3D com tolerância de ±0,1mm', material: 'PA12 · Nylon' },
            { imagem_url: 'assets/images/maquetes/portfolio-arquitetura.jpg', categoria: 'Arquitetura', titulo: 'Maquete arquitetônica 1:100', descricao: 'Complexo residencial em escala com detalhamento de fachada e paisagismo', material: 'PLA · Acabamento premium' },
            { imagem_url: 'assets/images/prototipos/portfolio-produto-01.jpg', categoria: 'Produto', titulo: 'Protótipo de produto de consumo', descricao: 'MVP para apresentação a investidores com encaixe funcional e acabamento pintado', material: 'ABS · Pintado' },
          ],
        },
      },
      {
        type: 'founder_bio',
        content: {
          nome: 'Pedro',
          cargo: 'Engenheiro · Fundador da 3DCPX',
          texto: 'Cinco anos de oficina, mais de 800 projetos entregues. Comecei com uma impressora e a convicção de que a manufatura aditiva resolve problemas concretos de engenharia. Até hoje reviso cada arquivo antes da impressão e acompanho a produção em cada etapa.',
          citacao: 'Impressão 3D não é sobre tecnologia: é sobre resolver o problema que o cliente tem na frente.',
          imagem_url: '',
          cta_texto: 'Conheça a história →',
          cta_link: 'sobre.html',
        },
      },
      {
        type: 'workshop_specs',
        content: {
          titulo: 'Onde o projeto<br />vira peça real.',
          subtitulo: 'A Oficina',
          itens: [
            { titulo: 'FDM Industrial', descricao: 'Multi-material, câmara fechada, alta temperatura' },
            { titulo: 'Resina SLA', descricao: 'Alta resolução para detalhes finos e superfícies lisas' },
            { titulo: 'Escaneamento 3D', descricao: 'Precisão de 0,05mm para engenharia reversa' },
            { titulo: 'Área de acabamento', descricao: 'Pintura, lixamento, montagem e encapsulamento' },
          ],
          cta_texto: 'Ver a oficina →',
          cta_link: 'sobre.html',
        },
      },
      {
        type: 'cta_final',
        content: {
          titulo: 'Seu projeto<br />começa aqui.',
          subtitulo: 'Descreva o que precisa: uma ideia, uma peça ou um croqui. Retornamos em até 24h com análise técnica e orçamento.',
          cta_texto: 'Iniciar Projeto',
          cta_link: 'orcamento.html',
          cta_secundario_texto: 'Ver Portfólio',
          cta_secundario_link: 'portfolio.html',
          whatsapp_link: WHATSAPP_LINK,
        },
      },
      { type: 'footer', content: FOOTER_CONTENT },
    ],
  },

  {
    slug: 'solucoes',
    title: 'Soluções',
    blocks: [
      {
        type: 'hero',
        content: {
          titulo: 'Cada projeto.<br /><em>A solução certa.</em>',
          subtitulo: 'Da ideia ao objeto final: serviços que cobrem cada etapa do desenvolvimento de produto, com material e processo escolhidos conforme a aplicação de cada peça.',
          imagem_url: 'assets/images/hero/hero-solucoes.jpg',
          cta_texto: '',
          cta_link: '',
          cta_secundario_texto: '',
          cta_secundario_link: '',
        },
      },
      {
        type: 'solutions_grid',
        content: {
          titulo: '',
          subtitulo: '',
          cards: SOLUTION_CARDS_SOLUCOES,
        },
      },
      {
        type: 'process_steps',
        content: {
          passos: [
            { numero: '01', texto: 'Briefing — Você descreve o projeto por WhatsApp, e-mail ou formulário. Nenhum arquivo é obrigatório nessa etapa: uma foto ou uma descrição já é suficiente para começarmos.' },
            { numero: '02', texto: 'Análise técnica — Avaliamos viabilidade, material ideal, tolerâncias e método de impressão. Resposta garantida em até 24h com recomendações técnicas documentadas.' },
            { numero: '03', texto: 'Orçamento — Proposta transparente com prazo, custo e especificações técnicas. Sem cobranças surpresa, sem taxas ocultas. Você aprova antes de qualquer produção.' },
            { numero: '04', texto: 'Produção — Imprimimos com controle de qualidade em cada etapa e acompanhamento em tempo real, para que você saiba exatamente em que ponto está o seu projeto.' },
            { numero: '05', texto: 'Entrega — Envio com embalagem adequada ou retirada na oficina. Nota fiscal e documentação técnica incluídas. Acompanhamento pós-entrega disponível.' },
          ],
        },
      },
      {
        type: 'cta_final',
        content: {
          titulo: 'Qual solução<br />o seu projeto precisa?',
          subtitulo: 'Conte o desafio — material, prazo ou complexidade. Nossa equipe indica o melhor caminho e envia o orçamento em 24h.',
          cta_texto: 'Solicitar orçamento',
          cta_link: 'orcamento.html',
          cta_secundario_texto: 'Eng. Reversa →',
          cta_secundario_link: 'engenharia-reversa.html',
          whatsapp_link: WHATSAPP_LINK,
        },
      },
      { type: 'footer', content: FOOTER_CONTENT },
    ],
  },

  {
    slug: 'engenharia-reversa',
    title: 'Engenharia Reversa',
    blocks: [
      {
        type: 'hero',
        content: {
          titulo: 'Da peça física<br /><em>ao digital — e de volta.</em>',
          subtitulo: 'Digitalizamos objetos reais, reconstruímos o modelo paramétrico e entregamos uma peça nova — idêntica ou melhorada — com documentação técnica completa.',
          imagem_url: 'assets/images/hero/hero-engenharia-reversa.jpg',
          cta_texto: '',
          cta_link: '',
          cta_secundario_texto: '',
          cta_secundario_link: '',
        },
      },
      {
        type: 'featured_service',
        content: {
          titulo: 'Engenharia Reversa',
          descricao: 'Peça descontinuada? Componente sem documentação? Produto herdado sem arquivos digitais? Nós digitalizamos, reconstruímos o modelo paramétrico e entregamos uma peça nova — idêntica ou melhorada.',
          bullets: [
            'Precisão dimensional de até 0,05mm',
            'Entrega de arquivo CAD editável (STEP, IGES, SolidWorks)',
            'Relatório de validação dimensional completo',
            'Compatível com qualquer material de impressão',
            'NDA disponível mediante solicitação',
          ],
          cta_texto: 'Solicitar orçamento',
          cta_link: 'orcamento.html',
          cta_secundario_texto: '',
          cta_secundario_link: '',
        },
      },
      {
        type: 'solutions_grid',
        content: {
          titulo: 'Quando usar<br />engenharia reversa?',
          subtitulo: 'Aplicações',
          cards: [
            { titulo: 'Indústria Automotiva', descricao: 'Reposição de peças descontinuadas, suportes e brackets legados, componentes de linha fora de produção.', tags: [], destaque: false },
            { titulo: 'Equipamentos Industriais', descricao: 'Peças de maquinário sem documentação, componentes de equipamentos importados descontinuados.', tags: [], destaque: false },
            { titulo: 'Arquitetura & Design', descricao: 'Elementos decorativos únicos, peças de restauração histórica, ornamentos com geometria complexa.', tags: [], destaque: false },
            { titulo: 'Saúde & Pesquisa', descricao: 'Dispositivos médicos customizados, próteses e órteses individualizadas, instrumentos cirúrgicos específicos.', tags: [], destaque: false },
          ],
        },
      },
      {
        type: 'process_steps',
        content: {
          passos: [
            { numero: '→', texto: 'Precisão de escaneamento — Resolução de até 0,05mm com scanner 3D de alta definição. Captura geometrias complexas, superfícies orgânicas e features internas com fidelidade metrológica.' },
            { numero: '→', texto: 'Reconstrução paramétrica — Convertemos a nuvem de pontos em modelo CAD paramétrico editável — não apenas em mesh. O arquivo entregue pode ser modificado, adaptado e integrado ao seu fluxo de CAD.' },
            { numero: '→', texto: 'Formatos de entrega — STEP, IGES, STL, OBJ, SolidWorks (.SLDPRT), Fusion 360 e outros sob solicitação. Compatível com qualquer CAD do mercado.' },
            { numero: '→', texto: 'Validação dimensional — Relatório de comparação entre peça original e modelo digital com mapa de desvios colorido. Garantia de que a peça nova está dentro das tolerâncias especificadas.' },
          ],
        },
      },
      {
        type: 'cta_final',
        content: {
          titulo: 'Mande uma foto.<br />Nós cuidamos do resto.',
          subtitulo: 'Uma imagem ou a peça física já é suficiente para começarmos a análise técnica. Orçamento em 24h, sem compromisso.',
          cta_texto: 'Solicitar orçamento',
          cta_link: 'orcamento.html',
          cta_secundario_texto: 'Ver projetos →',
          cta_secundario_link: 'portfolio.html',
          whatsapp_link: WHATSAPP_LINK,
        },
      },
      { type: 'footer', content: FOOTER_CONTENT },
    ],
  },

  {
    slug: 'portfolio',
    title: 'Portfólio',
    blocks: [
      {
        type: 'hero',
        content: {
          titulo: 'Projetos que<br /><em>saíram do papel.</em>',
          subtitulo: 'Mais de 800 projetos entregues para indústria, arquitetura, produto e pesquisa. Cada peça com engenharia real por trás.',
          imagem_url: 'assets/images/hero/hero-portfolio.jpg',
          cta_texto: '',
          cta_link: '',
          cta_secundario_texto: '',
          cta_secundario_link: '',
        },
      },
      {
        type: 'portfolio_grid',
        content: {
          titulo: '',
          subtitulo: '',
          projetos: [
            { imagem_url: 'assets/images/engenharia-reversa/portfolio-reversa.jpg', categoria: 'Engenharia Reversa', titulo: 'Peça de reposição automotiva', descricao: 'Componente descontinuado recriado via escaneamento 3D com tolerância de ±0,1mm', material: 'PA12 · Nylon' },
            { imagem_url: 'assets/images/maquetes/portfolio-destaque.jpg', categoria: 'Arquitetura', titulo: 'Maquete arquitetônica 1:100', descricao: 'Complexo residencial em escala com detalhamento de fachada e paisagismo', material: 'PLA · Acabamento premium' },
            { imagem_url: 'assets/images/prototipos/portfolio-produto-01.jpg', categoria: 'Produto', titulo: 'Protótipo de produto de consumo', descricao: 'MVP para apresentação a investidores com encaixe funcional e acabamento pintado', material: 'ABS · Pintado' },
            { imagem_url: 'assets/images/portfolio/portfolio-industria.jpg', categoria: 'Indústria', titulo: 'Fixture para linha de montagem', descricao: 'Gabarito de posicionamento com 8 pontos de referência para montagem de componentes eletrônicos', material: 'PC · Alta temperatura' },
            { imagem_url: 'assets/images/engenharia-reversa/portfolio-reversa-02.jpg', categoria: 'Engenharia Reversa', titulo: 'Componente hidráulico legado', descricao: 'Reconstrução digital de peça sem documentação, com validação dimensional completa', material: 'PETG · Alta resistência' },
            { imagem_url: 'assets/images/prototipos/portfolio-produto-02.jpg', categoria: 'Produto', titulo: 'Acessório ergonômico customizado', descricao: 'Série de 50 unidades com variações dimensionais por tamanho P, M e G', material: 'TPU · Flexível' },
          ],
        },
      },
      {
        type: 'cta_final',
        content: {
          titulo: 'Vamos criar<br />algo juntos?',
          subtitulo: 'Conte o que precisa. Analisamos a viabilidade técnica e enviamos orçamento em até 24h, sem compromisso.',
          cta_texto: 'Iniciar Projeto',
          cta_link: 'orcamento.html',
          cta_secundario_texto: 'Ver soluções →',
          cta_secundario_link: 'solucoes.html',
          whatsapp_link: WHATSAPP_LINK,
        },
      },
      { type: 'footer', content: FOOTER_CONTENT },
    ],
  },

  {
    slug: 'sobre',
    title: 'Sobre',
    blocks: [
      {
        type: 'hero',
        content: {
          titulo: 'Por trás de<br /><em>cada peça.</em>',
          subtitulo: 'Não somos um serviço online que terceiriza a produção. Cada projeto passa pelos olhos e pelas mãos de quem construiu a 3DCPX desde o início.',
          imagem_url: 'assets/images/hero/hero-sobre.jpg',
          cta_texto: '',
          cta_link: '',
          cta_secundario_texto: '',
          cta_secundario_link: '',
        },
      },
      {
        type: 'founder_bio',
        content: {
          nome: 'Pedro',
          cargo: 'o engenheiro por trás da oficina',
          texto: 'Engenheiro de formação, maker por vocação. Comecei a 3DCPX com uma impressora, uma mesa e a certeza de que impressão 3D podia resolver problemas reais — não só fazer bugigangas.\n\nCinco anos depois, já são mais de 800 projetos entregues para clientes em todo o Brasil — da indústria automotiva a startups de produto, de escritórios de arquitetura a laboratórios de pesquisa. O que não mudou: eu ainda reviso cada arquivo, calibro cada máquina e acompanho cada impressão. Isso é o que garante a qualidade que nossos clientes conhecem.\n\nA formação em engenharia me deu o vocabulário técnico para conversar com o cliente e entender o que a peça realmente precisa fazer — não só como ela precisa parecer. Isso muda tudo no resultado final.',
          citacao: 'Impressão 3D não é sobre tecnologia — é sobre resolver o problema que o cliente tem na frente.',
          imagem_url: 'assets/images/pedro/pedro-retrato.jpg',
          cta_texto: 'Trabalhar juntos',
          cta_link: 'orcamento.html',
        },
      },
      {
        type: 'workshop_specs',
        content: {
          titulo: 'Onde acontece a magia — <em>e a engenharia.</em>',
          subtitulo: 'A Oficina',
          itens: [
            { titulo: 'FDM Industrial', descricao: 'Multi-material, câmara fechada, impressão em alta temperatura (até 300°C)' },
            { titulo: 'Resina SLA', descricao: 'Alta resolução (25µm) para detalhes finos e superfícies extremamente lisas' },
            { titulo: 'Escaneamento 3D', descricao: 'Precisão de 0,05mm para engenharia reversa e metrologia' },
            { titulo: 'Área de acabamento', descricao: 'Pintura, lixamento, montagem, colagem e encapsulamento' },
          ],
          cta_texto: '',
          cta_link: '',
        },
      },
      {
        type: 'process_steps',
        content: {
          passos: [
            { numero: '→', texto: 'Produção própria, 100% — Toda impressão acontece na nossa oficina. Nenhum projeto é terceirizado. Você fala com quem produz e recebe de quem fez.' },
            { numero: '→', texto: 'Análise técnica antes do orçamento — Não imprimimos sem entender a aplicação. Material, orientação, tolerância e acabamento são decididos com base no uso real da peça.' },
            { numero: '→', texto: 'Transparência total — Orçamento detalhado, prazo real, acompanhamento em cada etapa. Sem surpresas no final, sem cobranças não previstas.' },
            { numero: '→', texto: 'Sigilo garantido — Seus arquivos e projetos são confidenciais. Assinamos NDA mediante solicitação e nunca reutilizamos arquivos de clientes.' },
          ],
        },
      },
      {
        type: 'cta_final',
        content: {
          titulo: 'Pronto para<br />iniciar um projeto?',
          subtitulo: 'Fale diretamente com Pedro. Descreva o desafio e receba análise técnica e orçamento em até 24h.',
          cta_texto: 'Iniciar Projeto',
          cta_link: 'orcamento.html',
          cta_secundario_texto: 'Ver portfólio →',
          cta_secundario_link: 'portfolio.html',
          whatsapp_link: WHATSAPP_LINK,
        },
      },
      { type: 'footer', content: FOOTER_CONTENT },
    ],
  },

  {
    slug: 'orcamento',
    title: 'Orçamento',
    blocks: [
      {
        type: 'hero',
        content: {
          titulo: 'Iniciar<br /><em>um projeto.</em>',
          subtitulo: 'Descreva o que precisa — uma ideia, uma peça quebrada, um croqui ou um arquivo pronto. Retornamos com análise técnica e orçamento em até 24h.',
          imagem_url: '',
          cta_texto: '',
          cta_link: '',
          cta_secundario_texto: '',
          cta_secundario_link: '',
        },
      },
      {
        type: 'cta_final',
        content: {
          titulo: 'WhatsApp,<br />e-mail ou formulário.',
          subtitulo: 'Qualquer canal funciona. O importante é ter sua ideia chegando até nós — o resto é nossa responsabilidade.',
          cta_texto: 'Abrir WhatsApp',
          cta_link: WHATSAPP_LINK,
          cta_secundario_texto: 'Enviar e-mail',
          cta_secundario_link: 'mailto:contato@3dcpx.com.br',
          whatsapp_link: WHATSAPP_LINK,
        },
      },
      { type: 'footer', content: FOOTER_CONTENT },
    ],
  },
];

module.exports = { pages };
