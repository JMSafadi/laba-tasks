const products = [136, 64, 13409, 7]

function calculateDiscountedPrice(array, discount) {
  const productsDiscounted = array.map(prod => prod - (prod * discount / 100))
  return productsDiscounted
}

console.log('Initial array:', products)
// console.log('Discounted array:', calculateDiscountedPrice(products, 10))

function calculateTotalPrice(arr) {
  const totalProductsPrice = arr.reduce((acc, value) => acc + value)
  return totalProductsPrice
}

// console.log('Products total price:', calculateTotalPrice(products))
