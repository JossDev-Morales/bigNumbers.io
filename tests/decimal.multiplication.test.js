const BigDecimalClass=require('../src/BigDecimalOps')
const BigDecimal= new BigDecimalClass('199999999999999999999')

test('Decimal.Multiplication its not working', () => { 
    const result=BigDecimal.Multiplication('3.5').Return()
    expect(result).toBe('699999999999999999996.5')
 })