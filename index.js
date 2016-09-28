/**
 *  Retrieves JSON data for stations, helmets, and bikes.
 */
//currently loading stations from static JSON from citibike: https://feeds.citibikenyc.com/stations/stations.json
var stations = require('./stations.json')
var distance = require('google-distance-matrix');
distance.key('AIzaSyDmbMZu5BBQ9i3bH5ZJXXMeXnIiAmh9C9c');

var origins = ['70 Maujer, Brooklyn'];
var destinations = ['455 Broadway, New York'];

// console.log(citibike);
// console.log(stations);
var leonardStation = stations.stationBeanList.filter(function( obj ) {
  return obj.id == 3079;
});
var leonardStationLocation = [''+leonardStation[0].latitude + ', '+ leonardStation[0].longitude];
distance.mode('walking');
distance.matrix(origins, leonardStationLocation, function (err, distances) {
    if (!err)
        console.log(distances.rows[0].elements);
})

console.log(leonardStation);
