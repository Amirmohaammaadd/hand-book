export default function listFormat(
  items: Array<string>,
  options?: { sorted?: boolean; length?: number; unique?: boolean },
): string {
  const { sorted, length, unique } = options ?? {};

  // ۱) حذف رشته‌های خالی (filter آرایه‌ی جدید می‌سازد، پس ورودی دست‌نخورده می‌ماند)
  let list = items.filter((item) => item !== '');

  // ۲) حذف تکراری‌ها (Set ترتیب اولین ظهور را حفظ می‌کند)
  if (unique) {
    list = Array.from(new Set(list));
  }

  // ۳) مرتب‌سازی
  if (sorted) {
    list.sort((a, b) => a.localeCompare(b));
  }

  // ۴) محدود کردن: فقط وقتی length معتبر و کمتر از تعداد آیتم‌هاست
  let parts = list;
  if (length !== undefined && Number.isInteger(length) && length > 0 && length < list.length) {
    const remaining = list.length - length;
    const label = remaining === 1 ? 'other' : 'others';
    parts = [...list.slice(0, length), `${remaining} ${label}`];
  }

  // ۵) قالب‌بندی
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];

  const last = parts[parts.length - 1];
  return `${parts.slice(0, -1).join(', ')} and ${last}`;
}