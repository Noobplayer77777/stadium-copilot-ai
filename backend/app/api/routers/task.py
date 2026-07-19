from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import get_db, get_current_active_user
from app.schemas.task import TaskResponse
from app.repositories.task import task_repo

router = APIRouter()


@router.get("/", response_model=List[TaskResponse])
async def read_tasks(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user=Depends(get_current_active_user),
):
    return await task_repo.get_multi(db, skip=skip, limit=limit)


@router.get("/{id}", response_model=TaskResponse)
async def read_task(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user=Depends(get_current_active_user),
):
    item = await task_repo.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Task not found")
    return item
