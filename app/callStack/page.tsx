console.log('A'); //1

setTimeout(() => {
  console.log('B'); //4

  Promise.resolve().then(() => {
    console.log('C'); //5

    setTimeout(() => {
      console.log('D'); //9
    }, 0);
  });

  setTimeout(() => {
    console.log('E'); //6
  }, 0);
}, 0);

Promise.resolve().then(() => {
  console.log('F'); //3

  setTimeout(() => {
    console.log('G'); //7
  }, 0);
});

console.log('H'); //2 

// ---------------------------------------

console.log('1'); //1

setTimeout(() => {
  console.log('2'); //7

  Promise.resolve().then(() => {
    console.log('3'); //8
  });

  setTimeout(() => {
    console.log('4'); //11
  }, 0);
}, 0);

Promise.resolve().then(async () => {
  console.log('5'); //3

  await Promise.resolve();

  console.log('6'); //5

  Promise.resolve().then(() => {
    console.log('7'); //6
  });
});

queueMicrotask(() => {
  console.log('8'); //4

  setTimeout(() => {
    console.log('9'); //10
  }, 0);
});

setTimeout(() => {
  console.log('10'); //9
}, 0);

console.log('11'); //2

// ------------------------------------ 


console.log("1");

new Promise((resolve) => {
  console.log("2");
  resolve(undefined)

}).then(() => console.log("3"));

console.log("4");

// 1 → 2 → 4 → 3


