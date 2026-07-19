from app.repositories.base import BaseRepository
from app.models.match import Match
from app.schemas.match import MatchCreate, MatchUpdate


class MatchRepository(BaseRepository[Match, MatchCreate, MatchUpdate]):
    pass


match_repo = MatchRepository(Match)
