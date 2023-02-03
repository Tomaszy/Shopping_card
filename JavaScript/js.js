const productList = document.querySelector(".box1");
const total = document.querySelector(".total");
const cartItem = document.querySelector(".cartItem");
const amoutOfItems = document.querySelector(".count1");
const total2 = document.querySelector(".total2");




fetch("https://dummyjson.com/products")
  .then((response) => response.json())
  .then((data) => {
    localStorage.setItem("products", JSON.stringify(data));
    
  });

 

// LOAD (OBJECT) DATA TO PRODUCT VAR
var products = JSON.parse(localStorage.getItem("products"));
console.log(products);

console.log(cart);

//FETCHOWANIE DANYCH
function loadJSON() {
  
  products.products.forEach((product) => {
    
    var { title, category, description, price, id, images, category } = product;

    productList.innerHTML += `
      
          <div class="product" >
          <img src="${images[0]}" class= "img">
          <p class="product-name">${title}</p>
          <p class="category">${category}</p>
          <p class="description">${description}</p>
          <p class="line"></p>
          
          <div class="money_box">
          <div class="product-price">  <span>${price}</span>  <span>€</span>  </div>
          <div>  <input type="number" class="input" id="${id}" value="1" min="0" max="200" step="1" placeholder="Number"/>
          </div>
          
          <div> 
          <button class="pl_btn" id="increment" onclick="pl_Button( ${id})">  <img class="pl" src="./assets/plus-solid.svg" alt="">  </button>
          <button class="min_btn" onclick="min_Button(${id})"> <img class="min" src="./assets/minus-solid.svg" alt=""> </button>
          </div>
          
          <button class="add-to-cart-btn" onclick="addToCart(${id})"> <img class="buy_icon" src="./assets/cart-plus-solid.svg" alt="">  </button>
          </div>
          </div>
          
    `;

  });
 
}



function pl_Button (id){

let input = document.getElementById(id);
let value = input.value;
if (value >= 0) {
  value ++;
}
input.value = value;
}
  
function min_Button (id) {
let input = document.getElementById(id);
let value = input.value;
if (value <= 0 ) {
  console.log("no no no ");
}
else {
  value --;
}
input.value = value;
}



loadJSON();


// ADD ITEM TO CART (.BOX2)
var cart = [];

function addToCart(id) {
  let input = document.getElementById(id);
  let quantity = Number(input.value);


  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    // console.log(product);
    
    const item = products.products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits:quantity
      
      
    });
    console.log(cart);
    updateCart()
    renderManufacturer();
    updateCart()
    
  }
}


//UPDATE CART
function updateCart() {
  renderCartItems();
  renderSubtotal();
  
}



let cart2 = []
function renderManufacturer(){
  
  const manufacturer = cart.map (product => `${product.category}`);
  console.log(product);
  manufacturer.forEach((category)=>{
      (cart2.includes(category))? null:cart2.push(category);
      
  })
}






function renderCartItems() {
  cartItem.innerHTML = ""; // clear cart element

  cart2.forEach((el)=>{
    
    cartItem.innerHTML += `  
    <div>
    <div class="incart">
        <h2 class="category" >${el}</h4>
    </div>
   <div>
   `

  
}) 


  
  cart.forEach((item) => {
    var { images, title, price, id, numberOfUnits, category } = item;
    cartItem.innerHTML += `
     <div class='cart-item' data-filter=${category}>
     <div class='row-img'>
     <img class='rowimg' src="${images[0]}" >
     </div>
     <div class="plus_min_btn" >   
    
     <button class="plButton" onclick="changeNumberOfUnits('plus', ${id})">+</button>  
     <div class="number">${numberOfUnits} </div>  
     <button class="minButton" onclick="changeNumberOfUnits('minus', ${id})">-</button>    </div>
    
     <p style='font-size:12px;'>${title}</p>
     <h2 style='font-size: 15px;'>$ ${price}.00</h2>
     <i class='fa-solid fa-trash' onclick='removeItemFromCart(${id})'></i></div>
`;
  });
}


// + - NUMBER OF ITEMS (BOX2)

function changeNumberOfUnits(action, id) {

  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;
    if (item.id === id) {
     
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;

      } else if (action === "plus" && numberOfUnits < item.stock  ) {
        numberOfUnits++;
      }
    }
   
   
    return {
      ...item,
      numberOfUnits,
    };
    });
     
  updateCart();
}


// TOTAL PRICE (.BOX2)
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  total.innerHTML = ` $${totalPrice.toFixed(2)}`;
  amoutOfItems.innerHTML += totalItems;

  amoutOfItems.innerHTML += `(${totalItems} items): $${totalPrice.toFixed(2)}`;
  amoutOfItems.innerHTML = totalItems;
}


// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}









//FILTER

  const liItem = document.querySelectorAll('.inputs ul li');
  const product = document.querySelectorAll('.cartItem') ;
  const product1 = document.querySelectorAll('.cartItem cart-item') ;

  liItem.forEach(li => {
    li.onclick = function() {
     //active
     liItem.forEach(li => {
         li.className = "";
     })
     li.className = "active";

     //Filter
     const value = li.textContent;
     console.log(value);
   
     product.forEach(product => {
      product.style.display = 'none';
         if (product.getAttribute('data-filter') == value.toLowerCase() || value == "All Menu" ){
          
          
          renderCartItems(product);
          product.style.display = 'block';
          
         } 
     })
    

     product1.forEach(product => {
      
      product.style.display = 'none';
         if (product.getAttribute('data-filter') == value.toLowerCase() || value == "All Menu" ){ 
          renderCartItems(product);
          product.style.display = 'block';
        
         }

     })


    }
    
 });
 







