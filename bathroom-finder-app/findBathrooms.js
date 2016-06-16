require('dotenv').config();
var knex = require('./db/knex');
var request = require('request');

var oLatHi;
var oLatLo;
var oLngHi;
var oLngLo;

function findBathrooms(oLat, oLng, x, resolve) {

  oLat = parseFloat(oLat);
  oLng = parseFloat(oLng);
  oLatHi = oLat + x;
  oLatLo = oLat - x;
  oLngHi = oLng + x;
  oLngLo = oLng - x;

  var mode = "walking";

  // SET COORDINATE RANGE TO SEARCH
  knex('bathrooms').whereBetween('lat', [oLatLo, oLatHi]).andWhereBetween('lng', [oLngLo, oLngHi]).then(function(bathrooms) {

    // IF NOT ENOUGH BATHROOMS, WIDEN RANGE, REPEAT UNTIL THERE ARE ENOUGH BATHROOMS
    if (bathrooms.length < 5) {
      findBathrooms(oLat, oLng, x + 0.1, resolve)
    } else {

      // MAKE A SEARCH STRING OF ALL BATHROOM LAT/LNGS
      var queryLatLngs;
      for (var i = 0; i < bathrooms.length; i++) {
        if (queryLatLngs) {
          queryLatLngs = queryLatLngs + bathrooms[i].lat.toString() + ',';
        } else {
          queryLatLngs = bathrooms[i].lat.toString() + ',';
        }
        if (i < bathrooms.length - 1) {
          queryLatLngs = queryLatLngs + bathrooms[i].lng.toString() + '|';
        } else {
          queryLatLngs = queryLatLngs + bathrooms[i].lng.toString();
        }
      }

      // RUN GOOGLE DISTANCE MATRIX ON EACH BATHROOM
      var ajaxArray = [];
      var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + oLat + ',' + oLng + '&destinations=' + queryLatLngs + '&mode=' + mode + '&language=en-EN&key=' + process.env.GOOGLEMAPS_API_KEY;
      request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {

          // DISTANCE IN METERS
          var result = JSON.parse(body);
          for (var i = 0; i < bathrooms.length; i++) {
            ajaxArray[i] = [];
            ajaxArray[i][0] = bathrooms[i].id;
            // ajaxArray[i] = [];
            // ajaxArray[i][0] = bathrooms[i].id;
            // ajaxArray[i][1] = result.rows[0].elements[i].distance.value;
          }

          // RUN SORTING ALGORITHM
          var idDistance = ajaxArray.sort(function(a, b) {
            return a[1] - b[1];
          })

          // LIMIT TO FIRST 10 BATHROOMS
          // result = idDistance.slice(0,10);
        }
        resolve(idDistance);
      })
    }
  })
}

module.exports = {
  findBathrooms: findBathrooms
}


// KEY:
// d = destination
// o = origin
//   (ie. origin latitude, destination longitude)
// Hi = upper end of range of coordinates
// Lo = lower end of range
