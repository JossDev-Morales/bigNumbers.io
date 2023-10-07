"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/**
 * 
 * @param {Array} decimals 
 * @returns boolean
 */
function isPeriodic(decimals) {
  var decimalList = _toConsumableArray(decimals);
  var isPeriodic = false;
  var cases = 0;
  var couplePos;
  var secondPos;
  decimalList.forEach(function (couple, index) {
    if (!isPeriodic) {
      couplePos = index;
      decimalList.forEach(function (couplesIn, i) {
        if (couple === couplesIn) {
          cases++;
          if (cases === 2) {
            secondPos = i;
            isPeriodic = true;
          }
        }
      });
      cases = 0;
    }
  });
  var firstRange = _toConsumableArray(decimals).filter(function (couples, index) {
    if (index > couplePos && index < secondPos) {
      return couples;
    }
  });
  var secondRange = _toConsumableArray(decimals).filter(function (couples, index) {
    if (index > secondPos && index < secondPos + firstRange.length + 1) {
      return couples;
    }
  });
  return false || isPeriodic && firstRange.every(function (nums, index) {
    return nums === secondRange[index];
  });
}
module.exports = isPeriodic;