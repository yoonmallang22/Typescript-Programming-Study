# 함수 선언과 호출

### 함수는 일급객체

- 자바스크립트에서 함수는 일급 객체이다 => 함수를 객체와 동일하게 사용할 수 있습니다.
- 즉 아래와 같은 작업을 할 수 있습니다.
  1. 객체를 다루듯이 함수를 변수에 할당
  2. 함수를 다른 함수로 전달
  3. 함수에서 함수로 반환
  4. 객체와 프로토타입에 할당
  5. 함수에 프로퍼티에 기록, 기록된 프로퍼티를 읽기

### 함수선언

- 보통 `함수 매개변수의 타입은 명시적으로 정의`합니다.
- 특별한 상황을 제외하면 매개변수 타입은 추론하지 않는다고 합니다.
- 반환 타입은 추론하도록 하는게 일반적이다
- 타입스크립트는 `함수 생성자를 통한 함수 생성을 제외`한 나머지 모든 문법을 안전하게 지원합니다.
- `모든 매개변수 타입의 필수 어노테이션, 반환 타입의 선택형 어노테이션에 적용하는 규칙`을 가진다.

```
function add(a:number, b:number){
  return a+b
}

// 생성자 함수
let test = new Function('hello', 'bye', 'Good Morning');

console.log(test('chiman'));
console.log(test(true));
console.log(test(5));


// 일반 함수
let test2 = function (name: string) {
  return 'hi' + name;
};

console.log(test2('chiman'));
console.log(test2(5)); // 에러발생

```

### 간단한 용어 소개

- 매개변수(parameter) : `함수 선언`할때 사용하며, 정형 매개변수라고 함
- 인수(argument) : `함수를 호출`할 때 사용하며 실질 매개변수 라고 함

```
function add(a:number, b:number){     // 여기서 a,b를 매개변수
  return a+b
}

add(3,5)  // 여기서 3,5를 인수
```

### 선택적 매개변수와 기본 매개변수

- 선택적 매개변수

  - 있어도 되고, 없어도 될때 사용
  - `? 기호를 사용`
  - Rest 파라미터가 오지 않는 한 일반적으로 맨 뒤에 오도록 한다.

  ```
  function greet(name: string, greeting?: string) {
    if (greeting) {
        console.log(`${greeting}, ${name}!`);
    } else {
        console.log(`Hello, ${name}!`);
    }
  }
  ```

- 기본 매개변수

  - `= 기호를 사용 `
  - 사용자가 매개변수를 지정하지 않는 경우 `매개변수의 기본값을 지정해주는 것`
  - 선택적 매개변수는 뒤에 와야 하지만 기본 매개변수는 어디에나 추가할 수 있다.

  ```
  function add(a: number, b: number, c = 0, d = 5) {
    return a + b + c + d;
  }

  // console.log(add(1)); // 에러발생 :  2~개의 인수가 필요한데 1개를 가져왔습니다.
  // console.log(add(1, 2)); // 8
  // console.log(add(1, 2, 3)); // 11
  // console.log(add(1, 2, 3, 4)); // 10

  ```

### 나머지 매개변수

- 인수가 고정된 경우가 아닌 인수의 개수가 달라지는 경우 처리를 해야 할 때가 있다.
- 이 경우 arguments를 사용할 수 있지만 문제점이 있다.
  1. 배열이 아니다. arguments객체는 배열이 아닌 `유사 배열 객체 이므로 배열 메서드를 사용할 수 없다.`
  2. 안전하지 않다.
     1. 아래의 코드에서 total,n을 any로 추론
     2. 사용하기 전(함수 호출)까지는 특별한 에러를 발생시키지 않는다.

```
// arguments 사용시
function sumVariadic() {
  const arr = Array.from(arguments);
  return arr.reduce((total, n) => total + n, 0);     // n,total 모두 any로 추론
}

console.log(sumVariadic(1, 2, 3));   // 에러발생 : 0개의 인수가 필요한데 3개를 가져왔습니다.
```

- 이를 해결하기 위해 나머지 매개변수(Rest 파라미터)를 사용하여 해결한다.
- 나머지 매개변수는 최대 1개만 가질 수 있다.
- 나머지 매개변수는 항상 매개변수 목록 맨 마지막에 위치해야한다.

```
function sumVariadic(...arr: number[]) {
  return arr.reduce((total, n) => total + n, 0);
}

console.log(sumVariadic(1, 2, 3));       // 6
console.log(sumVariadic(1, 2, 3, 4));    // 10
console.log(sumVariadic(1, 2, 3, 4, 5)); // 15

```

### call, apply, bind

- call, apply를 통해 함수를 호출할 수도 있고, 주로 this의 값을 지정할 때 사용한다
- call, apply의 공통점은 첫번째 인수는 this의 값을, 두번째 인수는 호출할 함수의 매개변수들을 전달하는 것
- 차이점은 call의 경우 여러개의 인수들로 받지만, apply는 배열로 받는다는 차이가 있다.

```
function test(add1: string, add2: string) {
  console.log(this, 'add1+add2 => ', add1, add2);
}

const obj1 = {
  value: 'value1',
};

const obj2 = {
  value: 'value2',
};

test('Good','Morning');
test.call(obj1, 'Good', 'Morning');     // 여러개의 단어들로 호출
test.apply(obj2, ['Good', 'Morning']);  // 여러개의 단어들을 배열에 담아서 호출

```

- bind는 call, bind와 달리 함수를 호출하는것이 아닌 첫 번째 인수로 전달한 값으로 `this 바인딩이 교체된새로운 함수를 반환`한다.

```
function test(add1: string, add2: string) {
  console.log(this, 'add1+add2 => ', add1, add2);
}

const obj1 = {
  value: 'value1',
};

const obj2 = {
  value: 'value2',
};

const obj3 = {
  value: 'value3',
};


test.call(obj1, 'Good', 'Morning');         // test함수 호출, this는 {value:'value1'}
test.apply(obj2, ['Good', 'Morning']);      // test함수 호출, , this는 {value:'value2'}
test('1', '2');                             // test함수 호출, 그러나 this는 전역객체

const bi = test.bind(obj3, 'Good', 'Morning');  // 함수 호출이 아닌 함수를 생성하기 때문에 아래와 같이 함수를 호출해야함
bi();                                           // this는 {value:'value3'}
```

### this의 타입

- this의 값은 함수를 `어떻게 호출했는지에 따라 값이 달라진다.`
- 따라서 기대하는 this 타입을 첫번째 매개변수로 선언하는게 좋다

```
let obj = {
  test() {
    return this;
  },
};

console.log(obj.test()); // this는 obj객체

const newObj = obj.test;
console.log(newObj()); // 전역객체

----

function handleDate(this:Date) {
  return this.getDate();
}

handleDate.call(new Date());
handleDate(); // 에러발생
```

### 제너레이터 함수

- 제너레이터 함수는 여러 개의 값을 생성하는 편리한 기능을 제공 => 여러 개의 값을 필요에 따라 하나씩 반환(yield)할 수 있습니다.
- 함수명 앞에 \*(에스터리스크 라고 함)를 붙혀 제너레이터를 의미하도록 한다.
- yield라는 키워드를 통해 값을 방출한다.
- 제너레이터 함수를 호출하면 이터러블객체이면서 이터레이터인 객체를 반환한다.

```
function* createFibonacciGenerator() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let maker = createFibonacciGenerator();
console.log(maker);

{
  next: [Function (anonymous)],
  throw: [Function (anonymous)],
  return: [Function (anonymous)],
  [Symbol(Symbol.iterator)]: [Function (anonymous)]
}

console.log(maker.next()); // { value: 0, done: false }
console.log(maker.next()); // { value: 1, done: false }
console.log(maker.next()); // { value: 1, done: false }

```

# 반복자(이터레이터)

- next라는 메서드를 정의한 객체
- next 메서드를 호출하면 이터레이터 리절트 객체를 얻음(value, done 프로퍼티를 가지고 있음)

### 이터러블

- Symbol.iterator 라는 프로퍼티를 가진 모든 객체
- for of문으로 순회 가능하며 스프레드문법, 구조분해 할당 등 사용 가능

### 반복자(이터레이터)

- next라는 메서드를 정의한 객체
- 이터러블에서 Symbol.iterator를 프로퍼티 키로 사용한 몌서드를 호출하면 나타나는 객체

### 이터레이터 리절트 객체

- next 메서드를 호출하여 나타난 객체를 의미

```
const iterable = [1, 2, 3]; // Symbol.iterator 프로퍼티를 가진 객체

const iterator = iterable[Symbol.iterator](); // 이터러블을 Symbol.iterator를 키로 호출한 객체
console.log(iterator); // Object [Array Iterator] {next:...}   // next를 가짐

for (let i = 0; i <= iterable.length; i++) {
  const iteratorResultObj = iterator.next();
  console.log(iteratorResultObj); // iteratorResultObj :next()호출하여 얻는 객체
}

// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }

```

### 호출 시그니처(타입 시그니처)

- 함수의 전체 타입을 표현하는 방법이다.
- 값이 아닌 타입 정보만 포함한다.
- 매개변수 타입, this 타입, 반환 타입, 나머지 타입, 조건부 타입은 표현할 수 있지만, 기본값을 표현할 수 없다.
- 반환 타입을 명시해야 한다.
- 호출 시그니처를 적용하면
  - 매개변수의 타입을 다시 지정할 필요 없다.
  - 반환 타입을 다시 지정할 필요 없다.
  - 기본값은 지정해야한다. => 기본값을 호출 시그니처에 지정할 수 없기 때문

```
type Log = (message: string, userId?: string) => void;

const log:Log = (message, userId = 'chiman') => {
  let time = new Date().toISOString();
  console.log(time, message, userId);
};

```

### 문맥접 타입화

- 매개변수에 직접적으로 타입을 지정해주지 않아도 타입스크립트가 문맥상 타입을 추론하는 것을 문맥적 타입화 라고 한다.
- 함수의 경우 인라인으로 제공해야 타입을 추론할 수 있다.

```

// message의 타입을 따로 지정하지 않아도 추론한다.
type Log = (message: string, userId?: string) => void;

const log:Log = (message, userId = 'chiman') => {
  let time = new Date().toISOString();
  console.log(time, message, userId);
};

-------

function time(fn: (index: number) => void, n: number) {
  for (let i = 0; i < n; i++) {
    fn(i);
  }
}

time((n) => console.log(n), 5); // time를 호출할 때 함수 선언을 인라인으로 제공하면 인수로 전달하는 함수의 타입을 명시할 필요가 없다.

// 인라인이 아닌 경우 타입을 추론할 수 없다.
function f2(n) {
  console.log(n);
}

const f3 =(n) =>console.log(n);

time(f2, 5); // n은 any
time(f3, 5); // n은 any

```

### 오버로드된 함수 타입

- 단축 호출 시그니처 : 간단한 상황에 사용 Ex) `type Log = (message:string, userId?:string) => void`
- 전체 호출 시그니처 : 호출 시그니처가 여러개

  - 더 복잡한 함수의 경우 사용
  - 함수 오버로딩의 경우 => 함수의 이름은 같지만, 매개변수 개수, 매개변수 타입이 다른 경우

    ```
    type Reservation = {
      // 예약 정보...
    };

    type Reserve = {
      // 왕복의 경우
      (from: Date, to: Date, destination: string): Reservation;
      (from: Date, destination: string): Reservation;

      // 편도의 경우
    };

    let reserve: Reserve = (from: Date, to: Date, destination?: string) => {       // 에러발생
      return {
        // 예약정보
      };
    };

    const roundTripReservation = reserve(new Date(), new Date(), 'New York');
    const oneWayReservation = reserve(new Date(), 'Paris');

    ```

- 하지만 여러개의 오버로드 시그니처를 선언하면 2가지 문제가 발생
  - `호출자 관점`에서는 함수의 타입은 오버로드 시그니처들의 유니온이 된다.
  - `함수를 구현하는 관점`에서는 단일한 구현으로 조합된 타입을 나타낼 수 있어야 한다.
  - 따라서 아래와 같이 수정

```
type Reservation = {
  // 예약 정보...
};

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation;
  (from: Date, destination: string): Reservation;
};

// reserve를 구현할 때 2번째 매개변수로 2가지가 올 수 있기 때문에 Date | string으로 처리를 해준다.
let reserve: Reserve = (from: Date, toOrDestination: Date | string, destination?: string) => {
  console.log(from);

// 또한 toOrDestination의 타입이 Date, string에 따라 처리를 다르게 하기 때문에 정제해서 사용한다.
  if (toOrDestination instanceof Date && destination !== undefined) {
    console.log(toOrDestination.getDate());
  }

  return {
    // 예약정보
  };
};

const roundTripReservation = reserve(new Date(), new Date(), 'New York');
const oneWayReservation = reserve(new Date(), 'Paris');

```

# 다형성

- 다형성이란 : 하나의 타입에 여러 객체를 대입할 수 있는 성질입니다.
- 기대하는 타입을 정확하게 알고 있다면 구체타입이 유용하다. 하지만 어떤 타입을 사용할지 미리 알 수 없는 상황에서는 구체타입을 사용하기 어렵다.
- 아래의 경우 처럼 여러개를 사용하기 위해 시그니처를 여러개 지정할 수도 있지만 가독성이 좋지도 않고, 객체의 경우 문제가 발생한다.

```
type Filter = {
  (array:number[], f:(item):number=>boolean):number[]
  (array:string[], f:(item):string=>boolean):string[]
  (array:[], f:(item):string=>boolean):string[]
  (array:object[], f:(item):object=>boolean):object[] // 에러발생 : object타입은 객체의 실제 형태에 대해서는 알려주지 않는다.
  ...
}
```

### 제네릭

- 따라서 어떤 타입을 사용할지 정확하게 알지 못 할때 사용하면 좋은 것이 `제네릭`이다.
- `지금은 타입을 알 수 없으니 누군가 filter를 호출할 때마다 타입스크립트가 타입을 추론해주기 바란다.` 라는 뜻
- 제네릭은 코드를 일반화하고, 재사용성을 높이고, 간결하게 유지하는데 도움을 준다.
- 사용방법
  - 꺾쇠괄호(<>)로 제네릭 타입 매개변수를 선언
  - 꺾쇠 기호를 추가하는 위치에 따라 제네릭의 범위가 결정 => 아래 `언제 제네릭 타입이 한정되는가?` 에서 확인

```
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};

let filter: Filter = (arr, f) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};

let names = [{ lastName: 'KIM' }, { lastName: 'LEE' }, { lastName: 'PARK' }];

filter([1, 2, 3], (item) => item > 2); // T는 number로 한정
filter(['a', 'b', 'c'], (item) => item !== 'b'); // T는 string으로 한정
filter(names, (item) => item.lastName.startsWith('K')); // T는 {lastName:string}으로 한정

```

### 타입스크립트가 제네릭을 추론하는 과정

1. filter의 타입 시그니처를 통해 array가 타입 T인 요소들로 이루어진 배열을 알게된다.
2. array[1,2,3]을 통해 T가 number라는 사실을 알게된다.
3. 모든 T를 number타입으로 대치한다. 따라서 `<T>(array: T[], f: (item: T) => boolean): T[];  => <number>(array: number[], f: (item: number) => boolean): number[];`
4. 모든 타입이 할당 조건을 만족하는지, 전달받은 함수 F를 새로 추론한 시그니처에 할당할 수 있는지 확인한다.

### 언제 제네릭 타입이 한정되는가?

- 위에서 제네릭 타입의 `선언 위치에 따라` 타입의 범위뿐 아니라 타입스크립트가 제네릭 타입을 언제 구체 타입으로 한정하는지도 결정된다.
- 보통 제네릭 타입을 `사용하는 순간`에 제네릭과 구체 타입을 한정한다.
- 이때 `사용하는 순간` 이란
  - 함수 : 호출할때
  - 클래스 : 클래스로 인스턴스를 만들 때
  - 타입별칭, 인터페이스 : 이들을 사용하거나, 구현할 때

### 제네릭을 어디에 선언할까?

1. T를 개별 시그니처 범위로 한정한 전체 호출 시그니처
2. T의 범위를 모든 시그니처로 한정한 전체 호출 시그니처
3. 1과 비슷하지만 단축 호출 시그니처
4. 2와 비슷하지만 단축 호출 시그니처
5. 시그니처 범위로 한정한 이름을 갖는 함수 호출 시그니처

```
// 1. T를 한 시그니처 범위로 한정했으므로 타입스크립트는 filter의 함수를 호출할 때 이 시그니처의 T를 구체타입으로 한정
// 호출 시그니처
type Filter = {
  <T>(array: T[], f: (item: T) => boolean): T[];
};

// 선언
let filter: Filter = (arr, f) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};

// 호출(사용)
filter([1, 2, 3], (item) => item > 2); // T는 number로 한정

// 2. T를 filter타입의 일부로 선언했으므로 타입스크립트는 Filter 타입의 함수를 선언할 때 T를 한정
// 호출 시그니처
type Filter2<T> = {
  (array: T[], f: (item: T) => boolean): T[];
};

// 선언
let filter2: Filter2<number> = (arr, f) => {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (f(item)) {
      result.push(item);
    }
  }
  return result;
};

// 호출(사용)
filter2([1, 2, 3], (item) => item > 2);
// filter2(['1', '2', '3'], (item) => item > 2);  // 에러발생 : string 형식은 number 형식에 할당할 수 없음

// 3. 1과 비슷하지만 전체호출이 아닌 단축 호출 시그니처로 가능
type Filter3 = <T>(array: T[], f: (item: T) => boolean) => T[];

// 4. 2와 비슷하지만 전체호출이 아닌 단축 호출 시그니처로 가능
type Filter4<T> = (array: T[], f: (item: T) => boolean) => T[];

// 5. 이름을 갖는 함수 호출 시그니처, filter를 호출할 때 T를 타입으로 한정하므로 각 filter 호출은 자신만의 T 한정값을 가짐
// 선언
function map<T, U>(array: T[], f: (item: T) => U): U[] {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
}
// 호출(사용)
map([1, 2, 3], (item) => item >= 2);
map<number, boolean>([1, 2, 3], (item) => item >= 2); // 되긴 됨
```

### 제네릭 타입 추론

- 대부분의 상황에서 타입스크립트는 제네릭 타입을 훌륭하게 추론해낸다.
- 그러나 제네릭도 명시적으로 지정할 수 있다. 단 명시할때는 모든 제네릭 타입을 지정하거나, 아무것도 명시하지 않도록 해야한다.

```

function map<T, U>(array: T[], f: (item: T) => U): U[] {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    result[i] = f(array[i]);
  }
  return result;
}

map([1, 2, 3], (item) => item >= 2);                   // 타입 지정 X
map<number, boolean>([1, 2, 3], (item) => item >= 2);  // 타입 모두 지정

map<number>([1, 2, 3], (item) => item >= 2); // 에러 발생 : 2개의 형식 인수가 필요한데 1개를 가져왔습니다.

```

- 타입스크립트가 추론을 하지 못해 명시적으로 타입을 지정하여 문제를 해결하는 경우

```
let promise = new Promise((resolve) => resolve(77));
promise.then(result=>result*4); // result는 unknown입니다.

// 타입을 명시해서 문제를 해결
let promise = new Promise<number>((resolve) => resolve(77));
promise.then(result=>result*4);

```

### 제네릭 타입 별칭

- 타입별칭에서는 타입 별칭명과 할당기호(=) 사이에만 제네릭 타입을 선언할 수 있다.

```
type MyEvent<T> = {
  target: T;
  type: string;
};

let test1: MyEvent<HTMLButtonElement | null> = {
  target: document.querySelector('#myButton'),
  type: 'click',
};
```

### 한정된 다형성

- 아래와 같이 extends 키워드를 사용하여 제네릭의 범위를 제한할 수 있다.
- 이때 T는 extends 우측에 오는 타입 이거나, 우측에 오는 타입의 하위타입만 올 수 있다.
- 즉, T extends U인 경우, U 타입은 적어도 T 타입을 포함하는 기능이 필요하다. 이런 상황을 U가 T의 상한 한계라고 한다

```
function test<T extends string | number>(prop: T) {
  console.log(prop);
}

test('hi');
test(5);

test(true); // 에러발생
test([1]);  // 에러발생
test({ key: 'qwe' }); // 에러발생


```

### 여러제한을 적용한 한정된 다형성

- 인터섹션(&)을 사용하여 이어 붙이면 된다.

```
type HassSides = { numberOfSizes: number };
type SidesHaveLength = { sideLength: number };

function logPerimter<Shape extends HassSides & SidesHaveLength>(s: Shape) {
  console.log(s);
}

logPerimter({ numberOfSizes: 3 , sideLength: 5 });

logPerimter({ numberOfSizes: 3 });  // 에러 발생
logPerimter({ sideLength: 5 });     // 에러 발생

```

### 한정된 다형성으로 인수의 개수 정의하기

```
function call(f: (...argus: unknown[]) => unknown, ...args: unknown[]): unknown {
  return f(...args);
}

function fill(length: number, val: string): string[] {
  return Array.from({ length }, () => val);
}

call(fill, 10, 'a'); // unknown 형식은 number 형식에 담을 수 없다.
```

- 위의 경우 call함수의 시그니처에 따라 호출시에 fill 함수의 매개변수 타입은 unknown[]입니다. 하지만 fill 함수의 매개변수 타입은 number, string이므로 unknown 형식은 number 형식에 담을 수 없게 됩니다.
- 이때 extends로 타입을 제한하여 타입스크립트가 전달한 인수를 통해 T에 걸맞게 추론한다.

```
// extends를 통해 T는 unknown[]의 서브타입, 즉 어떤 타입의 배열 또는 튜플이다.
// arg는 T 타입이며, T는 배열타입이어야 하므로, T에 걸맞는 튜플 타입으로 추론함
// 함수 선언문의 경우 호출시에 타입이 결정됨
function call2<T extends unknown[], R>(f: (...argus: T) => R, ...args: T): R {
  return f(...args);
}

call2(fill, 10, 'a');
call2(fill, 10);
call2(fill, 10, 11, 12);

```

### 제네릭 타입의 기본값

- 제네릭 타입도 기본값을 지정할 수 있다.
- 함수의 선택적 매개변수처럼 기본 타입을 갖는 제네릭은 반드시 기본 타입을 갖지 않는 제네릭의 뒤에 위치해야한다.

```
type MyEvent<T = HTMLElement> = {
  target: T;
  type: string;
};


type MyEvent2<T extends HTMLElement =HTMLElement> = {
  target: T;
  type: string;
};

type MyEvent3<Type extends string, Target extends HTMLElement = HTMLElement> = {
    target:Target,
    type:Type
}
```

### 타입 주도 개발

- 타입 시그니처를 먼저 정하고 값을 나중에 채우는 프로그래밍 방식
- 타입 시그니처 정의 -> 구현하는 방식
