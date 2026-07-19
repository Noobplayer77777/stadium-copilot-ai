from app.repositories.base import BaseRepository
from app.models.operations import CrowdStatus
from app.schemas.crowd import CrowdStatusCreate, CrowdStatusUpdate


class CrowdStatusRepository(
    BaseRepository[CrowdStatus, CrowdStatusCreate, CrowdStatusUpdate]
):
    pass


crowd_repo = CrowdStatusRepository(CrowdStatus)
