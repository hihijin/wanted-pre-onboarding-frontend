# 원티드 프리온보딩 프론트엔드 코스

# 1. 배포 링크

### 📌 https://hihijintodoapp.netlify.app

# 2. 프로젝트 구조

```bash

📦 src
├── 📂 util
│   ├── 📄 customAPI.ts
│   ├── 📄 Localstorage.ts
│   ├── 📄 SweetAlert.ts
│   ├── 📄 ToastAlert.ts
├── 📂 components
│   ├── 📄 Logout.tsx
├── 📂 pages
│   ├── 📄 Landing.tsx
│   ├── 📄 Loading.tsx
│   ├── 📄 Join.tsx
│   ├── 📄 Login.tsx
│   ├── 📄 Todo.tsx
│   └── 📄 Error.tsx
├── 📄 App.tsx
├── 📄 Index.tsx
└── 📄 Global.css

```

# 3. 기능 시연 GIF

## ⭐️ 로그인 , 회원가입
![member](https://github.com/hihijin/wanted-pre-onboarding-frontend/assets/117073214/57c3bc8f-37d2-49e2-964f-58cb8b0b86f4)

✅ Assignment1

- 이메일과 비밀번호의 유효성 검사기능 구현 (이메일 조건: @ 포함, 비밀번호 조건: 8자 이상)
- 입력된 이메일과 비밀번호가 위 조건을 만족할 때만 버튼 활성화

✅ Assignment2

- 로그인 성공시 todo 페이지로 리다이렉트
- 응답받은 JWT는 로컬 스토리지에 저장

✅ Assignment3

- 로컬 스토리지에 토큰이 있는 상태로 / 페이지에 접속한다면 /todo 경로로 리다이렉트
- 로컬 스토리지에 토큰이 없는 상태로 /todo페이지에 접속한다면 / 경로로 리다이렉트

## ⭐️ Todo List
![todo](https://github.com/hihijin/wanted-pre-onboarding-frontend/assets/117073214/3e451a51-8aed-4e96-b78a-d0abdea9bc38)

✅ Assignment4

- /todo경로에 접속하면 투두 리스트의 목록 확인
- 투두 리스트의 내용과 완료 여부 표시
- 입력창과 추가 버튼이 있고, 추가 버튼을 누르면 입력창의 내용이 새로운 투두 리스트로 추가

✅ Assignment5

- 투두 리스트의 수정, 삭제 기능 구현
- 투두 리스트의 개별 아이템 우측에 수정버튼이 존재하고 해당 버튼을 누르면 수정모드가 활성화 및 내용 수정
- 수정모드에서는 개별 아이템의 우측에 제출버튼과 취소버튼이 표시되며 해당 버튼을 통해서 수정 내용을 제출 및 취소
- 투두 리스트의 개별 아이템 우측에 삭제버튼이 존재하고 해당 버튼을 누르면 투두 리스트가 삭제

📌 추가 구현

- 로그아웃 (로컬 스토리지에서 삭제)

## ⭐️ 성능 최적화

![Lighthouse](https://github.com/hihijin/wanted-pre-onboarding-frontend/assets/117073214/b8b7a381-2475-45c8-9008-4952c2f55259)

# 4. 프로젝트 설치 및 실행

1. 프로젝트 패키지 설치

```
npm install
```

2. 프로젝트 실행

```
npm start
```

# 5. 사용 라이브러리

Axios <br/>
react-router-dom <br/>
typescript <br/>
styled-components <br/>
eslint <br/>
prettier <br/>
sweetalert2 <br/>
react-spinners <br/>
styled-normalize
