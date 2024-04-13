// Task 1
const products = [136, 64, 13409, 7]
// console.log('Initial array:', products)

function calculateDiscountedPrice(array, discount) {
  const productsDiscounted = array.map(prod => prod - (prod * discount / 100))
  return productsDiscounted
}
// console.log('Discounted array:', calculateDiscountedPrice(products, 10))

function calculateTotalPrice(arr) {
  const totalProductsPrice = arr.reduce((acc, value) => acc + value)
  return totalProductsPrice
}
// console.log('Products total price:', calculateTotalPrice(products))


// Task 2
const compose = (...functions) => arg => functions.reduceRight((result, fn) => fn(result), arg)

// 
const person1 = {
  firstName: 'Julian',
  lastName: 'Safadi'
}
const getFullName = person => `${person.firstName} ${person.lastName}`
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

const filterGrades = (arr) => arr.map(student => student.grade)
const addGrades = (arr) => {
  const total = arr.reduce((acc, value) => acc + value, 0)
  return { total , arr }
}
const averageGrades = ({ total, arr }) => total / arr.length
const getAverageGrade = compose(averageGrades, addGrades, filterGrades)
console.log(getAverageGrade(students))


// Task 3
function createCounter() {
 
}
