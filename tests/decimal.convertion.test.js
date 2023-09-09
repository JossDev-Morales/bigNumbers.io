const bigDecimal = require("../src/BigDecimalOps")
function testing(value, be) {
    test(`should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}
//convertion ops
testing(bigDecimal.fromBinary('10111010010000111011011100111111111111').Return(),'199999999999')
testing(bigDecimal.fromOctal('2722073347777').Return(),'199999999999')
testing(bigDecimal.fromHexadecimal('2E90EDCFFF').Return(),'199999999999')
testing(bigDecimal.fromOtherBase('94ADHC6J','30').Return(),'199999999999')
testing(bigDecimal.baseToDecimal('94ADHC6J',30),'199999999999')
testing(bigDecimal.decimalToBase('199999999999',30),'94ADHC6J')
testing(new bigDecimal('199999999999').Return('2'),'10111010010000111011011100111111111111')
testing(new bigDecimal(0).SetBigDecimal('2E90EDCFFF','16').Return(),'199999999999')