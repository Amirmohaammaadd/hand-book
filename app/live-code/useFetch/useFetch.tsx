import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
    const [state, setState] = useState({ status: "idle" });

    useEffect(() => {
        const ctrl = new AbortController();
        setState({ status: "loading" });

        fetch(url, { signal: ctrl.signal })
            .then((r) => {
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                return r.json() as Promise<T>;
            })
            .then((data) => setState({ status: "success" }))
            .catch((e) => {
                if (e.name !== "AbortError") setState({ status: "error" });
            });

        return () => ctrl.abort();
    }, [url]);

    return state;
}