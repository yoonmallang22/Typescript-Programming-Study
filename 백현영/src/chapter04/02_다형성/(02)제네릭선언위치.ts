// 4.2.2 p84
// 호출 시그니처의 경우 제네릭의 선언 위치에 따라 제네릭의 타입이 달라질 수 있다.

// 1. 선언 시점에 제네릭을 선언하는 경우
type Reduce<T> = (
  array: T[],
  callbackFn: (acc: T, cur: T) => T,
  initValue: T
) => T;

// 선언 시점에 제네릭을 선언한 경우 구체 타입을 지정해야 한다.
const reduce: Reduce<number> = (array, reducer, initValue) => {
  let result = initValue;
  for (let i = 0; i < array.length; i++) {
    result = reducer(result, array[i]);
  }
  return result;
};

// ✅
reduce([1, 2, 3], (acc, cur) => acc + cur, 0);

// ❌
// reduce(['1', 2, 3], (acc, cur) => acc + cur, 0);

// 2. 호출 시점에 제네릭을 선언하는 경우
type Reduce2 = <T>(
  array: T[],
  callbackFn: (acc: T, cur: T) => T,
  initValue: T
) => T;

// 호출 시점에 제네릭을 선언한 경우 구체 타입을 지정하지 않아도 된다.
const reduce2: Reduce2 = (array, reducer, initValue) => {
  let result = initValue;
  for (let i = 0; i < array.length; i++) {
    result = reducer(result, array[i]);
  }
  return result;
};

// ✅
reduce2([1, 2, 3], (acc, cur) => acc + cur, 0);
reduce2(['1', '2', '3'], (acc, cur) => acc + cur, ''); // string으로 반환된다고 추론되므로 안전하게 사용가능하다

// ❌
// reduce2(['1', 2, 3], (acc, cur) => acc + cur, 0);
// reduce2(['1', '2', '3'], (acc, cur) => acc + cur, 0);

// 결론 : 최대한 호출 시점에 제네릭을 선언하는 것이 좋다.
// 다만 any로 추론될 수 있으니 noImplicitAny 옵션을 켜두는 것이 좋다.
