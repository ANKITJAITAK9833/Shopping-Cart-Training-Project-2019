function refreshList() {

  $.get('/products', (data) => {
    $('#productList').empty()

    for (let product of data) {
      if (product.name) {
        $('#productList').append(
          `<tr>
               <td>${product.name}</td>  <td>${product.price}</td> <td>${product.quantity}</td> <td>${product.vendor}</td> <td><input type='submit' value='X' onclick='deleteIt(${product.id})'></td>
               </tr>`
        )
      }
    }
  }),
    $.get('/vendors', (data) => {
      $('#selectedVendor').empty()
      for (let vendor of data) {
        $('#selectedVendor').append(
          `<option> ${vendor.name} </option>`
        )
      }

    })
}

refreshList()


$('#addProduct').click(() => {

  console.log($('#selectedVendor').val() + "   " + $('#productPrice').val() + " aff " + $('#productName').val() + " aff " + $('#productQuantity').val())

  $.post(
    '/products',
    {
      name: $('#productName').val(),
      price: $('#productPrice').val(),
      quantity: $('#productQuantity').val(),
      vendor: $('#selectedVendor').val()
    },
    (data) => {
      if (data.success) {
        console.log("adddd product to db")
        refreshList()

      } else {
        alert('Some error occurred')
      }
    }
  )
})

function deleteIt(id) {
  $.post('/products/:id',
    {
      id: id
    },
    (data) => {
      if (data.success) {
        refreshList()
      } else {
        alert('Some error occurred')
      }
    }
  )
}






