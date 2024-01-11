# Chapter4 - 클래스

## 접근 제어자

타입스크립트는 클래스의 프로퍼티와 메서드에 세 가지의 접근 제어자를 제공합니다.

### public

어디에서든지 접근할 수 있습니다.

### private

해당 클래스의 인스턴스에서만 접근할 수 있습니다.

### protected

해당 클래스와 서브 클래스의 인스턴스에서만 접근할 수 있습니다.

## 추상 클래스

`abstract` 키워드를 통해 추상 클래스를 생성할 수 있습니다.<br>
추상 클래스는 인스턴스를 생성할 수 없고 상속에만 사용할 수 있습니다.

추상 클래스 내부에 추상 메서드가 존재한다면 상속을 받는 클래스에서 메서드의 세부 구현을 작성해야 합니다.

```ts
abstract class Parent {
  abstract doSomeThing(): void;
}

class Child extends Parent {
  doSomeThing() {
    console.log('hello');
  }
}
```

## 인터페이스

```ts
interface User {
  name: string;
  age: number;
}
```

인터페이스를 사용하면 타입을 더 깔끔하게 정의할 수 있습니다.

타입스크립트에서는 인터페이스를 확장할 때, 기존 메소드의 매개변수 타입을 다른 타입으로 변경하는 것을 허용하지 않습니다

## 클래스에서의 구조 기반 타입

타입스크립트는 구조 기반 타입을 지원하는 언어입니다.

```ts
class A {
  name = 'A';
}

class B {
  name = 'B';
}

function f(arg: A) {
  console.log(arg.name);
}

f(new B());
```

따라서 이와 같은 코드에서 에러가 발생하지 않습니다.

하지만 private나, protected 필드를 가지는 클래스인 경우에는 구조 기반 타입 체크가 아닌 명목 기반 타입체크를 수행하기 때문에 에러가 발생합니다.

```ts
class A {
  name = 'A';
  private f = 'private field';
}

class B {
  name = 'B';
  private f = 'private';
}

function f(arg: A) {
  console.log(arg.name);
}

f(new B());
//'B' 형식의 인수는 'A' 형식의 매개 변수에 할당될 수 없습니다.
// 형식에 별도의 프라이빗 속성 'f' 선언이 있습니다.
```

## typeof

자바스크립트에는 값 수준의 typeof가 있듯이 타입스크립트에서는 타입 수준의 typeof가 존재합니다.

## 제네릭

클래스에서도 제네릭을 사용할 수 있습니다.
클래스에 선언된 제네릭은 클래스 내부 어디에서나 사용할 수 있습니다.

```ts
class A<T> {
  constructor(initKey: T) {}
}
```

## 믹스인

타입스크립트에서 클래스는 단 한번만 상속 받을 수 있습니다.

타입스크립트에서 다중 상속을 구현하기 위해, 상속의 개념이 아닌 기존의 클래스를 재구성하는 형태의 믹스인을 사용할 수 있습니다.

```ts
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    timestamp = Date.now();
  };
}

class User {
  constructor(public name: string) {}
}

const TimestampedUser = Timestamped(User);

const user = new TimestampedUser('name');
```
