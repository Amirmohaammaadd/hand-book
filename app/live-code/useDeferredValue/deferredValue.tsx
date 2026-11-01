'use client'
import { memo, useDeferredValue, useState } from 'react'

// ─────────────────────────────────────────────
// 🍽️ منوی رستوران (داده‌ی زیاد)
// ─────────────────────────────────────────────
const MENU = Array.from({ length: 20_000 }, (_, i) => `غذا شماره ${i}`)

// ─────────────────────────────────────────────
// 🧑‍💼 گارسون: سفارش را فوراً یادداشت می‌کند
// (state اینجاست؛ آشپزخانه به آن دسترسی ندارد)
// ─────────────────────────────────────────────
export default function Restaurant() {
  const [order, setOrder] = useState('')

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-3">🍽️ رستوران</h1>

      <input
        value={order}
        onChange={e => setOrder(e.target.value)}   // گارسون فوری یادداشت می‌کند
        placeholder="سفارش شما (مثلاً 123)..."
        className="w-full border rounded px-3 py-2 mb-4"
      />

      {/* فقط «کاغذ سفارش» به آشپزخانه می‌رود، نه setOrder */}
      <Kitchen order={order} />
    </div>
  )
}

// ─────────────────────────────────────────────
// 👨‍🍳 آشپزخانه: فقط مقدار سفارش را دارد، نه setState
// ─────────────────────────────────────────────
function Kitchen({ order }: { order: string }) {
  const cookingOrder = useDeferredValue(order)   // آشپز با تأخیر دنبال می‌کند
  const isCooking = order !== cookingOrder       // هنوز در حال پختن؟

  return (
    <div>
      <p className="text-sm mb-2">
        📝 سفارش گارسون: <b>{order || '—'}</b>
        {' | '}
        🍳 در حال پختن: <b>{cookingOrder || '—'}</b>
      </p>

      {isCooking && <p className="text-orange-500 mb-2">⏳ آشپز در حال پختن...</p>}

      {/* بشقاب قبلی کم‌رنگ می‌ماند تا غذای جدید آماده شود */}
      <div style={{ opacity: isCooking ? 0.4 : 1, transition: 'opacity 0.2s' }}>
        <HeavyDish order={cookingOrder} />
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// 🍲 غذای سنگین: memo یعنی «اگر سفارش عوض نشده، دوباره نپز»
// ─────────────────────────────────────────────
const HeavyDish = memo(function HeavyDish({ order }: { order: string }) {
  // شبیه‌سازی پخت کند: هر آیتم کمی زمان می‌برد
  const start = performance.now()
  while (performance.now() - start < 150) {
    // ۱۵۰ میلی‌ثانیه کار سنگین مصنوعی
  }

  const dishes = MENU.filter(item => item.includes(order)).slice(0, 200)

  return (
    <ul className="border rounded divide-y max-h-96 overflow-auto">
      {dishes.length === 0 && <li className="p-2 text-gray-400">غذایی پیدا نشد</li>}
      {dishes.map(d => (
        <li key={d} className="p-2">{d}</li>
      ))}
    </ul>
  )
})