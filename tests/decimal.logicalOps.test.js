const bigDecimal = require('../src/BigDecimalOps.js')

function testing(name,value, be) {
    test(`${name}:should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}
//logical operations
testing('gt',new bigDecimal('199999').gt('200000'),false)
testing('lt',new bigDecimal('199999').lt('200000'),true)
testing('gte',new bigDecimal('199999').gte('200000'),false)
testing('gte2',new bigDecimal('199999').gte('199999'),true)
testing('lte',new bigDecimal('199999').lte('200000'),true)
testing('lte2',new bigDecimal('199999').lte('199999'),true)
testing('eq',new bigDecimal('199999').eq('199999'),true)
testing('grth',bigDecimal.greaterThan('-12345678912345678','-123456789123456789'),true)
testing('leth',bigDecimal.lessThan('123456789123456789','1234567891234567891'),true)
testing('greqth',bigDecimal.greaterOrEqualThan('1234567891234567891','123456789123456789'),true)
testing('greqth',bigDecimal.greaterOrEqualThan('123456789123456789','123456789123456789'),true)
testing('leeqth',bigDecimal.lessOrEqualThan('1234567891234567895','123456789123456789'),false)
testing('iseq',bigDecimal.isEqualTo('123456789123456789','123456789123456789'),true)
testing('isnand',bigDecimal.isNaNDecimal('18.99999999999999'),false)
testing('issafe',bigDecimal.isSafeInteger(Number.MAX_SAFE_INTEGER),true)
testing('isdec',bigDecimal.isDecimal('18.99999999999999'),true)