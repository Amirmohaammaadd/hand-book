const countCounter = (str: string): Record<string, number> => {

    const result: Record<string, number> = {};

    for (let i = 0; i < str.length; i++) {

        const char = str[i]

        if (result[char]) {
            result[char]++

        } else {
            result[char] = 1
        }
    }

    return result
}


console.log(countCounter("thisisjustatest"));