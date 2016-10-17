var distance = require('google-distance-matrix');
var Travelcard = require ('./travelcard').Travelcard;
var Transmethod = require('./transmethod').Transmethod;

// var testingthis = new Travelcard(12, "2", "70 Maujer", 73, -64.2, "455 Broadway", 72, -62);
// console.log(testingthis.startLoc);

distance.key('AIzaSyDmbMZu5BBQ9i3bH5ZJXXMeXnIiAmh9C9c');

var Promise = require('promise');

//returns a transmethod object with one tavel card in the array
var time = function(start, end, mode){
  var stringMode = mode;
  return new Promise(function(resolve, reject){
    var reqTime = 0;
    distance.mode(mode);
    var origins = ['' + start.lat + ', ' + start.lng];
    var destinations = ['' + end.lat + ', ' + end.lng];
    distance.matrix(origins, destinations, function (err, distances) {
        if (!err){
            // console.log(distances.rows[0].elements);
            console.log("Distances!:");
            console.log(distances);
            console.log("Origins!:")
            console.log(origins);
            console.log("Distances!:")
            console.log(distances);
            //constructor(type, time, timeString, startLoc, startLocLat, startLocLng, endLoc, endLocLat, endLocLng)
            var timeResponse = new Travelcard(
              mode,
              distances.rows[0].elements[0].duration.value,
              formatTime(distances.rows[0].elements[0].duration.value),
              distances.origin_addresses[0],
              start.lat,
              start.lng,
              distances.destination_addresses[0],
              end.lat,
              end.lng
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
var citibikeTime = function(start, originLocalStation, end, destinationLocalStation, mode){
  var origins = ['' + start.lat + ', ' + start.lng];
  var destinations = ['' + end.lat + ', ' + end.lng];
  console.log("Origin local station: " + originLocalStation);
  var originLocalStationGoogleFormat = [''+originLocalStation.latitude + ', '+ originLocalStation.longitude];
  var destinationLocalStationGoogleFormat = [''+destinationLocalStation.latitude + ', '+ destinationLocalStation.longitude];
  stringMode = mode;
  return new Promise(function(resolve, reject){
    var reqTime = 0;

    //TODO: Make this recursive with a variable for the mode of transil being attached to the distance calls
    distance.mode('walking');
    distance.matrix(origins, originLocalStationGoogleFormat, function(err, distances){
      if (!err){
          var timeResponse = new Travelcard(
            'walking',
            distances.rows[0].elements[0].duration.value,
            formatTime(distances.rows[0].elements[0].duration.value),
            distances.origin_addresses[0],
            start.lat,
            start.lng,
            distances.destination_addresses[0],
            originLocalStation.latitude,
            originLocalStation.longitude
          )
          var tm = new Transmethod(stringMode, [timeResponse]);
          distance.mode('bicycling');
          distance.matrix(originLocalStationGoogleFormat, destinationLocalStationGoogleFormat, function(err, distances){
            if (!err){
                var timeResponse = new Travelcard(
                  'bicycling',
                  distances.rows[0].elements[0].duration.value,
                  formatTime(distances.rows[0].elements[0].duration.value),
                  distances.origin_addresses[0],
                  originLocalStation.latitude,
                  originLocalStation.longitude,
                  distances.destination_addresses[0],
                  destinationLocalStation.latitude,
                  destinationLocalStation.longitude
                )

                tm.travelCards.push(timeResponse);
                distance.mode('walking');
                distance.matrix(destinationLocalStationGoogleFormat, destinations, function(err, distances){
                  if (!err){
                      var timeResponse = new Travelcard(
                        'walking',
                        distances.rows[0].elements[0].duration.value,
                        formatTime(distances.rows[0].elements[0].duration.value),
                        distances.origin_addresses[0],
                        destinationLocalStation.latitude,
                        destinationLocalStation.longitude,
                        distances.destination_addresses[0],
                        end.lat,
                        end.lng
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
