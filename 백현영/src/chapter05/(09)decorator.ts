// ---decorator---
// : 장식하는 대상에 함수를 호출해준다
// typescriptlang.org : @decorator은 데코레이팅 된 선언에 대한 정보와 함께 **런타임**에 호출되는 함수여야 합니다.
// ⭐️ 특정 시그니처를 만족하는 일반 함수다.

// 아래에서 나오겠지만 컴파일타임에 검사가 되지않고 런타임에 평가가 실행되기에 아직은 완벽한 기능은 아니다. (자바의 데코레이터 경우 컴파일타임에 검사가 된다)
// 근데 angular에서는 오지게 쓰는거보면 문제없을것 같다.

// 타입스크립트가 데코레이터로써 사용되는 시그니처에는 다음과 같은 것들이 있다
// 1. 클래스
// (Constructor : {new (...any[]): any}) => any
// 2. 메서드
// Method (classPrototype: {}, methodName: string , descriptor: PropertyDescriptor) => any
// 3. 정적 메서드
// (classConstructor: {new (...any[])} => any}, methodName: string , descriptor: PropertyDescriptor) => any
// 4. 프로퍼티
// (classPrototype: {}, propertyName: string) => any
// 5. 정적 프로퍼티
// (classConstructor: {new (...any[])} => any}, propertyName: string) => any
// 6. 프로퍼티 게터/세터
// (classPrototype: {}, propertyName: string, descriptor: PropertyDescriptor) => any
// 7. 정적 프로퍼티 게터/세터
// (classConstructor: {new (...any[])} => any}, propertyName: string, descriptor: PropertyDescriptor) => any

type ClassConstructor<T> = new (...args: any[]) => T;

interface Payload {}

function serializable<T extends ClassConstructor<{ getValue(): Payload }>>(
  Constructor: T
) {
  return class extends Constructor {
    constructor(...args: any[]) {
      super();
      console.log('serializable constructor');
    }

    serialize() {
      return this.getValue().toString();
    }
  };
}

@serializable
class APIPayload {
  public value: Payload;

  constructor(value: Payload) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  // serialize(): string;
}

// const payload = new APIPayload(12342141);

// 🤔 컴파일타임에는 serialize() 가 없다.. 이게 바로 데코레이터의 문제
// console.log(typeof payload.serialize()); // 출력은 제대로 된다.

// 🤔 better ? -> 차라리 이런 합성이 나을수도 있다
// const decoratedPayload = serializable(APIPayload);
// const payload2 = new decoratedPayload(12342141);
// console.log(typeof payload2.serialize());

// 데코레이터가 여러개라면 ?

function firstDecorator() {
  console.log('first 데코레이터 팩토리');

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('first 데코레이터 실행');
  };
}

function secondDecorator() {
  console.log('first 데코레이터 팩토리');

  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    console.log('second 데코레이터 실행');
  };
}

class DecoratorTest {
  @firstDecorator()
  @secondDecorator()
  test() {
    console.log('test');
  }
}

// 위의 serializable을 주석처리하고 실행해보자
const decoratorTest = new DecoratorTest();
decoratorTest.test();
// 실행결과
// first 데코레이터 팩토리
// second 데코레이터 팩토리
// second 데코레이터 실행
// first 데코레이터 실행
// test

// 즉, 데코레이터 팩토리는 위애서 아래로
// 실제 데코레이터의 실행은 아래에서 위로 실행된다
// firstDecorator(secondDecorator(test())) 와 같이 수학적 함수식과 같다.

export {};
