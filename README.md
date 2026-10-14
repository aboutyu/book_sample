# 하나의 서비스로 배우는 풀스택 개발

> **기획부터 데이터베이스, API, 웹, AI 연동, 배포까지 하나의 서비스를 직접 만들어보는 풀스택 개발 입문 프로젝트**

이 저장소는 개발 입문서 **《하나의 서비스로 배우는 풀스택 개발》**(가제)의 예제 프로젝트입니다.

이 프로젝트의 목적은 특정 프레임워크를 깊게 학습하는 것이 아니라, 하나의 서비스가 실제로 어떻게 구성되고 연결되는지를 직접 실행해보며 이해하는 것입니다.

---

## 1. 무엇을 만드는 프로젝트인가요?

사용자가 자신의 **몸무게와 음식 기록을 관리하고, AI를 이용해 음식의 예상 칼로리를 확인하거나 간단한 대화를 할 수 있는 웹 서비스**를 만듭니다.

책과 예제 코드를 따라가면서 다음 흐름을 경험합니다.

```text
사용자
  ↓
Next.js 웹 서비스
  ↓ REST API
NestJS API 서버
  ↓
MySQL 데이터베이스

NestJS API 서버
  ↓
Ollama 또는 Gemini
  ↓
AI 기능
```

최종적으로 프론트엔드는 **Vercel**, API 서버는 **AWS**에 배포하는 구성을 목표로 합니다.

---

## 2. 주요 기능

- 회원가입 및 로그인
- JWT 기반 인증
- 몸무게 기록 CRUD
- 음식 기록 CRUD
- Swagger를 이용한 API 확인
- AI 기반 음식 칼로리 추정
- LLM 채팅
- 로컬 Ollama 연동
- Gemini API 연동
- Vercel 프론트엔드 배포
- AWS 백엔드 배포

> CRUD는 Create, Read, Update, Delete의 약자로 데이터를 등록하고, 조회하고, 수정하고, 삭제하는 기본 기능을 의미합니다.

---

## 3. 기술 스택

### Frontend

- Next.js
- React
- TypeScript

### Backend

- Node.js
- NestJS
- TypeScript
- Swagger
- JWT

### Database

- MySQL
- Docker

### AI

개발 환경에서는 로컬 LLM을 경험하기 위해 Ollama를 사용할 수 있습니다.

- Ollama
- Gemini API

### Deployment

- GitHub
- AWS
- Vercel

---

## 4. 프로젝트 폴더 구조

예제 프로젝트는 다음과 같은 형태를 기준으로 구성합니다.

```text
fullstack-service/
├── backend/                 # NestJS API 서버
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── weights/
│   │   ├── foods/
│   │   ├── ai/
│   │   └── main.ts
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── frontend/                # Next.js 웹 서비스
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── .env.example
│   ├── package.json
│   └── README.md
│
├── docker-compose.yml       # MySQL / Ollama 실행
├── .gitignore
└── README.md
```

실제 집필 과정에서 폴더 구조는 조금 변경될 수 있습니다.

---

# 실행 방법

## 5. 준비해야 할 프로그램

예제를 실행하기 전에 다음 프로그램을 설치합니다.

### 필수

- Node.js
- npm
- Docker Desktop
- Git

### 선택

로컬 AI 실습을 진행할 경우 Ollama가 필요합니다.

다만 이 프로젝트에서는 가능하면 Docker를 통해 Ollama를 실행하여 환경 차이를 줄이는 방식을 사용합니다.

---

## 6. 저장소 내려받기

터미널에서 다음 명령어를 실행합니다.

```bash
git clone <YOUR_REPOSITORY_URL>
cd fullstack-service
```

`<YOUR_REPOSITORY_URL>` 부분에는 실제 GitHub 저장소 주소를 입력합니다.

---

# 데이터베이스 실행

## 7. MySQL 실행하기

프로젝트 루트에서 Docker Compose를 이용해 MySQL을 실행합니다.

```bash
docker compose up -d mysql
```

정상적으로 실행되었는지 확인합니다.

```bash
docker compose ps
```

예제 프로젝트에서 사용하는 기본 포트는 다음과 같습니다.

| 서비스 | 기본 포트 |
|---|---:|
| Next.js | 3000 |
| NestJS | 3001 |
| MySQL | 3306 |
| Ollama | 11434 |

> 이미 해당 포트를 사용하는 프로그램이 있다면 포트 번호를 변경해야 할 수 있습니다.

---

## 8. 데이터베이스 기본 설정

예제에서는 다음과 같은 데이터베이스 설정을 기준으로 설명합니다. 아래 값은 루트 `docker-compose.yml`에 설정된 로컬 개발용 기본값입니다.

```text
HOST=localhost
PORT=3306
DATABASE=fullstack_service
USER=root
PASSWORD=rootpassword
```

실제 배포 환경에서는 반드시 다른 비밀번호를 사용하고, 실제 비밀번호는 GitHub에 올리지 마세요.

비밀번호, API Key, JWT Secret과 같은 값은 `.env` 파일로 관리합니다.

---

# 백엔드 실행

## 9. Backend 패키지 설치

```bash
cd backend
npm install
```

---

## 10. Backend 환경변수 설정

`backend/.env.example` 파일을 복사하여 `.env` 파일을 만듭니다.

macOS / Linux:

```bash
cp .env.example .env
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

예시는 다음과 같습니다.

```env
PORT=3001

CORS_ORIGIN=

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=rootpassword
DB_DATABASE=fullstack_service

JWT_SECRET=change_this_secret

AI_PROVIDER=ollama

OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=gemma3

GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash
```

`CORS_ORIGIN`은 로컬 개발에서는 비워두면 됩니다 (모든 출처 허용). 배포 시 설정 방법은 아래 "배포" 절을 참고하세요.

> `.env` 파일은 저장소에 커밋하지 않습니다.

---

## 11. Backend 실행

개발 모드로 NestJS 서버를 실행합니다.

```bash
npm run start:dev
```

정상적으로 실행되면 기본적으로 다음 주소에서 API 서버에 접근할 수 있습니다.

```text
http://localhost:3001
```

---

## 12. Swagger 확인

Swagger를 적용한 경우 브라우저에서 다음 주소를 엽니다.

```text
http://localhost:3001/api
```

Swagger에서는 구현된 API 목록을 확인하고 직접 요청을 테스트할 수 있습니다.

현재까지 구현된 API는 다음과 같습니다.

```text
POST   /auth/register    회원가입
POST   /auth/login       로그인 (JWT 발급)

GET    /weights          내 몸무게 기록 목록 조회 (인증 필요)
POST   /weights          몸무게 기록 등록 (인증 필요)
PATCH  /weights/:id      몸무게 기록 수정 (본인 소유만 가능)
DELETE /weights/:id      몸무게 기록 삭제 (본인 소유만 가능)

GET    /foods            내 음식 기록 목록 조회 (인증 필요)
POST   /foods            음식 기록 등록 (인증 필요)
PATCH  /foods/:id        음식 기록 수정 (본인 소유만 가능)
DELETE /foods/:id        음식 기록 삭제 (본인 소유만 가능)

POST   /ai/estimate-calories   AI 기반 음식 칼로리 추정 (인증 필요)
POST   /ai/chat                LLM과 간단한 대화 (인증 필요)
```

AI API 사용법은 아래 "AI 기능 실행" 절에서 자세히 다룹니다.

`/weights`, `/foods` API는 로그인 후 발급받은 `accessToken`을 `Authorization: Bearer <token>` 헤더에 담아야 호출할 수 있습니다. 다른 사용자의 기록은 조회/수정/삭제할 수 없습니다.

터미널에서 직접 호출해볼 수도 있습니다.

```bash
# 회원가입
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 로그인 (응답의 accessToken을 이후 인증이 필요한 API에서 사용합니다)
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 몸무게 기록 등록 (accessToken 필요)
curl -X POST http://localhost:3001/weights \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{"weight":68.5,"recordedAt":"2026-08-29"}'

# 음식 기록 등록 (accessToken 필요)
curl -X POST http://localhost:3001/foods \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{"name":"김치찌개","calories":350,"eatenAt":"2026-08-29"}'
```

---

# 프론트엔드 실행

## 13. Frontend 패키지 설치

새 터미널을 열고 프로젝트의 frontend 폴더로 이동합니다.

```bash
cd frontend
npm install
```

---

## 14. Frontend 환경변수 설정

`frontend/.env.example` 파일을 `.env.local`로 복사합니다.

macOS / Linux:

```bash
cp .env.example .env.local
```

Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

예:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 15. Frontend 실행

```bash
npm run dev
```

브라우저에서 다음 주소를 엽니다.

```text
http://localhost:3000
```

정상적으로 실행되면 웹 화면에서 로그인하고 몸무게와 음식 기록 기능을 사용할 수 있습니다.

현재까지 구현된 화면은 다음과 같습니다.

```text
/           홈 (로그인 상태에 따라 다른 버튼 표시)
/register   회원가입
/login      로그인
/weights    몸무게 기록 조회/등록/수정/삭제 (로그인 필요)
/foods      음식 기록 조회/등록/수정/삭제 (로그인 필요)
/calories   AI 음식 칼로리 추정 (로그인 필요)
/chat       LLM 채팅 (로그인 필요)
```

로그인하지 않은 상태로 위 화면에 접근하면 자동으로 `/login`으로 이동합니다. `/calories`, `/chat`은 백엔드의 Ollama/Gemini 연동이 필요하므로, 아래 "AI 기능 실행" 절을 먼저 따라 백엔드를 준비한 뒤 사용하세요.

---

# AI 기능 실행

## 16. Ollama 실행하기

로컬 LLM 실습에서는 Ollama를 사용합니다.

프로젝트 루트의 `docker-compose.yml`에 Ollama 서비스가 포함되어 있습니다. 다음 명령어로 실행합니다.

```bash
docker compose up -d ollama
```

실행 상태를 확인합니다.

```bash
docker compose ps
```

---

## 17. Ollama 모델 준비

예제에서 사용할 모델을 내려받습니다.

```bash
docker compose exec ollama ollama pull gemma3
```

또는 Ollama를 로컬에 직접 설치했다면 다음과 같이 실행할 수 있습니다.

```bash
ollama pull gemma3
```

모델 이름은 책과 저장소 버전에 따라 변경될 수 있습니다.

Backend 서버(`npm run start:dev`)를 실행한 상태에서 다음과 같이 AI API를 직접 호출해볼 수 있습니다. `accessToken`은 `/auth/login` 응답에서 받은 값입니다.

```bash
# 음식 칼로리 추정
curl -X POST http://localhost:3001/ai/estimate-calories \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{"foodName":"김치찌개 1인분"}'

# LLM 채팅
curl -X POST http://localhost:3001/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <accessToken>" \
  -d '{"message":"오늘 저녁 뭐 먹을지 추천해줘"}'
```

칼로리 추정 응답은 다음과 같은 형태이며, AI가 추정한 값이므로 실제 영양정보와 다를 수 있습니다.

```json
{
  "foodName": "김치찌개 1인분",
  "estimatedCalories": 380,
  "unit": "kcal",
  "note": "육류 양과 김치의 양에 따라 달라질 수 있는 추정값입니다."
}
```

Ollama 서버가 꺼져 있거나 응답을 처리할 수 없는 경우, 서버가 멈추지 않고 다음과 같은 오류 응답을 반환합니다.

```json
{ "statusCode": 503, "message": "AI 서버(Ollama)에 연결할 수 없습니다." }
```

> Ollama를 처음 실행한 직후에는 모델을 메모리에 올리는 데 시간이 걸려 첫 요청이 평소보다 오래 걸릴 수 있습니다 (CPU 환경 기준 최대 1분 정도).

---

## 18. Gemini 사용하기

배포 환경에서는 로컬 Ollama 대신 Gemini API를 사용할 수 있습니다.

Backend의 `.env` 파일을 다음과 같이 설정합니다.

```env
AI_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.0-flash
```

그리고 서버를 다시 실행합니다.

```bash
npm run start:dev
```

> API Key는 GitHub 저장소에 절대 업로드하지 마세요.

---

# 전체 실행 순서

처음 프로젝트를 실행한다면 다음 순서로 진행하는 것을 권장합니다.

```text
1. Git 저장소 Clone
        ↓
2. Docker로 MySQL 실행
        ↓
3. Backend 환경변수 설정
        ↓
4. NestJS 실행
        ↓
5. Swagger에서 API 확인
        ↓
6. Frontend 환경변수 설정
        ↓
7. Next.js 실행
        ↓
8. 웹에서 로그인 / CRUD 확인
        ↓
9. Ollama 실행
        ↓
10. AI 기능 확인
```

터미널 기준으로 정리하면 다음과 같습니다.

### Terminal 1 — Database / AI

```bash
docker compose up -d mysql ollama
```

### Terminal 2 — Backend

```bash
cd backend
npm install
npm run start:dev
```

### Terminal 3 — Frontend

```bash
cd frontend
npm install
npm run dev
```

그리고 브라우저에서 다음 주소를 확인합니다.

```text
Frontend
http://localhost:3000

Backend
http://localhost:3001

Swagger
http://localhost:3001/api
```

---

# 예제 서비스 사용 흐름

## 19. 서비스 동작 확인

전체 프로젝트가 실행되었다면 다음 순서로 테스트합니다.

### 1단계. 회원가입 / 로그인

사용자를 생성하고 로그인합니다.

```text
사용자
  ↓
Next.js
  ↓
NestJS Auth API
  ↓
MySQL
```

로그인에 성공하면 인증에 사용할 JWT를 발급받습니다.

---

### 2단계. 몸무게 등록

웹 화면에서 몸무게를 입력합니다.

```text
80.5 kg
```

요청 흐름:

```text
Next.js
   ↓
POST /weights
   ↓
NestJS
   ↓
MySQL
```

---

### 3단계. 음식 등록

예:

```text
김치찌개
공기밥
계란후라이
```

음식 기록은 API를 통해 MySQL에 저장됩니다.

---

### 4단계. AI 칼로리 추정

사용자가 입력한 음식 정보를 LLM에 전달하여 예상 칼로리를 계산합니다.

```text
사용자 입력
   ↓
Next.js
   ↓
NestJS
   ↓
Ollama / Gemini
   ↓
AI 응답
```

이 예제를 통해 일반적인 CRUD 기능과 AI 기능이 하나의 서비스 안에서 어떻게 연결되는지 확인합니다.

---

# Docker 명령어

## 20. 컨테이너 상태 확인

```bash
docker compose ps
```

## 21. 로그 확인

```bash
docker compose logs
```

특정 서비스만 확인하려면:

```bash
docker compose logs mysql
```

```bash
docker compose logs ollama
```

## 22. 컨테이너 중지

```bash
docker compose stop
```

## 23. 컨테이너 다시 시작

```bash
docker compose start
```

## 24. 컨테이너 종료 및 제거

```bash
docker compose down
```

데이터 볼륨까지 제거하려면 다음 명령을 사용할 수 있습니다.

```bash
docker compose down -v
```

> `-v` 옵션을 사용하면 데이터베이스 데이터가 삭제될 수 있으므로 주의하세요.

---

# 문제 해결

## 25. 3000 포트가 이미 사용 중입니다

Next.js 기본 포트인 3000번을 다른 프로그램이 사용하고 있을 수 있습니다.

다른 포트로 실행할 수 있습니다.

```bash
npm run dev -- -p 3002
```

---

## 26. 3001 포트가 이미 사용 중입니다

Backend의 `.env` 파일에서 포트를 변경합니다.

```env
PORT=3002
```

이 경우 Frontend의 API 주소도 함께 변경해야 합니다.

```env
NEXT_PUBLIC_API_URL=http://localhost:3002
```

---

## 27. MySQL에 연결할 수 없습니다

먼저 컨테이너가 실행 중인지 확인합니다.

```bash
docker compose ps
```

그 다음 Backend의 `.env` 설정을 확인합니다.

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=...
DB_DATABASE=fullstack_service
```

---

## 28. Ollama에 연결할 수 없습니다

Ollama 실행 상태를 확인합니다.

```bash
docker compose ps
```

그리고 Backend 설정을 확인합니다.

```env
OLLAMA_BASE_URL=http://localhost:11434
```

Docker 컨테이너 내부에서 다른 컨테이너의 Ollama에 접근하는 구조라면 주소가 `localhost`가 아니라 Docker 서비스 이름으로 변경될 수 있습니다.

예:

```env
OLLAMA_BASE_URL=http://ollama:11434
```

실제 설정은 프로젝트의 `docker-compose.yml`을 기준으로 확인하세요.

---

## 29. 환경변수를 수정했는데 반영되지 않습니다

개발 서버를 종료한 뒤 다시 실행합니다.

Backend:

```bash
npm run start:dev
```

Frontend:

```bash
npm run dev
```

Next.js의 `.env.local`을 수정했다면 개발 서버를 재시작하는 것이 안전합니다.

---

# 보안 주의사항

다음 정보는 GitHub에 업로드하지 않습니다.

```text
.env
.env.local
API Key
Database Password
JWT Secret
AWS Secret Key
```

`.gitignore` 예시는 다음과 같습니다.

```gitignore
node_modules/

.env
.env.*
!.env.example

.next/
dist/

.DS_Store
```

실제 서비스에서는 비밀번호를 코드에 직접 작성하지 말고 반드시 환경변수나 별도의 Secret 관리 기능을 사용하세요.

---

# 배포

## 30. Frontend

Next.js 프론트엔드는 Vercel 배포를 기준으로 설명합니다.

일반적인 흐름은 다음과 같습니다.

```text
GitHub
  ↓
Vercel
  ↓
Next.js 배포
```

배포 환경에서는 다음과 같은 환경변수를 설정합니다.

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

---

## 31. Backend

NestJS API 서버는 AWS 환경에 배포하는 것을 기준으로 설명합니다.

```text
GitHub
  ↓
AWS
  ↓
NestJS API
  ↓
MySQL
```

`backend/Dockerfile`을 제공합니다. AWS(App Runner, ECS, EC2 등 컨테이너를 실행할 수 있는 서비스)에 배포할 때 이 이미지를 그대로 사용할 수 있습니다.

```bash
cd backend
docker build -t fullstack-service-backend .
docker run -p 3001:3001 --env-file .env fullstack-service-backend
```

배포 환경에서는 다음 환경변수를 함께 설정합니다.

```env
CORS_ORIGIN=https://your-frontend-domain.vercel.app
```

`CORS_ORIGIN`을 비워두면(로컬 개발 기본값) 모든 출처의 요청을 허용하지만, 배포 환경에서는 프론트엔드 도메인만 명시해 다른 출처에서의 API 호출을 차단하는 것을 권장합니다.

구체적인 AWS 구성(App Runner, ECS, RDS 연결 등)과 배포 방식은 책의 배포 장에서 단계별로 다룹니다.

---

# 학습 순서

이 프로젝트는 다음 순서로 학습하는 것을 권장합니다.

```text
01. 서비스 전체 구조 이해
02. 개발 환경과 TypeScript
03. Docker와 MySQL
04. 데이터베이스와 ERD
05. REST API
06. NestJS
07. 로그인 / 인증
08. CRUD API
09. Next.js
10. Frontend와 API 연결
11. LLM / Prompt Engineering
12. Ollama
13. Gemini
14. AWS / Vercel 배포
```

---

# 챕터별 코드 관리

책을 집필하면서 각 장이 끝나는 시점의 소스를 별도로 확인할 수 있도록 Git Tag 또는 브랜치를 제공하는 방식을 권장합니다.

예:

```text
ch03-database
ch04-api
ch05-frontend
ch06-ai
ch07-deploy
```

예를 들어 4장까지 완료된 코드를 확인하려면:

```bash
git checkout ch04-api
```

최신 코드로 돌아오려면:

```bash
git checkout main
```

이 방식은 책을 읽는 도중 코드가 꼬였을 때 해당 장의 정상 소스와 비교하는 데 유용합니다.

---

# 이 프로젝트에서 다루지 않는 것

이 책은 개발의 전체 구조와 흐름을 이해하는 입문서이므로 다음 주제를 깊게 다루지 않습니다.

- 고급 TypeScript 문법
- React 렌더링 최적화
- NestJS 내부 구조 심화
- 데이터베이스 튜닝
- Kubernetes
- 대규모 MSA
- 복잡한 CI/CD
- 고급 클라우드 아키텍처
- LLM 모델 학습 및 파인튜닝

이 프로젝트의 목표는 모든 기술을 깊게 배우는 것이 아니라,

> **하나의 서비스가 화면, API, 데이터베이스, AI 그리고 배포 환경까지 어떻게 연결되는지를 이해하는 것**

입니다.

또한 개발을 전혀 모르더라도 처음부터 끝까지 서비스 개발의 전 과정을 직접 경험함으로써, 이후 바이브 코딩(Vibe Coding) 등 AI 기반 개발 도구를 활용하더라도 서비스의 전체 구조를 이해하고 스스로 개발을 완주할 수 있는 역량을 기르는 것을 목표로 합니다.

---

# 책과 예제 코드

이 저장소는 책의 진행 순서에 맞추어 업데이트될 예정입니다.

책을 읽는 독자는 각 장의 코드를 직접 입력하고 실행해보는 것을 권장합니다.

코드를 단순히 복사하는 것보다 다음 질문을 계속 생각해보세요.

- 이 코드는 서비스의 어느 부분에 해당할까?
- 사용자가 버튼을 누르면 요청은 어디로 갈까?
- 이 데이터는 어디에 저장될까?
- Frontend와 Backend는 어떻게 이야기할까?
- AI는 기존 서비스 구조의 어디에 연결될까?
- 내 컴퓨터에서 실행되던 프로그램은 어떻게 실제 서비스가 될까?
- 이 기능을 구현하려면 AI에게 어떻게 명령을 하면 만들어줄까?

이 질문들에 답할 수 있게 되는 것이 이 프로젝트의 가장 중요한 목표입니다.

---

## License

예제 코드의 라이선스 정책은 출간 및 저장소 공개 범위에 맞추어 추후 공개합니다.
