const express = require('express');
const multer = require('multer');
const { requireAuth } = require('../middleware/auth');
const { listPages, getPageBySlug, getBlocksForPage } = require('../pagesRepo');
const { getBlockById, getNextOrder, createBlock, updateBlock, deleteBlock } = require('../blocksRepo');
const { isKnownType, sanitizeContent, emptyContent, BLOCK_TYPES } = require('../validate/blockSchemas');
const { uploadBuffer, isConfigured } = require('../cloudinary');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8 * 1024 * 1024 } });

router.use(requireAuth);

router.get('/block-types', (req, res) => {
  res.json(BLOCK_TYPES.map((type) => ({ type, defaultContent: emptyContent(type) })));
});

router.get('/pages', async (req, res, next) => {
  try {
    res.json(await listPages());
  } catch (err) {
    next(err);
  }
});

router.get('/pages/:slug/blocks', async (req, res, next) => {
  try {
    const page = await getPageBySlug(req.params.slug);
    if (!page) {
      res.status(404).json({ error: 'Página não encontrada.' });
      return;
    }
    const blocks = await getBlocksForPage(page.id);
    res.json({ page, blocks });
  } catch (err) {
    next(err);
  }
});

router.post('/pages/:slug/blocks', async (req, res, next) => {
  try {
    const page = await getPageBySlug(req.params.slug);
    if (!page) {
      res.status(404).json({ error: 'Página não encontrada.' });
      return;
    }
    const { type } = req.body || {};
    if (!isKnownType(type)) {
      res.status(400).json({ error: `Tipo de bloco inválido. Use um de: ${BLOCK_TYPES.join(', ')}` });
      return;
    }
    const content = sanitizeContent(type, (req.body && req.body.content) || {});
    const order = Number.isInteger(req.body && req.body.order) ? req.body.order : await getNextOrder(page.id);

    const block = await createBlock(page.id, type, content, order);
    res.status(201).json(block);
  } catch (err) {
    next(err);
  }
});

router.patch('/blocks/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const existing = await getBlockById(id);
    if (!existing) {
      res.status(404).json({ error: 'Bloco não encontrado.' });
      return;
    }

    const patch = {};
    if (req.body && req.body.content !== undefined) {
      patch.content = sanitizeContent(existing.type, req.body.content);
    }
    if (req.body && Number.isInteger(req.body.order)) {
      patch.order = req.body.order;
    }
    if (req.body && typeof req.body.visible === 'boolean') {
      patch.visible = req.body.visible;
    }

    const updated = await updateBlock(id, patch);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/blocks/:id', async (req, res, next) => {
  try {
    const ok = await deleteBlock(Number(req.params.id));
    if (!ok) {
      res.status(404).json({ error: 'Bloco não encontrado.' });
      return;
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.post('/upload', upload.single('image'), async (req, res, next) => {
  try {
    if (!isConfigured()) {
      res.status(503).json({ error: 'Cloudinary não configurado (CLOUDINARY_* ausente no .env).' });
      return;
    }
    if (!req.file) {
      res.status(400).json({ error: 'Nenhuma imagem enviada (campo "image").' });
      return;
    }
    if (!req.file.mimetype.startsWith('image/')) {
      res.status(400).json({ error: 'Arquivo precisa ser uma imagem.' });
      return;
    }
    const result = await uploadBuffer(req.file.buffer);
    res.json({ url: result.secure_url });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
