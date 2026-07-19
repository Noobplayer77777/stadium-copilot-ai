from pydantic import BaseModel, ConfigDict


class ZoneBase(BaseModel):
    id: int
    stadium_id: int
    name: str
    type: str
    capacity: int | None


class ZoneCreate(ZoneBase):
    pass


class ZoneUpdate(ZoneBase):
    pass


class ZoneResponse(ZoneBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
