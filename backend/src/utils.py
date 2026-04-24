import math
from datetime import datetime, timezone


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def normalize_text(text: str) -> str:
    return (text or "").strip()


def normalize_district(text: str) -> str:
    t = normalize_text(text)
    if t.startswith("อำเภอ"):
        t = t[len("อำเภอ"):]
    if t.startswith("เขต"):
        t = t[len("เขต"):]
    return t.strip()


def normalize_province(text: str) -> str:
    t = normalize_text(text)
    if t.startswith("จังหวัด"):
        t = t[len("จังหวัด"):]
    if t.startswith("จ."):
        t = t[len("จ."):]
    return t.strip()


def infer_brand(name: str) -> str:
    t = (name or "").lower()
    if "ptt" in t:
        return "ptt"
    if "บางจาก" in t or "bangchak" in t:
        return "bangchak"
    if "shell" in t:
        return "shell"
    if "esso" in t:
        return "esso"
    if "caltex" in t:
        return "caltex"
    if t == "pt" or "pt " in t:
        return "pt"
    if "susco" in t:
        return "susco"
    if "irpc" in t:
        return "irpc"
    return "other"


def make_match_key(name: str, district: str, province: str) -> str:
    return "|".join([
        normalize_text(name),
        normalize_district(district),
        normalize_province(province),
    ])


def haversine_km(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    r = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    return 2 * r * math.asin(math.sqrt(a))
