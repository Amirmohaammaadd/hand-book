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

        console.log("a : ", classes);

      } else if (Array.isArray(arg)) {
        const inner = classNames(...arg);
        if (inner) classes.push(inner);

        console.log("b : ", classes);


      } else if (typeof arg === 'object') {
        for (const key in arg) {
          if (arg[key]) classes.push(key);
        }

        console.log("c : ", classes);

      }
    };
  }

  return classes.join('')
}

classNames('a', ['b', { c: true, d: false }])
