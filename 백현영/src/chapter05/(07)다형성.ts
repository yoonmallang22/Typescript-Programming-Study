// 클래스와 인터페이스도 제네릭을 사용할 수 있다.

// 1. ---클래스의 제네릭---

// Gen : Generic
class myMap<KeyGen, ValGen> {
  constructor(initailKey: KeyGen, initailVal: ValGen) {
    // ...
  }

  get(key: KeyGen) {
    // ...
  }

  set(key: KeyGen, val: ValGen): void {
    // ...
  }

  merge<KeyGen2, ValGen2>(
    map: myMap<KeyGen2, ValGen2>
  ): myMap<KeyGen | KeyGen2, ValGen | ValGen2> {
    // ...
    return this;
  }

  static of<KeyGen, ValGen>(k: KeyGen, v: ValGen): myMap<KeyGen, ValGen> {
    return new myMap(k, v);
  }
}

// 함수의 제네릭과 마찬가지로 추론을 맡길수도 구체화할수도 있다.
// - 추론
const myMap1 = new myMap(1, 'hello'); // myMap<number, string>

// - 구체화
const myMap2 = new myMap<number, string>(1, 'hello'); // myMap<number, string>

// 2. ---인터페이스의 제네릭---
interface MyMap<KeyGen, ValGen> {
  get(key: KeyGen): ValGen;
  set(key: KeyGen, val: ValGen): void;
}

export {};
