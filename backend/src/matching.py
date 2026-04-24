from typing import Optional, Dict, Any
from .utils import make_match_key, infer_brand, normalize_district, normalize_province


def build_raw_key(row: Dict[str, Any]) -> str:
    return make_match_key(
        row.get("name", ""),
        row.get("district", "") or row.get("amphoe", ""),
        row.get("province", ""),
    )


def match_station(row: Dict[str, Any], station_master: list[dict]) -> Optional[dict]:
    raw_key = build_raw_key(row)

    # exact match key
    for st in station_master:
        if st.get("status_match_key") == raw_key:
            return st

    # fallback normalized name + district + province
    target_name = (row.get("name", "") or "").strip()
    target_district = normalize_district(row.get("district", "") or row.get("amphoe", ""))
    target_province = normalize_province(row.get("province", ""))

    for st in station_master:
        if (
            (st.get("name", "") or "").strip() == target_name
            and normalize_district(st.get("district", "")) == target_district
            and normalize_province(st.get("province", "")) == target_province
        ):
            return st

    return None


def build_unmatched_item(row: Dict[str, Any], now_iso: str) -> dict:
    raw_key = build_raw_key(row)
    return {
        "raw_key": raw_key,
        "name": row.get("name", ""),
        "brand": infer_brand(row.get("name", "")),
        "province": row.get("province", ""),
        "district": row.get("district", "") or row.get("amphoe", ""),
        "first_seen_at": now_iso,
        "last_seen_at": now_iso,
        "seen_count": 1,
    }
