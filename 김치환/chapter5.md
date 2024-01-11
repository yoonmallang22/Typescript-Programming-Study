# 클래스와 상속

- 자바스크립트의 클래스와 차이점은 타입스크립트는 멤버를 클래스 내부에 한 번 적어야 합니다.(멤버의 타입은 생략 가능)

### 접근 한정자

1. public
   - 선언한 자신의 클래스, 자손 클래스, new 호출로 만들어낸 인스턴스에서 속성을 사용할 수 있다.
   - 아무런 수식어를 붙이지 않으면 기본값으로 public이 된다.
2. protected
   - 자신의 클래스와 자손 클래스에서 속성을 사용할 수 있으나 인스턴스에선 사용 불가능 => 책에선 서브클래스 인스턴스에 접근을 허용한다고 되있긴함
3. private
   - 자신의 클래스에서만 속성을 사용할 수 있다.

```
class Parent {
  public name: string;
  readonly age: number;
  protected married: boolean;
  private value: number;

  constructor(name: string, age: number, married: boolean) {
    this.name = name;
    this.age = age;
    this.married = married;
    this.value = 0;
  }

  setAge(age: number) {
    this.age = age; // 읽기 전용 속성이므로 'age'에 할당할 수 없음
  }
}

class Child extends Parent {
  constructor(name: string, age: number, married: boolean) {
    super(name, age, married);
  }

  setName(name: string) {
    this.name = name;
  }

  setMarried(married: boolean) {
    this.married = married;
  }

  setValue(value: number) {
    this.value = value;
  }
}

const chiman = new Child('chiman', 3, false);

console.log(chiman.name)
console.log(chiman.age);
console.log(chiman.married);   // 'married' 속성은 보호된 속성이며 'Parent' 클래스 및 해당 하위 클래스 내에서만 액세스할 수 있습니다.
console.log(chiman.value); // 'value' 속성은 private이며 'Parent' 클래스 내에서만 액세스할 수 있습니다.

// readonly 속성이 붙어있는 age는 수정이 불가능
// private인 value는 자식클래스에서 접근 불가능
// protected인 married는 자식 클래스에서 접근 가능
// public은 자식 클래스에서 접근 가능
```

### 상속

- 클래스에서 다른 클래스를 상속받을 때 `extends` 키워드를 사용한다.

### 추상 클래스

- `abstract 키워드`를 사용해서 추상클래스를 정의한다.
- 추상클래스를 인스턴스 하려고 하면 에러가 발생한다.
- abstract 키워드로 추상 메서드와 추상 프로퍼티를 만들 수 있는데, 상속받은 자식 클래스에서 추상 프로퍼티, 추상메서드를 구현하지 않으면 에러가 발생한다.

```

abstract class Animal {
  legs: number;
  age: number;
  name:string;
  abstract value: number;

  constructor(legs: number, age: number, name:string) {
    this.legs = legs;
    this.age = age;
    this.name = name
  }

  sayName(){
    console.log(this.name);
  }

  abstract sayAge():void;
}

class Dog extends Animal{ // 추상 속성, 추상 메서드를 구현하지 않았기 때문에 에러 발생

}

-----

```

- 따라서 추상 메서드, 추상 속성을 자식 클래스에서 구현해 문제를 해결한다.

```
abstract class Animal {
  legs: number;
  age: number;
  name: string;
  abstract value: number;

  constructor(legs: number, age: number, name: string) {
    this.legs = legs;
    this.age = age;
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }

  abstract sayAge(): void;
}

class Dog extends Animal {
  value: number = 0;         // 추상 속성 구현

  sayAge(): void {           // 추상 메서드 구현
    console.log(this.age);
  }
}
```

# super

- 자식클래스가 부모 클래스에 정의된 메서드를 오버라이드하면 자식 인스턴스는 super를 이용해 부모 버전의 메서드를 호출할 수 있다.
- 생성자에서 super를 호출해 부모 생성자와 연동할 수 있다.
- super를 통해 부모 클래스의 메서드에는 접근할 수 있지만 프로퍼티에는 접근할 수 없다.
- 서브클래스에서 생성자를 생략하지 않으면 서브클래스의 생성자에서 super를 호출해야한다.

```

abstract class Animal {
  legs: number;
  age: number;
  name: string;
  abstract value: number;

  constructor(legs: number, age: number, name: string) {
    this.legs = legs;
    this.age = age;
    this.name = name;
  }

  sayName() {
    console.log('Animal');
  }

  abstract sayAge(): void;
}

class Dog extends Animal {
  value: number = 0;

  sayName() {
    super.sayName();            // super.sayName()
    console.log('dog', this.name);
  }

  sayAge() {
    console.log(this.age);
  }
}

const dog = new Dog(4, 10, 'dog');
dog.sayName();   // Animal

```

# this를 반환 타입으로 사용하기

- 아래의 코드에서는 Set 클래스의 add 메서드를 상속받은 MutableSet 클래스에서 오버라이드할 때, 반환 타입을 Set -> MutableSet으로 명시적으로 수정해야 하는 번거로움이 있습니다.
- 하지만 TypeScript에서는 반환 타입을 this로 지정함으로써, 해당 메서드를 호출한 객체의 타입으로 동적으로 결정하도록 해서 오버라이드할 때 반환 타입을 수동으로 수정할 필요가 없도록 할 수 있습니다.

```
class Set {
  has(value: number): boolean {
    return true;
  }

  add(value: number): Set {
    return new Set();
  }
}

class MutableSet extends Set {
  delete(value: number): boolean {
    return true;
  }

  add(value: number): MutableSet {  // Set => MutableSet으로 수정
    return new MutableSet();
  }
}


----- this로 반환타입 수정
class Set {
  has(value: number): boolean {
    return true;
  }

  add(value: number): this {
    return new Set();
  }
}
```

# 인터페이스

- interface 키워드를 통해 정의할 수 있다.

```
// 타입별칭
type Sushi = {
    calories:number;
    salty:boolean;
    tasty:boolean
}

// 인터페이스
interface Sushii  {
  calories: number;
  salty: boolean;
  tasty: boolean;
};

```

- 타입별칭과 인터페이스의 차이점

1. 다른 타입과 조합하는 경우 타입별칭은 (&)연산자를 사용하지만, 인터페이스는 extends를 사용한다.

```
// 타입별칭
type Food = {
  calories: number;
  salty: boolean;
  tasty: boolean;
}

type Sushi = Food & {
    salty: boolean;
}

type Cake = Food & {
    sweet: boolean;
}

// 인터페이스

interface Food {
  calories: number;
  salty: boolean;
  tasty: boolean;
};

interface Sushi extends Food {
  salty: boolean;
};

interface Cake extends Food {
  sweet: boolean;
};
```

2. 타입별칭은 타입 별칭의 오른쪽편에 타입 표현식(타입, &, | 등 타입연산자)를 포함한 모든 타입이 등장할 수 있다. 반면에 인터페이스의 오른편에는 반드시 형태(객체의 구조)가 나와야 한다.

```

// 타입 별칭(Type Alias)
type MyTypeAlias = number | string;

// 인터페이스(Interface)
interface MyInterface {
    prop1: string;
    prop2: number;
}
```

3. 인터페이스를 상속할 때 타입스크립트는 상속받는 인터페이스 타입에 상위 인터페이스를 할당할 수 있는지 확인한다.

```
interface A {
  good(x: number): string;
  bad(x: number): string;
}

interface B extends A {
  good(x: number | string): string;
  bad(x: string): string; // 에러 발생 number 타입은 string에 할당할 수 없음
}
```

- 그러나 타입별칭으로 바꾸면 타입스크립트는 확장하는 타입을 최대한 조합하는 방향으로 동작하기에 에러가 발생하지 않는다. => 더 안전하지 않다는 의미인가?

```
type A =  {
  good(x: number): string;
  bad(x: number): string;
}

type B = A &   {
  good(x: number | string): string;
  bad(x: string): string;
}

```

4. 인터페이스의 경우 이름과 범위가 같은 인터페이스가 여러 개 있다면 이들을 자동으로 합쳐지지만(선언 합침), 타입별칭의 경우 에러가 발생한다.

```
// 인터페이스
interface User{
    name:string
}

interface User {
  age: number;
}

let user : User ={
    name:'chiman',
    age:3
}

// 타입별칭

type User = {   // 식별자가 중복되었습니다.
  name: string;
}

type User2 = {    // 식별자가 중복되었습니다.
  age: number;
}

```

- 단 인터페이스의 이름이 같을 경우 한 타입의 프로퍼티와 다른 타입의 프로퍼티가 동일하지 않다면 에러가 발생한다.
- 제네릭을 선언한 인터페이스의 경우 제네릭들의 선언 방법과 이름까지 똑같아야 합칠 수 있다.

```
interface User {
  name: string;
}

interface User {
  name: number;     // 에러 발생 : name속성은 string 타입이어야함
  age: number;
}

let user: User = {
  name: 'chiman',
  age: 3,
};

---------
// 제네릭
interface User<Age extends number> {
  age:Age
}

interface User<Age extends string> {   // User의 모든 선언에는 동일한 형식 매개 변수가 있어야 합니다.
  age: Age;
}
```

### 구현

- 클래스를 선언할 때 `implements` 라는 키워드를 이용해 특정 인터페이스를 만족시킴을 표현할 수 있다.
- 다른 명시적 타입 어노테이션처럼 implement로 타입 수준의 제한을 추가하면 구현에 문제가 있을 때 쉽게 파악할 수 있다.
- 인터페이스로 인스턴스 프로퍼티를 정의할 수 있지만 `가시성 한정자(private, protected, public)는 선언할 수 없으며 static 키워드도 사용할 수 없다.`
- 그러나 객체 안의 객체 타입처럼 인스턴스 프로퍼티를 readonly로 설정할 수 있다.
- 한 클래스가 하나의 인터페이스만 구현할 수 있는 것은 아니며 필요하면 여러 인터페이스를 구현할 수 있다.

```
interface Animal {
  private type :string    // 에러 발생
  protected age :string    // 에러 발생
  public item : boolean   // 에러 발생

  readonly name: string;
  eat(food: string): void;
  sleep(hours: number): void;
}

class Cat implements Animal, Feline, 먼치킨{
    eat(food: string): void {
        // ...
    }

    sleep(hours: number): void {
        // ...
    }
}
```

### 인터페이스 구현 vs 추상 클래스 상속

- 여러 클래스를 공유하는 구현 => 추상클래스르 사용
- 가볍에 이 클래스는 T다 라고 말하는 것이 목적 = > 인터페이스 사용

- 인터페이스
  - 더 범용적으로 쓰이며, 가볍다
  - 형태를 정의하는 수단
  - 값 수준에서는 객체, 배열, 함수, 클래스, 인스턴스를 정의할 수 있다.
  - 자바스크립트 코드를 만들지 않으며, 컴파일 타임에만 존재한다.
- 추상 클래스 상속
  - 특별한 목적과 풍부한 기능을 갖는다.
  - 오직 클래스에서만 정의할 수 있다.
  - 런타임의 자바스크립트 클래스 코드를 만든다.
  - 생성자와 기본 구현을 가질 수 있으며, 프로퍼티와 메서드에 접근 한정자를 지정할 수 있다.

### 클래스는 구조 기반 타입을 지원한다.

- 타입스크립트는 클래스를 비교할 때 이름이 아니라 구조를 기준으로 삼는다.

```
class Zebra{
    trot(){
        // ....
    }
}

class Poodle{
    trot(){
        // ...
    }
}

function ambleAround(animal:Zebra){
    animal.trot()
}

const zebra = new Zebra();
const foodle = new Poodle();

ambleAround(zebra);
ambleAround(foodle);
```

- 그러나 private, protect 필드를 갖는 클래스는 할당할 수 없다

```
class Zebra{
    trot(){
        // ....
    }
}

class Poodle{
    private trot(){
        // ...
    }
}

function ambleAround(animal:Zebra){
    animal.trot()
}

const zebra = new Zebra();
const foodle = new Poodle();

ambleAround(zebra);
ambleAround(foodle); // 에러 발생
```

# 클래스는 값과 타입 모두 선언한다.

- 값과 타입은 별도의 네임스페이스에 존재한다.
- 용어를 어떻게 사용하는지를 보고 타입스크립트가 알아서 이를 값 또는 타입으로 해석한다.

```
// 값
let a = 1000;
function b() {}

// 타입
type a = number;
interface b {
  (): void;
}


if(a+1 > 3){}   // 문맥상 값 a로 추론
let x :a = 3    // 문맥상 타입 a로 추론
```

- 한편 클래스와 열거형은 타입 네임스페이스에 타입을, 값 네임스페이스에 값을 동시에 생성한다.

```
class C {}

// 첫번째 C는 인스턴스 타입, 두번째 C는 값 C
let c: C = new C();

enum E {
  F,
  G,
}

// 첫번째 E는 열거형의 타입, 두번 째 E는 값 E
let e: E = E.F;

```

- `let c: C = new C()` 코드에서 C는 C클래스의 인스턴스를 가리켰다.
- C클래스 자체는 어떻게 가리킬 수 있을까? => typeof 키워드를 사용하면 된다.
- 클래스를 선언하면 값과 타입을 둘 다 생성하고, 타입 수준에서는 2개의 인터페이스(인스턴스 타입, 생성자 타입)를 생성합니다.
- 인스턴스 타입은 클래스의 인스턴스를 가리키며, 생성자 타입은 typeof 로 얻을 수 있는 클래스 생성자 자체를 가리킨다.

```
type State = {
  [key: string]: string
}

class StringDatabase {
  state: State = {}

  constructor(public state: State = {}) {}

  get(key: string): string | null {
    return key in this.state ? this.state[key] : null
  }

  set(key: string, value: string): void {
    this.state[key] = value
  }

  static from(state: State) {
    const db = new StringDatabase()
    for (let key in state) {
      db.set(key, state[key])
    }
    return db
  }
}

// 인스턴스 타입
interface StringDatabase {
  state: State
  get(key: string): string | null
  set(key: string, value: string): void
}

// 생성자 타입
interface StringDatabaseConstructor {
  new (state?: State): StringDatabase     => 생성자 시그니처
  from(state: State): StringDatabase
}
```

# 다형성

- 클래스에서 제네릭 타입의 범위는 클라스 전체가 되게 할 수도 있고 특정 메서드로 한정할 수도 있다.

```
// 클래스와 함께 제네릭을 선언했으므로 클래스 전체에서 타입을 사용할 수 있다.
class MyMap<K, V> {
  // constructor에서는 제네릭타입을 선언할 수 없음
  constructor(initialKey: K, initialValue: V) {}

  get(key: K): void {
    ///
  }

  // 자신만의 제네릭도 추가로 선언할수 있다.
  merge<K1,V1>(map:MyMap<K1,V1>): void {
    ///
  }

  // 정적 메서드는 클래스 수준의 제네릭을 사용할 수 없다.
  static of<K, V>(k: K, v: V): void {
    ///
  }
}
```

# 믹스인

- 자바스크립트와 타입스크립트는 trait나 mixin 키워드를 제공하지 않지만 직접 구현할 수 있다.

# 데코레이터

-

# final 클래스 흉내내기

- 타입스크립트는 클래스나 메서드에 final 키워드를 지원하지 않지만 클래스에서 final 효과를 낼 수 있다.
- final 키워드는 클래스나 메서드를 확장하거나 오버라이드 할 수 없게 만드는 기능이다.
- 단 인스턴스를 만들 수 있다.
- final 효과 내는 방법

  - contrtuctor를 private 접근한정자로 선언한다. => 인스턴스를 생성하거나, 클래스를 확장할 수 없게 만든다.
  - 하지만 위 방법은 인스턴스도 생성할 수 없기 때문에 수정이 필요
  - static으로 정적 메서드를 통해 인스턴스를 만드는 방식으로 가능

    ```
    class MessageQueue {
        private constructor(private messages:string[]){}
    }

    class BadQueue extends MessageQueue {}  // 에러 발생
    new MessageQueue() // 에러발생


    class MessageQueue2 {
      private constructor(private messages: string[]) {}
      static create(messages:string[]){
        new MessageQueue2(messages)
      }
    }

    class BadQueue2 extends MessageQueue2 {}  // 에러 발생
    MessageQueue2.create([]) // 문제없음
    ```

# 디자인 패턴

### 팩토리 패턴

- 어떤 객체를 만들지를 전적으로 팩토리에 위임한다.
- 아래에서 type Shoe, 값 Shoe를 같은 이름으로 선언했는데 이걸 컴패니언 객체 패턴이라고 하는 것 같다.
- 아래의 Shoe라는 팩토리를 만들어서 호출자가 팩토리가 특정 인터페이스를 만족하는 클래스를 제공할것 이라는 사실만 알 뿐 어떤 구체 클래스가 이 일을 하는지 알 수 없게 만든다.
  => 객체 생성을 캡슐화하여, 호출자에게 어떤 구체 클래스가 생성되는지에 대한 세부 사항을 숨김

```
type Shoe  ={
  purpose: string;
};

class RunningShoe implements Shoe {

  purpose: 'running';
}

class Boot implements Shoe {
  purpose: 'woodutting';
}

class Sneaker implements Shoe {
  purpose: 'walking';
}

let Shoe = {
  create(type: 'runningShoe' | 'boot' | 'sneaker'): Shoe {
    switch (type) {
      case 'runningShoe':
        return new RunningShoe();
      case 'boot':
        return new Boot();
      case 'sneaker':
        return new Sneaker();
    }
  },
};


Shoe.create('boot')
Shoe.create('sneaker');
```

### 빌더 패턴

- 객체의 생성자가 많은 매개변수를 갖거나, 객체의 설정이 여러 단계로 나누어져야 할 때 유용합니다.
- 객체의 생성과 설정을 여러 메서드 호출을 통해 진행합니다. 각 메서드는 한 가지 측면이나 속성을 설정합니다.
- 각 메서드는 빌더 객체 자신을 반환하므로, 메서드 체이닝을 통해 여러 메서드를 연이어 호출할 수 있습니다.

```
class RequestBuilder {
  private data: object | null = null;
  private method: 'get' | 'post' | null = null;
  private url: string | null = null;

  setMethod(method: 'get' | 'post'): this {
    this.method = method;
    return this;
  }

  setData(data: object): this {
    this.data = data;
    return this;
  }

  setUrl(url: string): this {
    this.url = url;
    return this;
  }
}

new RequestBuilder().setUrl('/user').setMethod('get').setData({firstName:'chihwan'});

```
