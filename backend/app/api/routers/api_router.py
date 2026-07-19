from fastapi import APIRouter
from app.api.routers import (
    auth,
    match,
    stadium,
    zone,
    crowd,
    incident,
    notification,
    task,
    weather,
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(match.router, prefix="/matches", tags=["Matches"])
api_router.include_router(stadium.router, prefix="/stadiums", tags=["Stadiums"])
api_router.include_router(zone.router, prefix="/zones", tags=["Zones"])
api_router.include_router(crowd.router, prefix="/crowd-status", tags=["Crowd"])
api_router.include_router(incident.router, prefix="/incidents", tags=["Incidents"])
api_router.include_router(
    notification.router, prefix="/notifications", tags=["Notifications"]
)
api_router.include_router(task.router, prefix="/tasks", tags=["Tasks"])
api_router.include_router(weather.router, prefix="/weather", tags=["Weather"])
