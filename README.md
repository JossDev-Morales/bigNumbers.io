# BigNumbers.io
---

[**BigNumbers.io**](https://www.npmjs.com/package/bignumbers.io "BigNumbers.io npm link") is a library for javascript operations to be able to handle very large integer numbers and very large decimal numbers, giving you control over this number and facilitating basic mathematics, with good handling of descriptive errors.

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

#### **Non-arithmetic methods**

- Return
- GetRecord
- ClearRecord
- SetBigInteger | SetBigDecimal

### BigInteger and Big Decimal classes

Well, this classes are a representation of a big number (BigNumber) that exceeds the javascript limit, its usefull for arithmetic operations with this numbers and give you a record of operations in a **BigNumber** representation.

**It is very simple to use, let's take a look.**
```js
   //We initialize the value of the representation by passing a value to the constructor
   const MyBigIntegerNumber = new BigInteger('1999999999999999999999')//we initialize the value
   const MyBigDecimalNumber = new BigDecimal('1999999999999999999999.99999999999999999999)//we initialize the value
```
#### So, when should you use it?


