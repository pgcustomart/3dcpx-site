const pool = require('./db');

async function findAdminByEmail(email) {
  const { rows } = await pool.query('SELECT id, email, password_hash FROM admin_users WHERE email = $1', [
    email.trim().toLowerCase(),
  ]);
  return rows[0] || null;
}

async function createAdmin(email, passwordHash) {
  const { rows } = await pool.query(
    `INSERT INTO admin_users (email, password_hash) VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash
     RETURNING id, email`,
    [email.trim().toLowerCase(), passwordHash]
  );
  return rows[0];
}

module.exports = { findAdminByEmail, createAdmin };
