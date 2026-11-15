import { useEffect, useRef, useState } from 'react';

function formatTime(ms: number): string {
  // اول به عدد صحیح (صدم ثانیه) تبدیل می‌کنیم تا خطای اعشاری carry را خراب نکند
  const totalCs = Math.floor(ms / 10);
  const cs = totalCs % 100;

  const totalSec = Math.floor(totalCs / 100);
  const s = totalSec % 60;

  const totalMin = Math.floor(totalSec / 60);
  const m = totalMin % 60;

  const h = Math.floor(totalMin / 60);

  const parts: string[] = [];
  if (h > 0) parts.push(`${h}h`);
  if (h > 0 || m > 0) parts.push(`${m}m`); // اگر ساعت داریم، دقیقه‌ی صفر هم نمایش داده می‌شود
  parts.push(`${s}s`);
  parts.push(`${String(cs).padStart(2, '0')}ms`);

  return parts.join(' ');
}

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // میلی‌ثانیه
  const startRef = useRef(0); // لحظه‌ای که "شروع مجازی" حساب می‌شود

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setElapsed(performance.now() - startRef.current);
    }, 10);

    return () => clearInterval(id);
  }, [isRunning]);

  const toggle = () => {
    const now = performance.now();
    if (isRunning) {
      setElapsed(now - startRef.current); // مقدار دقیق لحظه‌ی توقف
    } else {
      startRef.current = now - elapsed; // ادامه از جایی که ایستاده بود
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    setIsRunning(false);
    setElapsed(0);
  };

  return (
    <div>
      <p>
        {formatTime(elapsed)}
      </p>
      <div>
        <button type="button" onClick={toggle}>
          {isRunning ? 'Stop' : 'Start'}
        </button>{' '}
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}