const bigInteger = require('../src/bigIntegerOps.js')
function testing(value, be) {
    test(`should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}
//convertion ops
testing(bigInteger.fromBinary('10111010010000111011011100111111111111').Return(),'199999999999')
testing(bigInteger.fromOctal('2722073347777').Return(),'199999999999')
testing(bigInteger.fromHexadecimal('2E90EDCFFF').Return(),'199999999999')
testing(bigInteger.fromOtherBase('94ADHC6J','30').Return(),'199999999999')
testing(bigInteger.baseToDecimal('94ADHC6J',30),'199999999999')
testing(bigInteger.decimalToBase('199999999999',30),'94ADHC6J')
testing(new bigInteger('199999999999').Return('2'),'10111010010000111011011100111111111111')
testing(new bigInteger(0).SetBigInteger('2E90EDCFFF','16').Return(),'199999999999')
