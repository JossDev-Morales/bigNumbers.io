"use strict";

var bigDecimal = require("./BigDecimalOps.js");
var bigInteger = require("./BigIntegerOps.js");
var IsValidNumber = require("./IsValidNumber");
module.exports = {
  bigInteger: bigInteger,
  bigDecimal: bigDecimal,
  IsValidNumber: IsValidNumber
};