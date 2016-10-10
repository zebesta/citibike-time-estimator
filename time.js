var distance = require('google-distance-matrix');
var Travelcard = require ('./travelcard').Travelcard

// var testingthis = new Travelcard(12, "2", "70 Maujer", 73, -64.2, "455 Broadway", 72, -62);
// console.log(testingthis.startLoc);

distance.key('AIzaSyDmbMZu5BBQ9i3bH5ZJXXMeXnIiAmh9C9c');

var Promise = require('promise');

var time = function(origins, destinations, mode){
  return new Promise(function(resolve, reject){
    var reqTime = 0;
    distance.mode(mode);
    distance.matrix(origins, destinations, function (err, distances) {
        if (!err){
            // console.log(distances.rows[0].elements);
            console.log("Distances!:");
            console.log(distances);
            //constructor(type, time, timeString, startLoc, startLocLat, startLocLng, endLoc, endLocLat, endLocLng)
            var timeResponse = new Travelcard(
              mode,
              distances.rows[0].elements[0].duration.value,
              formatTime(distances.rows[0].elements[0].duration.value),
              distances.destination_addresses[0],
              70,
              40,
              distances.origin_addresses[0],
              70,
              40
            )
            console.log("TIME RESPONSE:");
            console.log(timeResponse);
            // reqTime = distances.rows[0].elements[0].duration.value;
            //TODO this resolve needs to return an object with some more detail, not just time
            // resolve(reqTime);
            resolve(timeResponse);
        }else{
          reject(err);
        }
    });
  });
}
function formatTime(time){
  var timeString = "Total time is " + Math.floor(time/60) + " minutes and " + time%60 + " seconds ";
  return timeString;
};
// class Travelcard {
//   constructor(time, timeString, startLoc, startLocLat, startLocLng, endLoc, endLocLat, endLocLng) {
//     this.time = time,
//     this.timeString = timeString,
//     this.startLoc = startLoc,
//     this.startLocLat = startLocLat,
//     this.startLocLng = startLocLng,
//     this.endLoc = endLoc,
//     this.endLocLat = endLocLat,
//     this.endLocLng = endLocLng
//   }
// }

module.exports = time;
