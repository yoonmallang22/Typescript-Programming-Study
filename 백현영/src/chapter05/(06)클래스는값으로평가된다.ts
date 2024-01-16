// 클래스는 값과 타입 모두로 평가가능하다.

// 타입스크립트의 대부분의것은 값 또는 타입이다.
// enum과 class는 특별하게 값이면서 타입이다. -> 타입스크립트에서 일반적인 타입들은 자바스크립트로 컴파일후에 사라지지만 클래스와 enum은 자바스크립트 코드로 남는다
// 하나 더 재밌는게 클래스의 타입수준은 2개의 용어로 정의된다.

type State = {
  [key: string]: string;
};

class StringDatabase {
  state: State = {};

  get(key: string): string | null {
    return key in this.state ? this.state[key] : null;
  }

  set(key: string, value: string): void {
    this.state[key] = value;
  }

  static from(state: State) {
    const db = new StringDatabase();
    for (let key in state) {
      db.set(key, state[key]);
    }

    return db;
  }
}

// StringDatabase의 생성자 타입은 아래와 같다.
// 1. 생성자 시그니처 (typeof 로 얻을수 있는)
interface StringDatabaseConstructor {
  new (): StringDatabase;
  from(state: State): StringDatabase; // 정적 메서드는 생성자 시그니처 인터페이스이다.
}

// 2. 인스턴스 타입
interface StringDatabase {
  state: State;
  get(key: string): string | null;
  set(key: string, value: string): void;
}

// example
class Person {
  eat() {
    console.log('냠냠');
  }
}
const personInstance = new Person();

// Person 클래스의 타입만 받는다. -> 생성자 타입
function receiveTypeOfPerson(p: typeof Person) {
  return new p();
}
// ✅
receiveTypeOfPerson(Person); // 클래스 자체의 타입은 가능하다.
// ❌
// receiveTypeOfPerson(personInstance); // 인스턴스는 불가능하다.

// 인스턴스만 받겠다. -> 인스턴스 타입
function receiveInstanceOfPerson(p: Person) {
  p.eat();
  return p;
  // ❌
  // const pInstance = new p();
  // pInstance.eat();
}

// ✅
receiveInstanceOfPerson(personInstance);
// ❌
// receiveInstanceOfPerson(Person);

// example2
function withSomthing<C extends Constructor>(c: C) {
  return class extends c {
    constructor(...args: any[]) {
      super(...args);
    }
  };
}

class SomeClass {}
const SomeClassWithSomething = withSomthing(SomeClass);

// const SomeClassWithSomething: {
//   new (...args: any[]): withSomthing<typeof SomeClass>.(Anonymous class);
//   prototype: withSomthing<any>.(Anonymous class);
// } & typeof SomeClass 😮 ** 단순히 SomeClass(인스턴스 타입)이 아니라 typeof SomeClass 즉, 생성자 타입이다. **

// ---Summary---
// 클래스는 값과 타입 두개의 수준을 갖는다
// 1. 인스턴스의 타입
// 2. 생성자의 타입 (typeof 로 얻을수 있다)
// 위 두개의 인터페이스를 합치면 해당 클래스의 생성자와 인스턴스가 완성된다.
// -> 위에서 말했듯이 클래스의 타입은 두개의 용어로 정의된다.

export {};
