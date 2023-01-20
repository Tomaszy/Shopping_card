
let price_box = document.querySelectorAll(".box2");
let money_box = document.querySelector(".money");
var plus_btn = document.querySelector(".pl_btn");
let minus_btn = document.querySelector(".min_btn");
var all_items = document.querySelector(".total_number_of_items");


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


    plus_btn.addEventListener("click", () => { console.log("1")});
        
       
  });


