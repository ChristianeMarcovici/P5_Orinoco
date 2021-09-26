class Camera {
  constructor(id, name, price, description, imageUrl, lenses) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.lenses = lenses;
  }

  getFormatedPrice() {
    return (this.price / 100).toFixed(2);
  }
}
//Object.assign = lenses ; _id ; name ; price ; description ; imageUrl.
