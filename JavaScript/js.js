const productList = document.querySelector(".box1");
const total = document.querySelector(".total");
const cartItem = document.querySelector(".cartItem");
const amoutOfItems = document.querySelector(".count1");
const total2 = document.querySelector(".total2");



async function fetchProducts () {

  const response = await fetch("https://dummyjson.com/products");
      return  await response.json()
}
// LOAD (OBJECT) DATA TO PRODUCT VAR
// const products = JSON.parse(localStorage.getItem("products"));

// console.log(products);
// console.log(cart);


//FETCHOWANIE DANYCH
async function loadJSON() {
  const products = await fetchProducts()
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
  input.value = value;
}

}
  
function min_Button (id) {
let input = document.getElementById(id);
let value = input.value;
if (value <= 0 ) {
  console.log("no no no ");
}
else {
  value --;
  input.value = value;
}
}



loadJSON();


// ADD ITEM TO CART (.BOX2)
var cart = [];

async function addToCart(id) {
  let input = document.getElementById(id);
  let quantity = Number(input.value);
  const products = await fetchProducts()

  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    // console.log(product);
    
    const item = products.products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits:quantity
      
      
    });
    groupCart()
    renderManufacturer()
    updateCart()
    
  }
}


//UPDATE CART
function updateCart() {
  groupCart()
 
  renderCartItems()
  renderSubtotal()
 
}




function renderManufacturer(){
  // const values = groupCart()

  // const category = values.map (product => `${product.category}`);
  // values.forEach((category)=>{
  //     (values.includes(category)) ? renderCartItems() : null;
      
  // })
}

function renderCartItems() {
  cartItem.innerHTML = ""; // clear cart element
  const values = groupCart()
  console.log(values);
 

  cart.forEach((item) => {

    var { images, title, price, id, numberOfUnits, category } = item;
     
    cartItem.innerHTML += `
    <div data-filter=${category}> ${category}
     <div class='cart-item' >
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
`
  })
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






 function groupCart() {
  // const products = fetchProducts()
  const categories = new Set();
  cart.forEach((product) => {
    // console.log("product:");
    categories.add(product.category);
  });
  const result = [];
  Array.from(categories.values()).forEach((category) => {
    const categoryObject = {
      category,
      products: []
    };
    const filteredProducts = cart.filter((product) => {
      return product.category === category;
    });
    categoryObject.products = filteredProducts;
    result.push(categoryObject);
  });
  
  return result;
}


