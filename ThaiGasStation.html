<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover" />
  <title>NaraMawin Fuel Finder Pro+</title>
  <style>
    :root{
      --bg:#f4f7fb;
      --card:#ffffff;
      --text:#162033;
      --muted:#6b7280;
      --line:#e7edf5;
      --shadow:0 12px 30px rgba(15,23,42,.08);
      --green:#10b981;
      --green-dark:#059669;
      --blue:#2563eb;
      --slate:#334155;
      --ok-tx:#166534;
      --empty-tx:#b91c1c;
      --unknown-tx:#475569;
    }

    *{box-sizing:border-box}
    html,body{
      margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;
      background:
        radial-gradient(circle at top left, #dbeafe 0%, transparent 22%),
        radial-gradient(circle at top right, #dcfce7 0%, transparent 20%),
        var(--bg);
      color:var(--text);
    }

    .wrap{max-width:980px;margin:0 auto;padding:16px;padding-bottom:40px}
    .hero{
      background:linear-gradient(135deg,#0f172a,#1e293b 45%,#0f766e 100%);
      color:#fff;border-radius:0 0 28px 28px;padding:24px 18px 20px;
      box-shadow:0 14px 34px rgba(15,23,42,.22);margin:-16px -16px 14px;
    }
    .hero-title{margin:0;font-size:28px;font-weight:900;letter-spacing:-.02em}
    .hero-sub{margin:8px 0 0;font-size:14px;line-height:1.6;color:rgba(255,255,255,.86)}
    .owner{
      margin-top:12px;display:inline-block;font-size:24px;font-weight:900;letter-spacing:.04em;
      background:linear-gradient(90deg,#22c55e,#67e8f9,#f8fafc);
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
    }
    .hero-badge{
      margin-top:10px;display:inline-block;background:rgba(255,255,255,.12);
      border:1px solid rgba(255,255,255,.18);color:#fff;padding:10px 12px;border-radius:16px;
      font-size:12px;font-weight:800;
    }
    .card{
      background:rgba(255,255,255,.94);border:1px solid rgba(255,255,255,.75);
      border-radius:22px;box-shadow:var(--shadow);padding:16px;margin-top:14px;backdrop-filter:blur(10px);
    }
    .status{
      border-radius:16px;padding:13px 14px;font-size:14px;line-height:1.55;
      background:#eef6ff;border:1px solid #bfdbfe;color:#1d4ed8;white-space:pre-wrap;
    }
    .status.ok{background:#ecfdf5;border-color:#86efac;color:#166534}
    .status.warn{background:#fff7ed;border-color:#fdba74;color:#c2410c}
    .controls{display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:10px;margin-top:12px}
    button,select{min-height:48px;border-radius:15px;font-size:14px;font-weight:800}
    button{border:0;cursor:pointer;color:#fff;padding:12px 14px}
    .btn-find{background:linear-gradient(135deg,var(--green),var(--green-dark))}
    .btn-bkk{background:linear-gradient(135deg,#475569,var(--slate))}
    .btn-refresh{background:linear-gradient(135deg,#3b82f6,var(--blue))}
    select{width:100%;border:1px solid #d9e2ec;background:#fff;color:var(--text);padding:10px 12px;outline:none}
    .row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px}
    .mini{background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:12px 13px}
    .mini-label{color:var(--muted);font-size:12px;margin-bottom:5px}
    .mini-value{font-size:14px;font-weight:800;line-height:1.5;word-break:break-word}
    .section-head{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}
    .section-title{font-size:18px;font-weight:900}
    .pill{background:#eef2ff;color:#4338ca;border-radius:999px;padding:8px 11px;font-size:12px;font-weight:800;white-space:nowrap}
    .result-list{display:flex;flex-direction:column;gap:12px}
    .station{background:#fff;border:1px solid var(--line);border-radius:22px;padding:15px;box-shadow:0 6px 16px rgba(15,23,42,.04)}
    .station-top{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:10px}
    .station-name{font-size:18px;font-weight:900;line-height:1.35}
    .distance{white-space:nowrap;border-radius:999px;padding:7px 10px;font-size:12px;font-weight:900;color:#0f766e;background:linear-gradient(135deg,#ecfeff,#dcfce7);border:1px solid #bae6fd}
    .brand-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px}
    .brand-badge{font-size:12px;font-weight:900;border-radius:999px;padding:6px 10px;color:#fff}
    .brand-ptt{background:#2563eb}
    .brand-bangchak{background:#16a34a}
    .brand-shell{background:#dc2626}
    .brand-caltex{background:#0ea5e9}
    .brand-pt{background:#f97316}
    .brand-susco{background:#7c3aed}
    .brand-other{background:#64748b}
    .meta{font-size:13px;color:var(--muted);line-height:1.65;margin-bottom:12px;word-break:break-word}
    .fuel-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:12px}
    .fuel-box{border-radius:14px;padding:10px 11px;border:1px solid #e5e7eb;background:#f9fafb}
    .fuel-label{font-size:12px;color:#64748b;font-weight:800;margin-bottom:5px}
    .fuel-state{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:900}
    .dot{width:9px;height:9px;border-radius:50%;display:inline-block}
    .state-available{color:var(--ok-tx)}
    .state-available .dot{background:#22c55e;box-shadow:0 0 0 4px rgba(34,197,94,.12)}
    .state-empty{color:var(--empty-tx)}
    .state-empty .dot{background:#ef4444;box-shadow:0 0 0 4px rgba(239,68,68,.12)}
    .state-unknown{color:var(--unknown-tx)}
    .state-unknown .dot{background:#94a3b8;box-shadow:0 0 0 4px rgba(148,163,184,.12)}
    .updated{border-radius:14px;border:1px dashed #d6e0ea;background:#f8fafc;padding:10px 11px;font-size:12px;color:#64748b;line-height:1.55;margin-bottom:12px}
    .actions{display:grid;grid-template-columns:1fr 1fr;gap:9px}
    .link-btn{text-decoration:none;text-align:center;border-radius:14px;padding:11px 10px;font-size:13px;font-weight:900;color:#fff;background:linear-gradient(135deg,#111827,#1f2937)}
    .link-btn.alt{background:linear-gradient(135deg,#2563eb,#1d4ed8)}
    .empty{text-align:center;padding:26px 14px;color:var(--muted);font-size:14px;line-height:1.6;border:1px dashed #d6e0ea;border-radius:18px;background:#fbfdff}
    @media (min-width:720px){.fuel-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media (max-width:680px){.controls,.row{grid-template-columns:1fr}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hero">
      <h1 class="hero-title">⛽ Fuel Station Finder</h1>
      <p class="hero-sub">ค้นหาปั๊มน้ำมันใกล้คุณ พร้อมเช็กสถานะน้ำมันที่ซิงก์จาก GitHub Action ทุก 5 นาที</p>
      <div class="owner">NaraMawin</div>
      <div class="hero-badge">PRO+ / GitHub Action Sync</div>
    </div>

    <div class="card">
      <div id="statusBox" class="status">พร้อมใช้งาน กำลังโหลด status.json...</div>

      <div class="controls">
        <button class="btn-find" id="findBtn">ค้นหาปั๊มใกล้ฉัน</button>
        <select id="radiusInput">
          <option value="2000">รัศมี 2 กม.</option>
          <option value="3000">รัศมี 3 กม.</option>
          <option value="5000" selected>รัศมี 5 กม.</option>
          <option value="10000">รัศมี 10 กม.</option>
          <option value="15000">รัศมี 15 กม.</option>
        </select>
        <select id="brandFilter">
          <option value="all">ทุกแบรนด์</option>
          <option value="bangchak">Bangchak / บางจาก</option>
          <option value="ptt">PTT / PTT Station</option>
          <option value="shell">Shell</option>
          <option value="caltex">Caltex</option>
          <option value="pt">PT</option>
          <option value="susco">Susco</option>
        </select>
      </div>

      <div class="controls" style="margin-top:10px;">
        <button class="btn-bkk" id="bkkBtn">ใช้พิกัดกรุงเทพ</button>
        <button class="btn-refresh" id="reloadStatusBtn">รีโหลด status.json</button>
        <div></div>
      </div>

      <div class="row">
        <div class="mini">
          <div class="mini-label">ตำแหน่งปัจจุบัน</div>
          <div class="mini-value" id="coordText">ยังไม่ได้ระบุ</div>
        </div>
        <div class="mini">
          <div class="mini-label">ข้อมูลล่าสุด</div>
          <div class="mini-value" id="statusSourceText">status.json</div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="section-head">
        <div class="section-title">ผลการค้นหา</div>
        <div class="pill" id="countBadge">0 สถานี</div>
      </div>
      <div class="hero-sub" id="summaryText">ยังไม่มีผลลัพธ์</div>
    </div>

    <div id="resultList" class="result-list"></div>
  </div>

  <script>
    const statusBox = document.getElementById("statusBox");
    const coordText = document.getElementById("coordText");
    const statusSourceText = document.getElementById("statusSourceText");
    const countBadge = document.getElementById("countBadge");
    const summaryText = document.getElementById("summaryText");
    const resultList = document.getElementById("resultList");
    const radiusInput = document.getElementById("radiusInput");
    const brandFilter = document.getElementById("brandFilter");
    const findBtn = document.getElementById("findBtn");
    const bkkBtn = document.getElementById("bkkBtn");
    const reloadStatusBtn = document.getElementById("reloadStatusBtn");

    const OVERPASS_ENDPOINTS = [
      "https://overpass-api.de/api/interpreter",
      "https://lz4.overpass-api.de/api/interpreter"
    ];

    let currentLat = null;
    let currentLng = null;
    let STATUS_DOC = { meta: {}, stations: [] };
    let lastStations = [];

    function setStatus(text, type) {
      statusBox.textContent = text;
      statusBox.className = "status";
      if (type === "ok") statusBox.classList.add("ok");
      if (type === "warn") statusBox.classList.add("warn");
    }

    function updateCoordText() {
      coordText.textContent =
        Number.isFinite(currentLat) && Number.isFinite(currentLng)
          ? `${currentLat.toFixed(6)}, ${currentLng.toFixed(6)}`
          : "ยังไม่ได้ระบุ";
    }

    function useBangkok() {
      currentLat = 13.7563;
      currentLng = 100.5018;
      updateCoordText();
      setStatus("ใช้พิกัดกรุงเทพแล้ว", "ok");
      if (lastStations.length) renderStations(lastStations);
    }

    function normalizeText(value) {
      return String(value || "")
        .toLowerCase()
        .replace(/station/g, "")
        .replace(/ปั๊ม/g, "")
        .replace(/service/g, "")
        .replace(/services/g, "")
        .replace(/company/g, "")
        .replace(/public/g, "")
        .replace(/limited/g, "")
        .replace(/[().,'"’\-_/]/g, "")
        .replace(/\s+/g, "")
        .trim();
    }

    function escapeHtml(value) {
      return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

    function haversineKm(lat1, lon1, lat2, lon2) {
      const R = 6371;
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
      return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function mapsLink(name, lat, lng) {
      return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}@${lat},${lng}`;
    }

    function dirLink(fromLat, fromLng, toLat, toLng) {
      return `https://www.google.com/maps/dir/?api=1&origin=${fromLat},${fromLng}&destination=${toLat},${toLng}&travelmode=driving`;
    }

    function detectBrand(name, tags) {
      const text = normalizeText(`${name} ${tags.brand || ""} ${tags.operator || ""}`);
      if (text.includes("bangchak") || text.includes("บางจาก")) return "bangchak";
      if (text.includes("ptt") || text.includes("ปตท")) return "ptt";
      if (text.includes("shell") || text.includes("เชลล์")) return "shell";
      if (text.includes("caltex") || text.includes("คาลเท็กซ์")) return "caltex";
      if (text.includes("susco") || text.includes("ซัสโก้")) return "susco";
      if (text.includes("ptg") || text === "pt" || text.includes("ptstation")) return "pt";
      return "other";
    }

    function brandLabel(brandKey, name, tags) {
      if (brandKey === "bangchak") return "Bangchak";
      if (brandKey === "ptt") return "PTT";
      if (brandKey === "shell") return "Shell";
      if (brandKey === "caltex") return "Caltex";
      if (brandKey === "pt") return "PT";
      if (brandKey === "susco") return "Susco";
      return tags.brand || tags.operator || name || "Other";
    }

    function scoreMatch(stationName, matchKey) {
      const s = normalizeText(stationName);
      const k = normalizeText(matchKey);
      if (!s || !k) return 0;
      if (s === k) return 100;
      if (s.includes(k)) return 90;
      if (k.includes(s)) return 80;

      let score = 0;
      const sPrefix = s.slice(0, Math.max(2, Math.floor(s.length * 0.6)));
      const kPrefix = k.slice(0, Math.max(2, Math.floor(k.length * 0.6)));
      if (s.includes(kPrefix)) score += 30;
      if (k.includes(sPrefix)) score += 20;
      return score;
    }

    function getStationFuelStatus(station) {
      const items = Array.isArray(STATUS_DOC.stations) ? STATUS_DOC.stations : [];
      let best = null;
      let bestScore = 0;
      let bestKey = "";

      for (const item of items) {
        const keys = Array.isArray(item.matchKeys) ? item.matchKeys : [];
        for (const key of keys) {
          const score = scoreMatch(station.name, key);
          if (score > bestScore) {
            bestScore = score;
            best = item;
            bestKey = key;
          }
        }
      }

      if (best && bestScore >= 30) {
        const fuels = best.fuels || {};
        return {
          matchedKey: bestKey,
          matchScore: bestScore,
          updatedAt: best.updatedAt || "มีข้อมูล",
          fuels: {
            gasohol95: fuels.gasohol95 || "unknown",
            gasohol91: fuels.gasohol91 || "unknown",
            dieselB7: fuels.dieselB7 || "unknown",
            dieselB10: fuels.dieselB10 || "unknown",
            diesel: fuels.diesel || "unknown"
          }
        };
      }

      return {
        matchedKey: "",
        matchScore: 0,
        updatedAt: "ยังไม่มีข้อมูล",
        fuels: {
          gasohol95: "unknown",
          gasohol91: "unknown",
          dieselB7: "unknown",
          dieselB10: "unknown",
          diesel: "unknown"
        }
      };
    }

    function fuelText(status) {
      if (status === "available") return "มี";
      if (status === "empty") return "หมด";
      return "ไม่ทราบ";
    }

    function fuelClass(status) {
      if (status === "available") return "state-available";
      if (status === "empty") return "state-empty";
      return "state-unknown";
    }

    function fuelBox(label, status) {
      return `
        <div class="fuel-box">
          <div class="fuel-label">${label}</div>
          <div class="fuel-state ${fuelClass(status)}">
            <span class="dot"></span>${fuelText(status)}
          </div>
        </div>
      `;
    }

    function renderStations(stations) {
      const selectedBrand = brandFilter.value;
      let filtered = [...stations];

      if (selectedBrand !== "all") {
        filtered = filtered.filter(s => s.brandKey === selectedBrand);
      }

      resultList.innerHTML = "";

      if (!filtered.length) {
        countBadge.textContent = "0 สถานี";
        summaryText.textContent = "ไม่พบปั๊มตามเงื่อนไขที่เลือก";
        resultList.innerHTML = `<div class="empty">ไม่มีผลลัพธ์ในตอนนี้</div>`;
        return;
      }

      countBadge.textContent = `${filtered.length} สถานี`;
      summaryText.textContent = `พบ ${filtered.length} สถานี เรียงจากใกล้ไปไกล`;

      filtered.forEach((s) => {
        const brandText = brandLabel(s.brandKey, s.name, s.tags);
        const matchedText = s.statusInfo.matchedKey
          ? `จับคู่กับ: ${s.statusInfo.matchedKey} | score: ${s.statusInfo.matchScore}`
          : `ไม่ match | ชื่อที่เจอ: ${s.name}`;

        const el = document.createElement("div");
        el.className = "station";
        el.innerHTML = `
          <div class="station-top">
            <div class="station-name">${escapeHtml(s.name)}</div>
            <div class="distance">${s.distanceKm.toFixed(2)} กม.</div>
          </div>

          <div class="brand-row">
            <div class="brand-badge brand-${s.brandKey}">${escapeHtml(brandText)}</div>
          </div>

          <div class="meta">
            ที่อยู่: ${escapeHtml(s.address || "-")}<br>
            พิกัด: ${s.lat.toFixed(6)}, ${s.lng.toFixed(6)}
          </div>

          <div class="fuel-grid">
            ${fuelBox("แก๊สโซฮอล์ 95", s.statusInfo.fuels.gasohol95)}
            ${fuelBox("แก๊สโซฮอล์ 91", s.statusInfo.fuels.gasohol91)}
            ${fuelBox("ดีเซล B7", s.statusInfo.fuels.dieselB7)}
            ${fuelBox("ดีเซล B10", s.statusInfo.fuels.dieselB10)}
            ${fuelBox("ดีเซล", s.statusInfo.fuels.diesel)}
          </div>

          <div class="updated">
            อัปเดตล่าสุด: ${escapeHtml(s.statusInfo.updatedAt)}<br>
            ${escapeHtml(matchedText)}
          </div>

          <div class="actions">
            <a class="link-btn" href="${mapsLink(s.name, s.lat, s.lng)}" target="_blank" rel="noopener noreferrer">เปิดแผนที่</a>
            <a class="link-btn alt" href="${dirLink(currentLat, currentLng, s.lat, s.lng)}" target="_blank" rel="noopener noreferrer">นำทาง</a>
          </div>
        `;
        resultList.appendChild(el);
      });
    }

    async function fetchWithTimeout(url, options, timeoutMs) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const res = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timer);
        return res;
      } catch (err) {
        clearTimeout(timer);
        throw err;
      }
    }

    async function overpassQuery(query) {
      let lastErr = null;
      for (const endpoint of OVERPASS_ENDPOINTS) {
        try {
          const res = await fetchWithTimeout(
            endpoint,
            {
              method: "POST",
              headers: { "Content-Type": "text/plain;charset=UTF-8" },
              body: query
            },
            20000
          );
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return await res.json();
        } catch (err) {
          lastErr = err;
        }
      }
      throw lastErr || new Error("Overpass unavailable");
    }

    async function getCurrentPositionMobile() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("เบราว์เซอร์ไม่รองรับ GPS"));
          return;
        }
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
        );
      });
    }

    async function loadStationStatus() {
      try {
        const res = await fetch("./status.json?v=" + Date.now(), { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        STATUS_DOC = await res.json();
        const meta = STATUS_DOC.meta || {};
        statusSourceText.textContent = `อัปเดตโดย ${meta.updatedBy || "-"} / ${meta.generatedBy || "-"}`;
        setStatus("โหลด status.json สำเร็จ", "ok");
      } catch (err) {
        console.error(err);
        STATUS_DOC = { meta: {}, stations: [] };
        statusSourceText.textContent = "โหลด status.json ไม่สำเร็จ";
        setStatus("โหลด status.json ไม่สำเร็จ สถานะน้ำมันจะเป็น 'ไม่ทราบ'", "warn");
      }
    }

    async function findNearbyStations() {
      resultList.innerHTML = `<div class="empty">กำลังค้นหาปั๊มน้ำมันใกล้คุณ...</div>`;
      summaryText.textContent = "กำลังโหลดข้อมูล...";
      countBadge.textContent = "...";

      try {
        if (!Number.isFinite(currentLat) || !Number.isFinite(currentLng)) {
          setStatus("กำลังอ่านตำแหน่งปัจจุบัน...");
          const pos = await getCurrentPositionMobile();
          currentLat = pos.coords.latitude;
          currentLng = pos.coords.longitude;
          updateCoordText();
        }

        setStatus("กำลังค้นหาปั๊มน้ำมันใกล้คุณ...");
        const radius = Number(radiusInput.value || 5000);

        const query = `
[out:json][timeout:20];
(
  node["amenity"="fuel"](around:${radius},${currentLat},${currentLng});
  way["amenity"="fuel"](around:${radius},${currentLat},${currentLng});
  relation["amenity"="fuel"](around:${radius},${currentLat},${currentLng});
);
out center tags;
`;

        const data = await overpassQuery(query);
        const elements = Array.isArray(data.elements) ? data.elements : [];

        lastStations = elements.map((el) => {
          const lat = Number(el.lat ?? (el.center && el.center.lat));
          const lng = Number(el.lon ?? (el.center && el.center.lon));
          const tags = el.tags || {};
          const name = tags.name || tags.brand || "สถานีบริการน้ำมัน";

          const address = [
            tags["addr:housenumber"],
            tags["addr:street"],
            tags["addr:subdistrict"],
            tags["addr:district"],
            tags["addr:province"]
          ].filter(Boolean).join(" ");

          const station = {
            id: `${el.type}-${el.id}`,
            name,
            lat,
            lng,
            tags,
            address,
            brandKey: detectBrand(name, tags),
            distanceKm: haversineKm(currentLat, currentLng, lat, lng)
          };

          station.statusInfo = getStationFuelStatus(station);
          return station;
        }).filter((s) => Number.isFinite(s.lat) && Number.isFinite(s.lng));

        lastStations.sort((a, b) => a.distanceKm - b.distanceKm);

        setStatus(`โหลดสำเร็จ พบ ${lastStations.length} สถานี`, "ok");
        renderStations(lastStations);
      } catch (err) {
        console.error(err);
        if (err && err.code === 1) {
          setStatus("ยังไม่ได้อนุญาตตำแหน่ง GPS กรุณาอนุญาต Location แล้วกดใหม่", "warn");
        } else if (err && err.code === 2) {
          setStatus("ไม่สามารถอ่านตำแหน่งปัจจุบันได้", "warn");
        } else if (err && err.code === 3) {
          setStatus("อ่านตำแหน่งหมดเวลา ลองใหม่อีกครั้ง", "warn");
        } else {
          setStatus("โหลดข้อมูลล้มเหลว ลองใหม่อีกครั้ง", "warn");
        }
        countBadge.textContent = "0 สถานี";
        summaryText.textContent = "ยังโหลดผลลัพธ์ไม่ได้";
        resultList.innerHTML = `<div class="empty">ยังไม่สามารถโหลดข้อมูลได้ในตอนนี้</div>`;
      }
    }

    findBtn.addEventListener("click", findNearbyStations);
    bkkBtn.addEventListener("click", useBangkok);
    reloadStatusBtn.addEventListener("click", async () => {
      await loadStationStatus();
      if (lastStations.length) {
        lastStations = lastStations.map(s => ({ ...s, statusInfo: getStationFuelStatus(s) }));
        renderStations(lastStations);
      }
    });
    brandFilter.addEventListener("change", () => {
      if (lastStations.length) renderStations(lastStations);
    });

    updateCoordText();
    loadStationStatus();
  </script>
</body>
</html>
