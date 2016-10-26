var express = require('express');
var geo = require('./geocodeAddresses');
var calculate = require('./calculateDistanceMatrices');
var cors = require('cors')
var Promise = require('promise');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//hello world at room
app.get('/', function(req, res) {
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
        var endLatLng = results[1].json.results[0].geometry.location;

        var toReturn = {
          start: results[0].json.results[0].formatted_address,
          end: results[1].json.results[0].formatted_address,
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
});


//Get a geocoded version of the starting location only
app.get('/start/:start_address', function(req,res) {
  var start = req.params.start_address;
  // var end = req.params.end_address;
  console.log("Trying to get directions starting: " + start);
  function initialize (start){
    geo(start)
      .then(results=>{
        var startLatLng = results.json.results[0].geometry.location;
        console.log("start location is: "+results.json.results[0].formatted_address);
        console.log("Resolving the JSON in the promises!")
        var toReturn = {
          start: results.json.results[0].formatted_address,
          end: null,
          startLatLng: results.json.results[0].geometry.location,
          endLatLng: null
        }
        res.json(toReturn);
      })
      .catch(errs =>{
        console.log(" Error while resolving the JSON in the promises!")
        res.json(errs);
      });

  };
  initialize (start);
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

//Start the server  ---- working with Heroku!
var port = process.env.PORT || 3000;        //set port
app.listen(port);
console.log('Magic happens on port ' + port);
