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