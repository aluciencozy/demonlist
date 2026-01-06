from typing import Annotated

from fastapi import HTTPException, status, APIRouter, Depends
from sqlalchemy import select

from app.dependencies.auth import SessionDep
from app.models.db_models import User, Completion, Status
from app.models.api_models import CompletionResponse, CompletionCreate, CompletionUpdate, CompletionStatusUpdate, PendingCompletionResponse
from app.dependencies.auth import get_current_active_user, get_current_admin_user


router = APIRouter(prefix="/completions", responses={401: {"description": "Not authenticated"}}, tags=["completions"])


@router.get("/", response_model=list[CompletionResponse])
def get_my_completions(
    db: SessionDep, current_user: Annotated[User, Depends(get_current_active_user)]
):
    return (
        db.query(Completion).filter(Completion.user_id == current_user.id).all()
    )


@router.get("/pending", response_model=list[PendingCompletionResponse])
def get_pending_completions(
    db: SessionDep, current_user: Annotated[User, Depends(get_current_admin_user)]
):
    stmt = select(Completion).where(Completion.status == Status.PENDING)
    return db.scalars(stmt).all()


@router.get("/{demon_id}", response_model=CompletionResponse)
def get_completion(
    db: SessionDep, current_user: Annotated[User, Depends(get_current_active_user)], demon_id: int
):
    stmt = select(Completion).where(Completion.demon_id == demon_id, Completion.user_id == current_user.id)
    completion = db.scalar(stmt)
    
    if completion:
        return completion
    
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Completion not found.")


@router.post("/", response_model=CompletionResponse, status_code=201)
def submit_completion(
    db: SessionDep, current_user: Annotated[User, Depends(get_current_active_user)], completion: CompletionCreate
):
    new_completion = Completion(
        user_id=current_user.id,
        demon_id=completion.demon_id,
        proof_link=completion.proof_link, # ! this is probably None, change later with AWS S3
    )
    
    db.add(new_completion)
    db.commit()
    db.refresh(new_completion)
    
    return new_completion


@router.patch("/{demon_id}", response_model=CompletionResponse)
def update_completion_video(
    db: SessionDep,
    current_user: Annotated[User, Depends(get_current_active_user)],
    completion: CompletionUpdate,
    demon_id: int
):
    stmt = select(Completion).where(Completion.demon_id == demon_id, Completion.user_id == current_user.id)
    completion_to_update = db.scalar(stmt)

    if not completion_to_update:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Completion not found.")
    
    completion_to_update.proof_link = completion.proof_link
    
    db.commit()
    db.refresh(completion_to_update)
    
    return completion_to_update


@router.patch("/{completion_id}/status", response_model=CompletionResponse)
def update_completion_status(
    db: SessionDep, completion_id: int, update_data: CompletionStatusUpdate, current_user: Annotated[User, Depends(get_current_admin_user)]
):    
    if not current_user or not current_user.is_superuser:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update completion status.")
    
    stmt = select(Completion).where(Completion.id == completion_id)
    completion_to_update = db.scalar(stmt)

    if not completion_to_update:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Completion not found.")
    
    completion_to_update.status = update_data.status
    
    db.commit()
    db.refresh(completion_to_update)
    
    return completion_to_update
