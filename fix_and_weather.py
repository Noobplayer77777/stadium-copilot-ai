import os

# Fix main.py imports
filepath = 'backend/app/main.py'
with open(filepath, 'r') as f:
    lines = f.readlines()

out_lines = []
import_line = "from app.api.routers.api_router import api_router\n"
if import_line not in lines:
    out_lines.insert(0, import_line)

for line in lines:
    if line == import_line:
        pass # removed from middle
    elif line == "app.include_router(api_router, prefix=settings.API_V1_STR)\n":
        out_lines.append(line)
    else:
        out_lines.append(line)

out_lines.insert(6, import_line) # insert near top
with open(filepath, 'w') as f:
    f.writelines(out_lines)

# Create Weather Service
weather_svc = '''from pydantic import BaseModel

class WeatherResponse(BaseModel):
    temperature: float
    condition: str
    humidity: int

class WeatherService:
    async def get_current_weather(self, location: str) -> WeatherResponse:
        # Mock implementation
        return WeatherResponse(temperature=22.5, condition="Sunny", humidity=45)

weather_service = WeatherService()
'''
with open('backend/app/services/weather.py', 'w') as f:
    f.write(weather_svc)

# Create Weather Router
weather_router = '''from fastapi import APIRouter, Depends
from app.api.deps import get_current_active_user
from app.services.weather import weather_service, WeatherResponse

router = APIRouter()

@router.get("/", response_model=WeatherResponse)
async def get_weather(
    location: str = "stadium",
    current_user = Depends(get_current_active_user)
):
    return await weather_service.get_current_weather(location)
'''
with open('backend/app/api/routers/weather.py', 'w') as f:
    f.write(weather_router)

# Register weather router
api_router_path = 'backend/app/api/routers/api_router.py'
with open(api_router_path, 'a') as f:
    f.write('from app.api.routers import weather\n')
    f.write('api_router.include_router(weather.router, prefix="/weather", tags=["Weather"])\n')

