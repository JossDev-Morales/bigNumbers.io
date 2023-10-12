"use strict";

var bigDecimal = require("./BigDecimalOps.js");
var bigInteger = require("./BigIntegerOps.js");
var IsValidNumber = require("./IsValidNumber");
console.log(new bigInteger(-10).ReturnModule(3));
module.exports = {
  bigInteger: bigInteger,
  bigDecimal: bigDecimal,
  IsValidNumber: IsValidNumber
};