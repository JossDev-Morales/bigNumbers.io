/**
 * @class Customizable errors
 */
class CustomError extends Error {
    /**
     * A customizable error with default values ​​for the name and message properties
     * @param {object} error Object with all the propertys for this error
     * @throws {Error} if your custom error don't recive an object will throws an error
     */
    constructor(error) {
        super()
        this.name = 'Custom Error'
        this.message = 'An error has occurred'
        if (typeof error !== typeof Object()) {
            throw new Error('Your custom error needs to recive an object to be built')
        }
        Object.keys(error).forEach(property => {
            this[property] = error[property]
        })
    }
}
module.exports = CustomError