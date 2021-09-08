//////////////////////////////CONTAINER PRODUIT///////////////////////////////
function productPage(product) {
  //container "div" pour les articles//
  document.querySelector(
    ".product-container"
  ).innerHTML += ` <div class="img-product">
                          <img src=${product.imageUrl}>
                      </div>
                      <div class="description">
                          <h3 class="name">${product.name}</h3>
                          <p class="ref">Référence : ${product.id}</p>
                          <p class="text">Caractéristique : ${product.description}</p>
                          <p class="price">Prix : ${product.price} €</p>
                      </div>
                      <div class="choice-optical">
                      <form method="post" action="">
                         <p class="optical-content">
                 <label class="text-optical" for="optical">Choisissez votre optique : </label><br />
                 <select name="optical" id="optical">
                       </select>
                       </p>     
                      </form> 
                  
                      <button type="button" class="add-to-cart" data-id=${product.id}>Ajouter au panier</button>
                      </div>`;
}
//(.../100).toFixed(2)//affichage 2 chiffres après la virgule sans arrondir///////////

///////////////////////////CONTAINER OPTIQUE///////////////////////////////////////////////
function lensesOptionContent(lense) {
  //container "option" pour les optiques//
  const select = document.querySelector("#optical");
  const option = document.createElement("option");
  option.setAttribute("value", lense); //variable "lenses = json.Camera.lenses[i]"
  option.textContent = lense;
  select.appendChild(option);
}
////////////////////////////////VARIABLES POUR PANIER//////////////////////////////////////

//////////////////////////////////////////PANIER////////////////////////////////////////////
function btnBasket(cameraSelected) {
  const btn = document.querySelector(".add-to-cart");

  btn.addEventListener("click", function () {
    const lenseSelected = document.querySelector("select").value;
    console.log(lenseSelected);

    let camerasInCart = [];
    let: otherCamera = true;

    const basketCamera = new Basket(
      cameraSelected.id,
      cameraSelected.name,
      lenseSelected,
      (quantity = 1),
      cameraSelected.price,
      (cameraSelected.subTotal = cameraSelected.price)
    );
    console.log(basketCamera);

    if (localStorage.getItem("cart") === null) {
      //si panier vide

      camerasInCart.push(basketCamera); //Je  pousse la caméra dans le panier
      localStorage.setItem("cart", JSON.stringify(camerasInCart)); //et je stock en string(le localstorage n'accepte que du string)
    } else {
      camerasInCart = JSON.parse(localStorage.getItem("cart")); //sinon je récupère les articles

      camerasInCart.forEach(function (cameraInCart) {
        // pour chaque article j'incremente la quantité si optique identique

        if (lenseSelected === cameraInCart.lense) {
          cameraInCart.quantity++;
          cameraInCart.subTotal = cameraSelected.price * cameraInCart.quantity;
          //subTotal.push(cameraInCart.subTotal)
          otherCamera = false;
        }
      });
      if (otherCamera)
        //si le panier n'est pas vide et c'est un autre camera

        camerasInCart.push(basketCamera);
      localStorage.setItem("cart", JSON.stringify(camerasInCart));
    }
  });
}
//////////////////////////////BOUCLE cameraId/////////////////////////////////////
async function cameraById(cameraId) {
  let jsonCamera = await getApiCameraById(cameraId);
  let product = new Camera(
    jsonCamera._id,
    jsonCamera.name,
    jsonCamera.price,
    jsonCamera.description,
    jsonCamera.imageUrl,
    jsonCamera.lenses
  );

  productPage(product); //container html

  //*****************boucle pour récuperer les optiques************************//
  for (let lense of product.lenses) {
    lensesOptionContent(lense); //container html option  optiques
    console.log(lense);
  }

  //****************************PANIER****************************************//
  btnBasket(product);
}

///////////////////////////////////////FETCH///////////////////////////////////////////

getApiCameraById(id);
console.log(id);
//////////////////////////////////////PAGE CAMERA////////////////////////////////////////////
cameraById(id);
