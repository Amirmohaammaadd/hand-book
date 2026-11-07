// flatten([1, [2, [3, [4]], 5]]);
// → [1, 2, 3, 4, 5]

// O(n) time complexity

const flatten = (arr: unknown[]): unknown[] => {
    const result: unknown[] = []

    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flatten(item)) // این خط یعنی: «اگه آیتم خودش آرایه بود، اول اون رو flatten کن (recursive)، بعد عناصر صاف‌شده‌اش رو یکی‌یکی بریز توی result».
        } else {
            result.push(item)
        }
    }

    return result
}

console.log(flatten([1, [2, [3, [4]], 5]]));


// -------------------------------------------

// flattenObject({ a: 1, b: { c: 2, d: { e: 3 } } })
// → { "a": 1, "b.c": 2, "b.d.e": 3 }

type Obj = Record<string, any>

const flattenObject = (obj: Obj, prefix = ""): Obj => {
    const result: Obj = {}

    for (const [key, value] of Object.entries(obj)) {
        const newKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value, newKey))
        } else {
            result[newKey] = value
        }
    }

    return result
}
