class Travelcard {
  constructor(type, time, timeString, startLoc, startLocLat, startLocLng, endLoc, endLocLat, endLocLng) {
    this.type = type,
    this.time = time,
    this.timeString = timeString,
    this.startLoc = startLoc,
    this.startLocLat = startLocLat,
    this.startLocLng = startLocLng,
    this.endLoc = endLoc,
    this.endLocLat = endLocLat,
    this.endLocLng = endLocLng,
    this.bikes = 0;
    this.docks = 0;
  };
}

exports.Travelcard = Travelcard;
