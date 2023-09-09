const bigDecimal = require('../src/bigDecimalOps.js')
function testing(value, be) {
    test(`should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}
//logical operations
testing(new bigDecimal('199999').gt('200000'),false)
testing(new bigDecimal('199999').lt('200000'),true)
testing(new bigDecimal('199999').gte('200000'),false)
testing(new bigDecimal('199999').gte('199999'),true)
testing(new bigDecimal('199999').lte('200000'),true)
testing(new bigDecimal('199999').lte('199999'),true)
testing(new bigDecimal('199999').eq('199999'),true)
testing(bigDecimal.greaterThan('123456789123456789','123456789123456789'),false)
testing(bigDecimal.lessThan('123456789123456789','1234567891234567891'),true)
testing(bigDecimal.greaterOrEqualThan('1234567891234567891','123456789123456789'),true)
testing(bigDecimal.greaterOrEqualThan('123456789123456789','123456789123456789'),true)
testing(bigDecimal.lessOrEqualThan('1234567891234567895','123456789123456789'),false)
testing(bigDecimal.isEqualTo('123456789123456789','123456789123456789'),true)
testing(bigDecimal.isNaNDecimal('18.99999999999999'),false)
testing(bigDecimal.isSafeInteger(Number.MAX_SAFE_INTEGER),true)
testing(bigDecimal.isDecimal('18.99999999999999'),true)