const express = require('express');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const { findAdminByEmail } = require('../authRepo');

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Muitas tentativas de login. Tente novamente em alguns minutos.' },
});

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      res.status(400).json({ error: 'Informe e-mail e senha.' });
      return;
    }

    const admin = await findAdminByEmail(String(email));
    if (!admin) {
      res.status(401).json({ error: 'Credenciais inválidas.' });
      return;
    }

    const ok = await bcrypt.compare(String(password), admin.password_hash);
    if (!ok) {
      res.status(401).json({ error: 'Credenciais inválidas.' });
      return;
    }

    req.session.regenerate((err) => {
      if (err) {
        next(err);
        return;
      }
      req.session.adminId = admin.id;
      req.session.adminEmail = admin.email;
      res.json({ email: admin.email });
    });
  } catch (err) {
    next(err);
  }
});

router.post('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.clearCookie('cpx.sid');
    res.json({ ok: true });
  });
});

router.get('/me', (req, res) => {
  if (req.session && req.session.adminId) {
    res.json({ email: req.session.adminEmail });
  } else {
    res.status(401).json({ error: 'Não autenticado.' });
  }
});

module.exports = router;
