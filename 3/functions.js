// Task 1
const products = [136, 64, 13409, 7]
console.log('Initial array:', products)

function calculateDiscountedPrice(array, discount) {
  const productsDiscounted = array.map(prod => prod - (prod * discount / 100))
  return productsDiscounted
}
console.log('Discounted array:', calculateDiscountedPrice(products, 10))

function calculateTotalPrice(arr) {
  const totalProductsPrice = arr.reduce((acc, value) => acc + value)
  return totalProductsPrice
}
console.log('Products total price:', calculateTotalPrice(products))

// Task 2
function getFullName({ firstName, lastName }) {
  return `${firstName} ${lastName}`
}
console.log(getFullName({
  firstName: 'Julian',
  lastName: 'Safadi'
}))


// Aplicar composition and point-free style
function firstUniqueWords(str) {
  const uniqueWords = []
  str.split(' ').forEach(word => {
    if (!uniqueWords.includes(word)) {
      uniqueWords.push(word)
    }
  })
  return uniqueWords.sort()
}
console.log(firstUniqueWords('this this is an example example for task task 2'))
// Aplicar composition and point-free style


function getAverageGrade() {

}