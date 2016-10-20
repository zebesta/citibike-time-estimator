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
  // return new Promise(function(resolve, reject){
  //   var updated_stations = stations;
  //   if(updated_stations){
  //     console.log("resolving stations promise");
  //   // if(!err){
  //     // var updated_stations = HTTP....
  //     //TODO return the json of the updated stations here
  //     $.get( "ajax/test.html", function( data ) {
  //       $( ".result" ).html( data );
  //       alert( "Load was performed." );
  //       console.log(data);
  //     });
  //     resolve(updated_stations);
  //   }else{
  //     console.log("rejecting stations promise");
  //
  //     reject(err)
  //   }
  //
  // });
}

module.exports = getstations;
