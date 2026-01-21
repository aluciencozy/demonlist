from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.completions import router as completions_router
from app.api.demons import router as demons_router
from app.api.users import router as users_router
from app.api.chat import router as chat_router
from app.api.leaderboard import router as leaderboard_router
from app.models.db_models import Base, User, Demon, Completion
from app.db.db import engine


origins = ["http://localhost", "http://localhost:3000", "http://demonlist.vercel.app"]


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Startup event: Application is starting...")
    Base.metadata.create_all(bind=engine)
    yield
    print("Shutdown event: Application is closing.")


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1")
app.include_router(completions_router, prefix="/api/v1")
app.include_router(demons_router, prefix="/api/v1")
app.include_router(leaderboard_router, prefix="/api/v1")
app.include_router(users_router, prefix="/api/v1")
app.include_router(chat_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {"message": "Welcome to the Demonlist API!"}
