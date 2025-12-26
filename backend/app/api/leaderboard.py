from fastapi import APIRouter, HTTPException
from sqlalchemy import desc, func, select

from app.db.db import SessionDep
from app.models.db_models import Demon, User, Completion, Status
from app.models.api_models import CompletionResponse, LeaderboardEntry, LeaderboardProfile


router = APIRouter(
    prefix="/leaderboard",
    tags=["leaderboard"],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
def get_leaderboard(db: SessionDep) -> list[LeaderboardEntry]:
    stmt = (
        select(User.username, User.id, func.sum(Demon.points).label("total_points"))
        .join(Completion, User.id == Completion.user_id)
        .join(Demon, Completion.demon_id == Demon.id)
        .where(Completion.status == Status.APPROVED)
        .group_by(User.id)
        .order_by(desc("total_points"))
        .limit(100)
    )
    results = db.execute(stmt).all()
    return [LeaderboardEntry(username=row.username, id=row.id, total_points=row.total_points or 0) for row in results]


@router.get("/{user_id}")
def get_leaderboard_profile(user_id: int, db: SessionDep) -> LeaderboardProfile:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    total_points = (
        db.query(func.sum(Demon.points))
        .join(Completion, Completion.demon_id == Demon.id)
        .filter(Completion.user_id == user_id, Completion.status == Status.APPROVED)
        .scalar()
    ) or 0
    
    return LeaderboardProfile(
        id=user.id,
        username=user.username,
        total_points=total_points,
        completions=[
            comp.demon_id for comp in db.query(Completion).filter(Completion.user_id == user_id, Completion.status == Status.APPROVED).all()
        ],
    )