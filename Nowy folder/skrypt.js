const cart = [];
let total = 0;

function addToCart(item, price) {
    const existingItem = cart.find(cartItem => cartItem.item === item);
    
    if (existingItem) {
        existingItem.quantity += 1; // Zwiększamy ilość
        existingItem.price += price; // Zwiększamy cenę
    } else {
        cart.push({ item, price, quantity: 1 }); // Dodajemy nowy przedmiot
    }

    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    let cartHTML = '';

    cart.forEach(cartItem => {
        cartHTML += `
            <div>
                ${cartItem.item} - ${cartItem.quantity}x - ${cartItem.price.toFixed(2)}zł 
                <button onclick="removeFromCart('${cartItem.item}')">Usuń</button>
            </div>`;
    });

    cartItems.innerHTML = cartHTML;
    document.getElementById('totalPrice').innerText = `Łącznie: ${total.toFixed(2)}zł`;
}

function removeFromCart(item) {
    const index = cart.findIndex(cartItem => cartItem.item === item);
    
    if (index > -1) {
        total -= cart[index].price; // Odejmujemy cenę
        cart.splice(index, 1); // Usuwamy przedmiot z koszyka
    }

    updateCart();
}

function checkout() {
    const deliveryCost = parseInt(document.getElementById('delivery').value, 10);
    const finalTotal = total + deliveryCost;
    const preparationTime = deliveryCost === 0 ? 10 : 20;

    const summaryHTML = `
        <div class="summary">
            <h2>Podsumowanie zamówienia</h2>
            <div id="summaryItems"></div>
            <p>Łącznie: ${finalTotal.toFixed(2)}zł</p>
            <p>Czas oczekiwania: ${preparationTime} minut</p>
            <button onclick="closeSummary()">Zamknij</button>
        </div>`;

    document.getElementById('orderSummary').innerHTML = summaryHTML;
    document.getElementById('orderSummary').style.display = 'block';

    const summaryItems = document.getElementById('summaryItems');
    summaryItems.innerHTML = cart.map(item => `${item.item} - ${item.quantity}x - ${item.price.toFixed(2)}zł`).join('<br>');
}

function closeSummary() {
    document.getElementById('orderSummary').style.display = 'none';
}

