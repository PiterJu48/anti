import csv
import json
import urllib.request

# Supabase 설정
URL = "https://worigkqyaitfhxrlqrww.supabase.co/rest/v1/evaluation_items"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvcmlna3F5YWl0Zmh4cmxxcnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzk2OTIsImV4cCI6MjA5MTk1NTY5Mn0.QMXM0wKxkEJAI6j5uqwe20wyWwvEHO2HEL8iTr9wKto"

CSV_FILE = "d:/works/anti/mafra.csv"

def import_data():
    items = []
    current_section = "일반기준"
    
    try:
        # 1. 기존 데이터 삭제
        delete_req = urllib.request.Request(URL + "?id=gt.0", method='DELETE')
        delete_req.add_header("apikey", KEY)
        delete_req.add_header("Authorization", f"Bearer {KEY}")
        with urllib.request.urlopen(delete_req) as response:
            print(f"Existing data deleted. Status: {response.status}")

        # 2. 새로운 데이터 읽기
        # 한국어 엑셀 CSV는 보통 cp949(ANSI) 인코딩임
        with open(CSV_FILE, mode='r', encoding='cp949') as f:
            reader = csv.reader(f)
            for row in reader:
                if not row or len(row) < 3:
                    continue
                
                # 섹션 헤더 체크 (예: □로 시작하거나 특정 키워드)
                if row[0].startswith('□'):
                    current_section = row[0]
                    continue
                
                # 데이터 매핑 (A:0, B:1, C:2, F:5, G:6)
                try:
                    large_item = row[0].strip()
                    small_item = row[1].strip() if len(row) > 1 else ""
                    standard = row[2].strip() if len(row) > 2 else ""
                    compliance = row[5].strip() if len(row) > 5 else ""
                    result = row[6].strip() if len(row) > 6 else ""
                    
                    if not large_item and not standard:
                        continue
                        
                    items.append({
                        "section": current_section,
                        "large_item": large_item,
                        "small_item": small_item,
                        "standard": standard,
                        "compliance_criteria": compliance,
                        "result": result
                    })
                except IndexError:
                    continue
                    
        # 3. Supabase에 데이터 전송 (Bulk Insert)
        if items:
            data = json.dumps(items).encode('utf-8')
            req = urllib.request.Request(URL, data=data, method='POST')
            req.add_header("apikey", KEY)
            req.add_header("Authorization", f"Bearer {KEY}")
            req.add_header("Content-Type", "application/json")
            req.add_header("Prefer", "return=minimal")
            
            with urllib.request.urlopen(req) as response:
                print(f"Successfully imported {len(items)} items. Status: {response.status}")
        else:
            print("No items found to import.")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    import_data()
