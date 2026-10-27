# 하나의 서비스로 배우는 풀스택 개발

> **기획부터 데이터베이스, API, 웹, 모바일, AI 연동, 배포까지 하나의 서비스를 직접 만들어보는 풀스택 개발 입문 프로젝트**

이 저장소는 개발 입문서 **《하나의 서비스로 배우는 풀스택 개발》**(가제)의 예제 프로젝트입니다.

이 프로젝트의 목적은 특정 프레임워크를 깊게 학습하는 것이 아니라, 하나의 서비스가 실제로 어떻게 구성되고 연결되는지를 직접 실행해보며 이해하는 것입니다.

---

## 1. 무엇을 만드는 프로젝트인가요?

사용자가 자신의 **몸무게와 음식 기록을 관리하고, AI를 이용해 음식의 예상 칼로리를 확인하거나 간단한 대화를 할 수 있는 서비스**를 만듭니다.

책과 예제 코드를 따라가면서 다음 흐름을 경험합니다.

```text
사용자
  ↓
React 웹 (frontend)  /  Flutter 앱 (mobile)
  ↓ REST API
FastAPI API 서버 (backend)
  ↓
PostgreSQL 데이터베이스
```

---

## 2. 주요 기능 (구현 예정)

- 회원가입 및 로그인
- JWT 기반 인증
- 몸무게 기록 CRUD
- 음식 기록 CRUD
- Swagger를 이용한 API 확인
- AI 기반 음식 칼로리 추정
- LLM 채팅

> CRUD는 Create, Read, Update, Delete의 약자로 데이터를 등록하고, 조회하고, 수정하고, 삭제하는 기본 기능을 의미합니다.

---

## 3. 기술 스택과 버전

예제는 아래 버전을 기준으로 작성하고 확인했습니다. 같은 메이저 버전이라면 대부분 그대로 동작합니다.

### Backend (`backend/`)

| 항목 | 버전 |
|---|---|
| Python | 3.13 이상 (확인: 3.13.5) |
| uv (패키지/가상환경 관리) | 0.12.15 |
| FastAPI | 0.162.0 |
| Uvicorn | 0.54.0 |

### Frontend (`frontend/`)

| 항목 | 버전 |
|---|---|
| Node.js | 24.14.1 |
| npm | 11.21.1 |
| React | 19.3.1 |
| TypeScript | 6.0.3 |
| Vite | 8.3.5 |

### Mobile (`mobile/`)

| 항목 | 버전 |
|---|---|
| Flutter | 3.47.8 (stable) |
| Dart | 3.13.7 |

### Database

| 항목 | 버전 |
|---|---|
| PostgreSQL | 17.11 |

---

## 4. 프로젝트 폴더 구조

```text
book_sample/
├── backend/          # FastAPI API 서버 (Python, uv)
│   ├── main.py
│   ├── pyproject.toml
│   └── uv.lock
│
├── frontend/         # React 웹 (TypeScript, Vite)
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── mobile/           # Flutter 앱 (Dart)
│   ├── lib/
│   ├── test/
│   ├── android/ ios/ web/ windows/ macos/ linux/
│   └── pubspec.yaml
│
├── writing/          # 집필 원고
└── README.md
```

실제 집필 과정에서 폴더 구조는 조금 변경될 수 있습니다.

---

# 실행 방법

## 5. 준비해야 할 프로그램

| 프로그램 | 용도 | 설치 확인 명령 |
|---|---|---|
| Git | 저장소 내려받기 | `git --version` |
| Python 3.13+ | Backend | `python --version` |
| uv | Backend 패키지 관리 | `uv --version` |
| Node.js / npm | Frontend | `node --version` / `npm --version` |
| Flutter SDK | Mobile | `flutter --version` |
| PostgreSQL | Database | `psql --version` |

uv는 다음 명령으로 설치할 수 있습니다.

macOS / Linux:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Windows PowerShell:

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

Flutter 설치 후에는 `flutter doctor`로 개발 환경을 점검합니다.

---

## 6. 저장소 내려받기

```bash
git clone https://github.com/aboutyu/book_sample.git
cd book_sample
```

---

## 7. 데이터베이스 (PostgreSQL)

예제는 로컬 PostgreSQL의 `postgres` 데이터베이스 안에 `book_sample` 스키마를 만들어 사용합니다. 접속 계정은 실습용 `test` / `test`입니다.

| 항목 | 값 |
|---|---|
| HOST | localhost |
| PORT | 5432 |
| DATABASE | postgres |
| SCHEMA | book_sample |
| USER | test |
| PASSWORD | test |

관리자 계정으로 접속해서 스키마와 계정을 만듭니다.

```sql
CREATE SCHEMA IF NOT EXISTS book_sample;

CREATE ROLE test LOGIN PASSWORD 'test';
GRANT CONNECT ON DATABASE postgres TO test;
GRANT USAGE, CREATE ON SCHEMA book_sample TO test;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA book_sample TO test;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA book_sample TO test;
ALTER ROLE test SET search_path = book_sample;
```

> `test` / `test`는 로컬 실습 전용입니다. 실제 배포 환경에서는 반드시 다른 계정과 비밀번호를 사용하세요.

---

## 8. Backend 실행 (FastAPI + uv)

```bash
cd backend
uv sync
```

`uv sync`는 `.venv` 가상환경을 만들고 `pyproject.toml`에 적힌 패키지를 설치합니다. 처음 한 번만 실행하면 되고, 패키지가 바뀌었을 때 다시 실행합니다.

개발 서버를 실행합니다. `--reload` 옵션을 주면 코드를 저장할 때마다 서버가 자동으로 다시 시작됩니다 (hot reload).

```bash
uv run uvicorn main:app --reload
```

또는 `main.py`를 직접 실행해도 같은 설정(hot reload, 8000 포트)으로 서버가 뜹니다.

```bash
uv run main.py
```

정상적으로 실행되면 다음 주소에서 확인할 수 있습니다.

| 주소 | 내용 |
|---|---|
| http://127.0.0.1:8000 | API 서버 |
| http://127.0.0.1:8000/docs | Swagger 문서 (API 목록 확인 및 테스트) |
| http://127.0.0.1:8000/redoc | ReDoc 문서 |

포트를 바꾸려면 `--port` 옵션을 사용합니다.

```bash
uv run uvicorn main:app --reload --port 8001
```

새 패키지가 필요하면 `uv add`로 추가합니다. `pyproject.toml`과 `uv.lock`이 함께 갱신됩니다.

```bash
uv add sqlalchemy
```

---

## 9. Frontend 실행 (React + Vite)

새 터미널을 열고 frontend 폴더로 이동해 패키지를 설치합니다.

```bash
cd frontend
npm install
```

개발 서버를 실행합니다. Vite 개발 서버도 코드를 저장하면 화면이 바로 갱신됩니다.

```bash
npm run dev
```

브라우저에서 다음 주소를 엽니다.

```text
http://localhost:5173
```

그 밖의 명령은 다음과 같습니다.

| 명령 | 내용 |
|---|---|
| `npm run build` | 배포용 빌드 (`dist/` 폴더 생성) |
| `npm run preview` | 빌드 결과를 로컬에서 미리 보기 |
| `npm run lint` | ESLint 코드 검사 |

---

## 10. Mobile 실행 (Flutter)

새 터미널을 열고 mobile 폴더로 이동해 패키지를 설치합니다.

```bash
cd mobile
flutter pub get
```

실행할 수 있는 기기(에뮬레이터, 연결된 휴대폰, 브라우저 등)를 확인합니다.

```bash
flutter devices
```

앱을 실행합니다. 기기를 지정하지 않으면 실행 가능한 기기 중에서 고르라고 안내합니다.

```bash
flutter run
```

기기를 지정하려면 `-d` 옵션을 사용합니다.

```bash
flutter run -d chrome           # 웹 브라우저
flutter run -d emulator-5554    # Android 에뮬레이터 (flutter devices에 나온 ID)
```

실행 중인 터미널에서 다음 키로 변경 사항을 반영할 수 있습니다.

| 키 | 내용 |
|---|---|
| `r` | Hot reload (상태를 유지한 채 코드 반영) |
| `R` | Hot restart (앱을 처음부터 다시 시작) |
| `q` | 종료 |

> Windows 데스크톱 앱(`-d windows`)으로 실행하려면 Visual Studio의 "Desktop development with C++" 구성 요소가 필요합니다. Android, 웹 실행에는 필요하지 않습니다.

---

# 전체 실행 순서

터미널을 여러 개 열어 각각 실행합니다.

```bash
# Terminal 1 — Backend
cd backend
uv run uvicorn main:app --reload

# Terminal 2 — Frontend
cd frontend
npm run dev

# Terminal 3 — Mobile
cd mobile
flutter run
```

| 서비스 | 기본 주소 |
|---|---|
| Backend (FastAPI) | http://127.0.0.1:8000 |
| Frontend (Vite) | http://localhost:5173 |
| PostgreSQL | localhost:5432 |

---

# 문제 해결

## 포트가 이미 사용 중입니다

다른 프로그램이 같은 포트를 쓰고 있으면 서버가 시작되지 않습니다. 이미 띄워둔 서버가 있는지 확인하고 종료하거나, 다른 포트로 실행합니다.

```bash
uv run uvicorn main:app --reload --port 8001   # Backend
npm run dev -- --port 5174                     # Frontend
```

## `flutter pub get`이 SDK 버전 오류로 실패합니다

`pubspec.yaml`이 요구하는 Dart 버전보다 설치된 Flutter SDK가 오래된 경우입니다. Flutter를 최신 버전으로 올립니다.

```bash
flutter upgrade
```

## VS Code에서 빨간 줄(오류 표시)이 사라지지 않습니다

- Python: 명령 팔레트(`Ctrl+Shift+P`) → "Python: Select Interpreter"에서 `backend/.venv`를 선택합니다.
- Flutter: `flutter pub get`을 실행한 뒤 명령 팔레트 → "Dart: Restart Analysis Server"를 실행합니다.

---

# 이 프로젝트에서 다루지 않는 것

이 책은 개발의 전체 구조와 흐름을 이해하는 입문서이므로 다음 주제를 깊게 다루지 않습니다.

- 고급 Python / TypeScript / Dart 문법
- React 렌더링 최적화
- FastAPI 내부 구조 심화
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
