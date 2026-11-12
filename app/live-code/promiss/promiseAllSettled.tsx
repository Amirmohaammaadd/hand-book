
export default function promiseAllSettled<T extends unknown[]>(
    iterable: T,
): Promise<T> {
    return new Promise((resolve) => {
        const results: unknown[] = [];
        let remaining = iterable.length;

        if (remaining === 0) {
            resolve(results as T);
            return;
        }

        for (let i = 0; i < iterable.length; i++) {
            Promise.resolve(iterable[i]).then(
                (value) => {
                    results[i] = { status: 'fulfilled', value };
                },
                (reason) => {
                    results[i] = { status: 'rejected', reason };
                },
            ).finally(() => {
                remaining -= 1;

                if (remaining === 0) {
                    resolve(results as never);
                }
            });
        }
    });
}

// useage

// const Page = () => {
//   useEffect(() => {
//     const run = async () => {
//       const res = await promiseAllSettled([
//         Promise.resolve(3),
//         42,
//         Promise.reject("error"),
//         new Promise((r) => setTimeout(() => r("foo"), 100)),
//       ]);

//       console.log(res);
//     };

//     run();
//   }, []);

//   return <div>Open the console to see the result</div>;
// };

// export default Page;