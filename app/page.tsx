export default function Page() {


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


    // for (let i = 0; i < arr.length; i++) {

    //   const char = arr[i]

    //   if (result[char]) {
    //     result[char]++
    //   } else {
    //     result[char] = 1
    //   }
    // }

    // return result
  }


  console.log(countCounter([1, 2, 2, 3]));




  return (
    <></>
  );
}