/*
    A simple script to retrieve the JSON from the citibike database by simply returning the json as an object.
    https://feeds.citibikenyc.com/stations/stations.json
*/
var fetch = require('node-fetch');
var Promise = require('promise');
// var stations = require('./stations');

var getstations = function(){
  return fetch("https://feeds.citibikenyc.com/stations/stations.json")
    .then(res=>{
      return res.json();
    })
    .then(json => {
      console.log(json.executionTime);
      return(json);
    })
    .catch(err=>{
      return(err);
    });
}

module.exports = getstations;
