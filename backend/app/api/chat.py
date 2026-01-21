from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.ai_service import ask_ai_with_fallback, get_victors_context
from app.db.db import SessionDep


router = APIRouter(
    prefix="/chat",
    tags=["chat"],
    responses={404: {"description": "Not found"}},
)


class ChatRequest(BaseModel):
    query: str


class ChatResponse(BaseModel):
    response: str
    model_used: str


@router.post("/ask", response_model=ChatResponse)
async def ask_demonlist_ai(request: ChatRequest, db: SessionDep):
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty.")

    extra_context = get_victors_context(db, request.query)

    result = ask_ai_with_fallback(request.query, extra_context)

    if "error" in result:
        raise HTTPException(status_code=503, detail=result["error"])

    return result
