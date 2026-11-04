.hc {
  --red: #d63a3a; --ink: #0f1b3d;
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px 15px;
  padding: 10px 20px; box-sizing: border-box;
  background: #fff; border-top: 3px solid var(--red); border-bottom: 1px solid #e3e8f2;
  color: var(--ink); overflow: hidden;
  font-family: 'Plus Jakarta Sans','Segoe UI',Roboto,sans-serif;
}
.hc *, .hc *::before, .hc *::after { box-sizing: border-box; }

.hc-left { display: flex; align-items: center; gap: .9rem; min-width: 0; }
.hc-logo {
  background: #fff; color: #c8102e; font-weight: 900; font-style: italic;
  border: .15rem solid #c8102e; border-radius: .5rem; padding: .25rem .6rem;
  line-height: 1.05; font-size: .8rem; text-align: center; flex: none;
}
.hc-title {
  margin: 0; font-size: 1.9rem; font-weight: 700; color: #0e2a5c; line-height: 1.15;
  letter-spacing: -.02em; display: flex; align-items: flex-start; gap: .35rem;
  white-space: nowrap;
}
.hc-title::after {
  content: ""; width: .4rem; height: .4rem; margin-top: .55rem; flex: none;
  background: var(--red); border-radius: 2px;
}

.hc-pills { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.hc-pill {
  display: flex; align-items: center; gap: 7px; white-space: nowrap;
  padding: 7px 14px; font-size: 14px; font-weight: 600;
  background: #fff; border: 1px solid #dfe5f1; border-radius: 30px;
}
.hc-pill .dot { width: 8px; height: 8px; border-radius: 50%; background: currentColor; }
.hc-pill.ok   { background: #e3f6ea; border-color: #e3f6ea; color: #1f7a45; }
.hc-pill.bad  { background: #fde6e6; border-color: #fde6e6; color: #c62828; }
.hc-pill.demo { background: #fdeed8; border-color: #fdeed8; color: #b8690f; }
.hc-pill.live { color: #1f7a45; }
.hc-pill.live .dot { background: #1f8f4e; }
.hc-pill.live.off { color: #c62828; }
.hc-pill.live.off .dot { background: #d63a3a; }
.hc-pill.mono { font-family: 'JetBrains Mono','Roboto Mono',Consolas,monospace; }

@media (max-width: 760px) {
  .hc { padding: 8px 12px; }
  .hc-title { font-size: 20px; }
  .hc-pills { gap: 4px; }
  .hc-pill { font-size: 12px; padding: 6px 10px; }
}
