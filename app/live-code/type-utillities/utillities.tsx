
export function isArray(value: unknown): boolean {
  //typeof [] === "object"
  return Array.isArray(value);
}

export function isFunction(value: unknown): boolean {
  return typeof value === 'function';
}

export function isObject(value: unknown): boolean {
	//typeof null === "object"
  return value !== null && value !== undefined && (
    typeof value === 'object' || typeof value === 'function'
  );
}

export function isPlainObject(value: unknown): boolean {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return prototype === Object.prototype || prototype === null;
}
