const CustomError = require("./CustomError")

/**
 * Function to know if a number like a string is a valid representation of a number for BigDecimal
 * @param {string} number 
 * @throws {error} the error corresponding to the failure in the validation of the number
 */
function isValidNumber(number) {
    //We validate that the number is a string
    if (typeof number !== typeof String()) {
        throw new Error('Invalid parameter')
    }
    //We validate that a number does not have a negative input sign, if it is positive, it should only be ignored, if you use "+" it will be treated as a rare character.
    if (number.split('').some(num => num === '-')) {
        throw new CustomError({
            name: 'Invalid sign',
            message: 'Negative sign are not allowed',
            number
        })
    }
    //We validate that the decimals are not greater than one decimal, this is the maximum number of decimals allowed.
    if (number.split('.').length > 2) {
        throw new CustomError({
            name: 'Invalid dots',
            message: `The maximun quantity of dots are 1, you are using ${number.split('.').length - 1} dots`,
            number: number,
            dots: number.split('.').length - 1
        })
    }
    //We validate that it does not have rare characters in the string for decimal numbers
    if (number.split('.')[1]) {
        if (number.split('.')[0].split('').some((number => isNaN(number))) || number.split('.')[1].split('').some((number => isNaN(number)))) {
            throw new CustomError({
                name: 'Invalid characters',
                message: 'non-numeric characters found',
                number,
                invalidCharacters: { integers: number.split('.')[0].split('').filter(number => isNaN(number)), decimals: number.split('.')[1].split('').filter(number => isNaN(number)) }
            })
        }
    } else {
        //We validate that it does not have rare characters in the string for non-decimal numbers
        if (number.split('').some(number => isNaN(number))) {
            throw new CustomError({
                name: 'Invalid characters',
                message: 'non-numeric characters found',
                number,
                invalidCharacters: number.split('').filter(number => isNaN(number))
            })
        }
    }
}
module.exports = isValidNumber