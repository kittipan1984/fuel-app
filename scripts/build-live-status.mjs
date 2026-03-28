import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const STATIONS_FILE = path.join(ROOT, "stations.json");
const LIVE_FILE = path.join(ROOT, "live-status.json");

const DOEB_API = process.env.DOEB_API;
const BATCH_SIZE = 4;

if (!DOEB_API) {
  throw new Error("Missing DOEB_API secret");
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizeText(v) {
  return String(v || "").trim();
}

async function fetchLive(station) {
  const params = new URLSearchParams({
    name: normalizeText(station.name),
    brand: normalizeText(station.brandLabel || ""),
    province: normalizeText(station.province || ""),
    amphoe: normalizeText(station.district || "")
  });

  const url = `${DOEB_API}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Accept": "application/json"
      }
    });

    const data = await res.json();

    const row = data?.parsed?.rows?.[0] || null;

    return {
      ok: !!row,
      name: station.name,
      g95: row?.g95 || "ไม่พบข้อมูล",
      diesel: row?.diesel || "ไม่พบข้อมูล",
      g91: row?.g91 || "ไม่พบข้อมูล",
      e20: row?.e20 || "ไม่พบข้อมูล",
      e85: row?.e85 || "ไม่พบข้อมูล",
      note: data?.parsed?.note || ""
    };
  } catch (err) {
    return {
      ok: false,
      name: station.name,
      g95: "โหลดล้มเหลว",
      diesel: "โหลดล้มเหลว",
      g91: "โหลดล้มเหลว",
      e20: "โหลดล้มเหลว",
      e85: "โหลดล้มเหลว",
      note: String(err)
    };
  }
}

async function main() {
  const stationsRaw = await fs.readFile(STATIONS_FILE, "utf8");
  const stations = JSON.parse(stationsRaw);

  if (!Array.isArray(stations)) {
    throw new Error("stations.json must be an array");
  }

  const output = {
    updated_at: new Date().toISOString(),
    stations: {}
  };

  for (let i = 0; i < stations.length; i += BATCH_SIZE) {
    const batch = stations.slice(i, i + BATCH_SIZE);
    const results = await Promise.all(batch.map(fetchLive));

    for (let j = 0; j < batch.length; j++) {
      const station = batch[j];
      const live = results[j];
      const key = station.id || `station-${i + j + 1}`;

      output.stations[key] = {
        name: station.name,
        brandLabel: station.brandLabel || "",
        province: station.province || "",
        district: station.district || "",
        lat: station.lat,
        lng: station.lng,
        ...live
      };
    }

    await sleep(400);
  }

  await fs.writeFile(LIVE_FILE, JSON.stringify(output, null, 2), "utf8");
  console.log(`Updated ${LIVE_FILE}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
