const BigDecimalClass=require('../src/BigDecimalOps')
const BigDecimal= new BigDecimalClass('199999999999999999999')

test('Decimal.ReturnMultiplication its not working', () => {
    const result=BigDecimal.ReturnMultiplication('3.5')
    expect(result).toBe('699999999999999999996.5')
})