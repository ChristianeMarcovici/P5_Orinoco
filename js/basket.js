const  basketContent = localStorage.getItem("cart");
const cart = JSON.parse(basketContent);


let articleSelected = []; //liste articles

///////////////////////////////CONTAINER////////////////////////////////////////////////////
function basketContainer (articleSelected){
  let tableBody = document.querySelector("#cart-tbody"); //affichage dans HTML
  let trTable = document.createElement("tr");
  tableBody.appendChild(trTable);

  let thName = document.createElement("th");//name
  thName.setAttribute("class", "basketName");
  thName.textContent = articleSelected.name;
  trTable.appendChild(thName);

  let thLense = document.createElement("th");//optique
  thLense.setAttribute("class", "basketOptical");
  thLense.textContent = articleSelected.optical;
  trTable.appendChild(thLense);

  let thQty = document.createElement("th");//quantité
  thQty.setAttribute("class", "basketQty");
  trTable.appendChild(thQty);
  let selectQty = document.createElement("select");
  selectQty.setAttribute("class", "selectQty");
  thQty.appendChild(selectQty);
  let optionQty = document.createElement("option");
  selectQty.appendChild(optionQty);
  optionQty.textContent = articleSelected.quantity;
  optionQty.setAttribute("value", articleSelected.quantity)
  let optionQty2 = document.createElement("option");
  selectQty.appendChild(optionQty2);
  optionQty2.textContent = 2 ;
  optionQty2.setAttribute("value", "2")

  let trash = document.createElement("button");
  let icon = document.createElement("i");
  trash.appendChild(icon);
  trash.setAttribute("class", "trash")
  icon.setAttribute("class", "fas fa-trash-alt" );
  trTable.appendChild(trash);


  let thPrice = document.createElement("th");//prix
  thPrice.setAttribute("class", "basketPrice");
  thPrice.textContent = articleSelected.price ;
  thPrice.setAttribute("value", articleSelected.price )
  trTable.appendChild(thPrice);
 

}
////////////////////Affichage panier dans HTML//////////////////////

if (cart != null ) {
  articleSelected.push(cart);
  console.log(articleSelected);

  for (let cartList of cart) {
    articleSelected = new Article(cartList); //class Article dans camera.js
basketContainer(articleSelected);
  }

  ///////////////////////Calcul///////////////////////////////
let totalPrice = [];
for (let i =0 ; i<cart.length; i++){
  let priceCamera = cart[i].price
  totalPrice.push(priceCamera)
 
}
console.log(totalPrice)
const reducer = (accumulator, currentValue)=> accumulator + currentValue ;//reduce : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
const calculPrice = totalPrice.reduce(reducer, 0);//reduit toutes les valeurs à une valeur
console.log(calculPrice)
const totalContain = document.querySelector("#subtotal");
totalContain.textContent = calculPrice;


changeQty()

remove();

} else {
  //si panier vide
  const basketEmpty = document.querySelector("#basket-contain");
  basketEmpty.innerHTML = `<div class="basketEmpty">Votre panier est vide</div>`;
  console.log("Mon panier : vide");
  const displayContain = document.querySelector("#basket");
  displayContain.style.display = "none"; //N'affiche pas le tableau
}

/////////////////////////////SUPPRIMER ARTICLE////////////////////////////

function remove(){
  let trash = document.querySelectorAll(".trash" );
  console.log(trash);
  for (let i = 0; i < trash.length; i++){
    trash[i].addEventListener("click", function(event){
      event.preventDefault;
      let idTrash = cart[i].id ;
      console.log(idTrash); 
      localStorage.removeItem(idTrash)
    })
  }
  
  }


//////////////////////////quantite////////////////////////////////////////////////////
function changeQty(){
let select = document.querySelectorAll(".selectQty");

for (let i=0;i < select.length; i++){
  select[i].addEventListener("change", function(event){
    event.preventDefault;
  let newPrice =   select[i].value * articleSelected.price;
  console.log(newPrice);
  articleSelected.quantity = select[i].value;
  articleSelected.price = newPrice;
  })
}
}
