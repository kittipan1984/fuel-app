import json
from urllib.request import urlopen
from urllib.error import URLError, HTTPError
from typing import Dict, Any, List

from .config import (
    STATION_MASTER_PATH,
    LIVE_STATUS_PATH,
    UNMATCHED_QUEUE_PATH,
    SYNC_LOGS_PATH,
    DOEB_FEED_SNAPSHOT_PATH,
)
from .storage import load_json, save_json
from .matching import match_station, build_unmatched_item, build_raw_key
from .utils import now_iso


def fetch_doeb_rows() -> List[dict]:
    """
    เวอร์ชันนี้อ่านจาก data/doeb_feed_snapshot.json ก่อน
    เพื่อให้ backend รันได้ทันที

    รูปแบบไฟล์ที่รองรับ:
    1) array ของ rows
    2) object ที่มี key "rows"
    """

    data = load_json(DOEB_FEED_SNAPSHOT_PATH, {"rows": []})

    if isinstance(data, list):
        rows = data
    elif isinstance(data, dict) and isinstance(data.get("rows"), list):
        rows = data["rows"]
    else:
        rows = []

    normalized_rows = []
    for row in rows:
        normalized_rows.append({
            "name": row.get("name", ""),
            "province": row.get("province", ""),
            "district": row.get("district", "") or row.get("amphoe", ""),
            "g95": row.get("g95", "ไม่ระบุ"),
            "diesel": row.get("diesel", "ไม่ระบุ"),
            "g91": row.get("g91", "ไม่ระบุ"),
            "e20": row.get("e20", "ไม่ระบุ"),
            "e85": row.get("e85", "ไม่ระบุ"),
        })

    return normalized_rows


def sync_live_status() -> dict:
    station_master = load_json(STATION_MASTER_PATH, [])
    live_status = load_json(LIVE_STATUS_PATH, {"updated_at": None, "stations": {}})
    unmatched_queue = load_json(UNMATCHED_QUEUE_PATH, [])
    sync_logs = load_json(SYNC_LOGS_PATH, [])

    rows = fetch_doeb_rows()
    now = now_iso()

    unmatched_index = {item["raw_key"]: item for item in unmatched_queue}
    stations_out: Dict[str, Any] = {}
    matched_count = 0
    unmatched_count = 0

    for row in rows:
        matched = match_station(row, station_master)
        raw_key = build_raw_key(row)

        if matched:
            station_id = matched["station_id"]
            stations_out[station_id] = {
                "station_id": station_id,
                "name": matched["name"],
                "g95": row.get("g95", "ไม่ระบุ"),
                "diesel": row.get("diesel", "ไม่ระบุ"),
                "g91": row.get("g91", "ไม่ระบุ"),
                "e20": row.get("e20", "ไม่ระบุ"),
                "e85": row.get("e85", "ไม่ระบุ"),
                "source": "doeb",
                "raw_key": raw_key,
                "updated_at": now,
            }
            matched_count += 1
        else:
            unmatched_count += 1
            if raw_key in unmatched_index:
                unmatched_index[raw_key]["last_seen_at"] = now
                unmatched_index[raw_key]["seen_count"] += 1
            else:
                unmatched_index[raw_key] = build_unmatched_item(row, now)

    live_status["updated_at"] = now
    live_status["stations"] = stations_out

    unmatched_queue_out = list(unmatched_index.values())
    sync_logs.append({
        "updated_at": now,
        "rows_total": len(rows),
        "matched_count": matched_count,
        "unmatched_count": unmatched_count,
    })

    save_json(LIVE_STATUS_PATH, live_status)
    save_json(UNMATCHED_QUEUE_PATH, unmatched_queue_out)
    save_json(SYNC_LOGS_PATH, sync_logs[-100:])

    return {
        "ok": True,
        "updated_at": now,
        "rows_total": len(rows),
        "matched_count": matched_count,
        "unmatched_count": unmatched_count,
    }
