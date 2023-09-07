const { converter } = require("number-converter.io")
const isValidNumber = require("./IsValidNumber")
/**
 * @class representation of a big decimal that exceeds the javascript limit
 * @description Use this class to represent a very large decimals, if your number supports javascript decimals, use vanilla decimal number, this BigDecimal work with strings operations.
 * @example
 * //19999999999999999.99999999999999999 its an decimal that exceeds the javascript limit
 * const MyBigDecimalNumber = new BigDecimal("19999999999999999.99999999999999999").Addition('0.00000000000000001')
 * console.log(MyBigDecimalNumber.Return())//20000000000000000 
 * @public 
 */
class bigDecimal {
    #result = null
    #record = null
    /**
     * BigDecimal constructor
     * @param {string | number} initilizedResult 
     * @returns {bigDecimal} The initilized BigDecimal
     * @public
     */
    constructor(initilizedResult) {
        isValidNumber(String(initilizedResult))
        this.#result = String(initilizedResult)
        this.#record = {
            currentValue: 0,
            operations: []
        }
    }
     /**
     * 
     * @param {string} Binary number in binary base
     * @returns {bigDecimal} 
     */
    static fromBinary(Binary){
        const binarynumber= new converter(Binary,'2')
        return new this(binarynumber.toDecimal())
    }
    /**
     * 
     * @param {string} octal number in octal base
     * @returns {bigDecimal}
     */
    static fromOctal(octal){
        const octalnumber= new converter(octal,'8')
        return new this(octalnumber.toDecimal())
    }
    /**
     * 
     * @param {string} hexadecimal number in hexadecimal base
     * @returns {bigDecimal}
     */
    static fromHexadecimal(hexadecimal){
        const hexanumber= new converter(hexadecimal,'16')
        return new this(hexanumber.toDecimal())
    }
    /**
     * 
     * @param {string} number number in some base betwen 2 and 36
     * @param {string} base the base of the number
     * @returns {bigDecimal}
     */
    static fromOtherBase(number,base){
        const basenumber= new converter(number,base)
        return new this(basenumber.toDecimal())
    }
    /**
     * 
     * @param {string | number} stringDecimal number to add to the current value
     * @method Addition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method and sets the result of the operation as the current value
     */
    Addition(stringDecimal, secondStringDecimal, createRecord = false) {
        isValidNumber(String(stringDecimal))
        if (secondStringDecimal) {
            isValidNumber(String(secondStringDecimal))
        }
        const from = this.#result
        const number1 = {
            ints: String(stringDecimal).split('.')[0].split('').reverse(),
            decimals: String(stringDecimal).split('.')[1]?.split('').reverse() || ['0']
        }
        const number2 = {
            ints: String(secondStringDecimal || this.#result).split('.')[0].split('').reverse(),
            decimals: String(secondStringDecimal || this.#result).split('.')[1]?.split('').reverse() || ['0']
        }
        let carry = 0
        let decimals = []
        let ints = []
        if (number1.decimals && number2.decimals) {
            if (number1.decimals.length >= number2.decimals.length) {
                number2.decimals.reverse()
                number1.decimals.forEach((decimal, index) => {
                    let addition = Number(decimal) + Number(number2.decimals[number1.decimals.length - 1 - index] ?? 0)
                    if (addition + carry >= 10) {
                        decimals.push(addition - 10 + carry)
                        carry = 1
                    } else {
                        decimals.push(addition + carry)
                        carry = 0
                    }
                })
            } else {
                number1.decimals.reverse()
                number2.decimals.forEach((decimal, index) => {
                    let addition = Number(decimal) + Number(number1.decimals[(number2.decimals.length - 1) - index] ?? 0)
                    if (addition + carry >= 10) {
                        decimals.push(addition - 10 + carry)
                        carry = 1
                    } else {
                        decimals.push(addition + carry)
                        carry = 0
                    }
                })
            }
        }
        if (number1.ints.length >= number2.ints.length) {
            number1.ints.forEach((int, index) => {
                let addition = Number(int) + Number(number2.ints[index] ?? 0)
                if (addition + carry >= 10) {
                    ints.push(addition - 10 + carry)
                    carry = 1
                    if (number1.ints.length - 1 === index) {
                        ints.push(1)
                    }
                } else {
                    ints.push(addition + carry)
                    carry = 0
                }
            })
        } else {
            number2.ints.forEach((int, index) => {
                let addition = Number(parseInt(int) + carry) + Number(number1.ints[index] ?? 0)
                if (addition >= 10) {
                    ints.push(parseInt(addition) - 10)
                    carry = 1
                    if (number2.ints.length - 1 === index) {
                        ints.push(1)
                    }
                } else {
                    ints.push(addition)
                    carry = 0
                }
            })
        }
        while (decimals.length > 1 && decimals[0] == 0) {
            decimals.shift();
        }
        if (decimals.every(decimal => decimal === 0)) {
            this.#result = ints.reverse().join('')
        } else if (decimals.length == 1 && decimals[0] == 0) {
            this.#result = ints.reverse().join('')
        } else {
            this.#result = ints.reverse().join('') + '.' + decimals.reverse().join('')
        }
        if (!createRecord) {
            this.#record.operations.push({ type: 'Addition', from, adding: stringDecimal, result: this.#result })
        }
        return this
    }
    /**
     * 
     * @param {string|number} stringDecimal number to add to the current value
     * @method ReturnAddition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method
     * @returns {string} the result of the operation as a string
     */
    ReturnAddition(stringDecimal) {
        isValidNumber(String(stringDecimal))


        const number1 = {
            ints: String(stringDecimal).split('.')[0].split('').reverse(),
            decimals: String(stringDecimal).split('.')[1]?.split('').reverse() || ['0']
        }
        const number2 = {
            ints: String(this.#result).split('.')[0].split('').reverse(),
            decimals: String(this.#result).split('.')[1]?.split('').reverse() || ['0']
        }
        let carry = 0
        let decimals = []
        let ints = []
        if (number1.decimals && number2.decimals) {
            if (number1.decimals.length >= number2.decimals.length) {
                number2.decimals.reverse()
                number1.decimals.forEach((decimal, index) => {
                    let addition = Number(decimal) + Number(number2.decimals[number1.decimals.length - 1 - index] ?? 0)
                    if (addition + carry >= 10) {
                        decimals.push(addition - 10 + carry)
                        carry = 1
                    } else {
                        decimals.push(addition + carry)
                        carry = 0
                    }
                })
            } else {
                number1.decimals.reverse()
                number2.decimals.forEach((decimal, index) => {
                    let addition = Number(decimal) + Number(number1.decimals[(number2.decimals.length - 1) - index] ?? 0)
                    if (addition + carry >= 10) {
                        decimals.push(addition - 10 + carry)
                        carry = 1
                    } else {
                        decimals.push(addition + carry)
                        carry = 0
                    }
                })
            }
        }
        if (number1.ints.length >= number2.ints.length) {
            number1.ints.forEach((int, index) => {
                let addition = Number(int) + Number(number2.ints[index] ?? 0)
                if (addition + carry >= 10) {
                    ints.push(addition - 10 + carry)
                    carry = 1
                    if (number1.ints.length - 1 === index) {
                        ints.push(1)
                    }
                } else {
                    ints.push(addition + carry)
                    carry = 0
                }
            })
        } else {
            number2.ints.forEach((int, index) => {
                let addition = Number(int) + Number(number1.ints[index] ?? 0)
                if (addition + carry >= 10) {
                    ints.push(addition - 10 + carry)
                    carry = 1
                    if (number1.ints.length - 1 === index) {
                        ints.push(1)
                    }
                } else {
                    ints.push(addition + carry)
                    carry = 0
                }
            })
        }
        while (decimals.length > 1 && decimals[0] == 0) {
            decimals.shift();
        }
        let result
        if (decimals.every(decimal => decimal === 0)) {
            result = ints.reverse().join('')
        } else if (decimals.length == 1 && decimals[0] == 0) {
            result = ints.reverse().join('')
        } else {
            result = ints.reverse().join('') + '.' + decimals.reverse().join('')
        }
        return result
    }
    /**
     * 
     * @param {string|number} string1 number to subtract the current value
     * @method Subtraction subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method and sets the result of the operation as the current value

     */
    Subtraction(string1) {
        isValidNumber(String(string1))
        const from = this.#result
        const minuendo = {
            ints: String(this.#result).split('.')[0].split(''),
            decimals: String(this.#result).split('.')[1]?.split('') || [0]
        }
        const sustraendo = {
            ints: String(string1).split('.')[0].split(''),
            decimals: String(string1).split('.')[1]?.split('') ?? [0]
        }
        let isNegative = false
        let decimalIsNegative = false
        let carry = 0
        let intsResult = []
        let decimalsResult = []
        const negativeChecker = (value1, value2) => {
            let maxLenght = Math.max(value1?.length || minuendo.ints.length, value2?.length || sustraendo.ints.length)
            const minu = value1 || minuendo.ints
            const sust = value2 || sustraendo.ints
            for (let i = 0; i < maxLenght; i++) {
                const minuDigit = minu[i] || 0
                const sustDigit = sust[i] || 0
                if (i === 0 && minuDigit < sustDigit) {
                    return true
                }
                if (minuDigit < sustDigit) {
                    return true
                }
                if (minuDigit > sustDigit) {
                    return false
                }
                if (i === maxLenght - 1 && minuDigit === sustDigit) {
                    return false
                }
            }
            return true
        }
        if (minuendo.ints.length < sustraendo.ints.length || (minuendo.ints.length === sustraendo.ints.length && Number(minuendo.ints[0]) < Number(sustraendo.ints[0])) || (minuendo.ints.length === sustraendo.ints.length && negativeChecker())) {
            isNegative = true
        }
        if (minuendo.decimals.length < sustraendo.decimals.length) {
            let decimals = minuendo.decimals
            decimals.push(0)
            if (negativeChecker(decimals, sustraendo.decimals)) {
                decimalIsNegative = true
            }
        } else if (minuendo.decimals.length > sustraendo.decimals.length) {
            let decimals = minuendo.decimals
            decimals.push(0)
            if (negativeChecker(decimals, sustraendo.decimals)) {
                decimalIsNegative = true
            }
        } else {
            if (negativeChecker(minuendo.decimals, sustraendo.decimals)) {
                decimalIsNegative = true
            }
        }
        minuendo.ints.reverse(); minuendo.decimals.reverse()
        sustraendo.ints.reverse(); sustraendo.decimals.reverse()
        let length = Math.max(minuendo.ints.length, sustraendo.ints.length) - Math.min(minuendo.ints.length, sustraendo.ints.length)
        for (let i = 0; i < length; i++) {
            if (minuendo.ints.length >= sustraendo.ints.length) {
                sustraendo.ints.push(0)
            } else {
                minuendo.ints.push(0)
            }
        }
        let decimalLength = Math.max(minuendo.decimals.length, sustraendo.decimals.length) - Math.min(minuendo.decimals.length, sustraendo.decimals.length)
        for (let i = 0; i < decimalLength; i++) {
            if (minuendo.decimals.length >= sustraendo.decimals.length) {
                sustraendo.decimals.push(0)
            } else {
                minuendo.decimals.push(0)
            }
        }
        minuendo.decimals.forEach((decimal, index) => {
            if (decimalIsNegative) {
                let operation = Number(parseInt(sustraendo.decimals[index] - carry) - Number(decimal))
                if (operation < 0) {
                    operation = Number(parseInt(sustraendo.decimals[index]) + 10 - carry) - Number(decimal)
                    carry = 1
                } else {
                    carry = 0
                }
                decimalsResult.push(operation)
            } else {
                let operation = Number(parseInt(decimal) - carry) - Number(sustraendo.decimals[index])
                if (operation < 0) {
                    operation = Number(parseInt(decimal) + 10 - carry) - Number(sustraendo.decimals[index])
                    carry = 1
                } else {
                    carry = 0
                }
                decimalsResult.push(operation)
            }
        })
        minuendo.ints.forEach((integer, index) => {
            if (isNegative) {
                let operation = Number(parseInt(sustraendo.ints[index]) - carry) - Number(integer)
                if (operation < 0) {
                    operation = Number(parseInt(sustraendo.ints[index]) + 10 - carry) - Number(parseInt(integer))
                    carry = 1
                } else {
                    carry = 0
                }
                intsResult.push(operation)
            } else {
                let operation = Number(parseInt(integer) - carry) - Number(sustraendo.ints[index])
                if (operation < 0) {
                    operation = Number(parseInt(integer) + 10 - carry) - Number(sustraendo.ints[index])
                    carry = 1
                } else {
                    carry = 0
                }
                intsResult.push(operation)
            }
        })
        let result = undefined

        if (decimalIsNegative == false && isNegative) {
            let int = undefined
            let decimal = decimalsResult
            let numOfDecimals = decimalsResult.length
            let overCarry = 0
            let temp = []
            intsResult.forEach((integer, index) => {
                if (!int && integer !== 0) {
                    overCarry = index
                    int = integer
                    for (let i = 0; i < index; i++) {
                        int = Number(int + '0')
                        decimal = [0, ...decimal]
                    }
                }
            })
            for (let i = 0; i < numOfDecimals; i++) {
                int = Number(int + '0')
                decimal = [0, ...decimal]
            }
            int = int.toString().split('')
            int.reverse(); decimal.reverse()
            let carry = 0
            int.forEach((integer, index) => {
                let operation = Number(parseInt(integer) - carry) - Number(decimal[index])
                if (operation < 0) {
                    if (int[index + 1] !== undefined) {
                        operation = Number(parseInt(integer) + 10 - carry) - Number(decimal[index])
                        carry = 1
                    }
                } else {
                    carry = 0
                }
                temp.push(operation)
            })
            let resultsForInts = temp.slice(numOfDecimals).reverse()
            let resultsForDecimals = temp.slice(0, numOfDecimals)
            let resultLenght = intsResult.length
            intsResult.reverse()
            intsResult.splice(resultLenght - overCarry - 1, overCarry + 1, resultsForInts.join(''))
            intsResult.reverse()
            decimalsResult = resultsForDecimals
        }
        if (isNegative == false && decimalIsNegative) {
            let int = undefined
            let decimal = decimalsResult.reverse()
            let numOfDecimals = decimalsResult.length
            let overCarry = 0
            let temp = []
            intsResult.forEach((integer, index) => {
                if (!int && integer !== 0) {
                    overCarry = index
                    int = integer
                    for (let i = 0; i < index; i++) {
                        int = Number(int + '0')
                        decimal = [0, ...decimal]
                    }
                }
                if (!int && index == intsResult.length - 1 && integer == 0) {
                    int = integer
                }
            })
            for (let i = 0; i < numOfDecimals; i++) {
                int = Number(int + '0')
                decimal = [0, ...decimal]
            }
            int = int.toString().split('')
            int.reverse(); decimal.reverse()
            let carry = 0
            if (Number(int) !== 0) {
                int.forEach((integer, index) => {
                    let operation = Number(parseInt(integer) - carry) - Number(decimal[index])
                    if (operation < 0) {
                        if (int[index + 1] !== undefined) {
                            operation = Number(parseInt(integer) + 10 - carry) - Number(decimal[index])
                            carry = 1
                        }
                    } else {
                        carry = 0
                    }
                    temp.push(operation)
                })
                let resultsForInts = temp.slice(numOfDecimals).reverse()
                let resultsForDecimals = temp.slice(0, numOfDecimals)
                let resultLenght = intsResult.length
                while (resultsForInts.length > 1 && resultsForInts[0] == 0) {
                    resultsForInts.shift();
                }
                intsResult.reverse()
                intsResult.splice(resultLenght - overCarry - 1, overCarry + 1, resultsForInts.join(''))
                intsResult.reverse()
                decimalsResult = resultsForDecimals
            } else {
                isNegative = true
            }
        }
        while (intsResult.length > 1 && intsResult[intsResult.length - 1] == 0) {
            intsResult.pop();
        }
        while (decimalsResult.length >= 1 && decimalsResult[0] == 0) {
            decimalsResult.shift()
        }
        if (isNegative) {
            intsResult.push('-')
        }

        if (decimalsResult.every(decimal => decimal == 0) || decimalsResult.length === 0) {
            result = intsResult.reverse().join('')
        } else {
            result = intsResult.reverse().join('') + '.' + decimalsResult.reverse().join('')
        }
        this.#result = result
        this.#record.operations.push({ type: 'Subtraction', from, subtracting: string1, result: this.#result })
        return this
    }
    /**
     * 
     * @param {string|number} string1 number to subtract the current value
     * @method ReturnSubtraction subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method
     * @returns {string} the result of the operation as a string 
     */
    ReturnSubtraction(string1) {
        isValidNumber(String(string1))
        const minuendo = {
            ints: String(this.#result).split('.')[0].split(''),
            decimals: String(this.#result).split('.')[1]?.split('') || [0]
        }
        const sustraendo = {
            ints: String(string1).split('.')[0].split(''),
            decimals: String(string1).split('.')[1]?.split('') ?? [0]
        }
        let isNegative = false
        let decimalIsNegative = false
        let carry = 0
        let intsResult = []
        let decimalsResult = []
        const negativeChecker = (value1, value2) => {
            let maxLenght = Math.max(value1?.length || minuendo.ints.length, value2?.length || sustraendo.ints.length)
            const minu = value1 || minuendo.ints
            const sust = value2 || sustraendo.ints
            for (let i = 0; i < maxLenght; i++) {
                const minuDigit = minu[i] || 0
                const sustDigit = sust[i] || 0
                if (i === 0 && minuDigit < sustDigit) {
                    return true
                }
                if (minuDigit < sustDigit) {
                    return true
                }
                if (minuDigit > sustDigit) {
                    return false
                }
                if (i === maxLenght - 1 && minuDigit === sustDigit) {
                    return false
                }
            }
            return true
        }
        if (minuendo.ints.length < sustraendo.ints.length || (minuendo.ints.length === sustraendo.ints.length && Number(minuendo.ints[0]) < Number(sustraendo.ints[0])) || (minuendo.ints.length === sustraendo.ints.length && negativeChecker())) {
            isNegative = true
        }
        if (minuendo.decimals.length < sustraendo.decimals.length) {
            let decimals = minuendo.decimals
            decimals.push(0)
            if (negativeChecker(decimals, sustraendo.decimals)) {
                decimalIsNegative = true
            }
        } else if (minuendo.decimals.length > sustraendo.decimals.length) {
            let decimals = minuendo.decimals
            decimals.push(0)
            if (negativeChecker(decimals, sustraendo.decimals)) {
                decimalIsNegative = true
            }
        } else {
            if (negativeChecker(minuendo.decimals, sustraendo.decimals)) {
                decimalIsNegative = true
            }
        }
        minuendo.ints.reverse(); minuendo.decimals.reverse()
        sustraendo.ints.reverse(); sustraendo.decimals.reverse()
        let length = Math.max(minuendo.ints.length, sustraendo.ints.length) - Math.min(minuendo.ints.length, sustraendo.ints.length)
        for (let i = 0; i < length; i++) {
            if (minuendo.ints.length >= sustraendo.ints.length) {
                sustraendo.ints.push(0)
            } else {
                minuendo.ints.push(0)
            }
        }
        let decimalLength = Math.max(minuendo.decimals.length, sustraendo.decimals.length) - Math.min(minuendo.decimals.length, sustraendo.decimals.length)
        for (let i = 0; i < decimalLength; i++) {
            if (minuendo.decimals.length >= sustraendo.decimals.length) {
                sustraendo.decimals.push(0)
            } else {
                minuendo.decimals.push(0)
            }
        }
        minuendo.decimals.forEach((decimal, index) => {
            if (decimalIsNegative) {
                let operation = Number(parseInt(sustraendo.decimals[index] - carry) - Number(decimal))
                if (operation < 0) {
                    operation = Number(parseInt(sustraendo.decimals[index]) + 10 - carry) - Number(decimal)
                    carry = 1
                } else {
                    carry = 0
                }
                decimalsResult.push(operation)
            } else {
                let operation = Number(parseInt(decimal) - carry) - Number(sustraendo.decimals[index])
                if (operation < 0) {
                    operation = Number(parseInt(decimal) + 10 - carry) - Number(sustraendo.decimals[index])
                    carry = 1
                } else {
                    carry = 0
                }
                decimalsResult.push(operation)
            }
        })
        minuendo.ints.forEach((integer, index) => {
            if (isNegative) {
                let operation = Number(parseInt(sustraendo.ints[index]) - carry) - Number(integer)
                if (operation < 0) {
                    operation = Number(parseInt(sustraendo.ints[index]) + 10 - carry) - Number(parseInt(integer))
                    carry = 1
                } else {
                    carry = 0
                }
                intsResult.push(operation)
            } else {
                let operation = Number(parseInt(integer) - carry) - Number(sustraendo.ints[index])
                if (operation < 0) {
                    operation = Number(parseInt(integer) + 10 - carry) - Number(sustraendo.ints[index])
                    carry = 1
                } else {
                    carry = 0
                }
                intsResult.push(operation)
            }
        })
        let result = undefined

        if (decimalIsNegative == false && isNegative) {
            let int = undefined
            let decimal = decimalsResult
            let numOfDecimals = decimalsResult.length
            let overCarry = 0
            let temp = []
            intsResult.forEach((integer, index) => {
                if (!int && integer !== 0) {
                    overCarry = index
                    int = integer
                    for (let i = 0; i < index; i++) {
                        int = Number(int + '0')
                        decimal = [0, ...decimal]
                    }
                }
            })
            for (let i = 0; i < numOfDecimals; i++) {
                int = Number(int + '0')
                decimal = [0, ...decimal]
            }
            int = int.toString().split('')
            int.reverse(); decimal.reverse()
            let carry = 0
            int.forEach((integer, index) => {
                let operation = Number(parseInt(integer) - carry) - Number(decimal[index])
                if (operation < 0) {
                    if (int[index + 1] !== undefined) {
                        operation = Number(parseInt(integer) + 10 - carry) - Number(decimal[index])
                        carry = 1
                    }
                } else {
                    carry = 0
                }
                temp.push(operation)
            })
            let resultsForInts = temp.slice(numOfDecimals).reverse()
            let resultsForDecimals = temp.slice(0, numOfDecimals)
            let resultLenght = intsResult.length
            intsResult.reverse()
            intsResult.splice(resultLenght - overCarry - 1, overCarry + 1, resultsForInts.join(''))
            intsResult.reverse()
            decimalsResult = resultsForDecimals
        }
        if (isNegative == false && decimalIsNegative) {
            let int = undefined
            let decimal = decimalsResult.reverse()
            let numOfDecimals = decimalsResult.length
            let overCarry = 0
            let temp = []
            intsResult.forEach((integer, index) => {
                if (!int && integer !== 0) {
                    overCarry = index
                    int = integer
                    for (let i = 0; i < index; i++) {
                        int = Number(int + '0')
                        decimal = [0, ...decimal]
                    }
                }
                if (!int && index == intsResult.length - 1 && integer == 0) {
                    int = integer
                }
            })
            for (let i = 0; i < numOfDecimals; i++) {
                int = Number(int + '0')
                decimal = [0, ...decimal]
            }
            int = int.toString().split('')
            int.reverse(); decimal.reverse()
            let carry = 0
            if (Number(int) !== 0) {
                int.forEach((integer, index) => {
                    let operation = Number(parseInt(integer) - carry) - Number(decimal[index])
                    if (operation < 0) {
                        if (int[index + 1] !== undefined) {
                            operation = Number(parseInt(integer) + 10 - carry) - Number(decimal[index])
                            carry = 1
                        }
                    } else {
                        carry = 0
                    }
                    temp.push(operation)
                })
                let resultsForInts = temp.slice(numOfDecimals).reverse()
                let resultsForDecimals = temp.slice(0, numOfDecimals)
                let resultLenght = intsResult.length
                while (resultsForInts.length > 1 && resultsForInts[0] == 0) {
                    resultsForInts.shift();
                }
                intsResult.reverse()
                intsResult.splice(resultLenght - overCarry - 1, overCarry + 1, resultsForInts.join(''))
                intsResult.reverse()
                decimalsResult = resultsForDecimals
            } else {
                isNegative = true
            }
        }
        while (intsResult.length > 1 && intsResult[intsResult.length - 1] == 0) {
            intsResult.pop();
        }
        while (decimalsResult.length >= 1 && decimalsResult[0] == 0) {
            decimalsResult.shift()
        }
        if (isNegative) {
            intsResult.push('-')
        }

        if (decimalsResult.every(decimal => decimal == 0) || decimalsResult.length === 0) {
            result = intsResult.reverse().join('')
        } else {
            result = intsResult.reverse().join('') + '.' + decimalsResult.reverse().join('')
        }
        return result
    }
    /**
     * 
     * @param {string|number} number number to multiply
     * @method Multiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value
     */
    Multiplication(number) {
        isValidNumber(String(number))
        const from = this.#result
        const decimalsCount = this.#result.split('.')[1]?.length || 0 + String(number).split('.')[1]?.length || 0
        const mult = (number, factor) => {
            let tempNumber = factor || this.#result
            let tempResult = factor || this.#result//5
            for (let i = 1; i < Number(number); i++) {
                tempResult = this.Addition(tempResult, tempNumber, true).Return()
            }
            return tempResult
        }
        if (String(number).split('.').length == 2) {
            const factor = String(number).split('.')
            let Operation = mult(factor.join(''), this.#result.split('.').join(''))
            this.#result = Operation.slice(0, Operation.length - decimalsCount) + '.' + Operation.slice(Operation.length - decimalsCount)
        } else {
            this.#result = mult(number)
        }
        this.#record.operations.push({ type: 'Multiplication', from, by: number, result: this.#result })
        return this
    }
    /**
     * 
     * @param {string|number} number number to multiply
     * @method ReturnMultiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method 
     * @returns {string} the result of the operation as a string 
     */
    ReturnMultiplication(number) {
        isValidNumber(String(number))
        const decimalsCount = this.#result.split('.')[1]?.length || 0 + String(number).split('.')[1]?.length || 0
        const mult = (number, factor) => {
            let tempNumber = factor || this.#result
            let tempResult = factor || this.#result//5
            for (let i = 1; i < Number(number); i++) {
                tempResult = this.Addition(tempResult, tempNumber, true).Return()
            }
            return tempResult
        }
        if (String(number).split('.').length == 2) {
            const factor = String(number).split('.')
            let Operation = mult(factor.join(''), this.#result.split('.').join(''))
            return Operation.slice(0, Operation.length - decimalsCount) + '.' + Operation.slice(Operation.length - decimalsCount)
        } else {
            return mult(number)
        }
    }
    /**
     * @param {('binary'|'octal'|'decimal'|'hexadecimal'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36')} radix the numeric base to convert the current value
     * @method Return 
     * @returns {string} the current value as a string
     */
    Return(radix) {
        /**@type {string} */
        const result = radix?new converter(this.#result,'10').toCustomBase(radix):this.#result
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
        return this
    }
    /**
     * 
     * @param {string|number} number 
     * @param {string|number} radix the base of the number you will pass to convert it to decimal base
     * @method SetBigInteger set the current value with the number you pass as a parameter and delete records
     * @returns {bigDecimal}
     */
    SetBigDecimal(number,radix) {
        const decimal = radix?new converter(number,radix).toDecimal():number
        isValidNumber(decimal)
        this.#result = decimal
        this.ClearRecord()
        return this
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method gt Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is greater than this.
     */
    gt(number){
        return BigDecimal.greaterThan(this.#result,number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lt Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is less than this.
     */
    lt(number){
        return BigDecimal.lessThan(this.#result,number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method eq Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is the same as this.
     */
    eq(number){
        return BigDecimal.isEqualTo(this.#result,number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method gte Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is greater than or equal to this.
     */
    gte(number){
        return BigDecimal.greaterOrEqualThan(this.#result,number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lte compara The current value of the "BigDecimal" with a number received as a parameter to know if the current value is less than or equal to this.
     */
    lte(number){
        return BigDecimal.lessOrEqualThan(this.#result,number)
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method greaterThan Compare the first parameter with the second to find out if the first parameter is greater than the second parameter.
     */
    static greaterThan(param1, param2) {
        const number1 = String(param1).split('')
        const number2 = String(param2).split('')
        const num1 = {
            sign: number1[0] === '-' ? false : true,
            ints: number1.join('').split('.')[0].split(''),
            decimals: number1.join('').split('.')[1]?.split('') ?? [0]
        }
        const num2 = {
            sign: String(number2).split('')[0] === '-' ? false : true,
            ints: number2.join('').split('.')[0].split(''),
            decimals: number2.join('').split('.')[1]?.split('') ?? [0]
        }
        if (!num1.sign) {
            num1.ints.shift()
        }
        if (!num2.sign) {
            num2.ints.shift()
        }
        while (num1.ints[0] == 0) {
            num1.ints.shift()
        }
        while (num2.ints[0] == 0) {
            num2.ints.shift()
        }
        while (num1.decimals[num1.decimals.length - 1] == 0 && num1.length > 1) {
            num1.decimals.pop()
        }
        while (num2.decimals[num2.decimals.length - 1] == 0 && num2.length > 1) {
            num2.decimals.pop()
        }
        if (num1.sign == false && num2.sign == true) {
            return false
        } else if (num1.sign == true && num2.sign == false) {
            return true
        } else if (num1.sign == false && num2.sign == false) {
            if (!this.isEqualTo(num1.ints.join(''), num2.ints.join(''))) {
                if (num1.ints.length > num2.ints.length) {
                    return false
                } else if (num1.ints.length < num2.ints.length) {
                    return true
                } else if (num1.ints.length == num2.ints.length && num1.ints[0] > num2.ints[0]) {
                    return false
                } else if (num1.ints.length == num2.ints.length && num1.ints[0] == num2.ints[0]) {
                    let tempToReturn = false
                    let tempMark = false
                    num1.ints.forEach((digit, index) => {
                        if (digit !== num2.ints[index] && !tempMark) {
                            if (digit > num2.ints[index]) {
                                tempToReturn = true
                                tempMark = true
                            } else {
                                tempMark = true
                            }
                        }
                    })
                    if (tempToReturn) {
                        return false
                    } else {
                        return true
                    }
                } else {
                    return true
                }
            } else {
                if (!this.isEqualTo(num1.decimals.join(''), num2.decimals.join(''))) {
                    if (num1.decimals[0] > num2.decimals[0]) {
                        return false
                    } else if (num1.decimals[0] < num2.decimals[0]) {
                        return true
                    } else if (num1.decimals[0] > num2.decimals[0]) {
                        return false
                    } else if (num1.decimals[0] = num2.decimals[0]) {
                        let tempToReturn = false
                        let tempMark = false
                        num1.decimals.forEach((digit, index) => {
                            if (digit !== num2.decimals[index] && !tempMark) {
                                if (digit > num2.decimals[index]) {
                                    tempToReturn = true
                                    tempMark = true
                                } else {
                                    tempMark = true
                                }
                            }
                        })
                        if (tempToReturn) {
                            return false
                        } else {
                            return true
                        }
                    }
                } else {
                    return false
                }
            }
        } else {
            if (!this.isEqualTo(num1.ints.join(''), num2.ints.join(''))) {
                if (num1.ints.length > num2.ints.length) {
                    return true
                } else if (num1.ints.length < num2.ints.length) {
                    return false
                } else if (num1.ints.length == num2.ints.length && num1.ints[0] > num2.ints[0]) {
                    return true
                } else if (num1.ints.length == num2.ints.length && num1.ints[0] == num2.ints[0]) {
                    let tempToReturn = false
                    let tempMark = false
                    num1.ints.forEach((digit, index) => {
                        if (digit !== num2.ints[index] && !tempMark) {
                            if (digit > num2.ints[index]) {
                                tempToReturn = true
                                tempMark = true
                            } else {
                                tempMark = true
                            }
                        }
                    })
                    if (tempToReturn) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } else {
                if (!this.isEqualTo(num1.decimals.join(''), num2.decimals.join(''))) {
                    if (num1.decimals[0] > num2.decimals[0] ?? 0) {
                        return true
                    } else if (num1.decimals[0] < num2.decimals[0]) {
                        return false
                    } else if (num1.decimals[0] > num2.decimals[0]) {
                        return true
                    } else if (num1.decimals[0] = num2.decimals[0]) {
                        let tempToReturn = false
                        let tempMark = false
                        num1.decimals.forEach((digit, index) => {
                            if (digit !== num2.decimals[index] && !tempMark) {
                                if (digit > num2.decimals[index]) {
                                    tempToReturn = true
                                    tempMark = true
                                } else {
                                    tempMark = true
                                }
                            }
                        })
                        if (tempToReturn) {
                            return true
                        } else {
                            return false
                        }
                    }
                } else {
                    return false
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
    static lessThan(number1, number2) {
        if (this.isEqualTo(number1, number2)) {
            return false
        } else {
            return !this.greaterThan(number1, number2)
        }
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method isEqualTo Compare the first parameter with the second to find out if both parameters are the same.
     */
    static isEqualTo(number1, number2) {
        const num1 = {
            ints: String(number1).split('.')[0].split(''),
            decimals: String(number1).split('.')[1]?.split('') || [0]
        }
        const num2 = {
            ints: String(number2).split('.')[0].split(''),
            decimals: String(number2).split('.')[1]?.split('') || [0]
        }
        while (num1.ints[0] == 0) {
            num1.ints.shift()
        }
        while (num2.ints[0] == 0) {
            num2.ints.shift()
        }
        while (num1.decimals[num1.decimals.length - 1] == 0) {
            num1.decimals.pop()
        }
        while (num2.decimals[num2.decimals.length - 1] == 0) {
            num2.decimals.pop()
        }
        if (num1.ints.join('') === num2.ints.join('') && num1.decimals.join('') === num2.decimals.join('')) {
            return true
        } else {
            console.log();
            return false
        }
    }
/**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method greaterOrEqualThan Compare the first parameter with the second to find out if the first parameter is greater than or equal to the second parameter.
     */
    static greaterOrEqualThan(number1, number2) {
        if (this.isEqualTo(number1, number2)) {
            return true
        } else {
            return this.greaterThan(number1, number2)
        }
    }
    /**
     * 
     * @param {string|number} number1 
     * @param {string|number} number2 
     * @returns {boolean}
     * @method lessOrEqualThan Compare the first parameter with the second to find out if the first parameter is less than or equal to the second parameter.
     */
    static lessOrEqualThan(number1, number2) {
        if (this.isEqualTo(number1, number2)) {
            return true
        } else {
            return !this.greaterThan(number1, number2)
        }
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isNaNDecimal It detects if a number is not a valid decimal, that is, it does not have more than a decimal point, that it has decimal values after the point and does not have Nan type characters.
     */
    static isNaNDecimal(number) {
        let tempDotMark=false
        return String(number).split('').some((digit,index,thisArr) => {
            if (!tempDotMark) {
                if (digit==='.') {
                    tempDotMark=true
                    if (thisArr[index+1]===undefined) {
                        return true
                    }
                }else{
                    return isNaN(digit)
                }
            }else{
                return isNaN(digit)
            }
        })
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isDecimal It detects if a number is decimal, that is, if it is not "NaNDecimal" and has decimal values.
     */
    static isDecimal(number){
        if (!this.isNaNDecimal(number)&&String(number).split('').some(digit=>digit==='.')) {
            return true
        }else{
            return false
        }
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
console.log(bigDecimal.fromBinary('1101'));
module.exports = bigDecimal