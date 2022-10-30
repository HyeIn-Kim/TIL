# Zoom 클론코딩

- [노마드코더 - 줌 클론코딩](https://nomadcoders.co/noom/lobby) 필기 노트

## Server Setup

```bash
# Linux
# 새 디렉토리 생성
mkdir zoom

# 만든 디렉토리로 이동
cd zoom

# Windows
# 새 폴더 만들고 이동 -> 해당 위치에서 cmd 실행

# 프로젝트 초기화
npm init -y
```

```bash
# VSCode에서 현재 폴더 열기
code .
```

### README 만들기

```bash
touch README.md
```

### 패키지 설치

```bash
# Nodemon 설치
npm i nodemon -D
```

- `-D`는 `development mode` 로 설치해 준다는 의미이다.
- 다음과 같은 구조로 새 파일과 폴더를 생성해 준다.

  ![directory](https://user-images.githubusercontent.com/25563077/198792178-6ec2d3ee-1a27-43b8-89e5-b0e499cec874.png)

```bash
# Babel 설치
npm i @babel/core @babel/cli @babel/node @babel/preset-env -D
```

### `Nodemon.json` 초기 설정

- 다음과 같이 `nodemon.json` 파일을 작성해 준다.

```json
{
  "exec": "babel-node src/server.js"
}
```

- `Babel`을 사용해서 `src/server.js`를 실행해 준다는 뜻

### `Babel` 초기 설정

- 다음과 같이 `babel.config.json` 파일을 작성해 준다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

### `package.json`에 `scripts` 항목 추가

- `package.json`에 `scripts` 항목을 추가해 준다.
- 개발 모드에서 `nodemon`을 실행하면, `nodemon`은 `nodemon.json`을 보고 `src/server.js`를 실행해 준다.

```json
  "scripts": {
    "dev": "nodemon"
  },
```

- 작성 완료 된 `package.json`의 예시

```json
{
  "name": "zoom",
  "version": "1.0.0",
  "description": "Zoom clone using WebRTC and Websockets",
  "author": "Haylie Kim",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon"
  },
  "devDependencies": {
    "@babel/cli": "^7.19.3",
    "@babel/core": "^7.19.6",
    "@babel/node": "^7.20.0",
    "@babel/preset-env": "^7.19.4",
    "nodemon": "^2.0.20"
  }
}
```

### `express`와 `pug`을 설치하자

```bash
# express 설치
npm i express

# pug 설치
npm i pug
```

### 서버 실행하기

- `src/server.js`에 다음과 같이 작성한다.
- `3000`번 포트를 사용하는 app을 만들었다!

```javascript
// src/server.js
import express from "express";

const app = express();

console.log("Hi~");

app.listen(3000);
```

- 콘솔에서 app을 실행해 보자

```bash
npm run dev
```

- 화면은 볼 수 없지만, 콘솔과 `localhost:3000`에서 결과를 볼 수 있다.
- 콘솔

```bash
$ npm run dev

> zoom@1.0.0 dev
> nodemon

[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `babel-node src/server.js`
Hi~
```

- `localhost:3000`

![localhost](https://user-images.githubusercontent.com/25563077/198802069-f692e740-e915-4fa1-8443-42b8ed7ec710.png)

- 404 에러가 아니라는 점에 주목!

## Frontend Setup

### `view` 추가하기

- 다음과 같이 디렉토리에 새 파일을 생성한다.

![image](https://user-images.githubusercontent.com/25563077/198827450-7e2864db-7820-4fd5-9de4-989890e19d3a.png)

- `server.js`를 수정한다.

```javascript
import express from "express";

const app = express();

// view engine을 pug로, /views 아래에 있는 파일들을 view로 설정한다.
app.set("view engine", "pug");
app.set("views", __dirname + "/views");

// localhost:3000/을 home.pug로 렌더링
app.get("/", (req, res) => res.render("home"));

// 이 아래는 server setup에서 작성했음
const handleListener = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListener);
```

### public 디렉토리 추가하기

- `server.js`에 다음을 작성한다.

```javascript
app.use("/public", express.static(__dirname + "/public"));
```

- `public` 디렉토리를 추가했더니, 서버가 아니라 `public` 디렉토리 안의 프론트엔드 파일이 수정될 때마다 서버가 재시작한다. `public` 디렉토리를 무시해 주자.
- `nodemon.json` 에 다음을 추가한다.

```javascript
"ignore": ["src/public/*"],
```

### MVP CSS 추가하기

- [MVP CSS](https://andybrewer.github.io/mvp/)는 아주 간단하게 기본적인 CSS를 입힐 수 있는 CSS 스타일시트다.

```html
<link rel="stylesheet" href="https://unpkg.com/mvp.css@1.12/mvp.css" />
```

- `<head>`에 딱 한 줄만 추가해주면 완성!
- 예제 같은 거 따라해 볼 건데 CSS 짜기는 귀찮을 때 유용할 것 같다.
- 우리는 `pug`를 사용하므로 다음과 같이 추가해 주자.

```
link(rel="stylesheet", href="https://unpkg.com/mvp.css")
```

### Node.js에서 Redirect 하기

- `server.js`

```javascript
app.get("/*", (req, res) => res.redirect("/"));
```

- 주소창에 어떤 내용을 입력하건 `/`으로 redirect 시켜준다.

- 221030 1.4까지 들었고 필기는 나중에 한다
