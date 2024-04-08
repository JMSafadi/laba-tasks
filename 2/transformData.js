const transformData = {
  addValues: function(a, b) {
    const numA = Number(a)
    const numB = Number(b)
    if (!isNaN(numA) && !isNaN(numB)) {
      return numA + numB
    } else if (typeof a === 'string' || typeof b === 'string') {
      return String(a) + String(b)
    } else if (Array.isArray(a) && Array.isArray(b)) {
      return [...a, ...b]
    } else if (typeof a === 'object' && typeof b === 'object') {
      return {...a , ...b}
    } else {
      throw new Error(`Arguments ${a} and ${b} can't be added`)
    }
  },
  stringifyValues: function(a) {
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
      throw new Error(`Argument: ${a}, must be a boolean value.`)
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
    } else {
      throw new Error(`Coercion not possible with value: ${value} and type ${type}`)
    }
  }
}

console.log(transformData.addValues(100, '100')) //200
console.log(transformData.addValues('hello', '100')) // hello100
console.log(transformData.addValues(50, true)) // 51
console.log(transformData.addValues([50], [1,2,3])) // [ 50, 1, 2, 3 ]
console.log(transformData.addValues({name: 'Julian'}, {lastName: 'Safadi'})) // { name: 'Julian', lastName: 'Safadi' }

console.log(transformData.stringifyValues(150)) // '150'
console.log(transformData.stringifyValues({name: 'Julian'})) // {"name":"Julian"}
console.log(transformData.stringifyValues(true)) // true
console.log(transformData.stringifyValues([5,2,3])) // [5,2,3]

console.log(transformData.invertBoolean(true)) // false

console.log(transformData.convertToNumber('55')) // 55
console.log(transformData.convertToNumber(false)) // 0

console.log(transformData.coerceToType('40', 'number')) // 40