from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .stadium import Stadium

import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base


class Match(Base):
    __tablename__ = "matches"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True
    )
    stadium_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("stadiums.id"), nullable=False
    )
    team_home: Mapped[str] = mapped_column(String, nullable=False)
    team_away: Mapped[str] = mapped_column(String, nullable=False)
    kickoff_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    status: Mapped[str] = mapped_column(String, default="Scheduled")

    stadium: Mapped["Stadium"] = relationship(back_populates="matches")
