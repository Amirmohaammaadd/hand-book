function isPlainObject(v: unknown): v is Record<string, unknown> {
  if (typeof v !== 'object' || v === null) return false;
  const proto = Object.getPrototypeOf(v);
  return proto === Object.prototype || proto === null;
}

export default function deepOmit(val: unknown, keys: Array<string>): unknown {
  const omit = new Set(keys); // lookup در O(1)

  const walk = (v: unknown): unknown => {
    if (Array.isArray(v)) {
      return v.map(walk); // آرایه‌ی جدید؛ ایندکس‌ها هیچ‌وقت حذف نمی‌شوند
    }

    if (isPlainObject(v)) {
      const result: Record<string, unknown> = {};
      for (const [key, child] of Object.entries(v)) {
        if (!omit.has(key)) result[key] = walk(child);
      }
      return result; // آبجکت جدید
    }

    return v; // primitive، Date، RegExp، Map، Set و ... همان‌طور برمی‌گردند
  };

  return walk(val);
}