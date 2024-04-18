// 
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com'
}

Object.keys(person).forEach(key => {
  Object.defineProperty(person, key, { writable: false })
  let descriptor = Object.getOwnPropertyDescriptor(person, key)
  console.log(descriptor.writable)
})

person.updateInfo = function(newObj) {
  Object.keys(newObj).forEach(key => {
    Object.defineProperty(this, key, { writable: true })
    if (this.hasOwnProperty(key) && Object.getOwnPropertyDescriptor(this, key).writable) {
      this[key] = newObj[key]
    }
    Object.defineProperty(this, key, { writable: false })
  })
}

const newPersonInfo = {
  firstName: 'Julian',
  lastName: 'Safadi',
  age: 26,
  email: 'julian.safadi@example.com',
}


Object.defineProperty(person, 'address', {
  value: {},
  writable: true,
  enumerable: false,
  configurable: false
})

console.dir(person)
person.updateInfo(newPersonInfo)
console.dir(person)

//
const product = {
  name: 'Laptop',
  price: 1000,
  quantity: 5
}

Object.defineProperties(product, {
  price: {
    enumerable: false,
    configurable: false,
  },
  quantity: {
    enumerable: false,
    configurable: false,
  }
})

console.dir(product)

function getTotalPrice(obj) {
  Object.keys(obj).forEach(key => {
    Object.defineProperty(obj, key, { writable: true, configurable: true })
    console.log(Object.getOwnPropertyDescriptor(obj, key))

    
  })
}

getTotalPrice(product)