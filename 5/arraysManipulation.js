// 1
function customFilterUnique(arr, cb) {
  return cb(arr)
}

const users = [
  {
    id: 1,
    name: 'Julian',
    lastName: 'Safadi'
  },
  {
    id: 2,
    name: 'Juan',
    lastName: 'Rodriguez'
  },
  {
    id: 2,
    name: 'Juan',
    lastName: 'Rodriguez'
  },
  {
    id: 3,
    name: 'Matias',
    lastName: 'Martinez'
  },
  {
    id: 2,
    name: 'Juan',
    lastName: 'Rodriguez'
  },
  {
    id: 1,
    name: 'Julian',
    lastName: 'Safadi'
  },
  {
    id: 1,
    name: 'Julian',
    lastName: 'Safadi'
  },
  {
    id: 3,
    name: 'Matias',
    lastName: 'Martinez'
  },
]

const filter = (arr, prop) => {
  const arrayUniques = new Set()
  return arr.filter(e => {
    if (!arrayUniques.has(e[prop])) {
      arrayUniques.add(e[prop])
      return true
    }
  })
}
const filteredArrayUniques = customFilterUnique(users, arr => filter(arr, 'id'))
console.table(filteredArrayUniques)

// 2
function chunkArray(arr, chunkSize) {
  const chunkedArr = []
  let index = 0

  while(index < arr.length) {
    const chunk = arr.slice(index, index + chunkSize)
    chunkedArr.push(chunk)
    index += chunk.length
  }
  return chunkedArr
}
console.log(chunkArray(users, 2))

// 3
const nums = [210, 560, 12, 84, 6, 2120, 321]
function customShuffle(arr) {
  const shuffledArray = arr.slice()
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
  }
  return shuffledArray
}
console.table(customShuffle(nums))

// 4
const nums1 = [6, 65, 31, 20, 15]
const nums2 = [3, 65, 40, 11, 15]

function getArrayIntersection(arr1, arr2) {
  const intersection = []
  arr1.forEach((e) => {
    if (arr2.includes(e)) {
      intersection.push(e)
    }
  })
  return intersection
}
console.table(getArrayIntersection(nums1, nums2)) // [65, 15]

function getArrayUnion(arr1, arr2) {
  const joined = new Set([...arr1, ...arr2])
  return Array.from(joined)
}
console.table(getArrayUnion(nums1, nums2)) // [6, 65, 31, 20, 15, 3, 40, 11]

// 5
function measureArrayPerformance(arr, fn) {
  const startExecution = performance.now()
  fn(arr)
  const endExecution = performance.now()
  return (endExecution - startExecution).toFixed(3)
}

function customReduce(arr) {
  let reduce = 0
  for (let i = 0; i < arr.length; i++) {
    reduce += arr[i]
  }
  return reduce
}

// Comparing execution times
// Reduce
const customReduceTime = measureArrayPerformance(nums1, arr => customReduce(arr))
const builtInReduceTime = measureArrayPerformance(nums1, arr => arr.reduce((acc, value) => acc + value, 0))

if (customReduceTime < builtInReduceTime) {
  console.log(`My custom reduce function was faster than built-in method with ${customReduceTime} miliseconds`)
} else {
  console.log(`Built-in reduce method was faster than my custom function with ${builtInReduceTime} miliseconds`)
}

// Map
function customMap(arr) {
  const newArray = []
  for (let i = 0; i < arr.length; i++) {
    const randomNum = parseInt((Math.random() * 100).toFixed(0))
    newArray.push(randomNum)
  }
  return newArray
}

const customMapTime = measureArrayPerformance(nums2, arr => customMap(arr))
const builtInMapTime = measureArrayPerformance(nums2, arr => arr.map(() => parseInt((Math.random() * 100).toFixed(0))))

if (customMapTime < builtInMapTime) {
  console.log(`My custom map function was faster than built-in method with ${customMapTime} miliseconds`)
} else {
  console.log(`Built-in map method was faster than my custom function with ${builtInMapTime} miliseconds`)
}