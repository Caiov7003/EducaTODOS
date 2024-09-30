document.getElementById('createAccountForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    })
    .then(response => {
      if (response.ok) {
        window.location.href = 'login.html';
      } else {
        document.getElementById('error-message').innerText = 'Erro ao criar conta';
      }
    });
  });
  