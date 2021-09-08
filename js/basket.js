cart = JSON.parse(localStorage.getItem("cart"));
formStorage = JSON.parse(localStorage.getItem("form"));
let articleSelected = []; //liste articles
let totalPrice = [];
console.log(articleSelected);

///////////////////////////////CONTAINER PANIER////////////////////////////////////////////////////
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
  ); //réf id caméra par name et optique
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
          cart = cart.filter((item) => item.name + item.lense !== id); //retourne un nouveau tableau avec nom et optique différent
          localStorage.setItem("cart", JSON.stringify(cart));
          //console.log(cart);

          table.removeChild(btn.parentElement); //supprime le container
          window.location.href = "basket.html"; //met à jour le panier
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
  }
  console.log("Liste Prix", totalPrice);
  const reducer = (accumulator, currentValue) => accumulator + currentValue; //reduce : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  const calculPrice = totalPrice.reduce(reducer, 0); //reduit toutes les valeurs à une valeur
  console.log("Prix total:", calculPrice);
  const totalContain = document.querySelector("#total");
  totalContain.textContent = calculPrice;

  totalContain.textContent = calculPrice;

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
////////////////////////CONTAINER FORMULAIRE///////////////////////////////
function formContainer() {
  let eltForm = document.querySelector("#form-contact"); //affichage dans HTML
  eltForm.innerHTML += `
  <h2>Formulaire de commande</h2>
  <form action="" method="post" id="form" >
  <p>
      <label for="lastName">Nom</label>
      <input type="text" id="lastName" name="lastName" required="required" placeholder="Dupont"/>
      <small ></small>
  </p>
  <p>
      <label for="firstName">Prénom</label>
      <input type="text" id="firstName" name="firstName" required="required" placeholder="Jean"/>
      <small></small>
  </p>
  <p>
      <label for="address">Adresse</label>
      <textarea id="address" name="address" required="required" placeholder="1 avenue des Champs-Elysée"></textarea>
      <small></small>
  </p>
  <p>
      <label for="city">Ville</label>
      <input type="text" id="city" name="city" required="required" placeholder="Paris"/>
      <small></small>
  </p>
  <p>
      <label for="postalCode">Code Postal</label>
      <input type="text" id="postalCode" name="postalCode" required="required" placeholder="75008"/>
      <small></small>
  </p>
  <p>
      <label for="email">Email</label>
      <input type="email" id="email" name="email" required="required" placeholder="dupont.jean@gmail.com"/>
      <small></small>
  </p>
  <a >
  <button type="submit"  id="confirm-command" name="confirm-command">Valider ma commande</button>
  <p id="formNoValid"></p>

</form>
  `;
}

/////////////////////////Condition envoie formulaire///////////////////
function sendFormIf() {
  let form = document.querySelector("#form");

  form.lastName.addEventListener("change", function () {
    validName(this);
  });

  form.firstName.addEventListener("change", function () {
    validName(this);
  });
  form.address.addEventListener("change", function () {
    validAddress(this);
  });
  form.city.addEventListener("change", function () {
    validCity(this);
  });
  form.postalCode.addEventListener("change", function () {
    validPostalCode(this);
  });
  form.email.addEventListener("change", function () {
    validEmail(this);
  });
}
//------------------------Validation input name--------------------
const validName = function (inputName) {
  let nameRegExp = new RegExp("^[a-zA-Z\\s-'éèêë]{3,20}$", "g");
  let testRegExpName = nameRegExp.test(inputName.value); //renvoie true ou false
  // console.log(inputName.value);

  if (testRegExpName) {
    inputValid(inputName);
    return true;
  } else {
    caseEmpty("lastName", "firstName"); //vérifie champs vides
    errorInput(inputName); //entrée non valide
    console.log(errorInput(inputName));
    return false;
  }
};
//------------------------Validation input address-----------------------
const validAddress = function (inputAddress) {
  let addressRegExp = new RegExp(
    "^([0-9]{1,4}[a-z]{0,5})\\s[\\w\\s-'éèê]{2,}$",
    "g"
  );
  let testRegExpAddress = addressRegExp.test(inputAddress.value);

  if (testRegExpAddress) {
    inputValid(inputAddress);
    return true;
  } else {
    caseEmpty("address");
    errorInput(inputAddress);
    return false;
  }
};
//------------------------Validation input town--------------------------
const validCity = function (inputCity) {
  let cityRegExp = new RegExp("^[a-zA-Z\\s-'éèê]{1,}$", "g");
  let testRegExpCity = cityRegExp.test(inputCity.value);

  if (testRegExpCity) {
    inputValid(inputCity);
    return true;
  } else {
    caseEmpty("city");
    errorInput(inputCity);
    return false;
  }
};
//------------------------Validation input postalCode--------------------
const validPostalCode = function (inputPostalCode) {
  let postalCodeRegExp = new RegExp("^[0-9]{5}$", "g");
  let testRegExpPostalCode = postalCodeRegExp.test(inputPostalCode.value);

  if (testRegExpPostalCode) {
    inputValid(inputPostalCode);
    return true;
  } else {
    caseEmpty("postalCode");
    errorInput(inputPostalCode);
    return false;
  }
};
//------------------------Validation input email-------------------------
const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9._-]+[@{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let testRegExpEmail = emailRegExp.test(inputEmail.value);

  if (testRegExpEmail) {
    inputValid(inputEmail);
    return true;
  } else {
    caseEmpty("email");
    errorInput(inputEmail);
    return false;
  }
};
//-----------------------champs vide----------------------------------
function caseEmpty(inputId) {
  document.querySelector(`#${inputId}`).textContent = "";
}
//-----------------------texte non valide-----------------------------
function errorInput(nextElt) {
  let small = nextElt.nextElementSibling;
  small.textContent = "non valide";
}
//---------------------texte valide----------------------------------
function inputValid(eltNext) {
  let small = eltNext.nextElementSibling;
  small.textContent = "";
}

//////////////////////////////Save form///////////////////////////////////////////////////////////////////
function saveForm() {
  const dataStorageForm = localStorage.getItem("form");
  const storageForm = JSON.parse(dataStorageForm);
  if (storageForm == null) {
  } else {
    document.querySelector("#lastName").value = storageForm.lastName;
    document.querySelector("#firstName").value = storageForm.firstName;
    document.querySelector("#address").value = storageForm.address;
    document.querySelector("#city").value = storageForm.city;
    document.querySelector("#postalCode").value = storageForm.postalCode;
    document.querySelector("#email").value = storageForm.email;
  }
}
/////////////////////////////send form in localstorage//////////////////////////////////////////////////////
function sendFormInStorage() {
  let eltForm = document.querySelector("#confirm-command");
  let formNoValid = document.querySelector("#formNoValid");

  let inputForm = document.querySelector("#form");

  eltForm.addEventListener("click", function (e) {
    e.preventDefault();
    const form = new Form();

    if (
      //vérifie les entrées
      validName(inputForm.lastName) &&
      validName(inputForm.firstName) &&
      validAddress(inputForm.address) &&
      validCity(inputForm.city) &&
      validPostalCode(inputForm.postalCode) &&
      validEmail(inputForm.email)
    ) {
      formNoValid.textContent = "";
      localStorage.setItem("form", JSON.stringify(form));

      localStorage.getItem("form", form);

      //--------------------------Requête POST----------------------------------------------------------

      fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: {
            firstName: form.firstName,
            lastName: form.lastName,
            address: form.address,
            city: form.city,
            email: form.email,
          },
          products: [articleSelected.id],
        }),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          localStorage.setItem("orderId", JSON.stringify(data));
          window.location = "/html/order.html";
        })
        .catch((error) => console.log("erreur de type : ", error));
    } else {
      formNoValid.textContent = "Formulaire non valide";
    }
  });
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
