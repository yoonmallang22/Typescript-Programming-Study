# 목차

- [목차](#목차)
- [타입이란](#타입이란)
- [any](#any)
- [unknown](#unknown)
- [boolean](#boolean)
- [number](#number)
- [bigint](#bigint)
- [string](#string)
- [symbol](#symbol)
- [객체](#객체)
- [타입별칭](#타입별칭)
- [유니온 타입](#유니온-타입)
  - [유니온 타입 주의사항](#유니온-타입-주의사항)
- [인터섹션 타입](#인터섹션-타입)
- [배열](#배열)
- [튜플](#튜플)
  - [읽기 전용 배열과 튜플](#읽기-전용-배열과-튜플)
- [null, undefined, void, never](#null-undefined-void-never)
  - [null](#null)
  - [undefined](#undefined)
  - [void](#void)
  - [never](#never)
- [열거형](#열거형)

# 타입이란

- 타입이란 값과 이 값으로 할 수 있는 일의 집합
- 예를들어 string 타입은 모든 문자열과 문자열로 할 수 있는 모든 연산, 문자열에 호출할 수 있는 모든 메서드의 집합이다.
- 타입은 타입검사기를 통해 유효하지 않은 동작이 실행되도록 예방할 수 있습니다.
- 타입 계층 -> [출처 : bami](https://velog.io/@bami/Typescript-%ED%83%80%EC%9E%85-%EA%B3%84%EC%B8%B5-%EA%B5%AC%EC%A1%B0%EC%99%80-%ED%83%80%EC%9E%85-%ED%98%B8%ED%99%98%EC%84%B1)
- ![타입계층](https://github.com/rlaclghks123/Typescript-Programming-Study/assets/55423198/1c70928f-f1ca-4bdd-bc16-e1899c7d624c)

# any

- 뭐든지 할 수 있지만 꼭 필요한 상황이 아니라면 사용하지 않는 것이 좋다.
- any를 사용하면 자바스크립트 처럼 동작하기 시작하면서 타입 검사기의 의미가 사라진다.

  ```
    let a: any = 666;
    let b: any = ['hello'];
    let c = a + b; // 아무런 문제가 발생하지 않음
  ```

# unknown

- any와 같이 모든 값을 대표하지만, unkown 타입을 검사해 정제하기 전까지는 unknown 타입의 값을 사용할 수 없게 강제한다.
- 비교연산(==, ===, ||, &&, ?)과 반전(!)연산을 지원하고, 자바스크립트의 typeof, instanceof 연산자로 정제할 수 있다.
- unknown 타입이 아닌값과 unknown 타입인 값을 비교할 수 있다.
  ```
  let a : unknown = 30
  let b = a===123 // boolean
  ```
- 그러나 unknown값이 특정 타입이라고 가정하고 해당 타입을 지원하는 동작을 수행할 수 없다. → 타입정제가 필요
  ```
    let a : unknown = 30
    let b = a===123 // boolean
    let c = a+10 // 에러: 타입이 unknown이다. 비교연산과 반전연산이 아닌경우 타입 정제가 필요
    if(typeof a=== 'number'){
        let d = a+10 // number
    }
  ```

# boolean

- boolean 타입은 참(true), 거짓(false) 두 개의 값을 가진다.
- let을 사용하면 넓은 범위의 boolean값으로 추론한다.
- const를 사용하면 좁은 범위의 true, false로 추론한다.
  ```
   let a = true // boolean
   const b = false // false
  ```

# number

- 모든 숫자 (정수, 소수, 양수, 음수, Infinity, NaN 등)의 집합이다.
- 덧셈(+), 뺄셈(-), 모듈로(%), 비교(<) 등 숫자 관련 연산을 수행할 수 있다.

  > 꿀팁 : 긴 숫자를 처리할 때는 숫자 분리자를 이용해 숫자를 읽기 쉽게 만들 수 있다. -> let oneMillion = 1_000_000 // 1000000과 같음

# bigint

- 라운딩 관련 에러 걱정 없이 큰 정수를 처리할 수 있다.
- 모든 Bigint의 집합으로 덧셈, 뺄셈, 곱셈, 나눗셈, 비교 등 연산을 지원한다.

# string

- string은 모든 문자열의 집합으로 연결(+), 슬라이스(.slice)등의 연산을 수행할 수 있다.

# symbol

- 실무에서 자주 사용하지 않는편이며, 객체와 맵에서 문자열 키를 대신하는 용도로 사용한다.
- 심벌키를 사용하면 사람들이 잘 알려진 키만 사용하도록 강제할 수 있으므로 키를 잘못 설정하는 실수를 방지한다.

# 객체

- 자바스크립트, 타입스크립트는 구조기반 타입을 갖도록 설계되어 있다.
- `구조기반 타입화는 객체의 이름에 상관없이 객체가 어떤 프로퍼티를 갖고 있는지를 따진다.(덕 타이핑)`

  ```
  type Food = {
    protein: number;
    fat: number;
  };

  function calculateCalorie(food: Food) {
    return food.protein * 4 + food.fat * 5;
  }

  // Food 형식에 맞는 값
  const a = {
    protein: 30,
    fat: 50,
  };

  // Food 형식 + sugar 추가
  const b = {
    protein: 20,
    fat: 20,
    sugar: 50,
  };

  // Food 형식에 맞지 않는 값
  const c = {
    protein: 20,
    sugar: 50,
  };

  calculateCalorie(a);
  calculateCalorie(b);
  calculateCalorie(c); // 형식에 맞지 않으므로 에러발생

  // 단 이 경우는 안됨, 다른 개발자에게 오해를 불러 일으킬 수 있고, 오타가 발생해도 오류가 발생하지 않는 이유 때문에 지원하지 않는다고 함
  // 자세한 부분은 -> https://toss.tech/article/typescript-type-compatibility

  const tmp = calculateCalorie({
    protein: 20,
    fat: 20,
    sugar: 50,
  }); // Food 형식에 sugar가 없습니다.
  ```

- 객체는 let, const로 선언하는 경우 차이가 없다. 즉 객체의 경우 수정 가능성을 염두에 두고 더 넓게 추론하기 때문에 const로 사용한다고 해서 더 좁은 타입으로 추론하지는 않는다.
- 아래의 4가지 중 2번째가 베스트, 다음은 object가 좋으며, 나머지 2개는 피해야 한다.

  1. object로 선언 ⇒ 좋지 않음

     - any보다 조금 더 좁은 타입
     - 정보를 거의 알려주지 않고 그저 값 자체가 객체다 라는 정보만 알려준다.

       ```
       let a:object = {
         b:'x'
       }

       a.b // 에러발생 : 'object' 형식에 'b' 속성이 없습니다.
       ```

  2. 객체 리터럴 문법

  - 옵셔널 속성 : ?를 추가해서 사용하며 속성이 있어도 되고, 없어도 되도록 사용
  - 인덱스 시그니처 : [key:T]:U의 형태로 사용 ⇒ 모든 T타입의 키는 U타입의 값을 갖는다. ⇒ 단 여기서 키(T)는 number나 string 타입
  - readonly 한정자를 이용해 특정 필드를 읽기전용으로 정의할 수 있다.⇒ 즉 수정할 수 없도록 함 ⇒ 변수에서 const 역할
  - 아래와 같이 사용

    ```

    let a: {
      b: number;
      c?: string;               // 옵셔널
      [key: number]: boolean;   // 인덱스 시그니처
    };

    ```

3.  빈 객체 리터럴 표기법({})

    - null, undefined를 제외한 모든 타입은 빈 객체 타입에 할당할 수 있으나, 사용하기 까다롭게 만든다 ⇒ 가능한 피하도록 한다.

4.  Object 타입

    - {}과 비슷한 방법이며 마찬가지로 가능하면 사용하지 않아야 한다.

# 타입별칭

- (let, const, var)변수를 선언해서 값 대신 변수로 칭하듯이 타입 별칭을 타입으로 가리킬 수 있다.
- 변수와 같이 하나의 타입을 두 번 정의할 수 없다.
- 타입별칭은 복잡한 타입을 DRY하지 않도록 해주며, 변수가 어떤 목적으로 사용되었는지 쉽게 이해할 수 있게 도와준다.
- DRY : 같은 코드를 반복하지 않아야 한다는 뜻

```
type Age = number;

type Person = {
  name:string,
  age:Age
}

let driver:Person = {
  name:'Mr.Kim',
  age:20
}

```

# 유니온 타입

- `| 기호`를 사용한다.
- 유니온 타입은 여러 타입 중 하나일 수 있으며, 양쪽 모두가 될 수도 있다.

```

type Cat = { name: string; purrs: boolean };
type Dog = { name: string; barks: boolean; wags: boolean };

type CatOrDog = Cat | Dog;

// test가 Cat인 경우
let test: CatOrDog = {
  name: 'chiman',
  purrs: true,
};

// test가 Dog인 경우
test = {
  name: 'chiman',
  barks: true,
  wags: true,
};

// test가 Dog, Cat 모든 속성을 가진 경우
test = {
  name: 'chiman',
  purrs: true,
  barks: true,
  wags: false,
};

```

### 유니온 타입 주의사항

- 함수의 매개변수의 경우 유니온 타입을 사용하면 공통된 부분을 제외하고 나머진 에러가 발생한다.
  -> 타입스크립트 관점에서는 prop이 Cat 타입이 올지 Dog 타입이 올지 알 수가 없기 때문에 어느 타입이 들어오든 간에 오류가 안 나는 방향으로 타입을 추론하게 되기 때문입니다.

  ```

  function unionTest(prop:Cat|Dog){
    console.log(prop.name)
    console.log(prop.purrs); // 에러 발생 : 'Cat | Dog' 형식에 'purrs' 속성이 없습니다.
    console.log(prop.barks); // 에러 발생 : 'Cat | Dog' 형식에 'barks' 속성이 없습니다.
    console.log(prop.wags); // 에러 발생 : 'Cat | Dog' 형식에 'wags' 속성이 없습니다.
  }

  ```

- 만약 타입가드를 사용하지 않는다면 공통된 속성만 사용할 수 있고, 다른 속성도 사용하기 위해선 타입가드를 통해 정제해서 사용해야 합니다.

  ```

  function unionTest(prop: Cat | Dog) {
    console.log(prop.name);

    if ('purrs' in prop) {
      console.log(prop.purrs);
    }

    if ('purrs' in prop) {
      console.log(prop.purrs);
    }

    if ('barks' in prop) {
      console.log(prop.barks);
    }

    if ('wags' in prop) {
      console.log(prop.wags);
    }
  }

  ```

# 인터섹션 타입

- `&기호`를 사용합니다
- 여러 타입을 모두 만족하는 하나의 타입을 의미합니다

```

type Cat = { name: string; purrs: boolean };
type Dog = { name: string; barks: boolean; wags: boolean };

type CatAndDog = Cat & Dog;

let test: CatAndDog = {
  name: 'chiman',
  purrs: true,
  barks: false,
  wags: true,
};

```

# 배열

- 사용방법은 2가지가 있다 -> 성능, 의미상 두 표현은 같다.

  1. `T[]`
  2. `Array<T>`

  ```

      let a:string[]
      let b:Array<string>

  ```

- 객체와 마찬가지로 배열을 const로 만들어도 타입스크립트는 타입을 더 좁게 추론하지 않는다.

  ```

  const test1 = [1, 2, 3]; // number[]
  let test2 = [1, 2, 3]; // number[]

  const test3 = [1, 2, 3] as const; //  readonly [1,2,3]
  let test4 = [1, 2, 3] as const; // readonly [1,2,3]

  ```

# 튜플

- 튜플은 배열의 서브타입으로 `길이가 고정되었고, 각 인덱스의 타입이 알려진` 배열의 일종이다.
- 다른 타입과 달리 튜플은 선언할 때 타입을 명시해야한다.
- 튜플은 이형 배열을 안전하기 관리, 배열 타입의 길이도 조절 => 순수 배열에 비해 안정성을 높일 수 있다.
- 튜플은 선택형 요소(?)도 지원한다.
- 튜플은 최소 길이를 갖도록 지정할 때는 나머지 요소(...)도 사용할 수 있다.
- 하지만 튜플은 push가 가능하기 때문에 주의할것.

```

let test1: [string, string, number] = ['chiman', 'chiHwan', 1234];
test1 = ['chiman', 'chiHwan', true, 1234]; // // boolean 형식은 'number' 형식에 할당할 수 없습니다.

let test2: [string, string, number, boolean?] = ['chiman', 'chiHwan', 1234];
test2 = ['chiman', 'chiHwan', 1234]; // 선택형이라 없어도 가능
test2 = ['chiman', 'chiHwan', 1234, true]; // 선택형이라 있어도 가능

test2.push(4); // 튜플은 push가 가능
console.log(test2); // [ 'chiman', 'chiHwan', 1234, true, 4 ]

let test3: [string, boolean, ...number[]] = ['chiman', true, 1, 2, 3, 4, 5];

```

### 읽기 전용 배열과 튜플

- 일반 배열은 가변인 반면, 상황에 따라 불변인 배열이 필요할 수 있다.
- readonly를 사용하여 불변 배열을 만들 수 있다. => 내용을 갱신할 수 없다.
- 읽기 전용 배열을 갱신하려면 .push, .splice처럼 내용을 바꾸는 동작 대신, .concat, .slice같이 내용을 바꾸지 않는 메서드를 사용해야한다.

```

const test1: readonly boolean[] = [true, true, false];
console.log('test1', test1); // [true, true, false]

let test2 = test1.concat(true);
console.log('test2', test2); // [true, true, false, true]

let test3 = test1.push(false); // 'readonly boolean[]' 형식에 'push' 속성이 없습니다.

type A = readonly string[];
type B = Readonly<string[]>;
type C = ReadonlyArray<string>;


```

# null, undefined, void, never

### null

- 값이 없다는 의미
- 변수 키워드(?)로 let을 사용하면 any를, const를 사용하면 null로 추론한다.

```

// number | null타입

function numberOrNull(x:number){
  if(x<10){
    return x
  }

  return null
}

let test = null // any
const test2 = null // null

```

### undefined

- 아직 정의하지 않았음을 의미
- 아직 값을 변수에 할당하지 않음
- 변수 키워드(?)로 let을 사용하면 any를, const를 사용하면 undefined로 추론한다.

```

let test = undefined // any
const test2 = undefined // undefined

```

### void

- 명시적으로 아무것도 반환하지 않는 함수의 반환 타입
- return문을 포함하지 않은 함수

```

function voidFn() {
  console.log("This is my warning message");
}

```

### never

- 절대 반환하지 않는 함수 타입
  - 예외를 던지는 경우
  - 영원히 실행되는 경우

```

// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message: string): never {
  throw new Error(message);
}

// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop(): never {
  while (true) {}
}

```

# 열거형

- 열거형(enum)은 해당 타입으로 사용할 수 있는 값을 열거하는 기법입니다.
- 열거형은 키를 값에 할당하는, 순서가 없는 자료구조입니다.
- 점 또는 괄호 표기법으로 접근 가능합니다.
- enum 예약어를 사용하여 나타낼 수 있습니다.
- 열거형의 이름은 단수 명사로 쓰고, 첫 문자를 대문자로 하는 것이 관례입니다.
- 키도 앞 글자를 대문자로 표시합니다.

```

enum Language {
  English,
  Spanish,
  Russian,
  Korean,
}

console.log(Language.Korean); // 3
console.log(Language['Korean']) // 3
console.log(Language[3]); // Korean

```

- 기본적으로는 멤버의 순서대로 0부터 숫자를 할당하지만 다른 숫자로 할당할 수 있습니다.

  - 원하는 숫자를 할당할 수도 있습니다. 하지만 그 다음멤버는 이전에 할당한 값에서 1을 더한값으로 할당됩니다.
  - 대신 아래와 같이 기존의 3이 아닌 8로 접근해야 Korean이 출력됩니다.

```

enum Language {
  English = 5,
  Spanish,
  Russian,
  Korean,
}

console.log(Language.Korean); // 8
console.log(Language[3]); // undefined
console.log(Language[8]); // Korean

```

- 문자열도 할당 가능합니다.

- 대신 그 다음부터는 직접 할당해야하며, 할당하지 않으면 에러가 발생합니다.

```

enum Language {
  English = 'english',
  Spanish = 'spanish',
  Russian = 'russian',
  Korean, // 에러발생
}

```

- const enum으로 선언할 경우 자바스크립트 코드로 변환하지 않습니다.
- 대신 숫자형 enum에서 reverse mapping(역방향 찾기)이 되지 않습니다.

```

const enum Language {
  English,
  Spanish,
  Russian,
  Korean,
}

console.log(Language.Korean); // 3
console.log(Language[3]); // 에러발생

```
