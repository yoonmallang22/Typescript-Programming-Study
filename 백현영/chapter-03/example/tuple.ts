type threeLengthArr = [number, number, number];
type imutableThreeLengthArr = readonly [number, number, number];

const arr = [1, 2, 'a', 'b', true] as const;
const arr2: readonly [number, number, string, string, boolean] = [
  1,
  2,
  'a',
  'b',
  true,
];
const arr3: threeLengthArr = [1, 2, 3];
const arr4: imutableThreeLengthArr = [1, 2, 3];

// ✅
arr3[0] = 3;

// ❌
// arr2[0] = 3;
// arr4[0] = 3;

// 🤔
type arrType = (typeof arr)[1];

export {};
