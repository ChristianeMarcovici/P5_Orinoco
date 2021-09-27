//------------------localStorage---------------------------//
formStorage = JSON.parse(localStorage.getItem("form"));
totalStorage = JSON.parse(localStorage.getItem("totalPrice"));
orderStorage = JSON.parse(localStorage.getItem("orderId"));
cart = JSON.parse(localStorage.getItem("cart"));

//--------------1ère lettre en Majuscule-----------------//
//charAt=>retourne le caractère à la position spécifié
//slice=>modifie le contenu 

function nameFirstLetterUppercase(item) {
  item = item.charAt(0).toUpperCase() + item.slice(1);
  return item;
}
//-----------------Récapitulatif commande-----------------//
if (orderStorage) {
  let firstName = document.querySelector("#orderFirstName");
  firstName.textContent = `${nameFirstLetterUppercase(formStorage.firstName)}`;

  let lastName = document.querySelector("#orderLastName");
  lastName.textContent = `${nameFirstLetterUppercase(formStorage.lastName)}`;

  let orderTotal = document.querySelector("#orderPrice");
  orderTotal.textContent = `${totalStorage} €`;

  let orderId = document.querySelector("#orderId");
  orderId.textContent = `${orderStorage.orderId}`;
} else {
  let order = document.querySelector("#order");
  order.innerHTML = "<h3>Votre commande est en cours...</>";
}
//---------------Vider le panier-------------------------//

localStorage.clear("cart");
