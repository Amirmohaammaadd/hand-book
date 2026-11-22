  type T = number | string | T[];

  function calc(arr: T): number {
    if (!Array.isArray(arr)) return Number(arr);

    let result = calc(arr[0]);

    for (let i = 1; i < arr.length; i += 2) {
      const op = arr[i];
      const num = calc(arr[i + 1]);

      if (op === "+") result += num;
      else if (op === "-") result -= num;
      else if (op === "*") result *= num;
      else if (op === "/") result /= num;
    }

    return result;
  }

  console.log(calc([["8", "*", "3"], "+", "5"])); // 29

  console.log(calc([[["2", "+", "3"], "*", "4"], "-", ["10", "/", "2"]])); // 15