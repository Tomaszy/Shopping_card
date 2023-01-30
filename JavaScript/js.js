
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


let x = [];


fetch("https://dummyjson.com/products")
.then(response => response.json())
.then(data => { 
  data.products.forEach (product => {
    x.push(product);
  })
});

console.log(x);




function loadJSON(){
  fetch("https://dummyjson.com/products")
  .then(response => response.json())
  .then(data =>{
    
    // localStorage.setItem ('myData', data)
      let html = '';
      

      data.products.forEach(product => {
        var {title, category, description, price, id} = product;  
        html += `
          <div class="product">

          <img src="${product.images[0]}" >
          <p class="product-name">${title}</p>
          <p class="manufacturer">${category}</p>
          <p class="description">${description}</p>
          <p class="line"></p>
          
          <div class="money_box">
          <div class="product-price">  <span>${price}</span>  <span>€</span>  </div>
          <div><span class="total2">1</span></div>
          
          <div> 
          <button class="pl_btn" onclick="changeNumberOfUnits('plus', ${id})">  <img class="pl" src="./assets/plus-solid.svg" alt="">  </button>
          <button class="min_btn" onclick="changeNumberOfUnits('minus', ${id})"> <img class="min" src="./assets/minus-solid.svg" alt=""> </button>
          </div>
          
          <button class="add-to-cart-btn" onclick="addToCart(${id})"> <img class="buy_icon" src="./assets/cart-plus-solid.svg" alt="">  </button>
          </div>
         
          </div>
          
    `;
    
    // onclick="addToCartList()"
  });
      productList.innerHTML = html;
     
    }

    )
    
}
loadJSON();

var cart = [];

// ADD TO CART 
function addToCart(id) {

  // fetch('https://dummyjson.com/products')
  // .then(res => res.json())
  // .then(data => {
    
    if (cart.some((item) => item.id === id)) {
      changeNumberOfUnits("plus", id);
    
    } else {
      // console.log(product);
      const item = x.find((product) => product.id === id);
  
      cart.push({
        ...item, 
        numberOfUnits: 1,
        instock: 5,
      })
    updateCart();
    console.log(item);
    }  }
//   })
// };


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



function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
      let numberOfUnits = item.numberOfUnits;
  
      if (item.id === id) {
        if (action === "minus" && numberOfUnits > 1) {
          numberOfUnits--;
        } else if (action === "plus" && numberOfUnits < item.instock) {
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

  // `${totalNumberInBox1}`.item.innerHTML = totalItems;
  // amoutOfItems.innerHTML += ` $${totalPrice.toFixed(2)}`;
  // amoutOfItems.innerHTML = total2.innerHTML;

}




// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}



