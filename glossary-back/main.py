from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

# Database setup
DATABASE_URL = "sqlite:///./glossary.db"
engine = create_engine(DATABASE_URL)
Base = declarative_base()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class GlossaryTerm(Base):
    __tablename__ = "glossary"
    keyword = Column(String, primary_key=True, index=True)
    definition = Column(String)

Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить запросы с любых источников
    allow_credentials=True,
    allow_methods=["*"],  # Разрешить любые HTTP-методы (GET, POST, DELETE и т.д.)
    allow_headers=["*"],  # Разрешить любые заголовки
)


class Term(BaseModel):
    keyword: str
    definition: str

@app.get("/terms", response_model=List[Term])
def get_terms(db: Session = Depends(get_db)):
    """Retrieve all terms."""
    terms = db.query(GlossaryTerm).all()
    return [Term(keyword=term.keyword, definition=term.definition) for term in terms]

@app.get("/terms/{keyword}", response_model=Term)
def get_term(keyword: str, db: Session = Depends(get_db)):
    """Retrieve a specific term by keyword."""
    term = db.query(GlossaryTerm).filter(GlossaryTerm.keyword.like(keyword)).first()
    if not term:
        raise HTTPException(status_code=404, detail="Term not found")
    return Term(keyword=term.keyword, definition=term.definition)

@app.post("/terms", response_model=Term)
def add_term(term: Term, db: Session = Depends(get_db)):
    """Add a new term to the glossary."""
    existing_term = db.query(GlossaryTerm).filter(GlossaryTerm.keyword == term.keyword).first()
    if existing_term:
        raise HTTPException(status_code=400, detail="Term already exists")
    new_term = GlossaryTerm(keyword=term.keyword, definition=term.definition)
    db.add(new_term)
    db.commit()
    db.refresh(new_term)
    return Term(keyword=new_term.keyword, definition=new_term.definition)

@app.put("/terms/{keyword}", response_model=Term)
def update_term(keyword: str, term: Term, db: Session = Depends(get_db)):
    """Update an existing term."""
    existing_term = db.query(GlossaryTerm).filter(GlossaryTerm.keyword == keyword).first()
    if not existing_term:
        raise HTTPException(status_code=404, detail="Term not found")
    existing_term.definition = term.definition
    db.commit()
    db.refresh(existing_term)
    return Term(keyword=existing_term.keyword, definition=existing_term.definition)

@app.delete("/terms/{keyword}", response_model=Term)
def delete_term(keyword: str, db: Session = Depends(get_db)):
    """Delete a term from the glossary."""
    existing_term = db.query(GlossaryTerm).filter(GlossaryTerm.keyword == keyword).first()
    if not existing_term:
        raise HTTPException(status_code=404, detail="Term not found")
    db.delete(existing_term)
    db.commit()
    return Term(keyword=existing_term.keyword, definition=existing_term.definition)
