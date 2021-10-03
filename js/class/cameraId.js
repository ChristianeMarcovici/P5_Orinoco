class CameraId {
  constructor(id, name, lense, quantity, unitPrice, subTotal) {
    this.id = id;
    this.name = name;
    this.lense = lense;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.subTotal = subTotal;
  }

  getFormatedPrice() {
    return (this.price / 100).toFixed(2);
  }
}
