// A new loki db is being built here for weight pricing?
// creates 4 new objects altering the weight & cost, uses same postcode (as is everywhere)
// then getByWeight function trys to find by weight and post, which doesnt work, allocates it to cost, does nothing with cost
// then returns deliveryCost.find({})[0], sets err to null

//overly complex twisted way to generate and applying weight pricing,
// and should nt be here, rather in the serivce oor route logic


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

  return callback(null, deliveryCost.find({})[0]);
};

module.exports = Delivery;
