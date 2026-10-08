// Replace your existing latestVal & parseXY helper functions with these:

function parseXY(series) {
  if (!series || series.length === 0) return { xs: [], ys: [] };
  
  // Sort series chronologically by timestamp (entry[0]) just in case data arrives out of order
  const sorted = [...series].sort((a, b) => {
    const tA = Array.isArray(a) ? a[0] : (a.timestamp || a.x || 0);
    const tB = Array.isArray(b) ? b[0] : (b.timestamp || b.x || 0);
    return tA - tB;
  });

  const first = sorted[0];
  if (typeof first === 'number') {
    return { xs: sorted.map((_, i) => i), ys: sorted };
  }
  if (Array.isArray(first)) {
    return { xs: sorted.map(d => new Date(d[0])), ys: sorted.map(d => d[1]) };
  }
  if (first && 'x' in first && 'y' in first) {
    return { xs: sorted.map(d => new Date(d.x)), ys: sorted.map(d => d.y) };
  }
  if (first && 'timestamp' in first) {
    return { xs: sorted.map(d => new Date(d.timestamp)), ys: sorted.map(d => d.value) };
  }
  return { xs: [], ys: [] };
}

function latestVal(name) {
  const s = getSeries(name);
  if (!s || s.length === 0) return null;
  
  const { ys } = parseXY(s);
  if (!ys || ys.length === 0) return null;
  
  // Always returns the latest incoming value (last element in sorted array)
  const lastValue = ys[ys.length - 1];
  
  // Convert string numbers to float if applicable
  return (lastValue !== null && lastValue !== undefined) ? Number(lastValue) : null;
}
