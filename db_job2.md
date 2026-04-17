-- 평가항목 테이블 생성
create table if not exists evaluation_items (
  id bigint primary key generated always as identity,
  section text,                -- 섹션 (□ 일반기준 등)
  large_item text,             -- 대항목 (A열)
  small_item text,             -- 소항목 (B열)
  standard text,               -- 평가 기준 (C열)
  compliance_criteria text,    -- 적합 기준 (F열)
  result text,                 -- 평가 결과 (G열)
  created_at timestamp with time zone default now()
);

-- 보안 정책 해제 (테스트용)
alter table evaluation_items enable row level security;
create policy "Allow all access" on evaluation_items for all using (true);
