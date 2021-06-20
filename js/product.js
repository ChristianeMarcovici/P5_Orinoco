/////////////////CONTAINER PRODUIT///////////////////////////////
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
                          <p class="text">Caractéristique : ${
                            product.description
                          }</p>
                          <p class="price">Prix : ${product.price / 100} €</p>
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
////////////////////CONTAINER OPTIQUE//////////////////////////////

function lensesOptionContent(lense) {
  //container "option" pour les optiques//
  const select = document.querySelector("#optical");
  const option = document.createElement("option");
  option.setAttribute("value", lense); //variable "lenses = json.Camera.lenses[i]"
  option.textContent = lense;
  select.appendChild(option);
}
///////////////////////////////choix optique//////////////////////////////////////////////
const lenseOption = []; //stock l'optique selectionné

//////////////////////////////////////////PANIER////////////////////////////////////////////

function btnBasket(cameraSelected) {
  const btn = document.querySelector(".add-to-cart");
  lenseSelected = document.querySelector("select");

  btn.addEventListener("click", function () {
    let basketContent = localStorage.getItem("basket14");
    if (basketContent) {
      basketContent = JSON.parse(basketContent);
      let optSelect =
        lenseSelected.options[lenseSelected.selectedIndex].value;
      lenseOption.push(optSelect);
      console.log(optSelect)
     
    } else {
      basketContent = [];
      let optNoSelect =
      lenseSelected.options[lenseSelected.selectedIndex].value;
    lenseOption.push(optNoSelect);
     
    }
    const basketCamera = {
      id: cameraSelected._id,
      price: cameraSelected.price / 100,
      name: cameraSelected.name,
      optical: lenseOption,
    };
    basketContent.push(basketCamera);
    localStorage.setItem("basket14", JSON.stringify(basketContent));
    console.log(basketCamera);
  });
}

///////////////////////////////SEARCH URL//////////////////////////////////////////////
const searchUrl = document.location.search; //requête
console.log(searchUrl);
const urlParams = new URLSearchParams(searchUrl); //extrait les Id
const cameraId = urlParams.get("id");

///////////////////////////////////////FETCH///////////////////////////////////////////
fetch(`http://localhost:3000/api/cameras/${cameraId}`) //requête vers Id
  .then(function (data) {
    if (data.ok) {
      return data.json();
    }
  })
  ////////////////////////////la page produit s'ouvre avec le contenant du produit au clic "en savoir plus" /////
  .then(function (jsonCamera) {
    let product = new Camera(jsonCamera);
    console.log(product);
    productPage(product); //appel de la fonction product page, affiche le produit seletioné

    ////////////////////////////boucle pour récuperer les optiques////////////////////////
    for (let i = 0; i < jsonCamera.lenses.length; i = i + 1) {
      //boucle pour récupérer les optiques
      let lense = jsonCamera.lenses[i];
      lensesOptionContent(lense); //affiche les optiques en option
      console.log(lense);
    }
    ////////////////////////choix optique/////////////////////////////////////////////

    ///////////////////////////Quantité/////////////////////////////////////////////

    /////////////////////////////appel la fonction panier////////////////////////////////////////////////////
    btnBasket(product);
  })

  .catch(function (error) {
    //si résultat non ok renvoie erreur
    console.log(error);
  });
