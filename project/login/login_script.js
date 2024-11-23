import {login} from '../api.js';

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const registerButton = document.querySelector('.sign-up-container button');
const loginButton = document.querySelector('.sign-in-container button');


signUpButton.addEventListener('click', () => {
	if (!container.classList.contains("right-panel-active")) {
        container.classList.add("right-panel-active");
    }

});

signInButton.addEventListener('click', () => {
	if (container.classList.contains("right-panel-active")) {
        container.classList.remove("right-panel-active");
    }
});

// Event listener untuk tombol "Masuk" untuk menghandle login
loginButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    /*
    try {
        // Panggil fungsi login dari file api.js
        const data = await login(username, password);
        console.log(data);
        if (data.success) { // Sesuaikan dengan respons API
            window.location.href = "../index.html"; // Redirect ke halaman home
        } else {
            alert("Incorrect username or password");
        }
    } catch (error) {
        console.error('Login failed:', error);
        alert("Login failed. Please try again.");
    }
    */

    try{
        // Retrieve users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        // Kirim data ke backend menggunakan fetch API
        const response = await fetch("http://localhost/project/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        console.log(response);

        // Ambil hasil dari backend
        const result = await response.json();
        
        // Check if the user exists and the password matches
        //const user = users.find(user => user.email === username && user.password === password);
        if (response.status == 200) {
            // Save user data in localStorage and mark them as logged in
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', JSON.stringify(user));  // Optionally store user data            
            window.location.href = "index.html"; 
        } else {
            alert("Incorrect email or password.");
        }
    }catch (error) {
        console.error('Login failed:', error);
        alert("Login failed. Please try again.");
    }
});

registerButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('usernameSignUp').value;
    const email = document.getElementById('emailSignUp').value;
    const password = document.getElementById('passwordSignUp').value;
    const address = document.getElementById('addressSignUp').value;
    try{
        // Check if the user already exists in localStorage
        let users = JSON.parse(localStorage.getItem('users')) || [];
        // Check if the email is already registered
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert("Email is already registered. Please use another email.");
            return; // Stop further execution if the email exists
        }
        // Create a new user object
        const newUser = {
            isLogin: true,
            username: username,
            email: email,
            password: password,
            address: address
        };
        // Add the new user to the users array
        users.push(newUser);
        // Save the updated users array to localStorage
        localStorage.setItem('users', JSON.stringify(users));
        // Show success message
        alert("Registration successful!");
        // Optionally, redirect user to login page after registration
        window.location.href = "index.html"; // Assuming login page
    }catch{
        console.error('Register failed:', error);
        alert("Login failed. Please try again.");

    }
});
