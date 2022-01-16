# NextJS Introduction

## Setup

```bash
npx create-next-app@latest
√ What is your project named? ... nextjs-intro
Creating a new Next.js app in C:\Users\SSAFY\Desktop\TIL\React\nextjs-intro.

Using npm.

Installing dependencies:
- react
- react-dom
- next
```

`create-next-app@latest` 명령어를 사용하면 자동으로 next가 설치된다.

- typescript 사용 버전

```bash
npx create-next-app@latest --typescript
```

## Library vs Framework

| Library                                                                                                     | Framework                                                                                                                                      |
| ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 개발자가 불러와서 자유롭게 사용하는 것                                                                      | 미리 짜여진 틀을 기반으로 코드를 작성하는 것                                                                                                   |
| `I call the library.`                                                                                       | `Framework calls my code.`                                                                                                                     |
| 예) `React.js`는 내가 원할 때 부르고 커스텀할 수 있는 `Library`: 내 마음대로 프로젝트 구조를 설정할 수 있다 | 예) `Next.js`는 사용법에 맞게 내 코드를 넣으면 동작하는 `Framework`: `pages`에 `.js` 파일을 넣었더니 아무것도 하지 않아도 페이지가 만들어졌어! |

## Pages 폴더로 Routing 하기

- Next.js에서는 `pages` 폴더 밑의 `.js` 파일들이 라우팅 경로가 된다.
  - `pages/about.js` -> `localhost/about`
- 파일은 React Component를 반환하게끔 작성한다.

```javascript
export default function MyComponent() {
  // return jsx..
  return <div></div>;
}
```

- 파일 이름이 경로 이름이 되고, 컴포넌트 이름은 상관 없다.

## CSS Module 사용하기

- 웹 사이트들을 보면, 이상한 클래스명으로 되어있을 때가 있어서 팀에서 합의한 규칙인건가? 했는데 CSS Module을 사용하면 랜덤으로 클래스명을 지어주는 거였다..

1. `fileName.module.css` 파일 생성
2. `fileName.module.css`에 CSS 코드 작성

```css
.nav {
  display: flex;
  justify-content: space-between;
  background-color: tomato;
}
```

3. JavaScript에서 모듈을 import 한다.

```javascript
import styles from "./NavBar.module.css";
```

4. 적용은 이렇게!

```javascript
export default function NavBar() {
  return <nav className={styles.nav}></nav>;
}
```

- `className="nav"`처럼 텍스트로 적는 게 아니라, `className={styles.nav}`로 Javascript로 적어줘야 한다.

5. 한 태그에 여러 개의 클래스가 들어가야 하면 어떡해?

- CSS 파일

  ```css
  .active {
    color: tomato;
  }

  .link {
    text-decoration: none;
  }
  ```

  - 여기서 link는 상시 적용하고, `active`는 현재 선택 중인 메뉴에만 부여하고 싶어!

- 5-1. 백틱으로 여러 개의 클래스 넣기

  ```javascript
  <a className={`${styles.link} ${router.pathname === "/" ? styles.active : ""}`}>
  ```

- 5-2. 배열과 `join()` 메소드 활용하기

  ```javascript
  <a className={[styles.link, router.pathname === "/about" ? styles.active : ""].join(" ")}>
  ```

## Style JSX 사용하기

```javascript
<style jsx>{`
  nav {
    background-color: tomato;
  }
  a {
    text-decoration: none;
  }
`}</style>
```

- JSX 리턴문에다가 `<style jsx>` 쓰고, ` {``} ` 안에 평범하게 CSS문을 쓰면 그대로 동작한다.

## Style JSX의 장점

- CSS 파일을 만들지 않아도 된다.
- 독립적이다: 부모 컴포넌트에서 쓴 태그, id, 클래스명을 자식 컴포넌트에서도 써도 된다!!
  - id, 클래스명을 짓느라 머리아플 일이 줄어든다.

## Global Style 적용하기 & `_app.js`

- `reset`, `font-family` 등 global style을 적용하려면 어떻게 해야 할까?

```javascript
<style jsx global>
  {`
    a {
      text-decoration: none;
    }
  `}
</style>
```

- 간단하게 `global` 키워드를 붙이면 될 줄 알았는데……?
- 다른 페이지(컴포넌트)로 이동하면 `global` 설정이 먹지 않는다.

### `_app.js`

- `Next.js`가 가장 먼저 실행하는 컴포넌트
- 공통 레이아웃 역할
- 모든 컴포넌트에 공통으로 적용할 속성을 관리

```javascript
export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
```

- `Component`: 서버에 요청한 페이지
  - `http://localhost:3000/home` 이라면, `Home` 컴포넌트
- `pageProps`: `getInitialProps`, `getStaticProps`, `getServerSideProps` 중 하나를 통해 페칭한 조기 속성값

## Next.js에서의 static image 관리

- `public` 폴더에 이미지를 넣으면 됨
- `<img src="">`에는 복잡한 경로 대신 `src="/vercel.svg`처럼 간단하게 작성 가능
