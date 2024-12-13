// auth.js

// Credenciales predeterminadas
const credentials = {
    username: "admin",
    password: "1234",
  
};



// Función de validación
function validateLogin(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const usernameInput = document.getElementById("username").value.trim();
    const passwordInput = document.getElementById("password").value.trim();

    // Validación de credenciales
    if (usernameInput === credentials.username && passwordInput === credentials.password) {
        alert("Inicio de sesión exitoso!");
        window.location.href = "/html/dashboard.html"; // Redirigir al dashboard
    } else {
        //mensaje de error usuario o contraseña incorrectos
        const errorMessage = document.getElementById("errorMessage");
        errorMessage.style.display = "block";
        errorMessage.textContent = "Usuario o contraseña incorrectos. Intente nuevamente.";
    }
}

// Asociar el evento al formulario
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", validateLogin);
    } else {
        console.error("Formulario de inicio de sesión no encontrado.");
    }
});
