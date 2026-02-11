let CART = JSON.parse(localStorage.getItem('beany_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Loader Logic
    setTimeout(() => {
    const loader = document.getElementById('loader');
    if(loader) {
        loader.style.transform = 'translateY(-100%)';
        // Opcional: permitir scroll una vez cargado
        document.body.style.overflowY = 'auto'; 
    }
}, 3400);

    // 2. Cursor Pro logic
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efecto "agrandar" en enlaces
    const targets = document.querySelectorAll('.hover-target, button, a');
    targets.forEach(t => {
        t.addEventListener('mouseenter', () => cursor.classList.add('active'));
        t.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    updateCartDisplay();
});

function toggleCart() {
    document.getElementById('sidebar-cart').classList.toggle('active');
}

function updateCartDisplay() {
    const container = document.getElementById('cart-items-container');
    const countEl = document.getElementById('cart-counter');
    const totalEl = document.getElementById('total-amount');
    let total = 0;

    if(container) {
        container.innerHTML = CART.length === 0 ? '<p style="margin-top:20px">Tu bolsa está vacía.</p>' : '';
        CART.forEach((item, i) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'cart-item-ui';
            div.innerHTML = `
                <div style="display:flex; align-items:center; gap:15px; margin-bottom:15px; border-bottom:1px solid #eee; padding-bottom:10px;">
                    <img src="${item.img}" width="50" style="border-radius:10px">
                    <div style="flex-grow:1">
                        <p style="font-weight:800">${item.name}</p>
                        <b>${item.price.toFixed(2)}€</b>
                    </div>
                    <button onclick="removeFromCart(${i})" style="background:none; border:none; color:red; cursor:pointer;">✕</button>
                </div>`;
            container.appendChild(div);
        });
    }

    if(countEl) countEl.innerText = CART.length;
    if(totalEl) totalEl.innerText = total.toFixed(2) + '€';
}

function removeFromCart(index) {
    CART.splice(index, 1);
    localStorage.setItem('beany_cart', JSON.stringify(CART));
    updateCartDisplay();
}