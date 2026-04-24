from .config import STATION_MASTER_PATH, LIVE_STATUS_PATH, MAX_NEARBY_RESULTS
from .storage import load_json
from .utils import haversine_km


def get_nearby(lat: float, lng: float, radius_km: float = 20) -> dict:
    station_master = load_json(STATION_MASTER_PATH, [])
    live_status = load_json(LIVE_STATUS_PATH, {"updated_at": None, "stations": {}})
    live_map = live_status.get("stations", {})

    ranked = []
    for st in station_master:
        distance_km = haversine_km(lat, lng, st["lat"], st["lng"])
        item = {
            "station_id": st["station_id"],
            "name": st["name"],
            "brand": st.get("brand", "other"),
            "province": st["province"],
            "district": st["district"],
            "lat": st["lat"],
            "lng": st["lng"],
            "distance_km": round(distance_km, 2),
        }

        status = live_map.get(st["station_id"], {})
        item["g95"] = status.get("g95", "ไม่ระบุ")
        item["diesel"] = status.get("diesel", "ไม่ระบุ")
        item["g91"] = status.get("g91", "ไม่ระบุ")
        item["e20"] = status.get("e20", "ไม่ระบุ")
        item["e85"] = status.get("e85", "ไม่ระบุ")

        ranked.append(item)

    ranked.sort(key=lambda x: x["distance_km"])
    in_radius = [x for x in ranked if x["distance_km"] <= radius_km]

    if not in_radius:
        in_radius = ranked[:MAX_NEARBY_RESULTS]
        mode = "fallback"
    else:
        in_radius = in_radius[:MAX_NEARBY_RESULTS]
        mode = "radius"

    return {
        "ok": True,
        "updated_at": live_status.get("updated_at"),
        "mode": mode,
        "count": len(in_radius),
        "results": in_radius,
    }
