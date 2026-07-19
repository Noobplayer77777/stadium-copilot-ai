from app.repositories.base import BaseRepository
from app.models.tasks import VolunteerTask
from app.schemas.task import TaskCreate, TaskUpdate


class TaskRepository(BaseRepository[VolunteerTask, TaskCreate, TaskUpdate]):
    pass


task_repo = TaskRepository(VolunteerTask)
