// this의 타입을 지정할땐 0번째 인자로 this를 지정해준다.

function getCurrentMonth(this: Date) {
  return this.getMonth() + 1;
}

console.log(new Date());
