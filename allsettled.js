// from the blog https://dev.to/vitalets/what-s-wrong-with-promise-allsettled-and-promise-any-5e6o

// Promise.all        -> Promise.allFulfilled
// Promise.allSettled -> Promise.allSettled
// Promise.race       -> Promise.oneSettled
// Promise.any        -> Promise.oneFulfilled

async function newWay (parray) {
  const promises = Promise.allSettled(parray)
  promises.then(resolve => {
    console.log('allSettled resolved')
    resolve.map(e => {
      // returns object with properties
      // .status
      // .value
      // .reason
    })
  }, reject => {
    // this never gets invoked, you have to look at the result of each in resolve
  })
}

// the old way
async function oldWay (parray) {
  // assign a catch function to each object, and return the err
  const arr = parray.map(p => p.catch(e => e))

  const promises = Promise.all(arr)
  promises.then(resolve => {
    console.log('all resolved', resolve)
  }, reject => {
    // this may get invoked, but as we assigned a catch, this will not get invoked
  })
}

(async function () {
  const parray = [
    Promise.resolve(100),
    Promise.resolve(100),
    Promise.reject(new Error('doh')),
    Promise.resolve(100)
  ]

  await newWay(parray)
  await oldWay(parray)
})()
