from pydantic import BaseModel, ConfigDict
from datetime import datetime


class NotificationBase(BaseModel):
    id: int
    title: str
    body: str
    type: str
    target_role: str
    created_at: datetime


class NotificationCreate(NotificationBase):
    pass


class NotificationUpdate(NotificationBase):
    pass


class NotificationResponse(NotificationBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
