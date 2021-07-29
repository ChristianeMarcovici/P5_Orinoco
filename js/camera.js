class Camera {
  constructor(camera) {
    camera && Object.assign(this, camera);
  }
}
//Object.assign = lenses ; _id ; name ; price ; description ; imageUrl.
class Lense {
  constructor(lenses) {
    lenses && Object.assign(this, lenses)
   
  }
}

class Article {
  constructor(jsonCart) {
    jsonCart && Object.assign(this, jsonCart);
  }
}
