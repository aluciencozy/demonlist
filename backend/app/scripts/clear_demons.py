from sqlalchemy import create_engine, delete
from sqlalchemy.orm import Session
from app.core.config import settings
from app.models.db_models import Demon

engine = create_engine(settings.DATABASE_URL)

with Session(engine) as db:
    stmt = delete(Demon).where(Demon.ranking <= 150)
    result = db.execute(stmt)
    rows = result.fetchall()
    db.commit()
    print(f"Deleted demons. Count of demons deleted: {len(rows)}")
