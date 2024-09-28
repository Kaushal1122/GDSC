const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const loginForm = document.querySelector('#loginForm');

// Add event listener for toggling password visibility
togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);

    if (type === 'text') {
        this.classList.remove('bx-show');
        this.classList.add('bx-hide');
    } else {
        this.classList.remove('bx-hide');
        this.classList.add('bx-show');
    }
});

// Handle form submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent default form submission

    // Get the values from the input fields
    const username = loginForm.querySelector('input[type="text"]').value;
    const passwordValue = password.value;

    // Example condition: replace these with your actual credentials or validation logic
    const validUsername = 'user'; // Replace with your actual username
    const validPassword = 'password'; // Replace with your actual password

    // Check if the entered username and password match the valid credentials
    if (username === validUsername && passwordValue === validPassword) {
        // If authentication is successful, redirect to index.html
        window.location.href = 'index.html'; // Redirect to main page
    } else {
        // Handle invalid login
        alert('Invalid username or password. Please try again.');
    }
});
