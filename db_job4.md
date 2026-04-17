-- 공식 평가 보고서 저장 테이블 생성
create table if not exists evaluation_reports (
  id bigint primary key generated always as identity,
  farm_id bigint references farms(id), -- 대상 농장 (FK)
  evaluator_id text,                   -- 평가자 ID
  score int,                          -- 최종 점수 (%)
  summary text,                        -- 종합 평가 의견
  details jsonb,                       -- 상세 평가 내역 (항목별 적합/부적합/NA 및 개별 의견)
  created_at timestamp with time zone default now()
);

-- 보안 정책 해제 (테스트용)
alter table evaluation_reports enable row level security;
create policy "Allow all access" on evaluation_reports for all using (true);
