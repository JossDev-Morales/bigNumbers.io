const bigInteger = require('../src/BigDecimalOps.js')

function testing(name,value, be) {
    test(`${name}:should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}

testing('get abs value of -199.9',bigInteger.getAbs('-199.9'),'199.9')