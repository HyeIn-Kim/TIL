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

## WebSocket을 사용해서 Frontend-Backend를 연결하기

```bash
# websocket 설치
$ npm i ws
```

### Backend로 WebSocket 사용하기 (server.js)

```javascript
// 1. WebSocket import
import WebSocket from "ws";

// 2. WebSocket Server 생성
const wss = new WebSocket.Server({ server });

// 3. WebSocket 이벤트 듣기
// WebSocket Server가 Connect 됐을 때의 EventListener
// 인자 socket: 연결된 브라우저
wss.on("connection", (socket) => {
  // 브라우저가 연결을 끊었을 때
  socket.on("close", () => console.log("Disconnected from the Browser ❌"));

  // 프론트엔드에서 메세지를 보냈을 때
  socket.on("message", (message) => console.log(message.toString()));

  // 프론트엔드로 메세지를 보내는 메서드
  socket.send("Welcome to Server🎉");

  // socket은 객체이므로 key와 value를 추가할 수 있다!
  socket["nickname"] = "Anonymous";
});
```

### Frontend로 WebSocket 사용하기 (app.js)

```javascript
// JavaScript의 WebSocket API를 사용하여 WebSocket에 연결.
// WebSocket은 프로토콜이므로 http:// 가 아닌 ws:// 프로토콜로 접속
const socket = new WebSocket(`ws://${window.location.host}`);

// 서버와 연결됐을 때
socket.addEventListener("open", () => {
  console.log("Connected to Server ✅");
});

// 서버에서 메세지를 받았을 때
socket.addEventListener("message", (message) => {
  console.log("New Message: ", message.data);
});

// 서버와 접속이 끊겼을 때
socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

// 서버로 메세지를 보내는 메서드
socket.send("hello from the browser!");
```

## `Socket.io`

- `Socket.io`는 실시간 통신을 위한 프레임워크다.
- `WebSocket`이 사용되긴 하지만, `WebSocket`이 지원되지 않아도 `Socket.io`의 기능들을 사용할 수 있다.

```bash
# socket.io 설치
npm i socket.io
```

### `Socket.io`와 `WebSocket` 방식의 차이점

```javascript
// socket 생성
const socket = io();

socket.emit("enter_room", { payload: input.value }, (msg) => {
  console.log("Server is done! It says: ", msg);
});
```

- `emit` 함수를 사용해서 backend로 메세지와 함수를 보낼 수 있음
- 첫번째 인자: 이벤트명 (backend에서도 같은 이벤트명을 사용함)
- 두번째 인자부터: payload
  - string만 보낼 수 있던 websocket과는 달리, 모든 형식으로 보낼 수 있음. 따라서 함수도 보낼 수 있음!
  - 마지막 인자로 함수를 보내면 backend가 frontend에서 해당 함수를 실행하도록 할 수 있음

```javascript
// server.js
// import
import { Server } from "socket.io";

// 서버 생성하기 (http + websocket)
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

// 이벤트 처리
wsServer.on("connection", (socket) => {
  // websocket과는 달리 frontend에서 emit 함수로 보낸 이벤트명을 그대로 사용할 수 있음
  // callback 함수의 첫번째 인자: frontend에서 보낸 메세지
  // 두번째 인자: frontend에서 보낸 함수
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => done("hello!"), 10000);
  });
});
```
