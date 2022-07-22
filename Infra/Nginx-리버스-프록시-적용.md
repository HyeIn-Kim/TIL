# Nginx 리버스 프록시 적용

- 지금은 프론트엔드 서버 포트인 `3000`번에서 실행되고 있지만, Nginx의 리버스 프록시를 사용해서 80번 포트로 배포되도록 해 보자!

## Nginx 설치

```
sudo apt-get install nginx-y
```

```
# 버전 확인
nginx -v
```

## Nginx 설정 파일 수정

```
sudo vim /etc/nginx/sites-available/default
```

![Nginx 설정 파일](https://user-images.githubusercontent.com/25563077/180341722-c960c7d1-f878-4774-aab2-129eafae34d9.png)

- 자잘한 주석과 필요없는 부분은 지우고, 다음과 같이 작성한다.

```
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        server_name <도메인 주소>;

        location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }
}
```

## Nginx 재시작

```
# Nginx 문법 검사
sudo nginx -t

# 재시작
sudo systemctl reload nginx
```

- `sudo nginx -t` 시 `server name has suspicious symbols...` 경고가 떴었는데, `server_name` 항목에서 도메인 끝에 세미콜론(`;`)을 빼먹었을 때 나타나는 경고라고 한다.
- 만약 제대로 작성했는데도 이 오류가 난다면, 재시작하면 사라졌었다.

## 잘 나오는지 확인

![당당하게 리버스 프록시 적용하자!](https://user-images.githubusercontent.com/25563077/180342829-9338b2c0-29cc-4284-955f-85048dc51129.png)

- 생각보다 엄청 간단하게 돼서 깜짝 놀랐다!! 설마 나.. 배포의 신?
