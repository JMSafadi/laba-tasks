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
console.log(product)

function getTotalPrice(obj) {
  const productPrice = Object.getOwnPropertyDescriptor(obj, 'price').value
  const productQty = Object.getOwnPropertyDescriptor(obj, 'quantity').value
  return productPrice * productQty
}
console.log(getTotalPrice(product))

function deleteNonConfigurable(obj, prop) {
  Object.getOwnPropertyNames(obj).forEach(key => {
    const descriptor = Object.getOwnPropertyDescriptor(obj, key)
    console.log(descriptor)
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
console.log(Object.getOwnPropertyNames(product)) //  'name', 'price', 'quantity' ]
console.log(deleteNonConfigurable(product, 'quantity'))
console.log(Object.getOwnPropertyNames(product)) // [ 'name', 'price' ]

// 3
const bankAccount1 = {
  _balance: 400,
  get formattedBalance() {
    return `$${this._balance}`
  },
  set updateBalance(newBalance) {
    this._balance = newBalance 
  },
  transfer(currentAcc, targetAcc, amount) {
    if (amount > this._balance ) {
      throw new Error(`Insufficient funds.`)
    }
    currentAcc._balance -= amount
    targetAcc._balance += amount
  }
}

console.log(bankAccount1.formattedBalance)
bankAccount1.updateBalance = 1000
console.log(bankAccount1.formattedBalance)

const bankAccount2 = { 
  _balance: 400,
  get formattedBalance() {
    return `$${this._balance}`
  },
  set updateBalance(newBalance) {
    this._balance = newBalance 
  },
}

bankAccount1.transfer(bankAccount1, bankAccount2, 200)
console.log('Account 1', bankAccount1.formattedBalance)
console.log('Account 2', bankAccount2.formattedBalance)

bankAccount1.transfer(bankAccount2, bankAccount1, 50)
console.log('Account 1', bankAccount1.formattedBalance)
console.log('Account 2', bankAccount2.formattedBalance)


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
console.log(Object.getOwnPropertyNames(immutableVersionObj))


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
function deepCloneObject(obj, clonedObjects = new WeakMap()) {
  const clone = Array.isArray(obj) ? [] : {}
  if (typeof obj !== 'object') {
    return obj
  }
  if (clonedObjects.has(obj)) {
    return clonedObjects.get(obj)
  }
  clonedObjects.set(obj, clone)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepCloneObject(obj[key], clonedObjects)
    }
  }
  return clone
}

const user = {
  name: 'Juan',
  email: 'juan@example.com',
  address: {
    street: 'Av. Street',
    number: 1000
  },
  intArr: [10, 20, 100],
}

user.self = user //  Circular reference
const userClone = deepCloneObject(user)
console.log(userClone)

// 7
function validateObject(obj, schema) {
  for (let key in schema) {
    const schemaProp = schema[key]
    const objProp = obj[key]
    if (schemaProp.required && !obj.hasOwnProperty(key)) {
      return false
    }

    if (obj.hasOwnProperty(key)) {
      if (schemaProp && typeof objProp !== schemaProp.type) {
        return false
      }
      
      if (schemaProp.type === 'object' && schemaProp.properties) {
        if (!validateObject(objProp, schemaProp)) {
          return false
        }
      }
    }
  }
  return true
}

const newUser = {
  name: 'Julian',
  lastName: 'Safadi',
  age: 26,
  address: {
    street: 'Av. Libertador',
    number: 1000,
    city: 'Buenos Aires'
  },
  isPremium: true
}

const ObjSchema = {
  name: { type: 'string', required: true },
  lastName: { type: 'string', required: true },
  age: { type: 'number', required: true },
  address: { 
    type: 'object',
    properties: {
      street: { type: 'string' },
      number: { type: 'number' },
      city: { type: 'string' },
    },
    required: true
  },
  isPremium: { type: 'boolean', required: true }
}
console.log(validateObject(newUser, ObjSchema))