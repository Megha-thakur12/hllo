#container {
    --bg: #0b0f17;
    --surface: #131b2e;
    --surface2: #1c273e;
    --surface3: #24324f;
    --border: rgba(255, 255, 255, 0.08);
    --border2: rgba(255, 255, 255, 0.16);
    --accent: #38bdf8;
    --accent2: #818cf8;
    --accent3: #34d399;
    --warn: #fbbf24;
    --danger: #f87171;
    --text: #f8fafc;
    --text2: #cbd5e1;
    --muted: #64748b;
    --muted2: #94a3b8;
    --sh: 0 4px 20px -2px rgba(0, 0, 0, 0.5);
    --sh-md: 0 10px 30px -4px rgba(0, 0, 0, 0.6);
    --sh-lg: 0 20px 40px -8px rgba(0, 0, 0, 0.8);
    --glow-accent: rgba(56, 189, 248, 0.15);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

#container {
    font-family: 'DM Sans', system-ui, -apple-system, sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    overflow-x: hidden;
}

#container::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: 
        radial-gradient(circle at 50% 0%, rgba(56, 189, 248, 0.05), transparent 70%),
        radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 100% 100%, 32px 32px;
    pointer-events: none;
    z-index: 0;
}

/* HEADER */
header {
    background: rgba(19, 27, 46, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 200;
    box-shadow: var(--sh);
}

.header-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 28px;
    max-width: 1680px;
    margin: 0 auto;
}

.logo {
    display: flex;
    align-items: center;
    gap: 12px;
}

.logo-icon {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    border-radius: 10px;
    box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
}

.logo-text {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 2px;
    background: linear-gradient(135deg, #fff 30%, var(--muted2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.logo-sub {
    font-size: 9px;
    color: var(--accent);
    letter-spacing: 2px;
    font-family: 'Space Mono', monospace;
}

.hdr-right {
    display: flex;
    align-items: center;
    gap: 12px;
}

.pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 14px;
    border-radius: 20px;
    border: 1px solid;
    font-size: 10px;
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    letter-spacing: 1px;
    backdrop-filter: blur(4px);
}

.pill-g {
    border-color: rgba(52, 211, 153, 0.3);
    color: var(--accent3);
    background: rgba(52, 211, 153, 0.1);
}

.pill-w {
    border-color: rgba(251, 191, 36, 0.3);
    color: var(--warn);
    background: rgba(251, 191, 36, 0.1);
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    animation: blink 2s infinite;
}

.dot-g { background: var(--accent3); box-shadow: 0 0 8px var(--accent3); }
.dot-w { background: var(--warn); box-shadow: 0 0 8px var(--warn); }

@keyframes blink {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.3; transform: scale(0.85); }
}

.clk {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--text2);
    background: var(--surface2);
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--border);
}

/* LAYOUT */
main {
    position: relative;
    z-index: 1;
    max-width: 1680px;
    margin: 0 auto;
    padding: 24px 28px;
}

.sec {
    font-size: 10px;
    letter-spacing: 2.5px;
    color: var(--muted2);
    text-transform: uppercase;
    font-family: 'Space Mono', monospace;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 12px;
}

.sec::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, var(--border), transparent);
}

@keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
}

/* KPI */
.kpi-row {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 14px;
    margin-bottom: 24px;
}

.kpi {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px;
    position: relative;
    overflow: hidden;
    box-shadow: var(--sh);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeUp 0.45s ease both;
}

.kpi:hover {
    transform: translateY(-3px);
    border-color: var(--border2);
    box-shadow: var(--sh-md), 0 0 20px var(--glow-accent);
}

.kpi::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--ka, var(--accent));
}

.kpi-lbl {
    font-size: 10px;
    color: var(--muted2);
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 8px;
    font-family: 'Space Mono', monospace;
}

.kpi-val {
    font-size: 28px;
    font-weight: 700;
    line-height: 1;
    color: var(--text);
    letter-spacing: -0.5px;
}

.kpi-unit {
    font-size: 10px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    margin-top: 4px;
}

.kpi-d {
    font-size: 10px;
    font-family: 'Space Mono', monospace;
    margin-top: 8px;
}

.up { color: var(--danger); }
.dn { color: var(--accent3); }
.st { color: var(--muted); }

/* GRIDS */
.g-main {
    display: grid;
    grid-template-columns: 1fr 1fr 370px;
    gap: 16px;
    margin-bottom: 16px;
}

.g-bot {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    margin-bottom: 16px;
}

/* CARD */
.card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 20px;
    box-shadow: var(--sh);
    animation: fadeUp 0.5s ease both;
    position: relative;
    overflow: visible;
}

.card-t {
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
}

.card-s {
    font-size: 10px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    margin-bottom: 14px;
}

.badge {
    font-size: 9px;
    padding: 3px 9px;
    border-radius: 6px;
    font-family: 'Space Mono', monospace;
    letter-spacing: 1px;
    font-weight: 700;
    border: 1px solid;
}

.b-ok {
    background: rgba(52, 211, 153, 0.1);
    color: var(--accent3);
    border-color: rgba(52, 211, 153, 0.3);
}

.b-warn {
    background: rgba(251, 191, 36, 0.1);
    color: var(--warn);
    border-color: rgba(251, 191, 36, 0.3);
}

.b-live {
    background: rgba(248, 113, 113, 0.1);
    color: var(--danger);
    border-color: rgba(248, 113, 113, 0.3);
}

.b-ml {
    background: rgba(129, 140, 248, 0.1);
    color: var(--accent2);
    border-color: rgba(129, 140, 248, 0.3);
}

/* AXIS TABS */
.atabs {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
}

.atab {
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 10px;
    font-weight: 700;
    cursor: pointer;
    border: 1px solid var(--border);
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    background: var(--surface2);
    transition: all 0.2s ease;
}

.atab:hover {
    border-color: var(--border2);
    color: var(--text);
}

.ax { background: rgba(56, 189, 248, 0.15); border-color: var(--accent); color: var(--accent); }
.ay { background: rgba(129, 140, 248, 0.15); border-color: var(--accent2); color: var(--accent2); }
.az { background: rgba(52, 211, 153, 0.15); border-color: var(--accent3); color: var(--accent3); }

/* PLOTLY OVERRIDES */
.plotly-chart {
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
}

/* PREDICTION CARD */
.pred-card {
    background: linear-gradient(160deg, var(--surface) 0%, #171d33 100%);
    border: 1px solid rgba(129, 140, 248, 0.25);
    border-radius: 16px;
    padding: 20px;
    box-shadow: var(--sh-md);
    animation: fadeUp 0.5s ease both;
    position: relative;
    overflow: visible;
}

.rul-box {
    text-align: center;
    padding: 14px;
    background: rgba(251, 191, 36, 0.05);
    border-radius: 12px;
    border: 1px solid rgba(251, 191, 36, 0.2);
    margin-bottom: 14px;
}

.rul-val {
    font-size: 36px;
    font-weight: 700;
    color: var(--warn);
    line-height: 1;
    text-shadow: 0 0 12px rgba(251, 191, 36, 0.3);
}

.rul-lbl {
    font-size: 9px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    letter-spacing: 2px;
    margin-top: 4px;
}

.rul-sub {
    font-size: 10px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
    margin-top: 4px;
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
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid var(--border);
    background: var(--surface2);
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
}

.fault-item:hover {
    border-color: var(--accent2);
    background: var(--surface3);
    transform: translateX(2px);
}

.fault-name {
    font-size: 12px;
    font-weight: 700;
}

.fault-sub {
    font-size: 9px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    margin-top: 2px;
}

.prob-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
}

.prob-track {
    width: 60px;
    height: 6px;
    background: var(--border);
    border-radius: 4px;
    overflow: hidden;
}

.prob-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 0.8s ease-out;
}

.prob-pct {
    font-size: 11px;
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    min-width: 32px;
    text-align: right;
}

.pred-info {
    font-size: 10px;
    font-family: 'Space Mono', monospace;
    color: var(--accent2);
    text-align: center;
    margin-top: 12px;
}

/* FAULT TOOLTIP */
.ftip {
    position: fixed;
    z-index: 9999;
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 14px;
    width: 320px;
    box-shadow: var(--sh-lg);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
    transform: translateY(6px);
    backdrop-filter: blur(16px);
}

.ftip.vis {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
}

.ft-head {
    padding: 14px;
    border-bottom: 1px solid var(--border);
    background: var(--surface2);
    border-radius: 14px 14px 0 0;
}

.ft-htitle {
    font-size: 14px;
    font-weight: 700;
    color: var(--text);
}

.ft-hsub {
    font-size: 10px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    margin-top: 2px;
}

.ft-body {
    padding: 14px;
}

.ft-sec {
    margin-bottom: 12px;
}

.ft-sec:last-child {
    margin-bottom: 0;
}

.ft-sec-t {
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    margin-bottom: 6px;
}

.ft-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
    font-size: 11px;
}

.ft-key {
    color: var(--muted2);
}

.ft-val {
    font-family: 'Space Mono', monospace;
    font-weight: 700;
}

.ft-formula {
    background: var(--surface2);
    border-radius: 8px;
    padding: 10px;
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--text2);
    line-height: 1.6;
    border: 1px solid var(--border);
    margin-top: 6px;
}

.ft-brow {
    margin-bottom: 6px;
}

.ft-blbl {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: var(--muted2);
    margin-bottom: 4px;
    font-family: 'Space Mono', monospace;
}

.ft-btrack {
    height: 6px;
    background: var(--border);
    border-radius: 3px;
    overflow: hidden;
}

.ft-bfill {
    height: 100%;
    border-radius: 3px;
    transition: width 0.5s ease;
}

.ft-foot {
    padding: 10px 14px;
    border-top: 1px solid var(--border);
    background: var(--surface2);
    border-radius: 0 0 14px 14px;
    font-size: 10px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
}

/* HEALTH RING */
.ring-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
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
    font-size: 9px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    letter-spacing: 1px;
    margin-top: 4px;
}

.gauge-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    width: 100%;
}

.g-item { text-align: center; }

.g-val {
    font-size: 14px;
    font-weight: 700;
}

.g-track {
    height: 6px;
    background: var(--border);
    border-radius: 3px;
    margin: 4px 0;
    overflow: hidden;
}

.g-fill {
    height: 100%;
    border-radius: 3px;
    transition: width 1s ease-out;
}

.g-lbl {
    font-size: 9px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
}

/* TEMP & NOISE */
.temp-big {
    font-size: 48px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -1px;
}

.noise-bar {
    height: 8px;
    background: linear-gradient(90deg, var(--accent3), var(--warn), var(--danger));
    border-radius: 4px;
    margin: 8px 0;
    position: relative;
}

.noise-pin {
    position: absolute;
    top: -4px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--text);
    border: 3px solid var(--surface);
    transform: translateX(-50%);
    transition: left 0.8s ease-out;
    box-shadow: 0 0 8px rgba(0,0,0,0.5);
}

.spark-row {
    display: flex;
    align-items: flex-end;
    gap: 3px;
    height: 36px;
    margin-top: 8px;
}

.spark-b {
    flex: 1;
    border-radius: 2px 2px 0 0;
}

/* EVENTS LOG */
.conn-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 14px;
}

.conn-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background: var(--surface2);
    border-radius: 8px;
    font-size: 11px;
    border: 1px solid var(--border);
}

.conn-name {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--muted2);
}

.ev-log {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-height: 150px;
    overflow-y: auto;
}

.ev-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 10px;
    border-radius: 8px;
    background: var(--surface2);
    border: 1px solid var(--border);
    border-left: 3px solid var(--accent);
    font-size: 11px;
}

.ev-time {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    color: var(--muted2);
    white-space: nowrap;
}

footer {
    border-top: 1px solid var(--border);
    padding: 16px 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    color: var(--muted2);
    font-family: 'Space Mono', monospace;
    max-width: 1680px;
    margin: 0 auto;
    background: var(--bg);
}

/* SCROLLBARS */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: var(--bg);
}

::-webkit-scrollbar-thumb {
    background: var(--surface3);
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--border2);
}

/* RESPONSIVE */
@media(max-width: 1200px) {
    .g-main { grid-template-columns: 1fr 1fr; }
    .kpi-row { grid-template-columns: repeat(3, 1fr); }
}

@media(max-width: 800px) {
    .g-main, .g-bot { grid-template-columns: 1fr; }
    .kpi-row { grid-template-columns: repeat(2, 1fr); }
}
