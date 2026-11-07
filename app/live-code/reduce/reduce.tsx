// multiple
console.log([1, 2, 3, 4].reduce((acc, n) => acc * n, 1)); // 24

// min 
console.log([1, 2, 3, 4].reduce((acc, n) => acc > n ? n : acc)); // 1

//sum
console.log([1, 2, 3, 4].reduce((acc, n) => acc + n)); // 10

// max length
console.log(["apple", "banana", "kiwi"].reduce((acc, w) => (w.length > acc.length ? w : acc)));