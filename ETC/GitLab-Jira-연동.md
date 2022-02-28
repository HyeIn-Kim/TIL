# GitLab과 Jira 연동하기 (Jira Smart Commit)

## 설정 방법

1. GitLab Settings > Integrations 메뉴로 들어간다.
   ![1](https://user-images.githubusercontent.com/25563077/155924765-49e5d2ce-476b-4638-b258-e143677fefe0.png)

2. Integrations에서 쭉쭉 스크롤을 내려 Jira를 찾아봅시다.
   ![2](https://user-images.githubusercontent.com/25563077/155924849-0985e2e7-44a9-465b-9fa7-cff665b7e0ac.png)

3. Jira를 클릭해서

- Active에 체크 - Commit, Merge Request 체크 되어있는지 확인!
  ![3](https://user-images.githubusercontent.com/25563077/155924960-b9c66feb-ecf3-470d-a707-15517fa18713.png)

4. 다음 항목을 잘 입력해주고 Save

- Web URL: Jira 사이트의 베이스 주소를 입력해준다. `https//myjira.jira.com`
- UserName or Email: Jira 아이디
- Password or API Token: 비밀번호
  ![4](https://user-images.githubusercontent.com/25563077/155925065-f8f0b5f3-0bdb-4b2f-b06b-dd761f985cc6.png)

## 사용 예시

- 연동이 되었다면, 커밋 메시지에 Jira 이슈 번호를 작성하여 커밋한다.
- Jira 이슈 번호에 마우스를 가져다대면 자동으로 해당 이슈로 이동하는 링크가 생겨 있는 걸 알 수 있음!
- 참고로 `[]`는 안 써도 된다. 이슈 번호만 쓰면 넘어감! 해당 프로젝트에서 커밋 컨벤션을 `[Jira 이슈 번호] 태그: 커밋메시지`로 설정했기 때문.
  ![GitLab 적용 화면](https://user-images.githubusercontent.com/25563077/155934407-713f904c-449c-4830-90cc-0f76e8aba0b6.png)
