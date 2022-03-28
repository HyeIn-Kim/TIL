# CSS inner border 넣기

- CSS의 `border` 속성은 box 바깥에 적용된다.
- 아무 생각 없이 넣었던 `border` 속성 때문에 1px씩 붕 뜨거나 width, height 계산이 꼬일 때마다 너무 괴롭다..!
- `border` 속성이 아닌, `box-shadow`를 잘 조작해서 inner shadow처럼 보이는 방법이다.

```CSS
box-shadow: 0 0 0 1px black inset;
```

```CSS
box-shadow: offset-x offset-y blur-radius spread-radius [color] [inset]
```

- `box-shadow`에는 2 ~ 4개의 속성을 부여할 수 있다. 차례대로
  - `offset-x`: 그림자의 수평 거리를 의미하며 음수는 그림자를 왼쪽으로, 양수는 오른쪽으로 표시한다.
  - `offset-y`: 그림자의 수직 거리를 의미하며 음수는 그림자를 위쪽, 양수는 아래쪽으로 표시한다.
  - `blur-radius`: 값이 클수록 그림자가 흐려진다. 설정하지 않거나 `0`이라면 선명하다.
  - `spread-radius`: 음수는 그림자가 줄어들고, 양수면 그림자가 더 커진다. 기본값은 `0`이다.
  - `color` (선택사항): 그림자의 색상을 지정한다.
  - `inset` (선택사항): `inset` 키워드를 설정하면 그림자가 안쪽으로 생긴다. 기본값은 바깥쪽으로.
- `inset` 키워드를 이용해서 내부 그림자로 설정한 뒤, `offset-x`, `offset-y`를 `0`으로 고정하여 그림자와 요소 위치를 같게 한다. 그 다음 `blur-radius`는 주지 않음으로써 선명하게 하고, `spread-radius` 값을 주면 `border` 크기처럼 적용되고, inner shadow처럼 눈속임할 수 있게 된다.
