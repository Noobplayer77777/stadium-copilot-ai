from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.schemas.match import MatchResponse, MatchCreate
from app.repositories.match import match_repo

router = APIRouter()


@router.get("/", response_model=List[MatchResponse])
async def read_matchs(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user=Depends(get_current_active_user),
):
    return await match_repo.get_multi(db, skip=skip, limit=limit)


@router.get("/{id}", response_model=MatchResponse)
async def read_match(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    item = await match_repo.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Match not found")
    return item


@router.post("/", response_model=MatchResponse)
async def create_match(
    item: MatchCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    return await match_repo.create(db, obj_in=item)
