"use strict";

const express = require("express");
const winston = require("express-winston");
const logger = require("./services/logger");

const app = express();

process.on("uncaughtException", function(error) {
  console.dir(error);
  console.log("uncaughtException");

  if (error.stack) console.log(error.stack);
});

// Init Middleware, so we can accept body data
app.use(express.json({ extended: false }));

app.use(
  winston.logger({
    winstonInstance: logger,
    meta: false,
    msg: "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}",
    expressFormat: true,
    colorize: true,
  })
);

//Define Routes
app.use("/api/delivery", require(`./routes/delivery`));

const PORT = process.env.PORT || "3000";

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
