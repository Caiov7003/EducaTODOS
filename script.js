// =====================
// Ajuste de Fonte
// =====================
function adjustFontSize(change) {
  const content = document.querySelector('.container') || document.body;
  if (!content) return;
  const currentSize = parseFloat(window.getComputedStyle(content).fontSize);
  content.style.fontSize = (currentSize + change) + 'px';
}

// =====================
// Modo Alto Contraste
// =====================
function toggleContrast() {
  document.body.classList.toggle('high-contrast');

  const contrastToggle = document.getElementById('alto-contraste-btn');
  const isHighContrast = document.body.classList.contains('high-contrast');

  if (contrastToggle) {
    contrastToggle.innerText = isHighContrast
      ? 'Desativar Modo Alto Contraste'
      : 'Ativar Modo Alto Contraste';
  }

  localStorage.setItem('contrastMode', isHighContrast ? 'enabled' : 'disabled');
}

function applySavedContrastMode() {
  const isHighContrast = localStorage.getItem('contrastMode') === 'enabled';
  if (isHighContrast) {
    document.body.classList.add('high-contrast');
    const btn = document.getElementById('alto-contraste-btn');
    if (btn) btn.innerText = 'Desativar Modo Alto Contraste';
  }
}

// =====================
// Login / Logout
// =====================
function checkLogin() {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const loginLink = document.getElementById('loginLink');
  const logoutButton = document.getElementById('logoutButton');

  if (isLoggedIn === 'true') {
    if (loginLink) loginLink.style.display = 'none';
    if (logoutButton) logoutButton.style.display = 'inline-block';
  } else {
    if (loginLink) loginLink.style.display = 'inline-block';
    if (logoutButton) logoutButton.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Botão Menu Mobile
  const nav = document.querySelector('nav ul');
  if (nav) {
    const toggle = document.createElement('button');
    toggle.textContent = 'Menu';
    toggle.style.color = 'white';
    toggle.style.background = 'transparent';
    toggle.style.border = 'none';
    toggle.style.cursor = 'pointer';
    toggle.style.fontSize = '16px';
    document.querySelector('nav').prepend(toggle);

    toggle.addEventListener('click', () => nav.classList.toggle('show'));
  }

  // Botão de Alto Contraste
  const altoContrasteBtn = document.getElementById('alto-contraste-btn');
  if (altoContrasteBtn) altoContrasteBtn.addEventListener('click', toggleContrast);
  applySavedContrastMode();

  // Login
  checkLogin();

  // Ícone de Música
  const musicItem = document.getElementById('musicIcon');
  if (musicItem) {
    musicItem.innerHTML = '▶️'; // Começa com ícone de play
    musicItem.addEventListener('click', function () {
      this.classList.toggle('play');
      this.innerHTML = this.classList.contains('play') ? '⏸️' : '▶️';
    });
  }
});

// =====================
// Quiz
// =====================
let score = 0;
function createQuiz(year) {
  const questions = {}; // Adicione perguntas aqui
  const quizData = questions[year];
  if (!quizData) return '';

  return quizData.map((q, index) => `
      <div>
          <p>${index + 1}. ${q.question}</p>
          ${q.options.map(option => `<button onclick="checkAnswer('${option}', '${q.answer}')">${option}</button>`).join('')}
      </div>
  `).join('');
}

function checkAnswer(selected, correct) {
  if (selected === correct) score++;
  const questionsCount = document.querySelectorAll('#quizQuestions div').length;
  if (score + document.querySelectorAll('.answered').length >= questionsCount) {
    alert(`Seu resultado: ${score} de ${questionsCount}`);
  }
}

// =====================
// Cookies
// =====================
function setCookie(name, value, days) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
  }
  return null;
}
