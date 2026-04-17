-- 1. 농장 정보 테이블 생성
create table if not exists farms (
  id bigint primary key generated always as identity,
  name text not null,
  representative text not null,
  address text not null,
  facility_scale text,
  phone_number text,
  remarks text,
  created_at timestamp with time zone default now()
);

-- 2. 사용자 권한 및 프로필 테이블 생성
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  user_id_simple text unique not null, -- 단순 ID 저장 (예: admin)
  role text not null check (role in ('admin', 'farm', 'evaluator')),
  name text,
  created_at timestamp with time zone default now()
);

-- 3. 보안 정책(RLS) 해제 (테스트 편의를 위해 모든 접근 허용)
alter table farms enable row level security;
create policy "Allow all access" on farms for all using (true);

alter table profiles enable row level security;
create policy "Allow all access" on profiles for all using (true);
