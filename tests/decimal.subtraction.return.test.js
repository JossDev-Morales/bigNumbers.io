const BigDecimalClass=require('../src/BigDecimalOps')
const BigDecimal= new BigDecimalClass('199999999999999999999')

test('Decimal.ReturnSubtraction its not working', () => {
    const result=BigDecimal.ReturnSubtraction('200000000000000000000')
    expect(result).toBe('-1')
})