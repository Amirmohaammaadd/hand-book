'use client'
import { useOptimistic, useState } from 'react'

const toggleFavorite = (vendorId: string, next: boolean) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`vendor ${vendorId} → ${next}`), 1500)
    })
}

function FavoriteButton({ vendorId, initial }: { vendorId: string; initial: boolean }) {

    const [isFavorite, setIsFavorite] = useState(initial)
    const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(isFavorite)

    console.log('render →', { isFavorite, optimisticFavorite })

    async function action() {
        const next = !isFavorite
        console.log('1️⃣ click, next =', next)

        setOptimisticFavorite(next)          // ۱. فوراً در UI

        try {
            const promise = toggleFavorite(vendorId, next) // ۲. کال سرویس
            console.log('2️⃣ promise:', promise)          // Promise {<pending>}

            const result = await promise
            console.log('3️⃣ resolved:', result)

            setIsFavorite(next)             // ۳. موفق: state واقعی را آپدیت کن

        } catch (err) {
            console.log('❌ rejected:', err)
            alert('خطا در ثبت علاقه‌مندی')    // ۴. خطا: rollback خودکار است
        }
    }

    return (
        <form action={action}>
            <button type="submit">{optimisticFavorite ? '❤️' : '🤍'}</button>
        </form>
    )
}

export default FavoriteButton