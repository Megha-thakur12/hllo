// ═══════════════════════════════════════════════════════════
//  Vibration / Predictive Maintenance widget  (device: Process Aro Pump)
//  - 5-minute telemetry cadence
//  - Data always on screen (history + browser cache)
//  - Auto-updates on new telemetry (live push + 30 s poll)
//  - Uses ONLY the keys that exist on the device
// ═══════════════════════════════════════════════════════════

const DATA_INTERVAL_MS = 5 * 60 * 1000;
const STALE_AFTER_MS   = 2 * DATA_INTERVAL_MS + 60 * 1000;   // ~11 min
const HISTORY_RANGE_MS = 7 * 24 * 3600 * 1000;
const HISTORY_LIMIT    = 300;
const MAX_POINTS       = 400;
const CACHE_TAIL       = 72;
const POLL_MS          = 30 * 1000;

// ───────────── series helpers ─────────────
function cleanRows(rows) {
  return (rows || [])
    .filter(e => e && e[1] !== null && e[1] !== undefined && e[1] !== '' && !isNaN(Number(e[1])))
    .map(e => [e[0], Number(e[1])]);
}

function mergeSeries(a, b) {
  const m = new Map();
  (a || []).forEach(p => m.set(p[0], p[1]));
  (b || []).forEach(p => m.set(p[0], p[1]));
  return Array.from(m.entries()).sort((x, y) => x[0] - y[0]).slice(-MAX_POINTS);
}

function newestOf(store) {
  let t = 0;
  Object.keys(store).forEach(k => {
    const s = store[k];
    if (s && s.length && s[s.length - 1][0] > t) t = s[s.length - 1][0];
  });
  return t;
}

// ───────────── cache helpers ─────────────
function cacheKey() {
  const ds = self.ctx.datasources && self.ctx.datasources[0];
  return 'vib_cache_' + (ds && ds.entityId ? ds.entityId : (self.ctx.widget && self.ctx.widget.id) || 'w');
}

function loadCache() {
  try {
    const raw = localStorage.getItem(cacheKey());
    return raw ? JSON.parse(raw) : {};
  } catch (e) { return {}; }
}

function saveCache(store) {
  try {
    const out = {};
    Object.keys(store).forEach(k => {
      if (store[k] && store[k].length) out[k] = store[k].slice(-CACHE_TAIL);
    });
    localStorage.setItem(cacheKey(), JSON.stringify(out));
  } catch (e) { /* ignore */ }
}

// ───────────── REST fetch (initial history + incremental new points) ─────────────
function fetchTelemetry(initial) {
  if (self.ctx._fetching) return;

  const ds = self.ctx.datasources && self.ctx.datasources[0];
  if (!ds || !ds.entityId || !ds.entityType || !self.ctx.http) return;

  const keys = (ds.dataKeys || [])
    .map(k => k.name)
    .filter(n => n && n.toLowerCase() !== 'timestamp');
  if (!keys.length) return;

  const now = Date.now();
  const known = newestOf(self.ctx._hist || {});
  const startTs = (!initial && known) ? known + 1 : now - HISTORY_RANGE_MS;

  self.ctx._fetching = true;

  const url = `/api/plugins/telemetry/${ds.entityType}/${ds.entityId}/values/timeseries` +
    `?keys=${encodeURIComponent(keys.join(','))}` +
    `&startTs=${startTs}&endTs=${now + 60000}` +
    `&limit=${HISTORY_LIMIT}&agg=NONE&orderBy=DESC&useStrictDataTypes=false`;

  self.ctx.http.get(url).subscribe(
    resp => {
      self.ctx._fetching = false;
      let added = false;
      Object.keys(resp || {}).forEach(k => {
        const rows = (resp[k] || [])
          .filter(p => p && p.value !== null && p.value !== undefined && p.value !== '' && !isNaN(Number(p.value)))
          .map(p => [p.ts, Number(p.value)]);
        if (rows.length) {
          self.ctx._hist[k] = mergeSeries(self.ctx._hist[k], rows);
          added = true;
        }
      });
      if (initial) {
        console.log('[Vibration widget] history loaded:',
          Object.keys(self.ctx._hist).map(k => `${k} → ${self.ctx._hist[k].length} pts`));
      }
      if (added) self.onDataUpdated();
    },
    err => {
      self.ctx._fetching = false;
      console.warn('[Vibration widget] telemetry fetch failed:', err);
    }
  );
}

// ═══════════════════════════════════════════════════════════
self.onInit = function () {

  if (!self.ctx._rulState) self.ctx._rulState = { pRul: null };
  self.ctx._hist = loadCache();
  self.ctx._lastDataTs = null;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  self.ctx._updateStatus = function () {
    const now = Date.now();

    const clk = document.getElementById('clk');
    if (clk) clk.textContent = new Date(now).toLocaleTimeString();

    const last = self.ctx._lastDataTs || null;
    const lastSync = document.getElementById('lastSync');
    const pCD = document.getElementById('pCD');

    if (!last) {
      const msg = self.ctx._gotKeys ? 'No telemetry found for this device' : 'Waiting for data…';
      if (lastSync) { lastSync.textContent = msg; lastSync.style.color = '#94a3b8'; }
      if (pCD) pCD.textContent = msg;
      return;
    }

    const stale = (now - last) > STALE_AFTER_MS;

    if (lastSync) {
      lastSync.textContent = (stale ? 'Data stale · last: ' : 'Last data: ') + new Date(last).toLocaleString();
      lastSync.style.color = stale ? '#ef4444' : '';
    }

    if (pCD) {
      const remaining = last + DATA_INTERVAL_MS - now;
      if (remaining > 0) {
        const s = Math.floor(remaining / 1000);
        pCD.textContent = `Next data in ${Math.floor(s / 60)}:${pad(s % 60)}`;
      } else if (!stale) {
        pCD.textContent = 'Waiting for new data…';
      } else {
        pCD.textContent = 'No new data (device offline?)';
      }
    }
  };

  if (self.ctx._clockTimer) clearInterval(self.ctx._clockTimer);
  self.ctx._clockTimer = setInterval(self.ctx._updateStatus, 1000);
  self.ctx._updateStatus();

  if (Object.keys(self.ctx._hist).length) setTimeout(() => self.onDataUpdated(), 0);
  setTimeout(() => fetchTelemetry(true), 500);

  if (self.ctx._pollTimer) clearInterval(self.ctx._pollTimer);
  self.ctx._pollTimer = setInterval(() => fetchTelemetry(false), POLL_MS);
};

self.onDestroy = function () {
  if (self.ctx._clockTimer) { clearInterval(self.ctx._clockTimer); self.ctx._clockTimer = null; }
  if (self.ctx._pollTimer)  { clearInterval(self.ctx._pollTimer);  self.ctx._pollTimer = null; }
};

// ═══════════════════════════════════════════════════════════
self.onDataUpdated = function () {

  if (!self.ctx._hist) self.ctx._hist = {};
  const liveData = self.ctx.data || [];

  // ─────────────────────────────────────
  // 0. MERGE live points into stored series
  // ─────────────────────────────────────
  liveData.forEach(d => {
    const name = d.dataKey.name || d.dataKey.label;
    if (!name || name.toLowerCase() === 'timestamp') return;
    const rows = cleanRows(d.data);
    if (rows.length) self.ctx._hist[name] = mergeSeries(self.ctx._hist[name], rows);
    else if (!self.ctx._hist[name]) self.ctx._hist[name] = [];
  });

  if (!liveData.length && !Object.keys(self.ctx._hist).length) return;
  self.ctx._gotKeys = true;

  const result = Object.keys(self.ctx._hist).map(name => ({ name, data: self.ctx._hist[name] }));

  const norm = s => String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
  const keyIndex = {};
  result.forEach(r => { keyIndex[norm(r.name)] = r; });

  const keySig = result.map(r => r.name + ':' + r.data.length).join('|');
  if (self.ctx._keySig !== keySig) {
    self.ctx._keySig = keySig;
    console.log('[Vibration widget] keys:', result.map(r => `${r.name} → ${r.data.length} pts`));
  }

  // ─────────────────────────────────────
  // 0b. NEW-DATA DETECTION
  // ─────────────────────────────────────
  const newestTs = newestOf(self.ctx._hist);
  const prevTs = self.ctx._lastDataTs || null;
  const chartExists = !!document.querySelector('#waveChart .js-plotly-plot, #waveChart.js-plotly-plot');

  if (newestTs) {
    if (prevTs === newestTs && chartExists) {
      if (self.ctx._updateStatus) self.ctx._updateStatus();
      return;
    }
    self.ctx._lastDataTs = newestTs;
    saveCache(self.ctx._hist);
  } else {
    if (self.ctx._emptyRendered && chartExists) {
      if (self.ctx._updateStatus) self.ctx._updateStatus();
      return;
    }
    self.ctx._emptyRendered = true;
  }

  // ─────────────────────────────────────
  // 1. HELPERS & KEY MAP (exact keys from the device)
  // ─────────────────────────────────────
  const missingKeys = new Set();

  function getSeries(name) {
    const entry = keyIndex[norm(name)];
    if (entry && entry.data.length) return entry.data;
    missingKeys.add(name);
    return null;
  }

  function parseXY(series) {
    if (!series || !series.length) return { xs: [], ys: [] };
    const sorted = [...series].sort((a, b) => a[0] - b[0]);
    return { xs: sorted.map(d => new Date(d[0])), ys: sorted.map(d => Number(d[1])) };
  }

  function latestVal(name) {
    const s = getSeries(name);
    if (!s) return null;
    const v = s[s.length - 1][1];
    return (v !== null && v !== undefined && !isNaN(v)) ? Number(v) : null;
  }

  function latestBool(name) {
    const v = latestVal(name);
    return v !== null ? v > 0 : null;
  }

  // metric → exact telemetry key
  function K(ax, metric) {
    const P = ax.toUpperCase() + 'axis';
    const map = {
      rms_vel:    `${P}_RMSVel_mm_sec`,
      rms_vel_in: `${P}_RMSVel_in_sec`,
      vel_freq:   `${P}_PeakVel_ComponentFreq_Hz`,
      peak_freq:  `${P}_PeakAcc_Freq_Hz`,
      full_rms:   `${P}_FullBand_RMSAcc_G`,
      full_pkpk:  `${P}_FullBand_PkPk_Acc_G`,
      full_crest: `${P}_FullBand_CrestFactor`,
      full_kurt:  `${P}_FullBand_Kurtosis`,
      hf_rms:     `${P}_HighFreq_RMSAcc_G`,
      hf_peak:    `${P}_HighFreq_PeakAcc_G`,
      hf_crest:   `${P}_HighFreq_CrestFactor`,
      hf_kurt:    `${P}_HighFreq_Kurtosis`
    };
    return map[metric];
  }

  const TEMP_KEY = 'Temperature_C';
  const RUN_KEY  = 'Motor_Run_Flag';
  const MAG_KEY  = 'Magnitude_XYZ_HighFreq_RMSAcc_G';

  // Axes that actually have data (Z appears automatically if you add Zaxis_* keys)
  const ALL_AXES = ['x', 'y', 'z'];
  const AXES = ALL_AXES.filter(ax => {
    const e = keyIndex[norm(K(ax, 'rms_vel'))];
    return e && e.data.length;
  });
  const AX_COLORS = { x: '#0ea5e9', y: '#6366f1', z: '#10b981' };
  const AX_NAMES  = { x: 'X-Axis', y: 'Y-Axis', z: 'Z-Axis' };

  // ─────────────────────────────────────
  // 2. PLOTLY CONFIG
  // ─────────────────────────────────────
  const PLY_CFG = { responsive: true, displayModeBar: false };
  const PLY_FONT = { family: 'DM Sans, sans-serif', size: 10, color: '#64748b' };
  const TIME_X = { tickformat: '%H:%M', hoverformat: '%d %b %H:%M' };

  function baseLayout(extra = {}) {
    return {
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      font: PLY_FONT,
      margin: { t: 4, b: 28, l: 40, r: 8 },
      showlegend: false,
      xaxis: { gridcolor: '#e2e8f0', tickfont: { size: 9 }, linecolor: '#e2e8f0', zeroline: false },
      yaxis: { gridcolor: '#e2e8f0', tickfont: { size: 9 }, linecolor: '#e2e8f0', zeroline: false },
      ...extra
    };
  }

  function noDataLayout(extra = {}) {
    return {
      ...baseLayout(extra),
      annotations: [{
        text: 'No Data Available', xref: 'paper', yref: 'paper', x: 0.5, y: 0.5, showarrow: false,
        font: { size: 14, color: '#94a3b8', family: 'DM Sans, sans-serif' }
      }],
      xaxis: { ...baseLayout().xaxis, visible: false },
      yaxis: { ...baseLayout().yaxis, visible: false }
    };
  }

  // ─────────────────────────────────────
  // 3. WAVEFORM CHART (velocity history of selected axis)
  // ─────────────────────────────────────
  let wAxis = self.ctx._wAxis || 'x';

  function buildWaveData(ax) {
    const raw = getSeries(K(ax, 'rms_vel'));
    if (!raw) return null;
    const { xs, ys } = parseXY(raw);
    if (!xs.length) return null;
    const tail = 60;   // 60 samples = 5 h at 5-min interval
    const c = AX_COLORS[ax];
    return [{
      x: xs.slice(-tail), y: ys.slice(-tail), type: 'scatter', mode: 'lines+markers',
      line: { color: c, width: 2, shape: 'spline' },
      marker: { size: 4, color: c },
      fill: 'tozeroy', fillcolor: c + '18',
      hovertemplate: '%{x|%d %b %H:%M}<br>%{y:.3f} mm/s<extra></extra>'
    }];
  }

  function refreshWave() {
    if (!document.getElementById('waveChart')) return;
    const traces = buildWaveData(wAxis);
    const extra = {
      xaxis: { ...baseLayout().xaxis, ...TIME_X },
      yaxis: { ...baseLayout().yaxis, title: { text: 'mm/s', font: { size: 9 } } }
    };
    Plotly.react('waveChart', traces || [], traces ? baseLayout(extra) : noDataLayout(extra), PLY_CFG);
  }

  window.setWAxis = function (ax, btn) {
    wAxis = ax;
    self.ctx._wAxis = ax;
    const container = document.getElementById('wtabs');
    if (container) container.querySelectorAll('.atab').forEach(b => b.className = 'atab');
    btn.className = `atab a${ax}`;
    refreshWave();
  };

  // ─────────────────────────────────────
  // 4. "SPECTRUM" CHART → acceleration levels of selected axis
  //    (the device has no harmonic keys, so this shows the available levels)
  // ─────────────────────────────────────
  let sAxis = self.ctx._sAxis || 'x';

  function buildSpecData(ax) {
    const vals = [
      latestVal(K(ax, 'full_rms')),
      latestVal(K(ax, 'hf_rms')),
      latestVal(K(ax, 'hf_peak'))
    ];
    if (vals.every(v => v === null)) return null;
    const pf = latestVal(K(ax, 'peak_freq'));
    const vf = latestVal(K(ax, 'vel_freq'));
    const c = AX_COLORS[ax];
    return [{
      x: ['Full-band RMS', 'High-freq RMS', 'High-freq Peak'],
      y: vals.map(v => v ?? 0),
      type: 'bar',
      marker: { color: [c, c, c], opacity: 0.85, line: { color: c, width: 1 } },
      customdata: [
        `Peak accel freq: ${pf !== null ? pf.toFixed(1) + ' Hz' : '—'}`,
        `Peak vel freq: ${vf !== null ? vf.toFixed(1) + ' Hz' : '—'}`,
        `Peak accel freq: ${pf !== null ? pf.toFixed(1) + ' Hz' : '—'}`
      ],
      hovertemplate: '<b>%{x}</b><br>%{y:.3f} G<br>%{customdata}<extra></extra>'
    }];
  }

  function refreshSpec() {
    if (!document.getElementById('specChart')) return;
    const traces = buildSpecData(sAxis);
    const extra = { yaxis: { ...baseLayout().yaxis, title: { text: 'G', font: { size: 9 } } } };
    Plotly.react('specChart', traces || [], traces ? baseLayout(extra) : noDataLayout(extra), PLY_CFG);
  }

  window.setSAxis = function (ax, btn) {
    sAxis = ax;
    self.ctx._sAxis = ax;
    const container = document.getElementById('stabs');
    if (container) container.querySelectorAll('.atab').forEach(b => b.className = 'atab');
    btn.className = `atab a${ax}`;
    refreshSpec();
  };

  // ─────────────────────────────────────
  // 5. TREND CHART (velocity history, all available axes)
  // ─────────────────────────────────────
  function buildTrendData() {
    const traces = [];
    AXES.forEach(ax => {
      const raw = getSeries(K(ax, 'rms_vel'));
      if (!raw) return;
      const { xs, ys } = parseXY(raw);
      if (!xs.length) return;
      const c = AX_COLORS[ax];
      traces.push({
        x: xs, y: ys, name: AX_NAMES[ax], type: 'scatter', mode: 'lines+markers',
        line: { color: c, width: 2, shape: 'spline' },
        marker: { size: 4 },
        fill: 'tozeroy', fillcolor: c + '10',
        hovertemplate: `<b>${AX_NAMES[ax]}</b>: %{y:.3f} mm/s<extra></extra>`
      });
    });
    return traces;
  }

  const trendExtraLayout = {
    showlegend: true,
    legend: { orientation: 'h', x: 0, y: 1.12, font: { size: 10 } },
    margin: { t: 8, b: 32, l: 44, r: 8 },
    xaxis: { ...baseLayout().xaxis, ...TIME_X },
    yaxis: { ...baseLayout().yaxis, title: { text: 'mm/s RMS', font: { size: 9 } } },
    hovermode: 'x unified'
  };

  function refreshTrend() {
    if (!document.getElementById('trendChart')) return;
    const traces = buildTrendData();
    Plotly.react('trendChart', traces, traces.length ? baseLayout(trendExtraLayout) : noDataLayout(trendExtraLayout), PLY_CFG);
  }

  // ─────────────────────────────────────
  // 6. DETAIL CHARTS
  //    harmAclChart → Crest factor (full-band vs high-freq) per axis
  //    harmVelChart → Kurtosis (full-band vs high-freq) per axis
  // ─────────────────────────────────────
  function buildPairChart(fullMetric, hfMetric) {
    const labels = [], full = [], hf = [];
    AXES.forEach(ax => {
      labels.push(ax.toUpperCase());
      full.push(latestVal(K(ax, fullMetric)) ?? 0);
      hf.push(latestVal(K(ax, hfMetric)) ?? 0);
    });
    if (!labels.length) return [];
    return [
      { x: labels, y: full, name: 'Full-band', type: 'bar',
        marker: { color: '#0ea5e9', opacity: 0.8 }, hovertemplate: '<b>%{x} full-band</b>: %{y:.2f}<extra></extra>' },
      { x: labels, y: hf, name: 'High-freq', type: 'bar',
        marker: { color: '#6366f1', opacity: 0.8 }, hovertemplate: '<b>%{x} high-freq</b>: %{y:.2f}<extra></extra>' }
    ];
  }

  function pairLayout(title) {
    return {
      ...baseLayout(),
      barmode: 'group',
      showlegend: true,
      legend: { orientation: 'h', x: 0, y: 1.12, font: { size: 10 } },
      margin: { t: 8, b: 28, l: 40, r: 8 },
      yaxis: { ...baseLayout().yaxis, title: { text: title, font: { size: 9 } } }
    };
  }

  function refreshHarmCharts() {
    if (document.getElementById('harmAclChart')) {
      const t = buildPairChart('full_crest', 'hf_crest');
      Plotly.react('harmAclChart', t, t.length ? pairLayout('Crest factor') : noDataLayout(pairLayout('Crest factor')), PLY_CFG);
    }
    if (document.getElementById('harmVelChart')) {
      const t = buildPairChart('full_kurt', 'hf_kurt');
      Plotly.react('harmVelChart', t, t.length ? pairLayout('Kurtosis') : noDataLayout(pairLayout('Kurtosis')), PLY_CFG);
    }
  }

  // ─────────────────────────────────────
  // 7. HEALTH RING (worst-axis velocity, ISO-10816-style bands)
  // ─────────────────────────────────────
  const rC = document.getElementById('ringC');
  const rX = rC ? rC.getContext('2d') : null;

  function worstVel() {
    const vals = AXES.map(ax => latestVal(K(ax, 'rms_vel'))).filter(v => v !== null);
    return vals.length ? Math.max(...vals) : null;
  }

  function computeHealth() {
    const worst = worstVel();
    if (worst === null) return null;
    if (worst < 2.3) return 95;
    if (worst < 4.5) return 82;
    if (worst < 7.1) return 65;
    if (worst < 11.2) return 40;
    return 18;
  }

  function drawRing(s) {
    if (!rX) return;
    rX.clearRect(0, 0, 130, 130);
    const cx = 65, cy = 65, r = 52;
    const hScore = document.getElementById('hScore');

    if (s === null) {
      rX.beginPath(); rX.arc(cx, cy, r, -Math.PI / 2, Math.PI * 1.5);
      rX.strokeStyle = '#e2e8f0'; rX.lineWidth = 10; rX.stroke();
      if (hScore) { hScore.textContent = '—'; hScore.style.color = '#94a3b8'; }
      return;
    }

    const c = s > 80 ? '#10b981' : s > 50 ? '#f59e0b' : '#ef4444';
    rX.beginPath(); rX.arc(cx, cy, r, -Math.PI / 2, Math.PI * 1.5);
    rX.strokeStyle = s > 80 ? '#d1fae5' : s > 50 ? '#fef9c3' : '#fee2e2';
    rX.lineWidth = 10; rX.stroke();
    rX.beginPath(); rX.arc(cx, cy, r, -Math.PI / 2, -Math.PI / 2 + (s / 100) * Math.PI * 2);
    rX.strokeStyle = c; rX.lineWidth = 10; rX.lineCap = 'round'; rX.stroke();
    if (hScore) { hScore.textContent = s; hScore.style.color = c; }
  }

  // ─────────────────────────────────────
  // 8. KPI + STATUS UPDATE
  // ─────────────────────────────────────
  const ND = '—';

  function setEl(id, val) { const e = document.getElementById(id); if (e) e.textContent = val; }
  function setStyle(id, prop, val) { const e = document.getElementById(id); if (e) e.style[prop] = val; }

  function updateKPIs() {
    const vel = {}, pk = {};
    ALL_AXES.forEach(ax => {
      vel[ax] = latestVal(K(ax, 'rms_vel'));
      pk[ax]  = latestVal(K(ax, 'hf_peak'));
    });

    const tmp = latestVal(TEMP_KEY);
    const running = latestBool(RUN_KEY);
    const mag = latestVal(MAG_KEY);

    ALL_AXES.forEach(ax => {
      const v = vel[ax];
      setEl(`k-${ax}v`, v !== null ? v.toFixed(2) : ND);
      setEl(`k-${ax}vd`, v !== null ? (v > 4.5 ? 'WARN (>4.5)' : 'NORMAL') : 'NO DATA');
    });

    const peakVals = ALL_AXES.map(ax => pk[ax]).filter(v => v !== null);
    if (peakVals.length) {
      setEl('k-pk', Math.max(...peakVals).toFixed(2));
      setEl('k-pkd', ALL_AXES.map(ax => `${ax.toUpperCase()}:${pk[ax] !== null ? pk[ax].toFixed(1) : ND}`).join(' '));
    } else {
      setEl('k-pk', ND);
      setEl('k-pkd', `X:${ND} Y:${ND} Z:${ND}`);
    }

    setEl('k-tmp', tmp !== null ? tmp.toFixed(1) : ND);
    setEl('tmpV', tmp !== null ? tmp.toFixed(1) : ND);

    if (running !== null) {
      setEl('k-ms', running ? 'RUNNING' : 'STOPPED');
      setStyle('k-ms', 'color', running ? '#059669' : '#ef4444');
    } else {
      setEl('k-ms', 'NO DATA');
      setStyle('k-ms', 'color', '#94a3b8');
    }

    if (mag !== null) {
      setEl('k-noise', `Acc Mag: ${mag.toFixed(2)} G`);
      setEl('noiseV', mag.toFixed(2) + ' G');
      setStyle('noiseV', 'color', '');
      const noisePin = document.getElementById('noisePin');
      if (noisePin) noisePin.style.left = Math.min(100, (mag / 2) * 100) + '%';
    } else {
      setEl('k-noise', `Noise: ${ND}`);
      setEl('noiseV', ND);
      setStyle('noiseV', 'color', '#94a3b8');
    }

    ALL_AXES.forEach(ax => {
      const v = vel[ax];
      setEl(`g${ax.toUpperCase()}`, v !== null ? v.toFixed(2) : ND);
      const f = document.getElementById(`g${ax.toUpperCase()}f`);
      if (f) f.style.width = v !== null ? Math.min(100, v * 8.9) + '%' : '0%';
    });

    drawRing(computeHealth());
    renderSpark();
  }

  // ─────────────────────────────────────
  // 9. SPARKLINE (temperature, last 24 samples = 2 h)
  // ─────────────────────────────────────
  function renderSpark() {
    const sp = document.getElementById('sparkR');
    if (!sp) return;
    sp.innerHTML = '';
    const raw = getSeries(TEMP_KEY);
    const noData = `<span style="color:#94a3b8;font-size:10px;align-self:center">No Data</span>`;
    if (!raw) { sp.innerHTML = noData; return; }
    const vals = parseXY(raw).ys.slice(-24);
    if (!vals.length) { sp.innerHTML = noData; return; }
    const mx = Math.max(...vals, 1);
    vals.forEach(v => {
      const b = document.createElement('div'); b.className = 'spark-b';
      const t = v / 85;
      b.style.cssText = `height:${(v / mx) * 100}%;background:${t > 0.85 ? '#ef4444' : t > 0.7 ? '#f59e0b' : '#10b981'};opacity:0.8;`;
      sp.appendChild(b);
    });
  }

  // ─────────────────────────────────────
  // 10. FAULT INDICATORS (heuristic, from overall vibration statistics)
  // ─────────────────────────────────────
  if (!self.ctx._rulState) self.ctx._rulState = { pRul: null };
  const state = self.ctx._rulState;

  const FAULTS = [
    {
      name: 'Unbalance', sub: 'High velocity, low-frequency dominated', color: '#f59e0b', border: '#fde68a',
      algorithm: 'Velocity Severity × LF Dominance',
      formula: 'P = Vel severity × (0.5 + 0.5·(1 − HF/Full))',
      formula_vars: 'Velocity 1.8→7.1 mm/s; HF/Full RMS 0.3→0.8',
      features: [
        { label: 'Velocity severity', color: '#f59e0b' },
        { label: 'LF dominance', color: '#f59e0b' }
      ],
      action: 'Check rotor balance'
    },
    {
      name: 'Misalignment', sub: 'High velocity, uneven across axes', color: '#ef4444', border: '#fecaca',
      algorithm: 'Velocity + Axis Imbalance',
      formula: 'P = 0.6·Vel severity + 0.4·(max/min axis ratio)',
      formula_vars: 'Axis ratio 1.5→4 (needs ≥ 2 axes)',
      features: [
        { label: 'Velocity severity', color: '#ef4444' },
        { label: 'Axis imbalance', color: '#ef4444' }
      ],
      action: 'Inspect shaft alignment & coupling'
    },
    {
      name: 'Bearing Defect', sub: 'Impulsive high-frequency energy', color: '#6366f1', border: '#c7d2fe',
      algorithm: 'Kurtosis / Crest / HF Ratio',
      formula: 'P = 0.4·Kurt(HF) + 0.35·Crest(HF) + 0.25·HF/Full',
      formula_vars: 'Kurtosis 3→8; Crest 3→8; HF/Full 0.4→0.9',
      features: [
        { label: 'HF kurtosis', color: '#6366f1' },
        { label: 'HF crest factor', color: '#6366f1' },
        { label: 'HF / Full-band RMS', color: '#6366f1' }
      ],
      action: 'Inspect bearings for wear or damage'
    },
    {
      name: 'Looseness', sub: 'Impacts and wide peak-to-peak', color: '#0ea5e9', border: '#bae6fd',
      algorithm: 'Kurtosis / Crest / PkPk Ratio',
      formula: 'P = 0.4·Kurt(Full) + 0.3·PkPk/RMS + 0.3·Crest(Full)',
      formula_vars: 'Kurtosis 3→6; PkPk/RMS 4→8; Crest 2.5→5',
      features: [
        { label: 'Full-band kurtosis', color: '#0ea5e9' },
        { label: 'PkPk / RMS', color: '#0ea5e9' },
        { label: 'Full-band crest factor', color: '#0ea5e9' }
      ],
      action: 'Check mounting, bolts, and base'
    },
    {
      name: 'Overall Severity', sub: 'RMS velocity vs ISO-style limits', color: '#10b981', border: '#a7f3d0',
      algorithm: 'Velocity Severity',
      formula: 'P = ramp(worst-axis velocity, 2.8 → 11.2 mm/s)',
      formula_vars: 'Higher velocity → higher severity',
      features: [{ label: 'Worst-axis velocity', color: '#10b981' }],
      action: 'Plan inspection if severity keeps rising'
    }
  ];

  function clamp(v, min = 0, max = 1) { return Math.max(min, Math.min(max, v)); }
  function ramp(v, lo, hi) { return v === null ? null : clamp((v - lo) / (hi - lo)); }
  function safeDiv(a, b) { if (a === null || b === null || b === 0) return null; const v = a / b; return isFinite(v) ? v : null; }
  function avg(arr) { const v = arr.filter(x => x !== null); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null; }
  function maxOf(arr) { const v = arr.filter(x => x !== null); return v.length ? Math.max(...v) : null; }
  function wsum(parts) {   // weighted sum over available parts [[weight, value], ...]
    const ok = parts.filter(p => p[1] !== null);
    if (!ok.length) return null;
    const w = ok.reduce((a, p) => a + p[0], 0);
    return ok.reduce((a, p) => a + p[0] * p[1], 0) / w;
  }
  function combine(scores) {   // 60 % worst axis + 40 % average
    const m = maxOf(scores), a = avg(scores);
    return m === null ? null : clamp(0.6 * m + 0.4 * a);
  }

  function computeFaultProbs() {
    FAULTS.forEach(f => {
      f.prob = null;
      f.axisScores = {};
      f.features.forEach(fe => fe.val = null);
    });

    const F = {};   // per-axis features
    AXES.forEach(ax => {
      const full = latestVal(K(ax, 'full_rms'));
      const hf = latestVal(K(ax, 'hf_rms'));
      F[ax] = {
        vel: latestVal(K(ax, 'rms_vel')),
        hfRatio: safeDiv(hf, full),
        hfKurt: latestVal(K(ax, 'hf_kurt')),
        hfCrest: latestVal(K(ax, 'hf_crest')),
        fullKurt: latestVal(K(ax, 'full_kurt')),
        fullCrest: latestVal(K(ax, 'full_crest')),
        pkpkRatio: safeDiv(latestVal(K(ax, 'full_pkpk')), full)
      };
    });

    const mean = (f, fn) => avg(AXES.map(ax => fn(F[ax])));

    // Unbalance
    {
      const sc = [];
      AXES.forEach(ax => {
        const vel = ramp(F[ax].vel, 1.8, 7.1);
        const lf = F[ax].hfRatio !== null ? 1 - ramp(F[ax].hfRatio, 0.3, 0.8) : null;
        if (vel === null) return;
        const s = vel * (0.5 + 0.5 * (lf ?? 0.5));
        FAULTS[0].axisScores[ax] = s;
        sc.push(s);
      });
      const p = combine(sc);
      if (p !== null) {
        FAULTS[0].prob = Math.min(0.98, p);
        FAULTS[0].features[0].val = mean(F, f => ramp(f.vel, 1.8, 7.1));
        FAULTS[0].features[1].val = mean(F, f => f.hfRatio !== null ? 1 - ramp(f.hfRatio, 0.3, 0.8) : null);
      }
    }

    // Misalignment
    {
      const vels = AXES.map(ax => F[ax].vel).filter(v => v !== null);
      let imbalance = null;
      if (vels.length >= 2 && Math.min(...vels) > 0) imbalance = ramp(Math.max(...vels) / Math.min(...vels), 1.5, 4);
      const sc = [];
      AXES.forEach(ax => {
        const vel = ramp(F[ax].vel, 1.8, 7.1);
        if (vel === null) return;
        const s = wsum([[0.6, vel], [0.4, imbalance]]);
        FAULTS[1].axisScores[ax] = s;
        sc.push(s);
      });
      const p = combine(sc);
      if (p !== null) {
        FAULTS[1].prob = Math.min(0.95, p);
        FAULTS[1].features[0].val = mean(F, f => ramp(f.vel, 1.8, 7.1));
        FAULTS[1].features[1].val = imbalance;
      }
    }

    // Bearing defect
    {
      const sc = [];
      AXES.forEach(ax => {
        const s = wsum([
          [0.40, ramp(F[ax].hfKurt, 3, 8)],
          [0.35, ramp(F[ax].hfCrest, 3, 8)],
          [0.25, ramp(F[ax].hfRatio, 0.4, 0.9)]
        ]);
        if (s === null) return;
        FAULTS[2].axisScores[ax] = s;
        sc.push(s);
      });
      const p = combine(sc);
      if (p !== null) {
        FAULTS[2].prob = Math.min(0.95, p);
        FAULTS[2].features[0].val = mean(F, f => ramp(f.hfKurt, 3, 8));
        FAULTS[2].features[1].val = mean(F, f => ramp(f.hfCrest, 3, 8));
        FAULTS[2].features[2].val = mean(F, f => ramp(f.hfRatio, 0.4, 0.9));
      }
    }

    // Looseness
    {
      const sc = [];
      AXES.forEach(ax => {
        const s = wsum([
          [0.40, ramp(F[ax].fullKurt, 3, 6)],
          [0.30, ramp(F[ax].pkpkRatio, 4, 8)],
          [0.30, ramp(F[ax].fullCrest, 2.5, 5)]
        ]);
        if (s === null) return;
        FAULTS[3].axisScores[ax] = s;
        sc.push(s);
      });
      const p = combine(sc);
      if (p !== null) {
        FAULTS[3].prob = Math.min(0.9, p);
        FAULTS[3].features[0].val = mean(F, f => ramp(f.fullKurt, 3, 6));
        FAULTS[3].features[1].val = mean(F, f => ramp(f.pkpkRatio, 4, 8));
        FAULTS[3].features[2].val = mean(F, f => ramp(f.fullCrest, 2.5, 5));
      }
    }

    // Overall severity
    {
      const sc = [];
      AXES.forEach(ax => {
        const s = ramp(F[ax].vel, 2.8, 11.2);
        if (s === null) return;
        FAULTS[4].axisScores[ax] = s;
        sc.push(s);
      });
      const m = maxOf(sc);
      if (m !== null) {
        FAULTS[4].prob = Math.min(0.99, m);
        FAULTS[4].features[0].val = m;
      }
    }
  }

  function renderFaults() {
    computeFaultProbs();
    const l = document.getElementById('faultL');
    if (!l) return;
    l.innerHTML = '';

    if (!FAULTS.some(f => f.prob !== null)) {
      l.innerHTML = `<div style="text-align:center;color:#94a3b8;padding:24px 0;font-size:13px">No Data Available</div>`;
      return;
    }

    FAULTS.forEach(f => {
      const d = document.createElement('div'); d.className = 'fault-item';
      d.style.borderColor = f.border;

      const pct = f.prob !== null ? Math.min(99, Math.round(f.prob * 100)) : null;
      const pctLabel = pct !== null ? `${pct}%` : ND;
      const barWidth = pct !== null ? `${pct}%` : '0%';

      d.innerHTML = `
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:8px;height:8px;border-radius:50%;background:${f.color};flex-shrink:0"></div>
          <div>
            <div class="fault-name" style="color:${f.color}">${f.name}</div>
            <div class="fault-sub">${f.sub}</div>
          </div>
        </div>
        <div class="prob-wrap">
          <div class="prob-track"><div class="prob-fill" style="width:${barWidth};background:${f.color}"></div></div>
          <span class="prob-pct" style="color:${pct !== null ? f.color : '#94a3b8'}">${pctLabel}</span>
        </div>`;
      d.addEventListener('mouseenter', e => showFaultTip(e, f));
      d.addEventListener('mouseleave', () => scheduleFaultHide());
      l.appendChild(d);
    });
  }

  // ─────────────────────────────────────
  // 11. FAULT TOOLTIP
  // ─────────────────────────────────────
  const ftEl = document.getElementById('faultTip');
  let ftHideTimer = null;

  function showFaultTip(e, f) {
    if (!ftEl) return;
    clearTimeout(ftHideTimer);
    const pct = f.prob !== null ? Math.min(99, Math.round(f.prob * 100)) : null;

    document.getElementById('ft-title').textContent = f.name;
    document.getElementById('ft-sub').textContent = f.sub;
    document.getElementById('ft-formula').innerHTML =
      `<div style="margin-bottom:3px;color:#6366f1;font-size:8px">${f.algorithm}</div>` +
      `<div style="color:#0f172a;font-weight:700">${f.formula}</div>` +
      `<div style="color:#94a3b8;margin-top:2px">${f.formula_vars}</div>`;

    const fEl = document.getElementById('ft-features'); fEl.innerHTML = '';
    f.features.forEach(feat => {
      const pf = feat.val !== null ? Math.round(feat.val * 100) : null;
      fEl.innerHTML += `
        <div class="ft-brow">
          <div class="ft-blbl">
            <span>${feat.label}</span>
            <span style="color:${feat.color};font-weight:700">${pf !== null ? pf + '%' : ND}</span>
          </div>
          <div class="ft-btrack">
            <div class="ft-bfill" style="width:${pf !== null ? pf + '%' : '0%'};background:${feat.color}"></div>
          </div>
        </div>`;
    });

    const conf = document.getElementById('ft-confidence'); conf.innerHTML = '';
    const axCol = { x: '#0284c7', y: '#4f46e5', z: '#059669' };
    const confLevel = pct === null ? 'NO DATA' : pct > 50 ? 'HIGH' : pct > 20 ? 'MEDIUM' : 'LOW';
    const confColor = pct === null ? '#94a3b8' : pct > 50 ? '#ef4444' : pct > 20 ? '#f59e0b' : '#10b981';
    ALL_AXES.forEach(ax => {
      const s = f.axisScores ? f.axisScores[ax] : undefined;
      const txt = (s !== undefined && s !== null) ? Math.round(s * 100) + '%' : ND;
      conf.innerHTML += `<div class="ft-row"><span class="ft-key">${ax.toUpperCase()}-Axis score</span><span class="ft-val" style="color:${axCol[ax]}">${txt}</span></div>`;
    });
    conf.innerHTML += `<div class="ft-row" style="border-top:1px solid var(--border);padding-top:4px;margin-top:4px">
      <span class="ft-key">Indicator level</span>
      <span class="ft-val" style="color:${confColor}">${confLevel}${pct !== null ? ' (' + pct + '%)' : ''}</span>
    </div>`;

    document.getElementById('ft-foot').innerHTML =
      `<span style="color:${f.color};font-weight:700">▶ Recommended: </span>${f.action}`;

    positionFaultTip(e);
    ftEl.classList.add('vis');
  }

  function positionFaultTip(e) {
    if (!ftEl) return;
    const vw = window.innerWidth, vh = window.innerHeight;
    let left = e.clientX + 16, top = e.clientY - 20;
    if (left + 318 > vw) left = e.clientX - 326;
    if (top + 430 > vh) top = vh - 435;
    if (top < 10) top = 10;
    ftEl.style.left = left + 'px'; ftEl.style.top = top + 'px';
  }

  function scheduleFaultHide() {
    ftHideTimer = setTimeout(() => { if (ftEl) ftEl.classList.remove('vis'); }, 220);
  }

  if (ftEl && !ftEl._listenersAdded) {
    ftEl.addEventListener('mouseenter', () => clearTimeout(ftHideTimer));
    ftEl.addEventListener('mouseleave', () => scheduleFaultHide());
    ftEl._listenersAdded = true;
  }

  // ─────────────────────────────────────
  // 12. EVENTS LOG
  // ─────────────────────────────────────
  function renderEvents() {
    const log = document.getElementById('evLog');
    if (!log || log.children.length > 0) return;
    log.innerHTML = `<div style="text-align:center;color:#94a3b8;padding:16px 0;font-size:12px">No events logged</div>`;
  }

  // ─────────────────────────────────────
  // 13. RUL (placeholder, reduced by real elapsed time between samples)
  // ─────────────────────────────────────
  function updateRUL() {
    if (worstVel() === null) {
      setEl('rulV', ND);
      setEl('rulSub', 'Confidence: NO DATA');
      return;
    }

    if (state.pRul === null) state.pRul = 847;   // placeholder start (hours)

    if (prevTs && newestTs > prevTs) {
      state.pRul = Math.max(50, state.pRul - (newestTs - prevTs) / 3600000);
    }

    setEl('rulV', Math.round(state.pRul));
    setEl('rulSub', `≈ ${(state.pRul / 24).toFixed(1)} days · Estimate only`);
  }

  // ─────────────────────────────────────
  // 14. RENDER (runs only when a newer sample arrived)
  // ─────────────────────────────────────
  updateRUL();
  updateKPIs();
  refreshWave();
  refreshSpec();
  refreshTrend();
  refreshHarmCharts();
  renderFaults();
  renderEvents();

  if (missingKeys.size) {
    const sig = [...missingKeys].join(',');
    if (self.ctx._missingSig !== sig) {
      self.ctx._missingSig = sig;
      console.warn('[Vibration widget] keys not found / empty:', [...missingKeys]);
    }
  }

  if (self.ctx._updateStatus) self.ctx._updateStatus();
};
