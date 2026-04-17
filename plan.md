# 농림축산식품부 동물복지인증 평가 시스템 구축 계획

이 프로젝트는 농림축산식품부의 동물복지인증 평가를 위한 웹 시스템으로, 정갈하고 신뢰감 있는 공공기관 스타일의 디자인을 지향합니다.

## User Review Required

> [!IMPORTANT]
> **로그인 방식 관련**: Supabase Auth는 기본적으로 이메일 또는 전화번호 로그인을 요구합니다. "단순 ID" 사용을 위해 다음 중 하나를 선택해야 합니다:
> 1. 내부적으로 `ID@domain.com` 형식으로 변환하여 Supabase Auth 사용.
> 2. Supabase Database의 별도 `users` 테이블을 생성하여 직접 ID/Password 대조 (보안상 1번 권장).
> 본 계획에서는 **1번 방식**을 제안하며, 사용자는 화면에서 ID만 입력합니다.

## Proposed Changes

### 디자인 시스템
- **색상**: #003366 (Deep Blue - 신뢰), #F8F9FA (Light Gray - 배경), #FFFFFF (White)
- **폰트**: Noto Sans KR (Google Fonts)
- **UI**: 정렬된 그리드, 명확한 타이포그래피, 직관적인 내비게이션

### 구성 요소

#### 1. [NEW] index.html (로그인 페이지)
- 공공기관 스타일의 깔끔한 로그인 UI
- ID(단순 ID)/PW 입력 폼
- Supabase 연동 로직

#### 2. [NEW] dashboard.html (공통 대시보드 및 리다이렉터)
- 로그인 후 사용자의 역할(관리자, 농장주, 평가자)에 따라 각각의 페이지로 이동시키는 로직 포함

#### 3. [NEW] admin.html (관리자 페이지)
- 전체 농장 관리, 평가자 배정, 인증 현황 통계 대시보드

#### 4. [NEW] farm.html (농장주 페이지)
- 내 농장 정보 관리, 인증 신청 현황, 자가 진단 기능

#### 5. [NEW] evaluator.html (평가자 페이지)
- 배정된 농장 목록, 현장 평가 결과 입력, 보고서 작성 기능

#### 6. [NEW] style.css (글로벌 스타일)
- 공통 디자인 테마 및 반응형 레이아웃 정의

#### 7. [NEW] auth.js (공통 스크립트)
- Supabase 클라이언트 설정 및 권한 체크 로직

## Verification Plan

### Automated Tests
- Supabase 연결 테스트
- 역할별 페이지 접근 제어 테스트

### Manual Verification
- 로그인 흐름 확인 (ID -> 역할 확인 -> 해당 대시보드 이동)
- 브라우저별(Chrome, Edge) UI 레이아웃 확인
