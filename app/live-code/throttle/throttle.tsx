export default function throttle(fn: Function, wait: number = 0) {
  let canRun = true;

  return function (this: any, ...args: any[]) {
    if (!canRun) return;

    canRun = false;
    fn.apply(this, args);

    setTimeout(() => {
      canRun = true;
    }, wait);
  };
}