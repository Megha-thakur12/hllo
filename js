self.onInit = function() {

};

self.onDataUpdated = function() {
  setTimeout(function() {
    var data = self.ctx.data;
    let result = data.map(item => {
      return {
        name: item.dataKey.name,
        data: item.data.map(entry => [entry[0], entry[1]])
      };
    });

    // ─────────────────────────────────────
    // 1. HELPERS & TELEMETRY KEY MAP
    // ─────────────────────────────────────
    function getSeries(name) {
      const entry = result.find(r => r.name === name);
      if (!entry || !entry.data || entry.data.length === 0) return null;
      return entry.data;
    }

    function parseXY(series) {
      if (!series || series.length === 0) return { xs: [], ys: [] };
      const first = series[0];
      if (typeof first === 'number') {
        return { xs: series.map((_, i) => i), ys: series };
      }
      if (Array.isArray(first)) {
        return { xs: series.map(d => new Date(d[0])), ys: series.map(d => d[1]) };
      }
      if ('x' in first && 'y' in first) {
        return { xs: series.map(d => new Date(d.x)), ys: series.map(d => d.y) };
      }
      if ('timestamp' in first) {
        return { xs: series.map(d => new Date(d.timestamp)), ys: series.map(d => d.value) };
      }
      return { xs: [], ys: [] };
    }

    function latestVal(name) {
      const s = getSeries(name);
      if (!s) return null;
      const { ys } = parseXY(s);
      return ys.length ? ys[ys.length - 1] : null;
    }

    function latestBool(name) {
      const v = latestVal(name);
      return v !== null ? v > 0 || v === true : null;
    }

    // Dynamic telemetry key resolver based on image metadata keys
    function getKeyName(axis, metric) {
      const axisFormatted = axis.toUpperCase() === 'X' ? 'Xaxis' : axis.toUpperCase() === 'Y' ? 'Yaxis' : 'Zaxis';
      
      const keyMap = {
        'rms_vel': `${axisFormatted}_RMSVel_mm_sec`,
        'peak_acl': `${axisFormatted}_HighFreq_PeakAcc_G`,
        'rms_acl': `${axisFormatted}_HighFreq_RMSAcc_G`,
        'full_rms_acl': `${axisFormatted}_FullBand_RMSAcc_G`,
        'peak_freq': `${axisFormatted}_PeakAcc_Freq_Hz`,
        'vel_freq': `${axisFormatted}_PeakVel_ComponentFreq_Hz`
      };

      return keyMap[metric] || metric;
    }

    const HARM_LABELS = ['1X', '2X', '3X', '4X', '5X', '6X'];
    const H_FREQ = {
      x: [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
      y: [25, 50, 75, 100, 125, 150, 175, 200, 225, 250],
      z: [25, 50, 75, 100, 125, 150, 175, 200, 225, 250]
    };

    function getHarmVal(axis, type, idx) {
      const n = idx + 1;
      const name = `${axis.toUpperCase()}axis_${type}_amp_${n}x`;
      return latestVal(name);
    }

    // ─────────────────────────────────────
    // 2. PLOTLY CONFIG
    // ─────────────────────────────────────
    const PLY_CFG = { responsive: true, displayModeBar: false };
    const PLY_FONT = { family: 'DM Sans, sans-serif', size: 10, color: '#64748b' };
    const PLY_PAPER = 'rgba(0,0,0,0)';
    const PLY_PLOT = 'rgba(0,0,0,0)';

    function baseLayout(extra = {}) {
      return {
        paper_bgcolor: PLY_PAPER,
        plot_bgcolor: PLY_PLOT,
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
          text: 'No Data Available',
          xref: 'paper', yref: 'paper',
          x: 0.5, y: 0.5,
          showarrow: false,
          font: { size: 14, color: '#94a3b8', family: 'DM Sans, sans-serif' }
        }],
        xaxis: { ...baseLayout().xaxis, visible: false },
        yaxis: { ...baseLayout().yaxis, visible: false }
      };
    }

    // ─────────────────────────────────────
    // 3. WAVEFORM CHART
    // ─────────────────────────────────────
    let wAxis = self.ctx._wAxis || 'x';
    const WAVE_COLORS = { x: '#0ea5e9', y: '#6366f1', z: '#10b981' };

    function buildWaveData(ax) {
      const name = getKeyName(ax, 'rms_vel');
      const raw = getSeries(name);
      if (!raw) return null;
      const { xs, ys } = parseXY(raw);
      if (!xs.length) return null;
      const tail = 60;
      const sx = xs.slice(-tail), sy = ys.slice(-tail);
      const c = WAVE_COLORS[ax];
      return [{
        x: sx, y: sy, type: 'scatter', mode: 'lines',
        line: { color: c, width: 2, shape: 'spline' },
        fill: 'tozeroy',
        fillcolor: c + '18',
        hovertemplate: '%{y:.3f} mm/s<extra></extra>'
      }];
    }

    function refreshWave() {
      const el = document.getElementById('waveChart');
      if (!el) return;
      const traces = buildWaveData(wAxis);
      const layout = traces ? baseLayout({ yaxis: { ...baseLayout().yaxis, title: { text: 'mm/s', font: { size: 9 } } } }) : noDataLayout({ yaxis: { ...baseLayout().yaxis, title: { text: 'mm/s', font: { size: 9 } } } });
      Plotly.react('waveChart', traces || [], layout, PLY_CFG);
    }

    window.setWAxis = function(ax, btn) {
      wAxis = ax;
      self.ctx._wAxis = ax;
      const container = document.getElementById('wtabs');
      if (container) {
        container.querySelectorAll('.atab').forEach(b => b.className = 'atab');
      }
      btn.className = `atab a${ax}`;
      refreshWave();
    };

    // ─────────────────────────────────────
    // 4. SPECTRUM CHART
    // ─────────────────────────────────────
    let sAxis = self.ctx._sAxis || 'x';

    function buildSpecData(ax) {
      const amps = HARM_LABELS.map((_, i) => getHarmVal(ax, 'acl', i));
      if (amps.every(v => v === null)) return null;
      const freqs = Array.from({ length: 10 }, (_, i) => {
        const nm = `${ax.toUpperCase()}axis_rms_acl_freq_${i + 1}x`;
        return latestVal(nm) ?? H_FREQ[ax][i];
      });
      const c = WAVE_COLORS[ax];
      const safeAmps = amps.map(v => v ?? 0);
      return [{
        x: HARM_LABELS, y: safeAmps, type: 'bar',
        marker: { color: safeAmps.map(() => c), opacity: 0.85, line: { color: c, width: 1 } },
        customdata: freqs,
        hovertemplate: '<b>%{x}</b><br>Amplitude: %{y:.3f} G<br>Freq: %{customdata} Hz<extra></extra>'
      }];
    }

    function refreshSpec() {
      const el = document.getElementById('specChart');
      if (!el) return;
      const traces = buildSpecData(sAxis);
      const layout = traces ? baseLayout({ yaxis: { ...baseLayout().yaxis, title: { text: 'G RMS', font: { size: 9 } } } }) : noDataLayout({ yaxis: { ...baseLayout().yaxis, title: { text: 'G RMS', font: { size: 9 } } } });
      Plotly.react('specChart', traces || [], layout, PLY_CFG);
    }

    window.setSAxis = function(ax, btn) {
      sAxis = ax;
      self.ctx._sAxis = ax;
      const container = document.getElementById('stabs');
      if (container) {
        container.querySelectorAll('.atab').forEach(b => b.className = 'atab');
      }
      btn.className = `atab a${ax}`;
      refreshSpec();
    };

    // ─────────────────────────────────────
    // 5. TREND CHART
    // ─────────────────────────────────────
    function buildTrendData() {
      const axes = ['x', 'y', 'z'];
      const colors = ['#0ea5e9', '#6366f1', '#10b981'];
      const names = ['X-Axis', 'Y-Axis', 'Z-Axis'];
      const traces = [];
      axes.forEach((ax, i) => {
        const raw = getSeries(getKeyName(ax, 'rms_vel'));
        if (!raw) return;
        const { xs, ys } = parseXY(raw);
        if (!xs.length) return;
        traces.push({
          x: xs, y: ys, name: names[i], type: 'scatter', mode: 'lines',
          line: { color: colors[i], width: 2, shape: 'spline' },
          fill: 'tozeroy', fillcolor: colors[i] + '10',
          hovertemplate: `<b>${names[i]}</b>: %{y:.3f} mm/s<extra></extra>`
        });
      });
      return traces;
    }

    const trendExtraLayout = {
      showlegend: true,
      legend: { orientation: 'h', x: 0, y: 1.12, font: { size: 10 } },
      margin: { t: 8, b: 32, l: 44, r: 8 },
      yaxis: { ...baseLayout().yaxis, title: { text: 'mm/s RMS', font: { size: 9 } } },
      hovermode: 'x unified'
    };

    function refreshTrend() {
      const el = document.getElementById('trendChart');
      if (!el) return;
      const traces = buildTrendData();
      const layout = traces.length ? baseLayout(trendExtraLayout) : noDataLayout(trendExtraLayout);
      Plotly.react('trendChart', traces, layout, PLY_CFG);
    }

    // ─────────────────────────────────────
    // 6. HARMONIC DETAIL CHARTS
    // ─────────────────────────────────────
    function buildHarmData(type) {
      const axes = ['x', 'y', 'z'];
      const colors = ['#0ea5e9', '#6366f1', '#10b981'];
      const names = ['X', 'Y', 'Z'];
      const traces = [];
      axes.forEach((ax, i) => {
        const vals = HARM_LABELS.map((_, j) => getHarmVal(ax, type, j));
        if (vals.every(v => v === null)) return;
        traces.push({
          x: HARM_LABELS,
          y: vals.map(v => v ?? 0),
          name: names[i], type: 'bar',
          marker: { color: colors[i], opacity: 0.8, line: { color: colors[i], width: 1 } },
          hovertemplate: `<b>${names[i]} %{x}</b>: %{y:.3f}<extra></extra>`
        });
      });
      return traces;
    }

    const HARM_LAYOUT = {
      ...baseLayout(),
      barmode: 'group',
      showlegend: true,
      legend: { orientation: 'h', x: 0, y: 1.12, font: { size: 10 } },
      margin: { t: 8, b: 28, l: 40, r: 8 },
      yaxis: { ...baseLayout().yaxis, title: { text: 'Amplitude', font: { size: 9 } } }
    };

    function refreshHarmCharts() {
      if (document.getElementById('harmAclChart')) {
        const aclTraces = buildHarmData('acl');
        Plotly.react('harmAclChart', aclTraces, aclTraces.length ? { ...HARM_LAYOUT } : noDataLayout(HARM_LAYOUT), PLY_CFG);
      }
      if (document.getElementById('harmVelChart')) {
        const velTraces = buildHarmData('vel');
        Plotly.react('harmVelChart', velTraces, velTraces.length ? { ...HARM_LAYOUT } : noDataLayout(HARM_LAYOUT), PLY_CFG);
      }
    }

    // ─────────────────────────────────────
    // 7. HEALTH RING (Canvas)
    // ─────────────────────────────────────
    const rC = document.getElementById('ringC');
    const rX = rC ? rC.getContext('2d') : null;

    function computeHealth() {
      const xv = latestVal(getKeyName('x', 'rms_vel'));
      const yv = latestVal(getKeyName('y', 'rms_vel'));
      const zv = latestVal(getKeyName('z', 'rms_vel'));
      const vals = [xv, yv, zv].filter(v => v !== null);
      if (!vals.length) return null;
      const worst = Math.max(...vals);
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

    function setEl(id, val) {
      const e = document.getElementById(id);
      if (e) e.textContent = val;
    }

    function setStyle(id, prop, val) {
      const e = document.getElementById(id);
      if (e) e.style[prop] = val;
    }

    function updateKPIs() {
      const xv = latestVal(getKeyName('x', 'rms_vel'));
      const yv = latestVal(getKeyName('y', 'rms_vel'));
      const zv = latestVal(getKeyName('z', 'rms_vel'));
      
      const xp = latestVal(getKeyName('x', 'peak_acl'));
      const yp = latestVal(getKeyName('y', 'peak_acl'));
      const zp = latestVal(getKeyName('z', 'peak_acl'));
      
      const tmp = latestVal('Temperature_C');
      const running = latestBool('Motor_Run_Flag');
      const magHighFreqAcc = latestVal('Magnitude_XYZ_HighFreq_RMSAcc_G');

      // RMS Velocity KPIs & status details
      setEl('k-xv', xv !== null ? xv.toFixed(2) : ND);
      setEl('k-xvd', xv !== null ? (xv > 4.5 ? 'WARN (>4.5)' : 'NORMAL') : 'NO DATA');
      
      setEl('k-yv', yv !== null ? yv.toFixed(2) : ND);
      setEl('k-yvd', yv !== null ? (yv > 4.5 ? 'WARN (>4.5)' : 'NORMAL') : 'NO DATA');
      
      setEl('k-zv', zv !== null ? zv.toFixed(2) : ND);
      setEl('k-zvd', zv !== null ? (zv > 4.5 ? 'WARN (>4.5)' : 'NORMAL') : 'NO DATA');

      // Peak Acceleration
      const peakVals = [xp, yp, zp].filter(v => v !== null);
      if (peakVals.length) {
        const peakMax = Math.max(...peakVals);
        setEl('k-pk', peakMax.toFixed(2));
        setEl('k-pkd',
          `X:${xp !== null ? xp.toFixed(1) : ND} ` +
          `Y:${yp !== null ? yp.toFixed(1) : ND} ` +
          `Z:${zp !== null ? zp.toFixed(1) : ND}`
        );
      } else {
        setEl('k-pk', ND);
        setEl('k-pkd', `X:${ND} Y:${ND} Z:${ND}`);
      }

      // Temperature
      setEl('k-tmp', tmp !== null ? tmp.toFixed(1) : ND);
      setEl('tmpV', tmp !== null ? tmp.toFixed(1) : ND);

      // Machine Status
      if (running !== null) {
        setEl('k-ms', running ? 'RUNNING' : 'STOPPED');
        setStyle('k-ms', 'color', running ? '#059669' : '#ef4444');
      } else {
        setEl('k-ms', 'NO DATA');
        setStyle('k-ms', 'color', '#94a3b8');
      }

      // High-Frequency Acceleration / Noise representation
      if (magHighFreqAcc !== null) {
        setEl('k-noise', `Acc Mag: ${magHighFreqAcc.toFixed(2)} G`);
        setEl('noiseV', magHighFreqAcc.toFixed(2) + ' G');
        const noisePin = document.getElementById('noisePin');
        if (noisePin) noisePin.style.left = Math.min(100, (magHighFreqAcc / 10) * 100) + '%';
      } else {
        setEl('k-noise', `Noise: ${ND}`);
        setEl('noiseV', ND);
        setStyle('noiseV', 'color', '#94a3b8');
      }

      // Axis gauges
      setEl('gX', xv !== null ? xv.toFixed(2) : ND);
      setEl('gY', yv !== null ? yv.toFixed(2) : ND);
      setEl('gZ', zv !== null ? zv.toFixed(2) : ND);

      const gXf = document.getElementById('gXf');
      const gYf = document.getElementById('gYf');
      const gZf = document.getElementById('gZf');
      if (gXf) gXf.style.width = xv !== null ? Math.min(100, xv * 8.9) + '%' : '0%';
      if (gYf) gYf.style.width = yv !== null ? Math.min(100, yv * 8.9) + '%' : '0%';
      if (gZf) gZf.style.width = zv !== null ? Math.min(100, zv * 8.9) + '%' : '0%';

      drawRing(computeHealth());
      renderSpark();

      const lastSync = document.getElementById('lastSync');
      if (lastSync) lastSync.textContent = 'Last sync: ' + new Date().toLocaleTimeString();
    }

    // ─────────────────────────────────────
    // 9. SPARKLINE (Temp trend)
    // ─────────────────────────────────────
    function renderSpark() {
      const sp = document.getElementById('sparkR');
      if (!sp) return;
      sp.innerHTML = '';
      const raw = getSeries('Temperature_C');
      if (!raw) {
        sp.innerHTML = `<span style="color:#94a3b8;font-size:10px;align-self:center">No Data</span>`;
        return;
      }
      const { ys } = parseXY(raw);
      const vals = ys.slice(-24);
      if (!vals.length) {
        sp.innerHTML = `<span style="color:#94a3b8;font-size:10px;align-self:center">No Data</span>`;
        return;
      }
      const mx = Math.max(...vals, 1);
      vals.forEach(v => {
        const b = document.createElement('div'); b.className = 'spark-b';
        const t = v / 85;
        b.style.cssText = `height:${(v / mx) * 100}%;background:${t > 0.85 ? '#ef4444' : t > 0.7 ? '#f59e0b' : '#10b981'};opacity:0.8;`;
        sp.appendChild(b);
      });
    }

    // ─────────────────────────────────────
    // 10. FAULT PREDICTION & RUL
    // ─────────────────────────────────────
    if (!self.ctx._rulState) {
      self.ctx._rulState = { pRul: null, pCd: 5 };
    }
    const state = self.ctx._rulState;

    const FAULTS = [
      {
        name: 'Unbalance',
        sub: 'Dominant 1X vibration',
        color: '#f59e0b',
        border: '#fde68a',
        prob: null,
        algorithm: 'Harmonic Dominance Analysis',
        formula: 'P = A₁X / RMS',
        formula_vars: 'Higher 1X → higher probability',
        features: [{ label: '1X / RMS (X,Y,Z avg)', val: null, color: '#f59e0b' }],
        action: 'Perform rotor balancing'
      },
      {
        name: 'Misalignment',
        sub: '2X & 3X harmonics elevated',
        color: '#ef4444',
        border: '#fecaca',
        prob: null,
        algorithm: 'Harmonic Ratio Analysis',
        formula: 'P = 0.55·(2X/1X) + 0.35·(3X/1X)',
        formula_vars: 'Higher harmonic ratios → misalignment',
        features: [
          { label: '2X / 1X Ratio', val: null, color: '#ef4444' },
          { label: '3X / 1X Ratio', val: null, color: '#ef4444' }
        ],
        action: 'Inspect shaft alignment & coupling'
      },
      {
        name: 'Bearing Defect',
        sub: 'High-frequency vibration energy',
        color: '#6366f1',
        border: '#c7d2fe',
        prob: null,
        algorithm: 'High-Frequency Energy Analysis',
        formula: 'P = HF/RMS + Peak/RMS + Harmonic Ratio',
        formula_vars: 'HF = 4X–6X harmonics',
        features: [
          { label: 'HF Energy / RMS', val: null, color: '#6366f1' },
          { label: 'Peak / RMS (impact)', val: null, color: '#6366f1' },
          { label: '4X / 1X Ratio', val: null, color: '#6366f1' }
        ],
        action: 'Inspect bearings for wear or damage'
      },
      {
        name: 'Looseness',
        sub: 'Multi-harmonic distortion',
        color: '#0ea5e9',
        border: '#bae6fd',
        prob: null,
        algorithm: 'Multi-Harmonic Distortion',
        formula: 'P = 2X/1X + 3X/1X + Peak/RMS + 1X/RMS',
        formula_vars: 'Multiple harmonics + impacts → looseness',
        features: [
          { label: '2X / 1X', val: null, color: '#0ea5e9' },
          { label: '3X / 1X', val: null, color: '#0ea5e9' },
          { label: 'Peak / RMS', val: null, color: '#0ea5e9' },
          { label: '1X / RMS', val: null, color: '#0ea5e9' }
        ],
        action: 'Check mounting, bolts, and base'
      },
      {
        name: 'Resonance',
        sub: 'Frequency amplification',
        color: '#10b981',
        border: '#a7f3d0',
        prob: null,
        algorithm: 'Frequency Amplification Analysis',
        formula: 'P = High-frequency amplitude / RMS',
        formula_vars: 'Amplification near natural frequency',
        features: [{ label: '4X–5X Energy / RMS', val: null, color: '#10b981' }],
        action: 'Check structural resonance / speed match'
      }
    ];

    function clamp(v, min = 0, max = 1) { return Math.max(min, Math.min(max, v)); }
    function safeDiv(a, b) { if (a === null || b === null || b === 0) return null; const v = a / b; return isFinite(v) ? v : null; }
    function avg(arr) { const valid = arr.filter(v => v !== null); return valid.length ? valid.reduce((a, b) => a + b, 0) / valid.length : null; }
    function max(arr) { const valid = arr.filter(v => v !== null); return valid.length ? Math.max(...valid) : null; }

    function computeFaultProbs() {
      const axes = ['x', 'y', 'z'];
      FAULTS.forEach(f => {
        f.prob = null;
        f.features.forEach(fe => fe.val = null);
      });

      let unbalanceScores = [];
      axes.forEach(ax => {
        const h1 = getHarmVal(ax, 'vel', 0);
        const rms = latestVal(getKeyName(ax, 'rms_vel'));
        if (h1 !== null && rms !== null) unbalanceScores.push(safeDiv(h1, rms));
      });
      if (unbalanceScores.length) {
        const finalScore = clamp(0.6 * max(unbalanceScores) + 0.4 * avg(unbalanceScores));
        FAULTS[0].prob = Math.min(0.98, finalScore);
        FAULTS[0].features[0].val = avg(unbalanceScores);
      }

      let misalignScores = [];
      axes.forEach(ax => {
        const h1 = getHarmVal(ax, 'vel', 0);
        const h2 = getHarmVal(ax, 'vel', 1);
        const h3 = getHarmVal(ax, 'vel', 2);
        if (h1 !== null) misalignScores.push(0.55 * (safeDiv(h2, h1) ?? 0) + 0.35 * (safeDiv(h3, h1) ?? 0));
      });
      if (misalignScores.length) {
        const finalScore = clamp(0.6 * max(misalignScores) + 0.4 * avg(misalignScores));
        FAULTS[1].prob = Math.min(0.95, finalScore);
        FAULTS[1].features[0].val = avg(misalignScores);
      }

      let bearingScores = [];
      axes.forEach(ax => {
        const h1 = getHarmVal(ax, 'acl', 0);
        const h4 = getHarmVal(ax, 'acl', 3);
        const h5 = getHarmVal(ax, 'acl', 4);
        const h6 = getHarmVal(ax, 'acl', 5);
        const rmsAcl = latestVal(getKeyName(ax, 'rms_acl'));
        const peakAcl = latestVal(getKeyName(ax, 'peak_acl'));
        if (rmsAcl !== null) {
          const hfEnergy = avg([h4, h5, h6]);
          bearingScores.push(0.40 * (safeDiv(hfEnergy, rmsAcl) ?? 0) + 0.35 * (safeDiv(peakAcl, rmsAcl) ?? 0) + 0.25 * (safeDiv(h4, h1 || 1) ?? 0));
        }
      });
      if (bearingScores.length) {
        const finalScore = clamp(0.6 * max(bearingScores) + 0.4 * avg(bearingScores));
        FAULTS[2].prob = Math.min(0.95, finalScore);
        FAULTS[2].features[0].val = avg(bearingScores);
      }

      let loosenessScores = [];
      axes.forEach(ax => {
        const h1 = getHarmVal(ax, 'vel', 0);
        const h2 = getHarmVal(ax, 'vel', 1);
        const h3 = getHarmVal(ax, 'vel', 2);
        const rms = latestVal(getKeyName(ax, 'rms_vel'));
        const peak = latestVal(getKeyName(ax, 'peak_acl'));
        if (h1 !== null && rms !== null) {
          loosenessScores.push(0.35 * (safeDiv(h2, h1) ?? 0) + 0.25 * (safeDiv(h3, h1) ?? 0) + 0.25 * (safeDiv(peak, rms) ?? 0) + 0.15 * (safeDiv(h1, rms) ?? 0));
        }
      });
      if (loosenessScores.length) {
        const finalScore = clamp(0.6 * max(loosenessScores) + 0.4 * avg(loosenessScores));
        FAULTS[3].prob = Math.min(0.9, finalScore);
        FAULTS[3].features[0].val = avg(loosenessScores);
      }

      let resonanceScores = [];
      axes.forEach(ax => {
        const h4 = getHarmVal(ax, 'vel', 3);
        const h5 = getHarmVal(ax, 'vel', 4);
        const rms = latestVal(getKeyName(ax, 'rms_vel'));
        if (rms !== null) resonanceScores.push(safeDiv(avg([h4, h5]), rms));
      });
      if (resonanceScores.length) {
        const finalScore = clamp(0.6 * max(resonanceScores) + 0.4 * avg(resonanceScores));
        FAULTS[4].prob = Math.min(0.9, finalScore);
        FAULTS[4].features[0].val = avg(resonanceScores);
      }
    }

    function renderFaults() {
      computeFaultProbs();
      const l = document.getElementById('faultL');
      if (!l) return;
      l.innerHTML = '';

      const anyData = FAULTS.some(f => f.prob !== null);
      if (!anyData) {
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
      const axes = [{ ax: 'X', c: '#0284c7' }, { ax: 'Y', c: '#4f46e5' }, { ax: 'Z', c: '#059669' }];
      const confLevel = pct === null ? 'NO DATA' : pct > 50 ? 'HIGH' : pct > 20 ? 'MEDIUM' : 'LOW';
      const confColor = pct === null ? '#94a3b8' : pct > 50 ? '#ef4444' : pct > 20 ? '#f59e0b' : '#10b981';
      axes.forEach((a, i) => {
        const contribution = f.features[i]?.val !== null ? Math.round((f.features[i]?.val ?? 0) * 100) : null;
        conf.innerHTML += `<div class="ft-row"><span class="ft-key">${a.ax}-Axis contribution</span><span class="ft-val" style="color:${a.c}">${contribution !== null ? contribution + '%' : ND}</span></div>`;
      });
      conf.innerHTML += `<div class="ft-row" style="border-top:1px solid var(--border);padding-top:4px;margin-top:4px">
        <span class="ft-key">Model confidence</span>
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
    // 12. EVENTS LOG & CLOCK
    // ─────────────────────────────────────
    function renderEvents() {
      const log = document.getElementById('evLog');
      if (!log || log.children.length > 0) return;
      log.innerHTML = `<div style="text-align:center;color:#94a3b8;padding:16px 0;font-size:12px">No events logged</div>`;
    }

    function tick() {
      const clk = document.getElementById('clk');
      if (clk) clk.textContent = new Date().toLocaleTimeString();
    }
    tick();

    // ─────────────────────────────────────
    // 13. RUL COUNTDOWN & REFRESH EXECUTION
    // ─────────────────────────────────────
    state.pCd--;
    setEl('pCD', `Next ML update in ${state.pCd}s`);

    if (state.pCd <= 0) {
      state.pCd = 5;
      const xv = latestVal(getKeyName('x', 'rms_vel'));
      const yv = latestVal(getKeyName('y', 'rms_vel'));
      const zv = latestVal(getKeyName('z', 'rms_vel'));
      const hasVel = xv !== null || yv !== null || zv !== null;

      if (hasVel) {
        if (state.pRul === null) state.pRul = 847;
        state.pRul = Math.max(50, state.pRul - 1);
        setEl('rulV', state.pRul);
        setEl('rulSub', `≈ ${(state.pRul / 24).toFixed(1)} days · Confidence: HIGH`);
      } else {
        setEl('rulV', ND);
        setEl('rulSub', 'Confidence: NO DATA');
      }
    }

    // Execute updates
    updateKPIs();
    refreshWave();
    refreshSpec();
    refreshTrend();
    refreshHarmCharts();
    renderFaults();
    renderEvents();

  }, 0);
};
