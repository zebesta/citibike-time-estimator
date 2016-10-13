var Travelcard = require ('./travelcard').Travelcard

class Transmethod {
  constructor(title, travelCards) {
    this.title = title,
    this.travelCards = travelCards
  };
}

exports.Transmethod = Transmethod;
