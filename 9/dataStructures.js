// 1
class Stack {
  constructor() {
    this.items = []
  }
  push(item) {
    this.items.push(item)
  }
  pop() {
    this.items.pop()
  }
  peek() {
    return this.items[this.items.length-1]
  }
}

const stack1 = new Stack()

// stack1.push(1)
// stack1.push(2)
// stack1.push(50)
// stack1.push(100)
// stack1.pop()
// console.log(stack1.peek())
// console.log(stack1)

class Queue {
  constructor() {
    this.items = []
  }
  enqueue(item) {
    this.items.push(item)
  }
  dequeue() {
    this.items.shift()
  }
  peek() {
    return this.items[this.items.length-1]
  }
}

const queue1 = new Queue()

// queue1.enqueue(8)
// queue1.enqueue(9)
// queue1.enqueue(200)
// queue1.enqueue(400)
// console.log(queue1)
// queue1.dequeue()
// console.log('peek', queue1.peek())
// console.log(queue1)


// Binary Tree
class TreeNode {
  constructor(value) {
    this.value = value,
    this.left = null,
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }
  isEmpty() {
    return this.root === null
  }
  insert(value) {
    const newNode = new TreeNode(value)
    if (this.isEmpty()) {
      this.root = newNode
    } else {
      this._insertNode(this.root, newNode)
    }
  }
  _insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (!node.left) {
        node.left = newNode
      } else {
        this._insertNode(node.left, newNode)
      }
    } else {
      if (!node.right) {
        node.right = newNode
      } else {
        this._insertNode(node.right, newNode)
      }
    }
  }
  search() {

    
  }
  // Depth-First Seach (DFS) algorithms
  // Preoder Traversal
  preTraversal() {
    this._preoder(this.root)
  }
  _preoder(node) {
    if (node) {
      console.log(node.value)
      this._preoder(node.left)
      this._preoder(node.right)
    }
  }
  // Inorder Traversal
  inTraversal() {
    this._inorder(this.root)
  }
  _inorder(node) {
    if (node) {
      this._inorder(node.left)
      console.log(node.value)
      this._inorder(node.right)
    }
  }
  // Postorder Traversal
  postTraversal() {
    this._postorder(this.root)
  }
  _postorder(node) {
    if (node) {
      this._inorder(node.left)
      this._inorder(node.right)
      console.log(node.value)
    }
  }
}

const BinaryTree1 = new BinaryTree()
console.log(BinaryTree1)
BinaryTree1.insert(10) // Adds to root
BinaryTree1.insert(5) // Adds as child node
BinaryTree1.insert(15)
BinaryTree1.insert(3)
BinaryTree1.insert(7)
BinaryTree1.insert(20)
BinaryTree1.insert(12)
BinaryTree1.insert(1)
BinaryTree1.insert(4)
BinaryTree1.insert(6)
BinaryTree1.insert(8)
BinaryTree1.insert(2)

// BinaryTree1.preTraversal()
console.log(BinaryTree1)
BinaryTree1.inTraversal()
// BinaryTree1.postTraversal()



// Linked List
class LinkedListNode {
  constructor(data) {
    this.data = data,
    this.next = null
  }
}

// Agregar isEmpty()
class LinkedList {
  constructor() {
    this.head = null
  }
  insert(data) {
    const newNode = new LinkedListNode(data)
    if (!this.head) {
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        current = current.next
      }
      current.next = newNode
    }
  }
  delete(data) {
    // Delete case if list is empty
    if (!this.head) {
      return
    }
    // Delete case if head === data
    if (this.head.data === data) {
      this.head = this.head.next
      return
    }
    // Delete case comparing with remaining data.
    let current = this.head
    while (current.next) {
      if (current.next.data === data) {
        current.next = current.next.next
        return 
      }
      current = current.next
    }
  }
  deleteLast() {
    if (!this.head) {
      return
    }
    let current = this.head
    while (current.next.next) {
      current = current.next
    }
    current.next = null
  }
  // Seach node comparing to data provided by arguments.
  search(data) {
    let current = this.head
    while (current) {
      if (current.data === data) {
        return true
      }
      current = current.next
    }
    return false
  }
}

const LinkedList1 = new LinkedList()

// console.log(LinkedList1)

// LinkedList1.insert(30)
// LinkedList1.insert(40)
// LinkedList1.insert(80)
// LinkedList1.insert(80)
// LinkedList1.insert(62)
// LinkedList1.insert(15)
// LinkedList1.insert(23)
// LinkedList1.insert(20)
// LinkedList1.insert(120)

// LinkedList1.delete(40)
// LinkedList1.deleteLast()

// console.log(LinkedList1.search(1000))

// console.log(LinkedList1)

