const bigDecimal = require("../src/BigDecimalOps")

function testing(name,value, be) {
    test(`${name}:should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}
testing('addition of negative plus positive',new bigDecimal('-1999999999999999999').Addition('623825423').Return(),'-1999999999376174576')
testing('addition of negative plus positive2',new bigDecimal('1999999999999999999').Addition('-623825423').Return(),'1999999999376174576')
testing('addition of negative plus negative',new bigDecimal('-1999999999999999999').Addition('-623825423').Return(),'-2000000000623825422')
testing('addition of positive plus positive',new bigDecimal('1999999999999999978').Addition('299998366666699').Return(),'2000299998366666677')
testing('addition of equals negative',new bigDecimal('-30').Addition('-30').Return(),'-60')
testing('addition of equals negative',new bigDecimal('199995').Addition('199995').Return(),'399990')
//return Addition
testing('return addition',new bigDecimal('19999999999999999999').ReturnAddition('1'),'20000000000000000000')