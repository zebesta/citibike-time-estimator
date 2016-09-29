var geo = require('./geocodeAddresses');
var calculate = require('./calculateDistanceMatrices')



var start = '70 Maujer, brooklyn';
var end = '190 E 95th st, new york';
//calls to geo is making the node console hang... not really an issue?
var locationPromises = [geo(start), geo(end)]
//convert entered addresses to usable data and print address to user
Promise.all(locationPromises)
  .then(results=>{
    var startLatLng = results[0].json.results[0].geometry.location;
    console.log("start location is: "+results[0].json.results[0].formatted_address);
    var endLatLng = results[1].json.results[0].geometry.location;
    console.log("end location is: "+results[1].json.results[0].formatted_address);
    calculate(startLatLng, endLatLng);
  })
  .catch(errs =>{
    console.log("ERROR!!!");
  });
