const BigIntegerClass=require('../src/BigIntegerOps')
const BigInteger=new BigIntegerClass('5890000')

test('Integer.Addition its not working', () => {
    const result=BigInteger.Addition('110000').Return()
    expect(result).toBe('6000000')
})