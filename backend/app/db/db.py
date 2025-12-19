from typing import Annotated

from fastapi import Depends
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.db_models import Base

engine = create_engine(settings.DATABASE_URL)

Base.metadata.create_all(bind=engine)


def get_session():
    with Session(engine) as session:
        yield session
        

SessionDep = Annotated[Session, Depends(get_session)]