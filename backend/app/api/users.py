from typing import Annotated

from fastapi import Depends, status, HTTPException, UploadFile, APIRouter, File

from app.db.db import SessionDep
from app.models.db_models import User
from app.models.api_models import UserResponse, UserPasswordUpdate
from app.dependencies.auth import get_current_active_user
from app.services.s3 import S3Service
from app.services.auth_service import get_password_hash, verify_password


s3_service = S3Service()
router = APIRouter(
    prefix="/users", responses={401: {"description": "Not authenticated"}}, tags=["users"]
)

@router.get("/me", response_model=UserResponse)
async def read_me(current_user: Annotated[User, Depends(get_current_active_user)]):
    return current_user


@router.post("/me/avatar")
def upload_avatar(
    db: SessionDep,
    current_user: Annotated[User, Depends(get_current_active_user)],
    file: UploadFile = File(...),
) -> dict:
    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only JPEG, PNG, WEBP allowed.",
        )

    if not file.filename:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="No file uploaded")
    extension = file.filename.split(".")[-1]
    file.filename = f"{current_user.id}_avatar.{extension}"

    url = s3_service.upload_file(file, folder="avatars")

    if not url:
        raise HTTPException(
            status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to upload image"
        )

    current_user.avatar_url = url
    db.add(current_user)
    db.commit()
    db.refresh(current_user)

    return {"message": "Avatar uploaded successfully", "url": url}


@router.patch("/me/password")
def change_password(current_user: Annotated[User, Depends(get_current_active_user)], password_update: UserPasswordUpdate, db: SessionDep) -> dict:
    if not current_user or not current_user.hashed_password:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    if not verify_password(password_update.old_password, current_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Old password is incorrect")
    
    if password_update.old_password == password_update.new_password:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="New password must be different from old password")
    
    current_user.hashed_password = get_password_hash(password_update.new_password)
    
    db.add(current_user)
    db.commit()
    db.refresh(current_user)

    return {"message": "Password updated successfully"}