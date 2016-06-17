document.addEventListener("DOMContentLoaded", function(event) {

  var signin = document.getElementById("signin");
  var signup = document.getElementById("signup");
  var addBathroom = document.getElementById("AddABathroom");
  var title = document.getElementById("title");

  document.getElementById("login").addEventListener('click', function(){
    window.location = "http://localhost:3000/signin";
  });

  document.getElementById('title').addEventListener('click', function(){
    window.location = "http://localhost:3000";
  });

  document.getElementById("addBathroomButton").addEventListener('click', function(){
    window.location = "http://localhost:3000/addbathroom";
  });

  var bathroomListRatings = document.getElementsByClassName('starNumber');
  function settingStars() {
   for (var i = 0; i < bathroomListRatings.length; i++) {
     if(bathroomListRatings[i].innerHTML === '1'){
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
  settingStars();

  // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
      console.log('statusChangeCallback');
      console.log(response);
      // The response object is returned with a status field that lets the
      // app know the current login status of the person.
      // Full docs on the response object can be found in the documentation
      // for FB.getLoginStatus().
      if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
      } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }

    window.fbAsyncInit = function() {
    FB.init({
      appId      : '141550522930397',
      cookie     : true,  // enable cookies to allow the server to access
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      console.log(response);
      statusChangeCallback(response);
    });

    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=141550522930397";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    // Here we run a very simple test of the Graph API after login is
    // successful.  See statusChangeCallback() for when this call is made.
    function testAPI() {
      console.log(response);
      FB.api('/me', function(response) {
        document.getElementById('status').innerHTML =
          'Thanks for logging in, ' + response.name + '!';
      });

      var link = window.location.href;
      document.getElementById('share').addEventListener('click', function(){
        console.log("asdf");
        FB.ui({
                method: 'share',
                href: link,
              }, function(response){
                  console.log(response);
              }
          );
      });
    }

});
