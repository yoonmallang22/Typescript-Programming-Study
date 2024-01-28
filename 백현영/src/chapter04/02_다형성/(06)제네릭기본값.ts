import $ from '../../utils/dom';
// default generic type
// 자바스크립트에서 디폴트파라미터와 유사하지만
// 타입스크립트에서의 디폴트 제네릭은 타입스크립트가 타입을 추론할 수 없을때 사용한다.

const $btn = $('#someButton') as HTMLButtonElement;

type CustomEvent<T extends HTMLElement = HTMLElement> = {
  target: T;
  type: 'click';
};

// 다음과 같이 제네릭을 지정하지 않아도 된다.
const buttonType: CustomEvent = {
  target: $btn,
  type: 'click',
};

// 디폴트 제네릭을 지정할경우 마지막에 와야한다.

// ❌
// type CustomEvent2<Target extends HTMLElement = HTMLElement, Type> = {
//   target: Target;
//   type: Type;
// };

// const submitButton: CustomEvent2<HTMLButtonElement, 'submit'> = {
//   target: $btn,
//   type: 'submit',
// };

// ✅
type CustomEvent2<Type, Target extends HTMLElement = HTMLElement> = {
  target: Target;
  type: Type;
};

const clickButton: CustomEvent2<'click', HTMLButtonElement> = {
  target: $btn,
  type: 'click',
};

export {};
