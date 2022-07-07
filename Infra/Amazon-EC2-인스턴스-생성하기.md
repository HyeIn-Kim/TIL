# Amazon EC2 인스턴스 생성하기

## Amazon Web Service 가입

계정이 없는 경우에는 이름도 쓰고 영문 주소도 쓰고 우편번호도 찾고 휴대폰 인증도 하고 카드번호도 써 가면서 가입을 합시다.

## 로그인

![image](https://user-images.githubusercontent.com/25563077/177787480-444622a8-eec7-4d6c-893d-281adfb43be3.png)

- 방금 가입한 주소로 로그인합니다.

## 콘솔 접속

![image](https://user-images.githubusercontent.com/25563077/177787554-84f30cc2-9bdb-46db-8540-7d44b1323055.png)

- EC2를 눌러 콘솔에 접속합니다.

![image](https://user-images.githubusercontent.com/25563077/177787626-4613b4a4-aced-4118-8685-61192d440b24.png)

- 오른쪽 상단의 `캘리포니아 ▼` 를 눌러 서울로 리전을 변경해 줍니다.

![image](https://user-images.githubusercontent.com/25563077/177787697-3f5b1832-0736-4d3c-9a3f-0ed1b861ad8d.png)

- 인스턴스 시작을 눌러 인스턴스를 시작합니다.

## 인스턴스 생성하기

### 인스턴스 이름 설정

- 인스턴트 이름을 적어 줍니다.

![image](https://user-images.githubusercontent.com/25563077/177787765-2232ab89-f23b-4965-9e9f-025e1f3b56c8.png)

### 애플리케이션 및 OS 이미지

- `Ubuntu` 운영체제를 사용할 것이므로, 애플리케이션 및 OS 이미지에서 `Ubuntu`를 선택합니다.

![image](https://user-images.githubusercontent.com/25563077/177787850-540609c2-7f57-4e7c-a811-74dd1c65fcc3.png)

### 인스턴스 유형 설정

- AWS 프리티어 요금제에서 사용할 수 있는 `t2.micro` 로 설정합니다.
- 2022.07.06 기준 자동으로 선택되어 있으니 건드리지 않고 다음으로 넘어가도 괜찮습니다.

![image](https://user-images.githubusercontent.com/25563077/177787938-48ee0960-9fdc-45ac-8ffe-6dc3968ebe0b.png)

### 키 페어 만들기

- 만들어진 키 페어가 없으므로, 새 키 페어 생성을 눌러 키 페어를 만들어 줍니다.

![image](https://user-images.githubusercontent.com/25563077/177788030-505b533b-4ee3-4faa-a639-89ee3129d5d8.png)

![image](https://user-images.githubusercontent.com/25563077/177788104-a35341e0-8f1c-4609-9950-7109048d5dd9.png)

- 키 이름을 작성하고 `키 페어 생성` 을 선택합니다.

![발급받은 나의 `.pem` 키](https://user-images.githubusercontent.com/25563077/177788202-3a313603-1f85-4b26-8b21-abea6a2d28d7.png)

발급받은 나의 `.pem` 키

### 네트워크 설정

- `Nginx` 설치 때 다시 수정하기로 하고 넘어갑니다.

![image](https://user-images.githubusercontent.com/25563077/177788338-91f67933-35ed-43ea-b29e-200dc4247a14.png)

### 스토리지 구성

- 용량을 프리티어 최대 용량인 30GB로 변경합니다.
- 마그네틱 스토리지는 HDD입니다. 특별한 일이 아닌 이상 더 빠른 SSD로 설정해 줍니다.

![image](https://user-images.githubusercontent.com/25563077/177788404-4496333a-17b7-421f-9961-39c661b3b4da.png)

- 모든 설정이 끝나면 `인스턴스 시작` 버튼을 눌러 인스턴스를 시작합니다.

![image](https://user-images.githubusercontent.com/25563077/177788467-937bf5f4-efa2-4a69-8416-b70c14a58154.png)

![image](https://user-images.githubusercontent.com/25563077/177788540-157e4dcd-067a-42c1-a019-1327fb272b06.png)

- 쨘! 인스턴스를 시작했습니다!
