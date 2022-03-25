# State의 Immutability 유지하기

> 💡 저기, 그거 알아?

> 스프레드 연산자는 Javascript 객체 속 객체를 Deep Copy 해주지 않는 거?

<br>

솔직하게 이야기하자면, 나는 Javascript를 야매로 공부했다.

자료형도 없겠다, 문법이야 C, Java랑 똑같겠지~ 하고 그때그때 필요한 기능만 구글링해서 구현해도 지금까지는 그렇게 큰 문제가 되지 않았었다. 스프레드 연산자가 뭔지는 몰라도 `[...args]`는 잘만 썼던 것이다….

그러다 공통프로젝트 끝날 때쯤 되니까 내가 프론트엔드 개발자로서 더는 성장하지 않는 느낌이 들었다. 아주 중요한 걸 놓치고 있는 기분? 매번 이렇게 간단한 CRUD, 배열 조작에도 허덕여야 하나? 잠깐 구글링한 걸로는 모르는 내용이 너무 많아서, Javascript 자체가 스트레스로 다가올 정도였다.

<br>

그래서 지금은 일과시간(9-6)이 끝나고 하루에 30분씩 Javascript 문법 책을 독파하고 있는데, 오늘은 책에서 그만 이런 내용을 읽고 말았다.

> Javascript 객체에서,
> 스프레드 연산자나 `Array.slice()`는 객체 속 객체까지 Deep Copy해주지 않는다.

**……진짜로?**

이 문장을 읽은 순간, 내 작고 소중한 `Reducer`가 생각났다. 등골이 쎄했다.

코드를 확인하니 예감이 틀리지 않았다. 객체 속 객체가 제대로 복사되지 않아 Immutability를 지켜야 하는 Reducer의 원칙이 깨져 있던 것이다.

_~~나 공통프로젝트때도 이렇게 했는데...~~_

![급하게 Jira를 올리는 나](https://user-images.githubusercontent.com/25563077/160127876-dad7fd92-b8e0-45d7-8f30-9276e555aee7.png)

<br>
여기서 잠깐! 깊은 복사(Deep Copy)와 얕은 복사(Shallow Copy)란?

자바스크립트의 자료형은 원시형(primitive type)과 객체(object)로 나뉜다.

| 원시 타입                                                            | 객체 타입                                                                       |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| 변경 불가능한 값(immutable value)                                    | 변경 가능한 값(mutable value)                                                   |
| 변수에 할당하면 변수에는 실제 값이 저장됨                            | 변수에 할당하면 참조 값이 저장됨                                                |
| 변수를 다른 변수에 할당하면 원시 값이 복사되어 전달됨: pass by value | 변수를 다른 변수에 할당하면 원본의 참조 값이 복사되어 전달됨: pass by reference |
| number, string, boolean, undefined, null, Symbol                     | 원시 타입을 제외한 나머지 (객체, 배열, 함수 포함)                               |

```jsx
let a = 10;
let b = a;

a = 20;
console.log(a); // 20
console.log(b); // 10
```

깊은 복사란, 변수를 복사했을 때 위 예시처럼 원본과 복사한 값이 개별적으로 동작하여 서로에게 영향을 미치지 않음을 말한다. 원시 타입은 immutable하기 때문에 깊은 복사가 된다.

그러나 객체는 mutable하기 때문에,

```jsx
let a = { name: "Haylie" };
let b = a;

b.name = "Kim";
console.log(a); // { name: 'Kim' }
console.log(b); // { name: 'Kim' }
```

원시 타입처럼 아무 생각없이 복사하면 값이 복사되는 게 아닌, 메모리 참조 주소가 복사된다. 두 개의 변수가 하나의 객체를 가리키게 되는 것. b의 값을 변경하면 a도 바뀌고, 마찬가지로 a의 값을 변경하면 b도 바뀐다. a와 b는 같은 객체를 가리키고 있기 때문이다.

이것을 얕은 복사라고 한다.

그리고 Reducer의 가장 중요한! 원칙이 있는데!

바로 state가 언제나 **Immutability를 지켜야 한다.**

객체, 배열처럼 mutable한 자료형은 원본의 값을 수정하지 말고, 항상 원본 state를 copy한 뒤 copy를 수정하여 새 state에 반영해야 한다. 이 작업은 스프레드 연산자를 사용하면 아주 간단하게 할 수 있다.

```jsx
let a = { name: "Haylie" };
let b = { ...a };
```

스프레드 연산자를 사용하면 객체도 깊은 복사를 할 수 있다!

고 알고 있었는데, 객체”만” 깊은 복사가 되고, 객체 속에 객체가 중첩되면 거기까지는 깊은 복사를 해주지 않는다고 한다.

```jsx
let a = { name: 'Haylie', books: { title: '미라클모닝', author: '할 엘로드' } };
let b = { ...a };

여기서 name은 깊은 복사가 되지만, books 객체까지는 깊은 복사가 되지 않는다.
```

```jsx
// cardReducer.js
const initialState = {
  menuVisible: {
    sticker: false,
    background: false,
    text: false,
  },
  background: {
    color: "transparent",
    image: "",
  },
  stickers: [],
  text: {
    message: "",
    isVisible: true,
    x: 50,
    y: 50,
  },
};
```

```jsx
// cardReducer.js의 cardReducer 함수. 말도 안된다.
switch (action.type) {
    case types.SET_MESSAGE: {
      return {
        ...state,
// 객체도 알아서 복사될 줄 알았는데 아니었다. 나는 기존 state를 그대로 고치고 있었다.
// 지금은 규모가 작아서 문제가 없지만, 나중에 언제 터질지 모르는 시한폭탄이 됐다.
        text: {
          ...state.text,
          message: action.message,
        },
      };
    }

...
```

내가 만든 `cardReducer`는 현란하게 객체의 객체, 배열 안에 객체를 사용하고 있었다...

Redux 원칙 중에 state는 최대한 낮은 차원으로(flat하게) 설계하라는 게 이런 뜻이었구나..

각각 Reducer를 따로 분리할까도 생각해 봤는데, 그러면 카드 정보가 여러개의 Reducer에 흩어져 있어서 나중에 취합하기 힘들 것 같았다. 그렇다면 눈물을 머금고 Reducer를 고치는 수밖에 없다.

```jsx
// 수정 후 cardReducer
switch (action.type) {
    case types.SET_MESSAGE: {
      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: { ...state.background },
        stickers: state.stickers.map((sticker) => sticker),
        text: {
          ...state.text,
          message: action.message,
        },
      };
    }

...
```

객체 프로퍼티는 스프레드 연산자를 사용해서 따로 전개해 주었고, 객체 배열인 `stickers`는 공식 문서를 참고하여 `Arrays.map()` 으로 기존 상태를 그대로 복사했다.

```jsx
case types.ADD_STICKER: {
      const newStickers = state.stickers.map((sticker) => sticker);
      const sticker = {
        id: action.id,
        x: 100,
        y: 100,
        width: 50,
        height: 50,
        rotate: 0,
      };
      newStickers.splice(action.index, 0, sticker);

      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: { ...state.background },
        stickers: newStickers,
        text: { ...state.text },
      };
  }

case types.REMOVE_STICKER: {
      const newStickers = state.stickers.filter(
        (sticker, index) => index !== action.index
      );
      return {
        ...state,
        menuVisible: { ...state.menuVisible },
        background: { ...state.background },
        stickers: newStickers,
        text: { ...state.text },
      };
    }

...
```

배열 원소 추가/삭제는 각각 `Arrays.splice()`, `Arrays.filter()`를 사용하여 구현했다. 간단한 1차원 배열이 아닌, 2차원 객체였기 때문에 공식 문서 보면서 신중하게 고민한 결과다.

`state.stickers.map()`이 자주 사용되다 보니 이건 함수로 빼도 될 듯 하지만……일단은 보류! Reducer가 더 길어지면 그때 못참고 수정하겠지 싶다.

<br>

## 느낀 점

Javascript를 프로젝트 시간 외 따로 공부하면서, 지금 당장 프로젝트에 사용하지 못하는 내용들이라 *이 시간에 기능 구현 하나 더 하는게 맞지 않나……*하고 고민하던 날들도 있었다. 혹은 _책이 두꺼운데 이걸 다 언제 봐_ 하고 지칠 때도 있었고. 그런데 역시 아는 게 많아지니까 코드를 어떻게 개선해야 할지도 눈에 더 잘 들어오고, 코드를 파악하는 것도 전보다 더 쉬워진 기분이 든다. 그동안 개발하면서 막연히 불안하고 초조했던 건 개념을 제대로 몰라서였던 것 같다. 조금씩 한발짝 두발짝 성장하는 내가 되기를! 돌아온 리듀서와 함께 마저 구현해야겠다. 😊 Happy❣

## References

[Immutable Update Patterns - Redux](https://redux.js.org/usage/structuring-reducers/immutable-update-patterns/)
