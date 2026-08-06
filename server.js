require('dotenv').config();
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const sessionMiddleware = require('./src/session');
const authRoutes = require('./src/routes/auth');
const apiRoutes = require('./src/routes/api');
const { getPageBySlug, getBlocksForPage } = require('./src/pagesRepo');
const { renderPage } = require('./src/render/renderPage');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
        scriptSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
    },
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));

// Fallback para agentes que checam /favicon.ico direto na raiz, sem ler as <link> tags.
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'icons', 'favicon.ico'));
});

app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

const ROUTES = {
  '/': 'index',
  '/index.html': 'index',
  '/solucoes.html': 'solucoes',
  '/engenharia-reversa.html': 'engenharia-reversa',
  '/portfolio.html': 'portfolio',
  '/sobre.html': 'sobre',
  '/orcamento.html': 'orcamento',
};

Object.entries(ROUTES).forEach(([route, slug]) => {
  app.get(route, async (req, res, next) => {
    try {
      const page = await getPageBySlug(slug);
      if (!page) {
        res.status(404).send(`Página "${slug}" não encontrada no banco. Rode "npm run seed".`);
        return;
      }
      const blocks = await getBlocksForPage(page.id);
      res.set('Content-Type', 'text/html; charset=utf-8').send(renderPage(slug, blocks));
    } catch (err) {
      next(err);
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno. Veja o log do servidor.' });
});

app.listen(PORT, () => {
  console.log(`3DCPX rodando em http://localhost:${PORT}`);
});
