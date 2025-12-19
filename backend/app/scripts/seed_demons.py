import json

from sqlalchemy import create_engine
from sqlalchemy.orm import Session

from app.core.config import settings
from app.models.db_models import Base
from app.models.db_models import Demon
from app.db.db import SessionDep


try:
    with open("app/scripts/top_150_demons.json", "r", encoding="utf-8") as file:
        top_150_demons = json.load(file)
except FileNotFoundError:
    top_150_demons = []
    print("Error: File app/scripts/top_150_demons.json not found")
except json.JSONDecodeError:
    top_150_demons = []
    print("Error: Failed to decode JSON from app/scripts/top_150_demons.json")


# ! Fix Unique Constraint Error when changing ranking of demons
# ? Possible solution: clear rankings before running the script again
def create_top_150_demons(db: SessionDep):
    for demon_data in top_150_demons:
        existing_demon = db.query(Demon).filter(Demon.level_id == demon_data["level_id"]).first()
        if existing_demon:
            existing_demon.name = demon_data["name"]
            existing_demon.creator = demon_data["publisher"]["name"]
            existing_demon.verifier = demon_data["verifier"]["name"]
            existing_demon.ranking = demon_data["position"]
            existing_demon.level_id = demon_data["level_id"]
            existing_demon.preview_link = demon_data["video"]
            existing_demon.thumbnail = demon_data["thumbnail"]
        else:
            created_demon = Demon(
                name=demon_data["name"],
                creator=demon_data["publisher"]["name"],
                verifier=demon_data["verifier"]["name"],
                ranking=demon_data["position"],
                level_id=demon_data["level_id"],
                preview_link=demon_data["video"],
                thumbnail=demon_data["thumbnail"]
            )
            
            db.add(created_demon)
            
    db.commit()

    return "Top 150 demons created successfully"


def main():
    engine = create_engine(settings.DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    with Session(engine) as db:
        create_top_150_demons(db)


if __name__ == "__main__":
    main()