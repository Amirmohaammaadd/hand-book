function moveStringChar(s: string): string {
  const left: string[] = [];
  const right: string[] = [];

  for (const ch of s) {
    if (ch === '<') {
      if (left.length) right.push(left.pop()!);
    } else if (ch === '>') {
      if (right.length) left.push(right.pop()!);
    } else if (ch === '#') {
      left.pop(); // اگر خالی باشد، فقط undefined برمی‌گرداند و مشکلی نیست
    } else {
      left.push(ch);
    }
  }

  return left.join('') + right.reverse().join('');
}

console.log(moveStringChar('abc<df'));    // "abdfc"
console.log(moveStringChar('abc<<#>z'));  // "bzc"
console.log(moveStringChar('abcffm<#a')); // "abcfam"