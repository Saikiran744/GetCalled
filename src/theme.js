// ─── Shared design tokens (exact spec, used across Homepage + Assessment) ──

export const C = {
  bg: '#0B0D12',
  surface: '#13161F',
  border: '#242938',
  barBg: '#20242F',
  text: '#E7E9EE',
  muted: '#7C8493',
  blue: '#5B8DEF',
  amber: '#E8A33D',
  green: '#4FBF83',
  red: '#E5484D',
};

export const FONTS = {
  '--font-heading': "'JetBrains Mono', ui-monospace, monospace",
  '--font-sans': "'Inter', system-ui, -apple-system, sans-serif",
};

export const FONT_IMPORT_URL =
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap";

export function statusForScore(pct) {
  if (pct >= 70) return 'PASS';
  if (pct >= 40) return 'WARN';
  return 'RISK';
}

export function colorForStatus(status) {
  if (status === 'PASS') return C.green;
  if (status === 'WARN') return C.amber;
  return C.red;
}
