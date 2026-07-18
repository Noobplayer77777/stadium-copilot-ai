# Stadium Copilot AI Backend

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
