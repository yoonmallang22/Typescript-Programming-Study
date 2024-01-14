/**
 * ---Enum---
 *
 * **컴파일** 타임에 고정된 객체
 * 트리셰이킹이 '완벽히' 적용되지 않는다 -> 자바스크립트 코드로 런타임에 실행된다.
 * -> const enum을 사용하면 되긴하다.
 * Tree shaking : 최적화 기법 중 하나로 사용하지 않는 코드를 제거하는 기법
 */

// 숫자형 enum
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}

// 문자형 enum
enum Direction2 {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

const move = (direction: Direction) => {
  if (direction === Direction.Up) {
    console.log('go up!');
  }
};

// ✅
move(Direction.Up);
move(Direction.Down);

const move2 = (direction: Direction2) => {
  if (direction === Direction2.Up) {
    console.log('go up!');
  }
};

// ✅
move2(Direction2.Down);

// ❌
// move('Up');

/**
 * const enum
 * 인덱스 접근을 막을 수 있다
 */
const enum Fruit {
  Apple,
  Orange,
  Banana,
}

// ❌
// Fruit[2];

const buyApple = (name: Fruit) => {
  return Fruit.Apple;
};
