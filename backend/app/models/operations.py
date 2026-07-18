from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .stadium import Zone

import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Integer, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base


class CrowdStatus(Base):
    __tablename__ = "crowd_statuses"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True
    )
    zone_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("zones.id"), nullable=False)
    occupancy: Mapped[int] = mapped_column(Integer, nullable=False)
    crowd_level: Mapped[str] = mapped_column(
        String, nullable=False
    )  # e.g., Low, Moderate, High, Critical
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    zone: Mapped["Zone"] = relationship(back_populates="crowd_statuses")


class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    severity: Mapped[str] = mapped_column(
        String, nullable=False, index=True
    )  # P1, P2, P3
    location: Mapped[str] = mapped_column(String, nullable=False)
    assigned_team: Mapped[str | None] = mapped_column(String, nullable=True)
    status: Mapped[str] = mapped_column(String, default="Open", index=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True
    )
    title: Mapped[str] = mapped_column(String, nullable=False)
    message: Mapped[str] = mapped_column(String, nullable=False)
    target_role: Mapped[str] = mapped_column(
        String, nullable=False, index=True
    )  # e.g., 'fan', 'volunteer', 'organizer', 'staff'
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
