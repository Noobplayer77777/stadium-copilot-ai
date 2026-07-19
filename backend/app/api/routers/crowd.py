from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.schemas.crowd import CrowdStatusResponse, CrowdStatusCreate
from app.repositories.crowd import crowd_repo

router = APIRouter()


@router.get("/", response_model=List[CrowdStatusResponse])
async def read_crowds(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user=Depends(get_current_active_user),
):
    return await crowd_repo.get_multi(db, skip=skip, limit=limit)


@router.get("/{id}", response_model=CrowdStatusResponse)
async def read_crowd(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    item = await crowd_repo.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="CrowdStatus not found")
    return item


@router.post("/", response_model=CrowdStatusResponse)
async def create_crowd(
    item: CrowdStatusCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    return await crowd_repo.create(db, obj_in=item)
