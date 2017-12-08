const _ = require("underscore"),
  logger = require("./logger"),
  async = require("async");

var deliverService = {};

deliverService.getByPostcode = function(postcode, items, callback) {
  let checkItems = items.split(",");
  availabilityModel.getByPostcode(postcode, checkItems, (err, availibility) => {
    let final = {
      items: [],
      cost: 0
    };

    availibility.forEach(av => {
      if (av.available != true) {
        return;
      }
      final.items.push(av);
      deliveryModel.getByWeight(av.postcode, av.weight, function(
        err,
        delCosts
      ) {
        final.cost += delCosts.cost;
      });
    });

    callback(null, final);
  });
};

module.exports = function(options) {
  options = options || {};
  availabilityModel = require("../model/Availability");
  deliveryModel = require("../model/Delivery");

  return deliverService;
};
