// Variables para la paginación
const productsPerPage = 20; // Número de productos por página
let currentPage = 1;
let allProducts = []; // Lista que contendrá todos los productos

// Selección de elementos del DOM
const productsContainer = document.getElementById('productsContainer');
const nextPageBtn = document.getElementById('nextPageBtn');
const prevPageBtn = document.getElementById('prevPageBtn');

// Función para cargar productos desde localStorage
function loadProducts() {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
        // Decodificar base64
        allProducts = JSON.parse(atob(storedProducts));
    }
    renderProducts(); // Renderizar los productos en la página
}

// Función para guardar productos en localStorage
function saveProducts() {
    // Convertir productos a base64
    const encodedProducts = btoa(JSON.stringify(allProducts));
    localStorage.setItem('products', encodedProducts);
}

// Función para agregar productos (simulación)
function addProduct() {
    // Solo se agrega un nuevo producto cuando se hace clic en "Agregar Producto"
}

// Función para renderizar los productos según la página actual
function renderProducts() {
    productsContainer.innerHTML = ''; // Limpiar el contenedor de productos
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = allProducts.slice(startIndex, endIndex); // Obtener productos para la página actual

    // Añadir los productos al contenedor
    currentProducts.forEach(product => {
        const newProduct = document.createElement('div');
        newProduct.classList.add('product');
        newProduct.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button onclick="editProduct(this)">Editar</button>
            <button onclick="deleteProduct(this)">Eliminar</button>
        `;
        productsContainer.appendChild(newProduct);
    });

    // Actualizar la visibilidad de los botones de paginación
    updatePaginationButtons();
}

// Función para actualizar la visibilidad de los botones de paginación
function updatePaginationButtons() {
    if (currentPage === 1) {
        prevPageBtn.disabled = true; // Desactivar el botón de "Página anterior" si estamos en la primera página
    } else {
        prevPageBtn.disabled = false;
    }

    if (currentPage * productsPerPage >= allProducts.length) {
        nextPageBtn.disabled = true; // Desactivar el botón de "Página siguiente" si hemos llegado a la última página
    } else {
        nextPageBtn.disabled = false;
    }
}

// Función para ir a la página siguiente
function nextPage() {
    if (currentPage * productsPerPage < allProducts.length) {
        currentPage++;
        renderProducts();
    }
}

// Función para ir a la página anterior
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
}

// Función para editar un producto
function editProduct(button) {
    const productElement = button.parentElement;
    const productName = productElement.querySelector('h3').innerText;
    const productDescription = productElement.querySelector('p').innerText;

    const newName = prompt("Editar nombre del producto", productName);
    const newDescription = prompt("Editar descripción del producto", productDescription);

    if (newName && newDescription) {
        productElement.querySelector('h3').innerText = newName;
        productElement.querySelector('p').innerText = newDescription;

        // Actualizar el producto en la lista
        const product = allProducts.find(p => p.name === productName);
        if (product) {
            product.name = newName;
            product.description = newDescription;
            saveProducts(); // Guardar los cambios en localStorage
        }
    }
}

// Función para eliminar un producto
function deleteProduct(button) {
    const productElement = button.parentElement;
    productElement.remove(); // Elimina el producto de la vista
    // Eliminar también el producto de la lista de productos
    const productName = productElement.querySelector('h3').innerText;
    allProducts = allProducts.filter(product => product.name !== productName);
    saveProducts(); // Guardar los cambios en localStorage
    renderProducts(); // Vuelve a renderizar los productos después de eliminar
}

// Evento para agregar un nuevo producto
document.getElementById('addProductBtn').addEventListener('click', function() {
    const newProduct = {
        id: `product${allProducts.length + 1}`,
        name: `Producto ${allProducts.length + 1}`,
        description: `Descripción del producto ${allProducts.length + 1}`,
    };
    allProducts.push(newProduct);
    saveProducts(); // Guardar los productos actualizados
    renderProducts(); // Renderiza nuevamente los productos
});

// Agregar eventos a los botones de paginación
nextPageBtn.addEventListener('click', nextPage);
prevPageBtn.addEventListener('click', prevPage);

// Cargar productos desde localStorage cuando se cargue la página
loadProducts(); // Carga los productos guardados

// Selección de elementos
const profileIcon = document.getElementById('profileIcon');
const profileMenu = document.getElementById('profileMenu');

// Mostrar u ocultar el menú de perfil al hacer clic en el ícono
profileIcon.addEventListener('click', () => {
    profileMenu.classList.toggle('active'); // Cambiar la visibilidad del menú
});

// Cerrar el menú si se hace clic fuera del ícono o menú
document.addEventListener('click', (e) => {
    if (!profileIcon.contains(e.target)) {
        profileMenu.classList.remove('active');
    }
});