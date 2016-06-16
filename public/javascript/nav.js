$(function() {
  var browserSupportFlag;
  var position = {};
  if (navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      sendPos(position);
    })

    function sendPos(position) {
      console.log("geo fired");
      $.ajax({
        type: "POST",
        // WHEN PUSHING TO HEROKU USE THIS:
        // url: 'https://pottyspotter.herokuapp.com/position',
        // ELSE USE THIS:
        url: 'http://localhost:3000/position',
        data: position
      });
    }
  }
})
