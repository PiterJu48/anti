-- 자가 진단 결과 저장 테이블 생성
create table if not exists diagnosis_results (
  id bigint primary key generated always as identity,
  user_id text,                -- 사용자 ID
  score int,                   -- 점수 (%)
  compliant_count int,         -- 적합 항목 수
  non_compliant_count int,     -- 부적합 항목 수
  details jsonb,               -- 상세 체크 내역 (항목별 Y/N)
  created_at timestamp with time zone default now()
);

-- 보안 정책 해제 (테스트용)
alter table diagnosis_results enable row level security;
create policy "Allow all access" on diagnosis_results for all using (true);
