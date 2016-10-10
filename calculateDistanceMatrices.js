var time = require('./time');
var findLocalStation = require('./find-local-station');
var Travelcard = require ('./travelcard').Travelcard

var Promise = require('promise');


var calculate = function(start, end){
  return new Promise(function(resolve, reject){
    var origins = ['' + start.lat + ', ' + start.lng];
    var destinations = ['' + end.lat + ', ' + end.lng];
    console.log("origins: " + origins);


    var originLocalStation  = findLocalStation(start);
    var destinationLocalStation = findLocalStation(end);

    var originLocalStationGoogleFormat = [''+originLocalStation.latitude + ', '+ originLocalStation.longitude];
    var destinationLocalStationGoogleFormat = [''+destinationLocalStation.latitude + ', '+ destinationLocalStation.longitude];
    console.log("Google formatted: " + originLocalStationGoogleFormat);
    //array of promises for citibiking
    var citibikeTimePromises = [
      //TODO these promises need to return more details objects instead of the number of seconds
      time(origins, destinations, 'walking'),
      time(origins, destinations, 'bicycling'),
      time(origins, destinations, 'driving'),
      time(origins, originLocalStationGoogleFormat, 'walking'), //walk from home to leonard
      time(originLocalStationGoogleFormat, destinationLocalStationGoogleFormat, 'bicycling'), //bike from leonard to howard
      time(destinationLocalStationGoogleFormat, destinations, 'walking') //walk from howard to recurse
    ]
    Promise.all(citibikeTimePromises)
      .then(results=>{


        var responseObject = results;
        console.log("Response object!:");
        console.log(responseObject);

        resolve(responseObject)
      })
      .catch(errs =>{
        console.log("ERROR!!!");
        // reject("Errorororororor!");
        reject(errs);
      });

    function formatTime(time){
      var timeString = "Total time is " + Math.floor(time/60) + " minutes and " + time%60 + " seconds ";
      return timeString;
    };

  });
  // console.log("inside calculate distance matrices!")
  // console.log(start);
  // console.log(end);
  //convert to the way google wants it
  // var origins = ['' + start.lat + ', ' + start.lng];
  // var destinations = ['' + end.lat + ', ' + end.lng];
  //
  //
  // var originLocalStation  = findLocalStation(start);
  // var destinationLocalStation = findLocalStation(end);
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

// //-----------------------------------------
// //promises for other modes of transit
//   time(origins, destinations, 'driving')
//     .then(result=>{
//       var driveTime = result;
//       console.log("Driving:");
//       console.log(formatTime(driveTime));
//     })
//     .catch(errs => {
//       console.log("ERROR!");
//     });
//
//   time(origins, destinations, 'walking')
//     .then(result=>{
//       var driveTime = result;
//       console.log("Walking:");
//       console.log(formatTime(driveTime));
//     })
//     .catch(errs => {
//       console.log("ERROR!");
//     });
//   time(origins, destinations, 'bicycling')
//     .then(result=>{
//       var driveTime = result;
//       console.log("Biking:");
//       console.log(formatTime(driveTime));
//     })
//     .catch(errs => {
//       console.log("ERROR!");
//     });
//
//     //'transit' requires different key?!

}

module.exports = calculate;
