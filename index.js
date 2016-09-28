//currently loading stations from static JSON from citibike: https://feeds.citibikenyc.com/stations/stations.json
var stations = require('./stations.json')
var distance = require('google-distance-matrix');
var time = require('./time')
distance.key('AIzaSyDmbMZu5BBQ9i3bH5ZJXXMeXnIiAmh9C9c');

// var origins = ['70 Maujer, Brooklyn'];
var origins = ['40.710277, -73.9499667'];
// var destinations = ['455 Broadway, New York'];
var destinations = ['40.7207656, -74.0032934'];

var leonardStId = 3079;
var howardStId = 268;
var totalTime = 0;

var leonardStation = stations.stationBeanList.filter(function( obj ) {
  return obj.id == leonardStId;
});
var leonardStationLocation = [''+leonardStation[0].latitude + ', '+ leonardStation[0].longitude];

var howardStation = stations.stationBeanList.filter(function( obj ) {
  return obj.id == howardStId;
});
var howardStationLocation = [''+howardStation[0].latitude + ', '+ howardStation[0].longitude];

//array of promises
var timePromises = [
  time(origins, leonardStationLocation, 'walking'), //walk from home to leonard
  time(leonardStationLocation, howardStationLocation, 'bicycling'), //bike from leonard to howard
  time(howardStationLocation, destinations, 'walking') //walk from howard to recurse
]

Promise.all(timePromises)
  .then(results=>{
    var totalTime = results.reduce((a,b)=>{return a+b}, 0);
    console.log(totalTime);
  })
  .catch(errs =>{
    console.log("ERROR!!!");
  });
