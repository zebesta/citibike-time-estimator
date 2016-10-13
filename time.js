var distance = require('google-distance-matrix');
var Travelcard = require ('./travelcard').Travelcard;
var Transmethod = require('./transmethod').Transmethod;

// var testingthis = new Travelcard(12, "2", "70 Maujer", 73, -64.2, "455 Broadway", 72, -62);
// console.log(testingthis.startLoc);

distance.key('AIzaSyDmbMZu5BBQ9i3bH5ZJXXMeXnIiAmh9C9c');

var Promise = require('promise');

//returns a transmethod object with one tavel card in the array
var time = function(origins, destinations, mode){
  var stringMode = mode;
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
              distances.origin_addresses[0],
              70,
              40,
              distances.destination_addresses[0],
              70,
              40
            );
            var tm = new Transmethod(stringMode, [timeResponse]);
            console.log("PRINTING TM!!!");
            console.log(tm);
            resolve(tm);
        }else{
          reject(err);
        }
    });
  });
}

//returns a transmethod object with 3 travel cards in the array, walking, biking, and walking
var citibikeTime = function(origins, originStation, destinations, destinationStation, mode){
  stringMode = mode;
  return new Promise(function(resolve, reject){
    var reqTime = 0;
    // distance.mode(mode);
    var walk1 = distance;
    var bike = distance;
    var walk2 = distance;
    walk1.mode('walking');
    walk1.matrix(origins, originStation, function(err, distances){
      if (!err){
          var timeResponse = new Travelcard(
            'walking',
            distances.rows[0].elements[0].duration.value,
            formatTime(distances.rows[0].elements[0].duration.value),
            distances.origin_addresses[0],
            70,
            40,
            distances.destination_addresses[0],
            70,
            40
          )
          var tm = new Transmethod(stringMode, [timeResponse]);
          bike.mode('bicycling');
          bike.matrix(originStation, destinationStation, function(err, distances){
            if (!err){
                var timeResponse = new Travelcard(
                  'bicycling',
                  distances.rows[0].elements[0].duration.value,
                  formatTime(distances.rows[0].elements[0].duration.value),
                  distances.origin_addresses[0],
                  70,
                  40,
                  distances.destination_addresses[0],
                  70,
                  40
                )

                tm.travelCards.push(timeResponse);
                walk2.mode('walking');
                walk2.matrix(destinationStation, destinations, function(err, distances){
                  if (!err){
                      var timeResponse = new Travelcard(
                        'walking',
                        distances.rows[0].elements[0].duration.value,
                        formatTime(distances.rows[0].elements[0].duration.value),
                        distances.origin_addresses[0],
                        70,
                        40,
                        distances.destination_addresses[0],
                        70,
                        40
                      )

                      tm.travelCards.push(timeResponse);

                      resolve(tm);
                  }else{
                    reject(err);
                  }
                });

                // resolve(tm);
            }else{
              reject(err);
            }
          });

          // resolve(tm);
      }else{
        reject(err);
      }
    });
    // distance.matrix(origins, destinations, function (err, distances) {
    //     if (!err){
    //         // console.log(distances.rows[0].elements);
    //         console.log("Distances!:");
    //         console.log(distances);
    //         //constructor(type, time, timeString, startLoc, startLocLat, startLocLng, endLoc, endLocLat, endLocLng)
    //         var timeResponse = new Travelcard(
    //           mode,
    //           distances.rows[0].elements[0].duration.value,
    //           formatTime(distances.rows[0].elements[0].duration.value),
    //           distances.origin_addresses[0],
    //           70,
    //           40,
    //           distances.destination_addresses[0],
    //           70,
    //           40
    //         )
    //
    //         resolve(timeResponse);
    //     }else{
    //       reject(err);
    //     }
    // });
  });
}
function formatTime(time){
  var hours = Math.floor(time/60/60);
  var minutes = Math.floor((time/60)%60);
  var seconds = time%60;
  var timeString = "Total time is " + Math.floor(time/60) + " minutes and " + time%60 + " seconds";
  if(hours){
    timeString = "Total time is " + hours + " hours, " + minutes + " minutes and " + seconds + " seconds";
  }
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

// module.exports = time;
module.exports = {
    time,
    citibikeTime
}
