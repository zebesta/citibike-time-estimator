//currently loading stations from static JSON from citibike: https://feeds.citibikenyc.com/stations/stations.json
// var stations = require('./stations.json')

//libraries --------
//google distance
var distance = require('google-distance-matrix');
distance.key('AIzaSyDmbMZu5BBQ9i3bH5ZJXXMeXnIiAmh9C9c');

//local modules
var time = require('./time');
var geo = require('./geocodeAddresses');
var calculate = require('./calculateDistanceMatrices')
var findLocalStation = require('./find-local-station');
var startAddress;
var startAdressString;
var endAddress;
var endAddressString;


//For some reason, this call to geo is making node hang in the console.... no real issue though.
// geo('70 Maujer, Brooklyn')
//   .then(result=>{
//     // var geoReturn = result[0];
//     // console.log(result)
//     startAddress = result.json.results[0].geometry.location;
//     console.log(startAddress);
//     startAddressString = result.json.results[0].formatted_address;
//     console.log(startAddressString);
//   })
//   .catch(errs =>{
//     console.log("ERROR!!!");
//   });
//
// geo('455 Broadway, New York')
//   .then(result=>{
//     // var geoReturn = result[0];
//     // console.log(result)
//     endAddress = result.json.results[0].geometry.location;
//     console.log(endAddress);
//     endAddressString = result.json.results[0].formatted_address;
//     console.log(endAddressString);
//   })
//   .catch(errs =>{
//     console.log("ERROR!!!");
//   });

var start = '70 Maujer, brooklyn';
var end = '190 E 95th st, new york';
var locationPromises = [geo(start), geo(end)]
//convert entered addresses to usable data and print address to user
Promise.all(locationPromises)
  .then(results=>{
    var startLatLng = results[0].json.results[0].geometry.location;
    console.log("start location is: "+results[0].json.results[0].formatted_address);
    var endLatLng = results[1].json.results[0].geometry.location;
    console.log("end location is: "+results[1].json.results[0].formatted_address);
    // console.log(endLatLng);
    calculate(startLatLng, endLatLng);
  })
  .catch(errs =>{
    console.log("ERROR!!!");
  });
// var origins = ['70 Maujer, Brooklyn'];
// var origins = ['40.710277, -73.9499667'];

// var originLatLng = {
//   "latitude":40.710277,
//   "longitude":-73.947778
// };
// var origins = ['' + originLatLng.latitude + ', ' + originLatLng.longitude];
//
// // var destinations = ['455 Broadway, New York'];
// // var destinations = ['40.7207656, -74.0032934'];
// var destinationLatLng = {
//   "latitude": 40.7207656,
//   "longitude": -74.0032934
// };
// var destinations = ['' + destinationLatLng.latitude + ', ' + destinationLatLng.longitude];
//
//
// // var leonardStId = 3079;
// // var howardStId = 268;
// // var totalTime = 0;
// //
// // var leonardStation = stations.stationBeanList.filter(function( obj ) {
// //   return obj.id == leonardStId;
// // });
// // var leonardStationLocation = [''+leonardStation[0].latitude + ', '+ leonardStation[0].longitude];
// //
// // var howardStation = stations.stationBeanList.filter(function( obj ) {
// //   return obj.id == howardStId;
// // });
// // var howardStationLocation = [''+howardStation[0].latitude + ', '+ howardStation[0].longitude];
//
// var originLocalStation  = findLocalStation(originLatLng);
// var destinationLocalStation = findLocalStation(destinationLatLng);
// var originLocalStationGoogleFormat = [''+originLocalStation.latitude + ', '+ originLocalStation.longitude];
// var destinationLocalStationGoogleFormat = [''+destinationLocalStation.latitude + ', '+ destinationLocalStation.longitude];
//
// //array of promises for citibiking
// var citibikeTimePromises = [
//   time(origins, originLocalStationGoogleFormat, 'walking'), //walk from home to leonard
//   time(originLocalStationGoogleFormat, destinationLocalStationGoogleFormat, 'bicycling'), //bike from leonard to howard
//   time(destinationLocalStationGoogleFormat, destinations, 'walking') //walk from howard to recurse
// ]
// Promise.all(citibikeTimePromises)
//   .then(results=>{
//     var totalTime = results.reduce((a,b)=>{return a+b}, 0);
//     // console.log(totalTime);
//     console.log("Citibiking:")
//     console.log(formatTime(totalTime));
//   })
//   .catch(errs =>{
//     console.log("ERROR!!!");
//   });
//
// function formatTime(time){
//   var timeString = "Total time is: " + Math.floor(time/60) + " minutes and " + time%60 + " seconds ";
//   return timeString;
// };
//
//
// //promises for other modes of transit
// time(origins, destinations, 'driving')
//   .then(result=>{
//     var driveTime = result;
//     console.log("Driving:");
//     console.log(formatTime(driveTime));
//   })
//   .catch(errs => {
//     console.log("ERROR!");
//   });
//
// time(origins, destinations, 'walking')
//   .then(result=>{
//     var driveTime = result;
//     console.log("Walking:");
//     console.log(formatTime(driveTime));
//   })
//   .catch(errs => {
//     console.log("ERROR!");
//   });
//
// // Transit requires a premium key maybe (?)
// // time(origins, destinations, 'transit')
// //   .then(result=>{
// //     var driveTime = result;
// //     console.log("Transit:");
// //     console.log(formatTime(driveTime));
// //   })
// //   .catch(errs => {
// //     console.log("ERROR!");
// //   });
