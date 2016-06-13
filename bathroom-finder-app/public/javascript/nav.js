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
      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/position',
        data: position
      });
    }
  }
})
