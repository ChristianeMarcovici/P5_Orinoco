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
function lensesOption(lenses) {
  //container "option" pour les optiques//
  const select = document.querySelector("select");
  const option = document.createElement("option");
  option.setAttribute("value", lenses); //variable "lenses = json.Camera.lenses[i]"
  option.textContent = lenses;
  select.appendChild(option);
}

///////////////////////////////SEARCH URL//////////////////////////////////////////////
const searchUrl = document.location.search;
console.log(searchUrl);
const urlParams = new URLSearchParams(searchUrl);
const cameraId = urlParams.get("id");

///////////////////////////////////////FETCH///////////////////////////////////////////
fetch(`http://localhost:3000/api/cameras/${cameraId}`) //requête vers Id
  .then(function (data) {
    //une fois résultat obtenu on crée une fonction qui stock le résultat
    if (data.ok) {
      //si résultat ok
      return data.json(); //renvoie le résultat sous format json(lisible)
    }
  })
  .then(function (jsonCamera) {
    let product = new Camera(jsonCamera); //permet de récupérer chaque element
    console.log(product);
    productPage(product);

    for (let i = 0; i < jsonCamera.lenses.length; i = i + 1) {
      //boucle pour récupérer les optiques
      let lenses = jsonCamera.lenses[i];
      console.log(lenses);
      lensesOption(lenses);
    }
  })

  .catch(function (error) {
    //si résultat non ok renvoie erreur
    console.log(error);
  });
