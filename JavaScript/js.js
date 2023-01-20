
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



fetch("./Json/json.json")
.then( response =>  response.json()
)

.then((products) => {
    let placeholder  = document.querySelector(".box1");
    let out  = "";
    const imgUrl = "https://picsum.photos/200";
    for(let product  of products){
        out  += `
        <div class="product">
            
                       <img src=${imgUrl} >
                       <p class="title">${product.title}</p>
                       <p class="description">${product.description}</p>
                       <p class="price">
                          <span>${product.price}</span>
                          <span>€</span>
                       </p>
                       <p class="cart">Add to cart <i class="bx bx-cart-alt"></i></p>
        
                       <div class="money_box">
                       <p>1</p>
                       <p>2</p>
                       <p>3</p>
                       <p>4</p>
                       

                       </div>
        
                       </div>

        
                 `;
    }
 
    placeholder.innerHTML  = out;
});

