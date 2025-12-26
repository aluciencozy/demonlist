from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.db_models import Demon

engine = create_engine(settings.DATABASE_URL)

with Session(engine) as db:
    deleted_count = db.query(Demon).filter(Demon.ranking <= 150).delete()
    db.commit()
    print(f"Deleted {deleted_count} demons.")
