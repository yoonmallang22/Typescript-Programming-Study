// extends
// 를 이용한 제네릭 타입의 상한 제한

// 하지만 최소한 이건 T타입에 포함된다는 상한관계(자식 부모 관계처럼...)을 표현하고싶어

// 일반적인 TreeNode
type TreeNode = {
  value: string;
};

// LeafNode : 일반적인 TreeNode이면서 isLeaf의 속성을 갖음
type LeafNode = TreeNode & {
  isLeaf: true;
};

// InnerNode : 일반적인 TreeNode이면서 children의 속성을 갖음
type InnerNode = TreeNode & {
  children: [TreeNode] | [TreeNode, TreeNode]; // 이진트리임을 가정하므로 튜플타입으로 정의
};

// 최소한 트리노드의 속성을 갖고있는 타입만 받고싶다.
// function mapNode<T>(node: T, callbackFn: (value: string) => string): T { // 호출 이전에는 T가 무엇인지 타입스크립트는 알 수 없다. 그렇기에 타입단언이나 extends를 이용해 한정해야한다..
// function mapNode<T> (node : T & TreeNode, callbackFn : (value : string) => string) : T {
function mapNode<T extends TreeNode>(
  node: T,
  callbackFn: (value: string) => string
): T {
  const result = {
    ...node,
    value: callbackFn(node.value),
  };

  return result;
}

// ---Summary---
// 타입가드를 사용해도 되지만 이는 런타임에 체크되므로 타입스크립트가 타입을 추론할 수 없다.
// 함수에 제네릭을 사용하면 함수가 호출될때 타입이 결정된다고 했는데 어째서 에러를 발생시킬까 ?
// 타입이 결정되지 않았을 뿐이지 타입체킹은 수행한다.

// extends를 단순히 상한을 제한하는 키워드라고 이해하지말고 상속관계로 이해해보자
// 일반적인 클래스에서 extends 키워드를 사용하면 좌항에 있는 값은 우항의 자식클래스이다.
// 즉, 자식클래스는 아무리 커져도 부모클래스와 같을뿐 부모클래스를 포함할 수 없다.
// 다시말해 부모클래스(extends의 우항)는 자식클래스(extends의 좌항)의 상한이다.

const treeNode: TreeNode = {
  value: '1',
};
const leafNode: LeafNode = {
  value: '1',
  isLeaf: true,
};
const innerNode: InnerNode = {
  value: '1',
  children: [leafNode],
};

mapNode(treeNode, (value) => value.toUpperCase());
mapNode(leafNode, (value) => value.toUpperCase());
mapNode(innerNode, (value) => value.toUpperCase());

// ❌
function invalidTypeMapNode(
  node: TreeNode,
  callbackFn: (value: string) => string
): TreeNode {
  const result = {
    ...node,
    value: callbackFn(node.value),
  };

  return result;
}

// mapping된 타입 정보가 모두 사라져 TreeNode로 퉁쳐진다.
invalidTypeMapNode(treeNode, (value) => value.toUpperCase());
invalidTypeMapNode(leafNode, (value) => value.toUpperCase());
invalidTypeMapNode(innerNode, (value) => value.toUpperCase());

// >>>여러가지 제한을 걸고 싶을때<<<
// intersection 체이닝(?) 을 사용하면 된다
type HasAge = {
  age: number;
};

type HasPhoneNumber = {
  phoneNumber: number;
};

// 최소한 age와 phoneNumber를 갖고있는 타입만 받고싶다.
function personInfo<PersonInfo extends HasAge & HasPhoneNumber>(
  person: PersonInfo
) {
  return ` age: ${person.age}, phone: ${person.phoneNumber}`;
}

// ✅
personInfo({ age: 22, phoneNumber: 1234567890 });
personInfo({ age: 22, phoneNumber: 1234567890, name: 'Mark' });

// ❌
// personInfo({ age: 22 });

// >>>rest parameter의 타입 추론<<<
function fill(value: string | number, length: number) {
  return Array.from({ length }, () => value);
}

// call 함수로 전달할 인수의 개수를 가변적으로 받는다.
// 즉, call로 넘겨질 args와 callbackFn으로 넘겨줄 args는 동일하다.
function call<T extends unknown[], R>(
  callbackFn: (...args: T) => R,
  ...args: T
): R {
  return callbackFn(...args);
}

const filledStrings = call(fill, 'a', 4);
const filledNumbers = call(fill, 3, 4);

// 좀 더 유연하게 설계해보자
// 위의 경우에는 number | string으로 추론된다. -> 좁혀지지도 않을뿐더러 다른 원시값을 넘겨줄때마다 타입을 추가해야한다

// 👍
function betterFill<T>(value: T, length: number): T[] {
  return Array.from({ length }, () => value);
}

const betterFilledStrings = call(betterFill, 'a', 4);
const betterFilledNumbers = call(betterFill, 3, 4);

export {};
