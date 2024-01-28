// 07. Call Signatures
// 08. 문맥적 타입화

// 함수 전체를 타입으로 표현하는 방법
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomething(fn: DescribableFunction) {
  console.log(fn.description + ' returned ' + fn(6));
}

// 타입 수준 : 타입과 타입 연산자를 포함하는 코드
// 값 수준 : 타입수준 이외의 모든것 (자바스크립트로 컴파일되면 유효한 것)

// 함수 표현'식'과 합칠 수 있다.
type SayMyInfo = (name: string, age: number) => void;

const sayMyInfo: SayMyInfo = (name = '김아무개', age) => {
  console.log(name, age);
};
// SayMyInfo 라는 타입을 명시했으므로 타입스크립트가 알아서 추론한다.
// 단, 호출시그니처에는 값을 할당하지 못하므로 디폴트파라미터는 함수 표현식에만 사용할 수 있다.

sayMyInfo('hello', 10);

// overload
// 함수 호출 시그니처를 여러개 정의하는 것
// why ? 함수의 파라미터에 따라 반환값이 달라질 수 있기 때문에

// 타입스크립트는 오버로드를 순서대로 해석한다
// 즉, 위의 코드는 아래와 같이 해석된다.
// 가장 중요한 함수의 구현부는 오버로드 시그니처의 모든 경우를 수용할 수 있어야 한다.
interface Person {
  name: string;
  age: number;
}

function createPerson(name: string, age: number): Person;
function createPerson(name: string, age: string): Person;
function createPerson(name: string, age: number | string) {
  return {
    name,
    age,
  };
}

// 어째서 에러가 발생할까 ?
// function add(a: number, b: number): number;
// function add(a: string, b: string): string {
//   return a + b;
// }

export {};
