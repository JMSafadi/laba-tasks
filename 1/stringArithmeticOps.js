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

const plusResult = '451279512745127951271'.plus('643192578461923465973175')


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

const minusResult = '646594185749815751271'.minus('9712712127951212')


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

const divideResult = '6463179127952162'.divide('4175127272')
