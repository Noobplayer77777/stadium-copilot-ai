from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .match import Match
    from .operations import CrowdStatus

import uuid
from sqlalchemy import String, Float, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base


class Stadium(Base):
    __tablename__ = "stadiums"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True
    )
    name: Mapped[str] = mapped_column(String, nullable=False, index=True)
    city: Mapped[str] = mapped_column(String, nullable=False)
    country: Mapped[str] = mapped_column(String, nullable=False)
    capacity: Mapped[int] = mapped_column(Integer, nullable=False)
    latitude: Mapped[float | None] = mapped_column(Float, nullable=True)
    longitude: Mapped[float | None] = mapped_column(Float, nullable=True)

    matches: Mapped[list["Match"]] = relationship(back_populates="stadium")
    zones: Mapped[list["Zone"]] = relationship(back_populates="stadium")


class Zone(Base):
    __tablename__ = "zones"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True
    )
    stadium_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("stadiums.id"), nullable=False
    )
    name: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[str] = mapped_column(String, nullable=False)
    max_capacity: Mapped[int] = mapped_column(Integer, nullable=False)

    stadium: Mapped["Stadium"] = relationship(back_populates="zones")
    crowd_statuses: Mapped[list["CrowdStatus"]] = relationship(back_populates="zone")
