# 20장 strict mode

## 20.1 `strict mode` 란?

- 암묵적 전역(implicit global): 전역 스코프에도 변수 선언이 존재하지 않을 때, `ReferenceError` 대신 전역 객체에 해당 프로퍼티를 동적 생성하여 전역 변수처럼 사용하는 것
- 오타, 실수 등 잠재적인 오류를 방지하기 위해 해당 코드에 에러를 발생시키는 모드
- `ESLint`를 사용하면 `strict mode`는 물론, 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있어 더욱 강력한 효과를 얻을 수 있다.

## 20.2 `strict mode`의 적용

- 전역 또는 함수의 선두에 `use strict;`를 추가한다.

```javascript
"use strict";

function foo() {
  // 'use strict`; 여기도 가능! 단 선두여야 함!
  x = 10;
}
foo();
```

## 20.3 전역에 `strict mode`를 적용하는 것은 피하자

- 전역에 적용한 `strict mode`는 `script` 단위로 적용된다.
- `strict mode`와 `non-strict mode` 스크립트를 혼용하는 것은 오류를 발생시킬 수 있다.
- 내 코드는 `strict mode`여도, 외부 서드파티 라이브러리는 `non-strict mode`일 경우도 있다.
  - 이럴 때는 즉시 실행 함수로 스크립트 전체를 감싸서 스코프를 구분하고, 즉시 실행 함수의 선두에 `strict mode`를 적용한다.

## 20.4 함수 단위로 `strict mode`를 적용하는 것도 피하자!

- 함수마다 적용할 수는 있지만, 어떤 함수는 `strict`, 어떤 건 `non-strict` 함수인 건 바람직하지 않다.
- 또, 매 함수마다 쓰기는 귀찮다!
- `strict`로 함수를 작성했으면 그 함수를 참조하는 외부 컨텍스트에도 `strict mode`를 적용해야 한다. (오류 발생 위험!)
- 결론
  > `strict mode`는 즉시 실행 함수로 감싼 스크립트 단위로 적용하는 것이 바람직하다.
