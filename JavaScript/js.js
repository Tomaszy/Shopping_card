const productList = document.querySelector('.box1');
const productEl = document.querySelector('.product');
const cartTotalValue = document.getElementById('cart-total-value');

const plus_button = document.querySelector('.pl_btn');
const min_button = document.querySelector('.min_btn');
const ul_list = document.querySelector('.cart-list');
const total = document.querySelector('.total');
const buy = document.querySelector('.add-to-cart-btn');
const cartItem = document.querySelector('.cartItem');
const amoutOfItems = document.querySelector(".count1");
const total2 = document.querySelector(".total2");

//PUSCH DATA TO TABLE
// var data1 = [];

fetch("https://dummyjson.com/products")
.then(response => response.json())
.then(data => { 
  localStorage.setItem("products", JSON.stringify(data))
  // data.products.forEach (product => {
  //   data1.push(product);
     
  // })
});
// LOAD (OBJECT) DATA TO PRODUCT VAR
var products = JSON.parse(localStorage.getItem("products"));

console.log(data1);
console.log(products);

//FETCHOWANIE DANYCH 
function loadJSON(){

      products.products.forEach(product => {
        // var {title, category, description, price, id, images} = product;  
      
        productList.innerHTML +=  `
      
          <div class="product">
          <img src="${product.images[0]}" >
          <p class="product-name">${product.title}</p>
          <p class="manufacturer">${product.category}</p>
          <p class="description">${product.description}</p>
          <p class="line"></p>
          
          <div class="money_box">
          <div class="product-price">  <span>${product.price}</span>  <span>€</span>  </div>
          <div><span class="total2">1</span></div>
          
          <div> 
          <button class="pl_btn" onclick="changeNumberOfUnits('plus', ${product.id})">  <img class="pl" src="./assets/plus-solid.svg" alt="">  </button>
          <button class="min_btn" onclick="changeNumberOfUnits('minus', ${product.id})"> <img class="min" src="./assets/minus-solid.svg" alt=""> </button>
          </div>
          
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})"> <img class="buy_icon" src="./assets/cart-plus-solid.svg" alt="">  </button>
          </div>
         
          </div>
          
    `
  })
}
loadJSON();
var cart = [];

// ADD ITEM TO CART (.BOX2)
function addToCart(id) {
    
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    // console.log(product);
    const item = products.products.find((product) => product.id === id);

    cart.push({
      ...item, 
      numberOfUnits: 1,
      
    })
  updateCart();
  console.log(item);
  }  }


//UPDATE CART
function updateCart() {
  renderCartItems(); 
  renderSubtotal();
}

function renderCartItems () {
  cartItem.innerHTML = "";  // clear cart element
  cart.forEach((item) => {
    
     var {images, title, price, id, numberOfUnits} = item; 
     cartItem.innerHTML += `
     <div class='cart-item'>
     <div class='row-img'>
     <img class='rowimg' src=${images[0]}>
     </div>
     <div class="plus_min_btn" >   
    
     <button onclick="changeNumberOfUnits('plus', ${id})">+</button>  
     <div class="number">${numberOfUnits} </div>  
     <button onclick="changeNumberOfUnits('minus', ${id})">-</button>    </div>
    
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
        } else if (action === "plus" && numberOfUnits < item.stock) {
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

// TOTAL PRICE
function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  total.innerHTML = ` $${totalPrice.toFixed(2)}`;
  amoutOfItems.innerHTML +=  totalItems;

  amoutOfItems.innerHTML += `(${totalItems} items): $${totalPrice.toFixed(2)}`;
  amoutOfItems.innerHTML = totalItems;

}
// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}