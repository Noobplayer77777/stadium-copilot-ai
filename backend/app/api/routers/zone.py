from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.schemas.zone import ZoneResponse, ZoneCreate
from app.repositories.zone import zone_repo

router = APIRouter()


@router.get("/", response_model=List[ZoneResponse])
async def read_zones(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user=Depends(get_current_active_user),
):
    return await zone_repo.get_multi(db, skip=skip, limit=limit)


@router.get("/{id}", response_model=ZoneResponse)
async def read_zone(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    item = await zone_repo.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Zone not found")
    return item


@router.post("/", response_model=ZoneResponse)
async def create_zone(
    item: ZoneCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    return await zone_repo.create(db, obj_in=item)
