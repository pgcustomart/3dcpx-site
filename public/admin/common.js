async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  });
  if (res.status === 401) {
    window.location.href = '/admin/login.html';
    throw new Error('Não autenticado');
  }
  return res;
}

async function requireSession() {
  const res = await fetch('/api/auth/me', { credentials: 'same-origin' });
  if (!res.ok) {
    window.location.href = '/admin/login.html';
    return null;
  }
  return res.json();
}

function wireLogout(el) {
  el.addEventListener('click', async () => {
    await apiFetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login.html';
  });
}

const PAGE_ROUTE_BY_SLUG = {
  index: '/',
  solucoes: '/solucoes.html',
  'engenharia-reversa': '/engenharia-reversa.html',
  portfolio: '/portfolio.html',
  sobre: '/sobre.html',
  orcamento: '/orcamento.html',
};

const BLOCK_TYPE_LABELS = {
  hero: 'Hero',
  stats_bar: 'Barra de estatísticas',
  sector_ticker: 'Ticker de setores',
  problem_cards: 'Cards de problema',
  solutions_grid: 'Grade de soluções',
  process_steps: 'Passos do processo',
  featured_service: 'Serviço em destaque',
  portfolio_grid: 'Grade de portfólio',
  founder_bio: 'Bio do fundador',
  workshop_specs: 'Specs da oficina',
  cta_final: 'CTA final',
  footer: 'Rodapé',
};

function blockLabel(block) {
  const c = block.content || {};
  return c.titulo || c.nome || c.descricao || BLOCK_TYPE_LABELS[block.type] || block.type;
}
