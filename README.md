# KidsEdu - 키즈 교육 플랫폼

5-10세 아동을 위한 태블릿 최적화 교육 웹 서비스입니다.

## 🎯 프로젝트 개요

-   **대상**: 5-10세 아동
-   **플랫폼**: 웹 (태블릿 최적화)
-   **UI**: 풀스크린, 키즈 친화적 디자인
-   **기술 스택**: Next.js 14, Supabase, Tailwind CSS, DaisyUI

## 🚀 주요 기능

### ✅ 구현 완료 (v1)

-   **프로필 관리**: 프로필 생성, 선택, 수정, 삭제
-   **인트로 화면**: 프로필 선택 및 생성
-   **메인 화면**: 프로그램 리스트 및 GNB
-   **프로필 설정**: 프로필 정보 수정 및 삭제
-   **프로그램 서브페이지**: 동적 라우팅 구조

### 🔄 향후 개발 예정 (v2)

-   그림 그리기 프로그램
-   글씨 따라쓰기 프로그램
-   퍼즐 맞추기 프로그램
-   퀴즈 놀이 프로그램
-   음악 놀이 프로그램
-   동화 읽기 프로그램

## 🛠️ 기술 스택

-   **Frontend**: Next.js 14, React 18, TypeScript
-   **Styling**: Tailwind CSS, DaisyUI
-   **Backend**: Supabase (Database, Auth, Storage)
-   **State Management**: React Hooks, Local Storage
-   **Deployment**: Vercel

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── intro/             # 프로필 선택 페이지
│   ├── main/              # 메인 화면
│   ├── profile-settings/  # 프로필 설정
│   ├── programs/[id]/     # 프로그램 서브페이지
│   ├── globals.css        # 글로벌 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx           # 홈페이지 (라우팅)
├── components/            # 재사용 가능한 컴포넌트
│   ├── GNB.tsx           # 글로벌 네비게이션 바
│   ├── ProfileCard.tsx   # 프로필 카드
│   ├── ProfileForm.tsx   # 프로필 폼
│   ├── ProgramCard.tsx   # 프로그램 카드
│   └── ProgramLayout.tsx  # 프로그램 레이아웃
├── hooks/                # 커스텀 훅
│   ├── useCurrentProfile.ts
│   └── useProfiles.ts
├── lib/                  # 유틸리티 및 설정
│   ├── programs.ts       # 프로그램 데이터
│   └── supabase.ts       # Supabase 클라이언트
└── types/                # TypeScript 타입 정의
    └── index.ts
```

## 🎨 디자인 시스템

### 색상 팔레트

-   **Primary**: #FFB703 (노란색)
-   **Secondary**: #8ECAE6 (하늘색)
-   **Accent**: #FB8500 (주황색)
-   **Success**: #90BE6D (초록색)
-   **Background**: #FFF8E7 (크림색)

### 폰트

-   **Noto Sans KR**: 기본 텍스트
-   **Baloo**: 제목 및 강조 텍스트
-   **Comic Neue**: 장식적 텍스트

### 인터랙션

-   **터치 타겟**: 최소 48px
-   **애니메이션**: 부드러운 전환 효과
-   **반응형**: 태블릿 최적화

## 🚀 시작하기

### 1. 환경 설정

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp env.example .env.local
```

### 2. Supabase 설정

1. [Supabase](https://supabase.com)에서 새 프로젝트 생성
2. `supabase-schema.sql` 파일을 Supabase SQL 에디터에서 실행
3. `.env.local` 파일에 Supabase URL과 키 입력

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### 프로필 이미지 설정 (중요!)

프로필 이미지가 정상적으로 표시되지 않는 경우:

1. **Storage 버킷 확인**: Supabase 대시보드 > Storage에서 `profile-images` 버킷이 생성되었는지 확인
2. **Storage 정책 확인**: 버킷의 정책이 공개 읽기로 설정되어 있는지 확인
3. **환경 변수 확인**: `.env.local` 파일의 Supabase URL과 키가 올바른지 확인
4. **브라우저 콘솔 확인**: 개발자 도구 콘솔에서 이미지 로딩 관련 오류 메시지 확인

#### Storage 정책 수동 설정 (필요시)

Supabase 대시보드 > Storage > Policies에서 다음 정책들을 수동으로 추가:

```sql
-- 프로필 이미지 읽기 허용
CREATE POLICY "프로필 이미지 읽기 허용" ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-images');

-- 프로필 이미지 업로드 허용
CREATE POLICY "프로필 이미지 업로드 허용" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'profile-images');
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📱 사용법

1. **첫 방문**: 프로필 생성 또는 선택
2. **메인 화면**: 프로그램 선택
3. **프로그램**: 각 교육 프로그램 실행 (현재는 준비 중 상태)
4. **설정**: 프로필 정보 수정 또는 삭제

## 🔧 개발 가이드

### 새로운 프로그램 추가

1. `src/lib/programs.ts`에 프로그램 정보 추가
2. `src/app/programs/[id]/page.tsx`에서 프로그램별 로직 구현
3. 필요시 새로운 컴포넌트 생성

### 스타일 커스터마이징

-   `src/app/globals.css`: 글로벌 스타일
-   `tailwind.config.js`: 테마 및 색상 설정
-   컴포넌트별 Tailwind 클래스 사용

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.
