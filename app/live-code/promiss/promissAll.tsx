export default function promiseAll<T extends unknown[]>(
    iterable: T,
): Promise<T> {

    return new Promise((resolve, reject) => {
        const result: unknown[] = []
        let remaining = iterable.length

        if (remaining === 0) {
            resolve(result as T)
            return
        }

        for (let i = 0; i < iterable.length; i++) {
            Promise.resolve(iterable[i]).then(vlaue => {
                result[i] = vlaue
                remaining -= 1

                if (remaining === 0) {
                    resolve(result as T)
                }
            }, reject)
        }

        // iterable.forEach((item, index) => {
        // Promise.resolve(item).then((value) => {
        //     results[index] = value;
        //     remaining -= 1;

        //     if (remaining === 0) {
        //         resolve(results as T);
        //     }
        // }, reject);
        // });

    })
}
