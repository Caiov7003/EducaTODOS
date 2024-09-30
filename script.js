// Função para aumentar a fonte 
function increaseFontSize() {
    let body = document.querySelector('body');
    let currentSize = window.getComputedStyle(body).fontSize;
    let newSize = parseFloat(currentSize) + 2; // Aumenta o tamanho da fonte em 2px
    body.style.fontSize = newSize + 'px';
}

// Função para diminuir a fonte
function decreaseFontSize() {
    let body = document.querySelector('body');
    let currentSize = window.getComputedStyle(body).fontSize;
    let newSize = parseFloat(currentSize) - 2; // Diminui o tamanho da fonte em 2px
    body.style.fontSize = newSize + 'px';
}

// Função para alternar entre o modo de alto contraste
function toggleContrast() {
    const logoImage = document.getElementById('logoImage');
    const contrastToggle = document.getElementById('contrastToggle');
    const allButtons = document.querySelectorAll('.quiz-button, .toggle-button, .font-adjust-buttons button, .back-button');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const contentLogo = document.querySelector('.content-logo'); // Adiciona para a página de conteúdo

    document.body.classList.toggle('high-contrast');

    if (document.body.classList.contains('high-contrast')) {
        logoImage.src = 'Imagens/LOGO-ALTA-CONTRASTE.png'; // Imagem para alto contraste
        contrastToggle.textContent = 'Desativar Contraste';
        localStorage.setItem('contrastMode', 'enabled'); // Salva a preferência no localStorage

        // Atualiza a cor dos botões
        allButtons.forEach(button => {
            button.style.backgroundColor = '#25989C'; // Mantém a cor dos botões no alto contraste
            button.style.color = '#FFFFFF'; // Cor do texto dos botões no alto contraste
        });

        // Atualiza a cor do cabeçalho e rodapé
        if (header) header.style.backgroundColor = '#000000';
        if (footer) footer.style.backgroundColor = '#000000';

        // Atualiza a logo na página de conteúdo
        if (contentLogo) {
            contentLogo.src = logoImage.src; // Atualiza a logo da página de conteúdo
        }

    } else {
        logoImage.src = 'Imagens/LOGO.png'; // Imagem normal
        contrastToggle.textContent = 'Ativar Contraste';
        localStorage.setItem('contrastMode', 'disabled'); // Remove a preferência do localStorage

        // Atualiza a cor dos botões
        allButtons.forEach(button => {
            button.style.backgroundColor = '#25989C'; // Cor de fundo normal dos botões
            button.style.color = '#FFFFFF'; // Cor do texto normal dos botões
        });

        // Atualiza a cor do cabeçalho e rodapé
        if (header) header.style.backgroundColor = '';
        if (footer) footer.style.backgroundColor = '';

        // Atualiza a logo na página de conteúdo
        if (contentLogo) {
            contentLogo.src = logoImage.src; // Atualiza a logo da página de conteúdo
        }
    }
}

// Função para aplicar as preferências de contraste armazenadas
function applySavedContrastMode() {
    const contrastMode = localStorage.getItem('contrastMode');
    const logoImage = document.getElementById('logoImage');
    const contrastToggle = document.getElementById('contrastToggle');
    const allButtons = document.querySelectorAll('.quiz-button, .toggle-button, .font-adjust-buttons button, .back-button');
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const contentLogo = document.querySelector('.content-logo'); // Adiciona para a página de conteúdo

    if (contrastMode === 'enabled') {
        document.body.classList.add('high-contrast');
        logoImage.src = 'Imagens/LOGO-ALTA-CONTRASTE.png'; // Imagem para alto contraste
        contrastToggle.textContent = 'Desativar Contraste';

        // Atualiza a cor dos botões
        allButtons.forEach(button => {
            button.style.backgroundColor = '#25989C'; // Mantém a cor dos botões no alto contraste
            button.style.color = '#FFFFFF'; // Cor do texto dos botões no alto contraste
        });

        // Atualiza a cor do cabeçalho e rodapé
        if (header) header.style.backgroundColor = '#000000';
        if (footer) footer.style.backgroundColor = '#000000';

        // Atualiza a logo na página de conteúdo
        if (contentLogo) {
            contentLogo.src = logoImage.src; // Atualiza a logo da página de conteúdo
        }

    } else {
        document.body.classList.remove('high-contrast');
        logoImage.src = 'Imagens/LOGO.png'; // Imagem normal
        contrastToggle.textContent = 'Ativar Contraste';

        // Atualiza a cor dos botões
        allButtons.forEach(button => {
            button.style.backgroundColor = '#25989C'; // Cor de fundo normal dos botões
            button.style.color = '#FFFFFF'; // Cor do texto normal dos botões
        });

        // Atualiza a cor do cabeçalho e rodapé
        if (header) header.style.backgroundColor = '';
        if (footer) footer.style.backgroundColor = '';

        // Atualiza a logo na página de conteúdo
        if (contentLogo) {
            contentLogo.src = logoImage.src; // Atualiza a logo da página de conteúdo
        }
    }
}

// Função para verificar se o usuário está logado
function checkLogin() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        // Redireciona para a página de login se não estiver logado
        window.location.href = 'login.html'; // Altere para o nome da sua página de login
    }
}

// Adiciona o evento de clique ao botão de alternar contraste
const contrastToggle = document.getElementById('contrastToggle');
if (contrastToggle) {
    contrastToggle.addEventListener('click', toggleContrast);
}

// Aplica o modo de contraste salvo ao carregar a página
applySavedContrastMode();

// Verifica o login ao carregar a página
checkLogin();
document.getElementById('logoutButton').onclick = function() {
    localStorage.setItem('isLoggedIn', 'false'); // Atualiza o estado de login
    checkLoginStatus(); // Atualiza a interface
    window.location.href = 'login.html'; // Redireciona para a página de login
};
questions.forEach((q, index) => {
    const questionElement = document.createElement("div");
    questionElement.style.marginBottom = "20px"; // Espaço entre as perguntas
    questionElement.innerHTML = `<p>${q.question}</p>`;
    q.answers.forEach((answer, i) => {
        questionElement.innerHTML += `<label style="display: block;"><input type="radio" name="question${index}" value="${i}"> ${answer}</label>`;
    });
    quizQuestions.appendChild(questionElement);
});
function startQuiz() {
    const quizSection = document.getElementById("quizSection");
    const quizQuestions = document.getElementById("quizQuestions");
    quizQuestions.innerHTML = ""; // Limpa questões anteriores

    // [Suas perguntas aqui]

    quizSection.classList.add("visible"); // Adiciona a classe para mostrar o quiz
}
function adjustFontSize(change) {
    const content = document.querySelector('.container');
    const currentSize = parseFloat(window.getComputedStyle(content).fontSize);
    content.style.fontSize = (currentSize + change) + 'px';
}
let score = 0;

function createQuiz(year) {
    const questions = {
        // suas perguntas aqui
    };

    const quizData = questions[year];
    const quizHtml = quizData.map((q, index) => {
        return `
            <div>
                <p>${index + 1}. ${q.question}</p>
                ${q.options.map(option => `<button onclick="checkAnswer('${option}', '${q.answer}')">${option}</button>`).join('')}
            </div>
        `;
    }).join('');

    return quizHtml;
}

function checkAnswer(selected, correct) {
    if (selected === correct) {
        score++;
        alert('Correto!');
    } else {
        alert('Incorreto. A resposta correta é: ' + correct);
    }

    // Verifique se todas as perguntas foram respondidas
    const questionsCount = document.querySelectorAll('#quizQuestions div').length;
    if (score + document.querySelectorAll('.answered').length >= questionsCount) {
        alert(`Seu resultado: ${score} de ${questionsCount}`);
    }
}
document.getElementById('musicIcon').addEventListener('click', function() {
    if (this.classList.contains('play')) {
        this.classList.remove('play');
        this.classList.add('pause');
        this.innerHTML = '⏸️'; // Muda o ícone para Pause
    } else {
        this.classList.remove('pause');
        this.classList.add('play');
        this.innerHTML = '▶️'; // Muda o ícone para Play
    }
});

// Inicializa com o ícone de Play
document.getElementById('musicIcon').classList.add('play');
const password = document.getElementById('password').value;

if (password.length < 8) {
    message.textContent = 'A senha deve ter pelo menos 8 caracteres.';
    return; // Não prossegue se a senha não for válida
}
// Função para definir um cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Função para obter um cookie
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

if (password.length < 8) {
    message.textContent = 'A senha deve ter pelo menos 8 caracteres.';
} else {
    // Código para adicionar o usuário
}
const altoContrasteBtn = document.getElementById('alto-contraste-btn'); // Certifique-se de que o ID está correto
const container = document.querySelector('.content-container'); // Seleciona o container

// Função para ativar/desativar alto contraste
altoContrasteBtn.addEventListener('click', function () {
    const isHighContrast = document.body.style.backgroundColor === 'black'; // Verifica se está em alto contraste

    if (isHighContrast) {
        // Desativa alto contraste
        document.body.style.backgroundColor = '#EFE4CA'; // Cor original do fundo
        document.body.style.color = 'black'; // Cor original do texto
        container.style.backgroundColor = '#EFE4CA'; // Fundo do container original
        container.style.color = 'black'; // Cor do texto do container original
        altoContrasteBtn.innerText = 'Ativar Alto Contraste'; // Atualiza o texto do botão
    } else {
        // Ativa alto contraste
        document.body.style.backgroundColor = 'black'; // Cor de fundo em alto contraste
        document.body.style.color = 'white'; // Cor do texto em alto contraste
        container.style.backgroundColor = 'black'; // Cor de fundo do container em alto contraste
        container.style.color = 'white'; // Cor do texto do container em alto contraste
        altoContrasteBtn.innerText = 'Desativar Alto Contraste'; // Atualiza o texto do botão
    }
});
document.addEventListener('DOMContentLoaded', function () {
    const altoContrasteBtn = document.getElementById('alto-contraste-btn');
    const container = document.querySelector('.content-container');

    altoContrasteBtn.addEventListener('click', function () {
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
            container.style.backgroundColor = 'black'; // Aqui garante que o fundo do container fica preto
            container.style.color = 'white'; 
            altoContrasteBtn.innerText = 'Desativar Alto Contraste';
        }
    });
});

