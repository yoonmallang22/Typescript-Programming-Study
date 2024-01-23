## 블로그 링크

[블로그 링크](https://velog.io/@sujinjwa/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-6%EC%9E%A5.-%EA%B3%A0%EA%B8%89-%ED%83%80%EC%9E%85)


<br />

# 6장. 고급 타입

<br />

## 타입 간의 관계

### 서브타입과 슈퍼타입

> **서브타입** : 두 개의 타입 A와 B가 있고 B가 A의 서브타입이면 A가 필요한 곳에는 어디든 B를 안전하게 사용할 수 있다

- 예
  - `배열`은 `객체`의 서브타입이다 = `객체`를 사용해야 하는 곳에 `배열`도 사용할 수 있다
  - `튜플`은 `배열`의 서브타입이다 = `배열`을 사용해야 하는 곳에 `튜플`도 사용할 수 있다
  - 모든 것은 `any`의 서브타입이다 = `any`를 사용해야 하는 곳에 `객체`도 사용할 수 있다
  - `never`는 모든 것의 서브타입이다 = 어디에나 `never`를 사용할 수 있다
  - `Animal`을 상속받는 `Bird` 클래스가 있다면 `Bird`는 `Animal`의 서브타입이다 = `Animal`을 사용해야 하는 곳에 `Bird`도 사용할 수 있다

---

> **슈퍼타입** : 두 개의 타입 A와 B가 있고 B가 A의 슈퍼타입이면 B가 필요한 곳에는 어디든 A를 안전하게 사용할 수 있다

- 예
  - `객체`는 `배열`의 슈퍼타입이다
  - `배열`은 `튜플`의 슈퍼타입이다
  - `any`는 모든 것의 슈퍼타입이다
  - `never`는 누구의 슈퍼타입도 아니다
  - `Animal`은 `Bird`의 슈퍼타입이다

<br />

### 타입 넓히기

- `let` 이나 `var` 로 **값을 바꿀 수 있는 변수** 선언 시, 그 변수의 타입은 리터럴 값이 속한 기본 타입이 된다.

```typescript
let a = 'x'       // string 타입
let b = 3         // number 타입
var c = true      // boolean 타입
const d = {x: 3}  // {x: number} 타입

enum E {X, Y, Z}
let e = E.X       // E 타입
```

- `const`로 **값을 바꿀 수 없는 변수** 선언 시, 리터럴 타입으로 추론된다.

```typescript
const a = 'x'   // 'x' 타입
const b = 3     // 3 타입
const c = true  // true 타입

enum E {X, Y, Z}
const e = E.X   // E.X 타입
```

- `let` 이나 `var` 로 변수를 선언하더라도, 타입을 명시하면 리터럴 타입으로 추론된다.

```typescript
let a: 'x' = 'x'    	  // 'x' 타입
let b: 3 = 3        	  // 3 타입
const d: {x: 3} = {x: 3}  // {x: 3} 타입
```

<br />

> `let` 이나 `var` 로 선언한 변수에 ***값을 다시 할당***하면, 타입스크립트는 ***새로운 값에 맞게 변수의 타입을 넓힌다***

```typescript
const a = 'x'
let b = a            // 'x'가 아닌 string 타입으로 추론 (타입 자동 확장)

const c: 'x' = 'x'
let d = c            // 타입 어노테이션이 추가된 경우엔 자동 확장 일어나지 않음
```

> `null` 이나 `undefined` 로 초기화된 변수는 `any` 타입으로 넓혀진다

```typescript
let a = null    // any 타입
a = 3           // any 타입
a = 'b'         // any 타입
```

> 변수가 ***선언 범위 벗어나면 타입스크립트는 확실한(좁은) 타입을 할당한다***

```typescript
function func() {
	let a = null  // any
    a = 3		  // any
  	a = 'b'		  // any
  
 	return a
}

func()   // 함수 밖에서는 string 타입으로 추론
```

<br />

---

#### as const

> 변수가 좁은 타입으로 추론되길 원한다면 `as const`를 이용한다. `as const`로 선언하면 그 변수는 **타입 넓히기가 중지되며 자동으로 `readonly`가 된다**.

```typescript
let a = {x: 3}  	 			  // {x: number} (넓은 타입으로 추론)
let a = {x: 3} as const	    	  // {readonly x: 3} (타입 넓히기 중지, readonly 설정)

const b = [1, {x: 2}]     		  // (number | {x: number})[]
const e = [1, {x: 2}] as const    // readonly [1, {readonly x: 2}]
```

<br />

## 고급 객체 타입

### 객체 타입의 타입 연산자

> **키인 연산자** : 모든 형태(객체, 클래스 생성자, 클래스 인스턴스)와 배열에 사용될 수 있는 방법으로, 객체에서 값을 찾는 것처럼 **형태에서 타입을 찾을 수 있는 방법**이다

다음과 같이 어떤 소셜 미디어의 API에서 받은 API 응답을 모델링하는 중첩 타입이 있다고 가정하자.

```typescript
type APIResponse = {
	user: {
    	userId: string
        friendList: {
        	count: number
          	friends: {
            	firstName: string
              	lastName: string
            }
        }
    }
}
```

이 API에서 응답을 받아와 `friendList`들을 보여줘야 할 때, `friendList`는 어떤 타입이어야 할까?

1. `unknown` 타입으로 설정

```typescript
function getAPIResponse(): Promise<APIResponse> {
	// ...
}

function renderFriendList(friendList: unknown) { // ⬅️ unknown으로 처리
	// ...
}

let response = await getAPIResponse()
renderFriendList(response.user.friendList)
```

2. `friendList`의 타입을 따로 정의해줌 (귀찮은 방법)

```typescript
type FriendList = {
	count: number
  	friends: {
    	firName: string
      	lastName: string
    }
}

type APIResponse = {
	user: {
    	userId: string
      	friendList: FriendList
    }
}

function renderFriendList(friendList: FriendList) {  // ⬅️ 새로 정의한 FriendList 타입으로 처리
	// ...
}
```

3. 응답 타입에 키인(`key in`)

```typescript
type APIResponse = {
	user: {
    	userId: string
        friendList: {
        	count: number
          	friends: {
            	firstName: string
              	lastName: string
            }
        }
    }
}

type FriendList = APIResponse['user']['friendList']  // ⬅️ APIResponse 타입에 key in 해주어 새로운 FriendList 타입을 간단하게 만들어줌

function renderFriendList(friendList: FriendList) {  // ⬅️ 새로 정의한 FriendList 타입으로 처리
	// ...
}
```

> 주의) 키인으로 프로퍼티 타입을 찾을 때 **점이 아니라 대괄호 표기법을 사용한다**

<br />

---

> **keyof 연산자** : 객체의 모든 키를 문자열 리터럴 타입 유니온으로 사용 가능

```typescript
type APIResponse = {
	user: {
    	userId: string
        friendList: {
        	count: number
          	friends: {
            	firstName: string
              	lastName: string
            }
        }
    }
}

type ResponseKeys = keyof APIResponse    							// 'user' 타입
type UserKeys = keyof APIResponse['user']							// 'userId' | 'friendList' 타입
type of FriendListKeys = keyof APIResponse['user']['friendList']	// 'count'  | 'friends' 타입
```

<br />

`keyof`는 객체의 모든 키를 문자열 리터럴 타입의 유니온으로 표현한다.

- 예

```typescript
let o = {
	a: number,
  	b: string,
  	c: boolean
}

keyof o  		// 'a' | 'b' | 'c' 타입
```

---

`키인` 과 `keyof` 연산자를 혼합해 사용하면

객체에서 주어진 `키`에 해당하는 `값`을 반환하는 `게터`를 타입 안전한 방식으로 구현할 수 있다.

```typescript
function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
	return o[k]
}
```

- 위의 함수 `get`은 객체 `o`와 키 `k`를 인수로 받는 함수
- 제너럴 안의 `keyof O`는 문자열 리터럴 타입의 유니온으로 ***객체 `o`의 모든 키***를 표현
- `O[K]`는 `O`에서 `K`를 찾을 때 얻는 타입. 만약 `o`가 `{ a: number, b: string, c: boolean }`일 때 `K`가 `'a'`라면 `get`함수는 `number`를 반환하고, `K`가 `'b' | 'c'`라면 `get`함수는 `string | boolean`을 반환한다.

<br />

> **Record 타입** : 객체가 특정 키 집합을 정의하도록 강제하는 방법

한 주의 각 요일을 다음 요일로 매핑하도록 만든다고 하자.

**`Record`를 이용해 아래 변수 `nextDay` 의 키와 값에 제한을 추가**할 수 있다.

```typescript
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
type Day = Weekday | 'Sat' | 'Sun'

let nextDay: Record<Weekday, Day> = {
	Mon: 'Tue'   // 💢 에러! Record<Weekday, Day> 타입 중 Tue, Wed, Thu, Fri가 빠져 있음
}
```

🔽 에러 없으려면, 모든 `Weekday`를 `key`로 설정해줘야 함

```typescript
let nextDay: Record<Weekday, Day> = {
  Mon: 'Tue',
  Tue: 'Wed',
  Wed: 'Thu',
  Thu: 'Fri',
  Fri: 'Sat',
};
```
