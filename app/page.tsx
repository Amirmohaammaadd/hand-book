"use client"

export type ClassValue =
  | ClassArray
  | ClassDictionary
  | string
  | number
  | null
  | boolean
  | undefined;

export type ClassDictionary = Record<string, any>;
export type ClassArray = Array<ClassValue>;

// O(n) time complexity

export function classNames(...args: Array<ClassValue>): string {
  const classes: string[] = [];

  for (const arg of args) {

    if (arg) { // مقدارهای falsy: null, undefined, false, '', 0

      if (typeof arg === 'string' || typeof arg === 'number') {
        classes.push(arg.toString());


      } else if (Array.isArray(arg)) {
        const inner = classNames(...arg);
        if (inner) classes.push(inner);

        // اگه اون رشته خالی نبود (if (inner)) اضافه‌اش می‌کنیم، تا مثلاً [] یا [null] یه رشته‌ی خالی توی لیست نندازن و دو تا space پشت سر هم نسازن.

      } else if (typeof arg === 'object') {
        for (const key in arg) {
          if (arg[key]) classes.push(key);
        }

        // روی کلیدهاش حلقه می‌زنیم. اگه value اون کلید truthy بود، خودِ کلید رو به عنوان اسم کلاس اضافه می‌کنیم. مثلاً { foo: true, bar: false } فقط 'foo' رو اضافه می‌کنه.
      }
    };
  }

  return classes.join('')
}


const Page = () => {
  return <></>
}

export default Page