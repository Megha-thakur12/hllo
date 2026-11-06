/* ================= TOKENS ================= */
/* HTML has no #container, so tokens live on the real top-level elements */
#container,
header,
main,
footer,
.ftip,
.stip {
    --bg: #eef2f7;
    --surface: #ffffff;
    --surface2: #f8fafc;
    --surface3: #f1f5f9;
    --border: #e3e8ef;
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
    --sans: 'DM Sans', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    --mono: 'Space Mono', 'Roboto Mono', Consolas, 'Courier New', monospace;
    --sh: 0 1px 2px rgba(15, 23, 42, .04), 0 2px 8px rgba(15, 23, 42, .04);
    --sh-md: 0 10px 28px rgba(15, 23, 42, .10), 0 2px 6px rgba(15, 23, 42, .05);
    --sh-lg: 0 20px 44px rgba(15, 23, 42, .18), 0 6px 14px rgba(15, 23, 42, .08);
    font-family: var(--sans);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#container {
    background: var(--bg);
    min-height: 100vh;
    overflow-x: hidden;
}

/* ================= HEADER ================= */
header {
    background: #ffffff;
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 200;
    box-shadow: 0 2px 12px rgba(15, 23, 42, .06);
}

header::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 3px;
    background: linear-gradient(90deg, #e31837 0%, #e31837 18%, #6366f1 55%, #0ea5e9 100%);
}

.header-inner {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 10px 28px;
    max-width: 1800px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: 16px;
    min-width: 0;
}

.logo-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding-right: 16px;
    border-right: 1px solid var(--border);
}

.logo-text {
    font-size: 21px;
    font-weight: 700;
    letter-spacing: .5px;
    color: var(--text);
    line-height: 1.15;
    white-space: nowrap;
}

.logo-sub {
    font-size: 11px;
    font-weight: 500;
    color: var(--muted2);
    letter-spacing: .3px;
    margin-top: 2px;
    white-space: nowrap;
}

.hdr-right {
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.pill {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px 13px;
    border-radius: 999px;
    border: 1px solid;
    font-size: 10.5px;
    font-family: var(--mono);
    font-weight: 700;
    letter-spacing: .6px;
    white-space: nowrap;
}

.pill-g {
    border-color: #a7f3d0;
    color: #047857;
    background: #ecfdf5;
}

.pill-w {
    border-color: #fde68a;
    color: #b45309;
    background: #fffbeb;
}

.dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    animation: blink 2s infinite;
}

.dot-g {
    background: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, .2);
}

.dot-w {
    background: #f59e0b;
    box-shadow: 0 0 0 3px rgba(245, 158, 11, .2);
}

@keyframes blink {
    0%,
    100% {
        opacity: 1;
    }
    50% {
        opacity: .35;
    }
}

.clk {
    font-family: var(--mono);
    font-size: 12px;
    font-weight: 700;
    color: #ffffff;
    background: #0f172a;
    padding: 7px 12px;
    border-radius: 8px;
    white-space: nowrap;
    letter-spacing: .5px;
}

/* ================= LAYOUT ================= */
main {
    position: relative;
    z-index: 1;
    background: var(--bg);
    padding: 22px 28px 26px;
}

main > * {
    max-width: 1800px;
    margin-left: auto;
    margin-right: auto;
}

.sec {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 1.6px;
    color: var(--text2);
    text-transform: uppercase;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.sec::before {
    content: '';
    width: 4px;
    height: 14px;
    border-radius: 2px;
    background: var(--brand);
    flex-shrink: 0;
}

.sec::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border2);
    opacity: .7;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* ================= KPI ================= */
.kpi-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
}

.kpi {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px 18px 14px;
    position: relative;
    overflow: hidden;
    min-width: 0;
    box-shadow: var(--sh);
    transition: transform .25s, box-shadow .25s;
    animation: fadeUp .45s ease both;
}

.kpi:hover {
    transform: translateY(-3px);
    box-shadow: var(--sh-md);
}

.kpi::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    background: var(--ka, var(--accent));
}

.kpi::after {
    content: '';
    position: absolute;
    right: -34px;
    top: -34px;
    width: 96px;
    height: 96px;
    border-radius: 50%;
    background: var(--ka, var(--accent));
    opacity: .07;
    pointer-events: none;
}

.kpi-lbl {
    font-size: 10.5px;
    font-weight: 700;
    color: var(--muted2);
    letter-spacing: .8px;
    text-transform: uppercase;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.kpi-val {
    font-size: 30px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -.5px;
    font-variant-numeric: tabular-nums;
}

.kpi-unit {
    font-size: 10.5px;
    font-weight: 500;
    color: var(--muted2);
    margin-top: 5px;
}

.kpi-d {
    display: inline-block;
    font-size: 10px;
    font-weight: 700;
    font-family: var(--mono);
    margin-top: 10px;
    padding: 3px 8px;
    border-radius: 6px;
    background: var(--surface3);
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.up {
    color: var(--danger);
}

.dn {
    color: var(--accent3);
}

.st {
    color: var(--muted2);
}

/* ================= GRIDS (same positions as original) ================= */
.g-main {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
}

.g-bot {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 14px;
    margin-bottom: 24px;
}

/* ================= CARD ================= */
.card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 18px 20px;
    min-width: 0;
    box-shadow: var(--sh);
    animation: fadeUp .5s ease both;
    position: relative;
    overflow: visible;
    transition: box-shadow .25s;
}

.card:hover {
    box-shadow: var(--sh-md);
}

.card-t {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 4px;
}

.card-s {
    font-size: 11px;
    color: var(--muted2);
    margin-bottom: 14px;
    line-height: 1.45;
}

.badge {
    font-size: 9.5px;
    padding: 3px 9px;
    border-radius: 999px;
    font-family: var(--mono);
    letter-spacing: .8px;
    font-weight: 700;
    border: 1px solid;
    white-space: nowrap;
}

.b-ok {
    background: #ecfdf5;
    color: #047857;
    border-color: #a7f3d0;
}

.b-warn {
    background: #fffbeb;
    color: #b45309;
    border-color: #fde68a;
}

.b-live {
    background: #fef2f2;
    color: #dc2626;
    border-color: #fecaca;
    animation: blink 1.8s infinite;
}

.b-ml {
    background: #eef2ff;
    color: #4338ca;
    border-color: #c7d2fe;
}

/* ================= AXIS TABS ================= */
.atabs {
    display: inline-flex;
    gap: 4px;
    margin-bottom: 12px;
    padding: 3px;
    background: var(--surface3);
    border-radius: 9px;
    border: 1px solid var(--border);
}

.atab {
    padding: 5px 13px;
    border-radius: 7px;
    font-size: 10.5px;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid transparent;
    color: var(--muted2);
    font-family: var(--mono);
    background: transparent;
    transition: all .2s;
}

.atab:hover {
    color: var(--text);
}

.ax {
    background: #ffffff;
    border-color: #bae6fd;
    color: #0369a1;
    box-shadow: 0 1px 4px rgba(14, 165, 233, .25);
}

.ay {
    background: #ffffff;
    border-color: #c7d2fe;
    color: #4338ca;
    box-shadow: 0 1px 4px rgba(99, 102, 241, .25);
}

.az {
    background: #ffffff;
    border-color: #a7f3d0;
    color: #047857;
    box-shadow: 0 1px 4px rgba(16, 185, 129, .25);
}

/* ================= PLOTLY ================= */
/* waveform + spectrum fill their card next to the tall prediction card */
#waveChart,
#specChart {
    height: 380px !important;
}

.plotly-chart {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}

/* ================= PREDICTION ================= */
.pred-card {
    background: linear-gradient(170deg, #ffffff 0%, #f7f6ff 100%);
    border: 1px solid #ddd6fe;
    border-radius: 16px;
    padding: 18px 20px;
    min-width: 0;
    box-shadow: 0 6px 22px rgba(99, 102, 241, .10);
    animation: fadeUp .5s ease both;
    position: relative;
    overflow: visible;
}

.pred-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 20px;
    right: 20px;
    height: 3px;
    border-radius: 0 0 3px 3px;
    background: linear-gradient(90deg, #6366f1, #0ea5e9);
}

.rul-box {
    text-align: center;
    padding: 16px 12px 14px;
    background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%);
    border-radius: 12px;
    border: 1px solid #fde68a;
    margin-bottom: 14px;
}

.rul-val {
    font-size: 38px;
    font-weight: 700;
    color: #b45309;
    line-height: 1;
    letter-spacing: -1px;
    font-variant-numeric: tabular-nums;
}

.rul-lbl {
    font-size: 10px;
    font-weight: 700;
    color: #92400e;
    letter-spacing: 1.2px;
    margin-top: 6px;
}

.rul-sub {
    font-size: 10.5px;
    color: var(--muted2);
    margin-top: 3px;
}

.fault-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
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
    transition: all .2s;
    position: relative;
}

.fault-item:hover {
    background: #f5f3ff;
    box-shadow: 0 4px 12px rgba(99, 102, 241, .14);
    transform: translateX(3px);
}

.fault-name {
    font-size: 12.5px;
    font-weight: 700;
}

.fault-sub {
    font-size: 10.5px;
    color: var(--muted2);
    margin-top: 2px;
}

.prob-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
}

.prob-track {
    width: 64px;
    height: 6px;
    background: var(--surface3);
    border-radius: 999px;
    overflow: hidden;
}

.prob-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1s ease;
}

.prob-pct {
    font-size: 12px;
    font-family: var(--mono);
    font-weight: 700;
    min-width: 32px;
    text-align: right;
}

.pred-info {
    font-size: 10.5px;
    font-weight: 700;
    color: var(--accent2);
    text-align: center;
    margin-top: 12px;
}

/* ================= RICH FAULT TOOLTIP ================= */
.ftip {
    position: fixed;
    z-index: 9999;
    background: var(--surface);
    border: 1px solid #c7d2fe;
    border-radius: 14px;
    width: 310px;
    max-width: 94vw;
    box-shadow: var(--sh-lg);
    opacity: 0;
    pointer-events: none;
    transition: opacity .18s, transform .18s;
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
    border-radius: 13px 13px 0 0;
}

.ft-htitle {
    font-size: 14px;
    font-weight: 700;
}

.ft-hsub {
    font-size: 10.5px;
    color: var(--muted2);
    margin-top: 2px;
}

.ft-body {
    padding: 12px 14px;
}

.ft-sec {
    margin-bottom: 11px;
}

.ft-sec:last-child {
    margin-bottom: 0;
}

.ft-sec-t {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 1.4px;
    text-transform: uppercase;
    color: var(--muted2);
    margin-bottom: 6px;
}

.ft-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
    font-size: 11px;
}

.ft-key {
    color: var(--muted2);
}

.ft-val {
    font-family: var(--mono);
    font-weight: 700;
    font-size: 10.5px;
}

.ft-formula {
    background: var(--surface2);
    border-radius: 8px;
    padding: 8px 10px;
    font-family: var(--mono);
    font-size: 9.5px;
    color: var(--text2);
    line-height: 1.7;
    border: 1px solid var(--border);
    border-left: 3px solid #6366f1;
    margin-top: 4px;
}

.ft-brow {
    margin-bottom: 6px;
}

.ft-blbl {
    display: flex;
    justify-content: space-between;
    font-size: 10.5px;
    color: var(--muted2);
    margin-bottom: 3px;
}

.ft-btrack {
    height: 6px;
    background: var(--surface3);
    border-radius: 999px;
    overflow: hidden;
}

.ft-bfill {
    height: 100%;
    border-radius: 999px;
    transition: width .5s ease;
}

.ft-foot {
    padding: 9px 14px;
    border-top: 1px solid var(--border);
    background: var(--surface2);
    border-radius: 0 0 13px 13px;
    font-size: 10.5px;
    color: var(--text2);
}

/* ================= HEALTH RING ================= */
.ring-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 4px 0;
}

.ring-rel {
    position: relative;
    width: 130px;
    height: 130px;
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
    font-size: 34px;
    font-weight: 700;
    line-height: 1;
}

.ring-txt {
    font-size: 9.5px;
    font-weight: 700;
    color: var(--muted2);
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
    padding: 10px 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
}

.g-val {
    font-size: 16px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
}

.g-track {
    height: 5px;
    background: var(--border);
    border-radius: 999px;
    margin: 6px 0 5px;
    overflow: hidden;
}

.g-fill {
    height: 100%;
    border-radius: 999px;
    transition: width 1.2s ease;
}

.g-lbl {
    font-size: 10px;
    font-weight: 500;
    color: var(--muted2);
}

/* ================= TEMP & NOISE ================= */
.temp-big {
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1.5px;
    font-variant-numeric: tabular-nums;
}

.noise-bar {
    height: 8px;
    background: linear-gradient(90deg, #10b981, #84cc16, #f59e0b, #ef4444);
    border-radius: 999px;
    margin: 8px 0 6px;
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
    box-shadow: 0 2px 6px rgba(15, 23, 42, .25);
}

.spark-row {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 36px;
    margin-top: 6px;
    padding: 4px;
    background: var(--surface2);
    border-radius: 8px;
    border: 1px solid var(--border);
}

.spark-b {
    flex: 1;
    border-radius: 2px 2px 0 0;
}

/* ================= EVENTS ================= */
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
    padding: 9px 12px;
    background: var(--surface2);
    border-radius: 9px;
    font-size: 11px;
    border: 1px solid var(--border);
}

.conn-name {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .4px;
    color: var(--text2);
}

.ev-log {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-height: 150px;
    overflow-y: auto;
    border: 1px dashed var(--border2);
    border-radius: 9px;
    padding: 6px;
}

.ev-log::-webkit-scrollbar {
    width: 3px;
}

.ev-log::-webkit-scrollbar-thumb {
    background: var(--border2);
    border-radius: 2px;
}

.ev-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 6px 9px;
    border-radius: 7px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-left-width: 3px;
    font-size: 11px;
}

.ev-time {
    font-family: var(--mono);
    font-size: 10px;
    color: var(--muted2);
    white-space: nowrap;
}

/* ================= FOOTER ================= */
footer {
    border-top: 1px solid var(--border);
    padding: 12px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    font-size: 11px;
    color: var(--muted2);
    background: var(--surface);
}

/* simple spec tip */
.stip {
    position: fixed;
    background: #0f172a;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 10px;
    font-family: var(--mono);
    pointer-events: none;
    opacity: 0;
    transition: opacity .15s;
    z-index: 8000;
    white-space: nowrap;
    box-shadow: var(--sh-md);
    color: #f1f5f9;
}

canvas {
    display: block;
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
}

/* logo: fixed size (12vh grew huge on tall screens) */
img {
    width: 12vh !important
}

.logo-icon img {
    width: 110px !important;
    max-width: 30vw;
    height: auto !important;
    display: block;
}

/* ================= RESPONSIVE (grids adapt to screen width on their own) ================= */
main > div:not([class]) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
}
