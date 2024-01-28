## 3장 공부 정리한 블로그 링크

[블로그 링크](https://velog.io/@sujinjwa/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-3%EC%9E%A5.-%ED%83%80%EC%9E%85%EC%9D%98-%EB%AA%A8%EB%93%A0-%EA%B2%83)

<br />

## 3장. 타입의 모든 것

### 3.1 타입 명시 예시

다음과 같이 타입스크립트는 특정 타입만 와야 할 때 이를 명시할 수 있다.

```typescript
function squareOf(n: number) {
	return n * n;
}

squareOf(2);     // 4로 평가
squareOf('z');   // 에러. 'z' 타입의 인수는 'number' 타입의 매개변수에 할당 불가
```

<br />

### 3.2 타입 종류

#### 3.2.1 any

- 프로그래머와 타입스크립트 둘 다 타입을 알 수 없을 때 사용되는 기본 타입
- 꼭 필요한 상황이 아니면 사용하지 않는 것이 좋다

> `any`에 대해 예외를 일으키고 싶다면 `tsconfig.json` 파일에서 `noImplicitAny` 플래그를 활성해주면 된다. (거의 필수로 간주됨)

```typescript
{
 "compilerOptions": {
   "noImplicitAny": true,
 }
}
```

<br />

#### 3.2.2 unknown

- `any`처럼 모든 타입의 값을 가질 수 있다(그래서 타입알 수 없을 때 사용됨).
- 그러나 `any`와 달리, `unknown` 타입을 검사해 refine하기 전까지는 타입스크립트가 `unknown`타입의 값을 사용할 수 없다.
- 타입을 미리 알 수 없는 어떤 값에 `any` 대신 `unknown` 사용하자!

- 예)
```typescript
let a: unknown = 30;   // 타입스크립트가 특정 값의 타입을 unknown으로 추론하는 경우 X.
// 개발자가 unknown 타입 쓰고 싶을 때 명시적으로 설정

let b = a === 300;     // unknown 타입이 아닌 값과 unknown 타입인 값 비교 가능!
let c = a + 10;        // unknown 값이 특정 타입이라고 가정하고 동작 수행하는 것은 불가능!

if(typeof a === 'number') {  // unknown 타입이 특정 타입임을 증명한 뒤에 동작 수행 가능!
	let d = a + 10;
}
```

<br />

#### 3.2.3 boolean

- `true`(참), `false`(거짓) 두 개의 값 가진다.

> 타입 리터럴: 오직 하나의 값을 나타내는 타입

- 예) 아래의 변수 `e`는 boolean 타입의 값 중 특정한 하나의 값(`true`)로 한정된다.
```typescript
let e: true = true;
```

<br />

#### 3.2.4 number

- 모든 숫자(정수, 소수, 양수, 음수, Infinity, NaN 등)의 집합
- `number` 타입임을 명시해야 하는 상황은 거의 없다.

> 숫자 분리자: 긴 숫자를 읽기 쉽게 만들 때 사용

- 예) 아래의 `1_000_000`은 `1000000`과 같다.
```typescript
let oneMillion = 1_000_000;
```

<br />

#### 3.2.5 bigint

> [bigint MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/BigInt)

- 자바스크립트와 타입스크립트에 새로 추가된 타입
- 라운딩 에러 없이 큰 정수 처리 가능하다. (`number`는 `2^53`까지의 정수 표현 가능하지만 `bigint`는 더 큰 정수 처리 가능)
- `bigint` 선언 방법은 다양하지만, 대체로 타입스크립트가 `bigint` 타입을 추론하게 만들자.

```typescript
let a = 1000n;  		// bigint
let b: bigint = 100n;   // bigint
let c: bigint = 100;	// 에러: 100 타입은 'bigint' 타입에 할당 불가능
```

<br />

#### 3.2.6 string

- 모든 문자열의 집합
- `string` 타입도 마찬가지로 타입스크립트가 타입을 추론하도록 두는 것이 좋다.

```typescript
let a = 'hello';   // string
const c = 'hi';    // 'hi'
```

<br />

#### 3.2.7 symbol

- 자바스크립트에서 `symbol`은 고유함을 보장하는 심볼 값을 반환하는 내장 객체
- 실무에선 잘 사용되지 않는다.


```typescript
let a = Symbol('a');   // symbol 타입으로 추론
let b = Symbol('a');   // symbol 타입으로 추론

let c = a === b;       // a와 b 모두 고유한 심볼이므로 c는 언제나 false
```

<br />

#### 3.2.8 객체

- 보통 객체가 어떤 필드 포함할 수 있는지 알고 있을 때 `객체 리터럴 표기법` 사용
- `객체 리터럴 문법` = 객체를 `object`로 선언하지 않고, 타입스크립트가 타입을 추론하도록 하거나, 아래와 같이 중괄호(`{}`) 안에서 명시적으로 타입을 묘사하는 방법.

```typescript
let a: { b: number } = {
	b: 12
  	// { b: number }
}
```

> 객체를 `const`로 선언해도 더 좁은 타입으로 추론하지 않는다

- 예) `const`로 선언된 자바스크립트 객체의 값은 바뀔 수 있기 때문에, 아래의 객체 `a`의 필드 `b`도 타입이 `12`가 아니라 `number`로 추론된다.

```typescript
const a: { b: number } = {
	b: 12
  	// a가 const로 선언되어도 여전히 { b: number }
}
```

<br />

> <b>선택적 프로퍼티 설정 방법</b>

```typescript
let a: {
	b: number,                // a는 number 타입의 프로퍼티 b 포함
  	c?: string,				  // a는 string 타입의 프로퍼티 c를 포함할 수도 있다
  	[key: number]: boolean	  // a는 boolean 타입의 값 갖는 number 타입의 프로퍼티를 여러개 포함할 수 있다
};
```

위 `a`에 할당할 수 있는 객체 타입은 다음과 같다.

```typescript
a = {b: 1};
a = {b: 1, c: 'd'};
a = {b: 1, 10: true};
a = {b: 1, 10: true, 20: false};
a = {19: true};   		 // 에러: 'b' 프로퍼티 없음
a = {b: 1, 33: 'red'};   // 에러: 'string' 타입은 'boolean' 타입에 할당 불가
```

<br />

> <b>인덱스 시그니처</b>
- `[key: T]: U` 같은 문법을 의미
- "이 객체에서 모든 `T` 타입의 키는 `U` 타입의 값을 갖는다"고 해석
- 어떤 객체가 여러 키를 가질 수 있음을 알려준다.


<br />

> <b>읽기 전용 프로퍼티</b>
- `readonly` 한정자 이용하여 특정 필드를 읽기 전용으로 정의

```typescript
let user: {
	readonly firstName: string,
} = {
	firstName: 'sujin',
}

user.firstName = 'josujin';   // 에러: 'firstName'은 읽기 전용 프로퍼티라 할당 불가능
```

<br />

#### 3.2.9 타입 별칭, 유니온, 인터섹션

1. <b>타입별칭</b>
변수를 선언해서 값 대신 변수로 칭하듯, 타입 별칭으로 타입을 가리킬 수 있다.

- 예) 

```typescript
type Age = number;
type Person = {
	name: string,
  	age: Age,
};

let driver: Person = {
	name: 'Sujin Jo',
  	age: 50,
};
```

변수와 마찬가지로, 하나의 타입을 두 번 정의할 수는 없다.

```typescript
type Color = 'red';
type Color = 'blue';  // 에러: 'Color' 식별자 중복 정의함.
```

<br />

2. <b>유니온과 인터섹션</b>
- 유니온: 합집합(union)
- 인터섹션: 교집합(intersection)

> 실전에서는 인터섹션보다 <b>유니언을 자주 사용</b>한다.

- 예) 다음 함수는 `string` 또는 `null` 타입의 값을 반환한다.

```typescript
function trueOrNull(isTrue: boolean) {
	if(isTrue) {
    	return 'true';
    }
  	return null;
}
```

함수가 반환하는 값의 타입을 다음과 같이 `유니온`으로 표현할 수 있다.

```typescript
type Returns = string | null;
```

<br />

#### 3.2.10 배열

- 배열은 초기화될 때 타입이 추론된다.

```typescript
let a = [1, 2, 3];   // number[] 로 추론
let b = ['a', 'b'];  // string[] 으로 추론
let c = ['d', 1];    // (string | number)[] 로 추론
```

- 초기화될 때 추론된 타입 이외의 타입을 배열에 추가하려고 하면 에러가 발생한다.

```typescript
let d = ['red'];   // string[] 으로 추론
d.push('blue');
d.push(true);      // 에러: 'true' 타입 인수를 'number' 타입 매개변수에 할당 불가능
```

- 빈 배열로 초기화하면, 타입스크립트는 배열의 요소 타입을 알 수 없으므로 `any`로 추론한다.

```typescript
let a = [];   // any[] 로 추론
a.push(1);    // number[] 로 추론
a.push('x');  // (string | number)[] 로 추론
```

<br />

#### 3.2.11 튜플

- <b>길이가 고정</b>되어 있으며, <b>각 인덱스의 타입이 알려진</b> 배열의 일종 (순수 배열에 비해 안전성 높일 수 있음)
- <b>튜플은 선언될 때 타입을 명시해야 한다.</b>

```typescript
let b: [string, string, number] = ['melon', 'watermelon', 2000];

b = ['melon', 'watermelon', 'apple'];   // 에러: 'string'은 'number' 타입에 할당 불가능
```

- 배열과 같이 `?`로 선택형 요소 지원한다.

```typescript
let trainFares: [number, number?][] = [
	[3.75],
  	[8.25, 7.70],
  	[10.50]
];
```

- 최소 길이를 지정할 때는 나머지 요소(`...`)를 사용한다.

```typescript
// 최소 한 개의 요소를 갖는 string 배열
let friends: [string, ...string[]] = ['Hyerin', 'Taehyung', 'Soeun'];

// 이형 배열
let list: [number, boolean, ...string[]] = [1, false, 'a', 'b', 'c'];
```

<br />

> <b>읽기 전용 배열과 튜플</b>

일반 배열은 가변(`push`, `splice` 등의 작업 자유롭게 수행 가능)적이지만, 불변한 배열을 만들고 싶다면 어떻게 해야할까?
타입스크립트에서는 `readonly 배열 타입`을 지원한다.

```typescript
let as: readonly number[] = [1, 2, 3];   // radonly number[]

as[2] = 5;   // 'readonly number[]'의 인덱스 시그니처 타입은 읽기만 허용된다
```

<br />

#### 3.2.12 null, undefined, void, never

- `undefined` : 아직 값을 변수에 할당하지 않았음

```typescript
function b() {
	return undefined;
}
```

- `null` : 값이 없음

```typescript
function b(x: number) {
	if(x < 10) {
    	return x;
    }
  	return null;
}
```

- `void` : 명시적으로 아무것도 반환하지 않는 함수(return문을 포함하지 않는)의 반환 타입

```typescript
function b() {
	while (true) {
    	doSomething();
    }
}
```

```typescript
function b() {
	throw TypeError('I always throw error');
}
```

- `never` : 절대 반환하지 않는(예외를 던지거나 영원히 실행되는) 함수 타입

```typescript
function b() {
	let a = 2 + 2;
  	let b = a * a;
}
```

<br />

#### 3.2.13 열거형(enum)

- **해당 타입으로 사용할 수 있는 값을 열거**하는 기법
- 순서가 없는 자료구조

> 열거형의 이름은 <b>단수명사</b>로 쓰고, <b>첫 문자는 대문자</b>로 하는 것이 관례이다. <b>키도 앞 글자는 대문자</b>로 표시한다.

- 예)

```typescript
enum Language {
	English,
  	Spanish,
  	Russian,
};
```

- 열거형의 각 멤버에 적절한 숫자를 명시적으로 설정할 수 있다.
- 모든 값을 정의할 필요는 없다. (정의되지 않은 값은 타입스크립트가 추론함)
- <b>각 열거형 멤버에 명시적으로 값을 할당하는 습관을 들이는 것이 좋다.</b>
- 그러나 열거형을 안전하게 사용하는 방법은 까다로우므로 열거형 자체를 멀리할 것을 권한다.

```typescript
enum Language {
	English = 0,
  	Spanish = 1,
  	Russian,          // 타입스크립트가 1 다음 숫자인 2로 추론
};

let a = Language.Spanish;   // a = 0;
let b = Language.Spanish;   // b = 1;
```

- 열거형에 문자열 값을 사용하거나, 문자열과 숫자 값을 혼합할 수 있다.

```typescript
enum Color {
	Red = '#c10000',
  	Blue = '#007ac1',
  	Pink = 0xc10050,
  	White = 255,
};

let red = Color.Red;
let pink = Color.Pink;
```

<br />

> `const enum` 사용 방법

- 예

```typescript
const enum Flippable {
  Burger = 'Burger',
  Chair = 'Chair',
  Cup = 'Cup',
}

function flip(f: Flippable) {
  return 'flipped it';
}

flip(Flippable.Burger);   // 'flipped it'
flip(Flippable.Chair);    // 'flipped it'
flip(12);				  // 에러: 12는 'Flippable' 매개변수 타입에 할당 불가능
```

