const arr = [1, 2, 'a', 'b', true];

// 각 요소의 타입은 추론된다
// 근데 추론 시점이 중요하다 언제일까 ?
// -> 선언 시점
// 🤔
const numbers = arr.filter((item) => typeof item === 'number');

// ❌
// const ifNumberReturnTrueElseUpper = arr.map((item) => {
//   if (typeof item === 'number') {
//     return true;
//   } else {
//     return item.toUpperCase();
//   }
// });

// 🤔
type arrType = (typeof arr)[1];
