// modalEdad
function guardarEdad(){
  const edad = $('#validar-edad').val();
  if(edad.trim() != ""){
    localStorage.setItem("edad",edad);
    validarEdad(edad)
  }
}
function validarEdad(edad){
  if (edad >= 18){
    $('#modal-c').remove()
  } else {
    $('#insertModal').append(`<div class="modal-menor">
      <div class="modal-2">Vuelve Cuando Seas Mayor De Edad!<button class="cerrarModal" id="cerrarModal" onclick="cerrarModal()">X</button></div>
      </div>
    `)
  }
}

function cerrarModal(){
  $('#insertModal').hide();
}
// modalEdadFin

//productos//
for (const producto of productos){
  $(' #sub-contenedor').append(`<div class="tipsB">
                                <img src="${producto.imagen}" class="img-bebidas">
                                    <div class="descripcion">
                                        <div class="product-name"><p>${producto.nombre}</p></div>
                                        <div class="precio">$${producto.precio}</div>
                                            <div class="shopBtn"><button class="shop" id="btn${producto.id}">Agregar al carrito</button></div>
                                      </div>
                                </div>`);                                                                              
}
//productos//

// agregar productos


const agregarAlCarrito = document.querySelectorAll('.shop');
agregarAlCarrito.forEach(agregarProducto => {
  agregarProducto.addEventListener('click', clickAddCarrito);
});




const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');
  

function clickAddCarrito(event){
  const boton = event.target;
  const item = boton.closest('.tipsB');
  
  const itemTittle = item.querySelector('.product-name').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImage = item.querySelector('.img-bebidas').src;

addItemShopCart(itemTittle, itemPrice, itemImage);
}
function addItemShopCart(itemTittle, itemPrice, itemImage){
  const elementsTittle = shoppingCartItemsContainer.getElementsByClassName('shoppingCartItemTitle');
  for(let i = 0; i < elementsTittle.length; i++){
    if (elementsTittle[i].innerText === itemTittle){
    let elementQuantity = elementsTittle[i].parentElement.parentElement.parentElement.querySelector('.shoppingCartItemQuantity');
    elementQuantity.value++;
    actualizarTotal ()
    return;
    }
  }

  const shopCartRow = document.createElement('div');
  const shoppingCartContent = `
  <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${itemImage} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTittle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity" id="shoppingCartItemQuantity" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    shopCartRow.innerHTML = shoppingCartContent;
    shoppingCartItemsContainer.append(shopCartRow);
    shopCartRow.querySelector('.buttonDelete').addEventListener('click', removeItemShop);
    shopCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);
    actualizarTotal()
}
// actualizar precio inicio
function actualizarTotal (){
  let total = 0;
  const shoppingCartTotal = document.querySelector('.shoppingCartTotal');
  const shoppingCartItems = document.querySelectorAll('.shoppingCartItem'); 
  
  shoppingCartItems.forEach(shoppingCartItem =>{
    const shoppingCartPrice = shoppingCartItem.querySelector('.shoppingCartItemPrice');
    const shoppCartItemPrice = Number(shoppingCartPrice.textContent.replace('$', ''));
    const shoppingCartCantidad = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
    const shoppingCartQuantity = Number(shoppingCartCantidad.value);
      total = total + shoppCartItemPrice * shoppingCartQuantity;
  });
  shoppingCartTotal.innerHTML = `${total.toFixed(2)}$`;
}
// actualizar precio fin

// eliminar item inicio
function removeItemShop(event){
  const buttonClicked = event.target;
  buttonClicked.closest('.shoppingCartItem').remove();
  actualizarTotal()
}
// eliminar item fin
// agregar item inicio
  function quantityChanged(event){
    const input = event.target;
    if (input.value <= 0 ){
      input.value = 1;
    }
    actualizarTotal()
  }
// agregar item fin

//formulario para finalizar pedido//
$('#finalizar').append(`<input type="text" placeholder="Nombre y Apellido" id="nombre" class="nombre">
                        <input type="text" placeholder="Email" id="mail">
                        <input type="text" placeholder="Telefono" id="telefono">
                        <div class="btnFinPedido"><button class="btn btn-success ml-auto comprarButton" type="button" data-toggle="modal"
                        data-target="#comprarModal" id="btnFinPedido">Finalizar Pedido</button></div>`);
         
                                                       
//formulario para finalizar pedido//

$(document).ready(() =>{
  

  $.ajax({
    type:"GET",
    url:"./js/data.json",
    success: function (response){
      let {productos} = response
      console.log(productos);
    }

  })
})
