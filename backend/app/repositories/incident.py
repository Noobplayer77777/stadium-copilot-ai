from app.repositories.base import BaseRepository
from app.models.operations import Incident
from app.schemas.incident import IncidentCreate, IncidentUpdate


class IncidentRepository(BaseRepository[Incident, IncidentCreate, IncidentUpdate]):
    pass


incident_repo = IncidentRepository(Incident)
