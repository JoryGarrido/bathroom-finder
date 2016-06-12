document.addEventListener("DOMContentLoaded", function(event) {
  console.log(document.getElementsByClassName('xButton')[0]);

  var signin = document.getElementById("signin");
  var signup = document.getElementById("signup");

  document.getElementById("login").addEventListener('click', function(){
    signin.style.display = "flex";
    signup.style.display = "none";
  });

  document.getElementById("signupButton").addEventListener('click', function(){
    signin.style.display = "none";
    signup.style.display = "flex";
  });

  document.getElementById("signinButton").addEventListener('click', function(){
    signup.style.display = "none";
    signin.style.display = "flex";
  });


  for (var i = 0; i < document.getElementsByClassName('xButton').length; i++) {
    document.getElementsByClassName('xButton')[i].addEventListener('click', function() {
      signin.style.display = "none";
      signup.style.display = "none";
    });
  }


});
