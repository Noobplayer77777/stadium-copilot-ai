from pydantic import BaseModel, ConfigDict
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
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)
