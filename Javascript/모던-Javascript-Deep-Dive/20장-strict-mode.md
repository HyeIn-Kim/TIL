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

## 20.5 `strict mode`가 발생시키는 에러

- 선언하지 않은 변수를 참조하면 `ReferenceError`
- `delete` 연산자로 변수, 함수, 매개변수를 삭제하면 `SyntaxError`
- 매개변수 이름을 중복으로 사용하면 `SyntaxError`
- `with` 문을 사용하면 `SyntaxError`

  - `with`문: 인수로 전달된 객체를 스코프 체인에 추가함. 코드는 간단해지지만 성능과 가독성이 나빠지는 문제가 있다.

  ```javascript
  (function () {
    "use strict";

    // SyntaxError!
    with ({ x: 1 }) {
      console.log(x);
    }
  });
  ```

## 20.6 `strict mode` 적용에 의한 변화

- 생성자 함수가 아닌 일반 함수에서 `this`를 사용할 필요가 없기 때문에, `this`를 사용하면 `undefined`가 바인딩된다. (에러 X)
- `arguments` 객체에 전달된 매개변수를 함수 안에서 재할당하여 변경해도 원본 `arguments` 객체에 반영되지 않는다.
