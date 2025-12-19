from fastapi import FastAPI

from app.api.auth import router as auth_router
from app.api.completions import router as completions_router
from app.api.demons import router as demons_router


app = FastAPI()

app.include_router(auth_router, prefix="/api/v1")
app.include_router(completions_router, prefix="/api/v1")
app.include_router(demons_router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {"message": "Welcome to the Demonlist API!"}