"use strict";

var isValidNumber = require("./IsValidNumber");

/**
 * 
 * @param {string} numberRaw the number to extract the composition
 * @returns {{sign:string,ints:Array,decimals:Array,complete:string}}
 */
function getComposition(numberRaw) {
  var _number$slice$split$, _number$slice$split$2;
  isValidNumber(numberRaw);
  var number = numberRaw.split('');
  if (number[0] === ' ') {
    while (number[0] === ' ') {
      number.shift();
      number = number;
    }
  }
  number = number.join('');
  var havesign = number[0] === '-';
  var composition = {
    sign: havesign ? number.split('').shift() : '',
    ints: number.slice(havesign ? 1 : 0).split('.')[0].split(''),
    decimals: (_number$slice$split$ = (_number$slice$split$2 = number.slice(havesign ? 1 : 0).split('.')[1]) === null || _number$slice$split$2 === void 0 ? void 0 : _number$slice$split$2.split('')) !== null && _number$slice$split$ !== void 0 ? _number$slice$split$ : [0],
    complete: number.slice(havesign ? 1 : 0).split('.')[1] ? number.slice(havesign ? 1 : 0).split('.')[0] + '.' + number.slice(havesign ? 1 : 0).split('.')[1] : number.slice(havesign ? 1 : 0).split('.')[0] + '.' + '0'
  };
  while (composition.ints[0] === '0') {
    composition.ints = composition.ints.slice(1);
  }
  while (composition.decimals[composition.decimals.length - 1] === '0' && composition.decimals.length > 1) {
    composition.decimals.pop();
  }
  return composition;
}
module.exports = getComposition;