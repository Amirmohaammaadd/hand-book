export default function deepClone<T>(value: T): T {
    // primitive ها و null -- typeof null برابر 'object' است
    if (value === null || typeof value !== 'object') {
        return value;
    }
    
    // آرایه
    if (Array.isArray(value)) {
        return value.map((item) => deepClone(item)) as T;
    }

    // آبجکت ساده
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(value)) {
        result[key] = deepClone((value as Record<string, unknown>)[key]);
    }
    return result as T;
}

// time complexity O(n)