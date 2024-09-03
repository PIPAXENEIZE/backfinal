const messageContainer = document.getElementById('messageContainer');

registerForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const data = new FormData(registerForm);
    const obj = {};
    data.forEach((value, key) => obj[key] = value);

    try {
        const response = await fetch('/api/sessions/register', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        messageContainer.innerHTML = '<p>User registered successfully!</p>';
        messageContainer.style.color = 'green';

        const redirectMessage = document.createElement('p');
        redirectMessage.id = 'redirectMessage';
        redirectMessage.style.color = 'blue';
        messageContainer.appendChild(redirectMessage);

        let countdown = 5;
        redirectMessage.textContent = `Redirecting to login in ${countdown} seconds...`;

        const intervalId = setInterval(() => {
            countdown -= 1;
            redirectMessage.textContent = `Redirecting to login in ${countdown} seconds...`;

            if (countdown <= 0) {
                clearInterval(intervalId);
                window.location.href = '/login';
            }
        }, 1000);

    } catch (error) {
        console.error('Error during fetch:', error);
        messageContainer.textContent = 'An error occurred. Please try again.';
        messageContainer.style.color = 'red';
    }
});
