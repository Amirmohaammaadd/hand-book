type Fn = (this: any, arg: string | number) => unknown;

function memoize(func: Fn): Fn {
  const cache = new Map<string | number, unknown>();

  return function (this: any, arg) {
    if (!cache.has(arg)) cache.set(arg, func.call(this, arg));
    // if (!cache.has(arg)) cache.set(arg, func.apply(this, [arg]));
    // if (!cache.has(arg)) cache.set(arg, func.bind(this, arg)());
    return cache.get(arg);
  };
}

// -------------------------

function memoizeWithoutThis(func: Fn): Fn {
  const cache = new Map<string | number, unknown>();

  return (arg) => {
    if (!cache.has(arg)) cache.set(arg, func(arg));
    return cache.get(arg);
  };
}
