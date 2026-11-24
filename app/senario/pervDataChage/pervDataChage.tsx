import { useEffect, useRef, useState } from "react";

type Volumes = Record<string, number>;

const FLUSH_INTERVAL = 1000; // هر چند میلی‌ثانیه یک بار رندر شه (اینجا ۱ ثانیه)

export function useVolumes(url: string) {
    const [volumes, setVolumes] = useState({});
    const latest = useRef<Volumes>({});

    useEffect(() => {
        const ws = new WebSocket(url);

        ws.onmessage = (e) => {
            const list = JSON.parse(e.data);


            // هندل کردن اینکه مقدار قبلی بیشتر از بعدی نباشه
            for (const { symbol, volume } of list) {
                const prev = latest.current[symbol];
                if (prev === undefined || volume > prev) {
                    latest.current[symbol] = volume; // مقدار کمتر نادیده گرفته می‌شه
                }
            }


        };

        const id = setInterval(() => {
            setVolumes({ ...latest.current });
        }, FLUSH_INTERVAL);

        return () => {
            ws.close();
            clearInterval(id);
        };
    }, [url]);

    return volumes;
}

// ----------------------------------------------------

// اکه جای مبلغ فقط status میداد

// type Status = "pending" | "processing" | "filled" | "rejected";

// const STATUS_RANK: Record<Status, number> = {
//     pending: 0,
//     processing: 1,
//     filled: 2,
//     rejected: 2, // وضعیت نهایی
// };

// const FINAL: Status[] = ["filled", "rejected"];

// function mergeStatus(prev: Status | undefined, next: Status): Status {
//     if (!prev) return next;
//     if (FINAL.includes(prev)) return prev;          // نهایی شد، دیگه عوض نشه
//     if (STATUS_RANK[next] < STATUS_RANK[prev]) return prev; // برگشت به عقب: رد کن
//     return next;
// }

// ----------------------------------------------------