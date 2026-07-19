from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.schemas.notification import NotificationResponse, NotificationCreate
from app.repositories.notification import notification_repo

router = APIRouter()


@router.get("/", response_model=List[NotificationResponse])
async def read_notifications(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user=Depends(get_current_active_user),
):
    return await notification_repo.get_multi(db, skip=skip, limit=limit)


@router.get("/{id}", response_model=NotificationResponse)
async def read_notification(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    item = await notification_repo.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Notification not found")
    return item


@router.post("/", response_model=NotificationResponse)
async def create_notification(
    item: NotificationCreate,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    return await notification_repo.create(db, obj_in=item)
