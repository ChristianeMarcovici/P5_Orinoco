cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
let savePrice = JSON.parse(localStorage.getItem("total price"));
let articleSelected = []; //liste articles
let qtyInCart = [];

let idInContentPrice = [];
//let idInSubtotal = [];
let unitPrice = [];

let totalPrice = [];
let newPrice = [];
console.log("new price", newPrice);

///////////////////////////////CONTAINER////////////////////////////////////////////////////
function basketContainer(articleSelected) {
  let tableBody = document.querySelector("#cart-tbody"); //affichage dans HTML
  let trTable = document.createElement("tr");
  tableBody.appendChild(trTable);
  trTable.setAttribute("class", "basketLine");

  let thName = document.createElement("th"); //name
  thName.setAttribute("class", "basketName");
  thName.textContent = articleSelected.name;
  trTable.appendChild(thName);

  let thLense = document.createElement("th"); //optique
  thLense.setAttribute("class", "basketOptical");
  thLense.textContent = articleSelected.lense;
  trTable.appendChild(thLense);

  let thQty = document.createElement("th"); //quantité
  thQty.setAttribute("class", "basketQty");

  trTable.appendChild(thQty);
  let selectQty = document.createElement("select");
  selectQty.setAttribute("class", "qty");
  selectQty.setAttribute(
    "data-id",
    articleSelected.name + articleSelected.lense
  );
  thQty.appendChild(selectQty);

  let optCart = document.createElement("option");
  optCart.setAttribute("selected", "selected");
  optCart.setAttribute("value", articleSelected.quantity);
  optCart.textContent = articleSelected.quantity;
  selectQty.appendChild(optCart);

  let min = 1;
  let max = 5;

  for (let i = min; i <= max; i++) {
    let optQty = document.createElement("option");

    optQty.setAttribute("value", [i]);
    optQty.value = optQty.textContent = [i];
    selectQty.appendChild(optQty);
  }

  let trash = document.createElement("button"); //corbeille
  let icon = document.createElement("i");
  trash.appendChild(icon);
  trash.setAttribute("class", "trash");
  trash.setAttribute("data-id", articleSelected.name + articleSelected.lense);
  icon.setAttribute("class", "fas fa-trash-alt");
  trTable.appendChild(trash);

  let thPrice = document.createElement("th"); //prix
  thPrice.setAttribute("class", "basketPrice");
  thPrice.textContent = articleSelected.subTotal;
  thPrice.setAttribute("value", articleSelected.price);
  thPrice.setAttribute("data-id", articleSelected.name + articleSelected.lense);
  trTable.appendChild(thPrice);
}
///////////////////////////////////////////////////////

/////////////////////////////SUPPRIMER ARTICLE////////////////////////////
function removeProduct(cart, id) {
  let trash = document.querySelectorAll(".trash");
  let table = document.querySelector("#cart-tbody");

  trash.forEach((btn) =>
    btn.addEventListener("click", (id) => {
      let idInCart = cart.map((item) => item.name + item.lense); //ref id camera par nom et optique
      id = btn.dataset.id;

      for (let i = 0; i < idInCart.length; i++) {
        if (idInCart[i] === id) {
          console.log(idInCart[i]);
          console.log(id);
          cart = cart.filter((item) => item.name + item.lense !== id); //retourne un nouveau tableau avec nom et optique différent
          localStorage.setItem("cart", JSON.stringify(cart));
          console.log(cart);

          table.removeChild(btn.parentElement); //supprime le container
        }
      }
    })
  );
}

//////////////////////////quantite////////////////////////////////////////////////////
function changeQty(cart) {
  let eltPrice = document.querySelectorAll(".basketPrice");
  let eltQty = document.querySelectorAll(".qty");

  eltQty.forEach((btnQty) =>
    btnQty.addEventListener("change", (id) => {
      id = btnQty.dataset.id;
      // console.log(id)
      let cartItem = cart.find((item) => item.name + item.lense === id);
      //console.log(cartItem.subTotal)
      let qty = btnQty.value;
      // console.log("quantite",qty)

      for (let i = 0; i < eltPrice.length; i++) {
        let idPrice = eltPrice[i].dataset.id;
        if (idPrice === id) {
          cartItem.subTotal = qty * cartItem.unitPrice;
          // console.log( "prix total", cartItem.subTotal);
          cartItem.quantity = qty;
          eltPrice[i].textContent = cartItem.subTotal;
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      console.log(cart);
    })
  );
}

///////////////////////Calcul///////////////////////////////
function getTotalValue(cart) {
  for (let i = 0; i < cart.length; i++) {
    let priceCamera = cart[i].subTotal;
    totalPrice.push(priceCamera);
  }

  console.log("Liste Prix", totalPrice);
  const reducer = (accumulator, currentValue) => accumulator + currentValue; //reduce : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  const calculPrice = totalPrice.reduce(reducer, 0); //reduit toutes les valeurs à une valeur
  console.log("Prix total:", calculPrice);
  const totalContain = document.querySelector("#total");
  totalContain.textContent = calculPrice;
}

////////////////////Affichage panier dans HTML//////////////////////
function addToBasket(cart) {
  if (cart != null) {
    articleSelected.push(cart);
    console.log("Caméra dans panier :", articleSelected);

    for (let cartList of cart) {
      articleSelected = new Basket(
        cartList.id,
        cartList.name,
        cartList.lense,
        cartList.quantity,
        cartList.price,
        cartList.subTotal
      );
      basketContainer(articleSelected);
    }

    changeQty(cart);

    removeProduct(cart);

    getTotalValue(cart);
  } else {
    //si panier vide
    const basketEmpty = document.querySelector("#basket-contain");
    basketEmpty.innerHTML = `<div class="basketEmpty">Votre panier est vide</div>`;
    console.log("Mon panier : vide");
    const displayContain = document.querySelector("#basket");
    displayContain.style.display = "none"; //N'affiche pas le tableau
  }
}
/////////////////////////////////////////////////////////////////////////////////////

addToBasket(cart);
