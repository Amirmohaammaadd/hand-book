type Fn = (this: any, arg: string | number) => unknown;

function memoize(func: Fn): Fn {
  const cache = new WeakMap<Object, unknown>();

  return function (this: any, arg) {
    if (!cache.has(arg)) cache.set(arg, func.call(this, arg));
    // if (!cache.has(arg)) cache.set(arg, func.apply(this, [arg]));
    // if (!cache.has(arg)) cache.set(arg, func.bind(this, arg)());
    return cache.get(arg);
  };
}

// -------------------------

function memoizeWithoutThis(func: Fn): Fn {
  const cache = new WeakMap<Object, unknown>();

  return (arg) => {
    if (!cache.has(arg)) cache.set(arg, func(arg));
    return cache.get(arg);
  };
}


// WeakMap کلید را weak نگه می‌دارد. وقتی آن آبجکت در جای دیگر برنامه دیگر reachable
//  نباشد، GC هم کلید و هم نتیجه‌ی cache شده را آزاد می‌کند. با Map همان آبجکت تا
//   ابد زنده می‌ماند (memory leak)، چون خود cache به آن reference دارد.