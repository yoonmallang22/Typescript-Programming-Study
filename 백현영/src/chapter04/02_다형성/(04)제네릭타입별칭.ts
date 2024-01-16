import $ from '../../utils/dom';

// 타입 별칭(alias)
// 타입 이름과 = 사이에 정의할 수 있다

type CustomEvent<T> = {
  target: T;
  type: 'click';
};

type ButtonEvent = CustomEvent<HTMLButtonElement>;

const $button = $('#someButton') as HTMLButtonElement;
const $div = $('#someDiv') as HTMLDivElement;

// ✅
const buttonEvent: ButtonEvent = {
  target: $button,
  type: 'click',
};

// ❌
// const divEvent: ButtonEvent = {
//   target: $div,
//   type: 'click',
// };

// 함수 시그니처에도 타입별칭을 사용할 수 있다

//✅
const handleClick = <T extends HTMLButtonElement>(e: CustomEvent<T>) => {
  console.log(e.target);
};

handleClick({
  target: $button,
  type: 'click',
});

// ❌
// const narrowHandleClick = (e: CustomEvent<HTMLButtonElement>) => {
//   console.log(e.target);
// }

// handleClick({
//   target: $div,
//   type: 'click',
// });

// 추론 과정
// 1. 객체에 triggerEvent를 호출 -> 함수 시그니처에 사용할땐 호출시점에 타입이 결정
// 2. arg가 bottonEvent를 구현하고 있는지 확인
// 3. target이 button element 라는것을 인지
// 4. 타입스크립트 추론 : T가 HTMLButtonElement라는것을 추론 (CutomEvent<HTMLButtonElement>로 좁혀줘도 된다)
// 4-1. div태그가 들어가도 문제가 없어지니 extends로 한정할 수 있다.
// 5. 타입스크립트가 T를 HTMLButtonElement로 한정
// 6. 모든 타입이 할당가능한지 확인

export {};
