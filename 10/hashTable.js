// Abstract class to be extended.
class HashTable {
  constructor(size = 10) {
    this.size = size
    this.table = new Array(10)
    this.count = 0 // Track number of elements inserted to resize.
    if (this.constructor === HashTable) {
      throw new Error(`Can't instantiate HashTable directly, must use subclasses.`)
    }
  }
  // Private hashing method - DJB2 algorithm
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
    if (this.count / this.size >= 0.70) {
      this._resize()
    }
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
    this.count++
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
  // Delete item by key method.
  remove(key) {
    const index = this._hash(key)
    let current = this.table[index]
    let previous = null
    // Case if key doesn't exit.
    if (!current) {
      throw new Error(`Key: ${key} doesn't exist.`)
    }
    // Update pointer if key to remove is the first node of linked list.
    if (current.key === key) {
      this.table[index] = current.next
      this.count--
      return
    }
    // If slot has a linked list, traverse to find key.
    while (current) {
      if (current.key === key) {
        previous.next = current.next
        this.count--
        return
      }
      previous = current
      current = current.next
    }
  }
  // Search if a key already exists.
  search(key) {
    const index = this._hash(key)
    let current = this.table[index]
    if (!current) {
      return false
    }
    // Search individual nodes.
    if (current.key === key) {
      return true
    }
    // Search through linked lists nodes.
    while (current) {
      if (current.key === key) {
        return true
      }
      current = current.next
    }
    return false
  }
  // Private method to resize table and insert again values.
  // This keep a good amount of empty slots to avoid collisions.
  _resize() {
    const prevTable = this.table
    const newSize = this.size * 2
    this.table = new Array(newSize)
    this.size = newSize
    this.count = 0
    for (let i = 0; i < prevTable.length; i++) {
      if (prevTable[i] !== undefined && prevTable[i] !== null) {
        this.set(prevTable[i].key, prevTable[i].value)
      }
    }
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
hashTableChExample.set('key11', 6)
hashTableChExample.set('key12', 98)
hashTableChExample.set('key13', 98)

console.log('Length resized:', hashTableChExample.table.length)

hashTableChExample.remove('key8') // Removes chained value
hashTableChExample.remove('key5')

console.log('Getting', hashTableChExample.get('key3')) // Getting 34
console.log('Getting', hashTableChExample.get('key4')) // Getting 40
console.log(hashTableChExample.search('key10')) // true

console.log('Has Table - Chaining', hashTableChExample.table)


// Hash table Linear Probing.
class HashTableLinearProbing extends HashTable {
  constructor(size) {
    super(size)
  }
  // Insert handling collision with Open Addressing - Linear Probing strayegy.
  set(key, value) {
    // Check if table needs to be resized - when it fills 75% slots.
    if (this.count / this.size >= 0.70) {
      this._resize()
    }
    let index = this._hash(key)
    while (this.table[index] !== undefined) {
      index = (index + 1) % this.size
    }
    this.table[index] = { key, value }
    this.count++
  }
  // Get value by key.
  get(key) {
    let index = this._hash(key)
    const start = index
    while (this.table[index] !== undefined) {
      if (this.table[index].key === key) {
        return this.table[index].value
      }
      index = (index + 1) % this.size
      if (index === start) break // Exit loop if we back to start.
    }
    throw new Error(`Key: ${key} doesn't exists.`)
  }
  // Remove by key.
  remove(key) {
    let index = this._hash(key)
    const start = index
    // Loop until find key and set it to null.
    while (this.table[index] !== null && this.table[index] !== undefined) {
      if (this.table[index].key === key) {
        this.table[index] = null
        this.count--
        return
      }
      index = (index + 1) % this.size
      if (index === start) break // Exit loop if we back to start.
    }
    throw new Error(`Key: ${key} doesn't exist.`)
  }
  // Search if key exist.
  search(key) {
    let index = this._hash(key)
    const start = index
    // Loop until find key and return true if it exist.
    while (this.table[index] !== undefined) {
      if (this.table[index] !== null && this.table[index].key === key) {
        return true
      }
      index = (index + 1) % this.size
      if (index === start) break // Exit loop if we back to start.
    }
    // If key not found.
    return false
  }
  // Resize method in linear probing hash table. 
  // Uses differente set() to reinsert values.
  _resize() {
    const prevTable = this.table
    const newSize = this.size * 2
    this.table = new Array(newSize)
    this.size = newSize
    this.count = 0
    for (let i = 0; i < prevTable.length; i++) {
      if (prevTable[i] !== undefined && prevTable[i] !== null) {
        this.set(prevTable[i].key, prevTable[i].value)
      }
    }
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
hashTableLPExample.set('key7', 20)
hashTableLPExample.set('key8', 31)
hashTableLPExample.set('key9', 82)
hashTableLPExample.set('key10', 92)
hashTableLPExample.set('key11', 1)
console.log('Length resized:', hashTableLPExample.table.length)

console.log(hashTableLPExample.get('key5')) // 41
// console.log(hashTableLPExample.get('key0')) // Error: Key: key0 doesn't exists.

hashTableLPExample.remove('key9')
hashTableLPExample.remove('key7')

console.log(hashTableLPExample.search('key3')) // true
console.log(hashTableLPExample.search('key12')) // false

console.log('Hash Table - Linear Probing', hashTableLPExample.table)


// Remain method to iterate through all key-values pairs in the hash table.

// <-- Analysis -->
// The custom hash function DJB2 algorithm it's known for its simplicity and relatively good distrbution of hash values. It's time complexity is O(n) where n is the lenght of the key because it iterates over each character of the string key.

// In Linear Probing table, methods set(), get(), remove() and search() has O(1) time complexity in average case if we mantain a low load factor. That's because the table resizes, doubling size, when 70% of the slots are occupied. In worst cases, time complexity can be O(n) if there are too many collisions and few empty slots, taking more time to find the key, or insert the value.

// In Chaining table, methods set(), get(), remove() and search() also have time complexity O(1), if hash function distributes uniformly the keys and in worst case O(n), if we have many keys collision and if many of them accumulates in the same bucket. This require to itrerate throught lists taking more time to do oprations.

// Resize opreration has O(m) where m is the size of the new table: 2.
// Then the iteration of the previous table also takes O(n) where n are the total of elements extisting. The differences in time complexity when resizing, are going to be in the reinsert method, depending on the collision strategy of the table.
