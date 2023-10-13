"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
/**
 * @class representation of a big integer that exceeds the javascript limit
 * @description Use this class to represent a very large integer, if your number supports javascript integers, use vanilla integer number, this BigInteger is based on the bigInt type.
 * @example
 * //19999999999999999 its an integer that exceeds the javascript limit
 * const MyBigIntegerNumber = new BigInteger("19999999999999999").Addition(1)
 * console.log(MyBigIntegerNumber.Return())//20000000000000000 
 * @public 
 */
var _result = /*#__PURE__*/new WeakMap();
var _record = /*#__PURE__*/new WeakMap();
var bigInteger = /*#__PURE__*/function () {
  /**
   * 
   * @param {string | number} initilizedValue
   * @returns {bigInteger} The initilized BigInteger  
   */
  function bigInteger(initilizedValue) {
    _classCallCheck(this, bigInteger);
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _record, {
      writable: true,
      value: null
    });
    if (String(initilizedValue).split('.')[1]) {
      throw new Error("The number ".concat(initilizedValue, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
    }
    _classPrivateFieldSet(this, _result, BigInt(initilizedValue || 0));
    _classPrivateFieldSet(this, _record, {
      currentValue: 0,
      operations: []
    });
  }
  /**
   * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
   * @param {string} Binary Number in binary base
   * @returns {bigInteger} 
   */
  _createClass(bigInteger, [{
    key: "Addition",
    value:
    /**
     * 
     * @param {string|number} number Number to add to the current value
     * @method Addition Adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method and sets the result of the operation as the current value
     */
    function Addition(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      var from = _classPrivateFieldGet(this, _result);
      _classPrivateFieldSet(this, _result, _classPrivateFieldGet(this, _result) + BigInt(number));
      _classPrivateFieldGet(this, _record).operations.push({
        type: 'Addition',
        from: from,
        adding: number,
        result: _classPrivateFieldGet(this, _result)
      });
      return this;
    }
    /**
     * 
     * @param {string|number} number Number to add to the current value
     * @method ReturnAddition Adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method
     * @returns {string} The result of the operation as a string
     */
  }, {
    key: "ReturnAddition",
    value: function ReturnAddition(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      return BigInt(_classPrivateFieldGet(this, _result) + BigInt(number)).toString();
    }
    /**
     * 
     * @param {string|number} number Number to subtract the current value
     * @method Subtraction Subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method and sets the result of the operation as the current value
       */
  }, {
    key: "Subtraction",
    value: function Subtraction(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      var from = _classPrivateFieldGet(this, _result);
      _classPrivateFieldSet(this, _result, _classPrivateFieldGet(this, _result) - BigInt(number));
      _classPrivateFieldGet(this, _record).operations.push({
        type: 'Subtraction',
        from: from,
        substracting: number,
        result: _classPrivateFieldGet(this, _result)
      });
      return this;
    }
    /**
     * 
     * @param {string|number} number Number to subtract the current value
     * @method ReturnSubtraction Subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method
     * @returns {string} The result of the operation as a string 
     */
  }, {
    key: "ReturnSubtraction",
    value: function ReturnSubtraction(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      return BigInt(_classPrivateFieldGet(this, _result) - BigInt(number)).toString();
    }
    /**
     * 
     * @param {string|number} number Number to multiply
     * @method Multiplication Multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value
     */
  }, {
    key: "Multiplication",
    value: function Multiplication(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      var from = _classPrivateFieldGet(this, _result);
      _classPrivateFieldSet(this, _result, _classPrivateFieldGet(this, _result) * BigInt(number));
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
     * @param {string|number} number Number to multiply
     * @method ReturnMultiplication Multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method 
     * @returns {string} The result of the operation as a string 
     */
  }, {
    key: "ReturnMultiplication",
    value: function ReturnMultiplication(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      return BigInt(_classPrivateFieldGet(this, _result) * BigInt(number)).toString();
    }
    /**
     * 
     * @param {string|number} number Number to divide the current value
     * @method Division Divides the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value.
     */
  }, {
    key: "Division",
    value: function Division(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      var from = _classPrivateFieldGet(this, _result);
      _classPrivateFieldSet(this, _result, BigInt(_classPrivateFieldGet(this, _result) / BigInt(number)));
      _classPrivateFieldGet(this, _record).operations.push({
        type: 'Multiplication',
        from: from,
        "in": number,
        result: _classPrivateFieldGet(this, _result)
      });
      return this;
    }
    /**
     * 
     * @param {string|number} number Number to divide the current value
     * @method ReturnDivision Divides the number corresponding to the current value by the number you pass as a parameter to this method
     * @returns {string} The result of the operation as a string
     */
  }, {
    key: "ReturnDivision",
    value: function ReturnDivision(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      return BigInt(_classPrivateFieldGet(this, _result) / BigInt(number)).toString();
    }
    /**
     * 
     * @param {string|number} number number to get module or remainder 
     * @method Module Get the residue of dividing the current value by the number you pass as a parameter
     */
  }, {
    key: "Module",
    value: function Module(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      var from = _classPrivateFieldGet(this, _result);
      _classPrivateFieldSet(this, _result, BigInt(this.ReturnModule(number)));
      _classPrivateFieldGet(this, _record).operations.push({
        type: 'Module',
        from: from,
        of: number,
        result: _classPrivateFieldGet(this, _result)
      });
      return this;
    }
    /**
    * 
    * @param {string|number} number number to get module or remainder 
    * @method Module Get the remainder of dividing the current value by the number you pass as a parameter
    * @returns {string} The remainder of the operation as a string
    */
  }, {
    key: "ReturnModule",
    value: function ReturnModule(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      return (BigInt(_classPrivateFieldGet(this, _result)) % BigInt(number)).toString();
    }
  }, {
    key: "Power",
    value: function Power(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      var from = _classPrivateFieldGet(this, _result);
      _classPrivateFieldSet(this, _result, BigInt(this.ReturnPower(number)));
      _classPrivateFieldGet(this, _record).operations.push({
        type: 'Power',
        from: from,
        elevatedTo: number,
        result: _classPrivateFieldGet(this, _result)
      });
      return this;
    }
  }, {
    key: "ReturnPower",
    value: function ReturnPower(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      return Math.pow(BigInt(_classPrivateFieldGet(this, _result)), BigInt(number)).toString();
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {('binary'|'octal'|'decimal'|'hexadecimal'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36')} radix The numeric base to convert the current value
     * @method Return 
     * @returns {string} The current value as a string
     */
  }, {
    key: "Return",
    value: function Return(radix) {
      var result = radix ? new converter(_classPrivateFieldGet(this, _result).toString(), '10').toCustomBase(String(radix)) : _classPrivateFieldGet(this, _result).toString();
      return result;
    }
    /**
     * 
     * @returns {object} A log of all operations since the previous record reset
     */
  }, {
    key: "GetRecord",
    value: function GetRecord() {
      _classPrivateFieldGet(this, _record).currentValue = _classPrivateFieldGet(this, _result);
      return _classPrivateFieldGet(this, _record);
    }
    /**
     * @method ClearRecord Resets the log of operations so far
     */
  }, {
    key: "ClearRecord",
    value: function ClearRecord() {
      _classPrivateFieldGet(this, _record).operations = [];
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string|number} number Number to set the current value
     * @param {('binary'|'octal'|'decimal'|'hexadecimal'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36')} radix The base of the number you will pass to convert it to decimal base
     * @method SetBigInteger Set the current value with the number you pass as a parameter
     * @returns {bigInteger}
     */
  }, {
    key: "SetBigInteger",
    value: function SetBigInteger(number, radix) {
      var basenumber = radix ? new converter(number, String(radix)).toDecimal() : number;
      if (String(basenumber).split('.')[1]) {
        throw new Error("The number ".concat(basenumber, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      _classPrivateFieldSet(this, _result, BigInt(basenumber));
      this.ClearRecord();
      return this;
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method gt Compare the current value of the "BigInteger" with a number received as a parameter to know if the current value is greater than this.
     */
  }, {
    key: "gt",
    value: function gt(number) {
      return BigInt(_classPrivateFieldGet(this, _result)) > BigInt(number);
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lt Compare the current value of the "BigInteger" with a number received as a parameter to know if the current value is less than this.
     */
  }, {
    key: "lt",
    value: function lt(number) {
      return BigInt(_classPrivateFieldGet(this, _result)) < BigInt(number);
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method eq Compare the current value of the "BigInteger" with a number received as a parameter to know if the current value is the same as this.
     */
  }, {
    key: "eq",
    value: function eq(number) {
      return BigInt(_classPrivateFieldGet(this, _result)) === BigInt(number);
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method gte Compare the current value of the "BigInteger" with a number received as a parameter to know if the current value is greater than or equal to this.
     */
  }, {
    key: "gte",
    value: function gte(number) {
      return BigInt(_classPrivateFieldGet(this, _result)) >= BigInt(number);
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lte compara The current value of the "BigInteger" with a number received as a parameter to know if the current value is less than or equal to this.
     */
  }, {
    key: "lte",
    value: function lte(number) {
      return BigInt(_classPrivateFieldGet(this, _result)) <= BigInt(number);
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
     * @param {string} octal Number in octal base
     * @returns {bigInteger}
     */
  }, {
    key: "fromOctal",
    value: function fromOctal(octal) {
      var octalnumber = new converter(octal, '8');
      return new this(octalnumber.toDecimal());
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string} hexadecimal Number in hexadecimal base
     * @returns {bigInteger}
     */
  }, {
    key: "fromHexadecimal",
    value: function fromHexadecimal(hexadecimal) {
      var hexanumber = new converter(hexadecimal, '16');
      return new this(hexanumber.toDecimal());
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string} number Number in some base betwen 2 and 36
     * @param {string} base The base of the number
     * @returns {bigInteger}
     */
  }, {
    key: "fromOtherBase",
    value: function fromOtherBase(number, base) {
      var basenumber = new converter(number, String(base));
      return new this(basenumber.toDecimal());
    }
  }, {
    key: "greaterThan",
    value: function greaterThan(number1, number2) {
      return BigInt(number1) > BigInt(number2);
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
      return BigInt(number1) < BigInt(number2);
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
      return BigInt(number1) === BigInt(number2);
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
      return BigInt(number1) >= BigInt(number2);
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
      return BigInt(number1) <= BigInt(number2);
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isNaNInt It detects if a number is not a valid integer, that is, with a decimal point or a strange character equivalent to the NAN value.
     */
  }, {
    key: "isNaNInt",
    value: function isNaNInt(number) {
      return String(number).split('').some(function (digit) {
        return isNaN(digit);
      });
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
     * @param {string|number} number The number to convert to decimal base
     * @param {string|number} radix The base of the number 
     * @returns 
     */
  }, {
    key: "baseToDecimal",
    value: function baseToDecimal(number, radix) {
      return new converter(number, String(radix)).toDecimal();
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string|number} decimal The decimal number to convert
     * @param {string|number} toRadix The base to convert the decimal number
     * @returns 
     */
  }, {
    key: "decimalToBase",
    value: function decimalToBase(decimal, toRadix) {
      return new converter(decimal, '10').toCustomBase(String(toRadix));
    }
  }]);
  return bigInteger;
}();
module.exports = bigInteger;