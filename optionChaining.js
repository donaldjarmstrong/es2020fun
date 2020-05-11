const assert = require('assert')

const o = { a: 1, b: 2, c: { d: 4, e: 5, f: { g: 7 } } }

console.log (o.c?.f?.g) // 7
console.log (o.c?.f?.h) // undefined

// combined with null coalesce operator

console.log(o.c?.f?.g ?? 99) // 7
console.log(o.c?.f?.h ?? 99) // 99