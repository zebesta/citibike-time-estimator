var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAmZZ8iz90_r4sZW55eSlikFbwYl8q5VgU'
});


var geocode = function(addString){
  // Geocode an address.
  return new Promise(function(resolve, reject){
    googleMapsClient.geocode({
      address: addString
    }, function(err, response) {
      if (!err) {
        // console.log(response.json.results[0].geometry.location);
        //return the lat and long
        resolve(response.json.results[0].geometry.location);
      }else{
        reject(err);
      }
    });

  })

}

module.exports = geocode;
