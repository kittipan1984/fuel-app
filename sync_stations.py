#!/usr/bin/env python3
from __future__ import annotations
import hashlib, json, os, re, sys, urllib.request
from datetime import date, datetime
from pathlib import Path
from typing import Any

DEFAULT_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwAS-C3MHwQkx4LddehRuraWoHp0tAlE3w5PiMObNfWyID2P2fZtwf_D2f0TGFhh-AP9A/exec"
MASTER_FILE = Path("stations_master.json")
STALE_DAYS = int(os.getenv("STALE_DAYS", "45"))

def today_iso(): return date.today().isoformat()
def norm_text(v: Any) -> str: return re.sub(r"\s+", " ", str(v or "").strip().lower())

def infer_brand(name: str, brand_label: str = "") -> str:
    t = f"{name} {brand_label}".lower()
    if "ปตท" in t or "ptt" in t: return "ptt"
    if "บางจาก" in t or "bangchak" in t: return "bangchak"
    if "shell" in t: return "shell"
    if "esso" in t: return "esso"
    if "caltex" in t: return "caltex"
    if re.search(r"\bpt\b", t): return "pt"
    if "susco" in t: return "susco"
    if "irpc" in t: return "irpc"
    return "other"

def brand_label(brand: str, fallback_name: str = "") -> str:
    return {"ptt":"PTT","bangchak":"Bangchak","shell":"Shell","esso":"Esso","caltex":"Caltex","pt":"PT","susco":"Susco","irpc":"IRPC","other":fallback_name or "อื่น ๆ"}.get(brand, fallback_name or "อื่น ๆ")

def make_station_id(row: dict[str, Any]) -> str:
    key = "|".join([norm_text(row.get("name")), norm_text(row.get("province")), norm_text(row.get("district") or row.get("amphoe")), f"{float(row.get('lat')):.6f}" if row.get("lat") is not None else "", f"{float(row.get('lng')):.6f}" if row.get("lng") is not None else ""])
    return "st_" + hashlib.sha1(key.encode("utf-8")).hexdigest()[:16]

def fetch_json(url: str) -> dict[str, Any]:
    req = urllib.request.Request(url, headers={"User-Agent":"FuelFinderSync/1.0", "Accept":"application/json"})
    with urllib.request.urlopen(req, timeout=120) as res:
        return json.loads(res.read().decode("utf-8"))

def load_master() -> list[dict[str, Any]]:
    if not MASTER_FILE.exists(): return []
    try:
        data=json.loads(MASTER_FILE.read_text(encoding="utf-8")); return data if isinstance(data,list) else []
    except Exception: return []

def save_master(rows: list[dict[str, Any]]) -> None:
    rows=sorted(rows, key=lambda r:(norm_text(r.get("province")),norm_text(r.get("district")),norm_text(r.get("brandLabel")),norm_text(r.get("name"))))
    MASTER_FILE.write_text(json.dumps(rows, ensure_ascii=False, indent=2)+"\n", encoding="utf-8")

def days_between(d1: str, d2: str) -> int:
    try: return (datetime.fromisoformat(d2).date()-datetime.fromisoformat(d1).date()).days
    except Exception: return 0

def normalize_remote_station(r: dict[str, Any], today: str) -> dict[str, Any] | None:
    try: lat=float(r.get("lat")); lng=float(r.get("lng"))
    except Exception: return None
    name=str(r.get("name") or "-").strip(); province=str(r.get("province") or "").strip(); district=str(r.get("district") or r.get("amphoe") or "").strip()
    brand=infer_brand(name, str(r.get("brandLabel") or ""))
    out={"id":"","name":name,"brand":brand,"brandLabel":str(r.get("brandLabel") or brand_label(brand,name)),"province":province,"district":district,"address":str(r.get("address") or f"{district} {province}".strip()),"lat":round(lat,7),"lng":round(lng,7),"first_seen":today,"last_seen":today,"active":True,"source":"public_fuel_data","googleMapsLink":str(r.get("googleMapsLink") or ""),"diesel":str(r.get("diesel") or "ไม่ระบุ"),"g95":str(r.get("g95") or "ไม่ระบุ"),"g91":str(r.get("g91") or "ไม่ระบุ"),"e20":str(r.get("e20") or "ไม่ระบุ"),"e85":str(r.get("e85") or "ไม่ระบุ"),"dp":str(r.get("dp") or "ไม่ระบุ"),"g95p":str(r.get("g95p") or "ไม่ระบุ"),"g97":str(r.get("g97") or "ไม่ระบุ"),"b20":str(r.get("b20") or "ไม่ระบุ"),"b":str(r.get("b") or "ไม่ระบุ"),"g98":str(r.get("g98") or "ไม่ระบุ")}
    out["id"]=str(r.get("id") or make_station_id(out)); return out

def merge(master, remote, today):
    by_id={str(r.get("id")):dict(r) for r in master if r.get("id")}; added=updated=0
    for row in remote:
        sid=row["id"]
        if sid not in by_id: by_id[sid]=row; added+=1; continue
        old=by_id[sid]; first_seen=old.get("first_seen") or today; old.update(row); old["first_seen"]=first_seen; old["last_seen"]=today; old["active"]=True; by_id[sid]=old; updated+=1
    for sid,row in list(by_id.items()):
        if days_between(str(row.get("last_seen") or today), today)>STALE_DAYS:
            row["active"]=False; row["inactive_reason"]=f"not_seen_over_{STALE_DAYS}_days"
    print(f"Remote valid stations: {len(remote)} | Added: {added} | Updated: {updated} | Master total: {len(by_id)}")
    return list(by_id.values())

def main():
    api=os.getenv("APPS_SCRIPT_URL", DEFAULT_APPS_SCRIPT_URL).rstrip("/"); url=f"{api}?action=all_full&t={datetime.utcnow().timestamp()}"; today=today_iso()
    print("Fetching:",url); data=fetch_json(url)
    if not data.get("ok"):
        print("API error:", data, file=sys.stderr); return 2
    remote=[]
    for r in data.get("stations") or []:
        row=normalize_remote_station(r,today)
        if row: remote.append(row)
    save_master(merge(load_master(), remote, today)); return 0
if __name__=="__main__": raise SystemExit(main())
