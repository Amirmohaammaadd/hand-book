'use client'
import { useState, useTransition } from 'react'

// ۲۰٬۰۰۰ آیتم فیک
const ALL_FOODS = Array.from({ length: 20_000 }, (_, i) => `غذا شماره ${i}`)

function FoodSearch() {
    const [query, setQuery] = useState('')            // فوری: متن input
    const [filtered, setFiltered] = useState(ALL_FOODS) // غیرفوری: نتیجه
    const [isPending, startTransition] = useTransition()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setQuery(value)                      // ۱. input فوراً آپدیت می‌شود

        // نکته‌ی مهم: setQuery را نباید داخل startTransition بگذارید. state مربوط به input کنترل‌شده باید فوری باشد، وگرنه تایپ کردن خراب می‌شود.

        startTransition(() => {
            setFiltered(ALL_FOODS.filter(f => f.includes(value)))   // ۲. لیست بعداً
        })
    }

    return (
        <div>
            <input value={query} onChange={handleChange} placeholder="جستجوی غذا..." />
            {isPending && <p>در حال جستجو...</p>}

            <ul style={{ opacity: isPending ? 0.5 : 1 }}>
                {filtered.map(f => <li key={f}>{f}</li>)}
            </ul>
        </div>
    )
}

export default FoodSearch
