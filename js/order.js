//------------------localStorage---------------------------//
formStorage = JSON.parse(localStorage.getItem("form"));
totalStorage = JSON.parse(localStorage.getItem("totalPrice"));
orderStorage = JSON.parse(localStorage.getItem("orderId"));
cart = JSON.parse(localStorage.getItem("cart"));

//-----------------Récapitulatif commande-----------------//
if (orderStorage) {
  let firstName = document.querySelector("#orderFirstName");
  firstName.textContent = `${formStorage.firstName}`;

  let lastName = document.querySelector("#orderLastName");
  lastName.textContent = `${formStorage.lastName}`;

  let orderTotal = document.querySelector("#orderPrice");
  orderTotal.textContent = `${totalStorage} €`;

  let orderId = document.querySelector("#orderId");
  orderId.textContent = `${orderStorage.orderId}`;
} else {
  let order = document.querySelector("#order");
  order.innerHTML = "<h3>Vous n'avez aucune commande en cours</>";
}
//---------------Vider le panier-------------------------//

localStorage.clear("cart");
