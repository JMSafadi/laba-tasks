class HashTable {
  constructor(size = 10) {
    this.size = size
    this.table = new Array(10)
    if (this.constructor === HashTable) {
      throw new Error(`Can't instantiate HashTable directly, must use subclasses.`)
    }
  }
  // Hashing function - DJB2 algorithm
  _hash(key) {
    let hash = 5381
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 33) ^ key.charCodeAt(i)
    }
    return Math.abs(hash) % this.size
  }
  // Abstract methods.
  set() {
    throw new Error(`Method 'set' must be implemented in subclasses.`)
  }
  get() {
    throw new Error(`Method 'get' must be implemented in subclasses.`)
  }
  remove() {
    throw new Error(`Method 'remove' must be implemented in subclasses.`)
  }
}

// Class to instantiate chained Nodes.
class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.next = null
  }
}

// Hash table class hanlding collisions with chaining strategy.
class HashTableChaining extends HashTable {
  constructor(size) {
    super(size)
  }
  // Insert with chaining creating linked list.
  set(key, value) {
    const index = this._hash(key)
    const newNode = new Node(key, value)
    if (!this.table[index]) {
      this.table[index] = newNode
    } else {
      let current = this.table[index]
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
  }
  // Get value by key from the linked list.
  get(key) {
    const index = this._hash(key)
    let current = this.table[index]
    if (!current.key) {
      throw new Error(`Key: ${key} doesn't exist.`)
    }
    while (current) {
      if (current.key === key) {
        return current.value
      }
      current = current.next
    }
  }
  remove(key) {



  }
  // Search if a key already exists.
  search(key) {
    const index = this._hash(key)
    if (!this.table[index]) {
      throw new Error(`Key: ${key} doesn't exist.`)
    }
    return true
  }
}

// Demonstration
const hashTableChExample = new HashTableChaining()
hashTableChExample.set('key1', 50)
hashTableChExample.set('key2', 11)
hashTableChExample.set('key3', 34)
hashTableChExample.set('key4', 40)
hashTableChExample.set('key5', 64)
hashTableChExample.set('key6', 20)
hashTableChExample.set('key7', 15)
hashTableChExample.set('key8', 82)
hashTableChExample.set('key9', 93)
hashTableChExample.set('key10', 67)

console.log(hashTableChExample.table)

console.log('Getting', hashTableChExample.get('key3')) // 121
console.log('Getting', hashTableChExample.get('key4')) // 40
console.log(hashTableChExample.search('key1')) // true


// Hash table class hanlding collisions with Linear-Probing strategy.
class HashTableLinearProbing extends HashTable {
  constructor(size) {
    super(size)
  }
  // Insert handling collision with Open Addressing - Linear Probing
  set(key, value) {
    let index = this._hash(key)
    while (this.table[index] !== undefined) {
      index = (index + 1) % this.size
    }
    this.table[index] = { key, value }
  }
  get() {

  }
  delete() {

  }
  search() {

  }
}

// Demonstration
const hashTableLPExample = new HashTableLinearProbing()
hashTableLPExample.set('key1', 74)
hashTableLPExample.set('key2', 20)
hashTableLPExample.set('key3', 61)
hashTableLPExample.set('key4', 50)
hashTableLPExample.set('key5', 41)
hashTableLPExample.set('key6', 74)
hashTableLPExample.set('key7', 15)
hashTableLPExample.set('key8', 15)
hashTableLPExample.set('key9', 15)
hashTableLPExample.set('key10', 15)
console.log('Linear collision', hashTableLPExample.table)
