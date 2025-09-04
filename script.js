// =====================
// Ajuste de Fonte
// =====================
let currentFontSize = parseInt(localStorage.getItem('fontSize')) || 16;

function adjustFontSize(change) {
    currentFontSize += change;
    if (currentFontSize < 12) currentFontSize = 12;
    if (currentFontSize > 24) currentFontSize = 24;
    document.documentElement.style.fontSize = currentFontSize + 'px';
    localStorage.setItem('fontSize', currentFontSize);
}

// Aplica o tamanho de fonte salvo ao carregar
document.documentElement.style.fontSize = currentFontSize + 'px';

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
    const contrastEnabled = localStorage.getItem('contrastMode') === 'enabled';
    if (contrastEnabled) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }

    const btn = document.getElementById('alto-contraste-btn');
    if (btn) btn.innerText = contrastEnabled ? 'Desativar Contraste' : 'Ativar Contraste';
}

// =====================
// Login / Logout
// =====================
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginLink = document.getElementById('loginLink');
    const logoutButton = document.getElementById('logoutButton');

    if (loginLink) loginLink.style.display = isLoggedIn ? 'none' : 'inline-block';
    if (logoutButton) logoutButton.style.display = isLoggedIn ? 'inline-block' : 'none';
}

if (document.getElementById('logoutButton')) {
    document.getElementById('logoutButton').addEventListener('click', () => {
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

    // Botão Alto Contraste
    const altoBtn = document.getElementById('alto-contraste-btn');
    if (altoBtn) altoBtn.addEventListener('click', toggleContrast);

    // Aplica contraste salvo
    applySavedContrastMode();

    // Login
    checkLogin();

    // Música (apenas ícone)
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
