const BigIntegerClass=require('../src/BigIntegerOps')
const BigInteger=new BigIntegerClass('5890000')

test('integer.ReturnMultiplication its not working', () => {
    const result=BigInteger.ReturnMultiplication('2')
    expect(result).toBe('11780000')
})