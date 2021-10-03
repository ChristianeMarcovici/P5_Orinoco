/////////////////Variables/////////////////////////////////////////////////////////////////////
let cartClass = new Cart();
let cart = cartClass.getItems();
formStorage = JSON.parse(localStorage.getItem("form"));

let articleSelected = []; //liste articles
let totalPrice = [];
let idProducts = []; //id du panier pour API POST

///////////////////////////////CONTAINER PANIER////////////////////////////////////////////////////
function basketContainer(articleSelected) {
  //--------------Tableau-------------------------------//
  let tableBody = document.querySelector("#cart-tbody");
  let trTable = document.createElement("tr");
  tableBody.appendChild(trTable);
  trTable.setAttribute("class", "basketLine");
  //--------------Name--------------------------------//
  let tdName = document.createElement("td");
  tdName.setAttribute("class", "basketName");
  tdName.textContent = articleSelected.name;
  trTable.appendChild(tdName);
  //-------------Optique------------------------------//
  let tdLense = document.createElement("td");
  tdLense.setAttribute("class", "basketOptical");
  tdLense.textContent = articleSelected.lense;
  trTable.appendChild(tdLense);
  //--------------Quantité---------------------------//
  let tdQty = document.createElement("td");
  tdQty.setAttribute("class", "basketQty");
  trTable.appendChild(tdQty);
  let selectQty = document.createElement("select");
  selectQty.setAttribute("class", "qty");
  selectQty.setAttribute(
    "data-id",
    articleSelected.name + articleSelected.lense
  ); //réf id caméra par name et optique
  tdQty.appendChild(selectQty);
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

  //-----------------Prix------------------------------//
  let tdPrice = document.createElement("td");
  tdPrice.setAttribute("class", "basketPrice");
  tdPrice.textContent = `${articleSelected.subTotal}€`;
  tdPrice.setAttribute("value", articleSelected.subTotal);
  tdPrice.setAttribute("data-id", articleSelected.name + articleSelected.lense);
  trTable.appendChild(tdPrice);

  //----------------Corbeille----------------------------//
  let trash = document.createElement("button");
  let icon = document.createElement("i");
  trash.appendChild(icon);
  trash.setAttribute("class", "trash");
  trash.setAttribute("data-id", articleSelected.name + articleSelected.lense);
  icon.setAttribute("class", "fas fa-trash-alt");
  trTable.appendChild(trash);
}

/////////////////////////////SUPPRIMER ARTICLE////////////////////////////
function removeProduct(cart) {
  let trash = document.querySelectorAll(".trash");
  let table = document.querySelector("#cart-tbody");

  trash.forEach((btn) =>
    btn.addEventListener("click", (id) => {
      id = btn.dataset.id;
      //supprime ligne et met à jour le localStorage
      cartClass.removeItem(cart, id);

      table.removeChild(btn.parentElement); //supprime le container
      window.location.href = "basket.html"; //met à jour le panier
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
      let qty = btnQty.value;

      cartClass.addItem(cart, eltPrice, qty, id);
      //change valeur sous-total si changement quantité

      window.location.href = "basket.html";
    })
  );
}

///////////////////////Calcul///////////////////////////////
function getTotal(cart) {
  const totalContain = document.querySelector("#total");
  cartClass.getTotalValue(cart, totalContain);
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
  const footerBottom = document.querySelector("footer");
  footerBottom.style.position = "absolute";
  footerBottom.style.bottom = "0px";
}

/////////////////////id panier pour API POST//////////////////////////////////
function idProduct(cart) {
  for (let i = 0; i < cart.length; i++) {
    let id = cart[i].id;
    idProducts.push(id);
  
  }
}
////////////////////Affichage panier dans HTML/////////////////////////////
function addToBasket(cart) {
  if (cart != null) {
    articleSelected.push(cart);

    for (let cartList of cart) {
      articleSelected = new CameraId(
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

    getTotal(cart);
    //------------------------post-----------------------------------------------//
    idProduct(cart);

    formContainer();

    sendFormIf();
    saveForm();
    sendForm();
  } else {
    //si panier vide
    basketEmpty();
  }
}

//////////////////////////////appel fonction panier///////////////////////////////////////////////////////

addToBasket(cart);
