var logger = require("./logger"),
  async = require("async"),
  _ = require("underscore");

var deliveryService = require("../services/delivery")();

var availabilityService = {};

availabilityService.getByPostcode = function(postcode, partCode, callback) {
  var result = [];
  deliveryService.getByPostcode(postcode, partCode, function(err, data) {
    if (err) {
      return callback(err);
    }

    result.push(data);
    callback(null, data);
  });
};

module.exports = availabilityService;
