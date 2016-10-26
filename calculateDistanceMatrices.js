var time = require('./time').time;
var citibikeTime = require('./time').citibikeTime;
var findLocalStation = require('./find-local-station');
var Travelcard = require ('./travelcard').Travelcard
var getstations = require('./getstations')

var Promise = require('promise');


var calculate = function(start, end){
  return new Promise(function(resolve, reject){
    getstations()
      .then(res=>{
        var stationList = res;
        // console.log(stationList);
        // Promise.all([findLocalStation(start, stationList), findLocalStation(end, stationList)])
        var originLocalStation = findLocalStation(start, stationList);
        // console.log(originLocalStation);
        var destinationLocalStation = findLocalStation(end, stationList);
        // console.log(destinationLocalStation);

        console.log("Find local station promises!");
        // console.log(res);
        var timePromises = [
          //TODO these promises need to return more details objects instead of the number of seconds
          time(start, end, 'walking'),
          time(start, end, 'bicycling'),
          time(start, end, 'driving')
          // citibikeTime(start, originLocalStation, end, destinationLocalStation, 'citibiking')
        ]
        if(originLocalStation && destinationLocalStation){
          timePromises.push(citibikeTime(start, originLocalStation, end, destinationLocalStation, 'citibiking'));
        }
        Promise.all(timePromises)
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



      })
      .catch(err=>{
        return err;
      });



    // var originLocalStation  = findLocalStation(start);
    // var destinationLocalStation = findLocalStation(end);

    // var originLocalStationGoogleFormat = [''+originLocalStation.latitude + ', '+ originLocalStation.longitude];
    // var destinationLocalStationGoogleFormat = [''+destinationLocalStation.latitude + ', '+ destinationLocalStation.longitude];
    // console.log("Google formatted: " + originLocalStationGoogleFormat);
    //array of promises for citibiking
    // var allTimePromises = [];
    // var citibikeTransMethods = new Transmethod("Citibiking")




  });
}

module.exports = calculate;
