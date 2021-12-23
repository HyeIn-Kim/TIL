# Markdown 작성법

## 제목 작성하기

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

```
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

#을 많이 붙일수록 크기가 작아진다.

## 줄바꿈

Line 1

Line 2

```
Line 1

Line 2
```

## 수평선

---

```
***
---
```

\*\*\*, --- 둘 다 같은 수평선이다.

## 순서 있는 목록

1. 목록 1
2. 목록 2
3. 목록 3

```
1. 목록 1
2. 목록 2
3. 목록 3
```

## 순서 없는 목록

- 목록
- 목록
  - 들여쓰기 하면 하위 목록을 만들 수 있어!

```
- 목록
- 목록
  - 들여쓰기 하면 하위 목록을 만들 수 있어!
```

## 텍스트 강조하기

**굵은 글씨**

_기울어진 글씨_

```
**굵은 글씨**

*기울어진 글씨*
```

## 인용

> "완전멋있는인용한마디"

```
> "완전멋있는인용한마디"
```

## 한줄 코드

이렇게 문장 중간에 `코드`를 넣거나 강조할 수 있어!

```
이렇게 문장 중간에 `코드`를 넣거나 강조할 수 있어!
```

## 코드 블럭

```java
public static void main(String[] args) {
    System.out.println("Hello World!");
}
```

````
```java
public static void main(String[] args) {
    System.out.println("Hello World!");
}
```
````

java 외에도 자기가 사용하는 언어 이름을 적으면 코드블럭을 쓸 수 있다!

## 링크

[SSAFY](https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp)

```
[SSAFY](https://www.ssafy.com/ksp/jsp/swp/swpMain.jsp)
```

[] 안의 텍스트에 () 안의 링크가 걸린다!

## 이미지 삽입

![귀여운 펭귄🐧](https://images.chosun.com/resizer/5RWpufchdlBjPzWIZnKrDum_yl0=/600x399/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/WO4SKPUA62ESBOT2QY7QB5XTAI.jpg)

```
![귀여운 펭귄🐧](https://images.chosun.com/resizer/5RWpufchdlBjPzWIZnKrDum_yl0=/600x399/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosun/WO4SKPUA62ESBOT2QY7QB5XTAI.jpg)
```

[]는 이미지 설명, ()는 링크다.

## 디렉토리 경로

```bash
├── data
│   ├── train
│   ├── test
│   └── validation
├── code
│   ├── train.py
│   ├── classify.py
│   ├── model.py
│   └── dataset.py
└── run.sh
```

이런 멋있는 프로젝트 경로는...

그냥 코드블럭에 `ㅂ+한자`로 열심히 만드는 거였다.

## 표 만들기

| 제목    | 내용    | 설명    |
| ------- | ------- | ------- |
| 테스트1 | 테스트2 | 테스트3 |
| 테스트1 | 테스트2 | 테스트3 |
| 테스트1 | 테스트2 | 테스트3 |

```
|제목|내용|설명|
|------|---|---|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|
|테스트1|테스트2|테스트3|
```

## 표 정렬

| 제목     |       내용 |   설명   |
| :------- | ---------: | :------: |
| 왼쪽정렬 | 오른쪽정렬 | 중앙정렬 |
| 왼쪽정렬 | 오른쪽정렬 | 중앙정렬 |
| 왼쪽정렬 | 오른쪽정렬 | 중앙정렬 |

```
|제목|내용|설명|
|:---|---:|:---:|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|왼쪽정렬|오른쪽정렬|중앙정렬|
|왼쪽정렬|오른쪽정렬|중앙정렬|
```

## 표 확장하기

| 제목         |     내용     |            설명 |
| :----------- | :----------: | --------------: |
|              | 중앙에서확장 |                 |
|              |              | 오른쪽에서 확장 |
| 왼쪽에서확장 |              |

```
|제목|내용|설명|
|:---|:---:|---:|
||중앙에서확장||
|||오른쪽에서 확장|
|왼쪽에서확장||
```
