from pydantic import BaseModel, ConfigDict
import uuid


class IncidentBase(BaseModel):
    id: int
    zone_id: int
    type: str
    severity: str
    status: str
    description: str
    reporter_id: uuid.UUID


class IncidentCreate(IncidentBase):
    pass


class IncidentUpdate(IncidentBase):
    pass


class IncidentResponse(IncidentBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
