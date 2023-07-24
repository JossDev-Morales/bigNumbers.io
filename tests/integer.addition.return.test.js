const BigIntegerClass=require('../src/BigIntegerOps')
const BigInteger=new BigIntegerClass('5890000')

test('Integer.ReturnAddition its not working', () => {
    const result=BigInteger.ReturnAddition('110000')
    expect(result).toBe('6000000')
})