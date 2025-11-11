// ======================================================
// LÓGICA PRINCIPAL DE LA TIENDA (ARCHIVO main.js)
// ======================================================

// Función para inicializar el carrito (lo lee del almacenamiento local)
function getCart() {
    // Si existe el carrito en la memoria del navegador, lo devuelve.
    // Si no existe, devuelve una lista vacía [].
    const cart = localStorage.getItem('felpaCart');
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito en el almacenamiento local
function saveCart(cart) {
    // Convierte la lista de JavaScript en un texto para guardarla.
    localStorage.setItem('felpaCart', JSON.stringify(cart));
}

// ======================================================
// 1. FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO
// Se llama desde el botón en 'products.html'
// ======================================================
function addToCart(productId) {
    const cart = getCart();
    
    // Busca el producto en nuestra lista de productos (products.js)
    const productToAdd = productList.find(p => p.id === productId);

    if (productToAdd) {
        // Busca si el producto ya está en el carrito
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            // Si ya está, solo aumenta la cantidad
            existingItem.quantity += 1;
        } else {
            // Si es nuevo, lo agrega con cantidad 1
            cart.push({ ...productToAdd, quantity: 1 });
        }

        saveCart(cart); // Guarda el carrito actualizado
        alert(`¡"${productToAdd.name}" agregado al carrito! Cantidad: ${existingItem ? existingItem.quantity : 1}`);
        
        // Opcional: actualizar el contador del carrito si tuviéramos uno
    }
}


// ======================================================
// 2. FUNCIÓN PARA MOSTRAR EL CARRITO
// Se llama cuando se carga la página 'cart.html'
// ======================================================
function displayCart() {
    const cart = getCart();
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');
    let total = 0;

    // 1. Si no estamos en la página del carrito, la función se detiene
    if (!cartContainer) return; 

    // 2. Si el carrito está vacío
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Tu carrito está vacío. ¡Añade productos!</p>';
        totalContainer.textContent = '0.00';
        return;
    }
    
    // 3. Si hay productos, los mostramos
    cartContainer.innerHTML = ''; // Limpia el contenedor

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item'; // Para estilos futuros
        cartItem.innerHTML = `
            <div>${item.name}</div>
            <div>
                Cantidad: ${item.quantity} x $${item.price.toLocaleString('es-CO')} 
                = $${itemTotal.toLocaleString('es-CO')}
            </div>
        `;
        cartContainer.appendChild(cartItem);
    });

    // 4. Muestra el total
    totalContainer.textContent = total.toLocaleString('es-CO');
}


// ======================================================
// 3. CÓDIGO QUE SE EJECUTA AL CARGAR CUALQUIER PÁGINA
// ======================================================
document.addEventListener('DOMContentLoaded', () => {

    // A. Muestra los productos si estamos en 'products.html'
    const productListContainer = document.getElementById('product-list');
    if (productListContainer) {
        productListContainer.innerHTML = ''; // Limpia el mensaje 'Cargando...'
        productList.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product-item';
            
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="100">
                <h3>${product.name}</h3>
                <p>Precio: $${product.price.toLocaleString('es-CO')}</p> 
                <button onclick="addToCart(${product.id})">Agregar al Carrito</button>
            `;
            productListContainer.appendChild(productElement);
        });
    }

    // B. Muestra el carrito si estamos en 'cart.html'
    displayCart();
});
