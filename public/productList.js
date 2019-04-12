
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
    // $('#productList').empty()
    console.log(data);
    let productList = $('#productList')
    productList.empty()
    for (let product of data) {

      productList.append(createCard(product));
      // $('#productList').append(
      //   `<tr>
      //          <td>${product.name}</td>  <td>${product.price}</td> <td>${product.vendor}</td>  <td><input type='submit' value='+' onclick='addToCart(${product.id})'></td>
      //          </tr>`
      // )

    }

  })
}
refreshList()
function addToCart(productId) {
  console.log("runing js of addt cart func" + productId)
  let useremail = window.localStorage.getItem('username')
  $.post('/carts',
    {
      productId: productId,
      userEmail: useremail
    }),
    (data) => {
      if (data.success) {
        refreshList()
      } else {
        alert('Some error occurred')
      }
    }
}