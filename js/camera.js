class Camera {
  constructor(id, name, price, description, imageUrl, lenses) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.lenses = lenses;
  }
}
//Object.assign = lenses ; _id ; name ; price ; description ; imageUrl.

class Basket {
  constructor(id, name, lense, quantity, unitPrice, subTotal) {
    this.id = id;
    this.name = name;
    this.lense = lense;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.subTotal = subTotal;
  }
}

class Form {
  constructor() {
    (this.lastName = document.querySelector("#lastName").value),
      (this.firstName = document.querySelector("#firstName").value),
      (this.address = document.querySelector("#address").value),
      (this.city = document.querySelector("#city").value),
      (this.postalCode = document.querySelector("#postalCode").value),
      (this.email = document.querySelector("#email").value);
  }
}
