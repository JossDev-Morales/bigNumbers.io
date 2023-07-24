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
var _result = /*#__PURE__*/new WeakMap();
var _record = /*#__PURE__*/new WeakMap();
/**
 * @class representation of a big integer that exceeds the javascript limit
 * @description Use this class to represent a very large integer, if your number supports javascript integers, use vanilla integer number, this BigInteger is based on the bigInt type.
 * @example
 * //19999999999999999 its an integer that exceeds the javascript limit
 * const MyBigIntegerNumber = new BigInteger("19999999999999999").Addition(1)
 * console.log(MyBigIntegerNumber.Return())//20000000000000000 
 * @public 
 */
var bigInteger = /*#__PURE__*/function () {
  /**
   * 
   * @param {string | number} initilizedValue
   * @returns  The initilized BigInteger  
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
   * 
   * @param {string|number} number 
   * @method Addition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method and sets the result of the operation as the current value
   */
  _createClass(bigInteger, [{
    key: "Addition",
    value: function Addition(number) {
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
     * @param {string|number} number
     * @method ReturnAddition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method
     * @returns {string} the result of the operation as a string
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
     * @param {string|number} number 
     * @method Subtraction subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method and sets the result of the operation as the current value
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
     * @param {string|number} number
     * @method ReturnSubtraction subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method
     * @returns {string} the result of the operation as a string 
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
     * @param {string|number} number 
     * @method Multiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value
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
     * @param {string|number} number 
     * @method ReturnMultiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method 
     * @returns {string} the result of the operation as a string 
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
     * @param {string|number} number 
     * @method Division divides the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value.
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
     * @param {string|number} number 
     * @method ReturnDivision divides the number corresponding to the current value by the number you pass as a parameter to this method
     * @returns {string} the result of the operation as a string
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
     * @method Return 
     * @returns {string} the current value as a string
     */
  }, {
    key: "Return",
    value: function Return() {
      var result = _classPrivateFieldGet(this, _result).toString();
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
    }
    /**
     * 
     * @param {string|number} number 
     * @method SetBigInteger set the current value with the number you pass as a parameter
     */
  }, {
    key: "SetBigInteger",
    value: function SetBigInteger(number) {
      if (String(number).split('.')[1]) {
        throw new Error("The number ".concat(number, " its an invalid integer type, if you need to use a decimal number, use BigDecimal"));
      }
      _classPrivateFieldSet(this, _result, BigInt(number));
    }
  }]);
  return bigInteger;
}();
module.exports = bigInteger;