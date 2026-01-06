from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import selectinload, joinedload
from sqlalchemy import select

from app.db.db import SessionDep
from app.models.db_models import Demon, Completion
from app.models.api_models import DemonlistResponse, DemonDetailResponse


router = APIRouter(prefix="/demonlist", tags=["demonlist"], responses={404: {"description": "Not found"}})


# ! Implement pagination and rate limiting later
@router.get("/", response_model=list[DemonlistResponse])
def get_demonlist(db: SessionDep):
    return db.query(Demon).all()


@router.get("/{demon_id}", response_model=DemonDetailResponse)
def get_demon(demon_id: int, db: SessionDep):
    stmt = (
        select(Demon)
        .where(Demon.id == demon_id)
        .options(selectinload(Demon.completions).joinedload(Completion.user))
    )

    demon = db.scalar(stmt)

    if not demon:
        raise HTTPException(status_code=404, detail="Demon not found")

    return demon
