// Selección de elementos del DOM
const productForm = document.getElementById('productForm');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const vaciarCarritoBtn = document.getElementById('vaciarCarrito');

// Alamacenar los productos del carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Agregar un producto al carrito
function agregarProducto(event) {
    event.preventDefault();
    
    const productName = document.getElementById('productName').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productQuantity = parseInt(document.getElementById('productQuantity').value);
    
    const producto = {
        nombre: productName,
        precio: productPrice,
        cantidad: productQuantity
    };
    
    carrito.push(producto);
    guardarEnLocalStorage();
    actualizarCarrito();
    productForm.reset();
}

// Actualizar carrito en el DOM
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    
    carrito.forEach((producto, index) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio} x ${producto.cantidad}`;
        listaCarrito.appendChild(li);
        total += producto.precio * producto.cantidad;
    });
    
    totalCarrito.textContent = total.toFixed(2);
}

// Guardar carrito en localStorage
function guardarEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Vaciar carrito
function vaciarCarrito() {
    carrito = [];
    guardarEnLocalStorage();
    actualizarCarrito();
}

// Eventos
productForm.addEventListener('submit', agregarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

// Inicializar carrito al cargar la página
actualizarCarrito();