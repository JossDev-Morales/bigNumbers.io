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
class BigDecimal {
    #result = null
    #record = null
    /**
     * BigDecimal constructor
     * @param {string | number} initilizedResult 
     * @returns The initilized BigDecimal
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
     * @param {string | number} stringDecimal 
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
                let addition = Number(parseInt(int)+carry) + Number(number1.ints[index] ?? 0)
                if (addition >= 10) {
                    ints.push(parseInt(addition) - 10 )
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
     * @param {string|number} stringDecimal
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
     * @param {string|number} string1 
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
                if (!int&&index == intsResult.length - 1 && integer == 0) {
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
        this.#result=result
        this.#record.operations.push({ type: 'Subtraction', from, subtracting: string1, result: this.#result })
        return this
    }
    /**
     * 
     * @param {string|number} string1
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
                if (!int&&index == intsResult.length - 1 && integer == 0) {
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
     * @param {string|number} number 
     * @method Multiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value
     */
    Multiplication(number) {
        isValidNumber(String(number))
        const from = this.#result
        const decimalsCount = this.#result.split('.')[1]?.length||0 + String(number).split('.')[1]?.length||0
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
     * @param {string|number} number 
     * @method ReturnMultiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method 
     * @returns {string} the result of the operation as a string 
     */
    ReturnMultiplication(number) {
        isValidNumber(String(number))
        const decimalsCount = this.#result.split('.')[1]?.length||0 + String(number).split('.')[1]?.length||0
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
     * @method Return 
     * @returns {string} the current value as a string
     */
    Return() {
        /**@type {string} */
        const result = this.#result
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
     * @method SetBigInteger set the current value with the number you pass as a parameter and delete records
     */
    SetBigDecimal(number) {
        isValidNumber(String(number))
        this.#result = String(number)
        this.ClearRecord()
        return this
    }

}
module.exports = BigDecimal