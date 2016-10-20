// var stations = require('./stations.json')
// var getstations = require('./getstations')

var findLocalStation = function (latLng, stationList) {


  localStations = stationList.stationBeanList.filter(filterByProximity);
  localStations.sort(function (a, b) {
    if (measure(a.latitude, a.longitude, latLng.lat, latLng.lng) > measure(b.latitude, b.longitude, latLng.lat, latLng.lng)) {
      return 1;
    }
    if (measure(a.latitude, a.longitude, latLng.lat, latLng.lng) < measure(b.latitude, b.longitude, latLng.lat, latLng.lng)) {
      return -1;
    }
    return 0;
  });

  var localStation = localStations[0];
  console.log("LOCAL STATION IN FIND LOCAL STATION");
  console.log(localStation)
  return localStation;



  function filterByProximity(obj) {
    var roughFourthMile = 400; //rough estimate of .5 miles in meters
    if (measure(obj.latitude, obj.longitude, latLng.lat, latLng.lng ) < roughFourthMile) {
      return true;
    } else {
      return false;
    }
  }
  function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
      var R = 6378.137; // Radius of earth in KM
      var dLat = (lat2 - lat1) * Math.PI / 180;
      var dLon = (lon2 - lon1) * Math.PI / 180;
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      return d * 1000; // meters
  }
}

module.exports = findLocalStation;
