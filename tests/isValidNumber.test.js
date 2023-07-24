const isValidNumber=require('../src/IsValidNumber')

test('isValidNumber function its not working', () => {
    const validNumberExample='19000099.99'
    const result=isValidNumber(validNumberExample)
    expect(result).toBe(true)
})