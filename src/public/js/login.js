const loginForm = document.getElementById('loginForm');
const messageContainer = document.createElement('div');
messageContainer.id = 'messageContainer';
document.body.insertBefore(messageContainer, loginForm);

loginForm.addEventListener('submit', evt => {
    evt.preventDefault();
    
    // Obtén los valores de los campos
    const email = loginForm.querySelector('input[name="email"]').value;
    const password = loginForm.querySelector('input[name="password"]').value;

    // Validación del formulario
    if (!email || !password) {
        messageContainer.textContent = 'Email and password are required.';
        messageContainer.style.color = 'red';
        return;
    }

    // Crear objeto de datos para enviar
    const data = new FormData(loginForm);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    // Enviar datos al servidor
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); // Verifica la respuesta del servidor
        if (data.status === 'error') {
            messageContainer.textContent = data.message;
            messageContainer.style.color = 'red';
        } else {
            messageContainer.textContent = 'Logged in successfully!';
            messageContainer.style.color = 'green';
            window.location.href = '/profile';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        messageContainer.textContent = 'An error occurred.';
        messageContainer.style.color = 'red';
    });
});
