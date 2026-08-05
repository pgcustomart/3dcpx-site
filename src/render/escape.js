function escapeHtml(value) {
  if (value === null || value === undefined) return '';
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function escapeAttr(value) {
  return escapeHtml(value);
}

// Campos de título aceitam um subconjunto pequeno de tags (<br>, <em>, <strong>)
// para preservar quebras de linha e ênfase, como no site estático original.
// O admin é um usuário único e confiável (só o dono do site edita), então isso
// não é uma superfície de XSS para terceiros — mas nunca deve receber HTML vindo
// de formulários públicos (orçamento, contato).
function richText(value) {
  const escaped = escapeHtml(value);
  return escaped
    .replace(/&lt;br\s*\/?&gt;/gi, '<br />')
    .replace(/&lt;em&gt;/gi, '<em>')
    .replace(/&lt;\/em&gt;/gi, '</em>')
    .replace(/&lt;strong&gt;/gi, '<strong>')
    .replace(/&lt;\/strong&gt;/gi, '</strong>');
}

module.exports = { escapeHtml, escapeAttr, richText };
