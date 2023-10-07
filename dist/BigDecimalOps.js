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
var isValidNumber = require("./IsValidNumber");
var getComposition = require("./getComposition");
var CustomError = require("./CustomError");
var isPeriodic = require("./periodicDecimalFinder");
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
var _conf = /*#__PURE__*/new WeakMap();
var bigDecimal = /*#__PURE__*/function () {
  /**
   * BigDecimal constructor
   * @param {string | number} initilizedResult 
   * @param {{maxDecimals:number|undefined,periodicDecimalsLimit:number|undefined,infinitSaver:number|undefined,divideByZero:{return:any|undefined,error:{throw:boolean,message:string}}}} confs 
   * @returns {bigDecimal} The initilized BigDecimal
   * @public
   */
  function bigDecimal(initilizedResult, confs) {
    var _this = this;
    _classCallCheck(this, bigDecimal);
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: null
    });
    _classPrivateFieldInitSpec(this, _record, {
      writable: true,
      value: null
    });
    /**@type {{maxDecimals:number|undefined,periodicDecimalsLimit:number|undefined,infinitSaver:number|undefined,divideByZero:{return:any|undefined,error:{throw:boolean,message:string}}}} */
    _classPrivateFieldInitSpec(this, _conf, {
      writable: true,
      value: Object
    });
    isValidNumber(String(initilizedResult));
    _classPrivateFieldSet(this, _result, String(initilizedResult));
    _classPrivateFieldSet(this, _record, {
      currentValue: 0,
      operations: []
    });
    _classPrivateFieldSet(this, _conf, {
      maxDecimals: Infinity,
      periodicDecimalsLimit: 50,
      infinitSaver: 500,
      divideByZero: {
        "return": Infinity,
        error: {
          "throw": false,
          message: 'You cant divide a dividend by divisor zero'
        }
      }
    });
    Object.keys(confs || {}).forEach(function (key) {
      if (_typeof(confs[key]) === 'object') {
        Object.keys(confs[key]).forEach(function (key2) {
          _classPrivateFieldGet(_this, _conf)[key][key2] = confs[key][key2];
        });
      } else {
        _classPrivateFieldGet(_this, _conf)[key] = confs[key];
      }
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
     * @param {{justReturn,number2}} conf confs, dont touch it HAHA
     * @method Addition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method and sets the result of the operation as the current value
     */
    function Addition(stringDecimal, conf) {
      isValidNumber(String(stringDecimal));
      if (conf !== null && conf !== void 0 && conf.number2) {
        isValidNumber(String(conf.number2));
      }
      var from = _classPrivateFieldGet(this, _result);
      var numbers = {
        n1: conf !== null && conf !== void 0 && conf.number2 ? getComposition(String(conf === null || conf === void 0 ? void 0 : conf.number2)) : getComposition(_classPrivateFieldGet(this, _result)),
        n2: getComposition(String(stringDecimal))
      };
      var result = [[], [], []];
      //some one of the two numbers are negative
      if (numbers.n1.sign === '-' && numbers.n2.sign === '' || numbers.n1.sign === '' && numbers.n2.sign === '-') {
        var negative = numbers.n1.sign === '-' ? 1 : 2;
        var willbenegative = negative === 1 ? bigDecimal.greaterThan(numbers.n1.complete, numbers.n2.complete) : bigDecimal.greaterThan(numbers.n2.complete, numbers.n1.complete);
        var biger = willbenegative ? negative === 1 ? 1 : 2 : negative === 1 ? 2 : 1;
        var smaller = willbenegative ? negative === 1 ? 2 : 1 : negative === 1 ? 1 : 2;
        var decimalWillbenegative = negative === 1 ? bigDecimal.greaterThan('0.' + numbers.n1.decimals.join(''), '0.' + numbers.n2.decimals.join('')) : bigDecimal.greaterThan('0.' + numbers.n2.decimals.join(''), '0.' + numbers.n1.decimals.join(''));
        var decimalBigger = decimalWillbenegative ? negative === 1 ? 1 : 2 : negative === 1 ? 2 : 1;
        var decimalSmaller = decimalWillbenegative ? negative === 1 ? 2 : 1 : negative === 1 ? 1 : 2;
        var carry = 0;
        if (willbenegative) {
          result[0] = '-';
        }
        if (numbers.n1.decimals.length != numbers.n2.decimals.length) {
          var greaterLength = Math.max(numbers.n1.decimals.length, numbers.n2.decimals.length);
          while (numbers.n1.decimals.length < greaterLength) {
            numbers.n1.decimals.push(0);
          }
          while (numbers.n2.decimals.length < greaterLength) {
            numbers.n2.decimals.push(0);
          }
        }
        numbers.n1.decimals.reverse();
        numbers.n2.decimals.reverse();
        numbers['n' + decimalBigger].decimals.forEach(function (digit, index) {
          var number1 = Number(digit);
          var number2 = Number(numbers['n' + decimalSmaller].decimals[index]);
          var subtraction = number1 - number2 - carry;
          if (subtraction < 0) {
            subtraction = subtraction + 10;
            carry = 1;
          } else {
            carry = 0;
          }
          result[2].push(subtraction);
        });
        result[2] = result[2].reverse();
        numbers.n1.ints.reverse();
        numbers.n2.ints.reverse();
        numbers['n' + biger].ints.forEach(function (digit, index) {
          var number1 = Number(digit);
          var number2 = Number(numbers['n' + smaller].ints[index] || 0);
          var subtraction = number1 - number2 - carry;
          if (subtraction < 0) {
            subtraction = subtraction + 10;
            carry = 1;
          } else {
            carry = 0;
          }
          result[1].push(subtraction);
        });
        carry = 0;
        result[1] = result[1].reverse();
        while (result[1][0] == 0 && result[1].length > 1) {
          result[1].shift();
        }
        if (!willbenegative && decimalWillbenegative) {
          var decimalslength = result[2].length;
          result[1][result[1].length - 1] = result[1][result[1].length - 1] - 1;
          var takeCarry = [1];
          for (var i = 0; i < decimalslength; i++) {
            takeCarry.push(0);
          }
          var subresult = [];
          result[2].reverse();
          takeCarry.reverse().forEach(function (digit, index) {
            var number1 = Number(digit);
            var number2 = Number(result[2][index] || 0);
            var subtraction = number1 - number2 - carry;
            if (subtraction < 0) {
              subtraction = subtraction + 10;
              carry = 1;
            } else {
              carry = 0;
            }
            subresult.push(subtraction);
          });
          while (subresult[subresult.length - 1] === 0) {
            subresult.pop();
          }
          subresult.reverse();
          result[2] = subresult;
        }
        result[1].reverse();
      } else {
        if (numbers.n1.sign === '-' && numbers.n2.sign === '-') {
          result[0] = '-';
        }
        var _carry = 0;
        if (numbers.n1.decimals.length != numbers.n2.decimals.length) {
          var _greaterLength = Math.max(numbers.n1.decimals.length, numbers.n2.decimals.length);
          while (numbers.n1.decimals.length < _greaterLength) {
            numbers.n1.decimals.push(0);
          }
          while (numbers.n2.decimals.length < _greaterLength) {
            numbers.n2.decimals.push(0);
          }
        }
        if (numbers.n1.ints.length != numbers.n2.ints.length) {
          var _greaterLength2 = Math.max(numbers.n1.ints.length, numbers.n2.ints.length);
          while (numbers.n1.ints.length < _greaterLength2) {
            numbers.n1.ints.unshift(0);
          }
          while (numbers.n2.ints.length < _greaterLength2) {
            numbers.n2.ints.unshift(0);
          }
        }
        numbers.n1.decimals.reverse();
        numbers.n2.decimals.reverse();
        numbers.n1.decimals.forEach(function (digit, index) {
          var number1 = Number(digit);
          var number2 = Number(numbers.n2.decimals[index]);
          var addition = number1 + number2 + _carry;
          if (addition > 9) {
            addition = addition - 10;
            _carry = 1;
          } else {
            _carry = 0;
          }
          result[2].push(addition);
        });
        result[2] = result[2].reverse();
        numbers.n1.ints.reverse();
        numbers.n2.ints.reverse();
        numbers.n1.ints.forEach(function (digit, index) {
          var number1 = Number(digit);
          var number2 = Number(numbers.n2.ints[index] || 0);
          var addition = number1 + number2 + _carry;
          var push = true;
          if (addition > 9) {
            if (numbers.n1.ints[index + 1] != undefined) {
              addition = addition - 10;
              _carry = 1;
            } else {
              push = false;
              result[1] = [result[1], addition].flat();
            }
          } else {
            _carry = 0;
          }
          if (push) {
            result[1].push(addition);
          }
        });
      }
      result[1] = result[1].reverse();
      while (result[1][0] === 0) {
        result[1].shift();
      }
      if (result[1][0] === undefined) {
        result[1].push(0);
      }
      while (result[2][result[2].length - 1] === 0) {
        result[2].pop();
      }
      if (conf !== null && conf !== void 0 && conf.justReturn) {
        return "".concat(result[0]).concat(result[1].join('')).concat(result[2].length === 0 ? '' : '.').concat(result[2].length === 0 ? '' : result[2].join(''));
      } else {
        _classPrivateFieldSet(this, _result, "".concat(result[0]).concat(result[1].join('')).concat(result[2].length === 0 ? '' : '.').concat(result[2].length === 0 ? '' : result[2].join('')));
        _classPrivateFieldGet(this, _record).operations.push({
          type: 'Addition',
          from: from,
          adding: stringDecimal,
          result: _classPrivateFieldGet(this, _result)
        });
        return this;
      }
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
      var result = this.Addition(stringDecimal, {
        justReturn: true
      });
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
      var from = _classPrivateFieldGet(this, _result);
      var result = this.ReturnSubtraction(string1);
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
      var numbers = {
        n1: getComposition(_classPrivateFieldGet(this, _result)),
        n2: getComposition(String(string1))
      };
      var result;
      if (numbers.n1.sign === '-' && numbers.n2.sign === '' || numbers.n1.sign === '' && numbers.n2.sign === '-') {
        var sign = numbers.n1.sign === '-' ? '-' : '';
        result = "".concat(sign).concat(this.Addition(numbers.n1.complete, {
          justReturn: true,
          number2: numbers.n2.complete
        }));
      } else if (numbers.n1.sign === '-' && numbers.n2.sign === '-') {
        var greaterNumber = bigDecimal.greaterThan(numbers.n1.complete, numbers.n2.complete) ? 1 : bigDecimal.greaterThan(numbers.n2.complete, numbers.n1.complete) ? 2 : 0;
        result = greaterNumber === 0 ? '0' : "".concat(greaterNumber === 1 ? '-' : '').concat(this.Addition("".concat(greaterNumber === 1 ? '' : '-').concat(numbers.n1.complete), {
          justReturn: true,
          number2: "".concat(greaterNumber === 1 ? '-' : '').concat(numbers.n2.complete)
        }));
      } else {
        var _greaterNumber = bigDecimal.greaterThan(numbers.n1.complete, numbers.n2.complete) ? 1 : bigDecimal.greaterThan(numbers.n2.complete, numbers.n1.complete) ? 2 : 0;
        result = _greaterNumber === 0 ? '0' : "".concat(_greaterNumber === 1 ? '' : _greaterNumber === 2 ? '-' : '').concat(this.Addition("".concat(_greaterNumber === 1 ? '' : '-').concat(numbers.n1.complete), {
          justReturn: true,
          number2: "".concat(_greaterNumber === 1 ? '-' : '').concat(numbers.n2.complete)
        }));
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
      var from = _classPrivateFieldGet(this, _result);
      var result = this.ReturnMultiplication(number);
      _classPrivateFieldSet(this, _result, result);
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
      var _classPrivateFieldGet2, _String$split$;
      isValidNumber(String(number));
      var decimalsCount = ((_classPrivateFieldGet2 = _classPrivateFieldGet(this, _result).split('.')[1]) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.length) || 0 + ((_String$split$ = String(number).split('.')[1]) === null || _String$split$ === void 0 ? void 0 : _String$split$.length) || 0;
      var numbers = {
        n1: getComposition(String(_classPrivateFieldGet(this, _result))),
        n2: getComposition(String(number))
      };
      var sign = numbers.n1.sign === numbers.n2.sign ? '' : '-';
      var result = [sign, ''];
      var mult = function mult(number, factor) {
        var result = (BigInt(number) * BigInt(factor)).toString();
        return result;
      };
      var num1 = numbers.n1.decimals.some(function (digit) {
        return digit != 0;
      }) ? numbers.n1.complete.split('.').join('') : numbers.n1.ints.join('');
      var num2 = numbers.n2.decimals.some(function (digit) {
        return digit != 0;
      }) ? numbers.n2.complete.split('.').join('') : numbers.n2.ints.join('');
      var Operation = mult(num1, num2);
      result[1] = numbers.n1.decimals.some(function (digit) {
        return digit != '0';
      }) || numbers.n2.decimals.some(function (digit) {
        return digit != '0';
      }) ? "".concat(Operation.slice(0, Operation.length - decimalsCount)).concat(Operation.slice(Operation.length - decimalsCount).split('').some(function (digit) {
        return digit !== '0';
      }) ? '.' + Operation.slice(Operation.length - decimalsCount) : '') : Operation;
      return result.join('');
    }
  }, {
    key: "Division",
    value: function Division(number) {
      var from = _classPrivateFieldGet(this, _result);
      _classPrivateFieldSet(this, _result, this.ReturnDivision(number));
      _classPrivateFieldGet(this, _record).operations.push({
        type: 'Division',
        from: from,
        by: number,
        result: _classPrivateFieldGet(this, _result)
      });
      return this;
    }
  }, {
    key: "ReturnDivision",
    value: function ReturnDivision(number) {
      var numbers = {
        n1: getComposition(String(_classPrivateFieldGet(this, _result))),
        n2: getComposition(String(number))
      };
      if (numbers.n1.complete === '0.0' || numbers.n2.complete === '0.0') {
        if (_classPrivateFieldGet(this, _conf).divideByZero.error["throw"]) {
          var divideByZero = new CustomError({
            name: 'DivideByZero',
            message: _classPrivateFieldGet(this, _conf).divideByZero.error.message || 'You cant divide a dividend by divisor zero'
          });
          throw divideByZero;
        }
        if (_classPrivateFieldGet(this, _conf).divideByZero["return"]) {
          return _classPrivateFieldGet(this, _conf).divideByZero["return"];
        } else {
          return Infinity;
        }
      }
      // Manejo de signos
      var isPositiveResult = numbers.n1.sign === '' && numbers.n2.sign === '' || numbers.n1.sign === '-' && numbers.n2.sign === '-';
      var quotient = division(numbers.n1.complete, numbers.n2.complete);
      var difference = new bigDecimal(getDiff(numbers.n1.complete, numbers.n2.complete, quotient));
      var result = [isPositiveResult ? '' : '-', quotient, bigDecimal.greaterThan(difference.Return(), 0) ? '.' : '', []];
      var reps = 0;
      var divisor = numbers.n2;
      while (bigDecimal.greaterThan(difference.Return(), 0) && reps <= _classPrivateFieldGet(this, _conf).maxDecimals / 2) {
        var _difference$Return$sp;
        reps++;
        var amplificator = ['1', '0'];
        var differenceDecimalsLength = ((_difference$Return$sp = difference.Return().split('.')[1]) === null || _difference$Return$sp === void 0 ? void 0 : _difference$Return$sp.length) || 0;
        for (var i = 0; i < differenceDecimalsLength; i++) {
          amplificator.push('0');
        }
        difference.Multiplication(amplificator.join(''));
        var remainder = void 0;
        var decimalLength = divisor.decimals.length;
        if (divisor.decimals.some(function (digit) {
          return digit != '0';
        })) {
          var _amplificator = ['1'];
          for (var _i = 0; _i < decimalLength; _i++) {
            _amplificator.push('0');
          }
          difference.Multiplication(_amplificator.join(''));
          var _divisor = new bigDecimal(numbers.n2.complete).ReturnMultiplication(_amplificator.join(''));
          remainder = (BigInt(difference.Return()) / BigInt(_divisor)).toString().split('');
          difference = new bigDecimal(getDiff(difference.Return(), _divisor, remainder.join('')));
        } else {
          remainder = division(difference.Return(), numbers.n2.ints.join('')).split('');
          difference = new bigDecimal(getDiff(difference.Return(), numbers.n2.ints.join(''), remainder.join('')));
        }
        remainder = remainder.join('');
        result[3].push(remainder);
        if (_classPrivateFieldGet(this, _conf).maxDecimals === Infinity) {
          var decimalsCount = result[3].join('').split('').length;
          if (decimalsCount >= _classPrivateFieldGet(this, _conf).periodicDecimalsLimit) {
            if (isPeriodic(result[3])) {
              break;
            }
          }
          if (reps >= _classPrivateFieldGet(this, _conf).infinitSaver) {
            break;
          }
        }
      }
      return result.flat().join('');
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
      var result = radix ? new converter(_classPrivateFieldGet(this, _result), '10').toCustomBase(String(radix)) : _classPrivateFieldGet(this, _result);
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
     * @param {('binary'|'octal'|'decimal'|'hexadecimal'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36')} radix the base of the number you will pass to convert it to decimal base
     * @method SetBigInteger set the current value with the number you pass as a parameter and delete records
     * @returns {bigDecimal}
     */
  }, {
    key: "SetBigDecimal",
    value: function SetBigDecimal(number, radix) {
      var decimal = radix ? new converter(number, String(radix)).toDecimal() : number;
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
      return bigDecimal.isEqualTo(_classPrivateFieldGet(this, _result), number);
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
      return bigDecimal.greaterOrEqualThan(_classPrivateFieldGet(this, _result), number);
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
      return bigDecimal.lessOrEqualThan(_classPrivateFieldGet(this, _result), number);
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
      var basenumber = new converter(number, String(base));
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
          }
          if (num1.ints[0] > num2.ints[0]) {
            return false;
          } else if (num1.ints[0] < num2.ints[0]) {
            return true;
          } else if (num1.ints.length == num2.ints.length && num1.ints[0] == num2.ints[0]) {
            var tempToReturn = false;
            var tempMark = false;
            num1.ints.forEach(function (digit, index) {
              if (digit !== num2.ints[index] && !tempMark) {
                if (digit < num2.ints[index]) {
                  tempToReturn = true;
                  tempMark = true;
                } else {
                  tempMark = true;
                }
              }
            });
            if (tempToReturn) {
              return tempToReturn;
            } else {
              return false;
            }
          }
        } else {
          if (!this.isEqualTo("0." + num1.decimals.join(''), "0." + num2.decimals.join(''))) {
            if (num1.decimals[0] < num2.decimals[0]) {
              return true;
            } else if (num1.decimals[0] > num2.decimals[0]) {
              return false;
            } else if (num1.decimals[0] == num2.decimals[0]) {
              var _tempToReturn = false;
              var _tempMark = false;
              num1.decimals.forEach(function (digit, index) {
                if (digit !== num2.decimals[index] && !_tempMark) {
                  if (digit < num2.decimals[index]) {
                    _tempToReturn = true;
                    _tempMark = true;
                  } else {
                    _tempMark = true;
                  }
                }
              });
              if (_tempToReturn) {
                return _tempToReturn;
              } else {
                return false;
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
          }
          if (num1.ints[0] > num2.ints[0]) {
            return true;
          } else if (num1.ints[0] < num2.ints[0]) {
            return false;
          } else if (num1.ints[0] == num2.ints[0]) {
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
              return _tempToReturn2;
            } else {
              return false;
            }
          }
        } else {
          if (!this.isEqualTo("0." + num1.decimals.join(''), "0." + num2.decimals.join(''))) {
            var _ref;
            if ((_ref = num1.decimals[0] > num2.decimals[0]) !== null && _ref !== void 0 ? _ref : 0) {
              return true;
            } else if (num1.decimals[0] < num2.decimals[0]) {
              return false;
            } else if (num1.decimals[0] > num2.decimals[0]) {
              return true;
            } else if (num1.decimals[0] == num2.decimals[0]) {
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
      var _String$split$2, _String$split$3;
      var num1 = {
        ints: String(number1).split('.')[0].split(''),
        decimals: ((_String$split$2 = String(number1).split('.')[1]) === null || _String$split$2 === void 0 ? void 0 : _String$split$2.split('')) || [0]
      };
      var num2 = {
        ints: String(number2).split('.')[0].split(''),
        decimals: ((_String$split$3 = String(number2).split('.')[1]) === null || _String$split$3 === void 0 ? void 0 : _String$split$3.split('')) || [0]
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
      return new converter(number, String(radix)).toDecimal();
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
      return new converter(decimal, '10').toCustomBase(String(toRadix));
    }
  }]);
  return bigDecimal;
}();
function division(number1, number2) {
  var numbers = {
    n1: getComposition(String(number1)),
    n2: getComposition(String(number2))
  };
  // Manejo de signos
  // const isPositiveResult = (numbers.n1.sign === '' && numbers.n2.sign === '') || (numbers.n1.sign === '-' && numbers.n1.sign === '-');
  // Convierte dividendos y divisores en positivos para simplificar la división
  var dividend = new bigDecimal(numbers.n1.complete);
  var divisor = new bigDecimal(numbers.n2.complete);
  var isDecimal = bigDecimal.isDecimal(numbers.n1.complete) || bigDecimal.isDecimal(numbers.n2.complete);
  if (isDecimal) {
    var greaterDecimalLength = numbers.n1.decimals.some(function (digit) {
      return digit != '0';
    }) || numbers.n2.decimals.some(function (digit) {
      return digit != '0';
    }) ? Math.max(numbers.n1.decimals.length, numbers.n2.decimals.length) : 0;
    var amplificator = ['1'];
    for (var i = 0; i < greaterDecimalLength; i++) {
      amplificator.push('0');
    }
    dividend = BigInt(dividend.Multiplication(amplificator.join('')).Return());
    divisor = BigInt(divisor.Multiplication(amplificator.join('')).Return());
  }
  var result = dividend / divisor;
  return result.toString();
}
function getDiff(dividend, divisor, quotient) {
  var difference = new bigDecimal(dividend).Subtraction(new bigDecimal(divisor).ReturnMultiplication(quotient));
  return difference.Return();
}
module.exports = bigDecimal;