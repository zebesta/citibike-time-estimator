var time = require('./time').time;
var citibikeTime = require('./time').citibikeTime;
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
    // var allTimePromises = [];
    // var citibikeTransMethods = new Transmethod("Citibiking")

    var citibikeTimePromises = [
      //TODO these promises need to return more details objects instead of the number of seconds
      time(origins, destinations, 'walking'),
      time(origins, destinations, 'bicycling'),
      time(origins, destinations, 'driving'),
      citibikeTime(origins, originLocalStationGoogleFormat, destinations, destinationLocalStationGoogleFormat, 'citibiking')
      // time(origins, originLocalStationGoogleFormat, 'walking'), //walk from home to leonard
      // time(originLocalStationGoogleFormat, destinationLocalStationGoogleFormat, 'bicycling'), //bike from leonard to howard
      // time(destinationLocalStationGoogleFormat, destinations, 'walking') //walk from howard to recurse
      // citibikeTime(origins, )
    ]
    Promise.all(citibikeTimePromises)
      .then(results=>{

        //TODO make this return an array of transmethods with properly nested travelcard arrays
        var responseObject = results;


        console.log("Response object!:");
        console.log(responseObject);

        resolve(responseObject)
      })
      .catch(errs =>{
        console.log("ERROR!!!");
        reject(errs);
      });

  });


}

module.exports = calculate;
