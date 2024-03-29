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

const plusResult = '4512795127451279512714242453240'.plus('643192578461923465973175')
console.log(plusResult)


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

const minusResult = '64659418574981575127117912712'.minus('9712712127951212617391672')
console.log(minusResult)


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

const divideResult = '646317912795216242452424453434'.divide('417512727227224244')
console.log(divideResult)


String.prototype.multiply = function (numStr) {
  if (this === '0' || numStr === '0') {
    throw new Error('Numbers must be positive integers')
  }

  const multiplying = this.split('').reverse()
  const multiplier = numStr.split('').reverse()

  const tempResults = []

  for (let i = 0; i < multiplier.length; i++) {
    let remainder = 0
    let tempResult = ''
    tempResult = tempResult + '0'.repeat(i)

    for (let j = 0; j < multiplying.length; j++) {
      const multiplied = +multiplier[i] * +multiplying[j] + remainder
      remainder = Math.floor(multiplied / 10)
      tempResult += multiplied % 10
    }

    if (remainder > 0) {
      tempResult += remainder
    }
    
    tempResults.push(tempResult)
  }

  // Invert the temporary results to add them with .plus() previous declared function
  const tempResultReversed = tempResults.map(cadena => cadena.split('').reverse().join(''))

  let result = '0'
  for (const tempResult of tempResultReversed) {
   result = result.plus(tempResult)
  }

  return result
}

const multiplyrResult = '12345678901234567890'.multiply('98765432109876543210')
console.log(multiplyrResult)
