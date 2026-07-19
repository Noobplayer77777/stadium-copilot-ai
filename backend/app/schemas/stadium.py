import uuid
from pydantic import BaseModel, ConfigDict


class StadiumBase(BaseModel):
    id: uuid.UUID
    name: str
    city: str
    country: str
    capacity: int
    latitude: float | None
    longitude: float | None


class StadiumCreate(StadiumBase):
    pass


class StadiumUpdate(StadiumBase):
    pass


class StadiumResponse(StadiumBase):
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)
