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

// useSyncExternalStore یک Hook در React است که برای اتصال Componentها 
// به External Storeها استفاده می‌شود. این Hook از مکانیزم subscribe و 
// snapshot استفاده می‌کند؛ Store با تغییر state به subscriberها notification
//  می‌دهد و React با گرفتن snapshot جدید بررسی می‌کند که آیا Component نیاز 
//  به re-render دارد یا نه. این سازوکار شباهت زیادی به Observer Pattern دارد


// فرق کلیدی:
// - useEffect می‌گوید: من خودم event را گوش می‌کنم و با setState به React می‌گویم دوباره render کند.
// - useSyncExternalStore می‌گوید: React، به این Store وصل شو، snapshot آن را بخوان و هر وقت تغییر کرد، خودت re-render را مدیریت کن.
// هر دو re-render می‌کنند؛ تفاوت در نحوه مدیریت subscription، هماهنگی با React و جلوگیری از مشکلات احتمالی در Concurrent Rendering است.