// 덕타이핑이라고도 한다.
// 프로퍼티와 메서드가 같다면 같은 타입으로 간주한다.

class Person {
  run() {}
}

class Dog {
  run() {}
}

function move(person: Person) {
  person.run();
}

// ✅
const dog = new Dog();
move(dog);

// 단 private, protected 프로퍼티는 덕타이핑에 포함되지 않는다.
// 식별자가 있는경우에는 다른가보다.
class privatePerson {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class PrivateDog {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
}

function privateSay(person: privatePerson) {}

// ❌
const privateDog = new PrivateDog('badook');
// privateSay(privateDog);

export {};
