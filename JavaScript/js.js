// var http = new XMLHttpRequest();
// var url = "./Json/json.json";
// http.open('get', url, true);
// http.send();
// http.onload = function(){
//    if(this.readyState == 4 && this.status == 200){
//       let products = JSON.parse(this.responseText);
//       let output = "";
//       for(let item of products){
//         let imageUrl = "https://picsum.photos/200/300";
//          output += `
//             <div class="product">

//                <img src="${imageUrl}" alt="${item.description}">
//                <p class="title">${item.title}</p>
//                <p class="description">${item.description}</p>
//                <p class="price">
//                   <span>${item.price}</span>
//                   <span>€</span>
//                </p>
//                <p class="cart">Add to cart <i class="bx bx-cart-alt"></i></p>
//             </div>
//          `;
//       }
//       document.querySelector(".box1").innerHTML = output;
//    }
// }
let price_box = document.querySelectorAll(".box2");
let money_box = document.querySelector(".money");
var plus_btn = document.querySelector(".pl_btn");
let minus_btn = document.querySelector(".min_btn");
var all_items = document.querySelector(".total_number_of_items");



//po kliknięciu w + button dodaj +1 do ilości el
// plus_btn.addEventListener("click", function(){
//     // var number = total_number.getAttribute("value");
//     console.log("hello");
// })

// FETCHOWANIE DANYCH DO HTML
fetch("./Json/json.json")
  .then((response) => response.json())

  .then((products) => {
    let placeholder = document.querySelector(".box1");
    let out = "";

    for (let product of products) {
      
      out += `
        <div class="product">
            
                       <img src="${product.img}" >
                       <p class="title">${product.title}</p>
                       <p class="manufacturer">${product.manufacturer}</p>
                       <p class="description">${product.description}</p>
                       
                       <div class="money_box">
                       <div class="price"><span>${product.price}</span> <span>€</span></div>

                       <div class="total_number_of_items">1</div>

                       <div> 

                       <button class="pl_btn">  
                       <img class="pl" src="./assets/plus-solid.svg" alt="">
                       </button>    
                      
                       <button class="min_btn"><img class="min" src="./assets/minus-solid.svg" alt=""></button>
                      
                       </div>
                          
                       
                       <button> <img class="buy_icon" src="./assets/cart-plus-solid.svg" alt="">
                       </button>
                       
                       </div>
        
                       </div>

                        <script>
                       plus_btn.addEventListener("click", function(){
                        var value = all_items.innerHTML = "1"; 
                        console.log("1")})
                        </script>
                 `;
    }

    placeholder.innerHTML = out;

   plus_btn.addEventListener("click", function(){
    var value = all_items.innerHTML = "1"; 
    console.log("1");
   });


  });

  
