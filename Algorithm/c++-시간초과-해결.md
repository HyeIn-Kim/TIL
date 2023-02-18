# C++ 시간초과 해결

2023.02.18

그동안 알고리즘을 Java로 풀다가 보이지 않는 벽에 막혔다!

여기서 더 높은 수준의 풀이를 하려면 C++로 전향하는 게 좋을 것 같아 지금부터 연습하기로 했다.

C++로 알고리즘 풀 때 수행 시간을 줄이는 법을 알아보자!

## 1. `ios::sync_with_stdio(false)`

- `C`와 `C++`의 표준 stream의 동기화를 비활성화
  - **동기화가 무엇인가요?** ㅡ 동기화가 되어 있을 땐 C와 C++의 방식을 혼합해서 사용해도 된다. (예: C의 `printf`, `scanf`, `getchar`, C++의 `cin`, `cout`를 섞어서 씀)
- 장점
  - 기존에 동기화하던 시간이 절약되어 입출력 속도가 향상됨
- 단점
  - 동기화 설정을 꺼버렸으므로 C와 C++ 스타일을 혼용해서 사용할 수 없음 (C++ 스타일인 `cin`, `cout`만 쓰도록 하자!)

## 2. `cin.tie(NULL)`

- `cin`과 `cout` 묶음 해제
- `cin.tie(nullptr)`, `cin.tie(0)` 도 동일

```
이름을 입력해 주세요: 김혜인
```

이라는 프로그램이 있다고 가정해 보자.
원래 `cin`과 `cout`은 묶여 있어서, 입출력이 차례차례 진행된다.

- '이름을 입력해 주세요` 출력 -> 이름을 입력받음

`cin.tie(null)`을 적용하면 `cin`과 `cout`의 묶음을 해제하여 `cin`과 `cout`이 순서와 상관 없이 실행된다! (값을 먼저 입력받고 안내 문구가 출력되는 것처럼)

진짜 프로그램에서는 하면 안 되는 짓이지만 알고리즘 문제를 풀 때는 입출력 시간을 절약하는 용도로 많이 사용한다.

## 3. `endl` 대신 `\n`으로 개행하기

- `endl`은 **개행 + 버퍼 비우기** 의 역할을 수행한다.
- 개행할 때마다 버퍼를 비우면 당연히 입출력 시간도 오래 걸리겠지?
- 그리고 출력 버퍼를 비우기 때문에 `cin.tie(null)`의 효과를 볼 수 없다.
- 따라서 `endl` 대신 `\n`으로 묶어서 출력하면 시간이 덜 걸린다.

## 4. 입출력 시간, 과연 얼마나 차이 날까?

![입력이 짱 빠르다](https://user-images.githubusercontent.com/25563077/219844741-335349c9-540c-4a47-8f09-041ce1916a40.png)

- `scanf(0.9206)`, `cin(2.1742)` 보다 훨씬 빠른 걸 알 수 있다.

![출력도 겁나 빨라진다](https://user-images.githubusercontent.com/25563077/219844781-b6c3bc17-83d8-4f9a-b714-081d52ecbbff.png)

- `cout + endl`까지 사용하면 무려 11.5322의 속도였다.

## References

- [ios::sync_with_stdio(false), cin.tie(0) 쓰는 이유, 백준 시간초과 해결](https://dingcoding.tistory.com/m/62)
- [[BOJ/C++] cin.tie(NULL)과 ios_base::sync_with_stdio(false) 그리고 endl...](https://velog.io/@gogori6565/BOJ-cin.tieNULL%EA%B3%BC-iosbasesyncwithstdiofalse)
- [입력 속도 비교](https://www.acmicpc.net/blog/view/56)
- [출력 속도 비교](https://www.acmicpc.net/blog/view/57)
