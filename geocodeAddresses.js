var googleMapsClient = require('@google/maps').createClient({
  key: process.env.MAPS_KEY
});
var Promise = require('promise');


//get a google geocoded address from the location string
//TODO localize all of the calls to the google maps API response object here
//could create a geo object to return
var geocode = function(addString){
  return new Promise(function(resolve, reject){
    googleMapsClient.geocode({
      address: addString
    }, function(err, response) {
      if (!err) {
        console.log("why why why");
        console.log(response);
        resolve(response);
      }else{
        reject(err);
      }
    });

  });

}

module.exports = geocode;
