
# 5장. 클래스와 인터페이스

## 1. 클래스와 상속

> 프로퍼티의 타입을 타입 리터럴로 만들면, 프로퍼티 타입을 안전하게 설정할 수 있다

- 예)
    - 색, 파일, 랭크의 종류 많지 않으므로 가질 수 있는 모든 값을 타입 리터럴로 열거할 수 있다.
    - 특정 문자열, 숫자만 가질 수 있게 하여 타입 안전성을 확보할 수 있다.


```typescript
type Color = "Black" | "White";
type File = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H";
type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class Piece {
  protected position: Position;
  constructor(
  		private readonly color: Color,
        file: File,
        rank: Rank
  ) {
    	this.position = new Position(file, rank);
  }
}
```

---

> 타입스크립트는 클래스의 프로퍼티와 메서드에 세 가지 접근 한정자를 제공한다

- `public` : 어디에서나 접근 가능

- `protected` : 해당 클래스와 서브 클래스의 인스턴스에서만 접근 가능

- `private` : 해당 클래스의 인스턴스에서만 접근 가능

---

> absctract class (추상 클래스)

1. 인스턴스를 생성할 수 없다.

```typescript
abstract class Piece { ... }
new Piece();   // Error
```

2. 상속을 받은 클래스를 통해서만 인스턴스화 할 수 있다.

```typescript
abstract class Piece { ... }

class Queen extends Piece { ... }

new Queen() // OK
```

3. abstract 클래스 내부에 선언한 abstract 메서드는 상속 받은 클래스에서 무조건 선언해줘야한다.

```typescript
abstract class Piece {
    // ...
    moveTo() {...}
    abstract canMoveTo(position: Position) {  // 추상 메서드
    	return { ... }
    }
}
  
class King extends Piece {
	canMoveTo(position: Position) {  // 추상 메서드는 무조건 선언
    	//...
    }
}
```

<br />

## 2. super

자바스크립트 처럼 타입스크립트도 super 호출을 지원한다.

자식 클래스가 부모 클래스에 정의된 메서드를 오버라이드하면 자식 인스턴스는 super를 이용해 부모버전의 메서드를 호출할 수 있다.

super로 부모 클래스의 메서드에만 접근할 수 있고 프로퍼티에는 접근할 수 없다.

<br />

## 3. this를 반환 타입으로 사용하기

`this`를 값 뿐만 아니라 반환 **타입**으로도 사용할 수 있다.

클래스의 메서드의 반환 타입으로 `this`타입을 사용할 수 있다.

`this`를 사용하지 않고 해당 클래스를 리턴해야 하는 메서드를 만들어야 할 때,

그 부모를 상속하는 모든 자식 클래스는 메서드를 오버라이딩 해줘야 한다.

```typescript
class Set {
    add(value: numver): Set {
        // ...
    }
}

class MutableSet extends Set {
    add(value: number): MutableSet {  // ⬅️ add 메서드 오버라이딩 해줘야 함
        //...
    }
}
```

반면 아래와 같이 반환타입으로 `this`를 사용한다면, 코드를 간결하게 작성할 수 있다.

이때, `MutableSet`의 `add` 메서드는 `MutableSet`을 반환한다.

```typescript
class Set {
    has(value: number): boolean {
        // ...
    }
    add(value: numver): this {
        // ...
    }
}

class MutableSet extends Set {
    delete(value: number): boolean {
        // ...
    }
}
```

<br />

## 4. 인터페이스

인터페이스를 통해 타입을 더 깔끔하게 정의할 수 있다.

인터페이스와 타입 별칭은 문법만 다를 뿐 거의 같은 기능을 수행한다.

```typescript
type Sushi = {
	calories: number
  	salty: boolean
  	tasty: boolean
}

interface Sushi = {
	calories: number
  	salty: boolean
  	tasty: boolean
}
```

---

Food 타입을 따로 빼서 공통 정보를 정의하고, 다른 타입의 음식들도 Food를 이용해 정의할 수 있다.

```typescript
// 타입 별칭
type Food = {
  calories: number
  tasty: boolean
}

type Sushi = Food & {
  salty: boolean
}

type Cake = Food & {
  sweet: boolean
}


// 인터페이스
interface Food {
    calories: number,
    tasty: boolean
}

interface Sushi extends Food {
    salty: boolean
}

interface Cake extends Food {
    sweet: boolean
}
```

### 타입과 인터페이스의 차이점

1. 타입 별칭의 오른편에는 모든 타입(타입 표현식(타입, `&`, `|` 등 타입 연산자))이 등장할 수 있지만, 인스턴스의 오른편에는 반드시 형태가 나와야 한다.

예를 들어, 아래와 같은 코드를 인터페이스로 작성할 수 없다.

```typescript
type A = number
type B = A | string
```

2. 인터페이스를 상속할 때 타입스크립트는 상속받는 인터페이스의 타입에 상위 인터페이스를 할당할 수 있는지 확인한다.

3. 이름과 범위가 같은 인터페이스가 여러 개라면, 자동으로 합쳐진다. 타입 별칭은 이러한 경우 컴파일 에러가 발생한다.


<br />


### 선언 합침

> 선언 합침: 같은 이름으로 정의된 여러 저으이를 자동으로 합치는 타입스크립트의 기능

- 타입스크립트는 동일한 이름의 interface들을 자동으로 합친다

```typescript
interface User {
  name: string;
}

interface User {
  age: number;
}

const aUser: User = {
  name: "Tony",
  age: 30,
};
```

- 반면, 동일한 이름의 타입 별칭이 있으면 컴파일 에러가 발생한다

```typescript
type User = {   // 에러: 중복된 식별자 'User'
  name: string;
};

type User = {   // 에러: 중복된 식별자 'User'
  age: number;
};
```

### 인터페이스 구현

클래스 선언 시 `implements`라는 키워드 이용해 특정 인터페이스를 만족시킴을 표현할 수 있다.

```typescript
interface Animal {
	eat(food: string): void
  	sleep(hours: number): void
}

class Cat implements Animal {
	eat(food: string) {
    	console.log(`I ate ${food}`)
    }
  
  	sleep(hours: number) {
    	console.log(`I slept for ${hours} hours`)
    }
}
```

<br />

### 인터페이스 구현 vs. 추상 클래스 상속

인터페이스 구현과 추상 클래스 상속은 아주 비슷하지만, **인터페이스가 더 범용적으로 쓰이고 가볍다**

- 인터페이스
  - 형태를 정의하는 수단으로, 객체, 배열, 함수, 클래스, 인스턴스 모두 정의할 수 있다
  - 인터페이스는 자바스크립트 코드를 만들지 않으며, 컴파일 타임에만 존재한다

- 추상 클래스
  - 오직 클래스만 정의할 수 있다
  - 생성자, 프로퍼티, 메서드에 접근 한정자를 지정할 수 있다 (인터페이스에서는 제공 X)
  
<br />

## 5. 클래스는 구조 기반 타입을 지원한다

타입스크립트는 클래스를 비교할 때 **이름이 아니라 구조를 기준으로 삼는다**.

따라서 다음과 같이, `Zebra`와 `Poodle`은 이름이 달라도 그 안의 구조가 같기 때문에 서로 호환되며 정상 동작한다.

```typescript
class Zebra {
  trot() {
    //...
  }
}

class Poodle {
  trot() {
    //...
  }
}

function ambleAround(animal: Zebra) {
  animal.trot();
}

const zebra = new Zebra();
const poodle = new Poodle();

ambleAround(zebra); // OK
ambleAround(poodle); // OK
```

<br />

## 6. 클래스는 값과 타입을 모두 선언한다

타입스크립트의 거의 모든 것은 값 아니면 타입이다.

값과 타입은 타입스크립트에서 별도의 네임스페이스에 존재하여, 용어를 어떻게 사용하는지 보고 타입스크립트가 알아서 값 또는 타입으로 해석한다.

```typescript
let a = 100  		// 값
type a = number     // 타입

if(a + 1 > 3) ..    // 문맥 상 타입스크립트는 값 a로 추론함
let x: a = 3   		// 문맥 상 타입스크립트는 타입 a로 추론함
```

---

클래스와 열거형의 경우, 타입/값 네임스페이스에 타입과 값을 동시에 생성한다.

```typescript
class C {}
const c: C = new C(); // C(class)는 타입이면서 동시에 값(생성자 함수)이다

const Week = { Monday: 1 };
const day: Week = Week.Monday; // Week(enum)은 타입이면서 동시에 값(enum)이다
```

<br />

## 7. 다형성

클래스와 인터페이스에서도 제네릭을 사용할 수 있다.

```typescript
class MyMap<K, V> {   // 제네릭 타입의 범위로 클래스, 인터페이스 전체 가능
  constructor(initialKey: K, initialValue: V) {  // constructor에는 제네릭 타입 선언 불가
    // ...
  }
  get(key: K): V {    // 제네릭 타입의 범위로 인스턴스 메서드 가능
    // ...
  }
  set(key: K, value: V): void {
    // ...
  }
  // ...
}
```

<br />

## 10. final 클래스 흉내내기

> final: 클래스나 메서드를 확장하거나 오버라이드할 수 없게 만드는 기능

타입스크립트는 `final` 키워드를 지원하지 않지만, 비공개 생성자 `private`으로 `final` 클래스를 흉내낼 수 있다.

```typescript
class MessageQueue {
	private constructor(private messages: string[]) { }
}
```

생성자를 private으로 선언하면 new로 인스턴스를 생성하거나 클래스를 확장할 수 없게 된다.

---

상속만 막고, 인스턴스는 생성할 수 있게 하려면, `static create` 메서드를 만들어주면 된다.

```typescript
class MessageQueue {
    private constructor(private messages: string[]) {}
    static create(messages: string[]) {
      return new MessageQueue(messages)
    };
}
```

<br />

## 11. 디자인 패턴

### 팩토리 패턴

어떤 객체를 만들지를 전적으로 팩토리에 위임한다.

```typescript
// Shoe 타입과 세 종류의 신발을 구현한다
type Shoe = {
  purpose: string;
};

class BalletFlat implements Shoe {
  purpose = "dancing";
}

class Boot implements Shoe {
  purpose = "woodcutting";
}

class Sneaker implements Shoe {
  purpose = "walking";
}

// 신발 팩토리
const Shoe = {
  create(type: "balletFlat" | "boot" | "sneaker"): Shoe {
    switch (type) {
      case "balletFlat":    return new BalletFlat();
      case "boot":    return new Boot();
      case "sneaker":   return new Sneaker();
    }
  },
};
```

팩토리 패턴에서 호출자는 팩토리가 특정 인터페이스를 만족하는 클래스를 제공할 것이라는 사실만 알 뿐, 어떤 구체 클래스가 이 일을 하는지 알 수 없어야 한다. (추상화 기능)

<br />

### 빌더 패턴

객체의 생성과 객체 구현 방식을 분리할 수 있는 디자인 패턴이다.

```typescript
new RequestBuilder()
  .setURL("/users")
  .setMethod("get")
  .setData({ firstName: "Tony" })
  .send();
```

```typescript
class RequestBuilder {
	private url: string | null = null
  
  	setURL(url: string): this {   // 반환타입이 this
    	this.url = url
      	return this
    }

	setData(date: object):this {  // 반환타입이 this
    	this.data = data
      	return this
    }
}
```
