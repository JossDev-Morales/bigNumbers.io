const { converter } = require("number-converter.io")
const isValidNumber = require("./IsValidNumber")
const getComposition = require("./getComposition")
const CustomError = require("./CustomError")
const isPeriodic = require("./periodicDecimalFinder")
const bigInteger = require("./BigIntegerOps")
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
    /**@type {{maxDecimals:number|undefined,periodicDecimalsLimit:number|undefined,infinitySaver:number|undefined,divideByZero:{return:any|undefined,error:{throw:boolean,message:string}}}} */
    #conf = Object
    /**
     * BigDecimal constructor
     * @param {string | number} initilizedResult 
     * @param {{maxDecimals:number|undefined,periodicDecimalsLimit:number|undefined,infinitySaver:number|undefined,divideByZero:{return:any|undefined,error:{throw:boolean,message:string}}}} confs 
     * @returns {bigDecimal} The initilized BigDecimal
     * @public
     */
    constructor(initilizedResult, confs) {
        isValidNumber(String(initilizedResult))
        this.#result = String(initilizedResult)
        this.#record = {
            currentValue: 0,
            operations: []
        }
        this.#conf = {
            maxDecimals: Infinity,
            periodicDecimalsLimit: 50,
            infinitySaver: 500,
            divideByZero: {
                return: Infinity,
                error: {
                    throw: false,
                    message: 'You cant divide by zero'
                }
            }
        }
        Object.keys(confs || {}).forEach(key => {
            if (typeof confs[key] === 'object') {
                Object.keys(confs[key]).forEach(key2 => {
                    this.#conf[key][key2] = confs[key][key2]
                })
            } else {
                this.#conf[key] = confs[key]
            }
        })
    }
    /**
    * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
    * @param {string} Binary number in binary base
    * @returns {bigDecimal} 
    */
    static fromBinary(Binary) {
        const binarynumber = new converter(Binary, '2')
        return new this(binarynumber.toDecimal())
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string} octal number in octal base
     * @returns {bigDecimal}
     */
    static fromOctal(octal) {
        const octalnumber = new converter(octal, '8')
        return new this(octalnumber.toDecimal())
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string} hexadecimal number in hexadecimal base
     * @returns {bigDecimal}
     */
    static fromHexadecimal(hexadecimal) {
        const hexanumber = new converter(hexadecimal, '16')
        return new this(hexanumber.toDecimal())
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string} number number in some base betwen 2 and 36
     * @param {string} base the base of the number
     * @returns {bigDecimal}
     */
    static fromOtherBase(number, base) {
        const basenumber = new converter(number, String(base))
        return new this(basenumber.toDecimal())
    }
    /**
     * 
     * @param {string | number} stringDecimal number to add to the current value
     * @param {{justReturn,number2}} conf confs, dont touch it HAHA
     * @method Addition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method and sets the result of the operation as the current value
     */
    Addition(stringDecimal, conf) {
        isValidNumber(String(stringDecimal))
        if (conf?.number2) {
            isValidNumber(String(conf.number2))
        }
        const from = this.#result
        const numbers = {
            n1: conf?.number2 ? getComposition(String(conf?.number2)) : getComposition(this.#result),
            n2: getComposition(String(stringDecimal))
        }
        const result = [[], [], []]
        //some one of the two numbers are negative
        if ((numbers.n1.sign === '-' && numbers.n2.sign === '') || (numbers.n1.sign === '' && numbers.n2.sign === '-')) {
            let negative = numbers.n1.sign === '-' ? 1 : 2
            let willbenegative = negative === 1 ? bigDecimal.greaterThan(numbers.n1.complete, numbers.n2.complete) : bigDecimal.greaterThan(numbers.n2.complete, numbers.n1.complete)
            let biger = willbenegative ? negative === 1 ? 1 : 2 : negative === 1 ? 2 : 1
            let smaller = willbenegative ? negative === 1 ? 2 : 1 : negative === 1 ? 1 : 2
            let decimalWillbenegative = negative === 1 ? bigDecimal.greaterThan('0.' + numbers.n1.decimals.join(''), '0.' + numbers.n2.decimals.join('')) : bigDecimal.greaterThan('0.' + numbers.n2.decimals.join(''), '0.' + numbers.n1.decimals.join(''))
            let decimalBigger = decimalWillbenegative ? negative === 1 ? 1 : 2 : negative === 1 ? 2 : 1
            let decimalSmaller = decimalWillbenegative ? negative === 1 ? 2 : 1 : negative === 1 ? 1 : 2
            let carry = 0
            if (willbenegative) {
                result[0] = '-'
            }
            if (numbers.n1.decimals.length != numbers.n2.decimals.length) {
                let greaterLength = Math.max(numbers.n1.decimals.length, numbers.n2.decimals.length)
                while (numbers.n1.decimals.length < greaterLength) {
                    numbers.n1.decimals.push(0)
                }
                while (numbers.n2.decimals.length < greaterLength) {
                    numbers.n2.decimals.push(0)
                }
            }
            numbers.n1.decimals.reverse(); numbers.n2.decimals.reverse()
            numbers['n' + decimalBigger].decimals.forEach((digit, index) => {
                let number1 = Number(digit)
                let number2 = Number(numbers['n' + decimalSmaller].decimals[index])
                let subtraction = number1 - number2 - carry
                if (subtraction < 0) {
                    subtraction = subtraction + 10
                    carry = 1
                } else {
                    carry = 0
                }
                result[2].push(subtraction)
            })
            result[2] = result[2].reverse()
            numbers.n1.ints.reverse(); numbers.n2.ints.reverse()
            numbers['n' + biger].ints.forEach((digit, index) => {
                let number1 = Number(digit)
                let number2 = Number(numbers['n' + smaller].ints[index] || 0)
                let subtraction = number1 - number2 - carry
                if (subtraction < 0) {
                    subtraction = subtraction + 10
                    carry = 1
                } else {
                    carry = 0
                }
                result[1].push(subtraction)
            })
            carry = 0
            result[1] = result[1].reverse()
            while (result[1][0] == 0 && result[1].length > 1) {
                result[1].shift()
            }
            if (!willbenegative && decimalWillbenegative) {
                let decimalslength = result[2].length
                result[1][result[1].length - 1] = result[1][result[1].length - 1] - 1
                let takeCarry = [1]
                for (let i = 0; i < decimalslength; i++) {
                    takeCarry.push(0)
                }
                let subresult = []
                result[2].reverse()
                takeCarry.reverse().forEach((digit, index) => {
                    let number1 = Number(digit)
                    let number2 = Number(result[2][index] || 0)
                    let subtraction = number1 - number2 - carry
                    if (subtraction < 0) {
                        subtraction = subtraction + 10
                        carry = 1
                    } else {
                        carry = 0
                    }
                    subresult.push(subtraction)
                })
                while (subresult[subresult.length - 1] === 0) {
                    subresult.pop()
                }
                subresult.reverse()
                result[2] = subresult
            }
            result[1].reverse()
        } else {
            if (numbers.n1.sign === '-' && numbers.n2.sign === '-') {
                result[0] = '-'
            }
            let carry = 0
            if (numbers.n1.decimals.length != numbers.n2.decimals.length) {
                let greaterLength = Math.max(numbers.n1.decimals.length, numbers.n2.decimals.length)
                while (numbers.n1.decimals.length < greaterLength) {
                    numbers.n1.decimals.push(0)
                }
                while (numbers.n2.decimals.length < greaterLength) {
                    numbers.n2.decimals.push(0)
                }
            }
            if (numbers.n1.ints.length != numbers.n2.ints.length) {
                let greaterLength = Math.max(numbers.n1.ints.length, numbers.n2.ints.length)
                while (numbers.n1.ints.length < greaterLength) {
                    numbers.n1.ints.unshift(0)
                }
                while (numbers.n2.ints.length < greaterLength) {
                    numbers.n2.ints.unshift(0)
                }
            }
            numbers.n1.decimals.reverse(); numbers.n2.decimals.reverse()
            numbers.n1.decimals.forEach((digit, index) => {
                let number1 = Number(digit)
                let number2 = Number(numbers.n2.decimals[index])
                let addition = number1 + number2 + carry
                if (addition > 9) {
                    addition = addition - 10
                    carry = 1
                } else {
                    carry = 0
                }
                result[2].push(addition)
            })
            result[2] = result[2].reverse()
            numbers.n1.ints.reverse(); numbers.n2.ints.reverse()
            numbers.n1.ints.forEach((digit, index) => {
                let number1 = Number(digit)
                let number2 = Number(numbers.n2.ints[index] || 0)
                let addition = number1 + number2 + carry
                let push = true
                if (addition > 9) {
                    if (numbers.n1.ints[index + 1] != undefined) {
                        addition = addition - 10
                        carry = 1
                    } else {
                        push = false
                        result[1] = [result[1], addition].flat()
                    }
                } else {
                    carry = 0
                }
                if (push) {
                    result[1].push(addition)
                }
            })
        }
        result[1] = result[1].reverse()
        while (result[1][0] === 0) {
            result[1].shift()
        }
        if (result[1][0] === undefined) {
            result[1].push(0)
        }
        while (result[2][result[2].length - 1] === 0) {
            result[2].pop()
        }
        if (conf?.justReturn) {
            return `${result[0]}${result[1].join('')}${result[2].length === 0 ? '' : '.'}${result[2].length === 0 ? '' : result[2].join('')}`
        } else {
            this.#result = `${result[0]}${result[1].join('')}${result[2].length === 0 ? '' : '.'}${result[2].length === 0 ? '' : result[2].join('')}`
            this.#record.operations.push({ type: 'Addition', from, adding: stringDecimal, result: this.#result })
            return this
        }


    }
    /**
     * 
     * @param {string|number} stringDecimal number to add to the current value
     * @method ReturnAddition adds two numbers, the number corresponding to the current value plus the one you pass as a parameter to this method
     * @returns {string} the result of the operation as a string
     */
    ReturnAddition(stringDecimal) {
        const result = this.Addition(stringDecimal, { justReturn: true })
        return result
    }
    /**
     * 
     * @param {string|number} string1 number to subtract the current value
     * @method Subtraction subtracts two numbers, the number corresponding to the current value minus the number you pass as a parameter to this method and sets the result of the operation as the current value

     */
    Subtraction(string1) {
        const from = this.#result
        const result = this.ReturnSubtraction(string1)
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
        const numbers = {
            n1: getComposition(this.#result),
            n2: getComposition(String(string1))
        }
        let result
        if ((numbers.n1.sign === '-' && numbers.n2.sign === '') || (numbers.n1.sign === '' && numbers.n2.sign === '-')) {
            let sign = numbers.n1.sign === '-' ? '-' : ''
            result = `${sign}${this.Addition(numbers.n1.complete, { justReturn: true, number2: numbers.n2.complete })}`

        } else if (numbers.n1.sign === '-' && numbers.n2.sign === '-') {
            let greaterNumber = bigDecimal.greaterThan(numbers.n1.complete, numbers.n2.complete) ? 1 : bigDecimal.greaterThan(numbers.n2.complete, numbers.n1.complete) ? 2 : 0

            result = greaterNumber === 0 ? '0' : `${greaterNumber === 1 ? '-' : ''}${this.Addition(`${greaterNumber === 1 ? '' : '-'}${numbers.n1.complete}`, { justReturn: true, number2: `${greaterNumber === 1 ? '-' : ''}${numbers.n2.complete}` })}`
        } else {
            let greaterNumber = bigDecimal.greaterThan(numbers.n1.complete, numbers.n2.complete) ? 1 : bigDecimal.greaterThan(numbers.n2.complete, numbers.n1.complete) ? 2 : 0
            result = greaterNumber === 0 ? '0' : `${greaterNumber === 1 ? '' : greaterNumber === 2 ? '-' : ''}${this.Addition(`${greaterNumber === 1 ? '' : '-'}${numbers.n1.complete}`, { justReturn: true, number2: `${greaterNumber === 1 ? '-' : ''}${numbers.n2.complete}` })}`
        }
        return result
    }
    /**
     * 
     * @param {string|number} number number to multiply
     * @method Multiplication multiplies two numbers, the number corresponding to the current value by the number you pass as a parameter to this method and sets the result of the operation as the current value
     */
    Multiplication(number) {
        let from = this.#result
        const result = this.ReturnMultiplication(number)
        this.#result = result
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
        const numbers = {
            n1: getComposition(String(this.#result)),
            n2: getComposition(String(number))
        }
        const sign = numbers.n1.sign === numbers.n2.sign ? '' : '-'
        const result = [sign, '']
        const mult = (number, factor) => {
            let result = (BigInt(number) * BigInt(factor)).toString()
            return result
        }
        let num1 = numbers.n1.decimals.some(digit => digit != 0) ? numbers.n1.complete.split('.').join('') : numbers.n1.ints.join('')
        let num2 = numbers.n2.decimals.some(digit => digit != 0) ? numbers.n2.complete.split('.').join('') : numbers.n2.ints.join('')
        let Operation = mult(num1, num2)
        result[1] = numbers.n1.decimals.some(digit => digit != '0') || numbers.n2.decimals.some(digit => digit != '0') ? `${Operation.slice(0, Operation.length - decimalsCount)}${Operation.slice(Operation.length - decimalsCount).split('').some(digit => digit !== '0') ? '.' + Operation.slice(Operation.length - decimalsCount) : ''}` : Operation
        return result.join('')
    }
    /**
     * 
     * @param {string|number} number number to divide by
     * @method Division Divide the current value by the number you pass as a parameter to this method
     */
    Division(number) {
        let from = this.#result
        this.#result = this.ReturnDivision(number)
        this.#record.operations.push({ type: 'Division', from, by: number, result: this.#result })
        return this
    }
    /**
     * 
     * @param {string|number} number number to divide by
     * @method Division Divide the current value by the number you pass as a parameter to this method
     * @returns {string} the result of the operation as a string 
     */
    ReturnDivision(number) {
        const numbers = {
            n1: getComposition(String(this.#result)),
            n2: getComposition(String(number))
        }
        const isPositiveResult = (numbers.n1.sign === '' && numbers.n2.sign === '') || (numbers.n1.sign === '-' && numbers.n2.sign === '-');
        if (numbers.n2.complete === '0.0') {
            if (this.#conf.divideByZero.error.throw) {
                let divideByZero = new CustomError({ name: 'DivideByZero', message: this.#conf.divideByZero.error.message || 'You cant divide a dividend by divisor zero' })
                throw divideByZero
            }
            if (this.#conf.divideByZero.return) {
                return this.#conf.divideByZero.return
            } else {
                return Infinity
            }

        }
        if (numbers.n1.complete === '0.0') {
            return '0'
        }
        // Manejo de signos

        let quotient = division(numbers.n1.complete, numbers.n2.complete)
        let difference = new bigDecimal(getDiff(numbers.n1.complete, numbers.n2.complete, quotient))
        let result = [isPositiveResult ? '' : '-', quotient, bigDecimal.greaterThan(difference.Return(), 0) ? '.' : '', []]
        let reps = 0
        let divisor = numbers.n2
        while (bigDecimal.greaterThan(difference.Return(), 0) && (reps <= this.#conf.maxDecimals / 2)) {
            reps++
            let amplificator = ['1', '0']
            let differenceDecimalsLength = difference.Return().split('.')[1]?.length || 0
            for (let i = 0; i < differenceDecimalsLength; i++) {
                amplificator.push('0')
            }
            difference.Multiplication(amplificator.join(''))
            let remainder
            let decimalLength = divisor.decimals.length
            if (divisor.decimals.some(digit => digit != '0')) {
                let amplificator = ['1']
                for (let i = 0; i < decimalLength; i++) {
                    amplificator.push('0')
                }
                difference.Multiplication(amplificator.join(''))
                let divisor = new bigDecimal(numbers.n2.complete).ReturnMultiplication(amplificator.join(''))
                remainder = (BigInt(difference.Return()) / BigInt(divisor)).toString().split('')
                difference = new bigDecimal(getDiff(difference.Return(), divisor, remainder.join('')))
            } else {
                remainder = division(difference.Return(), numbers.n2.ints.join('')).split('')
                difference = new bigDecimal(getDiff(difference.Return(), numbers.n2.ints.join(''), remainder.join('')))
            }
            remainder = remainder.join('')
            result[3].push(remainder)
            if (this.#conf.maxDecimals === Infinity) {
                let decimalsCount = result[3].join('').split('').length
                if (decimalsCount >= this.#conf.periodicDecimalsLimit) {
                    if (isPeriodic(result[3])) {
                        break
                    }
                }
                if (reps >= this.#conf.infinitSaver) {
                    break
                }
            }
        }
        return result.flat().join('')
    }
    /**
     * 
     * @param {string|number} number number to get module or remainder 
     * @method Module Get the residue of dividing the current value by the number you pass as a parameter
     */
    Module(number) {
        let from = this.#result
        this.#result = this.ReturnModule(number)
        this.#record.operations.push({ type: 'Module', from, of: number, result: this.#result })
        return this
    }
    /**
     * 
     * @param {string|number} number number to get module or remainder 
     * @method Module Get the remainder of dividing the current value by the number you pass as a parameter
     * @returns {string} The remainder of the operation as a string
     */
    ReturnModule(number) {
        const numbers = {
            n1: getComposition(String(this.#result)),
            n2: getComposition(String(number))
        }
        const isPositiveResult = (numbers.n1.sign === '' && numbers.n2.sign === '') || (numbers.n1.sign === '-' && numbers.n2.sign === '-');
        if (numbers.n2.complete === '0.0') {
            if (this.#conf.divideByZero.error.throw) {
                let divideByZero = new CustomError({ name: 'DivideByZero', message: this.#conf.divideByZero.error.message || 'You cant divide a dividend by divisor zero' })
                throw divideByZero
            }
            if (this.#conf.divideByZero.return) {
                return this.#conf.divideByZero.return
            } else {
                return Infinity
            }

        }
        if (numbers.n1.complete === '0.0') {
            return '0'
        }
        let quotient = division(numbers.n1.complete, numbers.n2.complete)
        let difference = getDiff(numbers.n1.complete, numbers.n2.complete, quotient)
        return isPositiveResult ? difference : '-' + difference
    }
    /**
     * 
     * @param {string|number} number The exponent with which the current value will be exponentiated. 
     * @method Power Gets the result of exponentiating the current value by the exponent that you pass as a parameter to this method
     */
    Power(number) {
        let from = this.#result
        this.#result = this.ReturnPower(number)
        this.#record.operations.push({ type: 'Power', from, elevatedtO: number, result: this.#result })
        return this
    }
    /**
     * 
     * @param {string|number} number The exponent with which the current value will be exponentiated. 
     * @method Power Gets the result of exponentiating the current value by the exponent that you pass as a parameter to this method
     * @returns {string} The result of the operation as a string
     */
    ReturnPower(number) {
        const numbers = {
            n1: getComposition(this.#result),
            n2: getComposition(number)
        }
        let isPositiveResult = numbers.n1.sign === '-' ? false : true
        let completeNumber = new bigDecimal(numbers.n1.decimals.some(dig => dig != '0') ? numbers.n1.complete : numbers.n1.ints)
        let multi = [1]
        let result
        if (numbers.n2.decimals.some(dig => dig != '0')) {
            throw new CustomError({ name: 'InvalidExponent', message: 'You cant use a decimal exponent', exponent: numbers.n2.sign + numbers.n2.complete })
        }
        if (numbers.n1.decimals.some(dig => dig != '0')) {
            let decimalslength = numbers.n1.decimals.length
            for (let i = 0; i < decimalslength; i++) {
                multi.push(0)
            }
            if (Number(multi.join('')) > 1) {
                completeNumber.Multiplication(Number(multi.join('')))
            }
        }
        let powNum = BigInt(completeNumber.Return()) ** BigInt(numbers.n2.ints)
        if (Number(multi.join('')) > 1) {
            let powMult = BigInt(Number(multi.join(''))) ** BigInt(numbers.n2.ints)
            result = new bigDecimal(powNum.toString()).ReturnDivision(powMult.toString())
        } else {
            result = powNum.toString()
        }
        return isPositiveResult ? result : '-' + result
    }
    /**
     * 
     * @method Squared This method obtains the current value squared
     */
    Squared(){
        let from = this.#result
        this.#result= new bigDecimal(this.#result).ReturnSquared()
        this.#record.operations.push({type:'Squared', from, result:this.#result})
        return this
    }
    /**
     * 
     * @method Squared This method obtains the current value squared
     * @returns {string} The result of the operation as a string
     */
    ReturnSquared(){
        return new bigDecimal(this.#result).ReturnMultiplication(this.#result)
    }
    /**
     * 
     * @method Cubed This method obtains the current value cubed
     */
    Cubed(){
        let from = this.#result
        this.#result= new bigDecimal(this.#result).ReturnCubed()
        this.#record.operations.push({type:'Cubed', from, result:this.#result})
        return this
    }
    /**
     * 
     * @method Cubed This method obtains the current value cubed
     * @returns {string} The result of the operation as a string
     */
    ReturnCubed(){
        return new bigDecimal(new bigDecimal(this.#result).ReturnMultiplication(this.#result)).ReturnMultiplication(this.#result)
    }
    /**
     * 
     * @method Abs Gets the absolute value of the current value
     * @returns {string} The absolute value as a string
     */
    Abs() {
        return bigDecimal.getAbs(this.#result)
    }
    /**
     * 
     * @method isPrime Returns true if the current value is prime
     * @returns {boolean} 
     */
    isPrime(){
        return bigDecimal.isPrime(this.#result)
    }
    /**
     * 
     * @method isComposite Returns true if the current value is composite
     * @returns {boolean} 
     */
    isComposite(){
        return bigDecimal.isComposite(this.#result)
    }
    /**
     * 
     * @method isEven Returns true if the current value is even
     * @returns {boolean} 
     */
    isEven(){
        return bigDecimal.isEven(this.#result)
    }
    /**
     * 
     * @method isOdd Returns true if the current value is odd
     * @returns {boolean} 
     */
    isOdd(){
        return bigDecimal.isOdd(this.#result)
    }
    /**
     * 
     * @method isPositive Returns true if the current value is positive
     * @returns {boolean} 
     */
    isPositive(){
        return bigDecimal.isPositive(this.#result)
    }
    /**
     * 
     * @method isNegative Returns true if the current value is negative
     * @returns {boolean} 
     */
    isNegative(){
        return bigDecimal.isNegative(this.#result)
    }
    /**
     * 
     * @method isZero Returns true if the current value is equal to zero
     * @returns {boolean} 
     */
    isZero(){
        return bigDecimal.isZero(this.#result)
    }
    
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {('binary'|'octal'|'decimal'|'hexadecimal'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36')} radix the numeric base to convert the current value
     * @method Return 
     * @returns {string} the current value as a string
     */
    Return(radix) {
        /**@type {string} */
        const result = radix ? new converter(this.#result, '10').toCustomBase(String(radix)) : this.#result
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
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string|number} number 
     * @param {('binary'|'octal'|'decimal'|'hexadecimal'|'2'|'3'|'4'|'5'|'6'|'7'|'8'|'9'|'10'|'11'|'12'|'13'|'14'|'15'|'16'|'17'|'18'|'19'|'20'|'21'|'22'|'23'|'24'|'25'|'26'|'27'|'28'|'29'|'30'|'31'|'32'|'33'|'34'|'35'|'36')} radix the base of the number you will pass to convert it to decimal base
     * @method SetBigInteger set the current value with the number you pass as a parameter and delete records
     * @returns {bigDecimal}
     */
    SetBigDecimal(number, radix) {
        const decimal = radix ? new converter(number, String(radix)).toDecimal() : number
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
    gt(number) {
        return bigDecimal.greaterThan(this.#result, number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lt Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is less than this.
     */
    lt(number) {
        return bigDecimal.lessThan(this.#result, number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method eq Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is the same as this.
     */
    eq(number) {
        return bigDecimal.isEqualTo(this.#result, number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method gte Compare the current value of the "BigDecimal" with a number received as a parameter to know if the current value is greater than or equal to this.
     */
    gte(number) {
        return bigDecimal.greaterOrEqualThan(this.#result, number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method lte compara The current value of the "BigDecimal" with a number received as a parameter to know if the current value is less than or equal to this.
     */
    lte(number) {
        return bigDecimal.lessOrEqualThan(this.#result, number)
    }
    /**
     * 
     * @param {string|number} number 
     * @method getAbs Returns the absolute value of the current value
     * @returns {string} The result of the operation as a string
     */
    static getAbs(number) {
        let composition = getComposition(number)
        return composition.decimals.some(digit => digit != 0) ? composition.complete : composition.ints.join('')
    }
    /**
     * 
     * @param {string|number} number 
     * @method gaussSumOf Returns the result of the sum of gauss of the natural numbers between 1 and the number you pass as a parameter
     * @returns {string} The result of the operation as a string
     */
    static gaussSumOf(number){
        let plusOfFirstAndLast=new bigDecimal(number).Addition('1')
        let plusMultByGreatest=plusOfFirstAndLast.Multiplication(number).Division('2')
        return plusMultByGreatest.Return()
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
                }

                if (num1.ints[0] > num2.ints[0]) {
                    return false
                } else if (num1.ints[0] < num2.ints[0]) {
                    return true
                } else if (num1.ints.length == num2.ints.length && num1.ints[0] == num2.ints[0]) {
                    let tempToReturn = false
                    let tempMark = false
                    num1.ints.forEach((digit, index) => {
                        if (digit !== num2.ints[index] && !tempMark) {
                            if (digit < num2.ints[index]) {
                                tempToReturn = true
                                tempMark = true
                            } else {
                                tempMark = true
                            }
                        }
                    })
                    if (tempToReturn) {
                        return tempToReturn
                    } else {
                        return false
                    }
                }
            } else {
                if (!this.isEqualTo("0." + num1.decimals.join(''), "0." + num2.decimals.join(''))) {
                    if (num1.decimals[0] < num2.decimals[0]) {
                        return true
                    } else if (num1.decimals[0] > num2.decimals[0]) {
                        return false
                    } else if (num1.decimals[0] == num2.decimals[0]) {
                        let tempToReturn = false
                        let tempMark = false
                        num1.decimals.forEach((digit, index) => {
                            if (digit !== num2.decimals[index] && !tempMark) {
                                if (digit < num2.decimals[index]) {
                                    tempToReturn = true
                                    tempMark = true
                                } else {
                                    tempMark = true
                                }
                            }
                        })
                        if (tempToReturn) {
                            return tempToReturn
                        } else {
                            return false
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
                }

                if (num1.ints[0] > num2.ints[0]) {
                    return true
                } else if (num1.ints[0] < num2.ints[0]) {
                    return false
                } else if (num1.ints[0] == num2.ints[0]) {
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
                        return tempToReturn
                    } else {
                        return false
                    }
                }
            } else {
                if (!this.isEqualTo("0." + num1.decimals.join(''), "0." + num2.decimals.join(''))) {
                    if (num1.decimals[0] > num2.decimals[0] ?? 0) {
                        return true
                    } else if (num1.decimals[0] < num2.decimals[0]) {
                        return false
                    } else if (num1.decimals[0] > num2.decimals[0]) {
                        return true
                    } else if (num1.decimals[0] == num2.decimals[0]) {
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
     * @method isPrime Returns true if the current value is prime
     * @returns {boolean}
     */
    static isPrime(number) {
        let intPart=new bigInteger(getComposition(String(number)).ints.join(''))
        if (intPart.lte(1)) {
            return false; // Los números menores o iguales a 1 no son primos.
        }

        if (intPart.lte(3)) {
            return true; // 2 y 3 son primos.
        }

        if (intPart.ReturnModule(2)==='0' || intPart.ReturnModule(3)==='0') {
            return false; // Los múltiplos de 2 y 3 no son primos.
        }

        // Verifica divisibilidad desde 5 en adelante.
        for (let i = new bigInteger(5); bigInteger.lessOrEqualThan(i.ReturnMultiplication(i.Return()),intPart.Return()); i.Addition(6)) {
            if (intPart.ReturnModule(i.Return()) == 0 || intPart.ReturnModule(i.ReturnAddition(2)) == 0) {
                return false; // Si es divisible por i o i + 2, no es primo.
            }
        }

        return true;
    }
    /**
     * 
     * @param {string|number} number 
     * @method isComposite Returns true if the current value is composite
     * @returns {boolean}
     */
    static isComposite(number){
        return !bigDecimal.isPrime(number)
    }
    /**
     * 
     * @param {string|number} number 
     * @method isEven Returns true if the current value is even
     * @returns {boolean}
     */
    static isEven(number){
        let intPart=new bigInteger(getComposition(String(number)).ints.join(''))
        return intPart.ReturnModule(2)==='0'
    }
    /**
     * 
     * @param {string|number} number 
     * @method isOdd Returns true if the current value is odd
     * @returns {boolean}
     */
    static isOdd(number){
        return !bigDecimal.isEven(number)
    }
    /**
     * 
     * @param {string|number} number 
     * @method isZero Returns true if the current value is equals to zero
     * @returns {boolean}
     */
    static isZero(number){
        let composition=getComposition(String(number))
        if (composition.decimals.join('')==='0') {
            if (composition.ints.every(digit=>digit==='0')) {
                return true
            }else return false
        }else if (composition.ints.every(digit=>dig==='0')) {
            if (composition.decimals.every(digit=>digit==='0')) {
                return true
            }else return false
        }
    }
    /**
     * 
     * @param {string|number} number 
     * @method isNegative Returns true if the current value is negative
     * @returns {boolean}
     */
    static isNegative(number){
        let sign=getComposition(String(number)).sign
        return sign==='-'
    }
    /**
     * 
     * @param {string|number} number 
     * @method isPositive Returns true if the current value is positive
     * @returns {boolean}
     */
    static isPositive(number){
        return !bigDecimal.isNegative(number)
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isNaNDecimal It detects if a number is not a valid decimal, that is, it does not have more than a decimal point, that it has decimal values after the point and does not have Nan type characters.
     */
    static isNaNDecimal(number) {
        let tempDotMark = false
        return String(number).split('').some((digit, index, thisArr) => {
            if (!tempDotMark) {
                if (digit === '.') {
                    tempDotMark = true
                    if (thisArr[index + 1] === undefined) {
                        return true
                    }
                } else {
                    return isNaN(digit)
                }
            } else {
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
    static isDecimal(number) {
        if (!this.isNaNDecimal(number) && String(number).split('').some(digit => digit === '.')) {
            return true
        } else {
            return false
        }
    }
    /**
     * 
     * @param {string|number} number 
     * @returns {boolean}
     * @method isSafeInteger Detects if a number is an integer between the safe range of JavaScript for integers, starting from the smallest safe to the largest.
     */
    static isSafeInteger(number) {
        return this.greaterOrEqualThan(number, Number.MIN_SAFE_INTEGER) && this.lessOrEqualThan(number, Number.MAX_SAFE_INTEGER)
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string|number} number the number to convert to decimal base
     * @param {string|number} radix the base of the number 
     * @method baseToDecimal This method convert a number from any base to a decimal number.
     * @returns {string} The converted number to decimal
     */
    static baseToDecimal(number, radix) {
        return new converter(number, String(radix)).toDecimal()
    }
    /**
     * @see https://github.com/JossDev-Morales/number-converter.io#readme Documentation for conversions
     * @param {string|number} decimal The decimal number to convert
     * @param {string|number} toRadix The base to convert the decimal number
     * @method decimalToBase This method convert a decimal number to other base.
     * @returns {string} The converted decimal number to other base 
     */
    static decimalToBase(decimal, toRadix) {
        return new converter(decimal, '10').toCustomBase(String(toRadix))
    }
}
function division(number1, number2) {
    const numbers = {
        n1: getComposition(String(number1)),
        n2: getComposition(String(number2))
    }
    // Manejo de signos
    // const isPositiveResult = (numbers.n1.sign === '' && numbers.n2.sign === '') || (numbers.n1.sign === '-' && numbers.n1.sign === '-');
    // Convierte dividendos y divisores en positivos para simplificar la división
    let dividend = new bigDecimal(numbers.n1.complete)
    let divisor = new bigDecimal(numbers.n2.complete)
    let isDecimal = bigDecimal.isDecimal(numbers.n1.complete) || bigDecimal.isDecimal(numbers.n2.complete)
    if (isDecimal) {
        let greaterDecimalLength = numbers.n1.decimals.some(digit => digit != '0') || numbers.n2.decimals.some(digit => digit != '0') ? Math.max(numbers.n1.decimals.length, numbers.n2.decimals.length) : 0
        let amplificator = ['1']
        for (let i = 0; i < greaterDecimalLength; i++) {
            amplificator.push('0')
        }
        dividend = BigInt(dividend.Multiplication(amplificator.join('')).Return())
        divisor = BigInt(divisor.Multiplication(amplificator.join('')).Return())
    }
    let result = dividend / divisor
    return result.toString()
}
function getDiff(dividend, divisor, quotient) {
    let difference = new bigDecimal(dividend).Subtraction(new bigDecimal(divisor).ReturnMultiplication(quotient))
    return difference.Return()
}
module.exports = bigDecimal