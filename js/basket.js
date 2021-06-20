

let basketContent = localStorage.getItem("basket14");
console.log("Mon panier : ", basketContent);





if (basketContent === null){
    const basketEmpty = document.querySelector("#basket");
    basketEmpty.innerHTML += `<div>Panier vide</div>`;
}else{
    let tableBody = [];
    let cartBody = [];
   
    for (let j=0; j<localStorage.length; j++){
        console.log(localStorage)
        cartBody.push(localStorage);
        console.log(cartBody)
 
    tableBody = document.querySelector("#cart-tbody") .innerHTML += `<tr>
    <th class="article">$</th>
    <th class="optique">ff</th>
    <th class="quantite"><button id="btnMoins">-</button><span id="btnNb">1</span><button id="btnPlus">+</button></th>
    <th class="prix">ff</th>

</tr>
    `
    
    } 
}
let btnMoins = document.getElementById("btnMoins");
let btnPlus = document.getElementById("btnPlus");
let btnNb = document.getElementById("btnNb");
let compteur = parseInt(btnNb.innerText);
btnPlus.addEventListener("click", function(){
    compteur = compteur +1;
  btnNb.innerHTML = compteur;
})
btnMoins.addEventListener("click", function(){
    compteur = compteur -1;
  btnNb.innerHTML = compteur;
})
   



    

    