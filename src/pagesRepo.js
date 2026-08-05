const pool = require('./db');

async function getPageBySlug(slug) {
  const { rows } = await pool.query('SELECT id, slug, title FROM pages WHERE slug = $1', [slug]);
  return rows[0] || null;
}

async function listPages() {
  const { rows } = await pool.query('SELECT id, slug, title FROM pages ORDER BY id');
  return rows;
}

async function getBlocksForPage(pageId) {
  const { rows } = await pool.query(
    'SELECT id, page_id, type, content, "order", visible FROM blocks WHERE page_id = $1 ORDER BY "order" ASC',
    [pageId]
  );
  return rows;
}

module.exports = { getPageBySlug, listPages, getBlocksForPage };
