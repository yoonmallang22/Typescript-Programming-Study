// object 와 Object, {} 의 차이

// 1. Object, {}

let obj: {};
obj = { name: 'BK' };

/**
 * 이게 가능한 이유는 구조적 타이핑 시스템과 관련이 있다
 */
obj = 2;
obj = 'BK';

//  ---------------------------------------------
// 2. object
/**
 * https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html#object-type
 * 타입스크립트에는 원시값이 아닌것을 나타낼 방법이 없었다. 그것을 object로 하겠다는것
 */
declare function create(params: object): void;

// ✅
create({ prop: 0 });
create([])
create({})

// ❌ primitive type 은 안된다
// create(42);
// create('string');
// create(false);

const num = 1;
const num2 = Number(1);
const ojj = {};
const ojj2 = Object(1);
/**
 * Object, {}(객체리터럴)
 * 이는 object와는 다르다
 * Object는 생성자다
 * prototype의 끝에는 Object라는 것을 생각해보자
 * Object는 모든 객체의 부모다
 * number, string은 생성자로 만들 수 있기에 할당이 가능하다
 * 쓰지말자.
 */

// ✅
const obj2: Object = 123;
const obj3: Object = 'qwer';

// ❌
// 이는 왜 안될까 ?
// const obj4: Object = null;
// const obj6: Object = undefined;

const arr: string[] = [];

export {};
