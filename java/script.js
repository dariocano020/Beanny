let CART = JSON.parse(localStorage.getItem('beany_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // Animación Loader
    const liq = document.querySelector('.liquid');
    if(liq) setTimeout(() => liq.style.height = '90%', 100);
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if(loader) loader.style.transform = 'translateY(-100%)';
    }, 1800);

    // Cursor
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    updateCartDisplay();
});

function addToCart(name, price, img) {
    CART.push({ name, price, img });
    localStorage.setItem('beany_cart', JSON.stringify(CART));
    updateCartDisplay();
    alert("¡Añadido a la bolsa!");
}

function updateCartDisplay() {
    const container = document.getElementById('cart-items-container');
    const countEl = document.getElementById('cart-counter');
    const totalEl = document.getElementById('total-amount');
    let total = 0;

    if(container) {
        container.innerHTML = '';
        CART.forEach((item, i) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'cart-item-ui';
            div.innerHTML = `<img src="${item.img}" width="40"><div><p>${item.name}</p><b>${item.price}€</b></div>`;
            container.appendChild(div);
        });
    }

    if(countEl) countEl.innerText = CART.length;
    if(totalEl) totalEl.innerText = total.toFixed(2) + '€';
}