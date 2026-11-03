import os

import psycopg
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

load_dotenv()

app = FastAPI(title="LearnGap API")


def get_connection():
    return psycopg.connect(
        dbname=os.getenv("DB_NAME"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        host=os.getenv("DB_HOST"),
        port=os.getenv("DB_PORT"),
    )


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/health/db")
def health_db():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT COUNT(*) FROM questions")
            count = cur.fetchone()[0]
    return {"status": "ok", "questions": count}

@app.get("/questions")
def get_questions():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT question_id, code, prompt FROM questions ORDER BY question_id"
            )
            question_rows = cur.fetchall()

            cur.execute(
                "SELECT option_id, question_id, label, option_text "
                "FROM options ORDER BY question_id, label"
            )
            option_rows = cur.fetchall()

    questions = []
    for question_id, code, prompt in question_rows:
        options = []
        for option_id, opt_question_id, label, option_text in option_rows:
            if opt_question_id == question_id:
                options.append(
                    {"option_id": option_id, "label": label, "text": option_text}
                )
        questions.append(
            {
                "question_id": question_id,
                "code": code,
                "prompt": prompt,
                "options": options,
            }
        )
    return questions

class AnswerIn(BaseModel):
    student_id: int
    question_id: int
    option_id: int


@app.post("/answer")
def submit_answer(answer: AnswerIn):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT 1 FROM questions WHERE question_id = %s",
                (answer.question_id,),
            )
            if cur.fetchone() is None:
                raise HTTPException(status_code=404, detail="Question not found")

            cur.execute(
                "SELECT is_correct FROM options "
                "WHERE option_id = %s AND question_id = %s",
                (answer.option_id, answer.question_id),
            )
            row = cur.fetchone()
            if row is None:
                raise HTTPException(
                    status_code=400,
                    detail="Option does not belong to this question",
                )

    return {"is_correct": row[0]}