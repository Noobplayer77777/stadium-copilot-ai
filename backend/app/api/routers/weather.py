from fastapi import APIRouter, Depends
from app.api.deps import get_current_active_user
from app.services.weather import weather_service, WeatherResponse

router = APIRouter()


@router.get("/", response_model=WeatherResponse)
async def get_weather(
    location: str = "stadium", current_user=Depends(get_current_active_user)
):
    return await weather_service.get_current_weather(location)
