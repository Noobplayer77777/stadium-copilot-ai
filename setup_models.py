import os

files = {
    'backend/app/models/__init__.py': '''from .user import User, Role
from .stadium import Stadium, Zone
from .match import Match
from .operations import CrowdStatus, Incident, Notification
from .tasks import VolunteerTask, StaffTask
from .ai import ChatHistory

__all__ = [
    "User", "Role", "Stadium", "Zone", "Match", "CrowdStatus", 
    "Incident", "Notification", "VolunteerTask", "StaffTask", "ChatHistory"
]
''',
    
    'backend/app/models/user.py': '''import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class Role(Base):
    __tablename__ = "roles"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    description: Mapped[str | None] = mapped_column(String, nullable=True)

    users: Mapped[list["User"]] = relationship(back_populates="role")

class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    full_name: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String, unique=True, index=True, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False)
    role_id: Mapped[int] = mapped_column(ForeignKey("roles.id"), nullable=False)
    phone: Mapped[str | None] = mapped_column(String, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    role: Mapped["Role"] = relationship(back_populates="users")
    chat_histories: Mapped[list["ChatHistory"]] = relationship(back_populates="user")
    volunteer_tasks: Mapped[list["VolunteerTask"]] = relationship(back_populates="volunteer")
    staff_tasks: Mapped[list["StaffTask"]] = relationship(back_populates="staff")
''',
    
    'backend/app/models/stadium.py': '''import uuid
from sqlalchemy import String, Float, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class Stadium(Base):
    __tablename__ = "stadiums"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
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

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    stadium_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("stadiums.id"), nullable=False)
    name: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[str] = mapped_column(String, nullable=False)
    max_capacity: Mapped[int] = mapped_column(Integer, nullable=False)

    stadium: Mapped["Stadium"] = relationship(back_populates="zones")
    crowd_statuses: Mapped[list["CrowdStatus"]] = relationship(back_populates="zone")
''',
    
    'backend/app/models/match.py': '''import uuid
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class Match(Base):
    __tablename__ = "matches"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    stadium_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("stadiums.id"), nullable=False)
    team_home: Mapped[str] = mapped_column(String, nullable=False)
    team_away: Mapped[str] = mapped_column(String, nullable=False)
    kickoff_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    status: Mapped[str] = mapped_column(String, default="Scheduled")

    stadium: Mapped["Stadium"] = relationship(back_populates="matches")
''',
    
    'backend/app/models/operations.py': '''import uuid
from datetime import datetime, timezone
from sqlalchemy import String, Integer, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class CrowdStatus(Base):
    __tablename__ = "crowd_statuses"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    zone_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("zones.id"), nullable=False)
    occupancy: Mapped[int] = mapped_column(Integer, nullable=False)
    crowd_level: Mapped[str] = mapped_column(String, nullable=False)  # e.g., Low, Moderate, High, Critical
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    zone: Mapped["Zone"] = relationship(back_populates="crowd_statuses")

class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    severity: Mapped[str] = mapped_column(String, nullable=False, index=True) # P1, P2, P3
    location: Mapped[str] = mapped_column(String, nullable=False)
    assigned_team: Mapped[str | None] = mapped_column(String, nullable=True)
    status: Mapped[str] = mapped_column(String, default="Open", index=True)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class Notification(Base):
    __tablename__ = "notifications"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    message: Mapped[str] = mapped_column(String, nullable=False)
    target_role: Mapped[str] = mapped_column(String, nullable=False, index=True) # e.g., 'fan', 'volunteer', 'organizer', 'staff'
    is_read: Mapped[bool] = mapped_column(Boolean, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
''',
    
    'backend/app/models/tasks.py': '''import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class VolunteerTask(Base):
    __tablename__ = "volunteer_tasks"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    volunteer_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    priority: Mapped[str] = mapped_column(String, nullable=False) # low, medium, high
    status: Mapped[str] = mapped_column(String, default="Pending", index=True)
    assigned_zone: Mapped[str] = mapped_column(String, nullable=False)
    due_time: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    volunteer: Mapped["User"] = relationship(back_populates="volunteer_tasks")

class StaffTask(Base):
    __tablename__ = "staff_tasks"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    staff_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    department: Mapped[str] = mapped_column(String, nullable=False) # e.g., Maintenance, Security
    priority: Mapped[str] = mapped_column(String, nullable=False) # low, medium, high
    status: Mapped[str] = mapped_column(String, default="Open", index=True)

    staff: Mapped["User"] = relationship(back_populates="staff_tasks")
''',
    
    'backend/app/models/ai.py': '''import uuid
from datetime import datetime, timezone
from sqlalchemy import String, DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

class ChatHistory(Base):
    __tablename__ = "chat_histories"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"), nullable=False)
    role: Mapped[str] = mapped_column(String, nullable=False) # 'user' or 'assistant'
    message: Mapped[str] = mapped_column(Text, nullable=False)
    timestamp: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), index=True)

    user: Mapped["User"] = relationship(back_populates="chat_histories")
'''
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Models created successfully.")
