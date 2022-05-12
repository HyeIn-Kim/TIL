# Invalid src prop on 'next/image'

## 발생 원인

- `next/image`를 사용하여 이미지를 넣으려고 했을 때 발생했다.
- `public` 내 파일이 아닌, 서버(다른 도메인)의 이미지 파일을 불러와야 해서 발생하는 문제였다. 외부 이미지를 불러올 때 발생하는 에러라고 한다.

## 해결 방법

- `next.config.js`를 열어 다음을 추가한다.

```
const nextConfig = {
 //...
  images: {
    // 이미지를 허용할 도메인을 배열에 추가!
    domains: ["k6c105.p.ssafy.io"],
  },
};
```

- 설정 파일이 변경되었으므로 서버를 재시작해줘야 제대로 돌아간다.
