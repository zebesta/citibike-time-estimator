var distance = require('google-distance-matrix');
var Promise = require('promise');

distance.key('AIzaSyDmbMZu5BBQ9i3bH5ZJXXMeXnIiAmh9C9c');

var time = function(origins, destinations, mode){
  return new Promise(function(resolve, reject){
    var reqTime = 0;
    distance.mode(mode);
    distance.matrix(origins, destinations, function (err, distances) {
        if (!err){
            console.log("First walk distance: ");
            console.log(distances.rows[0].elements);
            reqTime = distances.rows[0].elements[0].duration.value;
            resolve(reqTime);
        }else{
          reject(err);
        }
    });
  });
}

module.exports = time;
