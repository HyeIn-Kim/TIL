# styled-components 가이드

- `Re:tter` 당시 백엔드 팀원들이 CSS를 도와주기로 했었는데, 그때 작성한 styled-components 사용 가이드.

## JSX

```jsx
const element = <h1>Hello, world!</h1>;
```

React에서는 `JSX`라는 문법을 사용합니다. `JSX`는 자바스크립트 문법을 확장한 것으로써, 자바스크립트와 HTML을 혼용해서 사용할 수 있도록 도와줍니다.

```jsx
// /frontend/src/routes/card/Card.js

import MenuBar from "../../components/card/MenuBar";
import Card from "../../components/card/Card";
import Options from "../../components/card/Options";

export default function CardPage() {
  return (
    <div>
      <MenuBar />
      카드 페이지
      <Card />
      <Options />
    </div>
  );
}
```

- 아주 간단하게 설명하자면 각 파일(모듈이라고 합니다)에서 `export default`가 붙은 함수의 `return` 값이 화면에 보여진다고 생각하면 됩니다.
- `<div>` 같은 html 태그 외에도 사용자 지정 태그(`컴포넌트`)를 위처럼 사용할 수 있습니다.
  - 컴포넌트 이름은 항상 대문자로 시작합니다.

JSX에 대해 더 자세히 알고 싶다면 아래 링크를 참고해 주세요!

- [JSX 소개 - React](https://ko.reactjs.org/docs/introducing-jsx.html)

<br>

## styled-components

- styled-components는 CSS랑 JS를 함께 쓰기 좋은 CSS-in-JS 라이브러리입니다.
- `id`, `class` 등 선택자의 중복 걱정 없이 맘껏 CSS를 짤 수 있습니다.
- 변수를 사용하는 등 동적으로(자바스크립트로) 변하는 CSS 속성에 편하게 대응할 수 있습니다.
- CSS 적용 범위가 해당 모듈 안으로 한정되어 다른 파일, 컴포넌트에 영향을 미치지 않아 편리합니다.

### 1초만에 알 수 있는 사용 방법

```jsx
export default function Component() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
```

이런 JSX가 있다고 가정해 보겠습니다.

먼저, styled-components를 사용하기 위해 import 합니다.

```jsx
import styled from "styled-components";

export default function Component() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}
```

`h1` 태그의 스타일을 적용하려면...

```jsx
import styled from "styled-components";

export default function Component() {
  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
}

const Heading1 = styled.h1`
  color: red;
`;
```

import한 `styled` 뒤에 적용하고 싶은 태그 명을 적고, 템플릿 리터럴 안에 우리가 지금까지 짜던 대로 CSS를 작성하면 끝! 이 아니라

```jsx
import styled from "styled-components";

export default function Component() {
  return (
    <div>
      <Heading1>Hello World!</Heading1>
    </div>
  );
}

const Heading1 = styled.h1`
  color: red;
`;
```

기존의 `<h1>` 태그를 우리가 만든 `<Heading1>` 컴포넌트로 교체하면 CSS가 적용됩니다!

클래스 이름은 알아서 붙여주니까 이름 짓겠다고 머리를 쓰지 않아도 되겠네요.

스타일링이 되는 컴포넌트라서 `styled-components` 인가 봅니다.

자식 선택자, `:hover` 등의 가상 선택자도 CSS 쓰듯이 사용하면 됩니다.

여러분의 멋있는 CSS 실력을 뽐내주세요.

<br>

### 스타일 상속하기

CSS를 작성하다 보면 **와.. 이거 속성 겹치는데 또 써야 하나..** 같은 순간이 찾아옵니다.

```jsx
import styled from "styled-components";

export default function Component() {
  return (
    <div>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </div>
  );
}

const Button = styled.button`
  width: 200px;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background-color: tomato;
`;
```

귀여운 토마토색 버튼을 만들었습니다.

똑같은 크기의 버튼인데 배경색만 보라색으로 바꾸고 싶으면 어떻게 할까요?

아마 제일 먼저 이런 방법이 떠오를 거라고 생각합니다.

```jsx
import styled from "styled-components";

export default function Component() {
  return (
    <div>
      <Button>Button 1</Button>
      <PurpleButton>Button 2</PurpleButton>
    </div>
  );
}

const Button = styled.button`
  width: 200px;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background-color: tomato;
`;

const PurpleButton = styled.button`
  width: 200px;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background-color: purple;
`;
```

오마이갓..

```jsx
import styled from "styled-components";

export default function Component() {
  return (
    <div>
      <Button>Button 1</Button>
      <PurpleButton>Button 2</PurpleButton>
    </div>
  );
}

const Button = styled.button`
  width: 200px;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background-color: tomato;
`;

const PurpleButton = styled(Button)`
  background-color: purple;
`;
```

이렇게 앞서 정의한 `Button` 컴포넌트를 받아 속성을 정의하면 스타일을 상속받을 수 있습니다.

와! 최고다!

스타일뿐만 아니라 내가 만든 컴포넌트 위에 스타일을 입힐 수도 있습니다.

- [styled-components: Basics](https://styled-components.com/docs/basics#styling-any-component)

<br>

### props를 사용해서 CSS 속성값으로 적용하기

컴포넌트니까 당연히! `props`를 사용하여 CSS 속성값으로 적용할 수 있습니다.

당연히 Javascript 변수를 `props`로 넘기는 것도 가능합니다.

```jsx
import styled from "styled-components";

export default function Component() {
  return (
    <div>
      <Button color="orange">Button 1</Button>
      <Button color="purple">Button 2</Button>
    </div>
  );
}

const Button = styled.button`
  width: 200px;
  padding: 1rem 1.5rem;
  border-radius: 10px;
  background-color: ${(props) => props.color};
`;
```

진짜 대박 미쳤습니다.

- [styled-components: Basics](https://styled-components.com/docs/basics#passed-props)

<br>

### attr를 사용하여 동적으로 스타일 변경하기

style만 적용 가능한가 하면, `attr`을 사용하여 태그 속성도 지정할 수 있습니다.

```jsx
import styled from "styled-components";

export default function Component() {
	return (
		<div>
			<Button color="orange">Button 1</Button>
			<Button color="purple">Button 2</Button>
		</div>
	);
}

const Button = styled.button.attrs(props => ({
	id: 'my-button'
	className: 'btn'
	style: {
		// 인라인 스타일 지정 가능
	}
}))`
	width: 200px;
	padding: 1rem 1.5rem;
	border-radius: 10px;
	background-color: ${props => props.color};
`;
```

- 어려운 얘기) styled-components는 스타일이 변경될 때마다 클래스를 새로 만든다고 합니다. 따라서 Javascript에서 동적으로 자주 변경되는 속성(예: 스티커 이동시 `top`, `left`)은 ``안에 넣지 말고`attrs`의 `style` 안에 넣어 낭비를 줄이도록 합시다.

<br>

### 그 외 어려운 내용은

- [styled-components: Basics](https://styled-components.com/docs/basics#getting-started)

공식문서와 구글 선생님이 도와주실 겁니다!

(공식 문서가 매우 짧고 간결하니 한번쯤 읽어보는 것을 권장함)
