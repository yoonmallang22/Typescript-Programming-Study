// ---interface---
// : 표현하고싶은 것의 형태를 정의한다는 점에서는 type alias와 동일하다.

// - type alias와의 차이점
// 추상적이지만 굳이 나눈다면
// type alias : 기존에 있는 type을 가르키는 별칭
// interface : 새로운 타입을 만드는것 ex)object, class

// 클래스를 표현할때는 interface(외부의 객체와 소통할, 혹은 통신할때 사용할 프로토콜의 정의? 가르침?)라는것 의미 자체를 생각한다면 interface를 사용하는게 좋은것 같다.

// interface와 type의 차이점

// 1. interface는 상속받을때 타입체킹을 한다.
// 1-1 즉, 상위 인터페이스를 할당할 수 있는지 확인한다.

// ❌ 불가능하다
// interface NarrowInterface {
//   good(x: number): string;
//   bad(x: number): string;
// }

// interface WideInterface extends NarrowInterface {
//   good(x: string | number): string;
//   bad(x: string): string;
// }

// ✅ type의 경우 상속과 같이 &를 사용하는데 이때는 최대한 조합하는 방향으로 간다.
// interface NarrowType {
//   good(x: number): string;
//   bad(x: number): void;
// }

// type CombineType = {
//   good(x: string | number): string;
//   bad(x: string): void;
// } & NarrowType;

// const wideTypeTest: CombineType = {
//   good(x: number) {
//     return 'good';
//   },
//   bad(x: never) {}, // 🤔 그러니까 뭐.. never가 되든 말든 어떻게든 만들어내서 컴파일 에러를 뱉지않는다는 의미인것 같다.
// };

// 2.interface는 선언 병합이 된다.
// 2-1 클래스와 interface도 병합되므로 주의해야한다.

interface Person {
  name: string;
  walk(): void;
  other(): void;
}

// 🤔 other과 another를 구현하지않았는데 컴파일 에러가 발생하지 않는다.
class Person implements Person {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  walk(): void {}
}

// ❌
// 지는 병합하면서 남한테는 구현을 강제한다.
// 어이가없다.
// class otherPerson implements Person {
//   name: string;

//   constructor(name: string, age: number) {
//     this.name = name;
//   }

//   walk(): void {
//     console.log(`${this.name} is walking`);
//   }

//   // other(): void {}
// }

// namespace를 사용하면 되긴 하다.
// namespace Foo {
//   export interface Person {
//     name: string;
//     walk(): void;
//   }
// }

// interface의 implement와 abstract는 엄밀히 말하면 다르다.
// 둘다 구현을 강제할 수 있지만
// abstract는 런타임에 자바스크립트 코드가 생성된다.
// interface는 형태를 정의한다고 앞서 말했듯이 interface의 implement는'이 클래스는 T다'라는 것을 명시할때 사용하고
// abstract는 런타임에 생성되므로 구현을 공유할때 사용하면 좋겠다
// 또한 abstract는 프로퍼티와 메서드에 접근한정자도 제공하니 말이다.

export {};
