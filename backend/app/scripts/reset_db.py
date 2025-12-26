from sqlalchemy import create_engine
from app.core.config import settings
from app.models.db_models import Base

engine = create_engine(settings.DATABASE_URL)

Base.metadata.drop_all(bind=engine)
print("Dropped all tables.")

Base.metadata.create_all(bind=engine)
print("Created all tables.")
