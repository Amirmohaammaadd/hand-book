export default function deepEqual(
    a: unknown,
    b: unknown
): boolean {
    if (Object.is(a, b)) return true;

    if (typeof a !== "object" || typeof b !== "object" || a === null || b === null
    ) {
        return false;
    }

    if (Array.isArray(a) !== Array.isArray(b)) {
        return false;
    }

    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length) return false;

        for (let i = 0; i < a.length; i++) {
            if ((i in a) !== (i in b)) return false;

            if (!deepEqual(a[i], b[i])) return false;
        }

        return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
        if (!Object.hasOwn(b, key)) return false;

        if (
            !deepEqual(
                (a as Record<string, unknown>)[key],
                (b as Record<string, unknown>)[key]
            )
        ) {
            return false;
        }
    }

    return true;
}