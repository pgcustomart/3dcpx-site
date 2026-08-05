require('dotenv').config();
const pool = require('../src/db');
const { pages } = require('../src/seedData');

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    for (const page of pages) {
      const { rows } = await client.query(
        `INSERT INTO pages (slug, title) VALUES ($1, $2)
         ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title
         RETURNING id`,
        [page.slug, page.title]
      );
      const pageId = rows[0].id;

      // Reseed: substitui os blocks existentes da página pelo conteúdo migrado.
      await client.query('DELETE FROM blocks WHERE page_id = $1', [pageId]);

      let order = 0;
      for (const block of page.blocks) {
        await client.query(
          `INSERT INTO blocks (page_id, type, content, "order", visible)
           VALUES ($1, $2, $3, $4, true)`,
          [pageId, block.type, JSON.stringify(block.content), order]
        );
        order += 1;
      }

      console.log(`Seed OK: ${page.slug} (${page.blocks.length} blocks)`);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((err) => {
  console.error('Falha no seed:', err);
  process.exit(1);
});
