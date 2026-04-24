from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR.parent / "data"

STATION_MASTER_PATH = Path(os.getenv("STATION_MASTER_PATH", DATA_DIR / "station_master.json"))
LIVE_STATUS_PATH = Path(os.getenv("LIVE_STATUS_PATH", DATA_DIR / "live_status.json"))
UNMATCHED_QUEUE_PATH = Path(os.getenv("UNMATCHED_QUEUE_PATH", DATA_DIR / "unmatched_queue.json"))
SYNC_LOGS_PATH = Path(os.getenv("SYNC_LOGS_PATH", DATA_DIR / "sync_logs.json"))
DOEB_FEED_SNAPSHOT_PATH = Path(os.getenv("DOEB_FEED_SNAPSHOT_PATH", DATA_DIR / "doeb_feed_snapshot.json"))

MAX_NEARBY_RESULTS = int(os.getenv("MAX_NEARBY_RESULTS", "20"))
DEFAULT_RADIUS_KM = float(os.getenv("DEFAULT_RADIUS_KM", "20"))
