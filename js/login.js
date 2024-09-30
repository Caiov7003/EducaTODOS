document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(response => {
      if (response.ok) {
        window.location.href = 'index.html';
      } else {
        document.getElementById('error-message').innerText = 'Email ou senha incorretos';
      }
    });
  });
  