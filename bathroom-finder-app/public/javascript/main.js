document.addEventListener("DOMContentLoaded", function(event) {

  var signin = document.getElementById("signin");
  var signup = document.getElementById("signup");
  var addBathroom = document.getElementById("AddABathroom");
  var title = document.getElementById("title");

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
      addBathroom.style.display = "none";
    });
  }

  for (var i = 0; i < document.getElementsByClassName('addBathroomButton').length; i++) {
    document.getElementsByClassName('addBathroomButton')[i].addEventListener('click', function() {
      addBathroom.style.display = "flex";
    });
  }


  document.getElementById('addBathroomButton').addEventListener('click', function(){
    addBathroom.style.display = "flex";
  });

  var bathroomListRatings = document.getElementsByClassName('starNumber');
  function fuckyou() {
   for (var i = 0; i < bathroomListRatings.length; i++) {
     console.log('for');
     if(bathroomListRatings[i].innerHTML === '1'){
       console.log('if');
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][0].style.display = 'inline-block';
     }
     else if( bathroomListRatings[i].innerHTML === '2'){
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][1].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][0].style.display = 'inline-block';
     }
     else if(bathroomListRatings[i].innerHTML === '3'){
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][2].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][1].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][0].style.display = 'inline-block';
     }
     else if(bathroomListRatings[i].innerHTML === '4'){
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][3].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][2].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][1].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][0].style.display = 'inline-block';
     }
     else if(bathroomListRatings[i].innerHTML === '5'){
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][4].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][3].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][2].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][1].style.display = 'inline-block';
       bathroomListRatings[i]['parentElement']['children'][0]['children'][0]['children'][0].style.display = 'inline-block';
     }
   }
  }
  fuckyou();
  // console.log(bathroomListRatings[0]);
// THIS DOESNT WORK
  // title.addEventListener('click', function(){
  //   window.location = "localhost:3000";
  // });
// ----------------



});

window.fbAsyncInit = function() {
   FB.init({
     appId      : '141550522930397',
     xfbml      : true,
     version    : 'v2.6'
   });
 };

 (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
