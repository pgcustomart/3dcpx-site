const pool = require('./db');

async function getBlockById(id) {
  const { rows } = await pool.query(
    'SELECT id, page_id, type, content, "order", visible FROM blocks WHERE id = $1',
    [id]
  );
  return rows[0] || null;
}

async function getNextOrder(pageId) {
  const { rows } = await pool.query('SELECT COALESCE(MAX("order"), -1) + 1 AS next FROM blocks WHERE page_id = $1', [
    pageId,
  ]);
  return rows[0].next;
}

async function createBlock(pageId, type, content, order) {
  const { rows } = await pool.query(
    `INSERT INTO blocks (page_id, type, content, "order", visible)
     VALUES ($1, $2, $3, $4, true)
     RETURNING id, page_id, type, content, "order", visible`,
    [pageId, type, JSON.stringify(content), order]
  );
  return rows[0];
}

async function updateBlock(id, { content, order, visible }) {
  const sets = [];
  const values = [];
  let i = 1;

  if (content !== undefined) {
    sets.push(`content = $${i++}`);
    values.push(JSON.stringify(content));
  }
  if (order !== undefined) {
    sets.push(`"order" = $${i++}`);
    values.push(order);
  }
  if (visible !== undefined) {
    sets.push(`visible = $${i++}`);
    values.push(visible);
  }
  sets.push(`updated_at = NOW()`);

  values.push(id);
  const { rows } = await pool.query(
    `UPDATE blocks SET ${sets.join(', ')} WHERE id = $${i} RETURNING id, page_id, type, content, "order", visible`,
    values
  );
  return rows[0] || null;
}

async function deleteBlock(id) {
  const { rowCount } = await pool.query('DELETE FROM blocks WHERE id = $1', [id]);
  return rowCount > 0;
}

module.exports = { getBlockById, getNextOrder, createBlock, updateBlock, deleteBlock };
