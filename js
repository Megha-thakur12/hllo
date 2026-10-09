<header>
    <div class="header-inner">
        <div class="hdr-left">
            <div style="font-size:15px;font-weight:700;color:var(--text2)">Process Aro Pump · Vibration Monitor</div>
        </div>
        <div class="hdr-right">
            <div class="pill pill-g" id="machinePill">
                <div class="dot dot-g"></div><span id="machineLabel">SENSOR ONLINE</span>
            </div>
            <div class="clk" id="clk">--:--:--</div>
        </div>
    </div>
</header>

<main>

    <!-- KPI ROW -->
    <div class="sec">KEY PERFORMANCE INDICATORS</div>
    <div class="kpi-row">
        <div class="kpi" style="--ka:#0ea5e9;animation-delay:.04s">
            <div class="kpi-lbl">X — RMS Velocity</div>
            <div class="kpi-val" style="color:#0284c7" id="k-xv">—</div>
            <div class="kpi-unit">mm/s RMS</div>
            <div class="kpi-d st" id="k-xvd">loading…</div>
        </div>
        <div class="kpi" style="--ka:#6366f1;animation-delay:.08s">
            <div class="kpi-lbl">Y — RMS Velocity</div>
            <div class="kpi-val" style="color:#4f46e5" id="k-yv">—</div>
            <div class="kpi-unit">mm/s RMS</div>
            <div class="kpi-d st" id="k-yvd">loading…</div>
        </div>
        <div class="kpi" style="--ka:#10b981;animation-delay:.12s">
            <div class="kpi-lbl">Z — RMS Velocity</div>
            <div class="kpi-val" style="color:#059669" id="k-zv">—</div>
            <div class="kpi-unit">mm/s RMS</div>
            <div class="kpi-d st" id="k-zvd">loading…</div>
        </div>
        <div class="kpi" style="--ka:#f59e0b;animation-delay:.16s">
            <div class="kpi-lbl">Peak Acceleration (HF)</div>
            <div class="kpi-val" style="color:#d97706" id="k-pk">—</div>
            <div class="kpi-unit">G PEAK</div>
            <div class="kpi-d st" id="k-pkd">X / Y / Z</div>
        </div>
        <div class="kpi" style="--ka:#ec4899;animation-delay:.20s">
            <div class="kpi-lbl">Temperature</div>
            <div class="kpi-val" style="color:#db2777" id="k-tmp">—</div>
            <div class="kpi-unit">°C INTERNAL</div>
            <div class="kpi-d st">WARN: 85°C | CRIT: 100°C</div>
        </div>
        <div class="kpi" style="--ka:#10b981;animation-delay:.24s">
            <div class="kpi-lbl">Machine Status</div>
            <div class="kpi-val" style="color:#94a3b8;font-size:15px;padding-top:5px" id="k-ms">NO DATA</div>
            <div class="kpi-unit" id="k-noise">Acc Mag: — G</div>
            <div class="kpi-d st">Motor_Run_Flag</div>
        </div>
    </div>

    <!-- WAVEFORM + LEVELS + PREDICTION -->
    <div class="sec">VIBRATION HISTORY &amp; ACCELERATION LEVELS</div>
    <div class="g-main">

        <!-- Velocity history (Plotly) -->
        <div class="card">
            <div class="card-t">Velocity Trend <span class="badge b-live">LIVE</span></div>
            <div class="card-s">RMS velocity · last 60 samples (5 h at 5-min interval) · selected axis</div>
            <div class="atabs" id="wtabs">
                <button class="atab ax" onclick="setWAxis('x',this)">X-AXIS</button>
                <button class="atab" onclick="setWAxis('y',this)">Y-AXIS</button>
            </div>
            <div id="waveChart" style="height:160px;"></div>
        </div>

        <!-- Acceleration levels (Plotly bar) -->
        <div class="card">
            <div class="card-t">Acceleration Levels <span class="badge b-ok">G</span></div>
            <div class="card-s">Full-band RMS · high-freq RMS · high-freq peak · selected axis · hover for peak frequency</div>
            <div class="atabs" id="stabs">
                <button class="atab ax" onclick="setSAxis('x',this)">X-AXIS</button>
                <button class="atab" onclick="setSAxis('y',this)">Y-AXIS</button>
            </div>
            <div id="specChart" style="height:160px;"></div>
        </div>

        <!-- Fault indicators -->
        <div class="pred-card">
            <div class="card-t">Fault Indicators <span class="badge b-ml">HEURISTIC</span></div>
            <div class="card-s">Hover each indicator for calculation breakdown</div>
            <div class="rul-box">
                <div class="rul-val" id="rulV">—</div>
                <div class="rul-lbl">HOURS REMAINING USEFUL LIFE (ESTIMATE)</div>
                <div class="rul-sub" id="rulSub">Estimate only</div>
            </div>
            <div class="fault-list" id="faultL"></div>
            <div class="pred-info" id="pCD">Waiting for data…</div>
        </div>

    </div>

    <!-- HEALTH + TEMP + EVENTS -->
    <div class="sec">DIAGNOSTICS</div>
    <div class="g-bot">

        <!-- Health ring + gauges -->
        <div class="card">
            <div class="card-t">Machine Health Score <span class="badge b-warn">WATCH</span></div>
            <div class="card-s">Overall vibration severity · ISO 10816 style · from worst-axis RMS velocity</div>
            <div class="ring-wrap">
                <div class="ring-rel">
                    <canvas id="ringC" width="130" height="130"></canvas>
                    <div class="ring-inner">
                        <div class="ring-score" id="hScore">—</div>
                        <div class="ring-txt">HEALTH %</div>
                    </div>
                </div>
                <div class="gauge-row">
                    <div class="g-item">
                        <div class="g-val" style="color:#0284c7" id="gX">—</div>
                        <div class="g-track"><div class="g-fill" id="gXf" style="width:0%;background:#0ea5e9"></div></div>
                        <div class="g-lbl">X mm/s</div>
                    </div>
                    <div class="g-item">
                        <div class="g-val" style="color:#4f46e5" id="gY">—</div>
                        <div class="g-track"><div class="g-fill" id="gYf" style="width:0%;background:#6366f1"></div></div>
                        <div class="g-lbl">Y mm/s</div>
                    </div>
                    <div class="g-item">
                        <div class="g-val" style="color:#059669" id="gZ">—</div>
                        <div class="g-track"><div class="g-fill" id="gZf" style="width:0%;background:#10b981"></div></div>
                        <div class="g-lbl">Z mm/s</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Temp & vibration magnitude -->
        <div class="card">
            <div class="card-t">Temperature &amp; Vibration Magnitude</div>
            <div class="card-s">Temperature_C &amp; Magnitude_XYZ_HighFreq_RMSAcc_G · latest values</div>
            <div style="display:flex;align-items:baseline;gap:6px;margin:6px 0 2px">
                <div class="temp-big" id="tmpV">—</div>
                <div style="font-size:18px;color:var(--muted)">°C</div>
            </div>
            <div style="font-size:9px;color:var(--muted2);font-family:'Space Mono',monospace;margin-bottom:14px">
                WARN: 85°C &nbsp;|&nbsp; CRITICAL: 100°C
            </div>
            <div style="font-size:10px;font-weight:700;margin-bottom:6px;color:var(--text2)">
                HIGH-FREQ ACCELERATION MAGNITUDE</div>
            <div style="font-size:26px;font-weight:700;color:#059669;margin-bottom:6px" id="noiseV">— G</div>
            <div class="noise-bar">
                <div class="noise-pin" id="noisePin" style="left:0%"></div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:8px;color:var(--muted);font-family:'Space Mono',monospace">
                <span>0 G</span><span>1 G</span><span>2 G</span>
            </div>
            <div style="font-size:10px;font-weight:700;margin-top:14px;margin-bottom:5px;color:var(--text2)">
                TEMP TREND (LAST 2 H)</div>
            <div class="spark-row" id="sparkR"></div>
        </div>

        <!-- Events -->
        <div class="card">
            <div class="card-t">System Events</div>
            <div class="card-s">Event log</div>
            <div style="font-size:10px;font-weight:700;margin-bottom:6px;color:var(--text2)">
                RECENT EVENTS</div>
            <div class="ev-log" id="evLog"></div>
        </div>

    </div>

    <!-- TREND (Plotly) -->
    <div class="sec">RMS VELOCITY TREND</div>
    <div class="card" style="margin-bottom:24px;">
        <div class="card-t">
            RMS Velocity — All Axes (Xaxis / Yaxis _RMSVel_mm_sec)
            <div style="display:flex;gap:14px;font-size:10px;font-family:'Space Mono',monospace;">
                <span style="color:#0284c7">— X</span>
                <span style="color:#4f46e5">— Y</span>
            </div>
        </div>
        <div class="card-s">Stored history from telemetry (5-min samples) · hover for exact values</div>
        <div id="trendChart" style="height:220px;"></div>
    </div>

    <!-- DETAIL CHARTS (Plotly) -->
    <div class="sec">WAVEFORM SHAPE STATISTICS</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:24px;">
        <div class="card">
            <div class="card-t">Crest Factor — Full-band vs High-freq</div>
            <div class="card-s">*_CrestFactor · latest snapshot · per axis</div>
            <div id="harmAclChart" style="height:200px;"></div>
        </div>
        <div class="card">
            <div class="card-t">Kurtosis — Full-band vs High-freq</div>
            <div class="card-s">*_Kurtosis · latest snapshot · per axis (above ~3 suggests impacts)</div>
            <div id="harmVelChart" style="height:200px;"></div>
        </div>
    </div>

</main>

<footer>
    <span>Predictive Vibration Monitoring</span>
    <span id="lastSync">Last data: —</span>
    <span>DEVICE: Process Aro Pump</span>
</footer>

<!-- Rich Fault Tooltip -->
<div class="ftip" id="faultTip">
    <div class="ft-head">
        <div class="ft-htitle" id="ft-title">—</div>
        <div class="ft-hsub" id="ft-sub">—</div>
    </div>
    <div class="ft-body">
        <div class="ft-sec">
            <div class="ft-sec-t">Detection Algorithm</div>
            <div class="ft-formula" id="ft-formula">—</div>
        </div>
        <div class="ft-sec">
            <div class="ft-sec-t">Feature Contributions</div>
            <div id="ft-features"></div>
        </div>
        <div class="ft-sec">
            <div class="ft-sec-t">Per-Axis Score</div>
            <div id="ft-confidence"></div>
        </div>
    </div>
    <div class="ft-foot" id="ft-foot">—</div>
</div>

<div class="stip" id="stip"></div>
