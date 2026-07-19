import uuid
from pydantic import BaseModel, ConfigDict


class ZoneBase(BaseModel):
    id: uuid.UUID
    stadium_id: uuid.UUID
    name: str
    type: str
    capacity: int | None


class ZoneCreate(ZoneBase):
    pass


class ZoneUpdate(ZoneBase):
    pass


class ZoneResponse(ZoneBase):
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)
