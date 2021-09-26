////////////////////////CONTAINER FORMULAIRE///////////////////////////////
function formContainer() {
  let eltForm = document.querySelector("#form-contact"); //affichage dans HTML
  eltForm.innerHTML += `
    <h2>Formulaire de commande</h2>
    <form method="post" id="form" >
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
   
    <button type="submit"  id="confirm-command" name="confirm-command">Valider ma commande</button>
    <p id="formNoValid"></p>
  
  </form>
    `;
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
    inputEmpty("lastName", "firstName"); //vérifie champs vides
    errorInput(inputName); //entrée non valide
    return false;
  }
};
//------------------------Validation input address-----------------------
const validAddress = function (inputAddress) {
  let addressRegExp = new RegExp(
    "^([0-9]{1,4}[a-z]{0,5})\\s[\\w\\s-'éèêâ]{2,}$",
    "g"
  );
  let testRegExpAddress = addressRegExp.test(inputAddress.value);

  if (testRegExpAddress) {
    inputValid(inputAddress);
    return true;
  } else {
    inputEmpty("address");
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
    inputEmpty("city");
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
    inputEmpty("postalCode");
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
    inputEmpty("email");
    errorInput(inputEmail);
    return false;
  }
};
//-----------------------champs vide----------------------------------
function inputEmpty(inputId) {
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

/////////////////////////////send form in localstorage//////////////////////////////////////////////////////
function sendForm(form) {
  let eltForm = document.querySelector("#confirm-command");
  let formNoValid = document.querySelector("#formNoValid");

  let inputForm = document.querySelector("#form");

  eltForm.addEventListener("click", async function (e) {
    e.preventDefault();

    const form = {
      lastName: document.querySelector("#lastName ").value,
      firstName: document.querySelector("#firstName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      postalCode: document.querySelector("#postalCode").value,
      email: document.querySelector("#email").value,
    };

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

      //--------------------------Requête POST----------------------------------------------------------
      const data = await postOrder(form, cart);
      localStorage.setItem("orderId", JSON.stringify(data));
      window.location = "/html/order.html";
    } else {
      formNoValid.textContent = "Formulaire non valide";
    }
  });
}
