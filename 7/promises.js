const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3),
]

function promiseAll(promiseArr) {
  const promisesResult = []
  let count = 0
  return new Promise((res, rej) => {
    promiseArr.forEach((promise, index) => {
      promise
      .then(value => {
        promisesResult[index] = value
        count ++
        if (count === promiseArr.length) {
          res(promisesResult)
        }
      })
      .catch(error => {
        rej(error)
      })
    })
  })
}

promiseAll(promises)
  .then(results => {
    console.log('All promises resolved', results) // Expected [1, 2, 3]
  })
  .catch(error => {
    console.error('At least one promise rejected', error)
  })


// 2
const promises1 = [
  Promise.resolve(1),
  Promise.reject('Error ocurred'),
  Promise.resolve(3),
]

function promiseAllSettled(promiseArr) {
  return new Promise((res) => {
    const promiseResult = []
    let count = 0
    promiseArr.forEach((promise, index) => {
      promise
        .then(value => {
          promiseResult[index] = { status: 'fulfilled', value:`${value}` }
          count++
          if (count === promiseArr.length) {
            res(promiseResult)
          }
        })
        .catch(error => {
          promiseResult[index] = { status: 'rejected', reason:`${error}` }
          count++
          if (count === promiseArr.length) {
            res(promiseResult)
          }
        })
    })
  })
}

promiseAllSettled(promises1)
  .then(results => {
    console.log('All promises settled:', results)
  })