
function createCard(item) {
    return  $(`
<div class="col-sm-4" style=" margin-bottom: 28px ;">
<div class="card text-center" style=" box-shadow: 1px 1px 3px #888; border: 1px solid gray; vpadding: 10px;" >
<div class="center" >
</div>
<div class="card-body">
<h5 class="card-title" style="color:black;">${item.product.name}</h5>
<p class="card-text" style="color:black;"><b>Rs. ${item.product.price}</b></p>

<div class="text-center">
<button class="btn btn-dark btn-lg btn-block " onclick='removeFromCart(${item.product.id})' id="${item.product.id}">X</button> 
</div>
</div>
</div>
</div>`
    )


}
function refreshList() {
    console.log('running refreshList products fetching')
    const loggedInUser = window.localStorage.getItem('username');

    $.get(`/carts/${loggedInUser}`, (data) => {
        $('#userCart').empty()
        $('#totalBill').empty()
        console.log(!Object.keys(data).length + "data of refresh ist cart");
        let total = 0;
        let flag = false;
        if (Object.keys(data).length) {
            let productList = $('#productList')
            productList.empty()
            for (let item of data) {

                if (item.productId) {
                    productList.append(createCard(item));
                    total = total + item.product.price * item.quantity;

                    // $('#userCart').append(
                    //     `<tr><td>${item.product.name}</td>  <td>${item.product.price}</td>  <td><input type='submit' value='X' onclick='removeFromCart(${item.product.id})'></td></tr>`
                    // )
                } else {
                    flag = true
                }
            }
            if (flag) {
                $.post('/carts/deleteNull', {

                }).then((data) => {
                    if (data.success) {
                        refreshList()
                    } else {
                        alert('Some error occurred')
                    }
                })
            }
            $('#totalBill').append(`<span>${total}<span>`)

        }
        else {
            $('#userCart').append(
                `<div><p>YOUR CART IS EMPTY</p></div>`
            )

            $('#totalBill').append(`<span>${0}<span>`)
        }
    })
}
refreshList()
function removeFromCart(id) {
    let useremail = window.localStorage.getItem('username')
    console.log(id + " from remove from cart")
    $.post('/carts/delete',
        {
            productId: id,
            userEmail: useremail
        }).then((data) => {
            if (data.success) {
                refreshList()
            } else {
                alert('Some error occurred')
            }
        })
}





