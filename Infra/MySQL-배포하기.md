# MySQL 배포하기

## MySQL 설치, 유저 설정

```bash
# 우분투 서버 업데이트
$ sudo apt-get update

# MySQL 설치
$ sudo apt-get install mysql-server

# 구동
$ sudo systemctl start mysql.service
```

```bash
# MySQL 접속
$ sudo mysql

# DB에 외부 접속하기 위해 새로운 계정 생성(%: 어떤 ip로도 접속 가능하도록 하기 위함)
mysql> CREATE USER '계정이름'@'%' IDENTIFIED BY '비밀번호';
# 예시) CREATE USER 'ssafy'@'%' IDENTIFIED BY '0000';

# 생성한 유저에게 권한 부여
mysql> GRANT ALL PRIVILEGES ON *.* TO '계정이름'@'%' WITH GRANT OPTION;
# 예시) GRANT ALL PRIVILEGES ON *.* TO 'ssafy'@'%' WITH GRANT OPTION;

mysql> FLUSH PRIVILEGES;

# MySQL 접속 종료
mysql> quit
bye
```

## MySQL Workbench 설치 후 EC2에 있는 DB와 연결하기

```bash
# 외부 접속 허용 설정
$ cd /etc/mysql/mysql.conf.d
$ vi mysqld.conf
```

- `i`를 눌러 입력 모드로 변경 후, `bind-address`를 `0.0.0.0`으로 수정 후 저장하고 나가기 (어떤 ip에서도 접속 가능하게 설정하기 위함)

![mysqld.conf](https://user-images.githubusercontent.com/25563077/198915091-edf036a0-cfa2-4e56-a590-bcef36438d9d.png)

```bash
# EC2 인스턴스의 3306 포트 열기
$ sudo ufw allow 3306
# 또는 EC2 콘솔 - 인바운드 규칙에서 3306 포트 허용

# MySQL 재시작
$ sudo systemctl restart mysql.service
```

## MySQL workbench 연결

- **!!! MySQL과 MySQL workbench가 모두 설치 되어있는지 확인해야 한다 !!!**
  - MySQL 깔려 있는 줄 알고 workbench만 깔았는데 안돼서 삽질했다.

![workbench 연결 화면](https://user-images.githubusercontent.com/25563077/198915766-c3618e05-a96a-421c-95a7-57e4d228e881.png)

- Connection Name: 연결 이름. 자유롭게 작성
- Hostname: 접속할 주소
- Username: 방금 생성한 유저명
- `Test Connection`으로 테스트 해 보고 `OK`를 눌러 연결 생성

### Failed to Connect to MySQL Unable to connect to localhost 해결법

![Unable to connect to localhost](https://user-images.githubusercontent.com/25563077/198915987-0825d063-3287-40cf-ae25-eb302e531d5d.png)

- 똑같이 따라했는데도 해당 오류가 난다면 접속 방법을 바꿔서 다시 시도해 본다.

![SSH 연결](https://user-images.githubusercontent.com/25563077/198916800-f94973a6-9b69-4347-bfa9-207f0caa1608.png)

- Connection Name: 연결 이름. 자유롭게 작성
- Connection Method: `Standard TCP/IP over SSH` 로 변경
- SSH HostName: 서버 주소 (`:22`는 SSH 포트)
- SSH UserName: 서버에 접속할 때 사용하는 user 이름
- SSH Password: `Store in Vault...`를 눌러 비밀번호 입력 (나는 패스워드는 입력 안 하고 그냥 SSH Key File 항목에 `.pem` 키 파일을 넣었다.)
- SSH Key File: 서버 접속용 `.pem` 키 파일을 업로드.
- MySQL Hostname: `localhost`
- MySQL Server Port: MySQL 포트 (기본은 `3306`)
- Username: DB 접속용 유저명 (방금 생성함)
- Password: `Store in Vault...`를 눌러 비밀번호 입력

![성공 화면](https://user-images.githubusercontent.com/25563077/198917346-7b7128c6-6ce9-4a8a-b63f-fc6644f3c8e6.png)

- 경고창이 하나 뜨는데, `OK`를 눌러주면 연결이 생성되었다!
