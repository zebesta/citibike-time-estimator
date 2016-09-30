
var googleMaps = require('@google/maps').createClient({
  key: 'AIzaSyCe_SUx4Mj0oFMR5J1RtYp7f5ZC7TtdpwE'
});
var Promise = require('promise');


googleMaps.directions({
      origin: 'Town Hall, Sydney, NSW',
      destination: 'Parramatta, NSW',
    })
    .asPromise()
    .then(expectOK)
    .then(function(response) {
      console.log(response);
    })
    .then(done, fail);

var directions = function(addString){
  // Geocode an address.
  return new Promise(function(resolve, reject){
    googleMapsClient.geocode({
      address: addString
    }, function(err, response) {
      if (!err) {
        // console.log(response.json.results[0].geometry.location);
        //return the reponse data
        resolve(response);
      }else{
        reject(err);
      }
    });

  });

}
