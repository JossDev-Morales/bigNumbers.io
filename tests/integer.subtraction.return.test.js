const BigIntegerClass=require('../src/BigIntegerOps')
const BigInteger=new BigIntegerClass('5890000')

test('integer.ReturnSubtraction its not working', () => {
    const result=BigInteger.ReturnSubtraction('890000')
    expect(result).toBe('5000000')
})