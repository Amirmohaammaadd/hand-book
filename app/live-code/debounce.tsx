"use client"

import { useMemo, useState } from "react"

// --------------------------------------------------

function debounce(func: Function, wait: number) {
    let timeoutId: ReturnType<typeof setTimeout>

    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            func.apply(this, args)
        }, wait)
    }
}

// --------------------------------------------------

const Page = () => {

    const [query, setQuery] = useState("")

    const debouncedSearch = useMemo(
        () => debounce((text: string) => {
            console.log("Searching for:", text)
        }, 500),
        []
    )

    return (
        <input
            value={query}
            onChange={(e) => {
                setQuery(e.target.value)
                debouncedSearch(e.target.value)
            }}
        />
    )

}
export default Page