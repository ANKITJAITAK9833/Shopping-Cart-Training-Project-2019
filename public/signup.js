$('#addUser').click(() => {
  console.log("adduserbutton clicked")
    $.post(
      '/users',
      {
        name: $('#userName').val(),
        email:$('#userEmail').val(),
        password:$('#userPassword').val()
      
      },
      (data) => {
               if (data.success) {
                          alert("adddd user to db")
                          window.location="/productList.html"
                    }else {
                           alert('Some error occurred')
                          }
                }
    )
    })
   