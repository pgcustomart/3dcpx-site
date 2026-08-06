// Schema fixo de cada tipo de bloco do catálogo (prompt-painel-admin-3dcpx.md).
// sanitizeContent() nunca confia no que vem do frontend: descarta chaves
// desconhecidas, força o tipo de cada campo e preenche o que faltar com um
// default seguro, para o JSONB salvo no banco sempre ter o shape esperado.

const str = (v) => (v === null || v === undefined ? '' : String(v));
const bool = (v) => Boolean(v);

function arrayOf(mapItem) {
  return (v) => (Array.isArray(v) ? v.map(mapItem) : []);
}

const mapStat = (item) => ({ valor: str(item && item.valor), label: str(item && item.label) });
const mapCard = (item) => ({
  titulo: str(item && item.titulo),
  descricao: str(item && item.descricao),
  tags: Array.isArray(item && item.tags) ? item.tags.map(str) : [],
  destaque: bool(item && item.destaque),
});
const mapSimpleCard = (item) => ({ titulo: str(item && item.titulo), descricao: str(item && item.descricao) });
const mapPasso = (item) => ({ numero: str(item && item.numero), texto: str(item && item.texto) });
const mapProjeto = (item) => ({
  imagem_url: str(item && item.imagem_url),
  categoria: str(item && item.categoria),
  titulo: str(item && item.titulo),
  descricao: str(item && item.descricao),
  material: str(item && item.material),
});
const mapLink = (item) => ({ nome: str(item && item.nome), link: str(item && item.link) });
const mapTextLink = (item) => ({ texto: str(item && item.texto), link: str(item && item.link) });

const SCHEMAS = {
  hero: {
    titulo: str,
    subtitulo: str,
    imagem_url: str,
    cta_texto: str,
    cta_link: str,
    cta_secundario_texto: str,
    cta_secundario_link: str,
  },
  stats_bar: {
    stats: arrayOf(mapStat),
  },
  sector_ticker: {
    setores: arrayOf(str),
  },
  problem_cards: {
    titulo: str,
    subtitulo: str,
    descricao: str,
    cards: arrayOf(mapSimpleCard),
    cta_texto: str,
    cta_link: str,
  },
  solutions_grid: {
    titulo: str,
    subtitulo: str,
    cards: arrayOf(mapCard),
  },
  process_steps: {
    passos: arrayOf(mapPasso),
  },
  featured_service: {
    titulo: str,
    descricao: str,
    bullets: arrayOf(str),
    cta_texto: str,
    cta_link: str,
    cta_secundario_texto: str,
    cta_secundario_link: str,
  },
  portfolio_grid: {
    titulo: str,
    subtitulo: str,
    projetos: arrayOf(mapProjeto),
  },
  founder_bio: {
    nome: str,
    cargo: str,
    texto: str,
    citacao: str,
    imagem_url: str,
    cta_texto: str,
    cta_link: str,
  },
  workshop_specs: {
    titulo: str,
    subtitulo: str,
    itens: arrayOf(mapSimpleCard),
    cta_texto: str,
    cta_link: str,
  },
  cta_final: {
    titulo: str,
    subtitulo: str,
    cta_texto: str,
    cta_link: str,
    cta_secundario_texto: str,
    cta_secundario_link: str,
    whatsapp_link: str,
  },
  footer: {
    descricao: str,
    redes_sociais: arrayOf(mapLink),
    servicos: arrayOf(mapTextLink),
    empresa: arrayOf(mapTextLink),
    email: str,
    whatsapp_link: str,
    horario: str,
    cnpj: str,
  },
};

const BLOCK_TYPES = Object.keys(SCHEMAS);

function isKnownType(type) {
  return Object.prototype.hasOwnProperty.call(SCHEMAS, type);
}

function sanitizeContent(type, rawContent) {
  const schema = SCHEMAS[type];
  if (!schema) {
    throw new Error(`Tipo de bloco desconhecido: ${type}`);
  }
  const input = rawContent && typeof rawContent === 'object' ? rawContent : {};
  const clean = {};
  for (const [key, mapField] of Object.entries(schema)) {
    clean[key] = mapField(input[key]);
  }
  return clean;
}

function emptyContent(type) {
  return sanitizeContent(type, {});
}

module.exports = { SCHEMAS, BLOCK_TYPES, isKnownType, sanitizeContent, emptyContent };
