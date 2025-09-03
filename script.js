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

    const logoImage = document.getElementById('logoImage') || document.querySelector('.logo');
    const contrastToggle = document.getElementById('alto-contraste-btn');
    const allButtons = document.querySelectorAll('.quiz-button, .toggle-button, .font-adjust-buttons button, .back-button, nav ul li a');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');

    if (document.body.classList.contains('high-contrast')) {
        if (logoImage) logoImage.src = 'Imagens/LOGO-ALTA-CONTRASTE.png';
        if (contrastToggle) contrastToggle.innerText = 'Desativar Contraste';
        localStorage.setItem('contrastMode', 'enabled');
        allButtons.forEach(b => { b.style.backgroundColor = '#25989C'; b.style.color = '#FFFFFF'; });
        if (header) header.style.backgroundColor = '#000000';
        if (footer) footer.style.backgroundColor = '#000000';
    } else {
        if (logoImage) logoImage.src = 'Imagens/LOGO.png';
        if (contrastToggle) contrastToggle.innerText = 'Ativar Contraste';
        localStorage.setItem('contrastMode', 'disabled');
        allButtons.forEach(b => { b.style.backgroundColor = '#25989C'; b.style.color = '#FFFFFF'; });
        if (header) header.style.backgroundColor = '';
        if (footer) footer.style.backgroundColor = '';
    }
}

function applySavedContrastMode() {
    if (localStorage.getItem('contrastMode') === 'enabled') {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
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
    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.setItem('isLoggedIn', 'false');
        checkLogin();
        window.location.href = 'login.html';
    });
}

// =====================
// Menu Mobile
// =====================
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;

    const toggle = document.createElement('button');
    toggle.textContent = 'Menu';
    toggle.style.color = 'white';
    toggle.style.background = 'transparent';
    toggle.style.border = 'none';
    toggle.style.cursor = 'pointer';
    toggle.style.fontSize = '16px';
    document.querySelector('nav').prepend(toggle);

    toggle.addEventListener('click', () => nav.classList.toggle('show'));

    // Aplica contraste salvo e checa login
    applySavedContrastMode();
    checkLogin();

    // Remove texto do item Música no menu mas mantém o ícone
    const musicItem = document.getElementById('musicIcon');
    if (musicItem) musicItem.innerText = '';
});

// =====================
// Quiz
// =====================
let score = 0;
function createQuiz(year) {
    const questions = {}; // Suas perguntas aqui
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
// Música
// =====================
const musicIcon = document.getElementById('musicIcon');
if (musicIcon) {
    musicIcon.addEventListener('click', function() {
        this.classList.toggle('play');
        this.innerHTML = this.classList.contains('play') ? '⏸️' : '▶️';
    });
    musicIcon.classList.add('play');
}

// =====================
// Cookies
// =====================
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value||"") + expires + "; path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i=0; i<ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}

// =====================
// Botão Alto Contraste adicional
// =====================
const altoContrasteBtn = document.getElementById('alto-contraste-btn');
const container = document.querySelector('.content-container');
if (altoContrasteBtn && container) {
    altoContrasteBtn.addEventListener('click', function() {
        const isHighContrast = document.body.style.backgroundColor === 'black';
        if (isHighContrast) {
            document.body.style.backgroundColor = '#EFE4CA';
            document.body.style.color = 'black';
            container.style.backgroundColor = '#EFE4CA';
            container.style.color = 'black';
            altoContrasteBtn.innerText = 'Ativar Alto Contraste';
        } else {
            document.body.style.backgroundColor = 'black';
            document.body.style.color = 'white';
            container.style.backgroundColor = 'black';
            container.style.color = 'white';
            altoContrasteBtn.innerText = 'Desativar Alto Contraste';
        }
    });
}
