$('#loginUser').click(() => {
  let userLoggedIn = $('#userEmail').val()
  window.localStorage.setItem('userName', userLoggedIn)
  userLoggedIn = window.localStorage.getItem('userName')
  console.log(" user logged in is " + userLoggedIn)
  console.log("loginuserbutton clicked");
  $.post(
    '/users/login',
    {
      email: $('#userEmail').val(),
      password: $('#userPassword').val()
    },
    (data) => {
      if (data.success) {
        alert("user Exists")
        window.location = "/index.html"
      } else {
        alert('Some error occurred')
      }
    }
  )

})
