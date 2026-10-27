from typing import Annotated

from fastapi import Depends, FastAPI
from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session, sessionmaker

# 실습용 로컬 DB 접속 정보 (test / test 계정, book_sample 스키마)
DATABASE_URL = "postgresql+psycopg://test:test@localhost:5432/postgres"
DB_SCHEMA = "book_sample"

# search_path를 book_sample 스키마로 지정해서, 테이블 이름만 써도 해당 스키마를 찾도록 한다.
engine = create_engine(
    DATABASE_URL,
    connect_args={"options": f"-csearch_path={DB_SCHEMA}"},
    pool_pre_ping=True,
)
SessionLocal = sessionmaker(bind=engine, autoflush=False)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


DbSession = Annotated[Session, Depends(get_db)]

app = FastAPI()


@app.get("/")
async def root():
    return {
            "message": "Hello World"
        }


@app.get("/db-check")
def db_check(db: DbSession):
    row = db.execute(
        text("SELECT current_database(), current_schema(), version()")
    ).one()
    return {
        "database": row[0],
        "schema": row[1],
        "version": row[2],
    }
