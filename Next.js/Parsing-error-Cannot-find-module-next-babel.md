# Parsing Error: Cannot find module 'next/babel'

## 해결 방법

1. 프로젝트 루트 경로에 `.babelrc` 파일을 생성하고 다음의 코드를 작성한다.

```
{
  "presets": ["next/babel"],
  "plugins": []
}
```

2. 같은 경로의 `.eslintrc.json` 파일에 `next/babel`을 추가해준다.

```
{
  "extends": ["next/babel", "next/core-web-vitals"]
}

```
