# 블로그 링크

[4장 정리한 블로그 링크](https://velog.io/@sujinjwa/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-4%EC%9E%A5.-%ED%95%A8%EC%88%98)

블로그에서 보는 것이 더 가독성이 좋습니다!

# 4장. 함수

## 1. 함수 선언과 호출

> 보통 **매개변수 타입은 필수 어노테이션**, **반환 타입은 선택형 어노테이션**에  적용한다

- 예

```typescript
function add(a: number, b: number): number {
	return a + b;
}
```

위의 예시와 같이, 보통 함수 매개변수(`a`, `b`)의 타입은 명시적으로 정의한다. (자동 추론이 되지 않기 때문에)

반환 타입은 자동으로 추론되며, 원하면 명시할 수 있다.

---

> 함수 호출할 때 타입 정보를 제공할 필요 없다

- 예

```typescript
add(1, 2)
```

<br />

### 1.1 선택적 매개변수와 기본 매개변수

> 함수 매개변수 선언 시 필수 매개변수를 먼저 지정, 선택적 매개변수(`?`)를 뒤에 추가한다

- 예) 아래 예시에서 `userId?`

```typescript
function log(message: string, userId?: string) {
	...
}
```
---

> 매개변수에 기본값 지정할 수 있다

- 예) 아래 예시에서 `userId`

```typescript
function log(message: string, userId = 'Not signed in') {
	...
}
```
보통 실무에서는 선택적 매개변수보다 기본 매개변수를 더 자주 사용한다고 한다.

<br />

### 1.2 나머지 매개변수

 나머지 매개변수(`...`, rest parameters)로 여러 개의 인자들을 안전하게 받을 수 있다.

```typescript
function sumVar(...numbers: number[]): number {
  return Array.from(arguments).reduce((total, n) => total + n, 0);
}

sumVar(1, 2, 3);
```

<br />

### 1.3 call, apply, bind

함수를 호출하는 방법으로, 괄호 `()`를 이용하는 방법 이외에 다음과 같은 방법이 있다.

```typescript
function add(a: number, b: number): number {
	return a + b
}

add(10, 20)					// 30으로 평가
add.apply(null, [10, 20])   // 30으로 평가 (함수 안에서 this를 null로 한정, 인수 펼쳐 함수에 매개변수로 전달)
add.call(null, 10, 20)		// 30으로 평가 (함수 안에서 this를 null로 한정, 인수 펼치지 않고 순서대로 전달)
add.bind(null, 10, 20)()	// 30으로 평가 (함수 안에서 this를 null로 한정, 함수 호출하지 않고 새로운 함수 반환)
```

<br />

### 1.4 this의 타입

> `this` 변수는 클래스에 속한 메서드 뿐만 아니라 모든 함수에서 정의된다.
**`this`의 값은 함수를 어떻게 호출했는지에 따라 달라져** 코드를 이해하기 어렵게 하므로,
많은 개발팀은 클래스 메서드를 제외한 다른 모든 곳에서 `this` 사용을 금지한다.

다행히도 타입스크립트에서는 함수에서 `this` 사용할 때, 기대하는 `this` 타입을 함수의 첫 번째 매개변수로 선언하면,

모든 `this`가 개발자가 의도한 `this`가 됨을 타입스크립트가 보장해준다.

```typescript
function fancyDate(this: Date) {  // -> this의 타입이 Date 임을 보장해줌
	return ${ this.getDate() } / ${ this.getMonth() } / ${ this.getFullYear() }
}

fullDate.call(new Date)	  // "01/10/2024" 으로 평가
fancyDate()				  // 에러: void 타입의 this를 Date 타입의 this에 할당 불가
```

<br />

### 1.5 제너레이터 함수

타입스크립트에서도 제너레이터를 지원한다.

아래 예시처럼 `IterableIterator`에서 방출하는 타입을 감싸서 제너레이터의 타입을 명시할 수 있다.

```typescript
function* createNumbers(): IterableIterator<number> {
	let n =0
    while (1) {
    	yield n++
    }
}

let numbers = createNumbers()
numbers.next()  // {value: 0, done: false}로 평가
numbers.next()  // {value: 1, done: false}로 평가
numbers.next()  // {value: 2, done: false}로 평가
```

<br />

### 1.6 반복자

> 반복자(`iterator`): next라는 메서드(value, done 두 프로퍼티 가진 객체를 반환)를 정의한 객체

Symbol.iterator와 next를 구현하는 객체를 만들어 반복자나 이터러블을 직접 정의할 수 있다. 

```typescript
let numbers = {
  *[Symbol.iterator]() {
    for (let n = 1; n <= 10; n++) {
      yield n;
    }
  },
};
```

<br />

### 1.7 호출 시그니처

>호출 시그니처: 함수의 타입을 표현하는 방법

 - 예)
 
```typescript
type Sum = (a: number, b: number) => number;

function sum(a: number, b: number) {
  return a + b;
}
```

---

>참고) 
- 타입 수준 코드 : 타입과 타입 연산자를 포함하는 코드
- 값 수준 코드 : 타입 수준 코드 외의 모든 코드

- 예) 아래 코드에서 `: number`나 `: number | null` 같은 타입을 의미하는 코드는 타입 수준 코드이고, 나머지는 모두 값 수준 코드이다
```typescript
function area(radius: number): number | null {
	if (radius < 0) {
    	return null;
    }
  
  	return Math.PI * (radius ** 2);
}

let r: number = 3;
```

<br />

### 1.8 문맥적 타입화

> 문맥적 타입화 = 타입스크립트의 강력한 타입 추론 기능

```typescript
type Log = (message: string, userId?: string) => void

let log: Log = (
	messsage,  // log의 타입을 Log로 지정했으므로 message의 타입을 string으로 추론 가능
  	userId = 'Not signed in'
) => {
	let time = new Date().toISOString()
    console.log(time, message, userId)
}
```

<br />

### 1.9 오버로드된 함수 타입

```typescript
// 단축형 호출 시그니처
type Log = (message: string, userId?: string) => void;

// 전체 호출 시그니처
type Log = {
  (message: string, userId?: string): void;
};
```

간단한 함수는 단축형을 사용하고 복잡한 함수라면 전체 시그니처를 사용하는 것이 좋을 때도 있다.

> 오버로드된 함수: 호출 시그니처가 여러 개인 함수 (전체 호출 시그니처 사용)

- 예) `Reserve`라는 하나의 API로 왕복과 편도 예약 2가지를 모두 지원할 수 있다

```typescript
// 휴가 예약 API
type Reserve = {
	(from: Date, to: Date, destination: string): Reservation    // 왕복 예약
  	(from: Date, destination: string): Reservation              // 편도 예약
}
```

<br />

## 2. 다형성

하나의 객체가 여러 타입을 가질 수 있는 것으로, 오버로딩보다 제네릭을 쓰는 것이 좋다.

> 제네릭 타입 매개변수(보통 `제네릭`으로 불림): 지금은 알 수 없는 타입을 호출 시에 추론하는 것
- 꺾쇠괄호(`<>`)로 제네릭 타입 매개변수임을 선언할 수 있다.

- 예)

```typescript
type Filter = {
  	// T는 플레이스 홀더 타입, 제네릭 타입 매개변수라고 부른다.
	<T>(array: T[], f: (item: T) => boolean): T[]
}

let filter: Filter = (
  array,
  f // ...
) => filter([1, 2, 3], (_) => _ > 2); // T는 number

let filter: Filter = (
  array,
  f // ...
) => filter(['a', 'b'], (_) => _ !== 'b'); // T는 string
```

<br />

### 2.1 언제 제네릭 타입이 한정되는가?

보통 타입스크립트는 제네릭 타입을 사용하는 순간에 타입을 한정한다.

- 함수 : 함수를 호출할 때

- 클래스 : 클래스를 인스턴스화할 때

<br />

### 2.3 제네릭 타입 추론

대부분의 상황에서 타입스크립트는 제네릭 타입을 잘 추론한다.

- 예) 아래 map 함수를 호출하면 타입스크립트는 `T`를 `string`으로, `U`는 `boolean`으로 추론한다.

```typescript
function map<T, U>(array: T[], f: (item: T) => U): U[] {
	// ...
}

map(['a', 'b', 'c'], _ => _ === 'a')
```

<br />

### 2.4 제네릭 타입 별칭

타입 별칭에서는 타입 별칭명과 할당 기호(`=`) 사이에서만 제네릭 타입을 선언할 수 있다.

```typescript
type MyEvent<T> = {
  target: T;
  type: string;
};

type TimedEvent<T> = {
  event: MyEvent<T>;
  from: Date;
  to: Date;
};
```

<br />

### 2.5 한정된 다형성

```typescript
// 일반 TreeNode(이진트리)
type TreeNode = {
  value: string;
};


// 자식을 갖지 않는 TreeNode인 LeafNode
type LeafNode = TreeNode & {
  isLeaf: true;
};

// 자식을 갖는 TreeNode인 InnerNode
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode];
};

function mapNode<T extends TreeNode>(node: T, f: (value: string) => string): T {
  return {
    ...node,
    value: f(node.value),
  };
}
```

- `TreeNode` : `value`라는 한 개의 프로퍼티만 갖는 객체

- `LeafNode` : `TreeNode`의 모든 프로퍼티 포함, 값이 항상 `true`인 `isLeaf` 프로퍼티도 포함

- `InnerNode` : `TreeNode`의 모든 프로퍼티 포함, 한 개나 두 개의 자식 포함할 수 있는 `children` 프로퍼티도 포함

위 코드에서 `extends TreeNode`를 생략하고 `T`타입이라고만 명시하면,

T타입에 대한 상한 경계가 없어 `node.value`를 읽는 행위가 안전하지 않기 때문에 에러가 발생한다.

이렇게 `T extends TreeNode`라고 표현함으로써 매핑한 이후에도 입력 노드가 특정 타입이라는 정보를 보존할 수 있다.

<br />

### 2.6 제네릭 타입 기본값

특정 요소 타입을 알 수 없을 때를 대비해 `MyEvent`의 제네릭 타입에 기본값을 추가할 수 있다.

```typescript
type MyEvent<T = HTMLElement> = {
	target: T,
  	type: string
}
```

아래와 같이 `T`가 HTML 요소로 한정되도록 T의 경계를 추가할 수 있다.

```typescript
type MyEvent<T extends HTMLElement = HTMLElement> = {
  target: T;
  type: string;
};
```

<br />

## 3. 타입 주도 개발

> 타입 주도 개발: 타입 시그니처를 먼저 정하고 값을 나중에 채우는 프로그래밍 방식

타입스크립트 프로그램 구현할 때는 먼저 **함수의 타입 시그니처를 정의**한 다음, 구현을 추가한다.

함수 타입 시그니처를 통해 함수에 관한 거의 모든 정보를 알 수 있다.

- 예) map 함수는 `T` 배열, `T`를 `U`로 매핑하는 함수를 인수로 받아 `U` 배열 반환

```typescript
function map<T, U>(array: T[], f: (item: T) => U): U[] {
	// ...
}
```
