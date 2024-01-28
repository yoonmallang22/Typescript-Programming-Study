# 7장. 에러 처리

타입스크립트에서 에러를 표현하고 처리하는 가장 일반적인 패턴 4가지

- null 변환

- 예외 던지기

- 예외 반환

- Option 타입

## 1. null 변환

```typescript
function ask() {
  return prompt('When is your birthday?');
}

// 사용자가 입력한 날짜인 `birthday`가 유효하면 Date 반환, 그렇지 않으면 null 반환
function parse(birthday: string): Date | null {
  let date = new Date(birthday);
  if (!isValid(date)) {
    return null; // ⬅️
  }
  return date;
}

// 입력한 날짜 date가 유효한지 확인
function isValid(date: Date) {
  return (
    Object.prototype.toString.call(date) === '[object Date]' &&
    !Number.isNaN(date.getTime())
  );
}

let date = parse(ask()); // ask 에서 에러 남 (?)
if (date) {
  console.info('Date is', date.toISOString());
} else {
  console.error('Error parsing date for some reason');
}
```

위와 같이 잘못된 입력의 경우(에러 발생의 경우) `null`을 반환해주는 방법이 있다.

그러나 에러 발생 시 `null`을 반환해주는 방식은, **문제가 발생한 원인을 알 수 없다**는 단점이 있다.

결국 개발자는 문제 원인을 알기 위해 디버깅을 하며 로그를 일일이 확인해야 하고,

`YYYY/MM/DD 형식으로 날짜를 입력하세요` 같은 자세한 오류 메시지가 아닌, `알 수 없는 오류가 	발생했습니다` 같은 모호한 에러 메시지를 보낼 수 밖에 없다.

<BR />

## 2. 예외 던지기

문제가 발생하면 `null` 반환 대신 **예외를 던지자**.

**어떤 무넺냐에 따라 대처가 가능할 수 있고, 디버깅에 도움되는 메타데이터도 얻을 수 있다**.

```typescript
function parse(birthday: string): Date {
  let date = new Date(birthday);
  if (!isValid(date)) {
    throw new RangeError('YYYY/MM/DD 형식으로 날짜를 입력하세요');  // ⬅️ 예외 던지기
  }
  return date;
}

try {
    let date = parse(ask());
    console.info('Date is', date.toISOString());
} catch(e) {
    console.error(e.message);   //  ⬅️ 예외 발생 시 오류 처리
}
```

다른 에러가 발생했을 때 무시하지 않도록, 처리하지 않은 에러는 아래 예시처럼 다시 던져주는 것이 좋다.

```typescript
try {
    let date = parse(ask());
    console.info('Date is', date.toISOString());
} catch(e) {
  	if (e instanceof RangeError) {
    	console.error(e.message);   //  ⬅️ 예외 발생 시 오류 처리
    } else {
    	throw e   // Range 에러가 아닌 에러도 던져줘야 함 🌟
    }
}
```

만약 또 다른 형태의 `RangeError`를 던지려면 (서로 다른 예외 메시지를 던지고 싶은 `RangeError`가 2개 이상이면), **에러를 서브클래싱하여 구체적으로 표현**할 수 있다.

```typescript
// 커스텀 에러 타임
class InvalidDateFormatError extends RangeError {} // 날짜 포맷이 잘못된 경우
class DateIsInTheFutureError extends RangeError {} // 미래 날짜인 경우

function parse(birthday: string): Date {
	let date = new Date(birthday);
  	if(!isValid(date)) {
    	throw new InvalidDateFormatError('YYYY/MM/DD 형식으로 날짜를 입력하세요');
    }
  	if (date.getTime() > Date.now()) {
    	throw new DateIsInTheFutureError('미래에 태어나실 예정인가요?');
    }
  	return date;
}

try {
	let date = parse(ask());
    console.info('Date is', date.toISOString());
} catch (e) {
	if (e instanceof InvalidDateFormatError) {
    	console.error(e.message);
    } else if (e instanceof DateIsInTheFutureError) {
    	console.info(e.message);
    } else {
    	throw e;
    }
}
```

이처럼 커스텀 에러를 이용하면 어떤 문제가 생겼는지, 문제가 생긴 원인이 무엇인지 설명할 수 있다.

---

> 주석으로 작성된 throws문으로 메서드가 어떤 종류의 런타임 예외를 발생시킬 수 있는지 알려줄 수 있다. (그러나 throws문은 자바가 지원하는 기능, 타입스크립트는 throws문 지원하지 않음)

```typescript
/**
* @throws {InvalidDateFormatError} 사용자가 생일을 잘못 입력함
* @throws {DateIsInTheFutureError} 사용자가 생일을 미래 날짜로 입력함
**/
```


<br />

## 3. 예외 반환

```typescript
function parse(
  birthday: string
): Date | InvalidDateFormatError | DateIsInTheFutureError {  // ⬅️ 이 메서드가 반환하는 3가지 모든 상황을 명시
  let date = new Date(birthday);
  if (!isValid(date)) {
    throw new InvalidDateFormatError('YYYY/MM/DD 형식으로 날짜를 입력하세요');
  }
  if (date.getTime() > Date.now()) {
    throw new DateIsInTheFutureError('미래에 태어나실 예정인가요?');
  }
  return date;
}
```

위와 같이 `parse`의 시그니처에 발생할 수 있는 예외를 나열해줌으로써, 

해당 메서드가 처리하는 모든 세가지 상황

1. `파싱 성공`  2. `InvalidDateFormatError`  3. `DateIsInTheFutureError`

을 코드로 작성해줘야 하며, 그렇지 않으면 `TypeError`가 발생한다.

---

이때, 에러들을 개별적으로 처리하지 않고, 한번에 명시적으로 처리해줄 수 있다.

```typescript
// 에러들을 개별적으로 처리한 코드
try {
	let date = parse(ask());
    console.info('Date is', date.toISOString());
} catch (e) {
	if (e instanceof InvalidDateFormatError) {
    	console.error(e.message);
    } else if (e instanceof DateIsInTheFutureError) {
    	console.info(e.message);
    } else {
    	throw e;
    }
}
```

```typescript
// 에러를 한번에 처리한 코드
let date = parse(ask());  // date는 날짜이거나 에러일 것임
if (result instanceof Error) {
	console.error(result.message);  // 발생한 에러의 메시지 출력
} else {
	console.info('Date is', result.toISOString());
}
```

---



<br />

## 4. Option 타입

앞서 값과 에러의 유니온을 반환하는 방법 외에 `Try`, `Option`, `Either`과 같이 특수 목적 데이터 타입을 사용하는 방법이 있다.

여기서는 `Option` 타입만 살펴보자.

> `Try`, `Option`, `Either`는 자바스크립트가 기본으로 제공하지 않으므로, `npm`에서 설치하거나 직접 구현 후 사용해야 한다.

- `Option` 타입

  - 어떤 특정 값을 반환하는 대신 ***값을 포함하거나 포함하지 않을 수도 있는 컨테이너(배열 등)를 반환***
  
  - 컨테이너는 값을 포함할 수 있다면 어떤 자료구조든 상관 없음 
  
```ts
// 컨테이너를 배열로 구현한 경우
function parse(birthday: string): Date[] {  // ⬅️ 반환 타입이 `Date`가 아닌 `Date[]`
  let date = new Date(birthday);
  if (!isValid(date)) {
    return []; 		 // 예외 발생 시 빈 컨테이너 반환
  }
  return [date];	 // 유효한 값인 경우 date 들어있는 컨테이너 반환
}

let date = parse(ask())

// 다음과 같이 컨테이너는 자체적인 메서드(map, foreach)를 이용해
// 설혹 안에 값이 없을지라도 여러 가지 연산을 연쇄적으로 수행 가능
date
.map(_ => _.toISOString())
.forEach(_ => console.info('Date is', _))
```

<br />

아래 예시에서 `Option`은 `Some<T>`와 `None`이 구현하게 될 인터페이스인데,

`Some<T>`는 연산에 성공하여 값이 만들어진 상황을 나타낸다. 즉, `T`라는 값을 포함하는 `Option`이다.

반면, `None`은 연산이 실패한 상황의 `Option`을 가리키며, 값을 담고 있지 않다.


```ts
interface Option<T> {
  flatMap<U>(f: (value: T) => Option<U>): Option<U>;  // flatMap: 비어있을 수도 있는 Option에 연산을 연쇄적으로 수행함
  getOrElse(value: T): T;  							  // getOrElse: Option에서 값을 가져옴
}

class Some<T> implements Option<T> {
  constructor(private value: T) {}
  
  // 인수로 전달된 f를 호출해 새로운 타입의 새 Option을 만들어 반환
  flatMap<U>(f: (value: T) => Option<U>): Option<U> {
    return f(this.value);
  }
  
  // Some<T>의 값을 반환
  getOrElse(value: T): T {
    return this.value;
  }
}

class None implements Option<never> {
  // 계산 실패를 의미하므로 항상 None 반환
  flatMap<U>(): Option<U> {
    return this;
  }
  
  // 기본값으로 제공한 값을 그대로 반환
  getOrElse<U>(value: U): U {
    return value;
  }
}
```
