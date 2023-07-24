const BigIntegerClass=require('../src/BigIntegerOps')
const BigInteger=new BigIntegerClass('5890000')

test('integer.Division its not working', () => {
    const result=BigInteger.Division('2').Return()
    expect(result).toBe('2945000')
})