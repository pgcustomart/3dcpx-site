const form = document.getElementById('loginForm');
const errorBanner = document.getElementById('errorBanner');
const submitBtn = document.getElementById('submitBtn');

function showError(msg) {
  errorBanner.textContent = msg;
  errorBanner.classList.add('visible');
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorBanner.classList.remove('visible');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Entrando...';

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify({
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      showError(data.error || 'Falha no login.');
      return;
    }
    window.location.href = 'index.html';
  } catch (err) {
    showError('Erro de conexão. Tente novamente.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Entrar';
  }
});
