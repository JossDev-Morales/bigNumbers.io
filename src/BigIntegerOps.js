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
     * @returns  The initilized BigInteger  
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
     * @param {string|number} number 
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
     * @param {string|number} number
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
     * @param {string|number} number 
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
     * @param {string|number} number
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
     * @param {string|number} number 
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
     * @param {string|number} number 
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
     * @param {string|number} number 
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
     * @param {string|number} number 
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
     * @method Return 
     * @returns {string} the current value as a string
     */
    Return() {
        const result = this.#result.toString()
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
     * @param {string|number} number 
     * @method SetBigInteger set the current value with the number you pass as a parameter
     */
    SetBigInteger(number) {
        if (String(number).split('.')[1]) {
            throw new Error(`The number ${number} its an invalid integer type, if you need to use a decimal number, use BigDecimal`)
        }
        this.#result = BigInt(number)
    }
    static greaterThan(){

    }
}
module.exports = bigInteger