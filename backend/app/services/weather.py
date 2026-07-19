from pydantic import BaseModel


class WeatherResponse(BaseModel):
    temperature: float
    condition: str
    humidity: int


class WeatherService:
    async def get_current_weather(self, location: str) -> WeatherResponse:
        # Mock implementation
        return WeatherResponse(temperature=22.5, condition="Sunny", humidity=45)


weather_service = WeatherService()
