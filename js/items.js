///////////////////CONTAINER CAMERA/////////////////////////////////////////
function showCameras(camera) {
  document.querySelector(".container").innerHTML += `<div class= "img-items">
                      <img src=${camera.imageUrl}>
                  <div class= "name-items"
                      <h3>${camera.name}</h3>
                      <a href="./html/product.html?id=${camera._id}">
                      <button class="btn-items">En savoir plus</button></a>
                 </div>
                 </div>`;
}

///////////////////////Boucle Cameras/////////////////////////////////////
async function getCameras(cameras) {
  cameras = await getApiCamera(); //API

  for (let camera of cameras) {
    showCameras(camera); //affichage
  }
}

//////////////////Affichage Caméras//////////////////////////////////////
getCameras();
