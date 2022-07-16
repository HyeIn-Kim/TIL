# 나만의 도메인과 AWS 연결하기

## 내 도메인 만들기

도메인을 AWS와 연결하기 위해서는 (당연하게도) 나만의 도메인이 필요한데요.

수많은 도메인 구매 사이트 중 저는 [가비아](https://www.gabia.com/)를 사용해서 저만의 도메인을 구매해 보았습니다.

![image](https://user-images.githubusercontent.com/25563077/179343878-ead13255-222a-4736-b677-5885954c4aba.png)

참고로 저의 도메인은 [haylie.kim](http://haylie.kim) . 말도 안 되게 멋있습니다!

원하는 도메인을 검색해서 구매하면 나만의 도메인이 생깁니다.

<br>

## 탄력적 IP 만들기

- AWS의 [**[네트워크 및 보안] - [탄력적 IP]**](<(https://ap-northeast-2.console.aws.amazon.com/ec2/v2/home?region=ap-northeast-2#Addresses:)>) 로 접속합니다.

![image](https://user-images.githubusercontent.com/25563077/179343909-e538b3ad-c0b2-480c-830e-1da4f77860b1.png)

- **[ 탄력적 IP 주소 할당 ]** 을 눌러 탄력적 IP를 할당합니다.

![image](https://user-images.githubusercontent.com/25563077/179343938-ba1a56aa-3603-4d5e-8870-7f9737fad1b4.png)
![image](https://user-images.githubusercontent.com/25563077/179343941-eaf7142d-b773-4d68-b367-baf7d762a32b.png)

## 탄력적 IP 주소를 인스턴스와 연결하기

- 쨔쟌! 탄력적 IP 주소가 생겼습니다! IP 주소를 눌러 상세 정보로 이동합니다.

![image](https://user-images.githubusercontent.com/25563077/179343948-e9520f46-3025-4de0-bf42-4a6d36bf0e78.png)

![image](https://user-images.githubusercontent.com/25563077/179343962-253db472-f5d8-4b36-b043-4055ef577dd0.png)

- **[ 탄력적 IP 주소 연결 ]** 버튼을 클릭합니다.

![image](https://user-images.githubusercontent.com/25563077/179343980-93fbf03a-8e3a-4eaa-a6a3-e98f4d88b9fb.png)

- 인스턴스 항목에서 현재 내가 도메인과 연결하려고 하는 인스턴스를 선택하고 연결을 누릅니다.

![image](https://user-images.githubusercontent.com/25563077/179343999-20e440fa-db3b-49d2-999a-f98b6e75a040.png)

- 방금 설정한 탄력적 IP 주소로 접속하여 연결이 잘 되었는지 확인합니다.

<br>

## 도메인 연결하기

도메인을 연결하기 위해서는 두 가지 일을 해야 합니다.

1. 내 도메인에 AWS IP 등록하기
2. AWS에서 내 도메인 등록하기

차근차근 진행해 보겠습니다.

<br>

### 내 도메인에 AWS IP 등록하기

- [가비아 DNS 관리 사이트](https://dns.gabia.com/dns/internals/total_set)에 접속합니다.

![image](https://user-images.githubusercontent.com/25563077/179344036-5c8f7d5d-8bd6-4414-8360-f5bb0892c8f9.png)

- 레코드 수정을 클릭하여 등록합니다.
  - 타입: A
  - 호스트: `dangdang.haylie.kim` 이라면 `dangdang` 을 입력합니다.
  - IP 주소: 아까 만든 탄력적 IP 주소를 입력합니다.

![image](https://user-images.githubusercontent.com/25563077/179344039-d44a3a66-93fd-4287-af75-76f4f1536b1b.png)

<br>

### AWS에서 내 도메인 등록하기

- AWS의 [**Route 53 콘솔 - [ 호스팅 영역 ]**](https://us-east-1.console.aws.amazon.com/route53/v2/hostedzones#) 으로 접속합니다.

![image](https://user-images.githubusercontent.com/25563077/179344055-c9dd1d57-9e15-4dd1-b84c-2e17951b1bda.png)

- **[ 호스팅 영역 생성 ]** 을 눌러 내 도메인을 등록해 봅시다.

![image](https://user-images.githubusercontent.com/25563077/179344079-f1a4529e-923d-4c3a-9540-651ca80b87d4.png)

- 도메인 이름에 내 도메인을 적어주면 되는데요. 여기서 주의할 점은 최상위 도메인을 적어야 한다는 점입니다.
- 예를 들어, 내가 `dangdang.haylie.kim` 이라는 주소로 사이트를 연결하고 싶다면, 최상위 도메인인 `haylie.kim` 을 작성해야 합니다.
- 다 작성했다면 스크롤을 아래로 내려 **[ 호스팅 영역 생성 ]** 을 눌러 호스팅을 생성합니다.

![image](https://user-images.githubusercontent.com/25563077/179344090-83539cd9-c3a0-4174-a66a-3af2816a1207.png)

- 이제 생성된 도메인 이름을 눌러 상세 정보로 이동합니다.

![image](https://user-images.githubusercontent.com/25563077/179344104-3c0e21fa-cae1-414a-a501-cd0b6f7475f1.png)

- **[ 레코드 생성 ]** 을 눌러 아까 가비아에서 등록한 레코드를 입력합니다.

![image](https://user-images.githubusercontent.com/25563077/179344111-8d97c2be-86c0-4b34-ba0d-23c52b3324b5.png)

- 레코드 이름: `dangdang.haylie.kim` 이라면 `dangdang`
- 값: 아까 생성한 탄력적 IP 주소 입력
- **[ 레코드 생성 ]** 버튼을 눌러 레코드를 생성합니다.

## 내 도메인이 연결되었는지 확인하기

![image](https://user-images.githubusercontent.com/25563077/179344127-f3b4a6f2-a608-425e-97d7-8e37a6948636.png)

- 여기까지 끝냈다면, 내 도메인으로 사이트에 접속해 봅니다.
- 무사히 화면이 뜨면 성공!
