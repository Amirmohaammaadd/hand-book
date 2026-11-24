import { DependencyList, useEffect, useState } from 'react';

type AsyncState<T> =
    | { status: 'loading' }
    | { status: 'success'; data: T }
    | { status: 'error'; error: unknown };

const cache = new Map<string, Promise<unknown>>();

export default function useQuery<T>(
    queryKey: string,
    fn: () => Promise<T>,
    deps: DependencyList = [],
): AsyncState<T> {
    const [state, setState] = useState<AsyncState<T>>({ status: 'loading' });

    useEffect(() => {
        let ignore = false;

        setState({ status: 'loading' });

        let promise = cache.get(queryKey) as Promise<T> | undefined;

        if (!promise) {
            try {
                promise = Promise.resolve(fn());
            } catch (error) {
                promise = Promise.reject(error);
            }
            cache.set(queryKey, promise);
            promise.catch(() => cache.delete(queryKey));
        }

        promise.then(
            (data) => {
                if (!ignore) setState({ status: 'success', data });
            },
            (error) => {
                if (!ignore) setState({ status: 'error', error });
            },
        );

        return () => {
            ignore = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryKey, ...deps]);

    return state;
}

// ------------------------ 3 times retry

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

async function fetchWithRetry(
    url: string,
    options: RequestInit = {},
    { retries = 3, baseDelay = 500, timeout = 5000 } = {}
): Promise<Response> {
    for (let attempt = 0; attempt <= retries; attempt++) {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), timeout)

        try {
            const res = await fetch(url, { ...options, signal: controller.signal })

            // خطای کلاینت (۴xx) retry نمی‌شه، به‌جز ۴۲۹
            if (res.ok || (res.status < 500 && res.status !== 429)) return res
            if (attempt === retries) return res
        } catch (err) {
            if (attempt === retries) throw err
        } finally {
            clearTimeout(timer)
        }

        // exponential backoff + jitter
        const delay = baseDelay * 2 ** attempt + Math.random() * 100
        await sleep(delay)
    }
    throw new Error("unreachable")
}