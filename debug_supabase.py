import json
import urllib.request

URL = "https://worigkqyaitfhxrlqrww.supabase.co/rest/v1/evaluation_items"
KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indvcmlna3F5YWl0Zmh4cmxxcnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNzk2OTIsImV4cCI6MjA5MTk1NTY5Mn0.QMXM0wKxkEJAI6j5uqwe20wyWwvEHO2HEL8iTr9wKto"

data = json.dumps([{"section": "test", "large_item": "test", "eval_method": "적부항목"}]).encode('utf-8')
req = urllib.request.Request(URL, data=data, method='POST')
req.add_header("apikey", KEY)
req.add_header("Authorization", f"Bearer {KEY}")
req.add_header("Content-Type", "application/json")

try:
    with urllib.request.urlopen(req) as response:
        print(f"Status: {response.status}")
except urllib.error.HTTPError as e:
    print(f"Error {e.code}: {e.read().decode()}")
except Exception as e:
    print(f"Exception: {e}")
