# 왜 `VARCHAR`를 key로 쓰면 안될까?

- 쓰지 말라는 건 아니다! 써도 된다. 그러나...

## 문제점

- White space 문자(스페이스, 탭 등 스크린에 보이지 않는 문자들)를 포함할 수 있음
  - 눈에 보이지 않으므로 나중에 디버깅할 때 힘들어진다.
  - 만약 `VARCHAR`를 key로 사용할 거라면, 입/출력에 주의를 기울여야 한다!
- `int`보다 길이가 길어서 쿼리 실행에 더 느리다.

## 결론

- 쓸 수는 있지만, 엔간하면 더 나은 방법인 `int`를 key로 쓰도록 하자!

## References

[왜 VARCHAR를 key로 쓰면 안될까?](https://stackoverflow.com/questions/2103322/varchar-as-foreign-key-primary-key-in-database-good-or-bad)
