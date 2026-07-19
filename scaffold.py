import os
from pathlib import Path

# Directories
schemas_dir = Path("backend/app/schemas")
repos_dir = Path("backend/app/repositories")
services_dir = Path("backend/app/services")
routers_dir = Path("backend/app/api/routers")

for d in [schemas_dir, repos_dir, services_dir, routers_dir]:
    d.mkdir(parents=True, exist_ok=True)

models_map = {
    "stadium": {"model": "Stadium", "fields": "id: int\n    name: str\n    city: str\n    country: str\n    capacity: int\n    latitude: float | None\n    longitude: float | None"},
    "zone": {"model": "Zone", "fields": "id: int\n    stadium_id: int\n    name: str\n    type: str\n    capacity: int | None"},
    "match": {"model": "Match", "fields": "id: int\n    stadium_id: int\n    team_home: str\n    team_away: str\n    kickoff_time: datetime\n    status: str"},
    "crowd": {"model": "CrowdStatus", "fields": "id: int\n    zone_id: int\n    density_level: str\n    head_count: int\n    timestamp: datetime", "db_import": "from app.models.operations import CrowdStatus"},
    "incident": {"model": "Incident", "fields": "id: int\n    zone_id: int\n    type: str\n    severity: str\n    status: str\n    description: str\n    reporter_id: uuid.UUID", "db_import": "from app.models.operations import Incident"},
    "notification": {"model": "Notification", "fields": "id: int\n    title: str\n    body: str\n    type: str\n    target_role: str\n    created_at: datetime", "db_import": "from app.models.operations import Notification"}
}

# 1. Scaffolding Schemas
for name, meta in models_map.items():
    schema_code = f'''from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime
import uuid

class {meta['model']}Base(BaseModel):
    {meta['fields'].replace('id: int\\n    ', '').replace('id: int\\n', '')}

class {meta['model']}Create({meta['model']}Base):
    pass

class {meta['model']}Update({meta['model']}Base):
    pass

class {meta['model']}Response({meta['model']}Base):
    id: int
    model_config = ConfigDict(from_attributes=True)
'''
    with open(schemas_dir / f"{name}.py", "w") as f:
        f.write(schema_code)

# 2. Scaffolding Repositories
base_repo = '''from typing import TypeVar, Generic, Type, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType")
UpdateSchemaType = TypeVar("UpdateSchemaType")

class BaseRepository(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        self.model = model

    async def get(self, db: AsyncSession, id: Any) -> ModelType | None:
        result = await db.execute(select(self.model).where(self.model.id == id))
        return result.scalars().first()

    async def get_multi(self, db: AsyncSession, skip: int = 0, limit: int = 100) -> list[ModelType]:
        result = await db.execute(select(self.model).offset(skip).limit(limit))
        return list(result.scalars().all())

    async def create(self, db: AsyncSession, *, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = obj_in.model_dump()
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        await db.commit()
        await db.refresh(db_obj)
        return db_obj
'''
with open(repos_dir / "base.py", "w") as f:
    f.write(base_repo)

for name, meta in models_map.items():
    repo_code = f'''from app.repositories.base import BaseRepository
{meta.get('db_import', f"from app.models.{name} import {meta['model']}")}
from app.schemas.{name} import {meta['model']}Create, {meta['model']}Update

class {meta['model']}Repository(BaseRepository[{meta['model']}, {meta['model']}Create, {meta['model']}Update]):
    pass

{name}_repo = {meta['model']}Repository({meta['model']})
'''
    with open(repos_dir / f"{name}.py", "w") as f:
        f.write(repo_code)

# 3. Scaffolding Routers
for name, meta in models_map.items():
    router_code = f'''from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import list

from app.api.deps import get_db, get_current_active_user
from app.schemas.{name} import {meta['model']}Response, {meta['model']}Create
from app.repositories.{name} import {name}_repo

router = APIRouter()

@router.get("/", response_model=list[{meta['model']}Response])
async def read_{name}s(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user = Depends(get_current_active_user)
):
    return await {name}_repo.get_multi(db, skip=skip, limit=limit)

@router.get("/{{id}}", response_model={meta['model']}Response)
async def read_{name}(
    id: int,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    item = await {name}_repo.get(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="{meta['model']} not found")
    return item

@router.post("/", response_model={meta['model']}Response)
async def create_{name}(
    item: {meta['model']}Create,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_active_user)
):
    return await {name}_repo.create(db, obj_in=item)
'''
    with open(routers_dir / f"{name}.py", "w") as f:
        f.write(router_code)

print("Scaffolding complete.")
