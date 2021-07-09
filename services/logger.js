// Pretty weak and pointless middleware,
// just pretty console logs

"use strict";
var winston = require("winston");
winston.addColors({
  info: "green",
  warn: "cyan",
  error: "red",
  verbose: "blue",
  i: "gray",
  db: "magenta"
});
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console({ colorize: false, timestamp: true })
  ]
});

module.exports = logger;
