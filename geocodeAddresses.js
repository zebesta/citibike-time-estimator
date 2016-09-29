var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyAmZZ8iz90_r4sZW55eSlikFbwYl8q5VgU'
});


var geocode = function(){
  // Geocode an address.
  googleMapsClient.geocode({
    address: '1600 Amphitheatre Parkway, Mountain View, CA'
  }, function(err, response) {
    if (!err) {
      console.log(response.json.results);
    }
  });

}

module.exports = geocode;
