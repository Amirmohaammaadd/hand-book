'use client'
import { useImperativeHandle, useRef, useState } from 'react'

// تعریف «کنترل»: والد فقط این‌ها را می‌بیند
export type SearchInputHandle = {
  focus: () => void
  clear: () => void
}

// 📺 تلویزیون (فرزند)
function SearchInput({ ref }: { ref?: React.Ref<SearchInputHandle> }) {
  const inputRef = useRef<HTMLInputElement>(null)   // DOM داخلی، خصوصی
  const [value, setValue] = useState('')

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      setValue('')
      inputRef.current?.focus()
    },
  }), [])

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="جستجوی غذا..."
      className="border rounded px-3 py-2"
    />
  )
}

// 🧑 والد: فقط کنترل را دارد
export default function SearchPage() {
  const searchRef = useRef<SearchInputHandle>(null)

  return (
    <div className="flex gap-2 p-4">
      <SearchInput ref={searchRef} />
      <button onClick={() => searchRef.current?.focus()}>فوکوس</button>
      <button onClick={() => searchRef.current?.clear()}>پاک کردن</button>
    </div>
  )
}