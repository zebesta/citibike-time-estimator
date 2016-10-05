var express = require('express');
var geo = require('./geocodeAddresses');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
app.get('/', function(req, res) {
    res.sendFile('home.html', {root: __dirname })
});
app.get('/helloworld', function(req,res) {
  var hello = {
    hi: 'Hello World'
  }
  res.json(hello);
});
app.get('/address/:address_string/end/:end_address', function(req,res) {
  var start = req.params.address_string;
  var end = req.params.end_address;
  console.log("Trying to get directions starting: " + start);
  console.log("Trying to get directions ending: " + end);
  function initialize (start, end){
    var locationPromises = [geo(start), geo(end)]
    //convert entered addresses to usable data and print address to user
    Promise.all(locationPromises)
      .then(results=>{
        var startLatLng = results[0].json.results[0].geometry.location;
        console.log("start location is: "+results[0].json.results[0].formatted_address);
        var endLatLng = results[1].json.results[0].geometry.location;
        console.log("end location is: "+results[1].json.results[0].formatted_address);
        calculate(startLatLng, endLatLng);
        console.log("Resolving the JSON in the promises!")
        res.json(results[0]);
      })
      .catch(errs =>{
        console.log("Resolving the JSON in the promises!")

        console.log("ERROR!!!");
        res.json(errs[0]);
      });

  };
  initialize (start, end);
  // var response = {
  //   hi: "hello"
  // }
  // res.json(response);

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
