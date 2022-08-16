# url 수정 & 프론트엔드 재빌드 후 실행하기

## api url 수정

- `당당` 프로젝트를 기존 SSAFY 환경 배포에서 내 도메인 `dangdang.haylie.kim`으로 재배포하면서, 프론트엔드에서 관리하는 api url을 수정해야 할 일이 생겼다.

```
# /frontend/.env.production
NEXT_PUBLIC_BACKEND_URL=https://i6c203.p.ssafy.io:8443
NEXT_PUBLIC_WEBRTC_URL=https://i6c203.p.ssafy.io:8443
NEXT_PUBLIC_FRONTEND_URL=https://i6c203.p.ssafy.io
```

- 기존의 `https://i6c203.p.ssafy.io`를 `https://dangdang.haylie.kim`으로 변경해 주었다.

```
# 수정 후 /frontend/.env.production
NEXT_PUBLIC_BACKEND_URL=https://dangdang.haylie.kim:8443
NEXT_PUBLIC_WEBRTC_URL=https://dangdang.haylie.kim:8443
NEXT_PUBLIC_FRONTEND_URL=https://dangdang.haylie.kim
```

- **자 새로고침 하자~~**

## 프론트엔드 재빌드 하는 방법

- 분명히 서버에 파일이 다 있는데 새로고침을 한다고 반영되는 게 아니었다.
- 파일을 수정 후 다시 빌드를 해 줘야 했기 때문이다.

```
npm run build
```

## 다시! 배포를 시작합시다

- 그리고 빌드를 새로 한다고 해서 서버에 바로 반영되는 것도 아니었다.
- 기존에 서버에 올라가 있는 버전을 내리고, 새로 빌드한 버전을 올려야 돌아간다.
- 먼저, 현재 실행 중인 프로세스를 전부 종료한다.

```
pm2 kill
```

- 다시 실행해주면 끝!

```
pm2 start yarn -w -i 0 --name "next" -- start
```
