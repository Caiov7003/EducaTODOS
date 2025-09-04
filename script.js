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
  const isActive = document.body.classList.toggle('high-contrast');
  const btn = document.getElementById('alto-contraste-btn');
  if (btn) btn.innerText = isActive ? 'Desativar Contraste' : 'Ativar Contraste';
  localStorage.setItem('contrastMode', isActive ? 'enabled' : 'disabled');
}

function applySavedContrastMode() {
  if (localStorage.getItem('contrastMode') === 'enabled') {
    document.body.classList.add('high-contrast');
    const btn = document.getElementById('alto-contraste-btn');
    if (btn) btn.innerText = 'Desativar Contraste';
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

if (document.getElementById('logoutButton')) {
  document.getElementById('logoutButton').addEventListener('click', function () {
    localStorage.setItem('isLoggedIn', 'false');
    checkLogin();
    window.location.href = 'login.html';
  });
}

// =====================
// Inicialização
// =====================
document.addEventListener('DOMContentLoaded', () => {
  // Menu Mobile
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

  // Botão alto contraste
  const altoBtn = document.getElementById('alto-contraste-btn');
  if (altoBtn) altoBtn.addEventListener('click', toggleContrast);

  // Aplica contraste salvo
  applySavedContrastMode();

  // Login
  checkLogin();

  // Música
  const musicIcon = document.getElementById('musicIcon');
  if (musicIcon) {
    musicIcon.innerHTML = '🎵';
    musicIcon.addEventListener('click', function () {
      this.classList.toggle('play');
      this.innerHTML = this.classList.contains('play') ? '⏸️' : '▶️';
    });
    musicIcon.classList.add('play');
  }
});

// =====================
// Quiz
// =====================
let score = 0;
function createQuiz(year) {
  const questions = {}; // Preencha aqui
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
