var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAmZZ8iz90_r4sZW55eSlikFbwYl8q5VgU'
});
var Promise = require('promise');


//get a google geocoded address from the location string
var geocode = function(addString){
  return new Promise(function(resolve, reject){
    googleMapsClient.geocode({
      address: addString
    }, function(err, response) {
      if (!err) {
        resolve(response);
      }else{
        reject(err);
      }
    });

  });

}

module.exports = geocode;
