class Camera {
  constructor( id, name, price, description, imageUrl, lenses,) {   
   
    this.id = id;
    this.name = name;
    this.price= price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.lenses= lenses;
  }
}
//Object.assign = lenses ; _id ; name ; price ; description ; imageUrl.

class Basket {
  constructor(id, name, lense, quantity, price){
    this.id = id;
    this.name = name;
    this.lense = lense;
    this.quantity = quantity ;
    this.price = price;
   
  }
}
