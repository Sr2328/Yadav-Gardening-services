
// Cart and Product State Management
let cart = [];
const DISCORD_WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1346746342424449055/L9biBgv3aEBzu37vmjKN_TPUlf2I8NRrAGRdckp3ueOhxLAer9Pk47Qjy-aoXNAPeFlA';
document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCart = document.querySelector('.close-cart');
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const checkoutBtn = document.querySelector('.checkout-btn');
    // Cart Toggle
    cartIcon.addEventListener('click', () => cartSidebar.classList.add('active'));
    closeCart.addEventListener('click', () => cartSidebar.classList.remove('active'));
    // Add to Cart Functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            showQuantityModal(productCard);
        });
    });
    // Checkout Button
    checkoutBtn.addEventListener('click', showCheckoutInterface);
});
// Quantity Modal
function showQuantityModal(productCard) {
    const product = {
        name: productCard.querySelector('h3').textContent,
        price: parseFloat(productCard.querySelector('.price').textContent.replace('$', '')),
        image: productCard.querySelector('.product-image img').src
    };
    const modal = document.createElement('div');
    modal.className = 'quantity-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>${product.name}</h3>
            <div class="quantity-selector">
                <button class="quantity-btn minus">-</button>
                <input type="number" class="quantity-input" value="1" min="1" max="99">
                <button class="quantity-btn plus">+</button>
            </div>
            <div class="modal-buttons">
                <button class="cancel-btn">Cancel</button>
                <button class="confirm-btn">Add to Cart</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Quantity Controls
    const quantityInput = modal.querySelector('.quantity-input');
    modal.querySelector('.minus').addEventListener('click', () => {
        if (quantityInput.value > 1) quantityInput.value--;
    });
    modal.querySelector('.plus').addEventListener('click', () => {
        if (quantityInput.value < 99) quantityInput.value++;
    });
    // Button Actions
    modal.querySelector('.cancel-btn').addEventListener('click', () => {
        modal.remove();
    });
    modal.querySelector('.confirm-btn').addEventListener('click', () => {
        addToCart(product, parseInt(quantityInput.value));
        modal.remove();
        updateCartDisplay();
    });
}
// Cart Management
function addToCart(product, quantity) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    updateCartCount();
}
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
}
function updateCartDisplay() {
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total h4 span');
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button class="remove-item" onclick="removeFromCart('${item.name}')">×</button>
        </div>
    `).join('');
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
}
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCartDisplay();
    updateCartCount();
}
// Checkout Interface
function showCheckoutInterface() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    const checkoutInterface = document.createElement('div');
    checkoutInterface.className = 'checkout-interface';
    checkoutInterface.innerHTML = `
        <div class="checkout-container">
            <div class="checkout-details">
                <div class="checkout-header">
                    <h2>Checkout Details</h2>
                    <button class="close-checkout">&times;</button>
                </div>
                <form id="checkout-form" class="form-sections">
                    <div class="form-section">
                        <h3><i class="fas fa-user"></i> Personal Information</h3>
                        <div class="form-row">
                            <div class="input-group">
                                <label>First Name</label>
                                <input type="text" name="firstName" required>
                            </div>
                            <div class="input-group">
                                <label>Last Name</label>
                                <input type="text" name="lastName" required>
                            </div>
                        </div>
                        <div class="input-group">
                            <label>Email</label>
                            <input type="email" name="email" required>
                        </div>
                        <div class="input-group">
                            <label>Phone</label>
                            <input type="tel" name="phone" required>
                        </div>
                    </div>
                    <div class="form-section">
                        <h3><i class="fas fa-map-marker-alt"></i> Shipping Address</h3>
                        <div class="input-group">
                            <label>Street Address</label>
                            <input type="text" name="address" required>
                        </div>
                        <div class="form-row">
                            <div class="input-group">
                                <label>City</label>
                                <input type="text" name="city" required>
                            </div>
                            <div class="input-group">
                                <label>Postal Code</label>
                                <input type="text" name="postalCode" required>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="checkout-summary">
                <h3>Order Summary</h3>
                <div class="cart-items-list">
                    ${cart.map(item => `
                        <div class="checkout-item">
                            <div class="item-image">
                                <img src="${item.image}" alt="${item.name}">
                            </div>
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p class="item-quantity">Quantity: ${item.quantity}</p>
                            </div>
                            <div class="item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-total">
                    <div class="total-row">
                        <span>Subtotal</span>
                        <span>$${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                    <div class="total-row final">
                        <span>Total</span>
                        <span>$${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
                    </div>
                </div>
                <button class="place-order-btn">Place Order</button>
            </div>
        </div>
    `;
    document.body.appendChild(checkoutInterface);
    // Close Button
    checkoutInterface.querySelector('.close-checkout').addEventListener('click', () => {
        checkoutInterface.remove();
    });
    // Place Order
    checkoutInterface.querySelector('.place-order-btn').addEventListener('click', () => {
        const form = document.getElementById('checkout-form');
        if (form.checkValidity()) {
            const formData = new FormData(form);
            sendOrderToDiscord(formData);
        } else {
            form.reportValidity();
        }
    });
}
// Send Order to Discord
async function sendOrderToDiscord(formData) {
    const orderData = {
        content: null,
        embeds: [{
            title: "New Order Received! 🛍️",
            color: 5763719,
            fields: [
                {
                    name: "Customer Information",
                    value: `Name: ${formData.get('firstName')} ${formData.get('lastName')}\nEmail: ${formData.get('email')}\nPhone: ${formData.get('phone')}`,
                    inline: false
                },
                {
                    name: "Shipping Address",
                    value: `${formData.get('address')}\n${formData.get('city')}, ${formData.get('postalCode')}`,
                    inline: false
                },
                {
                    name: "Order Details",
                    value: cart.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n'),
                    inline: false
                },
                {
                    name: "Total Amount",
                    value: `$${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}`,
                    inline: false
                }
            ],
            timestamp: new Date().toISOString()
        }]
    };
    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });
        if (response.ok) {
            alert('Order placed successfully!');
            cart = [];
            updateCartDisplay();
            updateCartCount();
            document.querySelector('.checkout-interface').remove();
            document.querySelector('.cart-sidebar').classList.remove('active');
        } else {
            throw new Error('Failed to place order');
        }
    } catch (error) {
        alert('Error placing order. Please try again.');
        console.error('Error:', error);
    }
}
