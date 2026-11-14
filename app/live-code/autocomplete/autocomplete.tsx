"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

type User = {
    id: number;
    name: string;
};

type Status = "idle" | "loading" | "success" | "error";

export default function AutoComplete() {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState<User[]>([]);
    const [status, setStatus] = useState<Status>("idle");
    const [open, setOpen] = useState(false);
    const selectedRef = useRef<string | null>(null); // name of the picked user

    useEffect(() => {
        // Selecting a user changes the query, but it must not trigger a new search
        if (query === selectedRef.current) return;

        const q = query.trim();
        if (!q) {
            setUsers([]);
            setStatus("idle"); // reset, otherwise "Loading..." can get stuck
            return;
        }

        const controller = new AbortController();

        const timer = setTimeout(async () => {
            setStatus("loading");
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(q)}`, {
                    signal: controller.signal,
                });

                const data: User[] = await response.json();
                setUsers(data);
                setStatus("success");
            } catch {
                if (controller.signal.aborted) return; // superseded, not a real error
                setStatus("error");
            }
        }, 500);

        return () => {
            clearTimeout(timer);
            controller.abort();
        };
    }, [query]);

    const select = (user: User) => {
        selectedRef.current = user.name;
        setQuery(user.name);
        setOpen(false);
    };

    const showPopup = open && query.trim() !== "";

    const component: Record<Status, ReactNode> = {
        loading: <p>Loading...</p>,
        error: <p>Something went wrong</p>,
        success: users.length === 0 && <p>No results found</p>,
        idle: <></>
    }

    return (
        <div className="flex flex-col justify-center items-center h-dvh">
            <input
                value={query}
                onChange={(e) => {
                    selectedRef.current = null;
                    setQuery(e.target.value);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                placeholder="Search users..."
            />

            {showPopup && (
                <>
                    {component[status]}

                    {status !== "error" && users.length > 0 && (
                        <ul>
                            {users.map((user) => (
                                <li
                                    key={user.id}
                                    onMouseDown={(e) => e.preventDefault()} // keep focus so onBlur doesn't close first
                                    onClick={() => select(user)}
                                >
                                    {user.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
}