class Camera {
  constructor(jsonCamera) {
    jsonCamera && Object.assign(this, jsonCamera);
  }
}
//Object.assign = lenses ; _id ; name ; price ; description ; imageUrl.


class Article {
  constructor(jsonCart){
    jsonCart && Object.assign(this, jsonCart)
  }
}

