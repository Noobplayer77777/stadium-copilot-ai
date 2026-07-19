from pathlib import Path

# Add task schema, repo, and router
task_schema = '''from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
import uuid

class TaskBase(BaseModel):
    title: str
    description: str
    status: str
    assigned_to: uuid.UUID

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
'''
with open('backend/app/schemas/task.py', 'w') as f:
    f.write(task_schema)

task_repo = '''from app.repositories.base import BaseRepository
from app.models.tasks import VolunteerTask
from app.schemas.task import TaskCreate, TaskUpdate

class TaskRepository(BaseRepository[VolunteerTask, TaskCreate, TaskUpdate]):
    pass

task_repo = TaskRepository(VolunteerTask)
'''
with open('backend/app/repositories/task.py', 'w') as f:
    f.write(task_repo)

task_router = '''from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import list

from app.api.deps import get_db, get_current_active_user
from app.schemas.task import TaskResponse, TaskCreate
from app.repositories.task import task_repo

router = APIRouter()

@router.get("/", response_model=list[TaskResponse])
async def read_tasks(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(get_current_active_user)
):
    return await task_repo.get_multi(db, skip=skip, limit=limit)

@router.get("/{id}", response_model=TaskResponse)
async def read_task(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    item = await task_repo.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="Task not found")
    return item
'''
with open('backend/app/api/routers/task.py', 'w') as f:
    f.write(task_router)

# Update api_router.py to include everything
api_router = '''from fastapi import APIRouter
from app.api.routers import auth, match, stadium, zone, crowd, incident, notification, task

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(match.router, prefix="/matches", tags=["Matches"])
api_router.include_router(stadium.router, prefix="/stadiums", tags=["Stadiums"])
api_router.include_router(zone.router, prefix="/zones", tags=["Zones"])
api_router.include_router(crowd.router, prefix="/crowd-status", tags=["Crowd"])
api_router.include_router(incident.router, prefix="/incidents", tags=["Incidents"])
api_router.include_router(notification.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(task.router, prefix="/tasks", tags=["Tasks"])
'''
with open('backend/app/api/routers/api_router.py', 'w') as f:
    f.write(api_router)
