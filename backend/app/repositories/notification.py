from app.repositories.base import BaseRepository
from app.models.operations import Notification
from app.schemas.notification import NotificationCreate, NotificationUpdate


class NotificationRepository(
    BaseRepository[Notification, NotificationCreate, NotificationUpdate]
):
    pass


notification_repo = NotificationRepository(Notification)
