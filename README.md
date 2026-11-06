.hc {
  --red: #d63a3a;
  --ink: #0f1b3d;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: center;
  gap: clamp(4px, 0.8vw, 12px) clamp(8px, 1.2vw, 16px);
  padding: clamp(6px, 0.8vw, 10px) clamp(10px, 1.6vw, 24px);
  box-sizing: border-box;
  background: linear-gradient(180deg, #ffffff 0%, #f9fbfe 100%);
  border-top: 3px solid var(--red);
  border-bottom: 1px solid #e3e8f2;
  box-shadow: 0 2px 10px rgba(15, 27, 61, .06);
  color: var(--ink);
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', 'Segoe UI', Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
}

.hc *,
.hc *::before,
.hc *::after {
  box-sizing: border-box;
}

/* LEFT: logo + title */
.hc-left {
  display: flex;
  align-items: center;
  gap: clamp(8px, 1vw, 16px);
  min-width: 0;
  flex: 1 1 auto;
}

.hc-left img,
.hc img {
  height: clamp(32px, 3.4vw, 58px);
  width: auto;
  max-width: 35vw;
  object-fit: contain;
  display: block;
  flex: none;
}

.hc-logo {
  background: #fff;
  color: #c8102e;
  font-weight: 900;
  font-style: italic;
  border: 2px solid #c8102e;
  border-radius: 8px;
  padding: 4px 10px;
  line-height: 1.05;
  font-size: clamp(10px, 0.5vw + 7px, 13px);
  text-align: center;
  flex: none;
  box-shadow: 0 2px 6px rgba(200, 16, 46, .12);
}

.hc-title {
  margin: 0;
  font-size: clamp(14px, 1.2vw + 8px, 30px);
  font-weight: 700;
  color: #0e2a5c;
  line-height: 1.15;
  letter-spacing: -.02em;
  display: flex;
  align-items: flex-start;
  gap: .35em;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: clamp(8px, 1vw, 16px);
  border-left: 1px solid #e3e8f2;
}

.hc-title::after {
  content: "";
  width: .3em;
  height: .3em;
  margin-top: .3em;
  flex: none;
  background: var(--red);
  border-radius: 2px;
}

/* RIGHT: status pills */
.hc-pills {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: clamp(4px, 0.6vw, 8px);
  flex-wrap: wrap;
  margin-left: auto;
}

.hc-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  padding: clamp(3px, 0.4vw, 7px) clamp(8px, 0.9vw, 14px);
  font-size: clamp(10.5px, 0.35vw + 7.5px, 14px);
  font-weight: 600;
  background: #fff;
  border: 1px solid #dfe5f1;
  border-radius: 30px;
  transition: transform .2s, box-shadow .2s;
}

.hc-pill:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(15, 27, 61, .10);
}

.hc-pill .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  flex: none;
}

.hc-pill.ok {
  background: #e3f6ea;
  border-color: #c6ecd5;
  color: #1f7a45;
}

.hc-pill.bad {
  background: #fde6e6;
  border-color: #f8caca;
  color: #c62828;
}

.hc-pill.demo {
  background: #fdeed8;
  border-color: #f8dcb2;
  color: #b8690f;
}

.hc-pill.live {
  color: #1f7a45;
}

.hc-pill.live .dot {
  background: #1f8f4e;
  box-shadow: 0 0 0 3px rgba(31, 143, 78, .2);
  animation: hcBlink 1.6s infinite;
}

.hc-pill.live.off {
  color: #c62828;
}

.hc-pill.live.off .dot {
  background: #d63a3a;
  box-shadow: 0 0 0 3px rgba(214, 58, 58, .2);
  animation: none;
}

.hc-pill.mono {
  font-family: 'JetBrains Mono', 'Roboto Mono', Consolas, monospace;
  background: #0f1b3d;
  border-color: #0f1b3d;
  color: #ffffff;
}

@keyframes hcBlink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: .35;
  }
}
