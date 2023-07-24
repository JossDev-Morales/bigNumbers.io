const BigDecimalClass=require('../src/BigDecimalOps')
const BigDecimal= new BigDecimalClass('199999999999999999999')


test('Decimal.adding its not working', () => {      
    const result= BigDecimal.Addition('200000000000000000001').Return()
    expect(result).toBe('400000000000000000000')
 })
 