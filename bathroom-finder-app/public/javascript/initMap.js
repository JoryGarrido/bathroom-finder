function initMap() {
  $(function() {

    queryRequest = $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'http://localhost:3000/bathrooms'
    })

    queryRequest.done(function(data) {
      var bathrooms = data.bathrooms;
      drawMap(data);
    })
  })
}

// INITIALIZE MAP BASED ON CURRENT LOCATION
function drawMap(data) {
  var bathrooms = data.bathrooms;
  var lat = parseFloat(data.lat);
  var lng = parseFloat(data.lng);
  var zoom = 19;

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: lat,
      lng: lng
    },
    zoom: zoom
  });

  var marker = new google.maps.Marker({
    position: {
      lat: lat,
      lng: lng
    },
    map: map,
    title: 'current'
  });

  for (var i = 0; i < bathrooms.length; i++) {
    num = (i + 1).toString();
    var marker = new google.maps.Marker({ position: { lat: bathrooms[i].lat, lng: bathrooms[i].lng },
      map: map, title: num, label: num
    });
  }
}
