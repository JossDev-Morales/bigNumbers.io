const bigDecimal = require('../src/BigDecimalOps.js')

function testing(name,value, be) {
    test(`${name}:should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}
testing('get gauss sum of a number: 100',bigDecimal.gaussSumOf('100'),'5050')