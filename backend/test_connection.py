import os
import psycopg
from dotenv import load_dotenv

load_dotenv()

conn = psycopg.connect(
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
)

with conn.cursor() as cur:
    cur.execute("SELECT COUNT(*) FROM questions")
    print("Questions in database:", cur.fetchone()[0])

conn.close()