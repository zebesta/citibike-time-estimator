var geo_node = require('node-geocoder');
var options = {
  provider: 'google',

  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyAmZZ8iz90_r4sZW55eSlikFbwYl8q5VgU', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = geo_node(options);

function initialize_node (start, end){
  // geocoder.geocode(start)
  //   .then(function(res){
  //     console.log(res);
  //   })
  //   .catch(function(err){
  //     console.log(err);
  //   });

  var locationPromises = [geocoder.geocode(start), geocoder.geocode(end)];
  //convert entered addresses to usable data and print address to user
  Promise.all(locationPromises)
    .then(function(results){
      console.log(results);
      var startLat = results[0][0].latitude;
      console.log("start lat is: "+ startLat);
      // var endLatLng = results[1].json.results[0].geometry.location;
      // console.log("end location is: "+results[1].json.results[0].formatted_address);
      // calculate(startLatLng, endLatLng);
    })
    .catch(function(err){
      console.log(err);
    });
}

initialize_node('70 Maujer, Brooklyn', '455 Broadway, New York');
