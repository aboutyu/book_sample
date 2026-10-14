# CLAUDE.md

## 1. 프로젝트 목적

이 저장소는 개발 입문서 **《예제로 따라해보는 풀스택 서비스 개발의 기초》**(가제)의 샘플코드를 개발하기 위한 프로젝트다.

이 프로젝트의 최우선 목표는 "실무에서 가능한 모든 기능을 구현하는 것"이 아니라, **비전공자와 개발 입문자가 하나의 서비스가 처음부터 끝까지 어떻게 연결되는지 이해할 수 있는 교육용 풀스택 프로젝트를 만드는 것**이다.

책의 전체 학습 흐름은 다음과 같다.

1. 서비스 전체 구조 이해
2. Node.js / TypeScript 개발 환경
3. Docker / MySQL
4. 데이터베이스와 ERD
5. RESTful API / NestJS / Swagger
6. 로그인과 인증
7. 몸무게 CRUD
8. 음식 CRUD
9. Next.js 웹서비스
10. 프론트엔드와 API 연결
11. LLM / RAG / 프롬프트 엔지니어링
12. Ollama
13. Gemini
14. AWS API 서버 배포
15. Vercel 웹서비스 배포

이 흐름은 책의 목차와 직접 대응한다.

---

## 2. 핵심 교육 철학

이 프로젝트에서 가장 중요한 원칙은 다음 문장이다.

> 기술 자체를 깊게 배우는 것보다, 화면 → API → 데이터베이스 → AI → 배포 환경이 어떻게 연결되는지를 이해하게 한다.

또한 독자가 처음부터 끝까지 서비스 개발을 직접 경험하여, 이후 Claude Code, Codex, 기타 바이브 코딩/AI 코딩 도구를 사용하더라도 다음을 스스로 판단할 수 있게 하는 것이 목표다.

- AI가 어느 파일을 수정해야 하는지 판단할 수 있다.
- 생성된 코드가 전체 구조의 어디에 위치하는지 이해할 수 있다.
- 프론트엔드, 백엔드, DB, AI 중 어디에서 문제가 발생했는지 추적할 수 있다.
- AI가 만든 코드가 보안상 위험한지 기본적인 수준에서 확인할 수 있다.
- AI의 도움을 받아 서비스 하나를 처음부터 배포까지 완주할 수 있다.

따라서 **복잡함보다 설명 가능성, 최신 유행보다 재현성, 고급 설계보다 전체 흐름 이해**를 우선한다.

---

## 3. Claude의 역할

Claude는 이 저장소에서 **주 개발자이자 교육용 샘플코드 작성자** 역할을 한다.

코드를 작성할 때 다음 순서를 따른다.

1. 요청한 작업이 책의 어느 장/절에 해당하는지 확인한다.
2. 현재 프로젝트 구조와 기존 코드를 먼저 읽는다.
3. 구현 전에 변경할 파일과 데이터 흐름을 짧게 정리한다.
4. 가장 단순한 구조로 기능을 구현한다.
5. 실행/빌드/테스트로 실제 동작을 확인한다.
6. 초보자가 이해하기 어려운 부분이 없는지 다시 검토한다.
7. README 또는 예제 실행법을 바꿔야 한다면 함께 갱신한다.
8. 완료 후 변경 파일, 실행 방법, 확인 결과를 간결하게 보고한다.

한 번에 프로젝트 전체를 대규모로 재작성하지 않는다.

---

## 4. 기술 스택과 기본 아키텍처

이 프로젝트의 기본 구조는 다음과 같다.

```text
사용자
  ↓
Next.js Frontend
  ↓ HTTP / JSON
NestJS Backend API
  ├── MySQL
  └── AI Provider
       ├── Ollama (로컬 개발)
       └── Gemini (배포/외부 API)
```

배포 구조는 다음을 기본 방향으로 한다.

```text
GitHub
 ├── Backend → AWS
 └── Frontend → Vercel
```

### 기본 기술

Frontend:
- Next.js
- React
- TypeScript

Backend:
- Node.js
- NestJS
- TypeScript
- Swagger
- JWT 기반 인증

Database:
- MySQL
- Docker / Docker Compose

AI:
- Ollama
- Gemini API
- 단순한 프롬프트 기반 음식 칼로리 추정
- 입문 수준의 RAG
- LLM 채팅

Deployment:
- GitHub
- AWS
- Vercel

---

## 5. 프로젝트 구조 원칙

기본 구조는 다음을 우선한다.

```text
/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── weights/
│   │   ├── foods/
│   │   ├── ai/
│   │   └── main.ts
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml
├── README.md
├── CLAUDE.md
└── AGENTS.md
```

구조를 바꿔야 할 이유가 있다면 먼저 이유를 설명하고, 기존 책의 설명 흐름을 깨지 않는지 확인한다.

---

## 6. 코드 작성의 최우선 기준

### 6.1 쉬운 코드가 우선이다

이 프로젝트는 교육용이다.

다음 중 선택해야 한다면:

- 짧지만 영리한 코드
- 조금 길지만 읽기 쉬운 코드

항상 **읽기 쉬운 코드**를 선택한다.

초보자가 아직 배우지 않은 고급 패턴을 "좋은 설계"라는 이유만으로 도입하지 않는다.

### 6.2 과도한 추상화를 피한다

다음은 특별한 이유가 없으면 도입하지 않는다.

- 복잡한 Repository 추상화 계층
- CQRS
- Event Sourcing
- MSA
- Kubernetes
- Redis
- 메시지 큐
- 복잡한 DDD 계층
- 지나친 디자인 패턴
- 불필요한 상태관리 라이브러리
- 필요 이상의 generic utility
- 지나친 custom decorator
- 불필요한 wrapper

이 프로젝트는 "실무 대규모 서비스의 정답"을 보여주는 프로젝트가 아니다.

### 6.3 중복 제거보다 학습 흐름을 우선할 수 있다

초보자가 코드를 비교하기 쉬워진다면 약간의 반복은 허용한다.

단, 동일한 로직이 여러 곳에 복제되어 버그 위험이 커지는 정도라면 적절히 함수화한다.

---

## 7. 버전과 의존성 원칙

- 의존성을 추가하기 전에 이미 설치된 패키지로 해결 가능한지 확인한다.
- 새로운 라이브러리는 교육적 이점이 명확한 경우에만 추가한다.
- 가능한 한 안정된 지원 버전을 사용한다.
- 버전을 바꾸면 README의 설치/실행 설명과 코드가 일치하는지 확인한다.
- package manager와 lock file을 프로젝트 전체에서 일관되게 사용한다.
- 자동으로 최신 버전 문법으로 대규모 마이그레이션하지 않는다.
- 책의 코드가 깨지는 breaking change를 피한다.

새 패키지를 추가할 때 완료 보고에 반드시 다음을 포함한다.

```text
추가 패키지:
추가 이유:
책의 어느 기능에 필요한가:
대체 방법이 있는가:
```

---

## 8. TypeScript 작성 원칙

TypeScript는 독자가 코드를 읽을 수 있도록 단순하게 사용한다.

우선적으로 사용하는 개념:

- string
- number
- boolean
- array
- object
- type / interface
- function
- async / await
- import / export
- optional property

고급 TypeScript는 필요한 순간에만 사용한다.

특별한 이유 없이 다음을 남용하지 않는다.

- 복잡한 generic
- conditional type
- mapped type
- advanced utility type
- type-level programming

`any`는 가능한 한 사용하지 않는다.

AI 응답이나 외부 API처럼 런타임 입력은 TypeScript 타입만 믿지 말고 필요한 경우 검증한다.

---

## 9. Backend / NestJS 원칙

백엔드는 다음 흐름이 독자에게 보이도록 작성한다.

```text
HTTP Request
    ↓
Controller
    ↓
Service
    ↓
Database 또는 AI
    ↓
Service
    ↓
Controller
    ↓
HTTP Response
```

### 기본 원칙

- 기능 단위 module을 사용한다.
- Controller는 요청/응답 경계를 담당한다.
- Service는 핵심 비즈니스 로직을 담당한다.
- DTO를 통해 입력값의 형태를 명확히 한다.
- Swagger에서 API를 확인할 수 있게 한다.
- 성공 응답과 실패 응답의 의미가 명확해야 한다.
- 비동기 처리는 `async/await` 중심으로 작성한다.
- 에러를 숨기지 않는다.
- 사용자에게 내부 stack trace나 secret을 반환하지 않는다.

### REST API

가능하면 리소스 중심 URL을 사용한다.

예:

```text
POST   /auth/login
GET    /weights
POST   /weights
PATCH  /weights/:id
DELETE /weights/:id

GET    /foods
POST   /foods
PATCH  /foods/:id
DELETE /foods/:id
```

책에서 설명할 수 없는 복잡한 라우팅 규칙을 만들지 않는다.

---

## 10. 인증과 보안 원칙

로그인/인증 구현에서는 교육용 코드라도 기본 보안 원칙을 무시하지 않는다.

필수 기준:

- 비밀번호를 평문으로 저장하지 않는다.
- JWT secret을 코드에 직접 작성하지 않는다.
- API Key를 코드에 직접 작성하지 않는다.
- `.env`를 Git에 커밋하지 않는다.
- `.env.example`에는 실제 secret을 넣지 않는다.
- 사용자가 자신의 데이터만 조회/수정/삭제할 수 있는지 확인한다.
- ID만 안다고 다른 사용자의 weight/food를 수정하거나 삭제할 수 있어서는 안 된다.
- 인증이 필요한 API는 인증 없이 호출되지 않도록 한다.
- 로그인 실패 시 비밀번호나 내부 오류 정보를 과도하게 노출하지 않는다.

프론트엔드에 서버 전용 secret을 노출하지 않는다.

특히 다음 이름의 변수에 secret을 넣지 않는다.

```text
NEXT_PUBLIC_*
```

`NEXT_PUBLIC_*`는 브라우저에 노출될 수 있는 값만 사용한다.

---

## 11. 데이터베이스 원칙

책의 핵심 도메인은 다음과 같이 단순하게 유지한다.

- User
- Weight
- Food
- 필요 시 AI/RAG 관련 최소 데이터

관계를 설명하기 쉬운 구조로 만든다.

예:

```text
User 1 --- N Weight
User 1 --- N Food
```

### DB 설계 기준

- primary key를 명확히 한다.
- foreign key 또는 ORM relation을 명확히 한다.
- createdAt / updatedAt이 필요한 경우 일관되게 사용한다.
- 몸무게는 숫자 타입과 단위를 명확히 한다.
- 날짜/시간 저장 방식은 일관되게 한다.
- 사용자 소유 데이터는 반드시 user와 연결한다.
- 삭제/수정 시 소유권 검증을 한다.
- 책에 필요하지 않은 지나친 정규화는 피한다.

스키마 변경 시 다음을 함께 확인한다.

1. DB schema
2. entity/model
3. DTO
4. service
5. Swagger
6. frontend type
7. frontend form
8. README 또는 책 예제

---

## 12. Frontend / Next.js 원칙

프론트엔드의 역할을 다음처럼 명확히 유지한다.

```text
사용자 입력
    ↓
Next.js 화면
    ↓
API 요청
    ↓
NestJS
    ↓
응답
    ↓
Next.js 상태/화면 갱신
```

### 기본 원칙

- UI는 단순하고 책의 스크린샷에 적합하게 만든다.
- 지나친 디자인 시스템을 도입하지 않는다.
- 핵심 기능을 가리는 애니메이션을 넣지 않는다.
- 로딩 상태를 보여준다.
- 오류 상태를 보여준다.
- 빈 목록 상태를 보여준다.
- 성공/실패를 사용자가 알 수 있게 한다.
- API URL은 환경변수로 관리한다.
- DB에 직접 연결하지 않는다.
- Gemini/Ollama secret을 브라우저에서 직접 사용하지 않는다.
- API 호출 로직이 반복되면 이해 가능한 수준에서 `lib` 등으로 분리한다.

화면은 최소한 다음 사용자 흐름을 지원해야 한다.

```text
로그인
  ↓
몸무게 조회/등록/수정/삭제
  ↓
음식 조회/등록/수정/삭제
  ↓
AI 칼로리 추정
  ↓
LLM 채팅
```

---

## 13. Docker 원칙

Docker는 이 책에서 "복잡한 컨테이너 운영 기술"을 배우기 위한 것이 아니다.

주 목적:

- MySQL 실행
- Ollama 실행
- 독자 환경 차이 감소

따라서 Docker 설정은 단순해야 한다.

`docker compose up -d` 또는 서비스별 실행 명령으로 따라 할 수 있게 한다.

필수 점검:

- 포트가 README와 일치하는가?
- volume이 필요한가?
- 재시작해도 DB 데이터가 유지되는가?
- health check가 필요하다면 지나치게 복잡하지 않은가?
- backend가 host에서 실행될 때와 container 안에서 실행될 때 hostname 차이를 설명할 수 있는가?

예:

```text
host → Ollama: http://localhost:11434
container → Ollama: http://ollama:11434
```

---

## 14. AI / Ollama / Gemini 구현 원칙

AI 기능은 기존 서비스의 **부가 기능**이다.

AI가 전체 프로젝트 구조를 지배하게 만들지 않는다.

권장 구조:

```text
Frontend
   ↓
NestJS
   ↓
AI Service
   ↓
Provider
  ├── Ollama
  └── Gemini
```

가능하면 프론트엔드는 어떤 AI provider를 사용하는지 몰라도 되게 한다.

### 음식 칼로리 추정

음식 칼로리 추정은 **교육용 예제**다.

- 의료 진단 기능처럼 표현하지 않는다.
- AI 응답은 추정값임을 명확히 한다.
- 정확한 영양정보를 보장한다고 표현하지 않는다.
- 가능하면 구조화된 응답 형식을 사용한다.
- AI가 잘못된 JSON을 반환할 가능성을 고려한다.
- timeout / provider 오류를 처리한다.
- API 오류 시 서버 전체가 죽지 않게 한다.

예시 응답 형태:

```json
{
  "foodName": "김치찌개",
  "estimatedCalories": 350,
  "unit": "kcal",
  "note": "양과 조리법에 따라 달라질 수 있습니다."
}
```

### RAG

RAG는 입문자가 전체 흐름을 이해할 수 있는 최소 수준으로 구현한다.

핵심 교육 흐름:

```text
문서
 ↓
검색 가능한 형태로 준비
 ↓
질문
 ↓
관련 정보 검색
 ↓
프롬프트에 관련 정보 포함
 ↓
LLM 답변
```

벡터DB나 복잡한 RAG 프레임워크는 책의 학습 목적상 꼭 필요할 때만 사용한다.

---

## 15. 환경변수

환경별 차이는 `.env`로 관리한다.

예:

Backend:

```env
PORT=3001

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=fullstack_service

JWT_SECRET=

AI_PROVIDER=ollama

OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=

GEMINI_API_KEY=
```

Frontend:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

`.env.example`을 항상 실제 코드와 동기화한다.

새 환경변수를 추가하면 반드시 `.env.example`과 README를 함께 수정한다.

---

## 16. Swagger 원칙

책에서 Swagger는 "API가 실제로 작동하는지 눈으로 확인하는 도구"로 사용한다.

API를 추가/변경하면 다음을 확인한다.

- endpoint가 Swagger에 보이는가?
- request DTO를 이해할 수 있는가?
- 인증이 필요한 API인지 표시되는가?
- response 예시가 책과 충돌하지 않는가?
- Swagger에서 직접 실행 가능한가?

---

## 17. 오류 처리 원칙

초보자가 오류 원인을 찾을 수 있어야 한다.

좋지 않은 예:

```text
Something went wrong
```

가능하면 의미가 드러나게 한다.

예:

```text
로그인이 필요합니다.
존재하지 않는 몸무게 기록입니다.
자신의 기록만 수정할 수 있습니다.
AI 서버에 연결할 수 없습니다.
```

하지만 production response에 내부 DB 구조, stack trace, secret을 노출하지 않는다.

---

## 18. 테스트와 실행 검증

기능 구현 후 가능한 범위에서 실제 명령을 실행한다.

최소 검증 순서:

### Backend

```bash
npm install
npm run build
npm run lint
npm test
```

프로젝트에 해당 script가 없다면 존재하지 않는 명령을 임의로 가정하지 말고 `package.json`을 확인한다.

### Frontend

```bash
npm install
npm run build
npm run lint
```

### Docker

```bash
docker compose config
docker compose up -d
docker compose ps
```

### API

가능하다면 실제 흐름을 확인한다.

```text
회원가입 또는 사용자 준비
→ 로그인
→ 인증 토큰 획득
→ weight 생성
→ weight 조회
→ weight 수정
→ weight 삭제
→ food CRUD
→ AI 요청
```

실행할 수 없는 검증은 "검증 완료"라고 쓰지 않는다.

---

## 19. 완료 정의 (Definition of Done)

기능은 다음 조건을 만족할 때 완료로 본다.

- [ ] 요청한 기능이 구현됐다.
- [ ] 기존 기능을 불필요하게 깨뜨리지 않았다.
- [ ] TypeScript/build 오류가 없다.
- [ ] lint가 설정되어 있다면 통과한다.
- [ ] 관련 테스트가 있다면 통과한다.
- [ ] Swagger 또는 API 동작을 확인했다.
- [ ] 인증/소유권 검증이 필요한 곳을 확인했다.
- [ ] secret이 코드에 포함되지 않았다.
- [ ] `.env.example`이 최신이다.
- [ ] README 실행법과 실제 코드가 일치한다.
- [ ] 초보자가 설명하기 어려운 과도한 구조를 추가하지 않았다.
- [ ] 변경된 코드가 책의 어느 장에 해당하는지 설명할 수 있다.

---

## 20. 책의 장별 개발 체크포인트

### Chapter 1 — 서비스 이해

코드보다 서비스 흐름과 전체 아키텍처가 우선이다.

완성 서비스 기능:
- 로그인
- 몸무게 기록
- 음식 기록
- AI 분석
- 채팅

### Chapter 2 — 개발 환경

- Node.js 실행 가능
- TypeScript 최소 예제
- 프로젝트 폴더 구조
- Docker 기본 실행

### Chapter 3 — 데이터베이스

- MySQL Docker 실행
- User / Weight / Food 데이터 구조
- ERD와 실제 schema 일치

### Chapter 4 — API

- REST endpoint
- NestJS module/controller/service 구조
- Swagger
- 로그인
- weight CRUD
- food CRUD
- 인증

### Chapter 5 — 웹서비스

- Next.js 기본 구조
- 로그인 화면
- 인증된 API 호출
- weight CRUD UI
- food CRUD UI

### Chapter 6 — AI

- LLM/RAG 흐름
- Ollama 실행
- 간단한 RAG
- 음식 칼로리 추정
- 채팅

### Chapter 7 — 배포

- 환경변수
- secret 보호
- Ollama → Gemini 전환 가능
- AWS backend
- Vercel frontend
- 실제 배포 URL에서 end-to-end 확인

### Chapter 8 — 확장 방향

새 코드를 과도하게 추가하기보다 독자가 다음 학습 방향을 이해할 수 있는 상태를 만든다.

---

## 21. Claude가 절대 하지 말아야 할 것

- 요청 없이 전체 프로젝트 구조를 재설계하지 않는다.
- 최신 유행이라는 이유만으로 기술 스택을 교체하지 않는다.
- Next.js를 다른 프론트엔드 프레임워크로 교체하지 않는다.
- NestJS를 다른 백엔드 프레임워크로 교체하지 않는다.
- MySQL을 다른 DB로 교체하지 않는다.
- Ollama/Gemini 구조를 임의로 삭제하지 않는다.
- 교육용 프로젝트를 대규모 엔터프라이즈 구조로 바꾸지 않는다.
- 테스트를 실행하지 않았는데 통과했다고 말하지 않는다.
- 실행하지 않은 명령의 결과를 만들어내지 않는다.
- secret을 코드/로그/README에 기록하지 않는다.
- 오류를 해결하기 위해 인증이나 validation을 제거하지 않는다.
- 타입 오류를 없애기 위해 무분별하게 `any`를 사용하지 않는다.
- 보안 문제를 "교육용이니까 괜찮다"며 무시하지 않는다.

---

## 22. 작업 보고 형식

코드 변경 후 다음 형태로 보고한다.

```markdown
## 작업 요약
- 구현한 기능:
- 해당 책 챕터:
- 주요 변경 사항:

## 변경 파일
- `path/file.ts`: 변경 내용
- `path/file.tsx`: 변경 내용

## 실행/검증
- 실행한 명령:
- 성공한 항목:
- 실행하지 못한 항목과 이유:

## 독자가 확인할 결과
1.
2.
3.

## 주의사항
- 환경변수:
- Docker:
- 배포 시 변경점:
```

---

## 23. 작업 전 마지막 질문

구현을 시작하기 전에 스스로 다음을 확인한다.

> 이 코드는 독자가 "왜 필요한지" 설명할 수 있는가?

> 이 기능은 화면 → API → DB/AI의 연결 흐름을 더 잘 보여주는가?

> 더 단순하게 만들면서 같은 학습 목표를 달성할 수 있는가?

답이 불명확하다면 먼저 구조를 단순화한다.
