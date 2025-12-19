from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    email: EmailStr


class DemonlistResponse(BaseModel):
    id: int
    name: str
    creator: str
    verifier: str
    ranking: int
    level_id: int
    preview_link: str | None
    thumbnail: str | None
    

class CompletionCreate(BaseModel):
    demon_id: int
    proof_link: str | None


class CompletionResponse(BaseModel):
    demon_id: int
    status: str
    
    
class CompletionUpdate(BaseModel):
    proof_link: str


class LeaderboardEntry(BaseModel):
    username: str
    completions: int
    total_points: int


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    user_id: int