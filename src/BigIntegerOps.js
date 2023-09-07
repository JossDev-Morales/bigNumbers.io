const { converter } = require("number-converter.io")
/**
 * @class representation of a big integer that exceeds the javascript limit
 * @description Use this class to represent a very large integer, if your number supports javascript integers, use vanilla integer number, this BigInteger is based on the bigInt type.
 * @example
 * //19999999999999999 its an integer that exceeds the javascript limit
 * const MyBigIntegerNumber = new BigInteger("19999999999999999").Addition(1)
 * console.log(MyBigIntegerNumber.Return())//20000000000000000 
 * @public 
 */
class bigInteger {
    #result = null
    #record = null
    /**
     * 
     * @param {string | number} initilizedValue
     * @returns {bigInteger} The initilized BigInteger  
     */
    constructor(initilizedValue) {
        if (String(initilizedValue).split('.')[1]) {
            throw new Error(`The number ${initilizedValue} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        this.#result = BigInt(initilizedValue || 0)
        this.#record = {
            currentValue: 0,
            operations: []
        }
    }
    /**
     * 
     * @param {string} Binary number in binary base
     * @returns {bigInteger} 
     */
    static fromBinary(Binary){
        const binarynumber= new converter(Binary,'2')
        return new this(binarynumber.toDecimal())
    }
    /**
     * 
     * @param {string} octal number in octal base
     * @returns {bigInteger}
     */
    static fromOctal(octal){
        const octalnumber= new converter(octal,'8')
        return new this(octalnumber.toDecimal())
    }
    /**
     * 
     * @param {string} hexadecimal number in hexadecimal base
     * @returns {bigInteger}
     */
    static fromHexadecimal(hexadecimal){
        const hexanumber= new converter(hexadecimal,'16')
        return new this(hexanumber.toDecimal())
    }
    /**
     * 
     * @param {string} number number in some base betwen 2 and 36
     * @param {string} base the base of the number
     * @returns {bigInteger}
     */
    static fromOtherBase(number,base){
        const basenumber= new converter(number,base)
        return new this(basenumber.toDecimal())
    }
    /**
     * 
     * @param {string|number} number number to add to the current value
     * @method Addition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method and sets the result of the operation as the current value
     */
    Addition(number) {
        if (String(number).split('.')[1]) {
            throw new Error(`The number ${number} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        const from = this.#result
        this.#result = this.#result + BigInt(number);
        this.#record.operations.push({ type: 'Addition', from, adding: number, result: this.#result })
        return this;
    }
    /**
     * 
     * @param {string|number} number number to add to the current value
     * @method ReturnAddition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method
     * @returns {string} the result of the operation as a string
     */
    ReturnAddition(number) {
        if (String(number).split('.')[1]) {
            throw new Error(`The number ${number} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        return BigInt(this.#result + BigInt(number)).toString()
    }
    /**
     * 
     * @param {string|number} number number to subtract the current value
     * @method Subtraction subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method and sets the result of the operation as the current value

     */
    Subtraction(number) {
        if (String(number).split('.')[1]) {
            throw new Error(`The number ${number} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        const from = this.#result
        this.#result = this.#result - BigInt(number)
        this.#record.operations.push({ type: 'Subtraction', from, substracting: number, result: this.#result })
        return this;
    }
    /**
     * 
     * @param {string|number} number number to subtract the current value
     * @method ReturnSubtraction subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method
     * @returns {string} the result of the operation as a string 
     */
    ReturnSubtraction(number) {
        if (String(number).split('.')[1]) {
            throw new Error(`The number ${number} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        return BigInt(this.#result - BigInt(number)).toString()
    }
    /**
     * 
     * @param {string|number} number number to multiply
     * @method Multiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value
     */
    Multiplication(number) {
        if (String(number).split('.')[1]) {
            throw new Error(`The number ${number} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        const from = this.#result
        this.#result = this.#result * BigInt(number)
        this.#record.operations.push({ type: 'Multiplication', from, by: number, result: this.#result })
        return this;
    }
    /**
     * 
     * @param {string|number} number number to multiply
     * @method ReturnMultiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method 
     * @returns {string} the result of the operation as a string 
     */
    ReturnMultiplication(number) {
        if (String(number).split('.')[1]) {
            throw new Error(`The number ${number} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        return BigInt(this.#result * BigInt(number)).toString()
    }
    /**
     * 
     * @param {string|number} number number to divide the current value
     * @method Division divides the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value.
     */
    Division(number) {
        if (String(number).split('.')[1]) {
            throw new Error(`The number ${number} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        const from = this.#result
        this.#result = BigInt(this.#result / BigInt(number))
        this.#record.operations.push({ type: 'Multiplication', from, in: number, result: this.#result })
        return this
    }
    /**
     * 
     * @param {string|number} number number to divide the current value
     * @method ReturnDivision divides the number corresponding to the current value by the number you pass as a parameter to this method
     * @returns {string} the result of the operation as a string
     */
    ReturnDivision(number) {
        if (String(number).split('.')[1]) {
            throw new Error(`The number ${number} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        return BigInt(this.#result / BigInt(number)).toString()
    }
    /**
     * @param {('binary'|'octal'|'decimal'|'hexadecimal'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36')} radix the numeric base to convert the current value
     * @method Return 
     * @returns {string} the current value as a string
     */
    Return(radix) {
        const result = radix?new converter(this.#result.toString(),'10').toCustomBase(radix):this.#result.toString()
        return result
    }
    /**
     * 
     * @returns {object} a log of all operations since the previous record reset
     */
    GetRecord() {
        this.#record.currentValue = this.#result
        return this.#record
    }
    /**
     * @method ClearRecord resets the log of operations so far
     */
    ClearRecord() {
        this.#record.operations = []
    }
    /**
     * 
     * @param {string|number} number number to set the current value
     * @param {string|number} radix the base of the number you will pass to convert it to decimal base
     * @method SetBigInteger set the current value with the number you pass as a parameter
     * @returns {bigInteger}
     */
    SetBigInteger(number,radix) {
        const basenumber=radix? new converter(number,radix).toDecimal():number
        if (String(basenumber).split('.')[1]) {
            throw new Error(`The number ${basenumbernumber} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        this.#result = BigInt(basenumber)
        this.ClearRecord()
        return this
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method gt Compare the current value of the "BigInteger" with a number received as a parameter to know if the current value is greater than this.
     */
    gt(number){
        return BigInt(this.#result) > BigInt(number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lt Compare the current value of the "BigInteger" with a number received as a parameter to know if the current value is less than this.
     */
    lt(number){
        return BigInt(this.#result) < BigInt(number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method eq Compare the current value of the "BigInteger" with a number received as a parameter to know if the current value is the same as this.
     */
    eq(number){
        return BigInt(this.#result) === BigInt(number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method gte Compare the current value of the "BigInteger" with a number received as a parameter to know if the current value is greater than or equal to this.
     */
    gte(number){
        return BigInt(this.#result) >= BigInt(number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lte compara The current value of the "BigInteger" with a number received as a parameter to know if the current value is less than or equal to this.
     */
    lte(number){
        return BigInt(this.#result) <= BigInt(number)
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method greaterThan Compare the first parameter with the second to find out if the first parameter is greater than the second parameter.
     */
    static greaterThan(number1, number2) {
        return BigInt(number1) > BigInt(number2)
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method lessThan Compare the first parameter with the second to find out if the first parameter is less than the second parameter.
     */
    static lessThan(number1, number2) {
        return BigInt(number1) < BigInt(number2)
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method isEqualTo Compare the first parameter with the second to find out if both parameters are the same.
     */
    static isEqualTo(number1, number2) {
        return BigInt(number1) === BigInt(number2)
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method greaterOrEqualThan Compare the first parameter with the second to find out if the first parameter is greater than or equal to the second parameter.
     */
    static greaterOrEqualThan(number1, number2) {
        return BigInt(number1) >= BigInt(number2)
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method lessOrEqualThan Compare the first parameter with the second to find out if the first parameter is less than or equal to the second parameter.
     */
    static lessOrEqualThan(number1, number2) {
        return BigInt(number1) <= BigInt(number2)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isNaNInt It detects if a number is not a valid integer, that is, with a decimal point or a strange character equivalent to the NAN value.
     */
    static isNaNInt(number) {
        return String(number).split('').some(digit => isNaN(digit))
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isSafeInteger Detects if a number is an integer between the safe range of JavaScript for integers, starting from the smallest safe to the largest.
     */
    static isSafeInteger(number){
        return this.greaterOrEqualThan(number,Number.MIN_SAFE_INTEGER)&&this.lessOrEqualThan(number,Number.MAX_SAFE_INTEGER)
    }
    /**
     * 
     * @param {string|number} number the number to convert to decimal base
     * @param {string|number} radix the base of the number 
     * @returns 
     */
    static baseToDecimal(number,radix){
        return new converter(number,radix).toDecimal()
    }
    /**
     * 
     * @param {string|number} decimal the decimal number to convert
     * @param {string|number} toRadix the base to convert the decimal number
     * @returns 
     */
    static decimalToBase(decimal,toRadix){
        return new converter(decimal,'10').toCustomBase(toRadix)
    }
}
module.exports = bigInteger