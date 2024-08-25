# 👨‍🎓TEAM: 난대학시절현대차를전공했단사실
Project Name: 캐스퍼가캐리해(Caecae) - 캐스퍼 일렉트릭 신차 출시 이벤트 웹페이지

## 👨‍💻 협업방식
1. 모든 에픽, 스토리, 테스크, 작업, 브랜치는 jira를 통해 관리한다.
2. 정기 스크럼을 통해 개발현황을 보고한다.
3. 현재 개발 피처에서 합의가 필요하면 바로 대화한다.
4. git flow를 사용하여 브랜치를 관리한다.

## Project Name: 캐스퍼가캐리해(Caecae)

## 팀원 소개

| 서창교                      | 조민환                      | 오익준                      | 박진우                      |
| --------------------------- | --------------------------- | --------------------------- | --------------------------- |
| <img src="https://avatars.githubusercontent.com/u/52204038?v=4" width="200" height="200"/> | <img src="https://avatars.githubusercontent.com/u/102406238?v=4" width="200" height="200"/> | <img src="https://avatars.githubusercontent.com/u/39623729?v=4" width="200" height="200"/> | <img src="https://avatars.githubusercontent.com/u/77064618?v=4" width="200" height="200"/> |
| FE                          | FE                          | BE                          | BE                          |
| [@dunkkk](https://github.com/dunkkk)       | [@minani-0621](https://github.com/minani-0621)       | [@putdata](https://github.com/putdata)                    | [@j2noo](https://github.com/j2noo)                |

## **💻Tech - Frontend 개발 목표**

### 1. Redis 도입을 통한 대용량 트래픽 및 동시성 처리

- 메모리에서 동작하기 때문에 빠른 처리 속도 기대
- 싱글 스레드 동작 방식으로 인해 동시성 제어 가능

### 2. 부하테스트를 통한 병목 지점 파악 및 성능개선

- 서버의 부하 테스트를 할 수 있는 툴을 사용하여 대용량 트래픽 유발
- 모니터링 툴을 사용하여 자원 사용량 파악 및 성능 개선

### 3. 적극적인 테스트 코드 작성

- 주요 메서드들에 대한 단위테스트 및 통합테스트 작성
- 목표 테스트 커버리지 50%

---

## 📣 이슈 관리 로직

<img width="720" alt="image" src="https://github.com/user-attachments/assets/73bf4f5c-90d0-4752-8a7f-62972adb3fa0">


- EPIC : 최상위 작업
- STORY : 사용자의 사용 흐름
- TASK : 개발자 입장에서의 기능 분류
- SUB-TASK : 세부적인 작업 단위

---

## **📘Frontend 기술 스택**

### Server

- Spring boot 3.3.2
- Spring Data Jpa
- Java 17
- MySQL 8.0
- Redis
- AssertJ

### Infra

- AWS EC2
- AWS S3
- Github-actions
- docker

### Monitoring Server

- exporter
- grafana
- prometheus

---

## 🖥️Server Architecture

<img width="817" alt="image" src="https://github.com/user-attachments/assets/2c3d4f76-c298-4163-91b0-7a9e83628ceb">


---

## 📄ERD

<img width="720" alt="image" src="https://github.com/user-attachments/assets/5286d18f-7deb-44e8-9083-7a69ea2d70e1">

---

## **🔖Naming Rules**

- **Packages**
    - 항상 소문자로 생성하기
- **Classes**
    - 명사여야 한다.
    - 복합 단어의 경우 각 단어의 첫글자는 대문자.
    - 완전한 단어를 사용하고, 두 문자어와 약어는 피한다.
- **Interfaces**
    - 인터페이스 이름도 클래스 이름과 같은 대문자 규칙을 적용한다.
- **Methods**
    - 동사여야 한다.
    - 복합 단어의 경우 첫 단어는 소문자로 시작한다.
- **Constants**
    - 클래스 상수로 선언된 변수들과 상수들의 이름은 모두 대문자로 쓰고 각 단어는 언더바 ("_")로 분리한다. -**Variables**
    - 변수 이름의 첫번째 문자는 소문자여야 한다.
    - 언더바 또는 달러 표시 문자로 시작하는 것이 허용 되기는 하지만, 사용하지 말자.
    - 짧지만 의미있게 짓는다.
    - 변수의 사용 의도를 알 수 있도록 의미적으로 짓는다.
    - 한문자로만 이루어진 변수는 암시적으로만 사용하고 버릴 변수를 제외하고는 피한다.
    - 임시 변수의 이름은 integer는 i,j,k,m,n 을 사용하고 character는 c,d,e를 사용한다.
- **ETC**
    - DB 테이블: **lower_snake_case**
    - ENUM, 상수: **Upper_snake_case**
    - 컬렉션(Collection): **복수형**을 사용하거나 **컬렉션을 명시한다**. (Ex. userList, users, userMap)
    - LocalDateTime: 접미사에 **Date**를 붙인다.

---

## **🗂️ Commit Convention**

`git commit -m "feat : 전체 등수 조회 api 추가 (CC-83)"`

- `feat` : 새로운 기능 추가
- `fix` : 버그 수정
- `chore` : 빌드 업무, 패키지 매니저, 라이브러리, dependencies 설정
- `docs` : 문서 수정 - *README.md, .github, ..etc*
- `design` : 사용자 UI 디자인 변경 - *CSS*
- `style` : 기능 수정 없는 코드 스타일 변경
- `refactor` : 코드 리팩터링
- `test` : 테스트 코드, 리펙토링 테스트 코드 추가
- `ci` : ci 설정 파일 수정
- `perf` : 성능 개선
- `rename` : 파일 혹은 폴더명 변경
- `remove` : 파일 삭제
- `comment` : 주석 및 코드 설명 등

---

## **🐬 Git Flow**

브랜치 네이밍 : `CC-83`

- `main` : 출시 가능한 프로덕션 코드의 브랜치
- `develop` : 개발 내용 통합 브랜치
- `feature` : 기능을 개발하는 브랜치
- `hotfix` : 출시 버전에서 발생한 버그를 수정하는 브랜치
    
    

---

## 📂 폴더 구조

```
ai.softeer.caecae
├── domain(racingGame..)
│   ├── api(controller)
│   ├── service
│   ├── domain
│   │   ├── dto
│   │   │    ├── request
│   │   │    └── response
│   │   ├── entity
│   │   └── mapper
│   └── repository
└── global
     ├── utils
     ├── config
     ├── error
     └── ...
```

# 기타 설계원칙 및 설계상황
![1](https://github.com/user-attachments/assets/cc43e62b-a6b9-44e6-8ef4-42bac460776f)
![2](https://github.com/user-attachments/assets/36de7907-7d6c-4ca6-8b2c-78c194f7c251)
![3](https://github.com/user-attachments/assets/836fab55-1b0f-4651-b8e4-db37d4f54b2d)
![4](https://github.com/user-attachments/assets/022e6bea-f9ee-4192-8ed4-6425aa15b734)


## 📁 정리문서
- [개발문서 정리](https://www.notion.so/bside/a9af53f019da43c5bd0e0db378d1ab8a?v=392b2231f6c540c7af9981df0ab85d61&pvs=4)
- [스프린트 관리](https://pccommen.atlassian.net/jira/software/projects/CC/boards/1)
