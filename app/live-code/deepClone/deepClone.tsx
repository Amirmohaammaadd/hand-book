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

    // for (const key in value) { // حلقه روی key ها

    for (const key of Object.keys(value)) { // یه لیست از key ها میسازه و روی ان حلقه میزنه
        result[key] = deepClone((value as Record<string, unknown>)[key]);
    }
    return result as T;
}

// time complexity O(n)

// نکته مهم : for in میاد کلید های prototype ان هم میگیره ک ارث برده ولی Object.keys() فقط کلید های ارایه را میدهد