class Cart {
    
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart'));
    }

    getItems() {
        return this.items
    }
    
    addItem(item, elt, qty, id) {
        // fonction to add an item to the cart
        let cartItem = item.find((item) => item.name + item.lense === id);
        for (let i = 0; i < elt.length; i++) {
            let idPrice = elt[i].dataset.id;
            if (idPrice === id) {
              cartItem.subTotal = (qty * cartItem.unitPrice).toFixed(2);
              // console.log( "prix total", cartItem.subTotal);
              cartItem.quantity = qty;
              elt[i].textContent = cartItem.subTotal;
            }
          }

        localStorage.setItem("cart", JSON.stringify(item));


    }

    removeItem(item, id) {
        // fonction to remove an item from cart
        let idInCart = item.map((item) => item.name + item.lense);
        for (let i = 0; i < idInCart.length; i++) {
            if (idInCart[i] === id) {
        item = item.filter((item) => item.name + item.lense !== id);
          //retourne un nouveau tableau avec nom et optique différent
          localStorage.setItem("cart", JSON.stringify(item));
            }
    }
    }

    getTotalValue(item, elt) {
        // fonction to calculate the total value of the cart
        for (let i = 0; i < item.length; i++) {
            let priceCamera = item[i].subTotal * 100;
            totalPrice.push(priceCamera);
            console.log("Liste Prix", priceCamera);
          }
          console.log("Liste Prix", totalPrice);
          const reducer = (accumulator, currentValue) => accumulator + currentValue; //reduce : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
          const calculPrice = (totalPrice.reduce(reducer, 0)/100).toFixed(2); //reduit toutes les valeurs à une valeur
          console.log("Prix total:", calculPrice);
         
         elt.textContent = `${calculPrice}€`;
        
          if (calculPrice == 0) {
            basketEmpty();
          }
        
          localStorage.setItem("totalPrice", JSON.stringify(calculPrice));
    }
}
    
