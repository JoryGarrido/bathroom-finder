// GET COORDINATES FROM THE DOM
var lat = parseFloat(document.getElementById('lat').innerText);
var lng = parseFloat(document.getElementById('lng').innerText);
var zoom = 19;

// INITIALIZE MAP BASED ON CURRENT LOCATION
function initMap() {
  var map;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lat, lng: lng},
    zoom: zoom
  });
}
