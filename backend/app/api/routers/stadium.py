from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.schemas.stadium import StadiumResponse, StadiumCreate
from app.repositories.stadium import stadium_repo

router = APIRouter()


@router.get("/", response_model=List[StadiumResponse])
async def read_stadiums(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user=Depends(get_current_active_user),
):
    return await stadium_repo.get_multi(db, skip=skip, limit=limit)


@router.get("/{id}", response_model=StadiumResponse)
async def read_stadium(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    item = await stadium_repo.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Stadium not found")
    return item


@router.post("/", response_model=StadiumResponse)
async def create_stadium(
    item: StadiumCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    return await stadium_repo.create(db, obj_in=item)
