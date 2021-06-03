////////////////////fetch/////////////////////////////////////////////////
fetch("http://localhost:3000/api/cameras") //requête de type Get au serveur local
  .then(function (data) {
    //une fois résultat obtenu on crée une fonction qui stock le résultat
    if (data.ok) {
      //si résultat ok
      return data.json(); //renvoie le résultat sous format json(lisible)
    }
  })
  .then(function (jsonListCameras) {
    //on crée une autre fonction avec le résultat pour stocker :
    console.log(jsonListCameras); //affiche le résultat dans la console
    for (let jsonCamera of jsonListCameras) {
      //on crée une boucle qui va parcourrir "jsonListCameras" et qui va affecté chaque valeur à "jsonCamera"
      let camera = new Camera(jsonCamera); //permet de récupérer chaque element
      document.querySelector(
        ".container"
      ).innerHTML += `<div class= "img-items">
                          <img src=${camera.imageUrl}>
                      <div class= "name-items"
                          <h3>${camera.name}</h3>
                          <a href="./html/product.html?id=${camera._id}"><button class="btn-items">En savoir plus</button></a>
                     </div>
                     </div>`;
    }
  })
  .catch(function (error) {
    //si résultat non ok renvoie erreur
    console.log(error);
  });