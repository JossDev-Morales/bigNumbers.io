const bigDecimal = require('../src/BigDecimalOps')

function testing(name,value, be) {
    test(`${name}:should test ${value} to be ${be}`, () => {
        expect(value).toBe(be)
    })
}
testing('Division of negative-positive',new bigDecimal('-10').Division('4').Return(),'-2.5')
testing('Division of positive-negative',new bigDecimal('32').Division('-84').Return(),'-0.38095238095238095238095238095238095238095238095238')
testing('Division of negative-negative',new bigDecimal('-19999999999999999999999').Division('-3').Return(),'6666666666666666666666.33333333333333333333333333333333333333333333333333')
testing('Division of positive-positive',new bigDecimal('833356').Division('15').Return(),'55557.06666666666666666666666666666666666666666666666666')