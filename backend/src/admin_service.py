from .config import STATION_MASTER_PATH, UNMATCHED_QUEUE_PATH
from .storage import load_json, save_json
from .utils import make_match_key, now_iso


def add_station_to_master(
    station_id: str,
    name: str,
    brand: str,
    province: str,
    district: str,
    lat: float,
    lng: float,
) -> dict:
    station_master = load_json(STATION_MASTER_PATH, [])
    unmatched_queue = load_json(UNMATCHED_QUEUE_PATH, [])

    record = {
        "station_id": station_id,
        "name": name,
        "brand": brand,
        "province": province,
        "district": district,
        "lat": lat,
        "lng": lng,
        "source": "manual_verified",
        "verified_at": now_iso(),
        "status_match_key": make_match_key(name, district, province),
    }

    station_master.append(record)
    save_json(STATION_MASTER_PATH, station_master)

    unmatched_queue = [
        x for x in unmatched_queue
        if x["raw_key"] != record["status_match_key"]
    ]
    save_json(UNMATCHED_QUEUE_PATH, unmatched_queue)

    return {"ok": True, "station": record}
