import pytest
from httpx import AsyncClient


async def get_token(client: AsyncClient) -> str:
    resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "test@example.com", "password": "password123"},
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    return resp.json()["access_token"]


@pytest.mark.asyncio
async def test_list_matches_requires_auth(client: AsyncClient):
    resp = await client.get("/api/v1/matches/")
    assert resp.status_code == 401


@pytest.mark.asyncio
async def test_list_matches_authenticated(client: AsyncClient):
    token = await get_token(client)
    resp = await client.get(
        "/api/v1/matches/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


@pytest.mark.asyncio
async def test_list_stadiums_authenticated(client: AsyncClient):
    token = await get_token(client)
    resp = await client.get(
        "/api/v1/stadiums/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


@pytest.mark.asyncio
async def test_list_zones_authenticated(client: AsyncClient):
    token = await get_token(client)
    resp = await client.get(
        "/api/v1/zones/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


@pytest.mark.asyncio
async def test_list_incidents_authenticated(client: AsyncClient):
    token = await get_token(client)
    resp = await client.get(
        "/api/v1/incidents/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


@pytest.mark.asyncio
async def test_list_notifications_authenticated(client: AsyncClient):
    token = await get_token(client)
    resp = await client.get(
        "/api/v1/notifications/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


@pytest.mark.asyncio
async def test_list_tasks_authenticated(client: AsyncClient):
    token = await get_token(client)
    resp = await client.get(
        "/api/v1/tasks/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 200
    assert isinstance(resp.json(), list)


@pytest.mark.asyncio
async def test_weather_authenticated(client: AsyncClient):
    token = await get_token(client)
    resp = await client.get(
        "/api/v1/weather/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 200
    data = resp.json()
    assert "temperature" in data
    assert "condition" in data


@pytest.mark.asyncio
async def test_get_match_not_found(client: AsyncClient):
    token = await get_token(client)
    resp = await client.get(
        "/api/v1/matches/99999",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 404
