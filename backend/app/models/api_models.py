from pydantic import BaseModel, EmailStr, Field

from app.models.db_models import Completion, Status


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=20)
    email: EmailStr
    password: str = Field(min_length=8)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_superuser: bool
    avatar_url: str | None


class UserPasswordUpdate(BaseModel):
    old_password: str
    new_password: str = Field(min_length=8)


class CompletionUser(BaseModel):
    id: int
    username: str


class CompletionCreate(BaseModel):
    demon_id: int
    proof_link: str | None
    

class CompletionResponse(BaseModel):
    demon_id: int
    status: Status


class PendingCompletionResponse(CompletionResponse):
    id: int
    proof_link: str | None
    user: CompletionUser


class CompletionUpdate(BaseModel):
    proof_link: str


class CompletionStatusUpdate(BaseModel):
    status: Status


class DemonlistResponse(BaseModel):
    id: int
    name: str
    creator: str
    verifier: str
    ranking: int
    level_id: int
    preview_link: str | None
    thumbnail: str | None
    points: float


class DemonCompletionResponse(BaseModel):
    proof_link: str
    user: CompletionUser


class DemonDetailResponse(DemonlistResponse):
    completions: list[DemonCompletionResponse]


class LeaderboardEntry(BaseModel):
    id: int
    username: str
    total_points: float


class LeaderboardProfile(BaseModel):
    id: int
    username: str
    total_points: float
    completions: list[int]


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: int
