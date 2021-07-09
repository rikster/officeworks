// Yuck
// confusing route params
// some partnumber error checking, none for postcode
// kick off a availabilityService.getByPostcode,
// which leads down a rabbit hole of callbacks all over the place,
// some in the serives, some in models, a mess, spagetti
// will rewrite

"use strict";

const router = require("express").Router(),
  availabilityService = require("../services/availability"),
  logger = require("../services/logger");

const ERRS = {
  "Invalid Part": 404,
  "Invalid Store": 404,
  "Invalid Params": 400
};

function respondError(res, desc) {
  var code = ERRS[desc];
  return res.status(code == undefined ? 500 : code).send({ errors: [desc] });
}

router.get("/:postcode", function(req, res) {
  var postcode = req.params.postcode;
  var partNumber = req.query.partNumber;
  if (partNumber === undefined || partNumber === "")
    return respondError(res, "invalid part number specified");

  availabilityService.getByPostcode(postcode, partNumber, function(err, data) {
    if (err) {
      logger.error(err);
      return respondError(res, err);
    }

    res.json(data);
  });
});

module.exports = router;
