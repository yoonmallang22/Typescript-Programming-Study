// ---decorator---
// : 장식하는 대상에 함수를 호출해준다

// 특정 시그니처를 만족하는 일반 함수다. 즉, function 키워드의 함수다

// 타입스크립트가 데코레이터로써 시그니처에는 다음과 같은 것들이 있다
// 1. 클래스
// (Constructor : {new (...any[]): any}) => any
// 2. 메서드

type ClassConstructor<T> = new (...args: any[]) => T;

interface Payload {}

function serializable<T extends ClassConstructor<{ getValue(): Payload }>>(
  Constructor: T
) {
  return class extends Constructor {
    serialize() {
      return this.getValue().toString();
    }
  };
}

export {};
