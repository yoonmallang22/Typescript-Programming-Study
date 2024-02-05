CommonJS나 AMD 표준을 사용하는 자바스크립트 모듈을 이용할 때는 ES2015 모듈을 사용할 때처럼 단순히 이름으로 임포트할 수 있다.

```typescript
import { something } from "./a/legacy/commonjs/module";
```

기본적으로 CommonJS 디폴트 익스포트는 ES2015 디폴트 임포트와 궁합이 맞지 않으므로 디폴트 익스포트가 필요하면 와일드카드 임포트를 사용해야 한다.

```typescript
import * ad fs from 'fs'
fs.readFile('some/file.txt')
```

tsconfig.json의 compilerOptions에서 {"esModuleInterop": true}를 설정하면 와일드카드 없이 더 자연스럽게 연동할 수 있다.

```typescript
import fs from "fs";
fs.readFile("some/file.txt");
```
