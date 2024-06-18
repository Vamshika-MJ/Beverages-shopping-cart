document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { name: 'ORI GIMBER 700ml', price: 24.95, image: 'images/ori_gimber_700ml.jpg' },
        { name: 'GIMBER N°2 500 ml', price: 26.00, image: 'images/gimber_n2_500ml.jpg' },
        { name: 'DUO-PACK: GIMBER & 500 ml', price: 52.20, image: 'images/duo_pack_gimber.jpg' },
        { name: 'S-ML GIMBER 500 ml', price: 20.95, image: 'images/sml_gimber_500ml.jpg' },
        { name: 'Shop COOK & GIMBER', price: 23.50, image: 'images/shop_cook_gimber.jpg' }
        // Add more products with images as needed
    ];

    const productContainer = document.querySelector('.products');
    const cartContainer = document.querySelector('.cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const discountElement = document.getElementById('discount');
    const gratuityElement = document.getElementById('gratuity');
    const totalElement = document.getElementById('total');

    let cart = [];

    // Function to render products
    function renderProducts() {
        productContainer.innerHTML = '';
        products.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" width="60" height="60">
                <p>${product.name}</p>
                <p>$${product.price.toFixed(2)}</p>
            `;
            productElement.addEventListener('click', () => addToCart(index));
            productContainer.appendChild(productElement);
        });
    }
    
    
    

    // Function to add to cart
    function addToCart(index) {
        const product = products[index];
        const existingItem = cart.find(item => item.name === product.name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    // Function to update the cart display and totals
    function updateCart() {
        cartContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach((item, index) => {
            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(cartItemElement);
            subtotal += item.price * item.quantity;
        });

        const discount = subtotal * 0.10;
        const gratuity = subtotal * 0.075;
        const total = subtotal - discount + gratuity;

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
        discountElement.textContent = `$${discount.toFixed(2)}`;
        gratuityElement.textContent = `$${gratuity.toFixed(2)}`;
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Function to remove an item from the cart
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCart();
    }

    // Initialize
    renderProducts();
});

