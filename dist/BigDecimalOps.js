"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _require = require("number-converter.io"),
  converter = _require.converter;
var isValidNumber = require("./IsValidNumber");
var _require2 = require("."),
  BigDecimal = _require2.BigDecimal;
/**
 * @class representation of a big decimal that exceeds the javascript limit
 * @description Use this class to represent a very large decimals, if your number supports javascript decimals, use vanilla decimal number, this BigDecimal work with strings operations.
 * @example
 * //19999999999999999.99999999999999999 its an decimal that exceeds the javascript limit
 * const MyBigDecimalNumber = new BigDecimal("19999999999999999.99999999999999999").Addition('0.00000000000000001')
 * console.log(MyBigDecimalNumber.Return())//20000000000000000 
 * @public 
 */
var _result = /*#__PURE__*/new WeakMap();
var _record = /*#__PURE__*/new WeakMap();
var bigDecimal = /*#__PURE__*/function () {
  /**
   * BigDecimal constructor
   * @param {string | number} initilizedResult 
   * @returns {bigDecimal} The initilized BigDecimal
   * @public
   */
  function bigDecimal(initilizedResult) {
    _classCallCheck(this, bigDecimal);
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _record, {
      writable: true,
      value: null
    });
    isValidNumber(String(initilizedResult));
    _classPrivateFieldSet(this, _result, String(initilizedResult));
    _classPrivateFieldSet(this, _record, {
      currentValue: 0,
      operations: []
    });
  }
  /**
  * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
  * @param {string} Binary number in binary base
  * @returns {bigDecimal} 
  */
  _createClass(bigDecimal, [{
    key: "Addition",
    value:
    /**
     * 
     * @param {string | number} stringDecimal number to add to the current value
     * @method Addition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method and sets the result of the operation as the current value
     */
    function Addition(stringDecimal, secondStringDecimal) {
      var _String$split$, _String$split$2;
      var createRecord = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      isValidNumber(String(stringDecimal));
      if (secondStringDecimal) {
        isValidNumber(String(secondStringDecimal));
      }
      var from = _classPrivateFieldGet(this, _result);
      var number1 = {
        ints: String(stringDecimal).split('.')[0].split('').reverse(),
        decimals: ((_String$split$ = String(stringDecimal).split('.')[1]) === null || _String$split$ === void 0 ? void 0 : _String$split$.split('').reverse()) || ['0']
      };
      var number2 = {
        ints: String(secondStringDecimal || _classPrivateFieldGet(this, _result)).split('.')[0].split('').reverse(),
        decimals: ((_String$split$2 = String(secondStringDecimal || _classPrivateFieldGet(this, _result)).split('.')[1]) === null || _String$split$2 === void 0 ? void 0 : _String$split$2.split('').reverse()) || ['0']
      };
      var carry = 0;
      var decimals = [];
      var ints = [];
      if (number1.decimals && number2.decimals) {
        if (number1.decimals.length >= number2.decimals.length) {
          number2.decimals.reverse();
          number1.decimals.forEach(function (decimal, index) {
            var _number2$decimals;
            var addition = Number(decimal) + Number((_number2$decimals = number2.decimals[number1.decimals.length - 1 - index]) !== null && _number2$decimals !== void 0 ? _number2$decimals : 0);
            if (addition + carry >= 10) {
              decimals.push(addition - 10 + carry);
              carry = 1;
            } else {
              decimals.push(addition + carry);
              carry = 0;
            }
          });
        } else {
          number1.decimals.reverse();
          number2.decimals.forEach(function (decimal, index) {
            var _number1$decimals;
            var addition = Number(decimal) + Number((_number1$decimals = number1.decimals[number2.decimals.length - 1 - index]) !== null && _number1$decimals !== void 0 ? _number1$decimals : 0);
            if (addition + carry >= 10) {
              decimals.push(addition - 10 + carry);
              carry = 1;
            } else {
              decimals.push(addition + carry);
              carry = 0;
            }
          });
        }
      }
      if (number1.ints.length >= number2.ints.length) {
        number1.ints.forEach(function (_int, index) {
          var _number2$ints$index;
          var addition = Number(_int) + Number((_number2$ints$index = number2.ints[index]) !== null && _number2$ints$index !== void 0 ? _number2$ints$index : 0);
          if (addition + carry >= 10) {
            ints.push(addition - 10 + carry);
            carry = 1;
            if (number1.ints.length - 1 === index) {
              ints.push(1);
            }
          } else {
            ints.push(addition + carry);
            carry = 0;
          }
        });
      } else {
        number2.ints.forEach(function (_int2, index) {
          var _number1$ints$index;
          var addition = Number(parseInt(_int2) + carry) + Number((_number1$ints$index = number1.ints[index]) !== null && _number1$ints$index !== void 0 ? _number1$ints$index : 0);
          if (addition >= 10) {
            ints.push(parseInt(addition) - 10);
            carry = 1;
            if (number2.ints.length - 1 === index) {
              ints.push(1);
            }
          } else {
            ints.push(addition);
            carry = 0;
          }
        });
      }
      while (decimals.length > 1 && decimals[0] == 0) {
        decimals.shift();
      }
      if (decimals.every(function (decimal) {
        return decimal === 0;
      })) {
        _classPrivateFieldSet(this, _result, ints.reverse().join(''));
      } else if (decimals.length == 1 && decimals[0] == 0) {
        _classPrivateFieldSet(this, _result, ints.reverse().join(''));
      } else {
        _classPrivateFieldSet(this, _result, ints.reverse().join('') + '.' + decimals.reverse().join(''));
      }
      if (!createRecord) {
        _classPrivateFieldGet(this, _record).operations.push({
          type: 'Addition',
          from: from,
          adding: stringDecimal,
          result: _classPrivateFieldGet(this, _result)
        });
      }
      return this;
    }
    /**
     * 
     * @param {string|number} stringDecimal number to add to the current value
     * @method ReturnAddition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method
     * @returns {string} the result of the operation as a string
     */
  }, {
    key: "ReturnAddition",
    value: function ReturnAddition(stringDecimal) {
      var _String$split$3, _String$split$4;
      isValidNumber(String(stringDecimal));
      var number1 = {
        ints: String(stringDecimal).split('.')[0].split('').reverse(),
        decimals: ((_String$split$3 = String(stringDecimal).split('.')[1]) === null || _String$split$3 === void 0 ? void 0 : _String$split$3.split('').reverse()) || ['0']
      };
      var number2 = {
        ints: String(_classPrivateFieldGet(this, _result)).split('.')[0].split('').reverse(),
        decimals: ((_String$split$4 = String(_classPrivateFieldGet(this, _result)).split('.')[1]) === null || _String$split$4 === void 0 ? void 0 : _String$split$4.split('').reverse()) || ['0']
      };
      var carry = 0;
      var decimals = [];
      var ints = [];
      if (number1.decimals && number2.decimals) {
        if (number1.decimals.length >= number2.decimals.length) {
          number2.decimals.reverse();
          number1.decimals.forEach(function (decimal, index) {
            var _number2$decimals2;
            var addition = Number(decimal) + Number((_number2$decimals2 = number2.decimals[number1.decimals.length - 1 - index]) !== null && _number2$decimals2 !== void 0 ? _number2$decimals2 : 0);
            if (addition + carry >= 10) {
              decimals.push(addition - 10 + carry);
              carry = 1;
            } else {
              decimals.push(addition + carry);
              carry = 0;
            }
          });
        } else {
          number1.decimals.reverse();
          number2.decimals.forEach(function (decimal, index) {
            var _number1$decimals2;
            var addition = Number(decimal) + Number((_number1$decimals2 = number1.decimals[number2.decimals.length - 1 - index]) !== null && _number1$decimals2 !== void 0 ? _number1$decimals2 : 0);
            if (addition + carry >= 10) {
              decimals.push(addition - 10 + carry);
              carry = 1;
            } else {
              decimals.push(addition + carry);
              carry = 0;
            }
          });
        }
      }
      if (number1.ints.length >= number2.ints.length) {
        number1.ints.forEach(function (_int3, index) {
          var _number2$ints$index2;
          var addition = Number(_int3) + Number((_number2$ints$index2 = number2.ints[index]) !== null && _number2$ints$index2 !== void 0 ? _number2$ints$index2 : 0);
          if (addition + carry >= 10) {
            ints.push(addition - 10 + carry);
            carry = 1;
            if (number1.ints.length - 1 === index) {
              ints.push(1);
            }
          } else {
            ints.push(addition + carry);
            carry = 0;
          }
        });
      } else {
        number2.ints.forEach(function (_int4, index) {
          var _number1$ints$index2;
          var addition = Number(_int4) + Number((_number1$ints$index2 = number1.ints[index]) !== null && _number1$ints$index2 !== void 0 ? _number1$ints$index2 : 0);
          if (addition + carry >= 10) {
            ints.push(addition - 10 + carry);
            carry = 1;
            if (number1.ints.length - 1 === index) {
              ints.push(1);
            }
          } else {
            ints.push(addition + carry);
            carry = 0;
          }
        });
      }
      while (decimals.length > 1 && decimals[0] == 0) {
        decimals.shift();
      }
      var result;
      if (decimals.every(function (decimal) {
        return decimal === 0;
      })) {
        result = ints.reverse().join('');
      } else if (decimals.length == 1 && decimals[0] == 0) {
        result = ints.reverse().join('');
      } else {
        result = ints.reverse().join('') + '.' + decimals.reverse().join('');
      }
      return result;
    }
    /**
     * 
     * @param {string|number} string1 number to subtract the current value
     * @method Subtraction subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method and sets the result of the operation as the current value
       */
  }, {
    key: "Subtraction",
    value: function Subtraction(string1) {
      var _String$split$5, _String$split$1$split, _String$split$6;
      isValidNumber(String(string1));
      var from = _classPrivateFieldGet(this, _result);
      var minuendo = {
        ints: String(_classPrivateFieldGet(this, _result)).split('.')[0].split(''),
        decimals: ((_String$split$5 = String(_classPrivateFieldGet(this, _result)).split('.')[1]) === null || _String$split$5 === void 0 ? void 0 : _String$split$5.split('')) || [0]
      };
      var sustraendo = {
        ints: String(string1).split('.')[0].split(''),
        decimals: (_String$split$1$split = (_String$split$6 = String(string1).split('.')[1]) === null || _String$split$6 === void 0 ? void 0 : _String$split$6.split('')) !== null && _String$split$1$split !== void 0 ? _String$split$1$split : [0]
      };
      var isNegative = false;
      var decimalIsNegative = false;
      var carry = 0;
      var intsResult = [];
      var decimalsResult = [];
      var negativeChecker = function negativeChecker(value1, value2) {
        var maxLenght = Math.max((value1 === null || value1 === void 0 ? void 0 : value1.length) || minuendo.ints.length, (value2 === null || value2 === void 0 ? void 0 : value2.length) || sustraendo.ints.length);
        var minu = value1 || minuendo.ints;
        var sust = value2 || sustraendo.ints;
        for (var i = 0; i < maxLenght; i++) {
          var minuDigit = minu[i] || 0;
          var sustDigit = sust[i] || 0;
          if (i === 0 && minuDigit < sustDigit) {
            return true;
          }
          if (minuDigit < sustDigit) {
            return true;
          }
          if (minuDigit > sustDigit) {
            return false;
          }
          if (i === maxLenght - 1 && minuDigit === sustDigit) {
            return false;
          }
        }
        return true;
      };
      if (minuendo.ints.length < sustraendo.ints.length || minuendo.ints.length === sustraendo.ints.length && Number(minuendo.ints[0]) < Number(sustraendo.ints[0]) || minuendo.ints.length === sustraendo.ints.length && negativeChecker()) {
        isNegative = true;
      }
      if (minuendo.decimals.length < sustraendo.decimals.length) {
        var decimals = minuendo.decimals;
        decimals.push(0);
        if (negativeChecker(decimals, sustraendo.decimals)) {
          decimalIsNegative = true;
        }
      } else if (minuendo.decimals.length > sustraendo.decimals.length) {
        var _decimals = minuendo.decimals;
        _decimals.push(0);
        if (negativeChecker(_decimals, sustraendo.decimals)) {
          decimalIsNegative = true;
        }
      } else {
        if (negativeChecker(minuendo.decimals, sustraendo.decimals)) {
          decimalIsNegative = true;
        }
      }
      minuendo.ints.reverse();
      minuendo.decimals.reverse();
      sustraendo.ints.reverse();
      sustraendo.decimals.reverse();
      var length = Math.max(minuendo.ints.length, sustraendo.ints.length) - Math.min(minuendo.ints.length, sustraendo.ints.length);
      for (var i = 0; i < length; i++) {
        if (minuendo.ints.length >= sustraendo.ints.length) {
          sustraendo.ints.push(0);
        } else {
          minuendo.ints.push(0);
        }
      }
      var decimalLength = Math.max(minuendo.decimals.length, sustraendo.decimals.length) - Math.min(minuendo.decimals.length, sustraendo.decimals.length);
      for (var _i = 0; _i < decimalLength; _i++) {
        if (minuendo.decimals.length >= sustraendo.decimals.length) {
          sustraendo.decimals.push(0);
        } else {
          minuendo.decimals.push(0);
        }
      }
      minuendo.decimals.forEach(function (decimal, index) {
        if (decimalIsNegative) {
          var operation = Number(parseInt(sustraendo.decimals[index] - carry) - Number(decimal));
          if (operation < 0) {
            operation = Number(parseInt(sustraendo.decimals[index]) + 10 - carry) - Number(decimal);
            carry = 1;
          } else {
            carry = 0;
          }
          decimalsResult.push(operation);
        } else {
          var _operation = Number(parseInt(decimal) - carry) - Number(sustraendo.decimals[index]);
          if (_operation < 0) {
            _operation = Number(parseInt(decimal) + 10 - carry) - Number(sustraendo.decimals[index]);
            carry = 1;
          } else {
            carry = 0;
          }
          decimalsResult.push(_operation);
        }
      });
      minuendo.ints.forEach(function (integer, index) {
        if (isNegative) {
          var operation = Number(parseInt(sustraendo.ints[index]) - carry) - Number(integer);
          if (operation < 0) {
            operation = Number(parseInt(sustraendo.ints[index]) + 10 - carry) - Number(parseInt(integer));
            carry = 1;
          } else {
            carry = 0;
          }
          intsResult.push(operation);
        } else {
          var _operation2 = Number(parseInt(integer) - carry) - Number(sustraendo.ints[index]);
          if (_operation2 < 0) {
            _operation2 = Number(parseInt(integer) + 10 - carry) - Number(sustraendo.ints[index]);
            carry = 1;
          } else {
            carry = 0;
          }
          intsResult.push(_operation2);
        }
      });
      var result = undefined;
      if (decimalIsNegative == false && isNegative) {
        var _int5 = undefined;
        var decimal = decimalsResult;
        var numOfDecimals = decimalsResult.length;
        var overCarry = 0;
        var temp = [];
        intsResult.forEach(function (integer, index) {
          if (!_int5 && integer !== 0) {
            overCarry = index;
            _int5 = integer;
            for (var _i2 = 0; _i2 < index; _i2++) {
              _int5 = Number(_int5 + '0');
              decimal = [0].concat(_toConsumableArray(decimal));
            }
          }
        });
        for (var _i3 = 0; _i3 < numOfDecimals; _i3++) {
          _int5 = Number(_int5 + '0');
          decimal = [0].concat(_toConsumableArray(decimal));
        }
        _int5 = _int5.toString().split('');
        _int5.reverse();
        decimal.reverse();
        var _carry = 0;
        _int5.forEach(function (integer, index) {
          var operation = Number(parseInt(integer) - _carry) - Number(decimal[index]);
          if (operation < 0) {
            if (_int5[index + 1] !== undefined) {
              operation = Number(parseInt(integer) + 10 - _carry) - Number(decimal[index]);
              _carry = 1;
            }
          } else {
            _carry = 0;
          }
          temp.push(operation);
        });
        var resultsForInts = temp.slice(numOfDecimals).reverse();
        var resultsForDecimals = temp.slice(0, numOfDecimals);
        var resultLenght = intsResult.length;
        intsResult.reverse();
        intsResult.splice(resultLenght - overCarry - 1, overCarry + 1, resultsForInts.join(''));
        intsResult.reverse();
        decimalsResult = resultsForDecimals;
      }
      if (isNegative == false && decimalIsNegative) {
        var _int6 = undefined;
        var _decimal = decimalsResult.reverse();
        var _numOfDecimals = decimalsResult.length;
        var _overCarry = 0;
        var _temp = [];
        intsResult.forEach(function (integer, index) {
          if (!_int6 && integer !== 0) {
            _overCarry = index;
            _int6 = integer;
            for (var _i4 = 0; _i4 < index; _i4++) {
              _int6 = Number(_int6 + '0');
              _decimal = [0].concat(_toConsumableArray(_decimal));
            }
          }
          if (!_int6 && index == intsResult.length - 1 && integer == 0) {
            _int6 = integer;
          }
        });
        for (var _i5 = 0; _i5 < _numOfDecimals; _i5++) {
          _int6 = Number(_int6 + '0');
          _decimal = [0].concat(_toConsumableArray(_decimal));
        }
        _int6 = _int6.toString().split('');
        _int6.reverse();
        _decimal.reverse();
        var _carry2 = 0;
        if (Number(_int6) !== 0) {
          _int6.forEach(function (integer, index) {
            var operation = Number(parseInt(integer) - _carry2) - Number(_decimal[index]);
            if (operation < 0) {
              if (_int6[index + 1] !== undefined) {
                operation = Number(parseInt(integer) + 10 - _carry2) - Number(_decimal[index]);
                _carry2 = 1;
              }
            } else {
              _carry2 = 0;
            }
            _temp.push(operation);
          });
          var _resultsForInts = _temp.slice(_numOfDecimals).reverse();
          var _resultsForDecimals = _temp.slice(0, _numOfDecimals);
          var _resultLenght = intsResult.length;
          while (_resultsForInts.length > 1 && _resultsForInts[0] == 0) {
            _resultsForInts.shift();
          }
          intsResult.reverse();
          intsResult.splice(_resultLenght - _overCarry - 1, _overCarry + 1, _resultsForInts.join(''));
          intsResult.reverse();
          decimalsResult = _resultsForDecimals;
        } else {
          isNegative = true;
        }
      }
      while (intsResult.length > 1 && intsResult[intsResult.length - 1] == 0) {
        intsResult.pop();
      }
      while (decimalsResult.length >= 1 && decimalsResult[0] == 0) {
        decimalsResult.shift();
      }
      if (isNegative) {
        intsResult.push('-');
      }
      if (decimalsResult.every(function (decimal) {
        return decimal == 0;
      }) || decimalsResult.length === 0) {
        result = intsResult.reverse().join('');
      } else {
        result = intsResult.reverse().join('') + '.' + decimalsResult.reverse().join('');
      }
      _classPrivateFieldSet(this, _result, result);
      _classPrivateFieldGet(this, _record).operations.push({
        type: 'Subtraction',
        from: from,
        subtracting: string1,
        result: _classPrivateFieldGet(this, _result)
      });
      return this;
    }
    /**
     * 
     * @param {string|number} string1 number to subtract the current value
     * @method ReturnSubtraction subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method
     * @returns {string} the result of the operation as a string 
     */
  }, {
    key: "ReturnSubtraction",
    value: function ReturnSubtraction(string1) {
      var _String$split$7, _String$split$1$split2, _String$split$8;
      isValidNumber(String(string1));
      var minuendo = {
        ints: String(_classPrivateFieldGet(this, _result)).split('.')[0].split(''),
        decimals: ((_String$split$7 = String(_classPrivateFieldGet(this, _result)).split('.')[1]) === null || _String$split$7 === void 0 ? void 0 : _String$split$7.split('')) || [0]
      };
      var sustraendo = {
        ints: String(string1).split('.')[0].split(''),
        decimals: (_String$split$1$split2 = (_String$split$8 = String(string1).split('.')[1]) === null || _String$split$8 === void 0 ? void 0 : _String$split$8.split('')) !== null && _String$split$1$split2 !== void 0 ? _String$split$1$split2 : [0]
      };
      var isNegative = false;
      var decimalIsNegative = false;
      var carry = 0;
      var intsResult = [];
      var decimalsResult = [];
      var negativeChecker = function negativeChecker(value1, value2) {
        var maxLenght = Math.max((value1 === null || value1 === void 0 ? void 0 : value1.length) || minuendo.ints.length, (value2 === null || value2 === void 0 ? void 0 : value2.length) || sustraendo.ints.length);
        var minu = value1 || minuendo.ints;
        var sust = value2 || sustraendo.ints;
        for (var i = 0; i < maxLenght; i++) {
          var minuDigit = minu[i] || 0;
          var sustDigit = sust[i] || 0;
          if (i === 0 && minuDigit < sustDigit) {
            return true;
          }
          if (minuDigit < sustDigit) {
            return true;
          }
          if (minuDigit > sustDigit) {
            return false;
          }
          if (i === maxLenght - 1 && minuDigit === sustDigit) {
            return false;
          }
        }
        return true;
      };
      if (minuendo.ints.length < sustraendo.ints.length || minuendo.ints.length === sustraendo.ints.length && Number(minuendo.ints[0]) < Number(sustraendo.ints[0]) || minuendo.ints.length === sustraendo.ints.length && negativeChecker()) {
        isNegative = true;
      }
      if (minuendo.decimals.length < sustraendo.decimals.length) {
        var decimals = minuendo.decimals;
        decimals.push(0);
        if (negativeChecker(decimals, sustraendo.decimals)) {
          decimalIsNegative = true;
        }
      } else if (minuendo.decimals.length > sustraendo.decimals.length) {
        var _decimals2 = minuendo.decimals;
        _decimals2.push(0);
        if (negativeChecker(_decimals2, sustraendo.decimals)) {
          decimalIsNegative = true;
        }
      } else {
        if (negativeChecker(minuendo.decimals, sustraendo.decimals)) {
          decimalIsNegative = true;
        }
      }
      minuendo.ints.reverse();
      minuendo.decimals.reverse();
      sustraendo.ints.reverse();
      sustraendo.decimals.reverse();
      var length = Math.max(minuendo.ints.length, sustraendo.ints.length) - Math.min(minuendo.ints.length, sustraendo.ints.length);
      for (var i = 0; i < length; i++) {
        if (minuendo.ints.length >= sustraendo.ints.length) {
          sustraendo.ints.push(0);
        } else {
          minuendo.ints.push(0);
        }
      }
      var decimalLength = Math.max(minuendo.decimals.length, sustraendo.decimals.length) - Math.min(minuendo.decimals.length, sustraendo.decimals.length);
      for (var _i6 = 0; _i6 < decimalLength; _i6++) {
        if (minuendo.decimals.length >= sustraendo.decimals.length) {
          sustraendo.decimals.push(0);
        } else {
          minuendo.decimals.push(0);
        }
      }
      minuendo.decimals.forEach(function (decimal, index) {
        if (decimalIsNegative) {
          var operation = Number(parseInt(sustraendo.decimals[index] - carry) - Number(decimal));
          if (operation < 0) {
            operation = Number(parseInt(sustraendo.decimals[index]) + 10 - carry) - Number(decimal);
            carry = 1;
          } else {
            carry = 0;
          }
          decimalsResult.push(operation);
        } else {
          var _operation3 = Number(parseInt(decimal) - carry) - Number(sustraendo.decimals[index]);
          if (_operation3 < 0) {
            _operation3 = Number(parseInt(decimal) + 10 - carry) - Number(sustraendo.decimals[index]);
            carry = 1;
          } else {
            carry = 0;
          }
          decimalsResult.push(_operation3);
        }
      });
      minuendo.ints.forEach(function (integer, index) {
        if (isNegative) {
          var operation = Number(parseInt(sustraendo.ints[index]) - carry) - Number(integer);
          if (operation < 0) {
            operation = Number(parseInt(sustraendo.ints[index]) + 10 - carry) - Number(parseInt(integer));
            carry = 1;
          } else {
            carry = 0;
          }
          intsResult.push(operation);
        } else {
          var _operation4 = Number(parseInt(integer) - carry) - Number(sustraendo.ints[index]);
          if (_operation4 < 0) {
            _operation4 = Number(parseInt(integer) + 10 - carry) - Number(sustraendo.ints[index]);
            carry = 1;
          } else {
            carry = 0;
          }
          intsResult.push(_operation4);
        }
      });
      var result = undefined;
      if (decimalIsNegative == false && isNegative) {
        var _int7 = undefined;
        var decimal = decimalsResult;
        var numOfDecimals = decimalsResult.length;
        var overCarry = 0;
        var temp = [];
        intsResult.forEach(function (integer, index) {
          if (!_int7 && integer !== 0) {
            overCarry = index;
            _int7 = integer;
            for (var _i7 = 0; _i7 < index; _i7++) {
              _int7 = Number(_int7 + '0');
              decimal = [0].concat(_toConsumableArray(decimal));
            }
          }
        });
        for (var _i8 = 0; _i8 < numOfDecimals; _i8++) {
          _int7 = Number(_int7 + '0');
          decimal = [0].concat(_toConsumableArray(decimal));
        }
        _int7 = _int7.toString().split('');
        _int7.reverse();
        decimal.reverse();
        var _carry3 = 0;
        _int7.forEach(function (integer, index) {
          var operation = Number(parseInt(integer) - _carry3) - Number(decimal[index]);
          if (operation < 0) {
            if (_int7[index + 1] !== undefined) {
              operation = Number(parseInt(integer) + 10 - _carry3) - Number(decimal[index]);
              _carry3 = 1;
            }
          } else {
            _carry3 = 0;
          }
          temp.push(operation);
        });
        var resultsForInts = temp.slice(numOfDecimals).reverse();
        var resultsForDecimals = temp.slice(0, numOfDecimals);
        var resultLenght = intsResult.length;
        intsResult.reverse();
        intsResult.splice(resultLenght - overCarry - 1, overCarry + 1, resultsForInts.join(''));
        intsResult.reverse();
        decimalsResult = resultsForDecimals;
      }
      if (isNegative == false && decimalIsNegative) {
        var _int8 = undefined;
        var _decimal2 = decimalsResult.reverse();
        var _numOfDecimals2 = decimalsResult.length;
        var _overCarry2 = 0;
        var _temp2 = [];
        intsResult.forEach(function (integer, index) {
          if (!_int8 && integer !== 0) {
            _overCarry2 = index;
            _int8 = integer;
            for (var _i9 = 0; _i9 < index; _i9++) {
              _int8 = Number(_int8 + '0');
              _decimal2 = [0].concat(_toConsumableArray(_decimal2));
            }
          }
          if (!_int8 && index == intsResult.length - 1 && integer == 0) {
            _int8 = integer;
          }
        });
        for (var _i10 = 0; _i10 < _numOfDecimals2; _i10++) {
          _int8 = Number(_int8 + '0');
          _decimal2 = [0].concat(_toConsumableArray(_decimal2));
        }
        _int8 = _int8.toString().split('');
        _int8.reverse();
        _decimal2.reverse();
        var _carry4 = 0;
        if (Number(_int8) !== 0) {
          _int8.forEach(function (integer, index) {
            var operation = Number(parseInt(integer) - _carry4) - Number(_decimal2[index]);
            if (operation < 0) {
              if (_int8[index + 1] !== undefined) {
                operation = Number(parseInt(integer) + 10 - _carry4) - Number(_decimal2[index]);
                _carry4 = 1;
              }
            } else {
              _carry4 = 0;
            }
            _temp2.push(operation);
          });
          var _resultsForInts2 = _temp2.slice(_numOfDecimals2).reverse();
          var _resultsForDecimals2 = _temp2.slice(0, _numOfDecimals2);
          var _resultLenght2 = intsResult.length;
          while (_resultsForInts2.length > 1 && _resultsForInts2[0] == 0) {
            _resultsForInts2.shift();
          }
          intsResult.reverse();
          intsResult.splice(_resultLenght2 - _overCarry2 - 1, _overCarry2 + 1, _resultsForInts2.join(''));
          intsResult.reverse();
          decimalsResult = _resultsForDecimals2;
        } else {
          isNegative = true;
        }
      }
      while (intsResult.length > 1 && intsResult[intsResult.length - 1] == 0) {
        intsResult.pop();
      }
      while (decimalsResult.length >= 1 && decimalsResult[0] == 0) {
        decimalsResult.shift();
      }
      if (isNegative) {
        intsResult.push('-');
      }
      if (decimalsResult.every(function (decimal) {
        return decimal == 0;
      }) || decimalsResult.length === 0) {
        result = intsResult.reverse().join('');
      } else {
        result = intsResult.reverse().join('') + '.' + decimalsResult.reverse().join('');
      }
      return result;
    }
    /**
     * 
     * @param {string|number} number number to multiply
     * @method Multiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value
     */
  }, {
    key: "Multiplication",
    value: function Multiplication(number) {
      var _classPrivateFieldGet2,
        _String$split$9,
        _this = this;
      isValidNumber(String(number));
      var from = _classPrivateFieldGet(this, _result);
      var decimalsCount = ((_classPrivateFieldGet2 = _classPrivateFieldGet(this, _result).split('.')[1]) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.length) || 0 + ((_String$split$9 = String(number).split('.')[1]) === null || _String$split$9 === void 0 ? void 0 : _String$split$9.length) || 0;
      var mult = function mult(number, factor) {
        var tempNumber = factor || _classPrivateFieldGet(_this, _result);
        var tempResult = factor || _classPrivateFieldGet(_this, _result); //5
        for (var i = 1; i < Number(number); i++) {
          tempResult = _this.Addition(tempResult, tempNumber, true).Return();
        }
        return tempResult;
      };
      if (String(number).split('.').length == 2) {
        var factor = String(number).split('.');
        var Operation = mult(factor.join(''), _classPrivateFieldGet(this, _result).split('.').join(''));
        _classPrivateFieldSet(this, _result, Operation.slice(0, Operation.length - decimalsCount) + '.' + Operation.slice(Operation.length - decimalsCount));
      } else {
        _classPrivateFieldSet(this, _result, mult(number));
      }
      _classPrivateFieldGet(this, _record).operations.push({
        type: 'Multiplication',
        from: from,
        by: number,
        result: _classPrivateFieldGet(this, _result)
      });
      return this;
    }
    /**
     * 
     * @param {string|number} number number to multiply
     * @method ReturnMultiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method 
     * @returns {string} the result of the operation as a string 
     */
  }, {
    key: "ReturnMultiplication",
    value: function ReturnMultiplication(number) {
      var _classPrivateFieldGet3,
        _String$split$10,
        _this2 = this;
      isValidNumber(String(number));
      var decimalsCount = ((_classPrivateFieldGet3 = _classPrivateFieldGet(this, _result).split('.')[1]) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.length) || 0 + ((_String$split$10 = String(number).split('.')[1]) === null || _String$split$10 === void 0 ? void 0 : _String$split$10.length) || 0;
      var mult = function mult(number, factor) {
        var tempNumber = factor || _classPrivateFieldGet(_this2, _result);
        var tempResult = factor || _classPrivateFieldGet(_this2, _result); //5
        for (var i = 1; i < Number(number); i++) {
          tempResult = _this2.Addition(tempResult, tempNumber, true).Return();
        }
        return tempResult;
      };
      if (String(number).split('.').length == 2) {
        var factor = String(number).split('.');
        var Operation = mult(factor.join(''), _classPrivateFieldGet(this, _result).split('.').join(''));
        return Operation.slice(0, Operation.length - decimalsCount) + '.' + Operation.slice(Operation.length - decimalsCount);
      } else {
        return mult(number);
      }
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {('binary'|'octal'|'decimal'|'hexadecimal'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36')} radix the numeric base to convert the current value
     * @method Return 
     * @returns {string} the current value as a string
     */
  }, {
    key: "Return",
    value: function Return(radix) {
      /**@type {string} */
      var result = radix ? new converter(_classPrivateFieldGet(this, _result), '10').toCustomBase(radix) : _classPrivateFieldGet(this, _result);
      return result;
    }
    /**
     * 
     * @returns {object} a log of all operations since the previous record reset
     */
  }, {
    key: "GetRecord",
    value: function GetRecord() {
      _classPrivateFieldGet(this, _record).currentValue = _classPrivateFieldGet(this, _result);
      return _classPrivateFieldGet(this, _record);
    }
    /**
     * @method ClearRecord resets the log of operations so far
     */
  }, {
    key: "ClearRecord",
    value: function ClearRecord() {
      _classPrivateFieldGet(this, _record).operations = [];
      return this;
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string|number} number 
     * @param {string|number} radix the base of the number you will pass to convert it to decimal base
     * @method SetBigInteger set the current value with the number you pass as a parameter and delete records
     * @returns {bigDecimal}
     */
  }, {
    key: "SetBigDecimal",
    value: function SetBigDecimal(number, radix) {
      var decimal = radix ? new converter(number, radix).toDecimal() : number;
      isValidNumber(decimal);
      _classPrivateFieldSet(this, _result, decimal);
      this.ClearRecord();
      return this;
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method gt Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is greater than this.
     */
  }, {
    key: "gt",
    value: function gt(number) {
      return bigDecimal.greaterThan(_classPrivateFieldGet(this, _result), number);
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lt Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is less than this.
     */
  }, {
    key: "lt",
    value: function lt(number) {
      return bigDecimal.lessThan(_classPrivateFieldGet(this, _result), number);
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method eq Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is the same as this.
     */
  }, {
    key: "eq",
    value: function eq(number) {
      return BigDecimal.isEqualTo(_classPrivateFieldGet(this, _result), number);
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method gte Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is greater than or equal to this.
     */
  }, {
    key: "gte",
    value: function gte(number) {
      return BigDecimal.greaterOrEqualThan(_classPrivateFieldGet(this, _result), number);
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lte compara The current value of the "BigDecimal" with a number received as a parameter to know if the current value is less than or equal to this.
     */
  }, {
    key: "lte",
    value: function lte(number) {
      return BigDecimal.lessOrEqualThan(_classPrivateFieldGet(this, _result), number);
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method greaterThan Compare the first parameter with the second to find out if the first parameter is greater than the second parameter.
     */
  }], [{
    key: "fromBinary",
    value: function fromBinary(Binary) {
      var binarynumber = new converter(Binary, '2');
      return new this(binarynumber.toDecimal());
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string} octal number in octal base
     * @returns {bigDecimal}
     */
  }, {
    key: "fromOctal",
    value: function fromOctal(octal) {
      var octalnumber = new converter(octal, '8');
      return new this(octalnumber.toDecimal());
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string} hexadecimal number in hexadecimal base
     * @returns {bigDecimal}
     */
  }, {
    key: "fromHexadecimal",
    value: function fromHexadecimal(hexadecimal) {
      var hexanumber = new converter(hexadecimal, '16');
      return new this(hexanumber.toDecimal());
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string} number number in some base betwen 2 and 36
     * @param {string} base the base of the number
     * @returns {bigDecimal}
     */
  }, {
    key: "fromOtherBase",
    value: function fromOtherBase(number, base) {
      var basenumber = new converter(number, base);
      return new this(basenumber.toDecimal());
    }
  }, {
    key: "greaterThan",
    value: function greaterThan(param1, param2) {
      var _number1$join$split$, _number1$join$split$2, _number2$join$split$, _number2$join$split$2;
      var number1 = String(param1).split('');
      var number2 = String(param2).split('');
      var num1 = {
        sign: number1[0] === '-' ? false : true,
        ints: number1.join('').split('.')[0].split(''),
        decimals: (_number1$join$split$ = (_number1$join$split$2 = number1.join('').split('.')[1]) === null || _number1$join$split$2 === void 0 ? void 0 : _number1$join$split$2.split('')) !== null && _number1$join$split$ !== void 0 ? _number1$join$split$ : [0]
      };
      var num2 = {
        sign: String(number2).split('')[0] === '-' ? false : true,
        ints: number2.join('').split('.')[0].split(''),
        decimals: (_number2$join$split$ = (_number2$join$split$2 = number2.join('').split('.')[1]) === null || _number2$join$split$2 === void 0 ? void 0 : _number2$join$split$2.split('')) !== null && _number2$join$split$ !== void 0 ? _number2$join$split$ : [0]
      };
      if (!num1.sign) {
        num1.ints.shift();
      }
      if (!num2.sign) {
        num2.ints.shift();
      }
      while (num1.ints[0] == 0) {
        num1.ints.shift();
      }
      while (num2.ints[0] == 0) {
        num2.ints.shift();
      }
      while (num1.decimals[num1.decimals.length - 1] == 0 && num1.length > 1) {
        num1.decimals.pop();
      }
      while (num2.decimals[num2.decimals.length - 1] == 0 && num2.length > 1) {
        num2.decimals.pop();
      }
      if (num1.sign == false && num2.sign == true) {
        return false;
      } else if (num1.sign == true && num2.sign == false) {
        return true;
      } else if (num1.sign == false && num2.sign == false) {
        if (!this.isEqualTo(num1.ints.join(''), num2.ints.join(''))) {
          if (num1.ints.length > num2.ints.length) {
            return false;
          } else if (num1.ints.length < num2.ints.length) {
            return true;
          } else if (num1.ints.length == num2.ints.length && num1.ints[0] > num2.ints[0]) {
            return false;
          } else if (num1.ints.length == num2.ints.length && num1.ints[0] == num2.ints[0]) {
            var tempToReturn = false;
            var tempMark = false;
            num1.ints.forEach(function (digit, index) {
              if (digit !== num2.ints[index] && !tempMark) {
                if (digit > num2.ints[index]) {
                  tempToReturn = true;
                  tempMark = true;
                } else {
                  tempMark = true;
                }
              }
            });
            if (tempToReturn) {
              return false;
            } else {
              return true;
            }
          } else {
            return true;
          }
        } else {
          if (!this.isEqualTo(num1.decimals.join(''), num2.decimals.join(''))) {
            if (num1.decimals[0] > num2.decimals[0]) {
              return false;
            } else if (num1.decimals[0] < num2.decimals[0]) {
              return true;
            } else if (num1.decimals[0] > num2.decimals[0]) {
              return false;
            } else if (num1.decimals[0] = num2.decimals[0]) {
              var _tempToReturn = false;
              var _tempMark = false;
              num1.decimals.forEach(function (digit, index) {
                if (digit !== num2.decimals[index] && !_tempMark) {
                  if (digit > num2.decimals[index]) {
                    _tempToReturn = true;
                    _tempMark = true;
                  } else {
                    _tempMark = true;
                  }
                }
              });
              if (_tempToReturn) {
                return false;
              } else {
                return true;
              }
            }
          } else {
            return false;
          }
        }
      } else {
        if (!this.isEqualTo(num1.ints.join(''), num2.ints.join(''))) {
          if (num1.ints.length > num2.ints.length) {
            return true;
          } else if (num1.ints.length < num2.ints.length) {
            return false;
          } else if (num1.ints.length == num2.ints.length && num1.ints[0] > num2.ints[0]) {
            return true;
          } else if (num1.ints.length == num2.ints.length && num1.ints[0] == num2.ints[0]) {
            var _tempToReturn2 = false;
            var _tempMark2 = false;
            num1.ints.forEach(function (digit, index) {
              if (digit !== num2.ints[index] && !_tempMark2) {
                if (digit > num2.ints[index]) {
                  _tempToReturn2 = true;
                  _tempMark2 = true;
                } else {
                  _tempMark2 = true;
                }
              }
            });
            if (_tempToReturn2) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          if (!this.isEqualTo(num1.decimals.join(''), num2.decimals.join(''))) {
            var _ref;
            if ((_ref = num1.decimals[0] > num2.decimals[0]) !== null && _ref !== void 0 ? _ref : 0) {
              return true;
            } else if (num1.decimals[0] < num2.decimals[0]) {
              return false;
            } else if (num1.decimals[0] > num2.decimals[0]) {
              return true;
            } else if (num1.decimals[0] = num2.decimals[0]) {
              var _tempToReturn3 = false;
              var _tempMark3 = false;
              num1.decimals.forEach(function (digit, index) {
                if (digit !== num2.decimals[index] && !_tempMark3) {
                  if (digit > num2.decimals[index]) {
                    _tempToReturn3 = true;
                    _tempMark3 = true;
                  } else {
                    _tempMark3 = true;
                  }
                }
              });
              if (_tempToReturn3) {
                return true;
              } else {
                return false;
              }
            }
          } else {
            return false;
          }
        }
      }
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method lessThan Compare the first parameter with the second to find out if the first parameter is less than the second parameter.
     */
  }, {
    key: "lessThan",
    value: function lessThan(number1, number2) {
      if (this.isEqualTo(number1, number2)) {
        return false;
      } else {
        return !this.greaterThan(number1, number2);
      }
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method isEqualTo Compare the first parameter with the second to find out if both parameters are the same.
     */
  }, {
    key: "isEqualTo",
    value: function isEqualTo(number1, number2) {
      var _String$split$11, _String$split$12;
      var num1 = {
        ints: String(number1).split('.')[0].split(''),
        decimals: ((_String$split$11 = String(number1).split('.')[1]) === null || _String$split$11 === void 0 ? void 0 : _String$split$11.split('')) || [0]
      };
      var num2 = {
        ints: String(number2).split('.')[0].split(''),
        decimals: ((_String$split$12 = String(number2).split('.')[1]) === null || _String$split$12 === void 0 ? void 0 : _String$split$12.split('')) || [0]
      };
      while (num1.ints[0] == 0) {
        num1.ints.shift();
      }
      while (num2.ints[0] == 0) {
        num2.ints.shift();
      }
      while (num1.decimals[num1.decimals.length - 1] == 0) {
        num1.decimals.pop();
      }
      while (num2.decimals[num2.decimals.length - 1] == 0) {
        num2.decimals.pop();
      }
      if (num1.ints.join('') === num2.ints.join('') && num1.decimals.join('') === num2.decimals.join('')) {
        return true;
      } else {
        console.log();
        return false;
      }
    }
    /**
         * 
         * @param {string|number} number1 
         * @param {string|number} number2 
         * @returns {boolean}
         * @method greaterOrEqualThan Compare the first parameter with the second to find out if the first parameter is greater than or equal to the second parameter.
         */
  }, {
    key: "greaterOrEqualThan",
    value: function greaterOrEqualThan(number1, number2) {
      if (this.isEqualTo(number1, number2)) {
        return true;
      } else {
        return this.greaterThan(number1, number2);
      }
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method lessOrEqualThan Compare the first parameter with the second to find out if the first parameter is less than or equal to the second parameter.
     */
  }, {
    key: "lessOrEqualThan",
    value: function lessOrEqualThan(number1, number2) {
      if (this.isEqualTo(number1, number2)) {
        return true;
      } else {
        return !this.greaterThan(number1, number2);
      }
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isNaNDecimal It detects if a number is not a valid decimal, that is, it does not have more than a decimal point, that it has decimal values after the point and does not have Nan type characters.
     */
  }, {
    key: "isNaNDecimal",
    value: function isNaNDecimal(number) {
      var tempDotMark = false;
      return String(number).split('').some(function (digit, index, thisArr) {
        if (!tempDotMark) {
          if (digit === '.') {
            tempDotMark = true;
            if (thisArr[index + 1] === undefined) {
              return true;
            }
          } else {
            return isNaN(digit);
          }
        } else {
          return isNaN(digit);
        }
      });
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isDecimal It detects if a number is decimal, that is, if it is not "NaNDecimal" and has decimal values.
     */
  }, {
    key: "isDecimal",
    value: function isDecimal(number) {
      if (!this.isNaNDecimal(number) && String(number).split('').some(function (digit) {
        return digit === '.';
      })) {
        return true;
      } else {
        return false;
      }
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isSafeInteger Detects if a number is an integer between the safe range of JavaScript for integers, starting from the smallest safe to the largest.
     */
  }, {
    key: "isSafeInteger",
    value: function isSafeInteger(number) {
      return this.greaterOrEqualThan(number, Number.MIN_SAFE_INTEGER) && this.lessOrEqualThan(number, Number.MAX_SAFE_INTEGER);
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string|number} number the number to convert to decimal base
     * @param {string|number} radix the base of the number 
     * @method baseToDecimal This method convert a number from any base to a decimal number.
     * @returns {string} The converted number to decimal
     */
  }, {
    key: "baseToDecimal",
    value: function baseToDecimal(number, radix) {
      return new converter(number, radix).toDecimal();
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string|number} decimal The decimal number to convert
     * @param {string|number} toRadix The base to convert the decimal number
     * @method decimalToBase This method convert a decimal number to other base.
     * @returns {string} The converted decimal number to other base 
     */
  }, {
    key: "decimalToBase",
    value: function decimalToBase(decimal, toRadix) {
      return new converter(decimal, '10').toCustomBase(toRadix);
    }
  }]);
  return bigDecimal;
}();
console.log(bigDecimal.fromBinary('1101'));
module.exports = bigDecimal;