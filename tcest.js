var Travelcard = require ('./travelcard').Travelcard

var testingthis = new Travelcard("walking", 12, "12 seconds", "70 Maujer", 73, -64.2, "455 Broadway", 72, -62);

console.log(testingthis.startLoc);
testingthis.startLoc = "58 Ten Eyck";
console.log(testingthis.startLoc);

// constructor(time, timeString, startLoc, startLocLat, startLocLng, endLoc, endLocLat, endLocLng) {
//   this.time = time,
//   this.timeString = timeString,
//   this.startLoc = startLoc,
//   this.startLocLat = startLocLat,
//   this.startLocLng = startLocLng,
//   this.endLoc = endLoc,
//   this.endLocLat = endLocLat,
//   this.endLocLng = endLocLng
// };
