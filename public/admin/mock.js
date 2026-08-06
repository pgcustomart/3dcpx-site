/* ── Dados mockados do CMS 3DCPX ─────────────────────────────────────
   Centralizado para ficar fácil trocar por dado real depois. Cada bloco
   comenta o endpoint que ainda não existe no backend e que deveria
   alimentar aquele dado quando o recurso for implementado. Nada aqui é
   persistido — é só o que aparece na tela até haver API real. */

const MOCK = {
  // MOCK — integrar com um serviço de analytics (ex.: Plausible/GA4/tabela própria de eventos)
  acessosPorDia: {
    labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
    data: [182, 204, 176, 233, 261, 198, 154],
  },

  // MOCK — integrar com GET /api/analytics/devices
  dispositivos: { labels: ['Mobile', 'Desktop', 'Tablet'], data: [58, 34, 8] },

  // MOCK — integrar com GET /api/analytics/traffic-sources
  origemTrafego: [
    { origem: 'Busca orgânica', pct: 42 },
    { origem: 'Direto', pct: 27 },
    { origem: 'Redes sociais', pct: 18 },
    { origem: 'Referência', pct: 8 },
    { origem: 'E-mail', pct: 5 },
  ],

  // MOCK — integrar com GET /api/analytics/pages
  paginasMaisAcessadas: [
    { pagina: 'Home', visitas: 2840, tempoMedio: '2m 12s' },
    { pagina: 'Portfólio', visitas: 1620, tempoMedio: '3m 04s' },
    { pagina: 'Soluções', visitas: 1194, tempoMedio: '1m 48s' },
    { pagina: 'Engenharia Reversa', visitas: 902, tempoMedio: '2m 31s' },
    { pagina: 'Orçamento', visitas: 745, tempoMedio: '4m 10s' },
    { pagina: 'Sobre', visitas: 511, tempoMedio: '1m 22s' },
  ],

  // MOCK — integrar com GET /api/analytics/events
  eventos: [
    { evento: 'Clique em "Iniciar Projeto"', ocorrencias: 312, ultima: '2026-08-06T14:22:00' },
    { evento: 'Envio do formulário de orçamento', ocorrencias: 89, ultima: '2026-08-06T11:05:00' },
    { evento: 'Clique no WhatsApp', ocorrencias: 204, ultima: '2026-08-06T09:40:00' },
    { evento: 'Scroll até o final da Home', ocorrencias: 587, ultima: '2026-08-05T22:10:00' },
    { evento: 'Filtro de portfólio usado', ocorrencias: 133, ultima: '2026-08-05T18:33:00' },
  ],

  // MOCK — integrar com GET /api/analytics/conversions
  conversoes: { taxa: '4.8%', totalMes: 96, metaMes: 120, historico: [3.1, 3.6, 4.0, 4.2, 4.5, 4.8] },

  // MOCK — integrar com GET /api/system/storage
  espacoUtilizado: { usadoMb: 340, totalMb: 1024 },

  // MOCK — integrar com GET /api/backups
  backups: [
    { nome: 'Backup automático diário', data: '2026-08-06T03:00:00', tamanho: '4.2 MB', status: 'ok' },
    { nome: 'Backup automático diário', data: '2026-08-05T03:00:00', tamanho: '4.1 MB', status: 'ok' },
    { nome: 'Backup manual (pré-deploy)', data: '2026-08-04T16:40:00', tamanho: '4.1 MB', status: 'ok' },
    { nome: 'Backup automático diário', data: '2026-08-04T03:00:00', tamanho: '4.0 MB', status: 'ok' },
    { nome: 'Backup automático diário', data: '2026-08-03T03:00:00', tamanho: '4.0 MB', status: 'falha' },
  ],

  // MOCK — integrar com API de listagem de recursos do Cloudinary (cloudinary.api.resources)
  uploadsRecentes: [
    { nome: 'hero-home.jpg', tipo: 'imagem', tamanho: '312 KB', quando: '2026-08-05T10:12:00' },
    { nome: 'portfolio-reversa.jpg', tipo: 'imagem', tamanho: '198 KB', quando: '2026-08-04T17:45:00' },
    { nome: 'portfolio-arquitetura.jpg', tipo: 'imagem', tamanho: '256 KB', quando: '2026-08-04T17:40:00' },
    { nome: 'portfolio-produto-01.jpg', tipo: 'imagem', tamanho: '221 KB', quando: '2026-08-03T09:02:00' },
  ],

  // MOCK — integrar com GET /api/seo/score (varredura de meta title/description/imagens alt etc.)
  seoScorePorPagina: {
    index: 86, solucoes: 78, 'engenharia-reversa': 74, portfolio: 81, sobre: 69, orcamento: 72,
  },

  // MOCK — integrar com GET /api/admin-users (endpoint ainda não existe; hoje só /api/auth/me)
  outrosUsuarios: [
    { email: 'equipe@3dcpx.com.br', papel: 'Editor', ultimoAcesso: '2026-08-04T08:15:00', status: 'ativo' },
    { email: 'financeiro@3dcpx.com.br', papel: 'Visualizador', ultimoAcesso: '2026-07-28T13:50:00', status: 'inativo' },
  ],

  // MOCK — integrar com um provedor real (ex.: Zapier, Meta Pixel, Google Analytics, Make)
  integracoes: [
    { nome: 'Google Analytics 4', status: 'não conectado' },
    { nome: 'Meta Pixel', status: 'não conectado' },
    { nome: 'WhatsApp Business API', status: 'não conectado' },
    { nome: 'Zapier', status: 'não conectado' },
  ],

  // MOCK — integrar com uma tabela de audit log real (ação, ator, IP, timestamp)
  logs: [
    { acao: 'Login realizado', ator: 'admin@3dcpx.com.br', quando: '2026-08-06T08:02:00', nivel: 'info' },
    { acao: 'Bloco "Hero" atualizado em Home', ator: 'admin@3dcpx.com.br', quando: '2026-08-05T19:41:00', nivel: 'info' },
    { acao: 'Tentativa de login inválida', ator: 'desconhecido', quando: '2026-08-05T03:22:00', nivel: 'alerta' },
    { acao: 'Upload de imagem realizado', ator: 'admin@3dcpx.com.br', quando: '2026-08-04T17:45:00', nivel: 'info' },
  ],

  // MOCK — integrar com GET /api/blocks/:id/versions quando existir tabela de versionamento
  gerarHistoricoVersoes(blockLabel) {
    return [
      { versao: 'atual', autor: 'admin@3dcpx.com.br', quando: '2026-08-06T14:22:00', resumo: `${blockLabel} — versão em produção` },
      { versao: 'v2', autor: 'admin@3dcpx.com.br', quando: '2026-08-03T10:15:00', resumo: 'Texto do título ajustado' },
      { versao: 'v1', autor: 'admin@3dcpx.com.br', quando: '2026-07-20T09:00:00', resumo: 'Criação do bloco' },
    ];
  },

  // MOCK — integrar com um soft-delete real na tabela blocks (coluna deleted_at)
  lixeira: [
    { item: 'Bloco "CTA promocional" (Home)', excluidoEm: '2026-08-01T12:00:00', excluidoPor: 'admin@3dcpx.com.br' },
    { item: 'Bloco "Depoimentos" (Sobre)', excluidoEm: '2026-07-22T15:30:00', excluidoPor: 'admin@3dcpx.com.br' },
  ],

  // MOCK — integrar com uma tabela de submissões (o form de orçamento hoje não persiste envios)
  formSubmissions: [
    { nome: 'João Ferreira', email: 'joao@empresa.com.br', assunto: 'Orçamento — engenharia reversa', quando: '2026-08-06T09:12:00', status: 'novo' },
    { nome: 'Marina Souza', email: 'marina@studio.com', assunto: 'Orçamento — maquete arquitetônica', quando: '2026-08-05T16:40:00', status: 'respondido' },
    { nome: 'Carlos Nogueira', email: 'carlos@industria.com.br', assunto: 'Orçamento — peça funcional', quando: '2026-08-04T11:05:00', status: 'respondido' },
  ],

  // MOCK — status de infra: Railway/Cloudinary não têm endpoint de health exposto ao frontend
  statusInfra: {
    railway: 'operacional',
    cloudinary: 'não configurado',
  },
};

