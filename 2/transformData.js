const transformData = {
  addValues: function(a, b) {
    const numA = Number(a)
    const numB = Number(b)

    if (!isNaN(numA) && !isNaN(numB)) {

      return numA + numB

    } else if (typeof a === 'string' || typeof b === 'string') {

      return String(a) + String(b)

    } else {
      throw new Error(`Arguments ${a} and ${b} can't be added`)
    }
  }
}

console.log(transformData.addValues(100, '100'))
