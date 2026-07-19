import uuid
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class CrowdStatusBase(BaseModel):
    id: uuid.UUID
    zone_id: uuid.UUID
    density_level: str
    head_count: int
    timestamp: datetime


class CrowdStatusCreate(CrowdStatusBase):
    pass


class CrowdStatusUpdate(CrowdStatusBase):
    pass


class CrowdStatusResponse(CrowdStatusBase):
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)
