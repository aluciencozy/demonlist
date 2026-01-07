from typing import Annotated
from datetime import timedelta

from fastapi import Depends, status, HTTPException, UploadFile, APIRouter, File
from fastapi.security import OAuth2PasswordRequestForm

from app.db.db import SessionDep
from app.models.db_models import User
from app.models.api_models import Token, UserResponse, UserCreate
from app.dependencies.auth import get_current_active_user
from app.core.config import settings
from app.services.s3 import S3Service
from app.services.auth_service import (
    create_access_token, get_password_hash, authenticate_user, get_user_by_email
)


s3_service = S3Service()
router = APIRouter(
    prefix="/auth", responses={401: {"description": "Not authenticated"}}, tags=["auth"]
)


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(user_data: UserCreate, db: SessionDep) -> Token:    
    existing_user = get_user_by_email(db, user_data.email)
    if existing_user:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    
    new_user = User(
        username = user_data.username,
        email = user_data.email,
        hashed_password = get_password_hash(user_data.password),
        is_active = True,
        completions = [],
        is_superuser = False,
        avatar_url = None,
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(new_user.id)}, expires_delta=access_token_expires
    )
    
    return Token(access_token=access_token, token_type="bearer")


@router.post("/token")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: SessionDep
) -> Token:
    user = authenticate_user(db=db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/me", response_model=UserResponse)
async def read_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
):
    return current_user


@router.post("/me/avatar")
def upload_avatar(
    db: SessionDep,
    current_user: Annotated[User, Depends(get_current_active_user)],
    file: UploadFile = File(...),
) -> dict:
    if file.content_type not in ["image/jpeg", "image/png", "image/webp"]:
        raise HTTPException(
            status.HTTP_400_BAD_REQUEST, detail="Invalid file type. Only JPEG, PNG, WEBP allowed."
        )
        
    if not file.filename:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, detail="No file uploaded")
    extension = file.filename.split(".")[-1]
    file.filename = f"{current_user.id}_avatar.{extension}"

    url = s3_service.upload_file(file, folder="avatars")

    if not url:
        raise HTTPException(status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to upload image")

    current_user.avatar_url = url
    db.add(current_user)
    db.commit()
    db.refresh(current_user)

    return {"message": "Avatar uploaded successfully", "url": url}


@router.post("/logout")
async def logout() -> dict:
    return {"message": "Successfully logged out"}
