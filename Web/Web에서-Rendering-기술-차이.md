# Web에서 Rendering 기술 차이

# MPA와 SPA

## MPA (Multi Page Application)

- 전통적인 웹 페이지 방식. 여러 개의 Page로 구성된 Application이다.
- 새로운 페이지를 요청할 때마다 매번 전체 페이지가 재로딩된다.

## SPA (Single Page Application)

- 하나의 Page로 구성된 Application이다.
- 모바일 환경에서도 동일한 API를 사용할 수 있다는 점, 또 `React`, `Vue.js` 등의 모던 자바스크립트 프레임워크가 사용되면서 떠오르고 있다.
- 초기에 한 페이지만 로딩한 후, 최초 페이지를 로딩한 시점부터는 추가 로딩 없이 필요한 부분만 서버에서 받아서 화면을 갱신한다.

# CSR와 SSR

## CSR (Client Side Rendering)

- 처음에 한 페이지만 로딩(HTML, CSS, JavaScript...) 한 뒤, 새로고침이 아니라 필요한 데이터만 받아와서 기존 페이지에 필요한 내용으로 수정해서 보여준다.

![CSR-작동-방식](https://user-images.githubusercontent.com/25563077/147412771-34b06403-3672-41b5-b45b-3d9351ca0cb0.png)

1. 사용자가 서버에 요청을 보낸다.
2. 서버는 데이터를 제외한 HTML 파일을 응답한다.
   - 크롤러 로봇 시점에서는 페이지가 이렇게 보인다고 한다.
   ```html
   <html>
     <head>
       <title>Single Page Application</title>
       <link rel="stylesheet" href="app.css" type="text/css" />
     </head>
     <body>
       <div id="app"></div>
       <script src="app.js"></script>
     </body>
   </html>
   ```
3. 클라이언트에서 렌더링을 시작한다. HTML과 JavaScript를 다운로드 받는다.
   - 사용자에게는 아무것도 보이지 않는다!
4. 다운로드 된 JavaScript가 실행되고, API가 호출된다.
5. 모든 작업이 끝나면 사용자에게 화면이 보이고, 조작할 수 있다.

## SPA는 무조건 CSR 일까?

- 정답은 `NO`.
- SPA의 특징 때문에 CSR 방식을 선택한 것이지, 모든 SPA가 CSR 방식인 건 아니다!

## SSR (Server Side Rendering)

- 사용자가 요청을 보내면, 서버에서 그에 맞는 HTML 문서를 렌더링한 뒤 사용자에게 응답하는 렌더링 방식.

![SSR-작동-방식](https://user-images.githubusercontent.com/25563077/147412772-a98a1783-b11d-4320-bc3a-438e1a4436da.png)

1. 사용자가 서버에 요청을 보낸다.
2. 서버에서는 렌더링된 HTML 파일을 응답한다.
   - 데이터가 이미 포함되어 파일에 들어 있다!
3. 브라우저가 페이지를 렌더링한다.
   - 사용자는 이때부터 페이지를 볼 수는 있지만, JavaScript가 아직 로딩되지 않았으므로 조작은 할 수 없다.
4. 브라우저의 JavaScript 로딩이 끝난다.
   - 사용자는 이제부터 조작이 가능하다!

- `HappyHouse` 프로젝트를 할 때, 프로젝트 규모가 커지니까 초기 로딩이 엄청나게 길어졌는데, CSR 렌더링 방식으로 SPA를 구현했기 때문에 그런 거였구나!

# CSR과 SSR, 둘 중에 뭐가 더 좋을까?

- 특정 방식이 더 좋다고 말할 수는 없다.
- CSR와 SSR의 장/단점을 이해하고 내가 개발하려는 웹사이트의 특징에 맞는 렌더링 방식을 채택하자!

## CSR 장점 👍

- 초기 한 번만 로딩하고, 페이지 이동 시 재로딩이 없으므로 사용자에게 더 나은 UX를 제공한다.
- 필요한 리소스만 부분적으로 로딩하므로 효율적이다.
- 서버에 요청하는 횟수가 훨씬 적으므로 서버 부담이 덜하다.

## CSR 단점 👎

- JavaScript를 번들링해서 한 번에 받기 때문에 초기 로딩 속도가 느리다.
- 검색엔진 최적화(SEO, Search Engine Optimization) 문제가 발생할 수 있다. 대부분의 크롤러 봇이 로딩 전, 빈 페이지를 읽기 때문. 최근 구글 봇은 JavaScript를 실행하여 CSR 방식이어도 웹 페이지를 잘 읽을 수 있다고 한다.
- 프론트에서 비즈니스 로직을 실행하므로 보인 이슈가 발행할 수 있다.

## SSR 장점 👍

- 서버로부터 완성된 웹페이지를 전달받으므로 SEO에 유리하다.
- 초기 로딩 속도가 빨라 사용자가 컨텐츠를 빨리 볼 수 있다.

## SSR 단점 👎

- 페이지 이동 시 깜빡임이 사용자의 UX를 저하시킨다.
- 전체 페이지를 재로딩하므로 불필요한 부분도 다시 로딩해야 한다.
- 서버 렌더링 & 요청에 따른 부하가 있다.
- 모바일 앱 개발 시 추가적인 백엔드 작업이 필요할 수 있다. (생산성 저하)

# CSR에서의 단점을 극복하기: Next.js, Nuxt.js

- 프론트엔드 Job Description을 보면 `Next.js`, `Nuxt.js`가 적혀 있을 때가 있다.
- 둘이 이름이 비슷해서 처음에는 `오타인가?` `둘이 같은 건가?` 라고 생각했었다.
- `Next.js`는 `React`, `Nuxt.js`는 `Vue.js`에서 `SSR`을 지원함으로써, 기존 `SPA + CSR` 방식의 단점을 보완하기 위해 나온 프레임워크라고 한다!
