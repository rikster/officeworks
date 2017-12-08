var assert = require("assert");

var mocks = {
  inventoryService: {
    queryByPart: (store, partNumbers, callback) => {
      var partNumberArr = partNumbers.split(",");

      var res =
        "{" +
        '  "store": "W939",' +
        '  "postcode": "",' +
        '  "items": [{' +
        '    "partNumber": "JBCNCPA4CT",' +
        '    "qty": "92",' +
        '    "lineType": "NONBNB",' +
        '    "isNonShippable": false' +
        "  }]" +
        "}";

      callback(null, res);
    }
  },
  availabilityDal: {
    getPostcodeSites: (postcode, cb) => {
      cb(null, [{ Site: "W939", LineType: "NONBNB", DemandType: "STDCUS" }]);
    },
    getArticleAvailability: (uniqueSites, partNumbers, cb) => {
      cb(null, [{ Site: "W939", PartNo: "JBCNCPA4CT", Qty: 106 }]);
    },
    getArticleAvailabilityFuture: (uniqueSites, partNumbers, cb) => {
      cb(null, []);
    }
  },
  siteCutoffDal: {
    getSiteCutoff: (uniqueSites, cb) => {
      cb(null, [
        {
          Key: "W939",
          Carriers: [{ Carrier: "blah", LineType: "NONBNB", DaysToPush: 1 }]
        }
      ]);
    }
  },
  leadtimeDal: {
    getDeliveryLeadTime: (postcode, uniqueSites, cb) => {
      cb(null, [
        {
          Key: "W939",
          Carriers: [{ Carrier: "blah", LineType: "NONBNB", LeadTime: 1 }]
        }
      ]);
    }
  }
};
