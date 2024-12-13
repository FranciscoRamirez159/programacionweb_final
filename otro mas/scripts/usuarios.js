// usuarios.js

// Array para almacenar los usuarios
let users = [];

// Función para registrar un nuevo usuario
function registerUser(event) {
    event.preventDefault(); // Prevenir el envío del formulario

    const newUsername = document.getElementById("new-username").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();

    // Crear un nuevo usuario y agregarlo al array
    const newUser = {
        id: Date.now(), // Usar la fecha actual como ID único
        username: newUsername,
        password: newPassword
    };

    users.push(newUser);
    addUserToTable(newUser); // Agregar el usuario a la tabla
    saveUsersToLocalStorage(); // Guardar usuarios en localStorage
    document.getElementById("register-form").reset(); // Limpiar el formulario
}

// Función para agregar un usuario a la tabla
function addUserToTable(user) {
    const tableBody = document.querySelector("#usuariosTable tbody");
    const row = document.createElement("tr");
    row.setAttribute('data-id', user.id);

    row.innerHTML = `
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>
            <button onclick="editUser(${user.id})">Modificar</button>
            <button onclick="deleteUser(${user.id})">Eliminar</button>
        </td>
    `;

    tableBody.appendChild(row);
}

// Función para cargar usuarios existentes en la tabla
function loadUsers() {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
        users = JSON.parse(atob(storedUsers));
        users.forEach(user => addUserToTable(user));
    }
}

// Función para guardar usuarios en localStorage
function saveUsersToLocalStorage() {
    const encodedUsers = btoa(JSON.stringify(users));
    localStorage.setItem('users', encodedUsers);
}

// Función para eliminar un usuario
function deleteUser(userId) {
    users = users.filter(user => user.id !== userId);
    document.querySelector(`#usuariosTable tbody tr[data-id='${userId}']`).remove();
    saveUsersToLocalStorage(); // Actualizar localStorage
}

// Función para modificar un usuario
function editUser(userId) {
    const row = document.querySelector(`#usuariosTable tbody tr[data-id='${userId}']`);
    const username = row.children[1].textContent;
    const password = row.children[2].textContent;

    const newUsername = prompt("Modificar nombre de usuario:", username);
    const newPassword = prompt("Modificar contraseña:", password);

    if (newUsername && newPassword) {
        const user = users.find(user => user.id === userId);
        user.username = newUsername;
        user.password = newPassword;

        row.children[1].textContent = newUsername;
        row.children[2].textContent = newPassword;
        saveUsersToLocalStorage(); // Actualizar localStorage
    }
}

// Asociar eventos
document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", registerUser);
    }

    const backButton = document.getElementById("backButton");
    if (backButton) {
        backButton.addEventListener("click", () => {
            window.history.back(); // Regresar a la página anterior
        });
    }

    loadUsers(); // Cargar usuarios existentes al cargar la página
});