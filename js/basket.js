cart = JSON.parse(localStorage.getItem("cart"));
formStorage = JSON.parse(localStorage.getItem("form"));
let articleSelected = []; //liste articles
let totalPrice = [];
console.log(articleSelected);
let idProducts = []; //id du panier

///////////////////////////////CONTAINER PANIER////////////////////////////////////////////////////
function basketContainer(articleSelected) {
  //--------------Tableau-------------------------------//
  let tableBody = document.querySelector("#cart-tbody");
  let trTable = document.createElement("tr");
  tableBody.appendChild(trTable);
  trTable.setAttribute("class", "basketLine");
  //--------------Name--------------------------------//
  let thName = document.createElement("th");
  thName.setAttribute("class", "basketName");
  thName.textContent = articleSelected.name;
  trTable.appendChild(thName);
  //-------------Optique------------------------------//
  let thLense = document.createElement("th");
  thLense.setAttribute("class", "basketOptical");
  thLense.textContent = articleSelected.lense;
  trTable.appendChild(thLense);
  //--------------Quantité---------------------------//
  let thQty = document.createElement("th");
  thQty.setAttribute("class", "basketQty");
  trTable.appendChild(thQty);
  let selectQty = document.createElement("select");
  selectQty.setAttribute("class", "qty");
  selectQty.setAttribute(
    "data-id",
    articleSelected.name + articleSelected.lense
  ); //réf id caméra par name et optique
  thQty.appendChild(selectQty);
  //-------------Option quantité selectionné-------//
  let optCart = document.createElement("option");
  optCart.setAttribute("selected", "selected");
  optCart.setAttribute("value", articleSelected.quantity);
  optCart.textContent = articleSelected.quantity;
  selectQty.appendChild(optCart);
  //----------------option autre quantité-------//

  let min = 1;
  let max = 5;

  for (let i = min; i <= max; i++) {
    let optQty = document.createElement("option");

    optQty.setAttribute("value", [i]);
    optQty.value = optQty.textContent = [i];
    selectQty.appendChild(optQty);
  }
  //----------------Corbeille----------------------------//
  let trash = document.createElement("button");
  let icon = document.createElement("i");
  trash.appendChild(icon);
  trash.setAttribute("class", "trash");
  trash.setAttribute("data-id", articleSelected.name + articleSelected.lense);
  icon.setAttribute("class", "fas fa-trash-alt");
  trTable.appendChild(trash);
  //-----------------Prix------------------------------//
  let thPrice = document.createElement("th");
  thPrice.setAttribute("class", "basketPrice");
  thPrice.textContent = `${articleSelected.subTotal},00€`;
  thPrice.setAttribute("value", articleSelected.subTotal);
  thPrice.setAttribute("data-id", articleSelected.name + articleSelected.lense);
  trTable.appendChild(thPrice);
}

/////////////////////////////SUPPRIMER ARTICLE////////////////////////////
function removeProduct(cart) {
  let trash = document.querySelectorAll(".trash");
  let table = document.querySelector("#cart-tbody");

  trash.forEach((btn) =>
    btn.addEventListener("click", (id) => {
      let idInCart = cart.map((item) => item.name + item.lense); //ref id camera par nom et optique
      id = btn.dataset.id;

      for (let i = 0; i < idInCart.length; i++) {
        if (idInCart[i] === id) {
          // console.log(idInCart[i]);
          //console.log(id);
          cart = cart.filter((item) => item.name + item.lense !== id);
          //retourne un nouveau tableau avec nom et optique différent
          localStorage.setItem("cart", JSON.stringify(cart));

          //console.log(cart);

          table.removeChild(btn.parentElement); //supprime le container
          window.location.href = "basket.html"; //met à jour le panier
        }
      }
    })
  );
}

//////////////////////////+/- Quantité////////////////////////////////////////////////////
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
      // console.log(cart);
      window.location.href = "basket.html";
    })
  );
}

///////////////////////Calcul///////////////////////////////
function getTotalValue(cart) {
  for (let i = 0; i < cart.length; i++) {
    let priceCamera = cart[i].subTotal;
    totalPrice.push(priceCamera);
    console.log("Liste Prix", priceCamera);
  }
  console.log("Liste Prix", totalPrice);
  const reducer = (accumulator, currentValue) => accumulator + currentValue; //reduce : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  const calculPrice = totalPrice.reduce(reducer, 0); //reduit toutes les valeurs à une valeur
  console.log("Prix total:", calculPrice);
  const totalContain = document.querySelector("#total");
  totalContain.textContent = `${calculPrice},00€`;

  if (calculPrice == 0) {
    basketEmpty();
  }

  localStorage.setItem("totalPrice", JSON.stringify(calculPrice));
}
///////////////////////////////Fonction panier vide //////////////////////////
function basketEmpty() {
  const displayForm = document.querySelector("#form-contact");
  displayForm.style.display = "none";
  const basketEmpty = document.querySelector("#basket-contain");
  basketEmpty.innerHTML = `<div class="basketEmpty">Votre panier est vide</div>`;
  console.log("Mon panier : vide");
  const displayContain = document.querySelector("#basket");
  displayContain.style.display = "none"; //N'affiche pas le tableau
}

/////////////////////id panier pour API POST//////////////////////////////////
function idProduct(cart) {
  for (let i = 0; i < cart.length; i++) {
    let id = cart[i].id;
    idProducts.push(id);
    // console.log(id)
  }
}
////////////////////Affichage panier dans HTML/////////////////////////////
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

    idProduct(cart);

    formContainer();

    sendFormIf();
    saveForm();
    sendFormInStorage();
  } else {
    //si panier vide
    basketEmpty();
  }
}

//////////////////////////////appel fonction panier///////////////////////////////////////////////////////

addToBasket(cart);
