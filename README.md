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
---

Well, this classes are a representation of a big number (BigNumber) that exceeds the javascript limit, its usefull for arithmetic operations with this numbers and give you a record of operations in a **BigNumber** representation.

**It is very simple to use, let's take a look.**
```js
   //We initialize the value of the representation by passing a value to the constructor
   const MyBigIntegerNumber = new BigInteger('1999999999999999999999')//we initialize the value
   const MyBigDecimalNumber = new BigDecimal('1999999999999999999999.99999999999999999999')//we initialize the value
```

then, we know how tu use this classes, the next step is to know when to use each one. 
#### So, when should you use each one?

To know when you should use each one, we must first differentiate them, in the case of BigIntegers, this represents integers that exceed the javascript limit, in the case of BigDecimal, this represents decimals that cannot be represented in javascript, therefore the main difference is the type of number

**BigInteger** integers
**BigDecimal** decimals

Now, you have to know how both classes behave and what problems they have

**BigInteger-** The class that handles integers by working only with integers, uses fewer resources, it is based on the native BigInt class to work with arithmetic operations, therefore it is fast and accurate.

**BigDecimal-** The class that handles decimals can also receive integers, it is based on operations with strings, so it can be very precise although it is less fast, the difference exists but it is not very noticeable.

With this in mind, we can say that there are **2** use cases for BigIntegers and **4** use cases for BigDecimals.

for BigInteger:
- when you have an integer representable in javascript
- when you have an integer not representable in javascript that exceeds its safe limit
---
for BigDecimal:
- when you have an integer representable in javascript
- when you have an integer not representable in javascript that exceeds its safe limit
- when you have a decimal number representable in javascript
- when you have a decimal number not representable in javascript 

##### so, all cases are useful?

The answer is nah, of course not, generally when you need to represent a number with *BigInteger*, you really expect it to be a **big integer**, if you really expect an integer that is possible to represent with javascript, you should use **"Number"** natively in javascript, therefore this also applies to *BigDecimal* numbers, even though it accepts integers, you should not use it for that, as it is slower compared to BigInteger, also if you expect a decimal representable in javascript, you should use the native **"Number"** from javascript.





