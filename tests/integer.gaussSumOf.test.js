const bigInteger = require('../src/BigIntegerOps.js')

function testing(name,value, be) {
    test(`${name}:should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}
testing('get gauss sum of a number: 100',bigInteger.gaussSumOf('100'),'5050')