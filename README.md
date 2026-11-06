/* =========================================================================
   SKH Metals Kharkhoda — Predictive Maintenance Dashboard
   Responsive stylesheet (desktop → tablet → mobile)
   Breakpoints: 1440 / 1200 / 992 / 768 / 576 / 380
   ========================================================================= */

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');

/* ---------- DESIGN TOKENS ---------- */
:root,
#container {
    --bg: #eef3f8;
    --surface: #ffffff;
    --surface2: #f8fafc;
    --surface3: #f1f5f9;
    --border: #e2e8f0;
    --border2: #cbd5e1;

    --brand-navy: #0b4f8c;
    --brand-blue: #3e8ed0;
    --brand-green: #10b981;

    --accent: #0ea5e9;
    --accent2: #6366f1;
    --accent3: #10b981;
    --warn: #f59e0b;
    --danger: #ef4444;

    --text: #0f172a;
    --text2: #334155;
    --muted: #94a3b8;
    --muted2: #64748b;

    --radius-sm: 8px;
    --radius: 14px;
    --radius-lg: 18px;

    --sh: 0 1px 3px rgba(15, 23, 42, .06), 0 1px 2px rgba(15, 23, 42, .04);
    --sh-md: 0 6px 18px rgba(15, 23, 42, .08), 0 2px 6px rgba(15, 23, 42, .05);
    --sh-lg: 0 16px 40px rgba(15, 23, 42, .14), 0 4px 12px rgba(15, 23, 42, .08);

    --pad-x: 28px;
    --gap: 14px;
    --mono: 'Space Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    --sans: 'DM Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
}

/* ---------- RESET ---------- */
#container *,
#container *::before,
#container *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#container {
    position: relative;
    font-family: var(--sans);
    background:
        radial-gradient(1200px 500px at 0% -10%, rgba(62, 142, 208, .10), transparent 60%),
        radial-gradient(900px 400px at 100% 0%, rgba(99, 102, 241, .08), transparent 60%),
        var(--bg);
    color: var(--text);
    min-height: 100vh;
    width: 100%;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
    font-variant-numeric: tabular-nums;
}

/* dotted grid texture (absolute so it stays inside the widget) */
#container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px);
    background-size: 28px 28px;
    opacity: .14;
    pointer-events: none;
    z-index: 0;
}

/* =========================================================================
   HEADER
   ========================================================================= */
header {
    position: sticky;
    top: 0;
    z-index: 200;
    background: rgba(255, 255, 255, .88);
    -webkit-backdrop-filter: saturate(160%) blur(10px);
    backdrop-filter: saturate(160%) blur(10px);
    border-bottom: 1px solid var(--border);
    box-shadow: var(--sh);
}

/* brand gradient strip */
header::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 3px;
    background: linear-gradient(90deg, var(--brand-navy), var(--brand-blue) 55%, var(--brand-green));
}

.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px var(--pad-x);
    max-width: 1680px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 0;
}

.logo-icon {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: var(--surface);
    border: 1px solid var(--border);
    box-shadow: var(--sh);
    padding: 4px;
}

.logo-icon img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.logo-text {
    font-size: 19px;
    font-weight: 700;
    letter-spacing: 1.5px;
    line-height: 1.15;
    background: linear-gradient(90deg, var(--brand-navy), var(--brand-blue));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.logo-sub {
    font-size: 9px;
    color: var(--muted2);
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: var(--mono);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.hdr-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1.5px solid;
    font-size: 10px;
    font-family: var(--mono);
    font-weight: 700;
    letter-spacing: 1px;
    white-space: nowrap;
}

.pill-g {
    border-color: #6ee7b7;
    color: #047857;
    background: #ecfdf5;
}

.pill-w {
    border-color: #fcd34d;
    color: #b45309;
    background: #fffbeb;
}

.dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    position: relative;
}

.dot::after {
    content: '';
    position: absolute;
    inset: -3px;
    border-radius: 50%;
    background: inherit;
    opacity: .35;
    animation: pulse 2s ease-out infinite;
}

.dot-g { background: #10b981; }
.dot-w { background: #f59e0b; }

@keyframes pulse {
    0%   { transform: scale(.6); opacity: .45; }
    100% { transform: scale(1.8); opacity: 0; }
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: .3; }
}

.clk {
    font-family: var(--mono);
    font-size: 11px;
    font-weight: 700;
    color: var(--brand-navy);
    background: var(--surface3);
    padding: 6px 12px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    white-space: nowrap;
}

/* =========================================================================
   LAYOUT
   ========================================================================= */
main {
    position: relative;
    z-index: 1;
    max-width: 1680px;
    margin: 0 auto;
    padding: 22px var(--pad-x) 8px;
}

.sec {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--muted2);
    text-transform: uppercase;
    font-family: var(--mono);
    margin: 4px 0 12px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.sec::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 2px;
    background: linear-gradient(135deg, var(--brand-navy), var(--brand-blue));
    flex-shrink: 0;
}

.sec::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--border2), transparent);
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
}

/* =========================================================================
   KPI ROW
   ========================================================================= */
.kpi-row {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 22px;
}

.kpi {
    background: linear-gradient(180deg, var(--surface) 0%, var(--surface2) 100%);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px 16px 14px;
    position: relative;
    overflow: hidden;
    box-shadow: var(--sh);
    transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
    animation: fadeUp .45s ease both;
    min-width: 0;
}

.kpi:hover {
    transform: translateY(-3px);
    box-shadow: var(--sh-md);
    border-color: var(--border2);
}

.kpi::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--ka, var(--accent));
}

/* soft accent glow in corner */
.kpi::after {
    content: '';
    position: absolute;
    right: -30px;
    top: -30px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background: var(--ka, var(--accent));
    opacity: .07;
    pointer-events: none;
}

.kpi-lbl {
    font-size: 9px;
    color: var(--muted2);
    letter-spacing: 1.4px;
    text-transform: uppercase;
    margin-bottom: 8px;
    font-family: var(--mono);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.kpi-val {
    font-size: clamp(20px, 2vw, 28px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -.5px;
}

.kpi-unit {
    font-size: 9px;
    color: var(--muted);
    font-family: var(--mono);
    margin-top: 4px;
}

.kpi-d {
    font-size: 9px;
    font-family: var(--mono);
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px dashed var(--border);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.up { color: var(--danger); }
.dn { color: #059669; }
.st { color: var(--muted2); }

/* =========================================================================
   GRIDS
   ========================================================================= */
.g-main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 370px;
    gap: var(--gap);
    margin-bottom: 22px;
}

.g-bot {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--gap);
    margin-bottom: 22px;
}

/* Harmonic grid (inline-styled in HTML) */
main > div[style*="grid-template-columns"] {
    gap: var(--gap) !important;
}

/* =========================================================================
   CARD
   ========================================================================= */
.card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 18px;
    box-shadow: var(--sh);
    animation: fadeUp .5s ease both;
    position: relative;
    overflow: visible;
    min-width: 0;
    transition: box-shadow .25s ease, border-color .25s ease;
}

.card:hover {
    box-shadow: var(--sh-md);
    border-color: var(--border2);
}

.card-t {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: .3px;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 6px 10px;
    margin-bottom: 3px;
}

.card-s {
    font-size: 9px;
    color: var(--muted);
    font-family: var(--mono);
    line-height: 1.5;
    margin-bottom: 12px;
}

.badge {
    display: inline-flex;
    align-items: center;
    font-size: 9px;
    padding: 2px 8px;
    border-radius: 6px;
    font-family: var(--mono);
    letter-spacing: 1px;
    font-weight: 700;
    border: 1px solid;
    white-space: nowrap;
}

.b-ok   { background: #ecfdf5; color: #047857; border-color: #6ee7b7; }
.b-warn { background: #fffbeb; color: #b45309; border-color: #fcd34d; }
.b-live { background: #fef2f2; color: #dc2626; border-color: #fca5a5; }
.b-ml   { background: #eef2ff; color: #4338ca; border-color: #a5b4fc; }

.b-live::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #ef4444;
    margin-right: 5px;
    animation: blink 1.4s infinite;
}

/* =========================================================================
   AXIS TABS
   ========================================================================= */
.atabs {
    display: inline-flex;
    gap: 4px;
    padding: 3px;
    margin-bottom: 10px;
    background: var(--surface3);
    border: 1px solid var(--border);
    border-radius: 9px;
    max-width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
}

.atabs::-webkit-scrollbar { display: none; }

.atab {
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid transparent;
    color: var(--muted2);
    font-family: var(--mono);
    background: transparent;
    transition: all .2s ease;
    white-space: nowrap;
}

.atab:hover {
    color: var(--text2);
    background: var(--surface);
}

.atab:focus-visible {
    outline: 2px solid var(--brand-blue);
    outline-offset: 1px;
}

.ax { background: #e0f2fe; border-color: #7dd3fc; color: #0369a1; box-shadow: var(--sh); }
.ay { background: #eef2ff; border-color: #a5b4fc; color: #4338ca; box-shadow: var(--sh); }
.az { background: #d1fae5; border-color: #6ee7b7; color: #047857; box-shadow: var(--sh); }

/* Plotly containers */
#waveChart,
#specChart,
#trendChart,
#harmAclChart,
#harmVelChart {
    width: 100%;
    min-width: 0;
    border-radius: 10px;
}

.plotly-chart {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}

/* =========================================================================
   AI PREDICTION
   ========================================================================= */
.pred-card {
    background:
        radial-gradient(400px 200px at 100% 0%, rgba(99, 102, 241, .10), transparent 70%),
        linear-gradient(165deg, #ffffff 0%, #f5f3ff 100%);
    border: 1px solid #ddd6fe;
    border-radius: var(--radius-lg);
    padding: 18px;
    box-shadow: var(--sh-md);
    animation: fadeUp .5s ease both;
    position: relative;
    overflow: visible;
    min-width: 0;
}

.rul-box {
    text-align: center;
    padding: 14px 12px;
    background: linear-gradient(180deg, #fffbeb, #fef3c7);
    border-radius: 12px;
    border: 1px solid #fde68a;
    margin-bottom: 12px;
}

.rul-val {
    font-size: clamp(28px, 3vw, 38px);
    font-weight: 700;
    color: #b45309;
    line-height: 1;
    letter-spacing: -1px;
}

.rul-lbl {
    font-size: 8px;
    color: var(--muted2);
    font-family: var(--mono);
    letter-spacing: 2px;
    margin-top: 5px;
}

.rul-sub {
    font-size: 9px;
    color: #92400e;
    font-family: var(--mono);
    margin-top: 4px;
    opacity: .8;
}

.fault-list {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.fault-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    transition: all .22s ease;
    position: relative;
}

.fault-item:hover {
    border-color: #a5b4fc;
    background: #f5f3ff;
    box-shadow: 0 4px 12px rgba(99, 102, 241, .14);
    transform: translateX(2px);
}

.fault-item > div:first-child { min-width: 0; }

.fault-name {
    font-size: 11px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.fault-sub {
    font-size: 8px;
    color: var(--muted);
    font-family: var(--mono);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.prob-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.prob-track {
    width: 60px;
    height: 6px;
    background: var(--border);
    border-radius: 999px;
    overflow: hidden;
}

.prob-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1s ease;
}

.prob-pct {
    font-size: 11px;
    font-family: var(--mono);
    font-weight: 700;
    min-width: 32px;
    text-align: right;
}

.pred-info {
    font-size: 9px;
    font-family: var(--mono);
    color: var(--accent2);
    text-align: center;
    margin-top: 10px;
    padding: 6px;
    border-radius: 6px;
    background: rgba(99, 102, 241, .06);
}

/* =========================================================================
   RICH FAULT TOOLTIP
   ========================================================================= */
.ftip {
    position: fixed;
    z-index: 9999;
    background: var(--surface);
    border: 1px solid #c7d2fe;
    border-radius: var(--radius);
    width: 320px;
    max-width: calc(100vw - 24px);
    max-height: calc(100vh - 24px);
    overflow-y: auto;
    box-shadow: var(--sh-lg);
    opacity: 0;
    pointer-events: none;
    transition: opacity .18s ease, transform .18s ease;
    transform: translateY(4px);
}

.ftip.vis {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}

.ft-head {
    padding: 12px 14px 10px;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(90deg, #eef2ff, #f5f3ff);
    border-radius: var(--radius) var(--radius) 0 0;
}

.ft-htitle { font-size: 13px; font-weight: 700; }

.ft-hsub {
    font-size: 9px;
    color: var(--muted2);
    font-family: var(--mono);
    margin-top: 2px;
}

.ft-body { padding: 12px 14px; }

.ft-sec { margin-bottom: 12px; }
.ft-sec:last-child { margin-bottom: 0; }

.ft-sec-t {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted2);
    font-family: var(--mono);
    margin-bottom: 6px;
}

.ft-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 4px;
    font-size: 10px;
}

.ft-key { color: var(--muted2); }

.ft-val {
    font-family: var(--mono);
    font-weight: 700;
    font-size: 10px;
}

.ft-formula {
    background: var(--surface3);
    border-radius: 8px;
    padding: 8px 10px;
    font-family: var(--mono);
    font-size: 9px;
    color: var(--text2);
    line-height: 1.7;
    border: 1px solid var(--border);
    margin-top: 4px;
    word-break: break-word;
}

.ft-brow { margin-bottom: 6px; }

.ft-blbl {
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    color: var(--muted2);
    margin-bottom: 3px;
    font-family: var(--mono);
}

.ft-btrack {
    height: 6px;
    background: var(--border);
    border-radius: 999px;
    overflow: hidden;
}

.ft-bfill {
    height: 100%;
    border-radius: 999px;
    transition: width .5s ease;
}

.ft-foot {
    padding: 8px 14px;
    border-top: 1px solid var(--border);
    background: var(--surface3);
    border-radius: 0 0 var(--radius) var(--radius);
    font-size: 9px;
    color: var(--muted2);
    font-family: var(--mono);
}

/* =========================================================================
   HEALTH RING
   ========================================================================= */
.ring-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 14px;
    padding: 6px 0;
}

.ring-rel {
    position: relative;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--surface2) 55%, transparent 56%);
}

.ring-inner {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.ring-score {
    font-size: 32px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1px;
}

.ring-txt {
    font-size: 8px;
    color: var(--muted);
    font-family: var(--mono);
    letter-spacing: 1px;
    margin-top: 3px;
}

.gauge-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    width: 100%;
}

.g-item {
    text-align: center;
    padding: 8px 6px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
}

.g-val { font-size: 14px; font-weight: 700; }

.g-track {
    height: 5px;
    background: var(--border);
    border-radius: 999px;
    margin: 5px 0;
    overflow: hidden;
}

.g-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1.2s ease;
}

.g-lbl {
    font-size: 8px;
    color: var(--muted);
    font-family: var(--mono);
}

/* =========================================================================
   TEMP & NOISE
   ========================================================================= */
.temp-big {
    font-size: clamp(36px, 3.4vw, 48px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1.5px;
}

.noise-bar {
    height: 8px;
    background: linear-gradient(90deg, #10b981, #f59e0b, #ef4444);
    border-radius: 999px;
    margin: 8px 0;
    position: relative;
}

.noise-pin {
    position: absolute;
    top: -5px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: #fff;
    border: 3px solid var(--text);
    transform: translateX(-50%);
    transition: left 1s ease;
    box-shadow: 0 2px 8px rgba(15, 23, 42, .25);
}

.spark-row {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 34px;
    margin-top: 4px;
    padding: 4px;
    background: var(--surface2);
    border-radius: 8px;
    border: 1px solid var(--border);
}

.spark-b {
    flex: 1;
    min-width: 2px;
    border-radius: 2px 2px 0 0;
    transition: height .4s ease;
}

/* =========================================================================
   EVENTS & CONNECTIVITY
   ========================================================================= */
.conn-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 14px;
}

.conn-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 12px;
    background: var(--surface2);
    border-radius: 9px;
    font-size: 11px;
    border: 1px solid var(--border);
    transition: background .2s ease;
}

.conn-item:hover { background: var(--surface3); }

.conn-name {
    font-family: var(--mono);
    font-size: 9px;
    letter-spacing: .5px;
    color: var(--muted2);
}

.ev-log {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-height: 160px;
    overflow-y: auto;
    padding-right: 2px;
}

.ev-log::-webkit-scrollbar { width: 3px; }
.ev-log::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 2px; }

.ev-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 7px 10px;
    border-radius: 7px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-left-width: 3px;
    font-size: 10px;
    line-height: 1.45;
    word-break: break-word;
    animation: fadeUp .35s ease both;
}

.ev-time {
    font-family: var(--mono);
    font-size: 9px;
    color: var(--muted);
    white-space: nowrap;
}

/* =========================================================================
   FOOTER
   ========================================================================= */
footer {
    position: relative;
    z-index: 1;
    border-top: 1px solid var(--border);
    padding: 12px var(--pad-x);
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 6px 16px;
    font-size: 9px;
    color: var(--muted2);
    font-family: var(--mono);
    max-width: 1680px;
    margin: 0 auto;
    background: var(--surface);
    border-radius: var(--radius) var(--radius) 0 0;
}

/* simple spectrum tooltip */
.stip {
    position: fixed;
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 9px;
    font-family: var(--mono);
    pointer-events: none;
    opacity: 0;
    transition: opacity .15s;
    z-index: 8000;
    white-space: nowrap;
    box-shadow: var(--sh-md);
    color: var(--text2);
}

canvas { display: block; max-width: 100%; }

#container ::-webkit-scrollbar { width: 6px; height: 6px; }
#container ::-webkit-scrollbar-track { background: transparent; }
#container ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

/* =========================================================================
   RESPONSIVE
   ========================================================================= */

/* ---- Large desktop ≤1440 ---- */
@media (max-width: 1440px) {
    :root, #container { --pad-x: 22px; }

    .g-main {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 330px;
    }
}

/* ---- Laptop / small desktop ≤1200 ---- */
@media (max-width: 1200px) {
    .kpi-row {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .g-main {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    /* AI prediction spans full width, list goes 2-col */
    .g-main > .pred-card {
        grid-column: 1 / -1;
        display: grid;
        grid-template-columns: 260px minmax(0, 1fr);
        grid-template-areas:
            "title title"
            "sub   sub"
            "rul   list"
            "info  info";
        column-gap: 16px;
        align-items: start;
    }

    .pred-card > .card-t   { grid-area: title; }
    .pred-card > .card-s   { grid-area: sub; }
    .pred-card > .rul-box  { grid-area: rul; margin-bottom: 0; }
    .pred-card > .fault-list { grid-area: list; }
    .pred-card > .pred-info  { grid-area: info; }

    .g-bot {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .g-bot > .card:last-child {
        grid-column: 1 / -1;
    }
}

/* ---- Tablet landscape ≤992 ---- */
@media (max-width: 992px) {
    :root, #container { --pad-x: 18px; --gap: 12px; }

    .header-inner { padding: 10px var(--pad-x); }

    .logo-text { font-size: 17px; letter-spacing: 1px; }

    /* Harmonic charts stack */
    main > div[style*="grid-template-columns"] {
        grid-template-columns: 1fr !important;
    }

    .g-main > .pred-card {
        grid-template-columns: 220px minmax(0, 1fr);
    }
}

/* ---- Tablet portrait ≤768 ---- */
@media (max-width: 768px) {
    :root, #container { --pad-x: 14px; }

    .header-inner {
        flex-direction: column;
        align-items: stretch;
        gap: 10px;
    }

    .hdr-right {
        justify-content: flex-start;
        gap: 8px;
    }

    .clk { margin-left: auto; }

    main { padding-top: 18px; }

    .g-main,
    .g-bot {
        grid-template-columns: minmax(0, 1fr);
    }

    .g-bot > .card:last-child { grid-column: auto; }

    .g-main > .pred-card {
        display: block;
    }

    .pred-card > .rul-box { margin-bottom: 12px; }

    .card,
    .pred-card { padding: 16px; }

    /* slightly taller charts for touch */
    #waveChart,
    #specChart { height: 200px !important; }

    #trendChart { height: 240px !important; }

    .ev-log { max-height: 200px; }

    footer {
        flex-direction: column;
        align-items: flex-start;
        border-radius: 0;
    }
}

/* ---- Large phone ≤576 ---- */
@media (max-width: 576px) {
    .kpi-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
    }

    .kpi { padding: 13px 12px 12px; }

    .kpi-val { font-size: 22px; }

    .logo-icon { width: 38px; height: 38px; }

    .logo-text { font-size: 15px; }

    .logo-sub { letter-spacing: 1px; }

    .pill { padding: 4px 10px; font-size: 9px; }

    .card-t { font-size: 12px; }

    .sec { letter-spacing: 2px; font-size: 9px; }

    .ring-rel { width: 120px; height: 120px; }

    .ring-rel canvas { width: 120px !important; height: 120px !important; }

    .gauge-row { gap: 6px; }

    .prob-track { width: 44px; }

    #waveChart,
    #specChart { height: 190px !important; }

    #harmAclChart,
    #harmVelChart { height: 220px !important; }

    /* tooltip becomes a bottom sheet on phones */
    .ftip {
        left: 12px !important;
        right: 12px !important;
        top: auto !important;
        bottom: 12px !important;
        width: auto;
        max-height: 65vh;
    }
}

/* ---- Small phone ≤380 ---- */
@media (max-width: 380px) {
    .kpi-row { grid-template-columns: minmax(0, 1fr); }

    .hdr-right .pill-w { display: none; }

    .clk { margin-left: 0; }

    .fault-item {
        flex-direction: column;
        align-items: flex-start;
    }

    .prob-wrap { width: 100%; }

    .prob-track { flex: 1; width: auto; }

    .temp-big { font-size: 34px; }
}

/* ---- Hover-less devices ---- */
@media (hover: none) {
    .kpi:hover,
    .fault-item:hover { transform: none; }
}

/* ---- Reduced motion ---- */
@media (prefers-reduced-motion: reduce) {
    #container *,
    #container *::before,
    #container *::after {
        animation: none !important;
        transition: none !important;
    }
}

/* ---- Print ---- */
@media print {
    #container::before,
    header::after { display: none; }

    header { position: static; box-shadow: none; }

    .card,
    .kpi,
    .pred-card {
        box-shadow: none;
        break-inside: avoid;
    }

    .ftip,
    .stip { display: none; }
}
