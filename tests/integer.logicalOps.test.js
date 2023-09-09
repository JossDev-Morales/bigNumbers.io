const bigInteger = require('../src/bigIntegerOps.js')
function testing(value, be) {
    test(`should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}
//logical operations
testing(new bigInteger('199999').gt('200000'),false)
testing(new bigInteger('199999').lt('200000'),true)
testing(new bigInteger('199999').gte('200000'),false)
testing(new bigInteger('199999').gte('199999'),true)
testing(new bigInteger('199999').lte('200000'),true)
testing(new bigInteger('199999').lte('199999'),true)
testing(new bigInteger('199999').eq('199999'),true)
testing(bigInteger.greaterThan('123456789123456789','123456789123456789'),false)
testing(bigInteger.lessThan('123456789123456789','1234567891234567891'),true)
testing(bigInteger.greaterOrEqualThan('1234567891234567891','123456789123456789'),true)
testing(bigInteger.greaterOrEqualThan('123456789123456789','123456789123456789'),true)
testing(bigInteger.lessOrEqualThan('1234567891234567895','123456789123456789'),false)
testing(bigInteger.isEqualTo('123456789123456789','123456789123456789'),true)
testing(bigInteger.isNaNInt('18.99999999999999'),true)
testing(bigInteger.isSafeInteger(Number.MAX_SAFE_INTEGER),true)