/**
 *  Retrieves JSON data for stations, helmets, and bikes.
 */
//currently loading stations from static JSON from citibike: https://feeds.citibikenyc.com/stations/stations.json
var stations = require('./stations.json')
var distance = require('google-distance-matrix');
distance.key('AIzaSyDmbMZu5BBQ9i3bH5ZJXXMeXnIiAmh9C9c');

var origins = ['70 Maujer, Brooklyn'];
var leonardStId = 3079;
var howardStId = 268;
var destinations = ['455 Broadway, New York'];
var totalTime = 0;

// console.log(citibike);
// console.log(stations);
var leonardStation = stations.stationBeanList.filter(function( obj ) {
  return obj.id == leonardStId;
});
var leonardStationLocation = [''+leonardStation[0].latitude + ', '+ leonardStation[0].longitude];

var howardStation = stations.stationBeanList.filter(function( obj ) {
  return obj.id == howardStId;
});
var howardStationLocation = [''+howardStation[0].latitude + ', '+ howardStation[0].longitude];

distance.mode('walking');
distance.matrix(origins, leonardStationLocation, function (err, distances) {
    if (!err)
        console.log("Firat walk distance: ");
        console.log(distances.rows[0].elements);
        totalTime += distances.rows[0].elements[0].duration.value;
})

distance.mode('bicycling');
distance.matrix(leonardStationLocation, howardStationLocation, function (err, distances) {
    if (!err)
        console.log("First bike distance: ")
        console.log(distances.rows[0].elements);
        totalTime += distances.rows[0].elements[0].duration.value;
})

distance.mode('walking');
distance.matrix(howardStationLocation, destinations, function (err, distances) {
    if (!err)
        console.log("Second bike distance: ")
        console.log(distances.rows[0].elements);
        totalTime += distances.rows[0].elements[0].duration.value;
        console.log("Total time is " + Math.floor(totalTime/60) + " minutes and " +  totalTime%60 + " seconds");
})

// console.log(leonardStation);
