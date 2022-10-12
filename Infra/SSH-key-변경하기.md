# SSH key 변경하기

- Amazon EC2 서버 접속용 PEM key 파일을 받았다.
- 해당 key 파일은 초기 패스워드와 같은 존재라 보안을 위해 나만의 key 파일을 생성할 필요가 있었다.

## 나만의 key 파일 생성하기

```bash
$ ssh-keygen -t rsa -b 2048 -N "" -C "<커멘트>" -f <신규키파일>
예) $ ssh-keygen -t rsa -b 2048 -N "" -C "my key" -f ./mykey.pem
```

## key 파일을 원격 서버에 등록

```bash
$ ssh-copy-id -i <신규키파일> -o 'IdentityFile <기존키파일>' -o StrictHostKeyChecking=no -f <접속 주소>
예) $ ssh-copy-id -i ./mykey.pem.pub -o 'IdentityFile T7C.pem' -o StrictHostKeyChecking=no -f ubuntu@XXX.p.ssafy.io
```

- 참고로 해당 명령어는 `Linux` 환경에서만 가능하다.

### Permission Denied (publickey) 에러 해결

```bash
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "haylieKey.pem.pub"
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0664 for 'T7C.pem' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "T7C.pem": bad permissions
ubuntu@XXX.p.ssafy.io: Permission denied (publickey).
```

- 원격 서버에 등록하려는데, 기존의 PEM key 파일을 다른 사용자들도 읽고 쓸 수 있어서 원격 서버에 등록되지 않았다.
- 이 경우, 기존 PEM key 파일의 권한을 나만 읽을 수 있도록 변경해주면 해결된다.

```bash
// 권한 설정
$ ubuntu@ip-XXX:~$ chmod 600 ./T7C.pem

// 다시 시도하면 잘 등록된다!
$ ubuntu@ip-XXX:~$ ssh-copy-id -i haylieKey.pem -o 'IdentityFile T7C.pem' -o StrictHostKeyChecking=no -f ubuntu@XXX.p.ssafy.io
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "haylieKey.pem.pub"

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh -o 'IdentityFile T7C.pem' -o 'StrictHostKeyChecking=no' 'ubuntu@XXX.p.ssafy.io'"
and check to make sure that only the key(s) you wanted were added.
```

## 등록한 key 파일로 서버가 잘 접속되는지 확인하기

```bash
$ ssh -i <신규키파일> <접속 주소>
예) $ ssh -i haylieKey.pem ubuntu@XXX.p.ssafy.io
```

## 기존 key 파일 삭제하기

```
$ vi .ssh/authorized_keys
또는
$ nano .ssh/authorized_keys
```

- 좋아하는 에디터로 `.ssh/authorized_keys` 파일에 접속하면, 1줄 당 key 1개가 나온다.
- 기존 key 파일이 작성된 줄을 삭제하면 해당 key로 서버에 접근할 수 없게 된다.
- **모든 줄을 지우면 서버에 접속할 수 없게 되니 주의하자!**
