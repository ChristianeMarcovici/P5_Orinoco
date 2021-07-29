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
                          <p class="ref">Référence : ${product._id}</p>
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
                  
                      <button type="button" class="add-to-cart">Ajouter au panier</button>
                      </div>`;
}
///////////////////////////CONTAINER OPTIQUE///////////////////////////////////////////////
function lensesOptionContent(lense) {
  //container "option" pour les optiques//
  const select = document.querySelector("#optical");
  const option = document.createElement("option");
  option.setAttribute("value", lense); //variable "lenses = json.Camera.lenses[i]"
  option.textContent = lense;
  select.appendChild(option);
}

//////////////////////////////////////////PANIER////////////////////////////////////////////
function btnBasket(cameraSelected) {
  const btn = document.querySelector(".add-to-cart");
  const lenseSelected = document.querySelector("select");
  btn.addEventListener("click", function () {
    let basketContent = JSON.parse(localStorage.getItem("cart")) || [];
    

    const basketCamera = {
      id: cameraSelected._id,
      price: cameraSelected.price,
      name: cameraSelected.name,
      optical: lenseSelected.value,
      quantity: 1
    };
   
    basketContent.push(basketCamera);
    localStorage.setItem("cart", JSON.stringify(basketContent));
    console.log(basketContent);
  });
}
//////////////////////////////BOUCLE cameraId/////////////////////////////////////
async function cameraById(cameraId) {
  cameraId = await getApiCameraById();
  let product = new Camera(cameraId);
 
  console.log(product);
 

  productPage(product);
 

//*****************boucle pour récuperer les optiques************************//
  for (let lense of cameraId.lenses) {
   
    lensesOptionContent(lense); //affiche les optiques en option
    console.log(lense);
  }

//****************************PANIER****************************************//  
  btnBasket(product);
}

///////////////////////////////////////FETCH///////////////////////////////////////////
console.log(cameraId);
getApiCameraById();

//////////////////////////////////////PAGE CAMERA////////////////////////////////////////////
cameraById(cameraId);

