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
                          <p class="text">Caractéristique : ${
                            product.description
                          }</p>
                          <p class="price">Prix : ${product.getFormatedPrice()}€</p>
                      </div>
                      <div class="choice-optical">
                      <form method="post" action="">
                         <p class="optical-content">
                 <label class="text-optical" for="optical">Objectif : </label><br />
                 <select name="optical" id="optical">
                       </select>
                       </p>     
                      </form> 
                  
                      <button type="button" class="add-to-cart" data-id=${
                        product.id
                      }>Ajouter au panier</button>
                      
                      </div>`;
}

///////////////////////////CONTAINER OPTIQUE///////////////////////////////////////////////
function lensesOptionContent(lense) {
  //container "option" pour les optiques//
  const select = document.querySelector("#optical");
  const option = document.createElement("option");
  option.setAttribute("value", lense); //lense = lense of product.lenses
  option.textContent = lense;
  select.appendChild(option);
}

//////////////////////////////////////////PANIER////////////////////////////////////////////
function btnBasket(cameraSelected) {
  const btn = document.querySelector(".add-to-cart");

  btn.addEventListener("click", function () {
    const lenseSelected = document.querySelector("select").value;

    let camerasInCart = [];
    let otherCamera = true;

    const basketCamera = new CameraId(
      cameraSelected.id,
      cameraSelected.name,
      lenseSelected,
      (quantity = 1),
      cameraSelected.getFormatedPrice(),
      (cameraSelected.subTotal = cameraSelected.getFormatedPrice())
    );

    if (localStorage.getItem("cart") === null) {
      //si panier vide
      
      camerasInCart.push(basketCamera); //Je  push la caméra dans le panier
      localStorage.setItem("cart", JSON.stringify(camerasInCart)); //et je stock en string(le localstorage n'accepte que du string)
    } else {
      camerasInCart = JSON.parse(localStorage.getItem("cart"));

      camerasInCart.forEach(function (cameraInCart) {
        // pour chaque article j'incremente la quantité si optique identique

        if (lenseSelected === cameraInCart.lense) {
          cameraInCart.quantity++;
          cameraInCart.subTotal = (
            cameraSelected.getFormatedPrice() * cameraInCart.quantity
          ).toFixed(2);

          otherCamera = false;
        }
      });
      if (otherCamera)
        //si le panier n'est pas vide et c'est une autre camera

        camerasInCart.push(basketCamera);
      localStorage.setItem("cart", JSON.stringify(camerasInCart));
    }
    if (confirm("Votre article a bien été ajouté, \n Voir mon panier")) {
      window.location = "/html/basket.html";
    }
  });
}

//////////////////////////////BOUCLE cameraId/////////////////////////////////////
async function cameraById(cameraId) {
  let product = await getApiCameraById(cameraId); //API

  productPage(product); //container html

  //*****************boucle pour récuperer les optiques************************//
  for (let lense of product.lenses) {
    lensesOptionContent(lense); //container html option  optiques
  }

  //****************************PANIER****************************************//
  btnBasket(product);
}

//////////////////////////////////////PAGE CAMERA////////////////////////////////////////////
cameraById(id);
