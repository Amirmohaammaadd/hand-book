type Fn = (this: any, arg: string | number) => unknown;

export default function memoize(func: Fn): Fn {
  const cache = new Map<string | number, unknown>();

  return function (this: any, arg) {
    if (!cache.has(arg)) cache.set(arg, func.call(this, arg));
    return cache.get(arg);
  };
}