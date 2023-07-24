const BigIntegerClass=require('../src/BigIntegerOps')
const BigInteger=new BigIntegerClass('5890000')

test('integer.Multiplication its not working', () => {
    const result=BigInteger.Multiplication('2').Return()
    expect(result).toBe('11780000')
})