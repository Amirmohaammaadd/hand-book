'use client'
import { useSyncExternalStore } from 'react'

// ⚠️ بیرون از کامپوننت، تا در هر render یک تابع جدید ساخته نشود
function subscribe(callback: () => void) {
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}

const getSnapshot = () => navigator.onLine
const getServerSnapshot = () => true   // روی سرور فرض می‌کنیم آنلاین است

export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// استفاده
export function OfflineBanner() {
  const isOnline = useOnlineStatus()
  if (isOnline) return null
  return <div className="bg-red-500 text-white text-center p-2">اتصال اینترنت قطع است</div>
}