"use client"

import { useMemo, useState } from "react"

// --------------------------------------------------

// توی سوال کفته this حفظ بشه

function debounce(func: Function, wait: number) {
    let timeoutId: ReturnType<typeof setTimeout>  // ساعت را اینجا نگه می‌داریم

    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId)                   // ساعت قبلی را خاموش کن

        timeoutId = setTimeout(() => {            // ساعت جدید روشن کن
            func.apply(this, args)                // وقتی تمام شد، کار را انجام بده
        }, wait)


        // setTimeout(() => func.apply(this, args), wait)   // ✅ apply داخل arrow
        // setTimeout(() => func.call(this, ...args), wait) // ✅ call داخل arrow
        // setTimeout(func.bind(this, ...args), wait)       // ✅ bind مستقیم، بدون arrow

        //    call و apply اجرا می‌کنند، پس داخل arrow بگذارشان.
        // bind تابع برمی‌گرداند، پس مستقیم به setTimeout بدهش.
    }
}

// --------------------------------------------------

// this بدون

function debounceWithoutThis(func: Function, wait: number) {
    let timeoutId: ReturnType<typeof setTimeout>

    return function (...args: any[]) {
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            func(...args)
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