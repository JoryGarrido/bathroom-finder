function initMap() {
  $(function() {

    queryRequest = $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'http://localhost:3000/bathrooms'
    })

    queryRequest.done(function(data) {
      var bathrooms = data.bathrooms;
      drawMap(bathrooms);
    })
  })
}

// GET COORDINATES FROM THE DOM
var lat = parseFloat(document.getElementById('lat').innerText);
var lng = parseFloat(document.getElementById('lng').innerText);
var zoom = 19;

// INITIALIZE MAP BASED ON CURRENT LOCATION
function drawMap(bathrooms) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: lat,
      lng: lng
    },
    zoom: zoom
  });

  var marker = new google.maps.Marker({
    position: {
      lat: 40.0178,
      lng: -105.282
    },
    map: map,
    title: 'current'
  });

  console.log(bathrooms);

  for (var i = 0; i < bathrooms.length; i++) {
    num = (i + 1).toString();
    console.log(num);
    var marker = new google.maps.Marker({ position: { lat: bathrooms[i].lat, lng: bathrooms[i].lng },
      map: map, title: num, label: num
    });
  }
}
