const map = <T, U>(array: T[], callback: (item: T) => U) => {
  const mappedArray: U[] = [];

  for (let i = 0; i < array.length; i++) {
    mappedArray.push(callback(array[i]));
  }

  return mappedArray;
};

// 타입추론을 잘 해낸다.
map([1, 2, 3], (item) => item + 1);
map([1, 2, 3], (item) => typeof item === 'number');

// 명시적으로 지정도 가능하다.
map<number, number>([1, 2, 3], (item) => item + 1);
map<number, boolean>([1, 2, 3], (item) => typeof item === 'number');

// 타입스크립트가 추론을 제대로 못하는 경우 제네릭 매개변수를 명시적으로 어노테이션 해주자
// ❌
// const promises2 = Promise.all([
//   new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
//   new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
//   new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
// ]);

// promises2.then((result) => result.reduce((prev, curr) => prev + curr, 0));

// ✅
const promises = Promise.all<number>([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]);

promises.then((result) => result.reduce((prev, curr) => prev + curr, 0));
