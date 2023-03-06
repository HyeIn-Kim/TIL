# C++ 메모

- C++로 알고리즘 풀면서 느낀 점들을 메모

## 메모

- iterator는 ++는 되는데 --는 안된다. --는 reverse_iterator를 써야 한다.
- set 안에 아무 원소도 들어있지 않으면 begin() 같은 함수로 iterator를 받아오려면 runtime error가 난다.
- STL::set은 Red-black tree로 균형 이진 트리라 기본적으로 오름차순으로 정렬되어 있다. 탐색은 이분탐색, 균형 이진 트리라 삽입/삭제 시 매번 정렬하므로 삽입/삭제가 많아질수록 속도가 느려진다.
- STL::unordered_set은 Hash table로 구현된 set이다. 따라서 정렬이 안됨.
- Java에서 pq.pop()을 하면 pop한 원소를 return해 줬는데 C++은 return을 안 해준다.
- `unsigned long long`의 format은 `%llu`
- 부동소수점 자료형으로 이분탐색 할 때는 오차 때문에 100~200번 정도 연산한 근삿값을 많이 쓴다. [참고](https://www.acmicpc.net/blog/view/37)

<br>

## 헤더

```C++
#include <iostream> // cin, cout
#include <cstring> // memset
#include <queue> // queue, priority_queue
#include <algorithm> // max, min
#include <set> // set
#include <unordered_set> // unordered_set
#include <map> // map
#include <vector> // vector, pair
#include <utility> // pair
```
