"use strict";

const bodyParser = require("body-parser");
const path = require("path");
const app = require("express")();
const winston = require("express-winston");
const logger = require("./services/logger");

process.on("uncaughtException", function(error) {
  console.dir(error);
  console.log("uncaughtException");

  if (error.stack) console.log(error.stack);
});

app.use(bodyParser.json());

app.use(
  winston.logger({
    winstonInstance: logger,
    meta: false,
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    expressFormat: true,
    colorize: true,
    ignoreRoute: function(req, res) {
      return false;
    }
  })
);

app.use("/api/delivery", require(`./routes/delivery`));

var port = process.env.PORT || "3000";
app.listen(port);

console.log("Server listening on port: " + port);
