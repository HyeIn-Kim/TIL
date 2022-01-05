# Jira, JQL 특강

## Why - 왜 Jira 인가?

### Issue Tracking

- 팀에서 쓰는 to-do list
- Issue: 우리 팀이 할 일 (개발 관련, 개발 외...)
- 팀 단위이므로 각 Issue마다 담당자를 정한다.
- Tracking: Issue별로 상태를 정해 놓고, 일이 얼마나 진행되었는지 확인

### Project Management

- Issue Tracking Software는 많은데 왜 Jira?
- Jira는 프로젝트 Analysis, Planning도 가능하다.

### Agile

- [애자일 선언](https://agilemanifesto.org/iso/ko/manifesto.html)
- Scrum: 백로그에 이슈를 담아두고, 2주정도의 스프린트를 생성. 각 스프린트에서 백로그의 일부 이슈를 해결. 반복
- Kanban: 스프린트 없이 이슈를 해결. 개인에게 너무 많은 일이 몰리지 않도록 조절

### DevOps Development Operations

- 애자일: 먼저 제품을 개발하고 빨리 배포를 하자!
- 빨리 배포를 하려면...? 애자일이 정착되면서 자연스레 나오게 됨
- 반복적인 작업을 Tool을 이용해서 자동화
- 팀원 모두가 알고 있는 하나의 공유된 지표가 필요
- 장애나 이슈가 있을 때 혼자만 알지 말고 팀원들과 공유 필요

### SRE Site Reliability Engineering

- 가용성 99%: 24시간 서비스 중 1% 장애시간 외 다 돌아가게 해주겠다!
- 신뢰성 1주일 1시간 이내: 1주일 내 장애 1시간 이내로 발생하게 하겠다!
- 장애를 내지 않고 얼마나 이 사이트의 신뢰성을 높일 수 있을까?
- 어떻게 하면 운영을 효율적으로 할 수 있을까?

### 이슈 만들기

- 큰 틀인 Epic 안에 Story, Task, Bug가 들어감
- Summary: 제목
- Reporter: 생성자, 보고자
- Components: 컴포넌트
- Description: 이슈 설명
- Fix Versions: 버전
- Priority: 중요도
- Labels: 태그 (자유, 형식을 맞춰야 분류됨)
- Linked Issue: 관련 이슈
- Assignee: 담당자
- Epic Link: 이 이슈는 어떤 에픽에 속하나?
- Sprint: 이 이슈는 어떤 스프린트에 속하나?

### Component

- 기능별로 Component를 생성할 수 있음

### Releases

- 버전을 생성해두면 이슈에서 선택 가능

## JQL

- Jira Query Language
- Jira Issue를 구조적으로 검색하기 위해 사용하는 언어
- SQL과 비슷한 문법
- Jira의 각 필드들에 맞는 특수한 예약어들을 제공
- 쌓인 Issue들을 재가공해 유의미한 데이터를 도출해 내는데 활용 (Gadget, Agile Board 등)

## Basic Query & Advanced Query

- Basic Query
  - GUI로 간단하게 선택가능
- Advanced Query
  - 쿼리를 작성해서 좀 더 복잡한 조건을 작성 가능
  - Query 적용 후 Save as를 누르면 filter를 저장 가능
  - Filter는 다른 사람들과 공유 가능, 즐겨찾기 가능

## JQL Operators

- =, !=, >, >=
- in, not in
- ~(contains), !~(not contains)
- is empty, is not empty, is null, is not null

## JQL Dates

- 오늘을 기준으로 상대적인 날짜를 검색
- 내일: 1d, 어제: -1d
- 다음주: 1w, 저번주: 1w

## JQL Functions

- endOfDay() 24시
- startOfDay() 0시
- endOfWeek() Saturday
- startOfWeek() Sunday
- endOfMonth(), startOfMonth(), endOfYear(), startOfYear()
- currentLogin() 내가 로그인한 뒤로 생긴 이슈
- currendUser() 현재 로그인한 사용자가 담당자인 이슈

## Dashboard 만들기

- Dashboards -> Manage Dashboards
- 메인 -> ... -> Create Dashboard
- 필터처럼 공유할 수 있음
- Add gadget을 눌러 차트나 표를 추가한다
- Filter Results: 검색한 필터 결과를 표로 보여준다
- Assigned to Me: 내게 할당된 이슈를 표로 보여준다
- Heat Map: 필터에서 어떤 종류의 이슈가 많은지 보여줌
- Pie Chart: ↑ 내용을 파이 차트로 보여줌

## Agile Board

- Backlog - Configure - Saved Filter에서 필터 설정 가능
- Create Board - Scrum/Kanban 보드를 생성 가능

## How - Jira & JQL 활용 예시

## Q & A

- 이슈 단위: 통일시켜주자. 서버 관리, 회원가입 이런식으로는 단위가 차이나서 보기 힘들수가 있음
- 플러그인 찾기: atlassian marketplace
- ScriptRunner for Jira
