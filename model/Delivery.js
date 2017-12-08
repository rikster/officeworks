"use strict";

var faker = require("faker");

var loki = require("lokijs");
var db = new loki("Officeworks");

var deliveryCost = db.addCollection("delivery");

for (var i = 1; i < 5; i++) {
  deliveryCost.insert({
    weight: i * 10,
    cost: i * 2,
    postcode: "3000"
  });
}

var Delivery = {};

Delivery.getByWeight = function(postcode, wt, callback) {
  const cost = deliveryCost.find({ weight: { $gt: wt } }, postcode)[0];

  console.log(cost);
  return callback(null, deliveryCost.find({})[0]);
};

module.exports = Delivery;
