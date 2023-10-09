var cart = [];
var total = 0;

function fetchUsers() {
    // URL dell'API
    const apiUrl = 'https://my-json-server.typicode.com/Geckoo35/eCommerceDB/prodotti';

    // Effettua una richiesta GET all'API
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Ottieni l'elemento della lista degli utenti dal DOM
        const productList = document.getElementById('user-list');

        // Iteriamo attraverso gli utenti e creiamo una lista
        data.forEach(prodotti => {
            const listItem = document.createElement('li');
            listItem.textContent = `Nome: ${prodotti.nome}, Descrizione: ${prodotti.descrizione}`;
            productList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Errore durante il recupero dei dati:', error);
    });
}


function addToCart(prodName, prodDesc, prodPrz, prodQty) {
    var quantity = parseInt(prodQty);
    var product = { prodName, prodDesc, prodPrz, quantity };

    cart.push(product);

    var cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    total += prodPrz * quantity; // Update the total price

    for (i = 0; i < cart.length; i++) {
        var currProduct = cart[i];
        var prodName = currProduct.prodName;
        var desc = currProduct.prodDesc;
        var price = currProduct.prodPrz;
        var quantity = currProduct.quantity;

        var productElement = document.createElement('div');

        productElement.innerHTML =
            'prod: ' + prodName +
            ' desc: ' + desc +
            ' price: ' + price +
            ' quantity: ' + quantity +
            '<button onclick="removeFromCart(' + i + ')">Rimuovi</button>'; //**Remove button


        cartElement.appendChild(productElement);
    }

    updateTotal();
}

function clearCart() {
    cart = [];
    updateCartView();
}

function updateTotal() {
    var totalElement = document.getElementById('total');
    totalElement.innerHTML = 'Totale: ' + total;
}
 
function removeFromCart(index) {
    // Remove the item at index 
    if (index >= 0 && index < cart.length) {
        total -= cart[index].prodPrz * cart[index].quantity; // Update  total
        cart.splice(index, 1); // Remove the item 
        updateCartView(); // Update cart view
    }
}

function updateCartView() {
    var cartElement = document.getElementById('cart');
    cartElement.innerHTML = '';

    for (var i = 0; i < cart.length; i++) {
        var currProduct = cart[i];
        var prodName = currProduct.prodName;
        var desc = currProduct.prodDesc;
        var price = currProduct.prodPrz;
        var quantity = currProduct.quantity;

        var productElement = document.createElement('div');

        productElement.innerHTML =
            'prod: ' + prodName +
            ' desc: ' + desc +
            ' price: ' + price +
            ' quantity: ' + quantity +
            '<button onclick="removeFromCart(' + i + ')">Rimuovi</button>'; //***** Remove button

        cartElement.appendChild(productElement);
    }

    updateTotal();
}

function checkout() {

    //crea ordine vero
    var ordine = cart


    // Clear  cart / update the cart view
    cart = [];
    updateCartView();

    messaggio = 'caro' + document.getElementById('name').value
    messaggio += ',abbiamo ricevuto il tuo ordine, \r\n'
    messaggio += 'spediremo al seguente indirizzo: \r\n'
    messaggio += document.getElementById('address').value
    window.alert(messaggio);
}

