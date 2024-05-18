// Part 1
class Stack {
  constructor() {
    this.items = []
  }
  // Add items method (always at the end)
  push(item) {
    this.items.push(item)
  }
  // Delete last item method.
  pop() {
    if (this.isEmpty()) {
      throw new Error(`Stack is empty.`)
    }
    return this.items.pop()
  }
  // Get last item.
  peek() {
    if (this.isEmpty()) {
      throw new Error(`Stack is empty.`)
    }
    return this.items[this.items.length-1]
  }
  // Check if it's an empty stack.
  isEmpty() {
    return this.items.length === 0
  }
}

// Stack demonstration
const stack1 = new Stack()
stack1.push(1)
stack1.push(2)
stack1.push(50)
stack1.push(100)
stack1.pop()
console.log(stack1)
console.log('Stack peek value:', stack1.peek())


class Queue {
  constructor() {
    this.items = []
  }
  // Add items method (always at the end)
  enqueue(item) {
    return this.items.push(item)
  }
  // Delete items method (always first)
  dequeue() {
    if (this.isEmpty()) {
      throw new Error(`Queue is empty.`)
    }
    return this.items.shift()
  }
  peek() {
    if (this.isEmpty()) {
      throw new Error(`Queue is empty.`)
    }
    return this.items[this.items.length-1]
  }
  isEmpty() {
    return this.items.length === 0
  }
}

// Queue demonstration
const queue1 = new Queue()
queue1.enqueue(8)
queue1.enqueue(9)
queue1.enqueue(200)
queue1.enqueue(400)
queue1.dequeue()
console.log(queue1)
console.log('Queue peek value:', queue1.peek())


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
  // Check if root exists.
  isEmpty() {
    return this.root === null
  }
  // Insert method instantiating TreeNode class
  insert(value) {
    const newNode = new TreeNode(value)
    if (this.isEmpty()) {
      this.root = newNode
    } else {
      this._insertNode(this.root, newNode)
    }
  }
  // Recursive function to compare values to add complying BST propertie.
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
  // Recursive function to search an specific value. Similar to insert, going left if it's less and right if it's greater.
  search(value) {
    return this._searchNode(this.root, value)
  }
  _searchNode(node, value) {
    if (node === null) {
      return false
    }
    if (value < node.value) {
      return this._searchNode(node.left, value)
    } else if (value > node.value) {
      return this._searchNode(node.right, value)
    } else {
      return true
    }
  }
  // Depth-First Seach (DFS) algorithms
  // Preoder Traversal
  preTraversal() {
    console.log('Preorder Traversal')
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
    console.log('Inorder Traversal')
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
    console.log('Postorder Traversal')
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

// Binary Search Tree demonstration
const BinaryTree1 = new BinaryTree()
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
console.log(BinaryTree1.search(12)) // True
console.log(BinaryTree1.search(6510)) // False

BinaryTree1.preTraversal()
BinaryTree1.inTraversal()
BinaryTree1.postTraversal()
console.log(BinaryTree1)


// Linked List
class LinkedListNode {
  constructor(data) {
    this.data = data,
    this.next = null
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }
  // Insert method instantiating LinkedListNode class, adding data and pointer to next node.
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
  // Delete last node updating pointer to null.
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
  // Search node data comparing to value provided by arguments.
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

// Linked List demonstration
const linkedList1 = new LinkedList()
linkedList1.insert(30)
linkedList1.insert(40)
linkedList1.insert(80)
linkedList1.insert(80)
linkedList1.insert(62)
linkedList1.insert(15)
linkedList1.insert(23)
linkedList1.insert(20)
linkedList1.insert(120)

linkedList1.delete(40)
linkedList1.deleteLast()
console.log(linkedList1)
console.log(linkedList1.search(62)) // True


// Undirected graph
class Graph {
  constructor() {
    this.vertices = {}
  }
  // Add Vertex.
  addVertex(vertex) {
    if (!this.vertices[vertex]) {
      this.vertices[vertex] = {}
    }
  }
  // Add edges between vertices, and vertex if not exits. Also provide weight to be a weighted graph.
  addEdge(vertex1, vertex2, weight = 1) {
    if (!this.vertices[vertex1]) {
      this.addVertex(vertex1)
    }
    if (!this.vertices[vertex2]) {
      this.addVertex(vertex2)
    }
    // Create undirected edges between vertices.
    this.vertices[vertex1][vertex2] = weight
    this.vertices[vertex2][vertex1] = weight
  }
  // Dijkstra's algorithm to find shortest path between two vertices.
  dijkstra(start, end) {
    const distances = {}
    const visited = {}
    const previous = {}
    const queue = []

    // All distances are Infinity, previous null and queue contains all vertices.
    for (let vertex in this.vertices) {
      distances[vertex] = Infinity
      previous[vertex] = null
      queue.push(vertex)
    }
    //Only vertex start value distance: 0
    distances[start] = 0


    while (queue.length > 0) {
      let current = null
      let minDistance = Infinity
      for (const vertex of queue) {
        if (distances[vertex] < minDistance && !visited[vertex]) {
          minDistance = distances[vertex]
          current = vertex
        }
      }
      // Push current and previuos until reach start value, push it and reverse array.
      // Returning final shortest path.
      if (current === end) {
        const path = []
        while (previous[current]) {
          path.push(current)
          current = previous[current]
        }
        path.push(start)
        return path.reverse()
      }

      // Set all visited vertices to true
      visited[current] = true

      // Calculate and updating all neighbor's distances for each vertex.
      // Also, updating all previuos values to to build the final path.
      for (const neighbor in this.vertices[current]) {
        const distance = distances[current] + this.vertices[current][neighbor]
        if (distance < distances[neighbor]) {
            distances[neighbor] = distance
            previous[neighbor] = current
        }
      }
    }
    return null
  }
  // Breath-First Seach (DFS) to find shortest path between two vertices.
  bfs(start, end) {
    const queue = new Queue()
    const visited = {}
    const previous = {}
    queue.enqueue(start)

    while(!queue.isEmpty()) {
      const vertex = queue.dequeue()
      if (vertex === end) {
        const path = []
        let current = vertex
        while (current !== start) {
          path.unshift(current)
          current = previous[current]
        }
        path.unshift(start)
        return path
      }
      for (const neighbor in this.vertices[vertex]) {
        if (!visited[neighbor]) {
          visited[neighbor] = true
          previous[neighbor] = vertex
          queue.enqueue(neighbor)
        }
      }
    }
    return null
  }
}

// Graph demonstration
const graph1 = new Graph()
graph1.addVertex('A')
graph1.addVertex('B')
graph1.addVertex('C')
graph1.addVertex('D')
graph1.addVertex('E')

graph1.addEdge('A', 'B', 4)
graph1.addEdge('A', 'C', 2)
graph1.addEdge('B', 'E', 3)
graph1.addEdge('C', 'D', 2)
graph1.addEdge('C', 'F', 4)

graph1.addEdge('F', 'J', 2)
graph1.addEdge('D', 'Z', 1)
graph1.addEdge('A', 'M', 4)

console.log(graph1)
console.log('Shortest path using Breath-First Search', graph1.bfs('A', 'J'))
console.log('Shortest path using Dijkstra\'s algorithm', graph1.dijkstra('A', 'J'))


// Part 2
class MinMaxStack extends Stack {
  constructor() {
    super()
    this.minStack = new Stack()
    this.maxStack = new Stack()
  }
  // Add values to main stack, but algo to two differents stacks containing min and max values.
  push(item) {
    super.push(item)

    if (this.minStack.isEmpty() || item <= this.minStack.peek()) {
      this.minStack.push(item)
    }
    if (this.maxStack.isEmpty() || item >= this.maxStack.peek()) {
      this.maxStack.push(item)
    }
  }
  // Delete values from min and max stacks and then from main stack.
  pop() {
    if (!this.isEmpty()) {
      const lastItem = super.peek()
      if(lastItem === this.minStack.peek()) {
        this.minStack.pop()
      }
      if(lastItem === this.maxStack.peek()) {
        this.maxStack.pop()
      }
      super.pop()
    }
  }
  // Return peek of max stack.
  getMin() {
    return this.minStack.peek()
  }
  // Return peek of min stack.
  getMax() {
    return this.maxStack.peek()
  }
}

// Min max stack demonstration
const stack2 = new MinMaxStack()
stack2.push(30)
stack2.push(70)
stack2.push(10)
stack2.push(100)
stack2.push(500)
stack2.pop()
stack2.pop()
console.log(stack2)
console.log('Min stack value:', stack2.getMin())
console.log('Max stack value:', stack2.getMax())

// Funcion to check if binary tree is BST.
function isBST(node, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) {
  // We need default max and min values that Javascript can handle without losing precision.
  // Base case to exit recursion
  if (node === null) {
    return true
  }
  if (node.value < min || node.value > max) {
    return false
  }
  // Call revursive function to check if left and right subtree have BST property:
  // Each node has less values at left and greater at right child.
  return isBST(node.left, min, node.value - 1) && isBST(node.right, node.value + 1, max)
}

console.log('Is a BST?', isBST(BinaryTree1.root)) // True

// Floyd's Cycle Detection Algorithm to check if a linked list has a cycle. 
function llHasCycle(list) {
  const head = list.head
  if (!head || !head.next) {
    return false
  }
  // Create slow(tortoise) and fast(hare) pointers.
  let slow = head
  let fast = head.next
  while (slow !== fast) {
    if (!fast || !fast.next) {
      return false
    }
    // Slow moves one node at time, while fast moves at two.
    slow = slow.next
    fast = fast.next.next
  }
  // If fast catches up to the slow, linked list has cycle.
  return true
}

// Class to create Linked List with cycle
class CycleLinkedList extends LinkedList {
  constructor() {
    super()
  }
  // Add cycle providing the index where it will point.
  addCycle(startIndex) {
    let currentIndex = 0
    let currentNode = this.head
    let cycleStartNode = null
    while (currentNode) {
      if (currentIndex === startIndex) {
        cycleStartNode = currentNode
      }
      // If we reach last node (no pointer) we break loop.
      if (!currentNode.next) {
        break
      }
      currentNode = currentNode.next
      currentIndex++
    }
    // Last element points to cycle start index.
    if (cycleStartNode) {
      currentNode.next = cycleStartNode
    }
  }
}

// Cycle Linked List demonstration
const cycleLinkedList = new CycleLinkedList()
cycleLinkedList.insert(10)
cycleLinkedList.insert(20)
cycleLinkedList.insert(50)
cycleLinkedList.insert(100)
cycleLinkedList.addCycle(2)

console.log('Has linked list a cycle?', llHasCycle(linkedList1)) // false
console.log('Has linked list a cycle?', llHasCycle(cycleLinkedList)) // true
