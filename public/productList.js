
function createCard(item) {
  return $(`
<div class="col-sm-4" style=" margin-bottom: 28px ;">
<div class="card text-center" style=" box-shadow: 1px 1px 3px #888; border: 1px solid gray; vpadding: 10px;" >
<div class="center" >
</div>
<div class="card-body">
<h5 class="card-title" style="color:black;">${item.name}</h5>
<p class="card-text" style="color:black;"><b>Rs. ${item.price}</b></p>

<div class="text-center">
<button class="btn btn-dark btn-lg btn-block " onclick='addToCart(${item.id})' id="${item.id}">+</button> 
</div>
</div>
</div>
</div>`
  )


}




function refreshList() {
  console.log('running refreshList products fetching')
  $.get('/products', (data) => {
    console.log(data);
    let productList = $('#productList')
    productList.empty()
    for (let product of data) {
      productList.append(createCard(product));
    }
   })
}
refreshList()
function addToCart(productId) {
  console.log("runing js of addt cart func" + productId)
  let userEmail = window.localStorage.getItem('userName')
  $.post('/carts',
    {
      productId: productId,
      userEmail: userEmail
    }),
    (data) => {
      if (data.success) {
        window.alert("ITEM ADDED TO YOUR CART")
        refreshList()
      } else {
        alert('Some error occurred')
      }
    }
}