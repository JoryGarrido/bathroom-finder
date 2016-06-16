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
        url: 'https://pottyspotter.herokuapp.com/position',
        data: position
      });
    }
  }
})
