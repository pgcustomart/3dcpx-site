const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db');

const isProd = process.env.NODE_ENV === 'production';

if (!process.env.SESSION_SECRET) {
  throw new Error('SESSION_SECRET não definida. Configure no .env.');
}

const sessionMiddleware = session({
  store: new pgSession({ pool, tableName: 'session', createTableIfMissing: true }),
  name: 'cpx.sid',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 8, // 8h
  },
});

module.exports = sessionMiddleware;
