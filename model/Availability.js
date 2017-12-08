"use strict";

var faker = require("faker");

var loki = require("lokijs");
var db = new loki("Officeworks");

var availability = db.addCollection("availability", { indices: ["id"] });

for (var i = 0; i < 10; i++) {
  availability.insert({
    id: i.toString(),
    name: faker.commerce.productName(),
    description: faker.company.catchPhrase(),
    weight: faker.random.number({
      min: 10,
      max: 50
    }),
    available: faker.random.boolean(),
    postcode: "3000"
  });
}

var Availability = {};

Availability.getByPostcode = function(postcode, itemCode, callback) {
  var foundItems = [];
  itemCode.forEach(function(item) {
    var foundItem = availability.find({ id: item, postcode })[0];
    foundItems.push(foundItem);
  });
  return callback(null, foundItems);
};

module.exports = Availability;
