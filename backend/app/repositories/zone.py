from app.repositories.base import BaseRepository
from app.models.stadium import Zone
from app.schemas.zone import ZoneCreate, ZoneUpdate


class ZoneRepository(BaseRepository[Zone, ZoneCreate, ZoneUpdate]):
    pass


zone_repo = ZoneRepository(Zone)
