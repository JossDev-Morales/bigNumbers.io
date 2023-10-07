"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
var CustomError = require("./CustomError");

/**
 * Function to know if a number like a string is a valid representation of a number for BigDecimal
 * @param {string} number 
 * @throws {error} the error corresponding to the failure in the validation of the number
 * @returns {boolean} true if the string as a number is a valid value or throws an error
 */
function isValidNumber(number) {
  //We validate that the number is a string
  if (_typeof(number) !== _typeof(String())) {
    throw new Error('Invalid parameter');
  }
  //We validate that a number does not have a positive input sign, if it is positive, it should only be ignored, if you use "+" it will be treated as a rare character.
  if (number.split('').some(function (num) {
    return num === '+';
  })) {
    throw new CustomError({
      name: 'Invalid sign',
      message: 'Positive sign are not allowed',
      number: number
    });
  }
  //We validate that the decimals are not greater than one decimal, this is the maximum number of decimals allowed.
  if (number.split('.').length > 2) {
    throw new CustomError({
      name: 'Invalid dots',
      message: "The maximun quantity of dots are 1, you are using ".concat(number.split('.').length - 1, " dots"),
      number: number,
      dots: number.split('.').length - 1
    });
  }
  //We validate that it does not have rare characters in the string for decimal numbers
  if (number.split('.')[1]) {
    if (number.split('.')[0].split('').some(function (number) {
      return number === '-' ? false : isNaN(number);
    }) || number.split('.')[1].split('').some(function (number) {
      return isNaN(number);
    })) {
      throw new CustomError({
        name: 'Invalid characters',
        message: 'non-numeric characters found',
        number: number,
        invalidCharacters: {
          integers: number.split('.')[0].split('').filter(function (number) {
            return isNaN(number);
          }),
          decimals: number.split('.')[1].split('').filter(function (number) {
            return isNaN(number);
          })
        }
      });
    }
  } else {
    //We validate that it does not have rare characters in the string for non-decimal numbers
    if (number.split('').some(function (number) {
      return number === '-' ? false : isNaN(number);
    })) {
      throw new CustomError({
        name: 'Invalid characters',
        message: 'non-numeric characters found',
        number: number,
        invalidCharacters: number.split('').filter(function (number) {
          return isNaN(number);
        })
      });
    }
  }
  return true;
}
module.exports = isValidNumber;