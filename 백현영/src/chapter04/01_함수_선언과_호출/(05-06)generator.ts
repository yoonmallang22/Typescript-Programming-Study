// 제너레이터는 반복문의 제어권을 갖는다는 점에서 의미가 있다.
// 즉, 순수하지않은 함수
// 다시말해, 호출할 때마다 다른 값을 반환해야할때 사용한다.

interface Iterator<T, TReturn = any, TNext = undefined> {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return?(value?: TReturn): IteratorResult<T, TReturn>;
  throw?(e?: any): IteratorResult<T, TReturn>;
}

interface Generator<T = unknown, TReturn = any, TNext = unknown>
  extends Iterator<T, TReturn, TNext> {
  // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
  next(...args: [] | [TNext]): IteratorResult<T, TReturn>;
  return(value: TReturn): IteratorResult<T, TReturn>;
  throw(e: any): IteratorResult<T, TReturn>;
  [Symbol.iterator](): Generator<T, TReturn, TNext>;
}

function* introduceMyselfGenerator(): Generator {
  // function* blueberrySmoothieGenerator(): IterableIterator<number> {
  console.log('안녕하세요');
  yield 1;
  console.log('제 이름은');
  yield 2;
  console.log('백현영입니다.');
  yield 3;
  return 4;
}

let numbers = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};

const generator = introduceMyselfGenerator();

while (true) {
  const { value, done } = generator.next();
  if (done) break;
  console.log(value);
}

// 제너레이터를 실행하면 symbol.interator 프로퍼티를 갖는 이터러블이 반환된다.
// 즉, 반환값은 이터레이터 프로토콜을 따르는 이터러블이다.
