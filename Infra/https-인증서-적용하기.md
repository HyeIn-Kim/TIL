# `https` 인증서 적용하기

## `certbot` 설치

```
sudo apt-get install python3-certbot-nginx
```

## `certbot` 인증서 발급

```
sudo certbot --nginx
```

### 이메일 입력

```
Enter email address (used for urgent renewal and security notices)
 (Enter 'c' to cancel): (여기에 이메일 입력)
```

- 이 과정에서 실수로 취소됐더라도 다시 `sudo certbot --nginx` 로 실행해주면 된다. 아직 인증서 발급이 안 됐다. 쫄지 말자!

### 약관 동의

```
Please read the Terms of Service at
https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
agree in order to register with the ACME server. Do you agree?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: Y
```

- `Y`를 입력하여 동의한다.

### 이메일 수신 동의

```
Would you be willing, once your first certificate is successfully issued, to
share your email address with the Electronic Frontier Foundation, a founding
partner of the Let's Encrypt project and the non-profit organization that
develops Certbot? We'd like to send you email about our work encrypting the web,
EFF news, campaigns, and ways to support digital freedom.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o: Y
```

- 아.. 영어여서 아무 생각 없이 `Y`를 눌렀는데 이메일 수신 동의였다.

### 인증서 발급 완료!

```
Account registered.
Please enter the domain name(s) you would like on your certificate (comma and/or
space separated) (Enter 'c' to cancel): dangdang.haylie.kim
Requesting a certificate for dangdang.haylie.kim

Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/{도메인주소}/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/{도메인주소}/privkey.pem
This certificate expires on 2022-10-20.
These files will be updated when the certificate renews.
Certbot has set up a scheduled task to automatically renew this certificate in the background.

Deploying certificate
Successfully deployed certificate for dangdang.haylie.kim to /etc/nginx/sites-enabled/default
Congratulations! You have successfully enabled HTTPS on https://dangdang.haylie.kim

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
If you like Certbot, please consider supporting our work by:
 * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
 * Donating to EFF:                    https://eff.org/donate-le
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

- 인증서가 발급되었다.
- `fullchain.pem`과 `privkey.pem`의 주소를 외워 두도록 하자.

## 인증서 자동 갱신 설정

- `crontab` 설정 파일 열기

```
sudo crontab -e
```

- 맨 아래에 다음과 같은 문장을 추가한다.

```
0 18 1 * * certbot renew --renew-hook="sudo systemctl restart nginx"
```

- 이제 매달 1일 오후 6시에 인증서를 자동으로 갱신하고 Nginx를 재시작한다!

## 보안 그룹 편집하기

- [Next.js 배포하기](Nextjs-배포하기.md) 문서를 참고하여 `https` 포트인 `443`을 허용해 줍니다.
  ![443 포트를 허용한 화면](https://user-images.githubusercontent.com/25563077/180926820-00c8c3c2-48b9-4276-86cf-fa514037bed0.png)

## Nginx 설정 파일 수정하기

- `certbot`이 자동으로 설정 파일을 수정해 줬지만, 행여나 빠진 부분이 있을 수 있습니다.
- 아래를 참고하여 `/etc/nginx/sites-available/default` 파일의 내용을 수정해 줍니다.

```
# 파일 편집하는 명령어
sudo vim /etc/nginx/sites-available/default
```

```bash
# /etc/nginx/sites-available/default
server {
    server_name dangdang.haylie.kim; # managed by Certbot


        location / {
                proxy_pass http://127.0.0.1:3000;
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }


    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot

    # 여기에 fullchain.pem과 privkey.pem의 경로를 적어주세요!
    ssl_certificate /etc/letsencrypt/live/dangdang.haylie.kim/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/dangdang.haylie.kim/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = dangdang.haylie.kim) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80 ;
        listen [::]:80 ;
    server_name dangdang.haylie.kim;
    return 404; # managed by Certbot


}
```

- `server_name`: 내 도메인 주소를 입력합니다.
- `ssl_certificate`, `ssl_certificate_key`: 방금 전 `certbot`에서 발급받은 `fullchain.pem`과 `privkey.pem`의 경로를 작성해 줍니다.

## Nginx 서버 재시작

```
sudo service nginx restart
```

![https 성공!](https://user-images.githubusercontent.com/25563077/180930904-c351b67a-3fea-4f81-a949-0d27fc2b4446.png)
