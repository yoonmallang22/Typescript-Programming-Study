/**
 * unknown
 * boolean으로 평가되는 비교만 가능하다.
 */
const num: unknown = 30;

// ❌
// const total = num + 10;

// unknown끼리의 연산도 불가능하다.
// const num2: unknown = 50;
// const result = num + num2;

// ✅
if (typeof num === 'number') {
  const total = num + 10;
}

export {};
