# MobaXterm으로 서버 접속하기

# MobaXterm으로 서버 접속하기

## MobaXterm 설치

![image](https://user-images.githubusercontent.com/25563077/178015474-41d2d778-bc13-43c7-9895-f60e5ac8819b.png)

- 무료 버전을 설치합니다.

![image](https://user-images.githubusercontent.com/25563077/178015530-56a36397-f6b5-400a-97f5-6a903b465a81.png)

- `Installer edition` 으로 다운로드 받습니다.
- 압축을 풀고 `.msi` 파일을 눌러 설치합니다.

![image](https://user-images.githubusercontent.com/25563077/178015601-82da8692-4df9-4a99-838e-9fff23edaa5e.png)

![image](https://user-images.githubusercontent.com/25563077/178015715-f5dd915a-5881-497a-869c-3e95f2205401.png)

- 약관에 동의하고 쭉쭉쭉 다음을 눌러 설치를 완료합니다.

## MobaXterm 실행하기

![image](https://user-images.githubusercontent.com/25563077/178015780-1dee167b-84e2-41a5-88be-d2e076073db3.png)

- 초기 실행 시, 방화벽을 허용해 줍니다.

![image](https://user-images.githubusercontent.com/25563077/178015834-eef116d4-fc50-442d-9bf0-c8e7d5a46609.png)

- MobaXterm의 첫 실행 화면입니다.
- `Session` 을 눌러 서버에 접속해 봅시다.

![image](https://user-images.githubusercontent.com/25563077/178015906-f9f231b1-2c18-422e-b69e-8fe771c8e65b.png)

1. 맨 윗 줄의 메뉴들은 연결 방법을 나타낸 것입니다. `SSH` 방식으로 연결해 보겠습니다.
2. `Remote host`에는 EC2의 퍼블릭 IPv4 주소 또는 IPv4 DNS 중 하나를 복사하여 붙여넣습니다.

   ![image](https://user-images.githubusercontent.com/25563077/178015956-200bb45b-83ec-4c69-9f82-586e12992b9b.png)

3. `Advanced SSH settings` 에서 `Use private key`를 체크한 뒤, 아까 다운로드 받은 `.pem` 키 파일을 선택합니다.

- OK 버튼을 누르면 검은 화면에 `login as:` 만 적힌 빈 터미널이 뜹니다. `ubuntu` 라고 적은 후 엔터를 누르면 서버에 연결됩니다.
  ![image](https://user-images.githubusercontent.com/25563077/178016010-f9e337fe-26cd-48eb-8082-adef4916dc77.png)
