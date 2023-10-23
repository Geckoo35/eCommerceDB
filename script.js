var cart = [];
var total = 0;
var valoreRandomico = [];
var ids = [0,0,0];

function fetchUsers() {
    // URL dell'API
    const apiUrl = 'https://my-json-server.typicode.com/Geckoo35/eCommerceDB/prodotti';

    // Effettua una richiesta GET all'API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Ottieni l'elemento della lista degli utenti dal DOM
            const userList2 = document.getElementById('user-list');

            for (let i = 0; i < data.length; i++) {
                j = i;
                j++;
                ids[i] = j;
                // Iteriamo attraverso gli utenti e creiamo una lista
                const valoreRandomicoArray = randomNumber();
                valoreRandomico.push(valoreRandomicoArray);
                const bottone = document.createElement('button');
                bottone.textContent = "Aggiungi al carrello";
                bottone.onclick = function () {
                    var qty = document.getElementById("quantity" + ids[i]).value;
                    addToCart(data[i].nome, data[i].descrizione, valoreRandomico[i], qty);
                };
                const listItem2 = document.createElement('p');
                listItem2.innerHTML = "<b>nome prodotto: </b>" + data[i].nome + "<br>"
                    + "<b>descrizione prodotto: </b>" + data[i].descrizione + "<br>"
                    + "<b>costo prodotto: </b>" + valoreRandomico[i] + "€";

                
                const titolo = document.createElement('h2');
                titolo.textContent = "Prodotto" + " " + j;

                const input = document.createElement('input');
                input.type = 'number';
                input.id = "quantity" +ids[i];
                input.value = '1';
                input.min = '1';

                userList2.appendChild(titolo);
                userList2.appendChild(listItem2)
                userList2.appendChild(input) + "     " + userList2.appendChild(bottone);
            }
        }
        )
}



fetchUsers();

function randomNumber() {
    var valoreRandomico = Math.floor(Math.random() * 10) + 1;
    return valoreRandomico;
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

        price = price * quantity;

        productElement.innerHTML =
            '<b>prod: </b>' + prodName +
            '<b> desc: </b>' + desc +
            '<b> quantity: </b>' + quantity +
            '<b> prezzo: </b>' + price + "€" +
            '<button onclick="removeFromCart(' + i + ')">Rimuovi</button>'; //**Remove button


        cartElement.appendChild(productElement);
    }

    updateTotal();
}

function clearCart() {
    cart = [];
    total=0;
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
    var totalElement = document.getElementById('total');
    total=0;
    totalElement.innerHTML = 'Totale: ' + total;

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
    var total = document.getElementById('total')
    var totalText = total.innerHTML
    var numero = parseInt(totalText.match(/\d+/)[0]);
    console.log(numero); // Stampa 1288

    //crea ordine vero
    var ordine = cart

    // Clear  cart / update the cart view
    cart = [];
    total = 0;
    updateCartView();
    pay(numero);
}

function pay(total){
    total = total + '00'
    totale = 0;
    totale = total;
    console.log(totale)
    const stripeSecretKey = 'sk_test_51O29K2GDynile88IavaaauwTDRRX1d6dRqEyYRPBa5bFnb4OrhAxHHUx6p4i55jJJGnryxENpirDr8lUy28DSuKT00drXn9uDF';

      const data = new URLSearchParams({
        amount: totale,  //in cents!! mettere l' unità più piccola
        currency: 'eur',
        payment_method: 'pm_card_visa'
      });
     
      fetch('https://api.stripe.com/v1/payment_intents', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${stripeSecretKey}`, // Qui ci va la secret key
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: data
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
        notifica();
}

function notifica(){
    messaggio = 'caro' + document.getElementById('name').value
    messaggio += ',abbiamo ricevuto il tuo ordine, \r\n'
    messaggio += 'spediremo al seguente indirizzo: \r\n'
    messaggio += document.getElementById('address').value
    window.alert(messaggio);
}