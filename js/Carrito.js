function addItemToCart(productId) {
    fetch(`../php/Productos.php?id=${productId}`)
        .then(response => response.json())
        .then(product => {
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            cartItems.push(product);
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            
            showAlert('Producto añadido al carrito', 'success');
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert('Error al añadir el producto al carrito', 'danger');
        });
}

function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alert);
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('fade');
        setTimeout(() => {
            alertContainer.removeChild(alert);
        }, 150);
    }, 2000);
}