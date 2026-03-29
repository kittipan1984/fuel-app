import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const LIVE_FILE = path.join(ROOT, "live-status.json");

const DOEB_API = process.env.DOEB_API;

if (!DOEB_API) {
  throw new Error("Missing DOEB_API secret");
}

async function main() {
  const url = `${DOEB_API}?province=ปทุมธานี`;

  const res = await fetch(url, {
    headers: { Accept: "application/json" }
  });

  const data = await res.json();

  const rows = data?.parsed?.rows || [];

  const output = {
    updated_at: new Date().toISOString(),
    stations: {}
  };

  rows.forEach((r, i) => {
    const id = `station-${i + 1}`;

    output.stations[id] = {
      id,
      name: r.name || "",
      brandLabel: r.brand || "",
      province: r.province || "",
      district: r.amphoe || "",
      lat: 0,
      lng: 0,
      ok: true,
      g95: r.g95 || "ไม่ระบุ",
      diesel: r.diesel || "ไม่ระบุ",
      g91: r.g91 || "ไม่ระบุ",
      e20: r.e20 || "ไม่ระบุ",
      e85: r.e85 || "ไม่ระบุ"
    };
  });

  await fs.writeFile(LIVE_FILE, JSON.stringify(output, null, 2), "utf8");

  console.log("✅ LIVE STATUS READY");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
