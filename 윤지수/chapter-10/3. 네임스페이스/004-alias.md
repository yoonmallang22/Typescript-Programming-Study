네임스페이스 계층이 너무 길어졌다면 짧은 별칭을 지어줄 수 있다. 문법은 비슷하지만 별칭에서는 구조 분해 할당을 지원하지 않는다.

```typescript
// A.ts
namespace A {
  export namespace B {
    export namespace C {
      export let d = 3;
    }
  }
}

// MyApp.ts
import d = A.B.C.d;

let e = d * 3;
```
