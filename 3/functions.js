// Task 1
const products = [136, 64, 13409, 7]

function calculateDiscountedPrice(array, discount) {
  const productsDiscounted = array.map(prod => prod - (prod * discount / 100))
  return productsDiscounted
}
console.log(calculateDiscountedPrice(products, 10))

function calculateTotalPrice(arr) {
  const totalProductsPrice = arr.reduce((acc, value) => acc + value, 0)
  return totalProductsPrice
}
console.log(calculateTotalPrice(products))


// Task 2
const compose = (...functions) => arg => functions.reduceRight((accum, fn) => fn(accum), arg)

// 
const getFullName = person => `${person.firstName} ${person.lastName}`

const person1 = {
  firstName: 'Julian',
  lastName: 'Safadi'
}
console.log(getFullName(person1))

// 
const filterUnique = (str) => {
  const uniqueWords = []
  str.split(' ').forEach(word => {
    if (!uniqueWords.includes(word)) {
      uniqueWords.push(word)
    }
  })
  return uniqueWords
}
const sortWords = (arr) => arr.sort()
const filterUniqueWords = compose(sortWords, filterUnique)
console.log(filterUniqueWords('this this is an example for task task 3'))

// 
const filterGrades = (arr) => arr.map(student => student.grade)
const addGrades = (arr) => {
  const total = arr.reduce((acc, value) => acc + value, 0)
  return { total , arr }
}
const averageGrades = ({ total, arr }) => total / arr.length
const getAverageGrade = compose(averageGrades, addGrades, filterGrades)

const students = [{
  name: 'Gonzalo',
  grade: 3
}, {
  name: 'Juan',
  grade: 7
}, {
  name: 'Matias',
  grade: 2
}]

console.log(getAverageGrade(students))


// Task 3
const createCounter = function() {
  let count = 0
  return () => ++count
}


const counter1 = createCounter()
const counter2 = createCounter()

console.log(counter1())
console.log(counter1())
console.log(counter1())

console.log(counter2())
console.log(counter2())
console.log(counter2())

function repeatFunction(fn, num) {
  if (num < 0) {
    return () => {
      while (true) {
        fn()
      }
    }
  } else {
    return () => {
      for (i = 0; i < num; i++) {
        fn()
      }
    }
  }
}

const sayHi = () => console.log('hi')
const repeat = repeatFunction(sayHi, 3)
console.log(repeat())

// Task 4
function calculateFactorial(num) {
  if (num <= 1) return 1
  return num * calculateFactorial(num - 1)
}
console.log(calculateFactorial(5))

// 
function power(base, exp) {
  if (exp === 0) {
    return 1
  } else if (exp < 0) {
    return 1 / power(base, -exp)
  } else {
    return base * power(base, exp - 1)
  }
}
console.log(power(2, -3))

// Task 5 
function lazyMap(arr, mapFn) {
  let index = 0
  return () => {
    if (index < arr.length) {
      const result = mapFn(arr[index])
      index++
      return result
    } else {
      throw new Error(`There are no more values to map. Only ${arr.length}`)
    }
  }
}
const numbers = [5, 10, 30]
const mapFn = x => x * 2
const lazyGenerator = lazyMap(numbers, mapFn)

console.log(lazyGenerator())
console.log(lazyGenerator())
console.log(lazyGenerator())
// console.log(lazyGenerator()) // Error

// 
function fibonacciGenerator() {
  let current = 0
  let next = 1
  return {
    next: () => {
      let result = current
      let temp = next
      next = current + next
      current = temp
      debugger
      return result
    }
  }

}
const fibonacci = fibonacciGenerator()

console.log(fibonacci.next())
console.log(fibonacci.next())
console.log(fibonacci.next())
console.log(fibonacci.next())
console.log(fibonacci.next())
console.log(fibonacci.next())
console.log(fibonacci.next())
console.log(fibonacci.next())
