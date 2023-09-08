# BigNumber.io [!['npm link'][npm-version]][npm-link] !['downloads'][downloads] [!['license'][license-img]][license-link] [![Build Status](https://img.shields.io/travis/com/JossDev-Morales/bigNumbers.io?style=for-the-badge&color=0ed35c&logo=travis&label=BUILD%20%26%20TESTS)](https://app.travis-ci.com/github/JossDev-Morales/bigNumbers.io?serverType=git)  

[!['repository'][git-img]][git-link] [!['discord'][discord-img]][discord-link]

[npm-version]:https://img.shields.io/npm/v/bignumber.io?style=for-the-badge&logo=npm&color=%23cb0000
[npm-link]:ttps://www.npmjs.com/package/bignumber.io
[downloads]:https://img.shields.io/npm/dt/bignumber.io?style=for-the-badge&logo=npm&color=%23cb0000
[license-link]:https://github.com/JossDev-Morales/bigNumbers.io/blob/main/LICENSE
[license-img]:https://img.shields.io/github/license/JossDev-Morales/bigNumbers.io?style=for-the-badge
[git-img]:https://img.shields.io/badge/Git--hub-161b22?logo=github&style=social
[git-link]:https://github.com/JossDev-Morales/bigNumbers.io
[discord-img]:https://img.shields.io/badge/Discord-313338?logo=discord&style=social
[discord-link]:https://discord.com/users/564970023479934977

[Releases Notes](https://github.com/JossDev-Morales/bigNumbers.io#releases-notes)

[**BigNumber.io**](https://www.npmjs.com/package/bignumber.io "BigNumber.io npm link") is a library for javascript operations to be able to handle very large integer numbers and very large decimal numbers, giving you control over this number and facilitating basic mathematics, with good handling of descriptive errors.

## Usage
To be able to represent integers you will need the BigInteger class and for decimal numbers the BigDecimal class, both are an abstraction of these number types.

### Methods

#### **Arithmetic methods**

- Addition 
- ReturnAddition
- Subtraction
- ReturnSubtraction
- Multiplication
- ReturnMultiplication
- Division
- ReturnDivision

#### **Comparation methods**

- gt
- lt
- eq
- gte
- lte

##### **Comparation static methods**

- greaterThan
- lessThan
- isEqualTo
- greaterOrEqualThan
- lessOrEqualThan
- isNaNDecimal (for bigDecimal)
- isNaNInt (for bigInteger)
- isDecimal (only in bigDecimal)
- isSafeInteger

#### **Conversion static methods**

- fromBinary
- fromOctal
- fromHexadecimal
- fromOtherBase
- baseToDecimal
- decimalToBase

Now some old methods also allow you to use conversion, see the [`documentation`](https://github.com/JossDev-Morales/number-converter.io#readme) for conversions and the [releases notes](https://gist.github.com/JossDev-Morales/3d2f932c099e5015cca3f51e3a398f30).

- Return
- SetBigInteger | SetBigDecimal

#### **Non-arithmetic methods**

- Return
- GetRecord
- ClearRecord
- SetBigInteger | SetBigDecimal

### BigInteger and Big Decimal classes
---

Well, this classes are a representation of a big number (BigNumber) that exceeds the javascript limit, its usefull for arithmetic operations with this numbers and give you a record of operations in a **BigNumber** representation.

**It is very simple to use, let's take a look**
```js
   //We initialize the value of the representation by passing a value to the constructor
   const MyBigIntegerNumber = new BigInteger('1999999999999999999999')//we initialize the value
   const MyBigDecimalNumber = new BigDecimal('1999999999999999999999.99999999999999999999')//we initialize the value
```

then, we know how tu use this classes, the next step is to know when to use each one. 
#### So, when should you use each one?

To know when you should use each one, we must first differentiate them, in the case of BigIntegers, this represents integers that exceed the javascript limit, in the case of BigDecimal, this represents decimals that cannot be represented in javascript, therefore the main difference is the type of number

- **BigInteger** integers
- **BigDecimal** decimals

Now, you have to know how both classes behave and what problems they have

- **`BigInteger`** The class that handles integers by working only with integers, uses fewer resources, it is based on the native BigInt class to work with arithmetic operations, therefore it is fast and accurate.

- **`BigDecimal`** The class that handles decimals can also receive integers, it is based on operations with strings, so it can be very precise although it is less fast, the difference exists but it is not very noticeable.

With this in mind, we can say that there are **`2`** use cases for BigIntegers and **`4`** use cases for BigDecimals.

for `BigInteger`:
- when you have an integer representable in javascript
- when you have an integer not representable in javascript that exceeds its safe limit
---
for `BigDecimal`:
- when you have an integer representable in javascript
- when you have an integer not representable in javascript that exceeds its safe limit
- when you have a decimal number representable in javascript
- when you have a decimal number not representable in javascript 

##### so, all cases are useful?

The answer is nah, of course not, generally when you need to represent a number with *BigInteger*, you really expect it to be a **big integer**, if you really expect an integer that is possible to represent with javascript, you should use **"Number"** natively in javascript, therefore this also applies to *BigDecimal* numbers, even though it accepts integers, you should not use it for that, as it is slower compared to BigInteger, also if you expect a decimal representable in javascript, you should use the native **"Number"** from javascript.

## Quick Start
---

The arithmetic methods `Add`, `Subtract`, `Multiplication` and `Division` have a counterpart **"Return"**, which basically derives from the arithmetic method, does not save the result in the object and does not create a record of the operation either, the result of the operation is returned, once this brief explanation is given, let's continue.

Example of Return arithmetic methods:
```js
    // this dont change the current value of your BigInteger
    const MyBigIntegerNumber = new BigInteger('1999999999999999999999').ReturnAddition('1') 
    console.log(MyBigIntegerNumber.Return())// 1999999999999999999999
        // but return the result directly
    console.log(MyBigIntegerNumber.ReturnAddition('1'))// 2000000000000000000000
```

### Addition 
---

#### Parameters: 
- `number` like `String` or `Number`

#### Description: 
adds two numbers, the number corresponding to the `current value` plus the one you pass as a parameter to this method and sets the result of the operation as the `current value`.

#### Returns:
`this` object

### Subtraction
---

#### Parameters:
- `number` like `String` or `Number`

#### Description:
subtracts two numbers, the number corresponding to the `current value` minus the number you pass as a parameter to this method and sets the result of the operation as the `current value`.

#### Returns:
`this` object

### Mulptiplication
---

#### Parameters:
- `number` like `String` or `Number`

#### Description:
multiplies two numbers, the number corresponding to the `current value` by the number you pass as a parameter to this method and sets the result of the operation as the `current value`.

#### Returns:
`this` object

### Division
---

#### Parameters:
- `number` like `String` or `Number`

#### Description:
divides the number corresponding to the `current value` by the number you pass as a parameter to this method and sets the result of the operation as the `current value`.


#### Returns:
`this` object

### Return
---

#### Description:
returns the `current value` as a string representation and now if you pass a radix, `Return` will convert the `current value` to a other base.

#### Returns:
`current value` as a `string`

### GetRecord
---

#### Description:
a log of all operations since the previous `record` reset

#### Returns:
`record` as an `object`

### ClearRecord
---

#### Description:
resets the `record` of operations so far

#### Returns:
`this`


### Set-CurrentObject
---
- BigDecimal
- BigInteger

#### Parameters
- `number` the number to set the current value
- `radix` the base of the number to convert it to a decimal base

#### Description:
set the current value with the number you pass as a parameter and now you can use a number in another number base, passing another parameter named Radix, indicating the base of the number

#### Returns:
`this`


### gt
---

#### Parameters:
- number as a `string` or `number`

#### Description:
Compare the current value with a number received as a parameter to know if the current value is greater than this

#### Returns:
`boolean`


### lt
---

#### Parameters:
- number as a `string` or `number`

#### Description:
Compare the current value with a number received as a parameter to know if the current value is less than this

#### Returns:
`boolean`


### eq
---

#### Parameters:
- number as a `string` or `number`

#### Description:
Compare the current value with a number received as a parameter to know if the current value is equal to this

#### Returns:
`boolean`


### gte
---

#### Parameters:
- number as a `string` or `number`

#### Description:
Compare the current value with a number received as a parameter to know if the current value is greater or equal than this

#### Returns:
`boolean`


### lte
---

#### Parameters:
- number as a `string` or `number`

#### Description:
Compare the current value with a number received as a parameter to know if the current value is less or equal than this

#### Returns:
`boolean`

### Static Methods

#### greaterThan
---
##### Description:
Compare the first parameter with the second to find out if the first parameter is greater than the second parameter.

##### Parameters:
- `number1` The first number
- `number2` The second number

#### Returns:
`boolean`

#### lessThan
---
##### Description:
Compare the first parameter with the second to find out if the first parameter is less than the second parameter.

##### Parameters:
- `number1` The first number
- `number2` The second number

#### Returns:
`boolean`

#### isEqualTo
---
##### Description:
Compare the first parameter with the second to find out if both parameters are the same.

##### Parameters:
- `number1` The first number
- `number2` The second number

#### Returns:
`boolean`

#### greaterOrEqualThan
---
##### Description:
Compare the first parameter with the second to find out if the first parameter is greater than or equal to the second parameter.

##### Parameters:
- `number1` The first number
- `number2` The second number

#### Returns:
`boolean`

#### lessOrEqualThan
---
##### Description:
Compare the first parameter with the second to find out if the first parameter is less than or equal to the second parameter.

##### Parameters:
- `number1` The first number
- `number2` The second number

#### Returns:
`boolean`

#### isNaNDecimal
---
##### Description:
It detects if a number is not a valid decimal, that is, it does not have more than a decimal point, that it has decimal values after the point and does not have Nan type characters.

##### Parameters:
- `number` The number

#### Returns:
`boolean`


#### isDecimal
---
##### Description:
It detects if a number is decimal, that is, if it is not "NaNDecimal" and has decimal values.

##### Parameters:
- `number` The number

#### Returns:
`boolean`

#### isSafeInteger
---
##### Description:
Detects if a number is an integer between the safe range of JavaScript for integers, starting from the smallest safe to the largest.

##### Parameters:
- `number` The number

#### Returns:
`boolean`

#### baseToDecimal
---
##### Description:
This method convert a number from any base to a decimal number.
**See** the [`Documentation`](https://github.com/JossDev-Morales/number-converter.io#readme) for conversions

##### Parameters:
- `number` The number in som base
- `radix` The base of the number

#### Returns:
`string` The converted number to decimal

#### decimalToBase
---
##### Description:
This method convert a decimal number to other base.
**See** the [`Documentation`](https://github.com/JossDev-Morales/number-converter.io#readme) for conversions

##### Parameters:
- `number` The decimal number to convert
- `radix` The base to convert the decimal number

#### Returns:
`string` The converted decimal number to other base 

## IsValidNumber
as a plus, you got a function which lets you know if a number as a string is a valid representation, this same functionality is built into the class BigDecimal, feel free to use it to check if a number is valid to be used.

### This functionality validates the following points:

- validates that the number is a string.
- validates that a number does not have a negative input sign.
- validates that the decimals are not greater than one decimal, this is the maximum number of decimals allowed.
- validates that it does not have rare characters in the string for decimal numbers.
- validates that it does not have rare characters in the string for non-decimal numbers.

#### Throws:
An `error` for each validation

#### Return: 
`boolean` True if it's a valid number

## Releases Notes

See the notes for this release [**`here`**](https://gist.github.com/JossDev-Morales/3d2f932c099e5015cca3f51e3a398f30)

And, [**`here`**](https://gist.github.com/JossDev-Morales/d5d13bcfe8e2da957f3c5e9b311fd4f4) you cand find the notes for all versions.

## License

**bignumber.io** is [`MIT Licensed`](https://github.com/JossDev-Morales/bigNumbers.io/blob/main/LICENSE). 