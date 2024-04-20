// 1
const person = {
  firstName: 'John',
  lastName: 'Doe',
  age: 30,
  email: 'john.doe@example.com',
}

Object.keys(person).forEach(key => {
  Object.defineProperty(person, key, { writable: false })
  let descriptor = Object.getOwnPropertyDescriptor(person, key)
  // console.log(descriptor.writable)
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
// console.dir(person)
person.updateInfo(newPersonInfo)
// console.dir(person)

// 2
const product = {
  name: 'Laptop',
  price: 1000,
  quantity: 5
}

Object.defineProperties(product, {
  price: {
    writable: false,
    enumerable: false,
  },
  quantity: {
    writable: false,
    enumerable: false,
  }
})
// console.log(product)

function getTotalPrice(obj) {
  const productPrice = Object.getOwnPropertyDescriptor(obj, 'price').value
  const productQty = Object.getOwnPropertyDescriptor(obj, 'quantity').value
  return productPrice * productQty
}
// console.log(getTotalPrice(product))

function deleteNonConfigurable(obj, prop) {
  Object.getOwnPropertyNames(obj).forEach(key => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key)
    // console.log(descriptor)
    if (key === prop) {
      if (descriptor.configurable === false) {
        throw new Error(`This property can't be modified or deleted. It's setted as non-configurable.`)
      }
      delete obj[key]
    } else if (descriptor.configurable === false) {
      throw new Error(`This property can't be modified or deleted. It's setted as non-configurable.`)
    }
  })

}
// console.log(Object.getOwnPropertyNames(product)) //  'name', 'price', 'quantity' ]
// console.log(deleteNonConfigurable(product, 'quantity'))
// console.log(Object.getOwnPropertyNames(product)) // [ 'name', 'price' ]

// 3
const bankAccount1 = {
  _balance: 500,
  get formattedBalance() {
    return `$${this._balance}`
  },
  set updateBalance(newBalance) {
    this._balance = newBalance 
  },
  transfer(targetAcc, amount) {
    if (amount > this._balance ) {
      throw new Error(`Insufficient funds.`)
    }
    this._balance -= amount
    targetAcc._balance += amount
  }
}

// console.log(bankAccount1.formattedBalance)
bankAccount1.updateBalance = 1000
// console.log(bankAccount1.formattedBalance)

const bankAccount2 = { 
  _balance: 400,
  get formattedBalance() {
    return `$${this._balance}`
  },
  set updateBalance(newBalance) {
    this._balance = newBalance 
  },
  transfer(targetAcc, amount) {
    if (amount > this._balance ) {
      throw new Error(`Insufficient funds.`)
    }
    this._balance -= amount
    targetAcc._balance += amount
  }
}

bankAccount1.transfer(bankAccount2, 200)
// console.log('Account 1', bankAccount1.formattedBalance)
// console.log('Account 2', bankAccount2.formattedBalance)

bankAccount2.transfer(bankAccount1, 50)
// console.log('Account 1', bankAccount1.formattedBalance)
// console.log('Account 2', bankAccount2.formattedBalance)


// 4
function createImmutableObject(obj) {
  const immutableObj = {}
  Object.getOwnPropertyNames(obj).forEach(key => {
    let descriptor = Object.getOwnPropertyDescriptor(obj, key)

    if (descriptor) {
      Object.defineProperty(immutableObj, key, {
        value: obj[key],
        writable: false,
        enumerable: descriptor.enumerable,
        configurable: false
      })
    }
    if (typeof descriptor.value === 'object') {
      immutableObj[key] = createImmutableObject(descriptor.value)
    }
  })
  return immutableObj
}
const immutableVersionObj = createImmutableObject(person)
// console.log(Object.getOwnPropertyNames(immutableVersionObj))


// 5
function observeObject(obj, cb) {

  const handler = {
    get: function(target, prop) {
      if (!Object.getOwnPropertyDescriptor(target, prop).enumerable) {
        Object.defineProperty(target, prop, { enumerable: true })
        cb(`Getting prop: ${prop}`)
        Object.defineProperty(target, prop, { enumerable: false })
      } else {
        cb(`Getting prop: ${prop}.`)
      }
      return target[prop]
    },
    set: function(target, prop, value) {
      if (!Object.getOwnPropertyDescriptor(target, prop).writable) {
        Object.defineProperty(target, prop, { writable: true })
        target[prop] = value
        cb(`Setting value: ${value} to the prop: ${prop}.`)
        Object.defineProperty(target, prop, { writable: false })
      } else {
        target[prop] = value
        cb(`Setting value: ${value} to the prop: ${prop}.`)
      }
    }
  }
  return new Proxy(obj, handler)
}

const proxy = observeObject(person, (str) => console.log(str))
console.log(person.firstName)

proxy.firstName = 'Matias'
console.log(person.firstName)

// 6
