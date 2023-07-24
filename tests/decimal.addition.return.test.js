const BigDecimalClass=require('../src/BigDecimalOps')
const BigDecimal= new BigDecimalClass('199999999999999999999')

test('Decimal.ReturnAddition its not working', () => {
    const result=BigDecimal.ReturnAddition('200000000000000000001')
    expect(result).toBe('400000000000000000000')
})