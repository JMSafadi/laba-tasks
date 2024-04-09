const transformData = {
  addValues: function(a, b) {
    const numA = Number(a)
    const numB = Number(b)
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA + numB
    } else if (typeof a === 'string' || typeof b === 'string') {
      return String(a) + String(b)
    } else {
      throw new Error(`Arguments ${a} and ${b} can't be added.`)
    }
  },
  // Verificar si la conversion fue a String, sino tirar error
  stringifyValue: function(a) {
    if (typeof a === 'object') {
      return JSON.stringify(a)
    } else {
      return String(a)
    }
  },
  invertBoolean: function(a) {
    if (typeof a === 'boolean') {
      return !a
    } else {
      throw new Error(`Argument: ${a}, must be a boolean value and not ${typeof a}.`)
    }
  },
  convertToNumber: function(a) {
    if (typeof a === 'number') {
      return a
    } else if (typeof a === 'string') {
      const parsedA = parseInt(a)

      if (!isNaN(parsedA)) {
        return parsedA
      } else {
        throw new Error(`Argument type: ${typeof a} can't be converted to number.`)
      }
    } else {
      const numA = Number(a)
      if (!isNaN(numA)) {
        return numA
      } else {
        throw new Error(`Argumnt type: ${typeof a} can't be converted to number.`)
      }
    }
  },
  coerceToType: function(value, type) {
    if (type === 'number') {
      const valueNum = Number(value)
      if (!isNaN(valueNum)) {
        return Number(value)
      } else {
        throw new Error(`Value: ${value} can't be converted to a number.`)
      }
    } else if (type === 'string') {
      return String(value)
    } else if (type === 'boolean') {
      return Boolean(value)
    } else if (type === 'bigint') {
      return BigInt(value)
    } else {
      throw new Error(`Coercion not possible with value: ${value} and type ${type}.`)
    }
  },
  convertToBigInt: function(a) {
    if (typeof a === 'bigint') {
      return a
    } else if (typeof a === 'number') {
      if (!Number.isSafeInteger(a)) {
        return BigInt(a)
      } else {
        throw new Error(`Number ${a} doesn't need to be converted to a bigint because is safe integer.`)
      }
    } else {
      throw new Error(`Argument must be a type number and not ${typeof a}.`)
    }
  }
}

console.log(transformData.addValues(100, '100')) //200
console.log(transformData.addValues('hello', '100')) // hello100
console.log(transformData.addValues(50, true)) // 51
console.log(transformData.addValues(null, true)) // 1
console.log(transformData.addValues(BigInt(64975915909416567591n), 8181)) // 64975915909416575000

console.log(transformData.stringifyValue(150)) // '150'
console.log(transformData.stringifyValue({name: 'Julian'})) // {"name":"Julian"}
console.log(transformData.stringifyValue(true)) // true
console.log(transformData.stringifyValue([5,2,3])) // [5,2,3]

console.log(transformData.invertBoolean(true)) // false
// console.log(transformData.invertBoolean(51)) // Error

console.log(transformData.convertToNumber('55')) // 55
console.log(transformData.convertToNumber(false)) // 0
console.log(transformData.convertToNumber(34619755905948762130n)) // 34619755905948762000
// console.log(transformData.convertToNumber({name: 'Julian', lastName: 'Safadi'})) // Error

console.log(transformData.coerceToType(34619755905948762130, 'bigint')) // 34619755905948762112n
console.log(transformData.coerceToType(0, 'boolean')) // false
console.log(transformData.coerceToType('150', 'number')) // 150

console.log(transformData.convertToBigInt(346197546198273461497n)) // 346197546198273461497n
// console.log(transformData.convertToBigInt(10)) // Error