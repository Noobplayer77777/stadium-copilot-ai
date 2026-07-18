from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .user import User

import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base


class VolunteerTask(Base):
    __tablename__ = "volunteer_tasks"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True
    )
    volunteer_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    priority: Mapped[str] = mapped_column(String, nullable=False)  # low, medium, high
    status: Mapped[str] = mapped_column(String, default="Pending", index=True)
    assigned_zone: Mapped[str] = mapped_column(String, nullable=False)
    due_time: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), nullable=True
    )

    volunteer: Mapped["User"] = relationship(back_populates="volunteer_tasks")


class StaffTask(Base):
    __tablename__ = "staff_tasks"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True
    )
    staff_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    department: Mapped[str] = mapped_column(
        String, nullable=False
    )  # e.g., Maintenance, Security
    priority: Mapped[str] = mapped_column(String, nullable=False)  # low, medium, high
    status: Mapped[str] = mapped_column(String, default="Open", index=True)

    staff: Mapped["User"] = relationship(back_populates="staff_tasks")
