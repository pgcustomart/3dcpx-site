// Cria (ou atualiza a senha de) um usuário admin.
// Uso: ADMIN_EMAIL=voce@exemplo.com ADMIN_PASSWORD=sua-senha node scripts/createAdmin.js
// Ou:  node scripts/createAdmin.js voce@exemplo.com "sua-senha"
require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../src/db');
const { createAdmin } = require('../src/authRepo');

async function main() {
  const email = process.env.ADMIN_EMAIL || process.argv[2];
  const password = process.env.ADMIN_PASSWORD || process.argv[3];

  if (!email || !password) {
    console.error('Uso: ADMIN_EMAIL=voce@exemplo.com ADMIN_PASSWORD=sua-senha node scripts/createAdmin.js');
    console.error('  ou: node scripts/createAdmin.js voce@exemplo.com "sua-senha"');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error('A senha precisa ter pelo menos 8 caracteres.');
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 12);
  const admin = await createAdmin(email, hash);
  console.log(`Admin pronto: ${admin.email} (id ${admin.id})`);
  await pool.end();
}

main().catch((err) => {
  console.error('Falha ao criar admin:', err);
  process.exit(1);
});
