// Task:
// Your task is to implement arithmetic operations on strings without relying on bigint or arithmetic libraries. You need to create functions that perform arithmetic operations as string functions,
///considering only positive integers (negative numbers can be avoided, as all numbers will be positive integers).
// All input and output numbers will be positive integers.
// For subtraction, ensure that the first parameter is always greater than the second parameter.
// Division should only result in an integer value.


// String.plus(string): This function should take another string as input and return the result of adding the two strings together.
String.prototype.plus = function(numStr) {
  let result = ''
  let remainder = 0
  let i = this.length - 1
  let j = numStr.length - 1

  while(i >= 0 || j >= 0) {
    const dig1 = +this[i] || 0
    const dig2 = +numStr[j] || 0

    const added = dig1 + dig2 + remainder
    remainder = Math.floor(added / 10)
    result = (added % 10).toString() + result

    i--
    j--
  }

  if (remainder > 0) {
    result = remainder.toString() + result
  }

  return result
}

const logPlus = '451279512745127951271'.plus('643192578461923465973175')
console.log(logPlus)


// String.minus(string): This function should take another string as input and return the result of subtracting the second string from the first string.
// Note that the first parameter will always be greater than the second parameter.
String.prototype.minus = function(numStr) {
  if (+this < +numStr) {
    throw new Error(`The string that invokes minus method ${this}, must be greather than the provided by arguments ${numStr}`)
  }

  let result = ''
  let remainder = 0
  let i = this.length - 1
  let j = numStr.length - 1

  while(i >= 0 || j >= 0) {
    const dig1 = +this[i] || 0
    const dig2 = +numStr[j] || 0
    let subtraction = dig1 - dig2 - remainder
    if (subtraction < 0) {
      subtraction += 10
      remainder = 1
    } else {
      remainder = 0
    }
    result = subtraction.toString() + result
    i--
    j--
  }
  return result
}

const logMinus = '646594185749815751271'.minus('9712712127951212')
console.log(logMinus)


// String.divide(string): This function should take another string as input and return the result of dividing the first string by the second string. 
// Division should only result in an integer value.
String.prototype.divide = function (numStr) {
  if (+numStr === 0) {
      throw new Error('Divisor must be a positive integer')
  }

  const dividend = this
  const divisor = numStr
  let quotient = ''
  let currentDividend = ''

  for (let i = 0; i < dividend.length; i++) {
      currentDividend += dividend[i]
      if (+currentDividend >= +divisor) {
          let tempQuotient = 0
          let tempDividend = currentDividend

          while (+tempDividend >= +divisor) {
              tempDividend = (+tempDividend) - (+divisor).toString()
              tempQuotient++
          }
          quotient += tempQuotient.toString()
          currentDividend = tempDividend
      } else {
          quotient += '0'
      }
  }

  quotient = quotient.replace(/^0+/, '')
  return quotient
}

const logDivision = '6463179127952162'.divide('4175127272')
console.log(logDivision)
