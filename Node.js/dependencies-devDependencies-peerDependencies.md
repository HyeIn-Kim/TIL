# dependencies vs devDependencies vs peerDependencies

- 그동안 프로젝트를 진행하면서, 아무 생각 없이 `npm install`로 패키지를 설치했었다. 이번에 SSAFY 내부 프로젝트에 컨트리뷰션하면서 프로님께서 `dependencies`와 `devDependencies`의 차이를 언급하셨기에

> **음..? 다른 건가..? 😮**

하고 차이점을 살펴보았다.

![난리났다!!](https://user-images.githubusercontent.com/25563077/180111068-9a3d31c9-819a-4868-949e-e2d23a45b4ed.png)

`Re:tter`의 모든 라이브러리를 `dependencies`에 때려박은 모습

## Dependencies

```
npm install

npm install $package-name
```

- 해당 명령어를 실행했을 때 `package.json`의 `dependencies` 라이브러리에 설치된다.
- 개발, 배포 환경에서 모두 동작하고, 배포 시에 포함된다.
- 사용 예시) 런타임에서 사용되는 라이브러리를 `dependencies`로 추가하자!

## devDependencies

```
npm install

npm install $package-name --dev 또는
npm install $package-name --save-dev 또는
npm install $package-name -D
```

- `npm install` 시 `production` 모드가 아니라면 설치된다.
- 패키지 명을 명시할 경우 `--dev`, `--save-dev`, `-D` 옵션을 붙이면 `devDependencies`에 설치된다.
- 배포 시에 포함되지 않는다.
- 사용 예시) 개발 환경에서는 필요하지만 배포한 뒤에는 필요하지 않은 라이브러리들을 설치한다. `@types`, `eslint`, `prettier`, `testing 라이브러리` 등등...

## peerDependencies

- **나는 이 버전에서만 동작하니까 나를 설치할 때는 꼭 이 버전을 맞춰 주세요!**

## 내가 겪었던 상황

- 라이브러리 버전 업을 하다가 `webpack` 설치가 새로 필요했는데, 무작정 `dependencies`에 설치했었다.
- 프로님께 `dependencies`보다는 `devDependencies` 쪽이 적합할 것 같다는 피드백을 받았고, 둘의 차이에 대해 알아보았다.
- 나 역시 `webpack`은 프로젝트 런타임에서 돌아가는 라이브러리가 아니므로 `devDependencies`가 더 적합할 것이라 판단하였고, `devDependencies`로 수정하여 MR을 작성하였다! (첫 컨트리뷰션 기뻐~!)
