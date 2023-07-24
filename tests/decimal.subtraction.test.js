const BigDecimalClass=require('../src/BigDecimalOps')
const BigDecimal= new BigDecimalClass('199999999999999999999')

test('Decimal.Subtraction its not working', () => { 
    const result=BigDecimal.Subtraction('200000000000000000000').Return()
    expect(result).toBe('-1')
 })