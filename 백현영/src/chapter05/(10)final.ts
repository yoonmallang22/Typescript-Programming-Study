// ---final---
// : 말그대로 마지막클래스, 확장(상속) 및 메서드를 추가하거나 오버라이드 할 수 없게 만드는 키워드

class Person {
  private constructor(public name: string) {}
}

// 👍
// class Walker extends Person {}

// ❌ 근데 클래스의 생성도 막힌다.
// const person = new Person('Mark');

// static으로 자신의 인스턴스를 반환하도록 해주자 (다만 api가 변경된건 불편하긴 하다.)
class FinalPerson {
  private name: string;

  private constructor(name: string) {
    this.name = name;
  }

  static create(name: string) {
    return new FinalPerson(name);
  }
}

// ✅ 상속은 막고 인스턴스 생성은 허용됐다.
// class Walker extends FinalPerson {}
const person = FinalPerson.create('Mark');
