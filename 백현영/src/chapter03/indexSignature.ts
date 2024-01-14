/**
 * 자바스크립트 key에는 number와 string을 할당 가능하다
 * 비록 number로 할당하더라도 stirng으로 변환되어 할당되지만 말이다.
 * 반대로 말하면 string으로 형변환을 했을때 가능한것만 key로 할당 가능하다.
 */

// ❌
// const obj: {
//   [key: number]: string;
// } = {
//   '4': 'd',
// };

// ✅
const obj: {
  [key: number]: string;
} = {
  1: 'a',
  2: 'b',
  3: 'c',
};

// key를 몇시적으로 변수처럼 사용도 가능하다
const keyByNameObj: {
  readonly [name: string]: 'male' | 'female';
} = {
  치환: 'male',
  수진: 'female',
};

export {};
