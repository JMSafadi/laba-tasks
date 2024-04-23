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
// console.table(filteredArrayUniques)

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
// console.log(chunkArray(users, 2))

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
// console.table(customShuffle(nums))

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