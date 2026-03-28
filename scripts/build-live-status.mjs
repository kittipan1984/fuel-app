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

function cleanName(name) {
  return normalizeText(name)
    .toLowerCase()
    .replace(/บริษัท/g, "")
    .replace(/จำกัด/g, "")
    .replace(/สาขา/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^ก-๙a-z0-9\s]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function similarityScore(station, row) {
  const sName = cleanName(station.name);
  const rName = cleanName(row.name);
  const sBrand = normalizeText(station.brandLabel || "").toLowerCase();
  const rBrand = normalizeText(row.brand || "").toLowerCase();
  const sProvince = normalizeText(station.province || "").toLowerCase();
  const rProvince = normalizeText(row.province || "").toLowerCase();
  const sDistrict = normalizeText(station.district || "").toLowerCase();
  const rDistrict = normalizeText(row.amphoe || "").toLowerCase();

  let score = 0;

  if (sName && rName) {
    if (sName === rName) score += 100;
    else if (sName.includes(rName) || rName.includes(sName)) score += 70;
    else {
      const sWords = sName.split(" ").filter(Boolean);
      const rWords = rName.split(" ").filter(Boolean);
      const common = sWords.filter(w => rWords.includes(w)).length;
      score += common * 12;
    }
  }

  if (sBrand && rBrand && sBrand === rBrand) score += 20;
  if (sProvince && rProvince && sProvince === rProvince) score += 15;
  if (sDistrict && rDistrict && sDistrict === rDistrict) score += 15;

  return score;
}

function pickBestRow(data, station) {
  const rows = data?.parsed?.rows;
  if (!Array.isArray(rows) || !rows.length) return null;

  let best = null;
  let bestScore = -1;

  for (const row of rows) {
    const score = similarityScore(station, row);
    if (score > bestScore) {
      best = row;
      bestScore = score;
    }
  }

  if (!best) return null;

  return {
    ...best,
    _score: bestScore
  };
}

async function fetchAttempt(params) {
  const url = `${DOEB_API}?${new URLSearchParams(params).toString()}`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" }
  });
  return await res.json();
}

async function fetchLive(station) {
  const attempts = [
    {
      name: normalizeText(station.name),
      brand: normalizeText(station.brandLabel || ""),
      province: normalizeText(station.province || ""),
      amphoe: normalizeText(station.district || "")
    },
    {
      name: normalizeText(station.name),
      brand: normalizeText(station.brandLabel || ""),
      province: normalizeText(station.province || ""),
      amphoe: ""
    },
    {
      name: normalizeText(station.name),
      brand: "",
      province: normalizeText(station.province || ""),
      amphoe: normalizeText(station.district || "")
    },
    {
      name: normalizeText(station.name),
      brand: "",
      province: normalizeText(station.province || ""),
      amphoe: ""
    }
  ];

  let best = null;

  for (const params of attempts) {
    try {
      const data = await fetchAttempt(params);
      const row = pickBestRow(data, station);

      if (row) {
        if (!best || row._score > best._score) {
          best = {
            ok: true,
            name: station.name,
            g95: row.g95 || "ไม่พบข้อมูล",
            diesel: row.diesel || "ไม่พบข้อมูล",
            g91: row.g91 || "ไม่พบข้อมูล",
            e20: row.e20 || "ไม่พบข้อมูล",
            e85: row.e85 || "ไม่พบข้อมูล",
            note: `match score ${row._score}`
          };
        }

        if (row._score >= 100) break;
      }
    } catch (err) {
      // ลอง fallback attempt ต่อไป
    }
  }

  if (best) return best;

  return {
    ok: false,
    name: station.name,
    g95: "ไม่พบข้อมูล",
    diesel: "ไม่พบข้อมูล",
    g91: "ไม่พบข้อมูล",
    e20: "ไม่พบข้อมูล",
    e85: "ไม่พบข้อมูล",
    note: "หาแถวที่ match ไม่เจอ"
  };
}

async function main() {
  const stationsRaw = await fs.readFile(STATIONS_FILE, "utf8");
  let parsed = JSON.parse(stationsRaw);

  let stations;
  if (Array.isArray(parsed)) {
    stations = parsed;
  } else if (Array.isArray(parsed.stations)) {
    stations = parsed.stations;
  } else {
    stations = [parsed];
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
        id: key,
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
