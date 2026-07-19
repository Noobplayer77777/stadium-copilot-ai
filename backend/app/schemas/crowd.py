from pydantic import BaseModel, ConfigDict
from datetime import datetime


class CrowdStatusBase(BaseModel):
    id: int
    zone_id: int
    density_level: str
    head_count: int
    timestamp: datetime


class CrowdStatusCreate(CrowdStatusBase):
    pass


class CrowdStatusUpdate(CrowdStatusBase):
    pass


class CrowdStatusResponse(CrowdStatusBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
