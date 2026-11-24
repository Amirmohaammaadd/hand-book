const countCounterString = (str: string): Record<string, number> => {

    const result: Record<string, number> = {};

    // let maxItem: string | undefined | number;
    // let maxCount = 0;

    for (let i = 0; i < str.length; i++) {

        const char = str[i]

        if (result[char]) {
            result[char]++

        } else {
            result[char] = 1
        }


        // if (result[char] > maxCount) {
        //     maxCount = result[char]
        //     maxItem = char
        // }
    }

    return result
    // return maxItem
}

console.log(countCounterString("thisisjustatest"));

// ---------------------------------------------------------

const countCounter = (arr: number[]) => {

    let result: Record<string, number> = {}
    let maxItem: string | undefined | number;
    let maxCount = 0;

    arr.forEach((_, index) => {
        const char = arr[index]
        if (result[char]) {
            result[char]++
        } else {
            result[char] = 1
        }


        if (result[char] > maxCount) {
            maxCount = result[char]
            maxItem = char
        }
    })

    return maxItem
    // return result

}