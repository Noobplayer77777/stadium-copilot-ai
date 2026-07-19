from pydantic import BaseModel, ConfigDict
import uuid


class IncidentBase(BaseModel):
    id: uuid.UUID
    zone_id: uuid.UUID
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
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)
