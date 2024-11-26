document.addEventListener("DOMContentLoaded", function() {
    displayCartItems();

    document.querySelector('form').addEventListener('submit', function(e) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let productIds = cartItems.map(item => item.producto.id);
        document.getElementById('carrito').value = JSON.stringify(productIds);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const message = urlParams.get('message');
    
    if (message) {
        const alertType = success === 'true' ? 'success' : 'danger';
        showAlert(decodeURIComponent(message), alertType);
        
        if (success === 'true') {
            localStorage.removeItem('cartItems');
            displayCartItems();
        }

        history.replaceState(null, '', window.location.pathname);
    }
});

function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log("Cart Items: ", cartItems);
    let cartList = document.getElementById('orderCart');
    let totalAmount = 0;

    if (cartItems.length === 0) {
        cartList.innerHTML = '<li class="list-group-item">El carrito está vacío</li>';
    } else {
        cartList.innerHTML = '';
        cartItems.forEach((item, index) => {
            totalAmount += parseFloat(item.producto.precio);
            let listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            listItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center flex-wrap">
                    <div class="d-flex align-items-center">
                        <img src="../media/${item.producto.imagen}" alt="${item.producto.nombre}" width="50" class="me-2">
                        <strong class="me-2">${item.producto.nombre}</strong>
                    </div>
                    <div class="d-flex align-items-center">
                        <span class="me-2">S/ ${item.producto.precio}</span>
                        <a href="#" class="text-danger" onclick="removeItemFromCart(${index})">
                            <i class="fas fa-trash-alt"></i>
                        </a>
                    </div>
                </div>
            `;
            cartList.appendChild(listItem);
        });
    }

    let totalElement = document.getElementById('totalAmount');
    totalElement.textContent = `S/ ${totalAmount.toFixed(2)}`;
}

function removeItemFromCart(index) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length > index) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
    }
}

function clearCart() {
    localStorage.removeItem('cartItems');
    displayCartItems();
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