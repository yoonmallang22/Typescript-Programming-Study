// 제네릭은 타입의 변수다.
// const와 let 키워드와 같이 <> 안에 제네릭 타입 매개변수를 선언한다.
// 타입스크립트의 추론기능을 활용해야 하는 이유
// 구체적이지 않은 타입이 올때

// 타입스크립트가 제네릭을 이용해 구체적인 타입을 추론한다.
// 언제 제네릭 타입이 한정되는가(언제 추론되는가) ? -> '보통' 제네릭을 사용할때 즉, 호출 시점에 한정된다.
// 함수 : 호출(call signature의 일부로 제네릭을 선언했을때), 선언시점에 구체화 할 수 있는데 이는 추론이 아니라 구체화니까 넘어가자
// 클래스 : 인스턴스
// 타입 alias, interface : 사용할때 or 구현할때
type Filter = <T>(array: T[], callbackFn: (item: T) => boolean) => T[];

const filter: Filter = <T>(array: T[], callbackFn: (item: T) => boolean) => {
  const result: T[] = []; // result의 타입추론이 되지않아 직접 어노테이션을 해줘야하는데 이 경우 Filter를 alias로 사용할 필요가 있나 싶다

  for (let i = 0; i < array.length; i++) {
    const item = array[i];

    if (callbackFn(item)) {
      result.push(item);
    }
  }

  return result;
};

// 호출 시점에 타입이 한정된다.
filter([1, 2, 3, 4], (_) => _ < 3);

export {};
