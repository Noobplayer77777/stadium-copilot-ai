from pydantic import BaseModel, ConfigDict
from datetime import datetime


class MatchBase(BaseModel):
    id: int
    stadium_id: int
    team_home: str
    team_away: str
    kickoff_time: datetime
    status: str


class MatchCreate(MatchBase):
    pass


class MatchUpdate(MatchBase):
    pass


class MatchResponse(MatchBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
