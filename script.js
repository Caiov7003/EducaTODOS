// =====================
// Ajuste de Fonte
// =====================
function adjustFontSize(change) {
    const content = document.querySelector('.container');
    const currentSize = parseFloat(window.getComputedStyle(content).fontSize);
    content.style.fontSize = (currentSize + change) + 'px';
}

// =====================
// Modo Alto Contraste
// =====================
function toggleContrast() {
    document.body.classList.toggle('high-contrast');

    const logoImage = document.getElementById('logoImage') || document.querySelector('.logo');
    const contrastToggle = document.getElementById('contrastToggle') || document.getElementById('alto-contraste-btn');
    const allButtons = document.querySelectorAll('.quiz-button, .toggle-button, .font-adjust-buttons button, .back-button, .nav-main ul li a');
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
// Menu Mobile (Header CodePen)
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

    // Aplica contraste salvo
    applySavedContrastMode();

    // Checa login ao carregar
    checkLogin();
});

// =====================
// Quiz, Música e Cookies
// =====================
// Você mantém todas as funções do quiz, música, cookies e validação de senha
// como estavam antes, sem alterações importantes.

// Exemplo simplificado para quiz:
let score = 0;
function createQuiz(year) {
    const questions = {
        // suas perguntas aqui
    };

    const quizData = questions[year];
    if (!quizData) return '';

    return quizData.map((q, index) => {
        return `
            <div>
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map(option => `<button onclick="checkAnswer('${option}', '${q.answer}')">${option}</button>`).join('')}
            </div>
        `;
    }).join('');
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        alert('Correto!');
    } else {
        alert('Incorreto. A resposta correta é: ' + correct);
    }
    const questionsCount = document.querySelectorAll('#quizQuestions div').length;
    if (score + document.querySelectorAll('.answered').length >= questionsCount) {
        alert(`Seu resultado: ${score} de ${questionsCount}`);
    }
}

// Música
const musicIcon = document.getElementById('musicIcon');
if (musicIcon) {
    musicIcon.addEventListener('click', function() {
        if (this.classList.contains('play')) {
            this.classList.remove('play');
            this.classList.add('pause');
            this.innerHTML = '⏸️';
        } else {
            this.classList.remove('pause');
            this.classList.add('play');
            this.innerHTML = '▶️';
        }
    });
    musicIcon.classList.add('play');
}

// Cookies
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length);
    }
    return null;
}

// Validação de senha
const passwordInput = document.getElementById('password');
const message = document.getElementById('message');
if (passwordInput && message) {
    const password = passwordInput.value;
    if (password.length < 8) {
        message.textContent = 'A senha deve ter pelo menos 8 caracteres.';
    } else {
        message.textContent = '';
    }
}

// Botão alto contraste adicional (para páginas que têm #alto-contraste-btn)
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
            // Remove música do menu mobile
const musicItem = document.getElementById('musicIcon');
if (musicItem) musicItem.style.display = 'none';

        }
    });
}

