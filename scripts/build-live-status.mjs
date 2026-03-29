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

function normalizeBrand(v) {
  return normalizeText(v).toLowerCase();
}

function textTokenScore(a, b) {
  const aa = cleanName(a);
  const bb = cleanName(b);
  if (!aa || !bb) return 0;
  if (aa === bb) return 100;
  if (aa.includes(bb) || bb.includes(aa)) return 70;

  const aWords = aa.split(" ").filter(Boolean);
  const bWords = bb.split(" ").filter(Boolean);
  const common = aWords.filter(w => bWords.includes(w)).length;
  return common * 12;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = deg => deg * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * R * Math.asin(Math.sqrt(a));
}

function parseLatLngFromMapText(mapText) {
  const text = normalizeText(mapText);
  if (!text) return null;

  const m = text.match(/(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)/);
  if (!m) return null;

  const lat = Number(m[1]);
  const lng = Number(m[2]);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  return { lat, lng };
}

function locationScore(station, row) {
  if (
    !Number.isFinite(Number(station.lat)) ||
    !Number.isFinite(Number(station.lng))
  ) {
    return 0;
  }

  const mapPoint = parseLatLngFromMapText(row.map_text || "");
  if (!mapPoint) return 0;

  const km = haversineKm(
    Number(station.lat),
    Number(station.lng),
    mapPoint.lat,
    mapPoint.lng
  );

  if (km <= 0.3) return 120;
  if (km <= 1) return 90;
  if (km <= 3) return 60;
  if (km <= 5) return 40;
  if (km <= 10) return 20;
  return 0;
}

function similarityScore(station, row) {
  const sName = station.name || "";
  const rName = row.name || "";

  const sBrand = normalizeBrand(station.brandLabel || station.brand || "");
  const rBrand = normalizeBrand(row.brand || "");

  const sProvince = normalizeText(station.province || "").toLowerCase();
  const rProvince = normalizeText(row.province || "").toLowerCase();

  const sDistrict = normalizeText(station.district || "").toLowerCase();
  const rDistrict = normalizeText(row.amphoe || row.district || "").toLowerCase();

  let score = 0;

  if (sProvince && rProvince && sProvince === rProvince) score += 25;
  if (sDistrict && rDistrict && sDistrict === rDistrict) score += 35;
  if (sBrand && rBrand && sBrand === rBrand) score += 25;

  score += textTokenScore(sName, rName);
  score += locationScore(station, row);

  return score;
}

function pickBestRow(data, station) {
  const rows = data?.parsed?.rows;
  if (!Array.isArray(rows) || !rows.length) return null;

  const nonEmptyRows = rows.filter(r =>
    r &&
    (r.name || r.amphoe || r.province || r.diesel || r.g95 || r.g91 || r.e20 || r.e85 || r.map_text || r.brand)
  );

  if (!nonEmptyRows.length) return null;

  let best = null;
  let bestScore = -1;

  for (const row of nonEmptyRows) {
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
      brand: "",
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
            note: `match score ${row._score}`,
            matched_name: row.name || "",
            matched_district: row.amphoe || "",
            matched_province: row.province || "",
            matched_brand: row.brand || "",
            matched_map_text: row.map_text || ""
          };
        }

        if (row._score >= 120) break;
      }
    } catch (err) {
      // ลอง attempt ถัดไป
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
