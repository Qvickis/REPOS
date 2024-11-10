document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Reset error states
        resetErrors();

        // Validate inputs
        let isValid = true;
        
        if (!usernameInput.value.trim()) {
            showError(usernameInput, 'Username is required');
            isValid = false;
        }

        if (!passwordInput.value.trim()) {
            showError(passwordInput, 'Password is required');
            isValid = false;
        }

        if (isValid) {
            // Here you would typically make an API call to your backend
            handleLogin({
                username: usernameInput.value.trim(),
                password: passwordInput.value.trim()
            });
        }
    });

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
        input.classList.add('error');
    }

    function resetErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        const errorInputs = document.querySelectorAll('.error');
        
        errorMessages.forEach(error => error.remove());
        errorInputs.forEach(input => input.classList.remove('error'));
    }

    async function handleLogin(credentials) {
        try {
            // Simulate API call - Replace with your actual API endpoint
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            // Handle successful login
            window.location.href = '/dashboard';
            
        } catch (error) {
            alert('Login failed. Please try again.');
        }
    }
}); 