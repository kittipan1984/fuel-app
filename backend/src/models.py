from pydantic import BaseModel, Field
from typing import Optional


class StationMaster(BaseModel):
    station_id: str
    name: str
    brand: str = "other"
    province: str
    district: str
    lat: float
    lng: float
    source: str = "manual_verified"
    verified_at: Optional[str] = None
    status_match_key: str


class LiveStatusItem(BaseModel):
    station_id: str
    name: str
    g95: str = "ไม่ระบุ"
    diesel: str = "ไม่ระบุ"
    g91: str = "ไม่ระบุ"
    e20: str = "ไม่ระบุ"
    e85: str = "ไม่ระบุ"
    source: str = "doeb"
    raw_key: str
    updated_at: str


class UnmatchedQueueItem(BaseModel):
    raw_key: str
    name: str
    brand: str = "other"
    province: str
    district: str
    first_seen_at: str
    last_seen_at: str
    seen_count: int = 1


class NearbyQuery(BaseModel):
    lat: float
    lng: float
    radius_km: float = Field(default=20, gt=0)


class NearbyResult(BaseModel):
    station_id: str
    name: str
    brand: str
    province: str
    district: str
    lat: float
    lng: float
    distance_km: float
    g95: str = "ไม่ระบุ"
    diesel: str = "ไม่ระบุ"
    g91: str = "ไม่ระบุ"
    e20: str = "ไม่ระบุ"
    e85: str = "ไม่ระบุ"
