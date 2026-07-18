import os

files = {
    'backend/pyproject.toml': '''[project]
name = "stadium-copilot-backend"
version = "0.1.0"
description = "FastAPI backend for Stadium Copilot AI"
requires-python = ">=3.12"
dependencies = [
    "fastapi>=0.111.0",
    "uvicorn>=0.30.1",
    "sqlalchemy[asyncio]>=2.0.30",
    "alembic>=1.13.1",
    "asyncpg>=0.29.0",
    "pydantic>=2.7.4",
    "pydantic-settings>=2.3.4",
    "redis>=5.0.6",
    "pyjwt>=2.8.0",
    "passlib[bcrypt]>=1.7.4",
]

[project.optional-dependencies]
dev = [
    "pytest>=8.2.2",
    "pytest-asyncio>=0.23.7",
    "ruff>=0.4.10",
    "black>=24.4.2",
]
''',
    'backend/.env.example': '''# Database Configuration
POSTGRES_USER=stadium_admin
POSTGRES_PASSWORD=stadium_secret
POSTGRES_DB=stadium_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
DATABASE_URL=postgresql+asyncpg://:@:/

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# Authentication
SECRET_KEY=generate_a_secure_random_string_here_32_bytes
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
''',
    'backend/Dockerfile': '''FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Install uv for fast dependency resolution
RUN pip install uv

# Copy dependencies
COPY pyproject.toml ./

# Install dependencies using uv
RUN uv pip install --system -r pyproject.toml

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Start command
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
''',
    'backend/docker-compose.yml': '''version: "3.9"

services:
  db:
    image: postgres:16-alpine
    container_name: stadium_db
    environment:
      POSTGRES_USER: stadium_admin
      POSTGRES_PASSWORD: stadium_secret
      POSTGRES_DB: stadium_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U stadium_admin -d stadium_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: stadium_redis
    ports:
      - "6379:6379"

  api:
    build: .
    container_name: stadium_api
    ports:
      - "8000:8000"
    environment:
      - POSTGRES_USER=stadium_admin
      - POSTGRES_PASSWORD=stadium_secret
      - POSTGRES_DB=stadium_db
      - POSTGRES_HOST=db
      - POSTGRES_PORT=5432
      - DATABASE_URL=postgresql+asyncpg://stadium_admin:stadium_secret@db:5432/stadium_db
      - REDIS_URL=redis://redis:6379/0
      - SECRET_KEY=super_secret_key_for_dev_only
      - ALGORITHM=HS256
      - ACCESS_TOKEN_EXPIRE_MINUTES=30
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    volumes:
      - .:/app

volumes:
  postgres_data:
''',
    'backend/README.md': '''# Stadium Copilot AI Backend

FastAPI backend for the Stadium Copilot AI platform.

## Stack
- Python 3.12
- FastAPI
- SQLAlchemy 2.0 (async)
- PostgreSQL
- Redis
- Docker

## Getting Started

### Local Development (Docker)

1. Create a .env file from the example:
`ash
cp .env.example .env
`

2. Start the services (API, DB, Redis):
`ash
docker-compose up -d --build
`

3. Run migrations inside the container:
`ash
docker-compose exec api alembic upgrade head
`

4. The API will be available at http://localhost:8000
5. OpenAPI documentation is at http://localhost:8000/docs

### Local Development (Native)

1. Ensure PostgreSQL and Redis are running locally.
2. Install uv or poetry and install dependencies:
`ash
pip install uv
uv pip install -r pyproject.toml
`
3. Run the development server:
`ash
uvicorn app.main:app --reload
`
''',
    'backend/app/__init__.py': '',
    'backend/app/main.py': '''from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.logging import setup_logging
import logging

# Setup structured logging
setup_logging()
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend API for Stadium Copilot AI",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint for Docker and Load Balancers."""
    return {"status": "ok", "project": settings.PROJECT_NAME}

# TODO: Include routers here once implemented
# app.include_router(api_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting up {settings.PROJECT_NAME}...")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info(f"Shutting down {settings.PROJECT_NAME}...")
''',
    'backend/app/core/config.py': '''from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Stadium Copilot AI"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["*"] # In production, restrict this
    
    # Database
    DATABASE_URL: str
    
    # Redis
    REDIS_URL: str
    
    # JWT Auth
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
''',
    'backend/app/core/logging.py': '''import logging
import sys

def setup_logging():
    """Configure structured logging for the application."""
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.StreamHandler(sys.stdout)
        ]
    )
''',
    'backend/app/db/session.py': '''from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from app.core.config import settings

# Create async SQLAlchemy engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False, # Set to True for SQL query logging
    future=True,
    pool_pre_ping=True
)

# Async session factory
AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

async def get_db():
    """Dependency for getting async database session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()
''',
    'backend/app/db/base.py': '''from sqlalchemy.orm import declarative_base

# Base class for all SQLAlchemy 2.0 models
Base = declarative_base()
''',
    'backend/alembic.ini': '''# A generic, single database configuration.

[alembic]
script_location = alembic
prepend_sys_path = .
version_path_separator = os

sqlalchemy.url = driver://user:pass@localhost/dbname

[post_write_hooks]

[loggers]
keys = root,sqlalchemy,alembic

[handlers]
keys = console

[formatters]
keys = generic

[logger_root]
level = WARN
handlers = console
qualname =

[logger_sqlalchemy]
level = WARN
handlers =
qualname = sqlalchemy.engine

[logger_alembic]
level = INFO
handlers =
qualname = alembic

[handler_console]
class = StreamHandler
args = (sys.stderr,)
level = NOTSET
formatter = generic

[formatter_generic]
format = %(levelname)-5.5s [%(name)s] %(message)s
datefmt = %H:%M:%S
''',
    'backend/alembic/env.py': '''import asyncio
from logging.config import fileConfig

from sqlalchemy import pool
from sqlalchemy.engine import Connection
from sqlalchemy.ext.asyncio import async_engine_from_config

from alembic import context

from app.core.config import settings
from app.db.base import Base

# Import all models here so Alembic can see them
# e.g., from app.models.user import User

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def do_run_migrations(connection: Connection) -> None:
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()

async def run_async_migrations() -> None:
    """In this scenario we need to create an Engine
    and associate a connection with the context.
    """
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    asyncio.run(run_async_migrations())

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
''',
    'backend/alembic/script.py.mako': '''"""

Revision ID: 
Revises: 
Create Date: 

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = ''
down_revision: Union[str, None] = 
branch_labels: Union[str, Sequence[str], None] = 
depends_on: Union[str, Sequence[str], None] = 


def upgrade() -> None:
    


def downgrade() -> None:
    
'''
}

for path, content in files.items():
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Files created successfully.")
