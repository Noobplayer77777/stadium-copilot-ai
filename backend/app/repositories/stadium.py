from app.repositories.base import BaseRepository
from app.models.stadium import Stadium
from app.schemas.stadium import StadiumCreate, StadiumUpdate


class StadiumRepository(BaseRepository[Stadium, StadiumCreate, StadiumUpdate]):
    pass


stadium_repo = StadiumRepository(Stadium)
