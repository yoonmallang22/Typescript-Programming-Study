// Rest Parameter

// ✅
// function total (...args : number[]) {
//   return args.reduce((prev, curr) => prev + curr);
// }

// console.log(total(1, 2, 3, 4, 5));

// ❌
// function total () {
//   return Array.from(arguments, (value) => value * 2)
// }

// console.log(total(1, 2, 3, 4, 5));

// call, bind, apply를 이용해 args를 넘겨줄 수 있다.
function multiply(a: number, b: number): void {
  console.log(a * b);
}

// ✅
multiply.call(null, 1, 5);
multiply.apply(null, [1, 5]);
multiply.bind(null, 1, 5)();
