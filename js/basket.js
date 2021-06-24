let basketContent = localStorage.getItem("basket14");
let cart = JSON.parse(basketContent);
let articleSelected = []; //liste articles
console.log("Mon panier : ", cart);
let tableBody = []; //affichage dans HTML

////////////////////Affichage panier dans HTML//////////////////////

if (cart === null) {
  //si panier vide
  const basketEmpty = document.querySelector("#basket-contain");
  basketEmpty.innerHTML = `<div class="basketEmpty">Votre panier est vide</div>`;
  console.log("Mon panier : vide");
  const displayContain = document.querySelector("#basket");
  displayContain.style.display = "none"; //N'affiche pas le tableau
} else {
  articleSelected.push(cart);
  console.log(articleSelected);

  for (let jsonCart of cart) {
    articleSelected = new Article(jsonCart); //class Article dans camera.js
    console.log("Article dans panier : ", articleSelected);

    tableBody = document.querySelector("#cart-tbody").innerHTML += `<tr>
    <th class="basketName">${articleSelected.name}</th>
    <th class="basketOptical">${articleSelected.optical}"</th>
    <th class="basketQuantity"><button id="btnMoins">-</button><span id="btnNb">1</span><button id="btnPlus">+</button></th>
    <th class="basketPrice">${articleSelected.price}€</th>

</tr>
    `;
  }
  compteur();
}

/////////////////////////////////bouton plus / moins ///////
function compteur() {
  let btnMoins = document.querySelector("#btnMoins");
  let btnPlus = document.querySelector("#btnPlus");
  let btnNb = document.querySelector("#btnNb");
  let compteur = parseInt(btnNb.innerText);

  btnPlus.addEventListener("click", function () {
    compteur = compteur + 1;
    btnNb.innerHTML = compteur;
  });
  btnMoins.addEventListener("click", function () {
    compteur = compteur - 1;
    btnNb.innerHTML = compteur;
  });
}
