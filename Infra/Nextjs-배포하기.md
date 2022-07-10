# Next.js 배포하기

## Ubuntu 업데이트

- Ubuntu 업데이트를 위해 다음과 같은 스크립트를 작성한다.

```bash
sudo apt-get update
```

```bash
ubuntu@ip-172-31-33-233:~$ sudo apt-get update
Hit:1 http://ap-northeast-2.ec2.archive.ubuntu.com/ubuntu jammy InRelease
Get:2 http://ap-northeast-2.ec2.archive.ubuntu.com/ubuntu jammy-updates InRelease [114 kB]
Get:3 http://ap-northeast-2.ec2.archive.ubuntu.com/ubuntu jammy-backports InRelease [99.8 kB]
Get:4 http://ap-northeast-2.ec2.archive.ubuntu.com/ubuntu jammy-updates/main amd64 Packages [340 kB]
Get:5 http://ap-northeast-2.ec2.archive.ubuntu.com/ubuntu jammy-updates/universe amd64 Packages [141 kB]
Get:6 http://ap-northeast-2.ec2.archive.ubuntu.com/ubuntu jammy-updates/multiverse amd64 Packages [7000 B]
Get:7 http://security.ubuntu.com/ubuntu jammy-security InRelease [110 kB]
Fetched 812 kB in 2s (531 kB/s)
Reading package lists... Done
```

## 배포에 필요한 것들

- Node.js
- 사용했던 패키지 매니저 (`npm`, `yarn` 등)
- pm2 (무중단으로 Node 프로세스를 유지해주는 관리 도구)
- Nginx (리버스 프록시 및 HTTPS 설정)
- Certbot (Let’s Encrypt 인증서 발급 도구)

## Node.js

- `Node.js` 는 Node Version Manager(NVM)으로 설치하는 게 편리하므로, NVM으로 설치해 보자. 다음의 스크립트로 NVM을 설치해 주자.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

[GitHub - nvm-sh/nvm: Node Version Manager - POSIX-compliant bash script to manage multiple active node.js versions](https://github.com/nvm-sh/nvm#installing-and-updating)

- 최신 버전의 설치 방법은 위 깃허브 문서를 통해 확인할 수 있다.

```bash
ubuntu@ip-172-31-33-233:~$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 15037  100 15037    0     0   150k      0 --:--:-- --:--:-- --:--:--  151k
=> Downloading nvm from git to '/home/ubuntu/.nvm'
=> Cloning into '/home/ubuntu/.nvm'...
remote: Enumerating objects: 355, done.
remote: Counting objects: 100% (355/355), done.
remote: Compressing objects: 100% (302/302), done.
remote: Total 355 (delta 39), reused 169 (delta 28), pack-reused 0
Receiving objects: 100% (355/355), 216.09 KiB | 9.39 MiB/s, done.
Resolving deltas: 100% (39/39), done.
* (HEAD detached at FETCH_HEAD)
  master
=> Compressing and cleaning up git repository

=> Appending nvm source string to /home/ubuntu/.bashrc
=> Appending bash_completion source string to /home/ubuntu/.bashrc
=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### 설치 확인

```bash
# 설치가 잘 되었다면 해당 명령어를 입력했을 때 `nvm` 이 나온다.
command -v nvm
```

```bash
ubuntu@ip-172-31-33-233:~$ command -v nvm
ubuntu@ip-172-31-33-233:~$

# 만약 나오지 않을 경우 재접속하거나 `source .bashrc` 명령어를 실행하고 다시 시도해본다.
ubuntu@ip-172-31-33-233:~$ source .bashrc
ubuntu@ip-172-31-33-233:~$ command -v nvm
nvm # 잘 나오는 모습!
```

## npm 설치

- Node.js 최신 버전을 확인하고, 원하는 버전으로 설치한다.

```bash
nvm install 16.15.1
nvm use 16.15.1
```

[다운로드 | Node.js](https://nodejs.org/ko/download/)

```bash
# npm 설치
ubuntu@ip-172-31-33-233:~$ nvm install 16.15.1
Downloading and installing node v16.15.1...
Downloading https://nodejs.org/dist/v16.15.1/node-v16.15.1-linux-x64.tar.xz...
######################################################################### 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v16.15.1 (npm v8.11.0)
Creating default alias: default -> 16.15.1 (-> v16.15.1)

# npm 사용
ubuntu@ip-172-31-33-233:~$ nvm use 16.15.1
Now using node v16.15.1 (npm v8.11.0)
```

## pm2 설치

```bash
npm i -g pm2
```

```bash
ubuntu@ip-172-31-33-233:~$ npm i -g pm2
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.

added 182 packages, and audited 183 packages in 14s

12 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
npm notice
npm notice New minor version of npm available! 8.11.0 -> 8.13.2
npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.13.2
npm notice Run npm install -g npm@8.13.2 to update!
npm notice
```

## 프로젝트 가져오기 (git clone)

```bash
git clone {git 레포지토리 주소}

# 예시
git clone https://lab.ssafy.com/s06-webmobile1-sub2/S06P12C203.git
```

```bash
ubuntu@ip-172-31-33-233:~$ git clone https://github.com/dmswl0311/dangdang.git
Cloning into 'dangdang'...
remote: Enumerating objects: 8983, done.
remote: Counting objects: 100% (15/15), done.
remote: Compressing objects: 100% (14/14), done.
remote: Total 8983 (delta 8), reused 6 (delta 1), pack-reused 8968
Receiving objects: 100% (8983/8983), 47.81 MiB | 9.98 MiB/s, done.
Resolving deltas: 100% (5246/5246), done.
```

### 파일 확인

- `ls` 명령어로 현재 폴더의 파일들을 확인할 수 있습니다.

```bash
ls
```

```bash
ubuntu@ip-172-31-33-233:~$ ls
dangdang
```

## 패키지 설치

### 프로젝트 폴더로 이동

- 당당의 폴더 구조는 다음과 같습니다.

```bash
dangdang
	└─ backend       # 백엔드 폴더
	├─ exec          # 포팅 매뉴얼
	├─ frontend      # 프론트엔드 폴더
	├─ images        # README.md 작성용 이미지
	└─ TIL           # TIL 문서 모음
```

- `frontend` 폴더로 이동해서 npm 패키지들을 설치해 줍니다.

```bash
cd frontend
```

```bash
ubuntu@ip-172-31-33-233:~$ cd dangdang/
ubuntu@ip-172-31-33-233:~/dangdang$ cd frontend
ubuntu@ip-172-31-33-233:~/dangdang/frontend$ ls
README.md   config          nginx              pages   store
api         dockerfile      package-lock.json  public  styles
components  next.config.js  package.json       scss    webRTC
```

```bash
npm i
```

- 패키지를 다 설치했으면 빌드합니다.

```bash
npm run build
```

```bash
ubuntu@ip-172-31-33-233:~/dangdang/frontend$ npm run build

> build
> next build

info  - Loaded env from /home/ubuntu/dangdang/frontend/.env.production
Attention: Next.js now collects completely anonymous telemetry regarding usage.
This information is used to shape Next.js' roadmap and prioritize features.
You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
https://nextjs.org/telemetry

info  - Checking validity of types
error - ESLint: Failed to load config "next/babel" to extend from. Referenced from: /home/ubuntu/dangdang/frontend/.eslintrc.json
info  - Disabled SWC as replacement for Babel because of custom Babel configuration ".babelrc" https://nextjs.org/docs/messages/swc-disabled
info  - Using external babel configuration from /home/ubuntu/dangdang/frontend/.babelrc
info  - Creating an optimized production build
info  - Compiled successfully
info  - Collecting page data
[    ] info  - Generating static pages (0/33)https://i6c203.p.ssafy.io:8443/files/images/default.png
info  - Generating static pages (33/33)
info  - Finalizing page optimization

Page                                              Size     First Load JS
┌ ○ /                                             1.22 kB         555 kB
├   └ css/abdd71e0850182ed.css                    752 B
├   /_app                                         0 B             554 kB
├ ○ /404                                          441 B           555 kB
├ ○ /admin                                        2.94 kB         557 kB
├   └ css/99022ee7dbeca672.css                    1.43 kB
├ ○ /denied                                       432 B           555 kB
├ ○ /interview-question                           2.58 kB         557 kB
├ ○ /interview-question/create                    1.47 kB         556 kB
├ ○ /interview-question/me                        2.55 kB         557 kB
├ ○ /interview-question/update                    1.49 kB         556 kB
├ ○ /self-practice                                1.84 kB         556 kB
├   └ css/49a17988e9e85b91.css                    610 B
├ ○ /self-practice/interview                      4.14 kB         558 kB
├   └ css/0f03d55a91ad9c20.css                    1.26 kB
├ ○ /self-practice/interview/add-questions        3.27 kB         557 kB
├   └ css/792f28b6a5fd96bf.css                    1.65 kB
├ ○ /self-practice/interview/check-devices        3.15 kB         557 kB
├   └ css/5633729ee59b2c78.css                    943 B
├ ○ /self-practice/interview/end                  2.22 kB         556 kB
├   └ css/15b7c99fe367f046.css                    757 B
├ ○ /self-practice/interview/select-questionlist  1.49 kB         573 kB
├   └ css/d6b833dd621cae0d.css                    837 B
├ ○ /team/board                                   2.64 kB         557 kB
├ ○ /team/board/detail                            3.53 kB         558 kB
├   └ css/b0b56d21c68dfbf4.css                    1.51 kB
├ ○ /team/space                                   3.24 kB         557 kB
├   └ css/c9d4a3ea4c85742a.css                    1.22 kB
├ ○ /team/space/board                             3.37 kB         557 kB
├   └ css/822b35cc37318119.css                    1.16 kB
├ ○ /team/space/board/create                      1.34 kB         555 kB
├ ○ /team/space/board/post                        1.33 kB         555 kB
├ ○ /team/space/board/update                      1.62 kB         556 kB
├ ○ /team/space/create                            2.46 kB         557 kB
├ ○ /team/space/resume                            4.51 kB         559 kB
├   └ css/0e2ef7603a1cf6c9.css                    1.63 kB
├ ○ /team/space/resume/create                     1.48 kB         556 kB
├ ○ /team/space/resume/update                     1.47 kB         556 kB
├ ○ /team/space/update                            2.71 kB         557 kB
├ ○ /user/mypage                                  981 B           555 kB
├   └ css/e7622271cb4b00ac.css                    599 B
├ ○ /user/mypage/edit                             1.7 kB          556 kB
├   └ css/28c1529476f0c003.css                    683 B
├ ○ /user/mypage/myroom                           2.71 kB         557 kB
├ ○ /user/oauth2/redirect                         549 B           555 kB
├ ○ /web-conference/[roomName]                    8.3 kB          580 kB
├   └ css/7094ddfa074b3e90.css                    1.46 kB
└ ○ /web-conference/check-devices/[roomName]      2.82 kB         574 kB
    └ css/07097a48e581797c.css                    537 B
+ First Load JS shared by all                     554 kB
  ├ chunks/framework-91d7f78b5b4003c8.js          42 kB
  ├ chunks/main-59f1ed9830ced99b.js               24.9 kB
  ├ chunks/pages/_app-fb54b434af2c37f4.js         485 kB
  ├ chunks/webpack-745aef8b865f38e9.js            1.97 kB
  └ css/32413ebbdf6a5fa6.css                      3.5 kB

○  (Static)  automatically rendered as static HTML (uses no initial props)
```

## pm2로 프로젝트 배포하기

- `pm2` 로 프로젝트를 배포합니다.
- 먼저 `yarn`을 설치합니다.

```bash
# yarn 설치
npm i -g yarn

# yarn 버전 확인
yarn --version
```

```bash
ubuntu@ip-172-31-33-233:~/dangdang/frontend$ npm i -g yarn
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.

added 1 package, and audited 2 packages in 626ms

found 0 vulnerabilities
ubuntu@ip-172-31-33-233:~/dangdang/frontend$ yarn --version
1.22.19
ubuntu@ip-172-31-33-233:~/dangdang/frontend$ pm2 start yarn -w -i 0 --name "next" -- start
[PM2] Writing configuration to /home/ubuntu/dangdang/frontend/next-pm2.json
[PM2] Starting /home/ubuntu/.nvm/versions/node/v16.15.1/bin/yarn in cluster_mode (0 instance)
[PM2] Done.
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ next               │ cluster  │ 0    │ online    │ 0%       │ 32.5mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

- 설치했으면 배포를 해 봅시다!
  - `-w` : 파일 변경 시 자동으로 재시작되는 옵션
  - `-i 0` : CPU 코어 수만큼 프로세스를 생성하는 클러스터 모드

```bash
pm2 start yarn -w -i 0 --name "next" -- start
```

```bash
ubuntu@ip-172-31-33-233:~/dangdang/frontend$ pm2 start yarn -w -i 0 --name "next" -- start
[PM2] Writing configuration to /home/ubuntu/dangdang/frontend/next-pm2.json
[PM2] Starting /home/ubuntu/.nvm/versions/node/v16.15.1/bin/yarn in cluster_mode (0 instance)
[PM2] Done.
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ next               │ cluster  │ 0    │ online    │ 0%       │ 32.5mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

## 배포된 결과물 확인하기

### 어디서 볼 수 있나?

![image](https://user-images.githubusercontent.com/25563077/178150038-37867e66-656b-4d80-9d61-17cde9c95e7c.png)

- 인스턴스를 생성했을 경우, 대시보드의 퍼블릭 IPv4 주소를 주소창에 친다.
- SSAFY에서는: 제공된 url로 접속한다.

### 보안 그룹 편집

- 인스턴스를 직접 만들었을 경우에는 (해당 가이드를 처음부터 따라했다면) 접속이 안 된다. 이는 보안 그룹을 아직 설정해주지 않아서이다.
- 당당의 프론트엔드는 `3000` 번 포트에서 돌아가니, `3000` 번 포트를 외부에 허용해 주어야 한다.

- [네트워크 및 보안] - [보안 그룹] 에 접속합니다.

![image](https://user-images.githubusercontent.com/25563077/178150050-6d6a41d0-ad26-42ce-8086-cd89b48b2812.png)

- `launch-xxx` 로 시작하는 보안 그룹을 클릭한다.

![image](https://user-images.githubusercontent.com/25563077/178150064-3b80449e-aca0-493a-91fe-227cfbb52e11.png)

- [인바운드 규칙 편집]을 눌러 인바운드 규칙에 사용자 지정 TCP, 포트는 프론트엔드 포트인 3000번을 등록합니다.
  - `0.0.0.0/0` 은 모든 IP에서 접속이 가능하다는 뜻

![image](https://user-images.githubusercontent.com/25563077/178150074-283945a2-77b1-4403-b606-a9c7485aff98.png)

- 이제 `{내 url}:3000` 주소로 들어가 봅니다.

![image](https://user-images.githubusercontent.com/25563077/178150094-1260de46-ae3c-4b55-8c0d-963c4b856492.png)

- Next.js를 배포했습니다!

![image](https://user-images.githubusercontent.com/25563077/178150100-e9106e8f-8a9b-4e7b-8695-8ffbf75d0043.png)

- 하지만 백엔드 서버가 배포되지 않아 데이터는 불러오지 못하는 모습이다.
- HTTPS 연결도 아직 안 돼서 WebRTC 기능은 사용할 수 없다.
