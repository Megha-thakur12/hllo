/* =====================================================================
   VIBRATION DASHBOARD — Refined & Responsive CSS
   Same selectors / variables / structure as original. No @import.
   ===================================================================== */

#container,
.ftip,
.stip {
    --bg: #eef3f8;
    --surface: #fff;
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
    --sh: 0 1px 3px rgba(15, 23, 42, .06), 0 1px 2px rgba(15, 23, 42, .04);
    --sh-md: 0 6px 20px rgba(15, 23, 42, .09), 0 2px 6px rgba(15, 23, 42, .05);
    --sh-lg: 0 18px 40px rgba(15, 23, 42, .16), 0 6px 14px rgba(15, 23, 42, .08);
    --pad-x: 28px;
    --gap: 14px;
    --ease: cubic-bezier(.22, .61, .36, 1);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#container {
    font-family: 'DM Sans', system-ui, -apple-system, 'Segoe UI', sans-serif;
    background:
        radial-gradient(1200px 600px at 0% 0%, rgba(14, 165, 233, .07), transparent 60%),
        radial-gradient(900px 500px at 100% 0%, rgba(99, 102, 241, .06), transparent 60%),
        var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
}

#container::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: radial-gradient(circle, #94a3b8 1px, transparent 1px);
    background-size: 28px 28px;
    opacity: 0.14;
    pointer-events: none;
    z-index: 0;
}

/* =====================================================================
   HEADER
   ===================================================================== */
header {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 200;
    box-shadow: var(--sh);
}

header::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3));
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
    /*width: 38px;*/
    /*height: 38px;*/
    /*background: linear-gradient(135deg, #0ea5e9, #6366f1);*/
    /*border-radius: 10px;*/
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 19px;
    /*box-shadow: 0 4px 12px rgba(14, 165, 233, .28);*/
}

.logo-text {
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 3px;
    line-height: 1.1;
    color: #0f172a;
    white-space: nowrap;
}

.logo-sub {
    font-size: 9px;
    color: var(--muted2);
    letter-spacing: 2px;
    font-family: 'Space Mono', monospace;
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.hdr-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-end;
}

.pill {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 5px 12px;
    border-radius: 999px;
    border: 1.5px solid;
    font-size: 10px;
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    letter-spacing: 1px;
    white-space: nowrap;
    transition: transform .2s var(--ease);
}

.pill-g {
    border-color: #10b981;
    color: #047857;
    background: linear-gradient(180deg, #f0fdf4, #dcfce7);
    box-shadow: 0 2px 8px rgba(16, 185, 129, .15);
}

.pill-w {
    border-color: #f59e0b;
    color: #b45309;
    background: linear-gradient(180deg, #fffbeb, #fef3c7);
    box-shadow: 0 2px 8px rgba(245, 158, 11, .15);
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
        opacity: .3;
    }
}

.clk {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--text2);
    background: var(--surface3);
    padding: 5px 10px;
    border-radius: 8px;
    border: 1px solid var(--border);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
}

/* =====================================================================
   LAYOUT
   ===================================================================== */
main {
    position: relative;
    z-index: 1;
    max-width: 1680px;
    margin: 0 auto;
    padding: 20px var(--pad-x);
}

.sec {
    font-size: 9px;
    letter-spacing: 3px;
    color: var(--muted2);
    text-transform: uppercase;
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.sec::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 2px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    flex-shrink: 0;
}

.sec::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--border2), transparent);
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* =====================================================================
   KPI
   ===================================================================== */
.kpi-row {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    gap: 12px;
    margin-bottom: 20px;
}

.kpi {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 14px 16px;
    position: relative;
    overflow: hidden;
    box-shadow: var(--sh);
    transition: all .25s var(--ease);
    animation: fadeUp .45s ease both;
    min-width: 0;
}

.kpi:nth-child(2) { animation-delay: .04s; }
.kpi:nth-child(3) { animation-delay: .08s; }
.kpi:nth-child(4) { animation-delay: .12s; }
.kpi:nth-child(5) { animation-delay: .16s; }
.kpi:nth-child(6) { animation-delay: .20s; }

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
    border-radius: 14px 14px 0 0;
}

.kpi::after {
    content: '';
    position: absolute;
    top: -40px;
    right: -40px;
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background: var(--ka, var(--accent));
    opacity: .06;
    pointer-events: none;
    transition: opacity .25s;
}

.kpi:hover::after {
    opacity: .11;
}

.kpi-lbl {
    font-size: 9px;
    color: var(--muted2);
    letter-spacing: 1.5px;
    text-transform: uppercase;
    margin-bottom: 6px;
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.kpi-val {
    font-size: clamp(20px, 1.6vw + 6px, 28px);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -.5px;
    font-variant-numeric: tabular-nums;
}

.kpi-unit {
    font-size: 9px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    margin-top: 3px;
}

.kpi-d {
    font-size: 9px;
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    margin-top: 6px;
}

.up { color: var(--danger); }
.dn { color: var(--accent3); }
.st { color: var(--muted); }

/* =====================================================================
   GRIDS
   ===================================================================== */
.g-main {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 370px;
    gap: var(--gap);
    margin-bottom: var(--gap);
}

.g-bot {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: var(--gap);
    margin-bottom: var(--gap);
}

/* =====================================================================
   CARD
   ===================================================================== */
.card {
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    padding: 18px;
    box-shadow: var(--sh);
    animation: fadeUp .5s ease both;
    position: relative;
    overflow: visible;
    min-width: 0;
    transition: box-shadow .25s var(--ease), border-color .25s var(--ease);
}

.card:hover {
    box-shadow: var(--sh-md);
    border-color: var(--border2);
}

.card-t {
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: .4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 2px;
}

.card-s {
    font-size: 9px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    margin-bottom: 12px;
}

.badge {
    font-size: 9px;
    padding: 2px 8px;
    border-radius: 6px;
    font-family: 'Space Mono', monospace;
    letter-spacing: 1px;
    font-weight: 700;
    border: 1.5px solid;
    white-space: nowrap;
}

.b-ok   { background: #f0fdf4; color: #047857; border-color: #10b981; }
.b-warn { background: #fffbeb; color: #b45309; border-color: #f59e0b; }
.b-live { background: #fef2f2; color: #dc2626; border-color: #ef4444; }
.b-ml   { background: #eef2ff; color: #4338ca; border-color: #6366f1; }

/* =====================================================================
   AXIS TABS
   ===================================================================== */
.atabs {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
    overflow-x: auto;
    scrollbar-width: none;
}

.atabs::-webkit-scrollbar {
    display: none;
}

.atab {
    flex-shrink: 0;
    padding: 4px 12px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    border: 1.5px solid var(--border);
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    background: var(--surface3);
    transition: all .2s var(--ease);
    user-select: none;
}

.atab:hover {
    border-color: var(--border2);
    color: var(--text2);
}

.ax { background: #e0f2fe; border-color: #0ea5e9; color: #0369a1; box-shadow: 0 2px 8px rgba(14, 165, 233, .18); }
.ay { background: #eef2ff; border-color: #6366f1; color: #4338ca; box-shadow: 0 2px 8px rgba(99, 102, 241, .18); }
.az { background: #d1fae5; border-color: #10b981; color: #047857; box-shadow: 0 2px 8px rgba(16, 185, 129, .18); }

/* =====================================================================
   PLOTLY
   ===================================================================== */
.plotly-chart {
    width: 100%;
    border-radius: 10px;
    overflow: hidden;
}

/* =====================================================================
   PREDICTION
   ===================================================================== */
.pred-card {
    background: linear-gradient(160deg, #fff 0%, #f7f5ff 55%, #f1edff 100%);
    border: 1.5px solid #e4d8fd;
    border-radius: 16px;
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
    background: linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%);
    border-radius: 12px;
    border: 1.5px solid #fde68a;
    margin-bottom: 12px;
    box-shadow: 0 4px 14px rgba(245, 158, 11, .12);
}

.rul-val {
    font-size: clamp(26px, 2vw + 10px, 34px);
    font-weight: 700;
    color: #b45309;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.rul-lbl {
    font-size: 8px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    letter-spacing: 2px;
    margin-top: 4px;
}

.rul-sub {
    font-size: 9px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    margin-top: 3px;
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
    padding: 9px 11px;
    border-radius: 10px;
    border: 1.5px solid var(--border);
    background: var(--surface);
    cursor: pointer;
    transition: all .22s var(--ease);
    position: relative;
    min-width: 0;
}

.fault-item:hover {
    border-color: #a5b4fc;
    background: #f5f3ff;
    box-shadow: 0 4px 12px rgba(99, 102, 241, .14);
    transform: translateX(2px);
}

.fault-name {
    font-size: 11px;
    font-weight: 700;
}

.fault-sub {
    font-size: 8px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    margin-top: 1px;
}

.prob-wrap {
    display: flex;
    align-items: center;
    gap: 7px;
    flex-shrink: 0;
}

.prob-track {
    width: 58px;
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
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    min-width: 28px;
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.pred-info {
    font-size: 9px;
    font-family: 'Space Mono', monospace;
    color: var(--accent2);
    text-align: center;
    margin-top: 9px;
}

/* =====================================================================
   RICH FAULT TOOLTIP
   ===================================================================== */
.ftip {
    position: fixed;
    z-index: 9999;
    background: var(--surface);
    border: 1.5px solid #c7d2fe;
    border-radius: 14px;
    width: 310px;
    max-width: calc(100vw - 24px);
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
    border-radius: 12px 12px 0 0;
}

.ft-htitle {
    font-size: 13px;
    font-weight: 700;
}

.ft-hsub {
    font-size: 9px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    margin-top: 2px;
}

.ft-body { padding: 12px 14px; }
.ft-sec { margin-bottom: 10px; }
.ft-sec:last-child { margin-bottom: 0; }

.ft-sec-t {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    margin-bottom: 5px;
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
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    font-size: 10px;
}

.ft-formula {
    background: var(--surface3);
    border-radius: 7px;
    padding: 8px 10px;
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: var(--text2);
    line-height: 1.7;
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent2);
    margin-top: 4px;
    word-break: break-word;
}

.ft-brow { margin-bottom: 5px; }

.ft-blbl {
    display: flex;
    justify-content: space-between;
    font-size: 9px;
    color: var(--muted2);
    margin-bottom: 2px;
    font-family: 'Space Mono', monospace;
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
    border-radius: 0 0 12px 12px;
    font-size: 9px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
}

/* =====================================================================
   HEALTH RING
   ===================================================================== */
.ring-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 6px 0;
}

.ring-rel {
    position: relative;
    width: 130px;
    height: 130px;
    filter: drop-shadow(0 6px 14px rgba(15, 23, 42, .08));
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
    font-variant-numeric: tabular-nums;
}

.ring-txt {
    font-size: 8px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    letter-spacing: 1px;
    margin-top: 2px;
}

.gauge-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    width: 100%;
}

.g-item {
    text-align: center;
    padding: 7px 5px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    min-width: 0;
}

.g-val {
    font-size: 13px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
}

.g-track {
    height: 5px;
    background: var(--border);
    border-radius: 999px;
    margin: 3px 0;
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
    font-family: 'Space Mono', monospace;
}

/* =====================================================================
   TEMP & NOISE
   ===================================================================== */
.temp-big {
    font-size: clamp(34px, 2.6vw + 12px, 46px);
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.noise-bar {
    height: 8px;
    background: linear-gradient(90deg, #10b981, #84cc16 30%, #f59e0b 60%, #ef4444);
    border-radius: 999px;
    margin: 6px 0;
    position: relative;
    box-shadow: inset 0 1px 2px rgba(15, 23, 42, .12);
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
    box-shadow: 0 3px 8px rgba(15, 23, 42, .22);
}

.spark-row {
    display: flex;
    align-items: flex-end;
    gap: 2px;
    height: 30px;
    margin-top: 4px;
}

.spark-b {
    flex: 1;
    min-width: 2px;
    border-radius: 2px 2px 0 0;
}

/* =====================================================================
   EVENTS
   ===================================================================== */
.conn-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 12px;
}

.conn-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 7px 11px;
    background: var(--surface2);
    border-radius: 9px;
    font-size: 11px;
    border: 1px solid var(--border);
    transition: border-color .2s;
}

.conn-item:hover {
    border-color: var(--border2);
}

.conn-name {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: var(--muted2);
}

.ev-log {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-height: 150px;
    overflow-y: auto;
}

.ev-log::-webkit-scrollbar { width: 3px; }

.ev-log::-webkit-scrollbar-thumb {
    background: var(--border2);
    border-radius: 2px;
}

.ev-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 6px 9px;
    border-radius: 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-left-width: 3px;
    font-size: 10px;
    line-height: 1.45;
    word-break: break-word;
}

.ev-time {
    font-family: 'Space Mono', monospace;
    font-size: 9px;
    color: var(--muted);
    white-space: nowrap;
}

/* =====================================================================
   FOOTER
   ===================================================================== */
footer {
    position: relative;
    z-index: 1;
    border-top: 1px solid var(--border);
    padding: 10px var(--pad-x);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    font-size: 9px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    max-width: 1680px;
    margin: 0 auto;
    background: var(--surface);
}

/* simple spec tip */
.stip {
    position: fixed;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 9px;
    font-family: 'Space Mono', monospace;
    pointer-events: none;
    opacity: 0;
    transition: opacity .15s;
    z-index: 8000;
    white-space: nowrap;
    box-shadow: var(--sh-md);
    color: var(--text2);
}

canvas {
    display: block;
    max-width: 100%;
}

::-webkit-scrollbar { width: 5px; height: 5px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }

/* =====================================================================
   LOGO IMAGE (your original rule, kept)
   ===================================================================== */
img {
    width: 12vh !important;
    height: auto;
    max-width: 100%;
    object-fit: contain;
}

/* =====================================================================
   RESPONSIVE
   ===================================================================== */

/* Large laptop */
@media (max-width: 1600px) {
    #container { --pad-x: 24px; }

    .g-main {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 340px;
    }
}

/* Small laptop */
@media (max-width: 1400px) {
    .g-main {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 320px;
    }

    .card,
    .pred-card { padding: 16px; }

    .kpi { padding: 13px 14px; }
}

/* Tablet landscape */
@media (max-width: 1200px) {
    #container { --pad-x: 20px; --gap: 12px; }

    .kpi-row {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .g-main {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    /* 3rd card (prediction) takes the full row */
    .g-main > :nth-child(3) {
        grid-column: 1 / -1;
    }

    .g-main > .pred-card .fault-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 8px;
    }

    .g-bot {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .g-bot > :nth-child(3):last-child {
        grid-column: 1 / -1;
    }
}

/* Tablet portrait / large phone */
@media (max-width: 800px) {
    #container { --pad-x: 16px; }

    .header-inner {
        flex-wrap: wrap;
        gap: 10px;
        padding: 10px var(--pad-x);
    }

    .hdr-right {
        width: 100%;
        justify-content: flex-start;
        gap: 8px;
    }

    .clk { margin-left: auto; }

    .logo-text { font-size: 18px; letter-spacing: 2.5px; }

    main { padding: 16px var(--pad-x); }

    .kpi-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        margin-bottom: 16px;
    }

    .g-main,
    .g-bot {
        grid-template-columns: minmax(0, 1fr);
    }

    .g-main > :nth-child(3),
    .g-bot > :nth-child(3):last-child {
        grid-column: auto;
    }

    .card,
    .pred-card { padding: 14px; }

    .ev-log { max-height: 220px; }

    footer {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
    }
}

/* Phone */
@media (max-width: 520px) {
    img { width: 9vh !important; }

    .logo { gap: 8px; }
    .logo-text { font-size: 16px; letter-spacing: 2px; }
    .logo-sub { font-size: 8px; letter-spacing: 1.5px; }

    .pill { padding: 4px 9px; font-size: 9px; }
    .clk { font-size: 9px; padding: 4px 8px; }

    .g-main > .pred-card .fault-list {
        grid-template-columns: minmax(0, 1fr);
    }

    .kpi { padding: 12px; border-radius: 12px; }
    .kpi-lbl { font-size: 8px; letter-spacing: 1px; }

    .ring-rel { width: 116px; height: 116px; }
    .ring-score { font-size: 28px; }

    .prob-track { width: 46px; }
}

/* Very small phones */
@media (max-width: 380px) {
    .kpi-row { grid-template-columns: minmax(0, 1fr); }
    .clk { width: 100%; text-align: center; margin-left: 0; }
}

/* Respect reduced-motion settings */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: .01ms !important;
        transition-duration: .01ms !important;
    }
}
