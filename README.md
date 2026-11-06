/* ================= TOKENS ================= */
#container, header, main, footer, .ftip, .stip {
    --bg: #eef3f8;
    --surface: #ffffff;
    --surface2: #f8fafc;
    --surface3: #f1f5f9;
    --border: #e2e8f0;
    --border2: #cbd5e1;
    --accent: #0ea5e9;
    --accent2: #6366f1;
    --accent3: #10b981;
    --warn: #f59e0b;
    --danger: #ef4444;
    --text: #0f172a;
    --text2: #334155;
    --muted: #94a3b8;
    --muted2: #64748b;
    --brand: #e31837;
    --sh: 0 1px 3px rgba(15,23,42,.06), 0 1px 2px rgba(15,23,42,.04);
    --sh-md: 0 8px 24px rgba(15,23,42,.10), 0 2px 6px rgba(15,23,42,.05);
    --sh-lg: 0 18px 40px rgba(15,23,42,.16), 0 6px 14px rgba(15,23,42,.08);
}

* { margin: 0; padding: 0; box-sizing: border-box; }

#container {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
}

#container::before {
    content: ''; position: fixed; inset: 0;
    background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px);
    background-size: 28px 28px; opacity: .14; pointer-events: none; z-index: 0;
}

/* ================= HEADER ================= */
header {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    border-bottom: 1px solid var(--border);
    position: sticky; top: 0; z-index: 200;
    box-shadow: 0 4px 16px rgba(15,23,42,.06);
}

header::after {
    content: ''; position: absolute; left: 0; right: 0; bottom: -1px; height: 3px;
    background: linear-gradient(90deg, var(--brand) 0%, #f43f5e 25%, var(--accent2) 60%, var(--accent) 100%);
}

.header-inner {
    display: flex; align-items: center; justify-content: space-between;
    gap: 16px; padding: 10px 28px; max-width: 1680px; margin: 0 auto;
}

.logo { display: flex; align-items: center; gap: 14px; min-width: 0; }

.logo-icon {
    display: flex; align-items: center; justify-content: center;
    font-size: 19px; flex-shrink: 0;
}

.logo-text {
    font-size: 22px; font-weight: 700; letter-spacing: 3px; line-height: 1.1;
    color: var(--text); white-space: nowrap;
}

.logo-sub {
    font-size: 9px; color: var(--muted2); letter-spacing: 2px; margin-top: 3px;
    font-family: 'Space Mono', monospace; font-weight: 700; text-transform: uppercase;
    white-space: nowrap;
}

.hdr-right { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; justify-content: flex-end; }

.pill {
    display: flex; align-items: center; gap: 7px; padding: 6px 13px;
    border-radius: 999px; border: 1.5px solid; font-size: 10px;
    font-family: 'Space Mono', monospace; font-weight: 700; letter-spacing: 1px;
    white-space: nowrap; transition: transform .2s;
}
.pill:hover { transform: translateY(-1px); }

.pill-g {
    border-color: #10b981; color: #047857;
    background: linear-gradient(180deg, #f0fdf4, #dcfce7);
    box-shadow: 0 2px 8px rgba(16,185,129,.15);
}

.pill-w {
    border-color: #f59e0b; color: #b45309;
    background: linear-gradient(180deg, #fffbeb, #fef3c7);
    box-shadow: 0 2px 8px rgba(245,158,11,.15);
}

.dot { width: 7px; height: 7px; border-radius: 50%; animation: blink 2s infinite; }
.dot-g { background: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,.22); }
.dot-w { background: #f59e0b; box-shadow: 0 0 0 3px rgba(245,158,11,.22); }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }

.clk {
    font-family: 'Space Mono', monospace; font-size: 11px; font-weight: 700;
    color: #fff; background: linear-gradient(135deg, #0f172a, #334155);
    padding: 6px 12px; border-radius: 8px; white-space: nowrap;
    box-shadow: 0 3px 10px rgba(15,23,42,.18);
}

/* ================= LAYOUT ================= */
main {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    color: var(--text);
    position: relative; z-index: 1;
    max-width: 1680px; margin: 0 auto; padding: 22px 28px;
}

.sec {
    font-size: 10px; letter-spacing: 3px; color: var(--text2); font-weight: 700;
    text-transform: uppercase; font-family: 'Space Mono', monospace;
    margin-bottom: 12px; display: flex; align-items: center; gap: 10px;
}
.sec::before {
    content: ''; width: 4px; height: 14px; border-radius: 2px; flex-shrink: 0;
    background: linear-gradient(180deg, var(--brand), var(--accent2));
}
.sec::after {
    content: ''; flex: 1; height: 1px;
    background: linear-gradient(90deg, var(--border2), transparent);
}

@keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

/* ================= KPI ================= */
.kpi-row { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 12px; margin-bottom: 22px; }

.kpi {
    background: var(--surface); border: 1.5px solid var(--border); border-radius: 14px;
    padding: 15px 16px; position: relative; overflow: hidden; min-width: 0;
    box-shadow: var(--sh); transition: all .25s; animation: fadeUp .45s ease both;
}
.kpi:hover { transform: translateY(-3px); box-shadow: var(--sh-md); border-color: var(--border2); }

.kpi::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: var(--ka, var(--accent)); border-radius: 14px 14px 0 0;
}
.kpi::after {
    content: ''; position: absolute; right: -30px; bottom: -30px; width: 95px; height: 95px;
    border-radius: 50%; background: var(--ka, var(--accent)); opacity: .07;
    pointer-events: none; transition: opacity .25s, transform .25s;
}
.kpi:hover::after { opacity: .12; transform: scale(1.1); }

.kpi-lbl {
    font-size: 9px; color: var(--muted2); letter-spacing: 1.5px; text-transform: uppercase;
    margin-bottom: 8px; font-family: 'Space Mono', monospace; font-weight: 700;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.kpi-val { font-size: 28px; font-weight: 700; line-height: 1; letter-spacing: -.5px; font-variant-numeric: tabular-nums; }
.kpi-unit { font-size: 9px; color: var(--muted); font-family: 'Space Mono', monospace; margin-top: 4px; }
.kpi-d {
    display: inline-block; font-size: 9px; font-family: 'Space Mono', monospace; font-weight: 700;
    margin-top: 8px; padding: 2px 7px; border-radius: 5px; background: var(--surface3);
}

.up { color: var(--danger); }
.dn { color: var(--accent3); }
.st { color: var(--muted2); }

/* ================= GRIDS (positions unchanged) ================= */
.g-main { display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr) 370px; gap: 14px; margin-bottom: 22px; }
.g-bot  { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 14px; margin-bottom: 22px; }

/* ================= CARD ================= */
.card {
    background: var(--surface); border: 1.5px solid var(--border); border-radius: 16px;
    padding: 18px; box-shadow: var(--sh); animation: fadeUp .5s ease both;
    position: relative; overflow: visible; min-width: 0;
    transition: box-shadow .25s, border-color .25s;
}
.card:hover { box-shadow: var(--sh-md); border-color: var(--border2); }

.card-t {
    font-size: 13px; font-weight: 700; letter-spacing: .3px; color: var(--text);
    display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap;
    margin-bottom: 3px;
}
.card-s { font-size: 9px; color: var(--muted); font-family: 'Space Mono', monospace; margin-bottom: 12px; line-height: 1.5; }

.badge {
    display: inline-flex; align-items: center; font-size: 9px; padding: 3px 9px; border-radius: 6px;
    font-family: 'Space Mono', monospace; letter-spacing: 1px; font-weight: 700; border: 1.5px solid;
    white-space: nowrap;
}
.b-ok   { background: #f0fdf4; color: #047857; border-color: #10b981; }
.b-warn { background: #fffbeb; color: #b45309; border-color: #f59e0b; }
.b-live { background: #fef2f2; color: #dc2626; border-color: #ef4444; }
.b-ml   { background: #eef2ff; color: #4338ca; border-color: #6366f1; }

.b-live::before {
    content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor;
    margin-right: 5px; animation: blink 1.2s infinite;
}

/* ================= AXIS TABS ================= */
.atabs { display: flex; gap: 6px; margin-bottom: 10px; flex-wrap: wrap; }

.atab {
    padding: 4px 12px; border-radius: 7px; font-size: 10px; font-weight: 700; cursor: pointer;
    border: 1.5px solid var(--border); color: var(--muted2); font-family: 'Space Mono', monospace;
    background: var(--surface3); transition: all .2s;
}
.atab:hover { border-color: var(--border2); color: var(--text2); background: #fff; }

.ax { background: #e0f2fe; border-color: #0ea5e9; color: #0369a1; box-shadow: 0 2px 8px rgba(14,165,233,.2); }
.ay { background: #eef2ff; border-color: #6366f1; color: #4338ca; box-shadow: 0 2px 8px rgba(99,102,241,.2); }
.az { background: #d1fae5; border-color: #10b981; color: #047857; box-shadow: 0 2px 8px rgba(16,185,129,.2); }

/* ================= PLOTLY ================= */
.plotly-chart { width: 100%; border-radius: 8px; overflow: hidden; }
#waveChart, #specChart, #trendChart, #harmAclChart, #harmVelChart { width: 100%; }

/* ================= PREDICTION ================= */
.pred-card {
    background: linear-gradient(160deg, #ffffff 0%, #f7f5ff 55%, #f1edff 100%);
    border: 1.5px solid #ddd6fe; border-radius: 16px; padding: 18px;
    box-shadow: 0 8px 24px rgba(99,102,241,.10);
    animation: fadeUp .5s ease both; position: relative; overflow: visible; min-width: 0;
}
.pred-card::before {
    content: ''; position: absolute; top: 0; left: 18px; right: 18px; height: 3px;
    border-radius: 0 0 3px 3px; background: linear-gradient(90deg, var(--accent2), var(--accent));
}

.rul-box {
    text-align: center; padding: 14px 12px;
    background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%);
    border-radius: 12px; border: 1.5px solid #fde68a; margin-bottom: 12px;
    box-shadow: 0 4px 14px rgba(245,158,11,.14);
}
.rul-val { font-size: 34px; font-weight: 700; color: #b45309; line-height: 1; font-variant-numeric: tabular-nums; }
.rul-lbl { font-size: 8px; color: var(--muted2); font-family: 'Space Mono', monospace; font-weight: 700; letter-spacing: 2px; margin-top: 5px; }
.rul-sub { font-size: 9px; color: var(--muted2); font-family: 'Space Mono', monospace; margin-top: 3px; }

.fault-list { display: flex; flex-direction: column; gap: 7px; }

.fault-item {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    padding: 10px 12px; border-radius: 10px; border: 1.5px solid var(--border);
    background: var(--surface); cursor: pointer; transition: all .22s; position: relative;
}
.fault-item:hover {
    border-color: #a5b4fc !important; background: #f5f3ff;
    box-shadow: 0 4px 12px rgba(99,102,241,.15); transform: translateX(3px);
}
.fault-name { font-size: 11.5px; font-weight: 700; }
.fault-sub { font-size: 8px; color: var(--muted); font-family: 'Space Mono', monospace; margin-top: 2px; }

.prob-wrap { display: flex; align-items: center; gap: 7px; flex-shrink: 0; }
.prob-track { width: 58px; height: 6px; background: var(--border); border-radius: 999px; overflow: hidden; }
.prob-fill { height: 100%; border-radius: 999px; transition: width 1s ease; }
.prob-pct { font-size: 11px; font-family: 'Space Mono', monospace; font-weight: 700; min-width: 30px; text-align: right; }

.pred-info { font-size: 9px; font-family: 'Space Mono', monospace; color: var(--accent2); text-align: center; margin-top: 10px; font-weight: 700; }

/* ================= RICH FAULT TOOLTIP ================= */
.ftip {
    position: fixed; z-index: 9999; background: var(--surface); border: 1.5px solid #c7d2fe;
    border-radius: 14px; width: 310px; max-width: calc(100vw - 20px);
    box-shadow: var(--sh-lg); opacity: 0; pointer-events: none;
    transition: opacity .18s, transform .18s; transform: translateY(4px);
    font-family: 'DM Sans', 'Segoe UI', sans-serif; color: var(--text);
}
.ftip.vis { opacity: 1; transform: translateY(0); pointer-events: auto; }

.ft-head { padding: 12px 14px 10px; border-bottom: 1px solid var(--border); background: linear-gradient(90deg, #eef2ff, #f5f3ff); border-radius: 12px 12px 0 0; }
.ft-htitle { font-size: 13px; font-weight: 700; }
.ft-hsub { font-size: 9px; color: var(--muted); font-family: 'Space Mono', monospace; margin-top: 2px; }
.ft-body { padding: 12px 14px; }
.ft-sec { margin-bottom: 10px; }
.ft-sec:last-child { margin-bottom: 0; }
.ft-sec-t { font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--muted2); font-family: 'Space Mono', monospace; margin-bottom: 5px; }
.ft-row { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 4px; font-size: 10px; }
.ft-key { color: var(--muted2); }
.ft-val { font-family: 'Space Mono', monospace; font-weight: 700; font-size: 10px; }
.ft-formula {
    background: var(--surface3); border-radius: 7px; padding: 8px 10px;
    font-family: 'Space Mono', monospace; font-size: 9px; color: var(--text2); line-height: 1.7;
    border: 1px solid var(--border); border-left: 3px solid var(--accent2); margin-top: 4px;
    word-break: break-word;
}
.ft-brow { margin-bottom: 5px; }
.ft-blbl { display: flex; justify-content: space-between; font-size: 9px; color: var(--muted2); margin-bottom: 2px; font-family: 'Space Mono', monospace; }
.ft-btrack { height: 6px; background: var(--border); border-radius: 999px; overflow: hidden; }
.ft-bfill { height: 100%; border-radius: 999px; transition: width .5s ease; }
.ft-foot { padding: 8px 14px; border-top: 1px solid var(--border); background: var(--surface3); border-radius: 0 0 12px 12px; font-size: 9px; color: var(--muted2); font-family: 'Space Mono', monospace; }

/* ================= HEALTH RING ================= */
.ring-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 6px 0; }
.ring-rel { position: relative; width: 130px; height: 130px; filter: drop-shadow(0 6px 14px rgba(15,23,42,.08)); }
.ring-inner { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.ring-score { font-size: 32px; font-weight: 700; line-height: 1; font-variant-numeric: tabular-nums; }
.ring-txt { font-size: 8px; color: var(--muted2); font-family: 'Space Mono', monospace; font-weight: 700; letter-spacing: 1px; margin-top: 3px; }

.gauge-row { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 8px; width: 100%; }
.g-item { text-align: center; padding: 8px 6px; background: var(--surface2); border: 1px solid var(--border); border-radius: 10px; }
.g-val { font-size: 14px; font-weight: 700; font-variant-numeric: tabular-nums; }
.g-track { height: 5px; background: var(--border); border-radius: 999px; margin: 4px 0; overflow: hidden; }
.g-fill { height: 100%; border-radius: 999px; transition: width 1.2s ease; }
.g-lbl { font-size: 8px; color: var(--muted2); font-family: 'Space Mono', monospace; }

/* ================= TEMP & NOISE ================= */
.temp-big { font-size: 46px; font-weight: 700; line-height: 1; letter-spacing: -1px; font-variant-numeric: tabular-nums; }

.noise-bar {
    height: 8px; border-radius: 999px; margin: 6px 0; position: relative;
    background: linear-gradient(90deg, #10b981, #84cc16 30%, #f59e0b 60%, #ef4444);
    box-shadow: inset 0 1px 2px rgba(15,23,42,.12);
}
.noise-pin {
    position: absolute; top: -5px; width: 18px; height: 18px; border-radius: 50%;
    background: #fff; border: 3px solid var(--text); transform: translateX(-50%);
    transition: left 1s ease; box-shadow: 0 3px 8px rgba(15,23,42,.22);
}

.spark-row { display: flex; align-items: flex-end; gap: 2px; height: 32px; margin-top: 4px; }
.spark-b { flex: 1; min-width: 2px; border-radius: 2px 2px 0 0; }

/* ================= EVENTS ================= */
.conn-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
.conn-item {
    display: flex; align-items: center; justify-content: space-between; gap: 10px;
    padding: 8px 11px; background: var(--surface2); border-radius: 9px; font-size: 11px;
    border: 1px solid var(--border); transition: border-color .2s, background .2s;
}
.conn-item:hover { border-color: var(--border2); background: #fff; }
.conn-name { font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; color: var(--muted2); letter-spacing: .5px; }

.ev-log { display: flex; flex-direction: column; gap: 5px; max-height: 150px; overflow-y: auto; }
.ev-log::-webkit-scrollbar { width: 3px; }
.ev-log::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

.ev-item {
    display: flex; align-items: flex-start; gap: 8px; padding: 6px 9px; border-radius: 7px;
    background: var(--surface2); border: 1px solid var(--border); border-left-width: 3px; font-size: 10px;
    line-height: 1.45;
}
.ev-time { font-family: 'Space Mono', monospace; font-size: 9px; color: var(--muted); white-space: nowrap; }

/* ================= FOOTER ================= */
footer {
    position: relative; z-index: 1;
    border-top: 1px solid var(--border); padding: 12px 28px;
    display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;
    font-size: 9px; color: var(--muted2); font-family: 'Space Mono', monospace;
    max-width: 1680px; margin: 0 auto; background: var(--surface);
}

/* simple spec tip */
.stip {
    position: fixed; background: #0f172a; border-radius: 8px; padding: 6px 10px;
    font-size: 9px; font-family: 'Space Mono', monospace; pointer-events: none;
    opacity: 0; transition: opacity .15s; z-index: 8000; white-space: nowrap;
    box-shadow: var(--sh-md); color: #f1f5f9;
}

canvas { display: block; }

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: #eef3f8; }
::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }

/* ================= LOGO (your rule) ================= */
img { width: 12vh !important; height: auto; }

/* ================= RESPONSIVE ================= */
@media (max-width: 1500px) {
    .header-inner, main, footer { padding-left: 22px; padding-right: 22px; }
    .kpi-val { font-size: 24px; }
    .card, .pred-card { padding: 16px; }
}

@media (max-width: 1200px) {
    .g-main { grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
    .kpi-row { grid-template-columns: repeat(3, minmax(0,1fr)); }
    .header-inner, main, footer { padding-left: 18px; padding-right: 18px; }
}

@media (max-width: 800px) {
    .g-main { grid-template-columns: 1fr; }
    .g-bot { grid-template-columns: 1fr; }
    .kpi-row { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 10px; }

    /* inline 2-column harmonic grid stacks on small screens */
    main > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }

    .header-inner { flex-wrap: wrap; padding: 10px 14px; gap: 10px; }
    .hdr-right { width: 100%; justify-content: flex-start; gap: 8px; }
    .clk { margin-left: auto; }
    .logo-text { font-size: 18px; letter-spacing: 2px; }

    main { padding: 16px 14px; }
    footer { padding: 10px 14px; flex-direction: column; align-items: flex-start; gap: 4px; }

    .card, .pred-card { padding: 14px; border-radius: 14px; }
    .kpi-val { font-size: 22px; }
    .temp-big { font-size: 38px; }
    .ev-log { max-height: 220px; }
}

@media (max-width: 480px) {
    img { width: 9vh !important; }
    .logo { gap: 10px; }
    .logo-text { font-size: 16px; }
    .logo-sub { font-size: 7.5px; letter-spacing: 1px; white-space: normal; }
    .pill { padding: 4px 9px; font-size: 9px; }
    .clk { font-size: 10px; padding: 5px 9px; }
    .kpi { padding: 12px; }
    .kpi-lbl { font-size: 8px; letter-spacing: 1px; }
    .ring-rel { transform: scale(.9); }
    .prob-track { width: 44px; }
    .fault-sub { white-space: normal; }
}
