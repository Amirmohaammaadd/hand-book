// flatten([1, [2, [3, [4]], 5]]);
// → [1, 2, 3, 4, 5]

const flatten = (arr: unknown[]): unknown[] => {
  const result: unknown[] = []

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flatten(item))
    } else {
      result.push(item)
    }
  }

  return result
}

console.log(flatten([1, [2, [3, [4]], 5]]));
