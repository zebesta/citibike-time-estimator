/*
    A simple script to retrieve the JSON from the citibike database by simply returning the json as an object.
*/
var Promise = require('promise');
var stations = require('./stations');

var get_stations = function(){
  return new Promise(function(resolve, reject){
    var updated_stations = stations;
    if(updated_stations){
    // if(!err){
      // var updated_stations = HTTP....
      //TODO return the json of the updated stations here
      resolve(updated_stations);
    }else{
      reject(err)
    }

  });
}

get_stations()
  .then(result=>{
    console.log(result);
  })
  .catch(err=>{
    console.log(err);
  });

module.exports = get_stations;
