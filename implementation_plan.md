# 반응형 모바일 디자인 구현 계획

모바일 및 태블릿 사용자도 시스템을 편리하게 이용할 수 있도록 사이트 전체의 레이아웃과 요소를 반응형으로 개선합니다.

## User Review Required

> [!IMPORTANT]
> 사이드바 디자인이 모바일에서는 '숨김/펼침' 방식으로 변경됩니다. 상단 헤더에 햄버거 메뉴 아이콘이 추가될 예정입니다.

## Proposed Changes

### [CSS] [style.css](file:///d:/works/anti/style.css)
- `dashboard-layout`을 모바일에서 1열로 변경 (`grid-template-columns: 1fr`)
- 사이드바를 모바일에서 숨김 상태로 시작하고 토글 가능하도록 스타일 추가
- `.card-grid`와 `.form-grid`의 그리드 레이아웃을 1열로 조정
- `.data-table`에 가로 스크롤 추가 (`overflow-x: auto`)
- 모달 너비를 % 단위로 변경하여 작은 화면에 대응

### [HTML] [admin.html](file:///d:/works/anti/admin.html), [farm.html](file:///d:/works/anti/farm.html), [evaluator.html](file:///d:/works/anti/evaluator.html)
- 상단 헤더에 모바일용 메뉴 토글 버튼(햄버거 아이콘) 추가
- 사이드바 토글을 위한 간단한 JavaScript 로직 추가 (또는 공통 로직으로 통합)

### [HTML] [index.html](file:///d:/works/anti/index.html)
- 로그인 박스의 최대 너비 및 패딩 조정

## Verification Plan

### Automated Tests
- 브라우저 도구를 사용하여 다양한 화면 크기(iPhone SE, iPad, Desktop)에서 레이아웃 확인
- 사이드바 토글 기능 작동 여부 확인
- 테이블 가로 스크롤 작동 여부 확인

### Manual Verification
- 실제 모바일 기기 또는 브라우저 개발자 도구의 모바일 에뮬레이션을 통해 모든 페이지의 가독성 및 조작성 확인
