export default function getElementsByClassName(
  element: Element,
  classNames: string,
): Array<Element> {
  // رشته را به لیست کلاس‌ها می‌شکنیم (فاصله‌های اضافه را نادیده می‌گیریم)
  const names = classNames.trim().split(/\s+/).filter(Boolean);
  const result: Array<Element> = [];

  // مثل متد اصلی: بدون کلاس، نتیجه‌ی خالی
  if (names.length === 0) return result;

  function traverse(el: Element) {
    Array.from(el.children).forEach((child) => {
      if (names.every((name) => child.classList.contains(name))) {
        result.push(child);
      }
      traverse(child);
    });
  }

  traverse(element);
  return result;
}