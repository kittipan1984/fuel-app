from fastapi import FastAPI, Query
from .sync_service import sync_live_status
from .nearby_service import get_nearby
from .admin_service import add_station_to_master
from .storage import load_json
from .config import UNMATCHED_QUEUE_PATH, STATION_MASTER_PATH, LIVE_STATUS_PATH, SYNC_LOGS_PATH

app = FastAPI(title="Fuel App Backend")


@app.get("/health")
def health():
    return {"ok": True}


@app.get("/sync-live-status")
def sync_live():
    return sync_live_status()


@app.get("/nearby")
def nearby(
    lat: float = Query(...),
    lng: float = Query(...),
    radius_km: float = Query(20.0),
):
    return get_nearby(lat=lat, lng=lng, radius_km=radius_km)


@app.get("/unmatched")
def unmatched():
    return load_json(UNMATCHED_QUEUE_PATH, [])


@app.get("/station-master")
def station_master():
    return load_json(STATION_MASTER_PATH, [])


@app.get("/live-status")
def live_status():
    return load_json(LIVE_STATUS_PATH, {"updated_at": None, "stations": {}})


@app.get("/sync-logs")
def sync_logs():
    return load_json(SYNC_LOGS_PATH, [])


@app.post("/admin/add-station")
def admin_add_station(
    station_id: str,
    name: str,
    brand: str,
    province: str,
    district: str,
    lat: float,
    lng: float,
):
    return add_station_to_master(
        station_id=station_id,
        name=name,
        brand=brand,
        province=province,
        district=district,
        lat=lat,
        lng=lng,
    )
