from typing import Annotated

from fastapi import HTTPException, UploadFile, status, APIRouter, Depends, File
from sqlalchemy import select

from app.dependencies.auth import SessionDep
from app.models.db_models import User, Completion, Status
from app.models.api_models import CompletionResponse, CompletionCreate, CompletionStatusUpdate, PendingCompletionResponse
from app.dependencies.auth import get_current_active_user, get_current_admin_user
from app.services.s3 import S3Service


router = APIRouter(prefix="/completions", responses={401: {"description": "Not authenticated"}}, tags=["completions"])
s3_service = S3Service()


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
    stmt = select(Completion).where(Completion.demon_id == completion.demon_id, Completion.user_id == current_user.id)
    existing_completion = db.scalar(stmt)
    
    if existing_completion and existing_completion.status != Status.REJECTED:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Completion for this demon already exists.")
    
    if existing_completion and existing_completion.status == Status.REJECTED:
        db.delete(existing_completion)
        db.commit()
    
    new_completion = Completion(
        user_id=current_user.id,
        demon_id=completion.demon_id,
        proof_link=completion.proof_link,
    )

    db.add(new_completion)
    db.commit()
    db.refresh(new_completion)
    
    return new_completion


@router.post("/upload")
def submit_completion_file(
    db: SessionDep, current_user: Annotated[User, Depends(get_current_active_user)], file: UploadFile = File(...), demon_id: int | None = None
) -> dict:
    stmt = select(Completion).where(Completion.demon_id == demon_id, Completion.user_id == current_user.id)
    completion = db.scalar(stmt)
    
    if completion and completion.status != Status.REJECTED:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Completion for this demon already exists.")
    
    if file.content_type not in ["video/mp4", "video/quicktime", "video/webm"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid file type. Only MP4, MOV, WEBM allowed.")

    if not file.filename:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="No file uploaded")

    if not demon_id:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="Demon ID is required")

    if file.size is not None and file.size > 100 * 1024 * 1024:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="File size exceeds the 100MB limit")

    extension = file.filename.split(".")[-1]
    file.filename = f"{current_user.id}_completion_{demon_id}.{extension}"

    url = s3_service.upload_file(file, folder="completions")

    if not url:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to upload completion video"
        )

    new_completion = Completion(
        user_id=current_user.id,
        demon_id=demon_id,
        proof_link=url,
    )

    db.add(new_completion)
    db.commit()
    db.refresh(new_completion)

    return {"demon_id": demon_id, "status": new_completion.status, "proof_link": url}


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
