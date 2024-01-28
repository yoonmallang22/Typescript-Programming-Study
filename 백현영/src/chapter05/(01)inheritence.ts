// inheritence

// 접근한정자
// public : 누구나 접근 가능
// private : 인스턴스 내부만 접근 가능
// protected : 서브클래스까지 접근가능

type Gender = 'male' | 'female';

// abstract
// 1. abstract로 선언된 클래스는 인스턴스를 생성할 수 없다.
// 2. abstract method는 서브클래스에서 구현하지 않으면 컴파일 에러가 발생한다
abstract class Person {
  public name: string;
  private age: number;
  protected gender: Gender;

  constructor(name: string, age: number, gender: Gender) {
    this.name = name;
    this.age = age;
    this.gender = gender;
  }

  abstract walk(forwardDistance: number): void;
}

// ✅
class FastPerson extends Person {
  walk(forwardDistance: number): void {
    console.log(`${this.name} walks ${forwardDistance}m`);
  }
}

const me = new FastPerson('현영', 3, 'female');
me.walk(10);

// ❌
// class SlowPerson extends Person {
//   constructor(name: string, age: number, gender: Gender) {
//     super(name, age, gender);
//   }

//   // abstract method를 구현하지 않으면 컴파일 에러가 발생한다
// }

// abstract method를 이용해 templete method pattern을 구현할 수 있다.
// templete method pattern

interface Screening {
  isSequence(sequence: number): boolean;
}

// 추상 클래스
abstract class DiscountCondtion {
  protected sequence: number;
  private readonly type: number;

  constructor(sequence: number, type: number) {
    this.sequence = sequence;
    this.type = type;
  }

  abstract isSatisfiedBy(screening: Screening): boolean;
}

// 구체 클래스
class SequenceCondition extends DiscountCondtion {
  isSatisfiedBy(screening: Screening): boolean {
    return screening.isSequence(this.sequence);
  }
}

class PeriodCondition extends DiscountCondtion {
  isSatisfiedBy(screening: Screening): boolean {
    return false;
  }
}

export {};
