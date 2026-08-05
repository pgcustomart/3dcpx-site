function requireAuth(req, res, next) {
  if (req.session && req.session.adminId) {
    next();
    return;
  }
  res.status(401).json({ error: 'Não autenticado.' });
}

module.exports = { requireAuth };
