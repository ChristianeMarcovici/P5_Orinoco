cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);
let savePrice = JSON.parse(localStorage.getItem("total price"));
let articleSelected = []; //liste articles
let qtyInCart = [];

let totalPrice = [];
let newPrice = [];
console.log(newPrice);


///////////////////////////////CONTAINER////////////////////////////////////////////////////
function basketContainer(articleSelected) {
  let tableBody = document.querySelector("#cart-tbody"); //affichage dans HTML
  let trTable = document.createElement("tr");
  tableBody.appendChild(trTable);
 

  let thName = document.createElement("th"); //name
  thName.setAttribute("class", "basketName");
  thName.textContent = articleSelected.name;
  trTable.appendChild(thName);

  let thLense = document.createElement("th"); //optique
  thLense.setAttribute("class", "basketOptical");
  thLense.textContent = articleSelected.lense;
  trTable.appendChild(thLense);
  

  let thQty = document.createElement("th"); //quantité
  thQty.setAttribute("class", "basketQty");
 
  trTable.appendChild(thQty);
  let selectQty = document.createElement("select");
  selectQty.setAttribute("id", "qty");
  selectQty.setAttribute("data-id", articleSelected.id);
  thQty.appendChild(selectQty);
 
  let optCart = document.createElement('option');
  optCart.setAttribute("selected", "selected");
  optCart.setAttribute("value", articleSelected.quantity)
  optCart.textContent = articleSelected.quantity;
  selectQty.appendChild(optCart);


  let min = 1;
  let max = 5;
 

  for (let i = min; i <= max; i++) {
    let optQty = document.createElement("option");
   
    optQty.setAttribute("value", [i])
    optQty.value = optQty.textContent = [i] ;
    selectQty.appendChild(optQty);
  }
  
  let trash = document.createElement("button");
  let icon = document.createElement("i");
  trash.appendChild(icon);
  trash.setAttribute("class", "trash");
  trash.setAttribute("data-id", articleSelected.lense);
  icon.setAttribute("class", "fas fa-trash-alt");
  trTable.appendChild(trash);

  let thPrice = document.createElement("th"); //prix
  thPrice.setAttribute("id", "basketPrice");
  thPrice.textContent = articleSelected.price;
  thPrice.setAttribute("value", articleSelected.price);
  trTable.appendChild(thPrice);
}
///////////////////////////////////////////////////////


/////////////////////////////SUPPRIMER ARTICLE////////////////////////////

function remove(cart) {
  let trash = document.querySelectorAll(".trash");
  
  for (let i=0; i < trash.length; i++){
    trash[i].addEventListener("click", function(id){
      id= trash[i].dataset.id;
      console.log(id);
      localStorage.removeItem(id);

    })
  
  }
  /*trash.forEach(button=>{
    let id = button.dataset.id;
    

  
  button.addEventListener("click", function (id) {
      
      localStorage.removeItem(id);
    });

  })*/
  }


//////////////////////////quantite////////////////////////////////////////////////////
function changeQty(cart) {

let eltQty = document.querySelectorAll("#qty");

  for (let i = 0; i < eltQty.length; i++) {
    eltQty[i].addEventListener("change", function (event) {
      event.preventDefault;
     
      let price = eltQty[i].value * articleSelected.price;
      newPrice.push(price)
      getTotalLine(cart)
    });
  }
 
}
/////////////////////////////////////////////////////////////////////////////
function getTotalLine(cart){
  let eltPrice = document.querySelectorAll("#basketPrice");
  for (let i= 0 ; i<eltPrice.length; i++){
    eltPrice[i].textContent = newPrice
  }


}
///////////////////////Calcul///////////////////////////////
function getTotalValue (cart){

for (let i = 0; i < cart.length; i++) {
 let priceCamera = cart[i].price;
  totalPrice.push(priceCamera);
}

console.log("Liste Prix", totalPrice);
const reducer = (accumulator, currentValue) => accumulator + currentValue; //reduce : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
const calculPrice = totalPrice.reduce(reducer, 0); //reduit toutes les valeurs à une valeur
console.log("Prix total:", calculPrice);
const totalContain = document.querySelector("#subtotal");
totalContain.textContent = calculPrice;

}
/////////////////////////////////////////////////////////////////////////////////////
////////////////////Affichage panier dans HTML//////////////////////
function addToBasket (cart){
 
  if (cart != null) {
    articleSelected.push(cart);
    console.log("Caméra dans panier :", articleSelected);
  
    for (let cartList of cart) {
      articleSelected = new Basket(
        cartList.id,
        cartList.name,
        cartList.lense,
        cartList.quantity,
        cartList.price
      ); 
      basketContainer(articleSelected);
    }
  
  changeQty()
  remove(cart)
  getTotalValue(cart);
  
  } else {
    //si panier vide
    const basketEmpty = document.querySelector("#basket-contain");
    basketEmpty.innerHTML = `<div class="basketEmpty">Votre panier est vide</div>`;
    console.log("Mon panier : vide");
    const displayContain = document.querySelector("#basket");
    displayContain.style.display = "none"; //N'affiche pas le tableau
  }
  }
/////////////////////////////////////////////////////////////////////////////////////

addToBasket(cart);


