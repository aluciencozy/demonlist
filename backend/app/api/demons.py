from fastapi import APIRouter

from app.db.db import SessionDep
from app.models.db_models import Demon
from app.models.api_models import DemonlistResponse


router = APIRouter(prefix="/demonlist", tags=["demonlist"], responses={404: {"description": "Not found"}})


# ! Implement pagination and rate limiting later
@router.get("/", response_model=list[DemonlistResponse])
def get_demonlist(db: SessionDep):
    return db.query(Demon).all()


@router.get("/{demon_id}", response_model=DemonlistResponse)
def get_demon(demon_id: int, db: SessionDep):
    return db.query(Demon).filter(Demon.id == demon_id).first()