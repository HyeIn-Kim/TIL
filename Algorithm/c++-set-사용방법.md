# C++ Set 사용 방법

## STL: Set이란?

- 연관 컨테이너(associative container) 중 하나
- 균형 이진 트리로 구현되어 있음
- `key`라고 불리는 원소들의 집합으로 이루어진 컨테이너
- `key`는 중복 불가
- `insert` 되면 원소는 자동으로 오름차순 정렬됨

<br>

## 사용법

```C++
using namespace std;
#include <set> // <set> 헤더 파일에 들어있음

int main() {
    set<int> s;     // <T> 제네릭으로 변수형을 선언
}
```

<br>

## Iterator

- Java에서는 iterator가 아니라 값을 리턴해줬는데 C++은 iterator라 여기가 제일 헷갈린다!

```C++
set<int>::iterator it; // iterator 선언
set<int>::reverse_iterator rit; // reverse iterator 선언
```

<br>

## 삽입, 삭제

- `s.insert(k)`: 값 k를 set에 추가, 자동 정렬됨
- `s.erase(iter)`: iterator가 가리키는 원소를 삭제 - `s.erase(start, end)`: iterator [start, end) 의 범위를 모두 삭제 -`s.clear()`: 모든 원소를 제거
- `s2.swap(s1)`: set s1과 s2를 swap

<br>

## 값 찾기

- `s.find(k)`: k를 가리키는 iterator를 반환, 없으면 `s.end()`를 반환
- `s.count(k)`: set에 들어있는 값 k의 갯수를 반환
- `s.upper_bound(k)`: 값 k를 초과하는 숫자 중에서 가장 작은 숫자를 가리키는 iterator 반환
- `s.lower_bound(k)`: 값 k와 같거나 큰 숫자 중에서 가장 작은 숫자를 가리키는 iterator 반환
- `s.begin()`: 맨 첫번째 원소를 가리키는 iterator 반환
- `s.end()`: 맨 마지막 원소를 가리키는 iterator 반환
- `s.rbegin()`, `s.rend()`: 거꾸로(reverse) 처음 원소, 거꾸로 마지막 원소를 가리키는 iterator 반환
  - `*s.begin()` = `*--s.rend()`
  - `s.rend()`는 맨 첫 원소를 가리키는 iterator를 반환하는줄 알았는데 진짜 끝이었다. 원소를 가리키려면 `--s.rend()`

<br>

## 기타

- `s.empty()`: set이 비어있는지 boolean 값을 반환
- `s.size()`: set의 크기를 반환
