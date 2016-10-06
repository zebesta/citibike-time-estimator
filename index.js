// var geo = require('./geocodeAddresses');
// var calculate = require('./calculateDistanceMatrices')
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
//
// askForAddresses();
//
//
//
// function askForAddresses(){
//   var start;
//   var end;
//   var askStartAddress = function(){
//     rl.question('What is your starting address? ', (answer1) => {
//       // TODO: Log the answer in a database
//       console.log('You entered:', answer1);
//       start = answer1;
//       askEndAddress();
//     });
//   }();
//   var askEndAddress = function(){
//     rl.question('What is your ending address? ', (answer2) => {
//       // TODO: Log the answer in a database
//       console.log('You entered:', answer2);
//       end = answer2;
//       initialize(start, end);
//       // r1.close();
//     });
//   }
// }
//
// function initialize (start, end){
//   var locationPromises = [geo(start), geo(end)]
//   //convert entered addresses to usable data and print address to user
//   Promise.all(locationPromises)
//     .then(results=>{
//       var startLatLng = results[0].json.results[0].geometry.location;
//       console.log("start location is: "+results[0].json.results[0].formatted_address);
//       var endLatLng = results[1].json.results[0].geometry.location;
//       console.log("end location is: "+results[1].json.results[0].formatted_address);
//       calculate(startLatLng, endLatLng);
//     })
//     .catch(errs =>{
//       console.log("ERROR!!!");
//     });
//
// }
