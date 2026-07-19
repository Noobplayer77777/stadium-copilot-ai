import uuid
from pydantic import BaseModel, ConfigDict
from datetime import datetime


class MatchBase(BaseModel):
    id: uuid.UUID
    stadium_id: uuid.UUID
    team_home: str
    team_away: str
    kickoff_time: datetime
    status: str


class MatchCreate(MatchBase):
    pass


class MatchUpdate(MatchBase):
    pass


class MatchResponse(MatchBase):
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)
