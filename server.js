var express = require('express');
var geo = require('./geocodeAddresses');
var calculate = require('./calculateDistanceMatrices');
var cors = require('cors')

var app = express();

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(cors());

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
app.get('/', function(req, res) {
  var hello = {
    hi: 'Hello World'
  }
  res.json(hello);
    // res.sendFile('home.html', {root: __dirname })
});
app.get('/helloworld', function(req,res) {
  var hello = {
    hi: 'Hello World'
  }
  res.json(hello);
});

//Get a geocoded version of the starting and ending addresses
app.get('/start/:start_address/end/:end_address', function(req,res) {
  var start = req.params.start_address;
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
        // calculate(startLatLng, endLatLng);
        console.log("Resolving the JSON in the promises!")
        var toReturn = {
          start: results[0].json.results[0].formatted_address,
          end: results[1].json.results[0].formatted_address,
          //need to google format this or somehting
          startLatLng: results[0].json.results[0].geometry.location,
          endLatLng: results[1].json.results[0].geometry.location
        }
        res.json(toReturn);
      })
      .catch(errs =>{
        console.log(" Error while resolving the JSON in the promises!")

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

//Get the time and method requirements for the geocoded data being sent
app.get('/calc/startll/:startll/endll/:endll', function(req,res){
  var startLatLng = JSON.parse(req.params.startll);
  var endLatLng = JSON.parse(req.params.endll);
  console.log(startLatLng);
  console.log(endLatLng);
  calculate(startLatLng, endLatLng)
    .then(result=>{
      console.log(result);
      res.json(result);
    })
    .catch(err=>{
      console.log(err);
      res.json(err);
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
