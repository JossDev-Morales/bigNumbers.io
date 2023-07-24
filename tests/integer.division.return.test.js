const BigIntegerClass=require('../src/BigIntegerOps')
const BigInteger=new BigIntegerClass('5890000')

test('integer.ReturnDivision its not working', () => {
    const result=BigInteger.ReturnDivision('2')
    expect(result).toBe('2945000')
})