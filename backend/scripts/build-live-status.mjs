import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const RAW_FILE = path.join(ROOT, "fuel-status-source.json");
const LIVE_FILE = path.join(ROOT, "live-status.json");
const STATIONS_FILE = path.join(ROOT, "stations.json");

const MIN_ACCEPT_SCORE = 45;

function normalizeText(v) {
  return String(v || "").trim();
}

async function readJsonSafe(filePath) {
  const text = await fs.readFile(filePath, "utf8");

  if (text.trim().startsWith("<!DOCTYPE") || text.trim().startsWith("<html")) {
    throw new Error(`Expected JSON but got HTML in ${path.basename(filePath)}. Check GAS /exec URL.`);
  }

  try {
    return JSON.parse(text);
  } catch (err) {
    throw new Error(`Invalid JSON in ${path.basename(filePath)}: ${err.message}`);
  }
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

function score(local, remote) {
  let s = 0;

  const lp = normalizeText(local.province).toLowerCase();
  const rp = normalizeText(remote.province).toLowerCase();

  const ld = normalizeText(local.district).toLowerCase();
  const rd = normalizeText(remote.amphoe).toLowerCase();

  const ln = cleanName(local.name);
  const rn = cleanName(remote.name);

  if (lp && rp && lp === rp) s += 25;
  if (ld && rd && ld === rd) s += 40;

  if (ln && rn) {
    if (ln === rn) s += 100;
    else if (ln.includes(rn) || rn.includes(ln)) s += 70;
    else {
      const a = ln.split(" ").filter(Boolean);
      const b = rn.split(" ").filter(Boolean);
      const common = a.filter(x => b.includes(x)).length;
      s += common * 12;
    }
  }

  return s;
}

async function main() {
  const raw = await readJsonSafe(RAW_FILE);
  const stationsFile = await readJsonSafe(STATIONS_FILE);

  const localStations = Array.isArray(stationsFile) ? stationsFile : [];
  const remoteRows = Array.isArray(raw?.parsed?.rows) ? raw.parsed.rows : [];

  const output = {
    updated_at: raw?.updated_at || new Date().toISOString(),
    stations: {}
  };

  for (const local of localStations) {
    const candidates = remoteRows
      .map(r => ({ ...r, _score: score(local, r) }))
      .sort((a, b) => b._score - a._score);

    const best = candidates[0];

    output.stations[local.id] = {
      id: local.id,
      name: local.name,
      brandLabel: local.brandLabel || "",
      province: local.province || "",
      district: local.district || "",
      lat: local.lat,
      lng: local.lng,
      ok: !!best && best._score >= MIN_ACCEPT_SCORE,
      g95: best && best._score >= MIN_ACCEPT_SCORE ? (best.g95 || "ไม่พบข้อมูล") : "ไม่พบข้อมูล",
      diesel: best && best._score >= MIN_ACCEPT_SCORE ? (best.diesel || "ไม่พบข้อมูล") : "ไม่พบข้อมูล",
      g91: best && best._score >= MIN_ACCEPT_SCORE ? (best.g91 || "ไม่พบข้อมูล") : "ไม่พบข้อมูล",
      e20: best && best._score >= MIN_ACCEPT_SCORE ? (best.e20 || "ไม่พบข้อมูล") : "ไม่พบข้อมูล",
      e85: best && best._score >= MIN_ACCEPT_SCORE ? (best.e85 || "ไม่พบข้อมูล") : "ไม่พบข้อมูล",
      note: best ? (best._score >= MIN_ACCEPT_SCORE ? `match score ${best._score}` : `score too low (${best._score})`) : "no candidates",
      matched_name: best?.name || "",
      matched_district: best?.amphoe || "",
      matched_province: best?.province || ""
    };
  }

  await fs.writeFile(LIVE_FILE, JSON.stringify(output, null, 2), "utf8");
  console.log("✅ live-status.json updated");
}

main().catch(err => {
  console.error(err.message || err);
  process.exit(1);
});
