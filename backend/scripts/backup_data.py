from pathlib import Path
from shutil import copy2
from datetime import datetime
from src.config import DATA_DIR

backup_dir = DATA_DIR.parent / "backups" / datetime.now().strftime("%Y%m%d_%H%M%S")
backup_dir.mkdir(parents=True, exist_ok=True)

for file in DATA_DIR.glob("*.json"):
    copy2(file, backup_dir / file.name)

print(f"Backup complete: {backup_dir}")
