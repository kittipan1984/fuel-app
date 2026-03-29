import fs from "fs";

const stations = JSON.parse(fs.readFileSync("stations.json"));
const raw = JSON.parse(fs.readFileSync("fuel-status-source.json"));

const output = {
  updated_at: new Date().toISOString(),
  stations: {}
};

// 🔥 simple match (จังหวัด + อำเภอ)
function matchStation(local, remote) {
  return (
    local.province === remote.province &&
    local.district === remote.district
  );
}

stations.forEach(local => {
  let best = null;

  for (const r of raw.stations) {
    if (matchStation(local, r)) {
      best = r;
      break;
    }
  }

  if (best) {
    output.stations[local.id] = {
      g95: best.fuels.g95,
      diesel: best.fuels.diesel,
      note: "matched",
      matched_name: best.name,
      matched_district: best.district,
      matched_province: best.province
    };
  } else {
    output.stations[local.id] = {
      g95: "ไม่พบข้อมูล",
      diesel: "ไม่พบข้อมูล",
      note: "no match"
    };
  }
});

fs.writeFileSync("live-status.json", JSON.stringify(output, null, 2));
console.log("✅ live-status.json updated");
