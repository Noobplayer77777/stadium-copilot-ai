from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.schemas.incident import IncidentResponse, IncidentCreate
from app.repositories.incident import incident_repo

router = APIRouter()


@router.get("/", response_model=List[IncidentResponse])
async def read_incidents(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user=Depends(get_current_active_user),
):
    return await incident_repo.get_multi(db, skip=skip, limit=limit)


@router.get("/{id}", response_model=IncidentResponse)
async def read_incident(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    item = await incident_repo.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Incident not found")
    return item


@router.post("/", response_model=IncidentResponse)
async def create_incident(
    item: IncidentCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    return await incident_repo.create(db, obj_in=item)
