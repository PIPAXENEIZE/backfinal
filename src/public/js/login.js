const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', evt => {
    evt.preventDefault();
    const data = new FormData(loginForm);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Redirige al usuario a la URL proporcionada en la respuesta
            window.location.href = data.redirectUrl;
        } else {
            // Manejo de errores, por ejemplo, mostrar un mensaje de error
            console.error(data.message);
            // Aquí podrías actualizar la UI para mostrar un mensaje de error al usuario
        }
    })
    .catch(error => {
        console.error('Error:', error);
        // Aquí podrías actualizar la UI para mostrar un mensaje de error al usuario
    });
});
