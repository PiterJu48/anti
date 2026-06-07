-- evaluation_items 테이블에 eval_method 컬럼 추가
ALTER TABLE evaluation_items ADD COLUMN IF NOT EXISTS eval_method TEXT DEFAULT '적부항목';

-- 기존 데이터가 있다면 기본값으로 업데이트 (필요한 경우)
UPDATE evaluation_items SET eval_method = '적부항목' WHERE eval_method IS NULL;
