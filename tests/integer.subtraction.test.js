const BigIntegerClass=require('../src/BigIntegerOps')
const BigInteger=new BigIntegerClass('5890000')

test('integer.Subtraction its not working', () => {
    const result=BigInteger.Subtraction('890000').Return()
    expect(result).toBe('5000000')
})