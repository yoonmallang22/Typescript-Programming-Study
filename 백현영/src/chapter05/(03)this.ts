// this
// this의 반환타입을 지정할 수 있다.

class Set {
  has(value: number): boolean {
    return true;
  }
  add(value: number): Set {
    return this;
  }
}

class MutableSet extends Set {
  delete(value: number): boolean {
    return true;
  }

  add(value: number) {
    console.log(this);
    return this;
  }
}

const mutableSet = new MutableSet();
mutableSet.add(4); // Set.add의 반환값을 this로 지정하지 않아도 알아서 MutableSet으로 추론하는데...?

export {};
