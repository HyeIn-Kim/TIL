# 22장 `this`

## 22.1 `this` 키워드

- 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기 참조 변수(self-referencing variable)
- `this`를 통해 자신이 속한 객체, 자신이 생성할 인스턴스의 프로퍼티나 메서드를 참조할 수 있음
- `this`가 가리키는 값 = `this` 바인딩은 함수 호출 방식에 의해 동적으로 결정
- 함수 호출 방식에 따른 `this` 값의 차이
  - 전역: 전역 객체 `window`
  - 일반 함수 내부: 전역 객체 `window` (그런데 일반 함수 내부에서는 `window`를 참조할 필요가 없다. 따라서 strict mode에서는 `undefined`)
  - 메서드 내부: 메서드를 호출한 객체
  - 생성자 함수 내부: 생성자 함수가 생성할 인스턴스
