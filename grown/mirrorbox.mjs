// mirrorbox.mjs — the one shared mirror box for the 11-page walk.
// Dave's notation (verbatim, his MODEL): {{ plank envelope (white(black))=[gray] }} · 2^3^2^3 = 8 in a mirror box .|.|M|.|. ·
// {{ x : red . y : blue }} · {{ M x 7.5 degrees , new mirror }} · {{ State,Space,Time,Identity,Continuum }} = {{i}}
// Geometry (LIT): ideal infinite double-sided plane mirrors through one hinge; images = orbit under the two reflections.
// Colour (LIT): a 6504 K blackbody white carrier (D65's correlated colour temperature; not the tabulated D65 daylight SPD),
// relativistically Doppler-shifted: a blackbody at T seen with Doppler factor δ is a blackbody at δT. CIE 1931 2° via the page's cielib.
export const STEP = 7.5;
export function dots(s = 1) { const d = []; for (const x of [-3, -1, 1, 3]) for (const y of [-0.8, 0.8]) d.push([x * s, y * s]); return d; } // .|.|M|.|. read as 4 columns × 2 rows = 8
const refl = (p, a) => { const c = Math.cos(2 * a), s = Math.sin(2 * a); return [c * p[0] + s * p[1], s * p[0] - c * p[1]]; }; // across line through origin at angle a
export function mirrors(theta) { const m = Math.PI / 2; return [m, m + theta * Math.PI / 180]; } // M is vertical; new mirror = M rotated θ
export function images(p, theta) {
  const [a, b] = mirrors(theta), key = q => q.map(v => Math.round(v * 1e6)).join(','), seen = new Map([[key(p), p]]); let front = [p];
  for (let it = 0; it < 400 && front.length; it++) { const nx = []; for (const q of front) for (const L of [a, b]) { const r = refl(q, L), k = key(r); if (!seen.has(k)) { seen.set(k, r); nx.push(r); } } front = nx; }
  seen.delete(key(p)); return [...seen.values()];
}
export function doppler(beta, towards) { const g = 1 / Math.sqrt(1 - beta * beta); return towards ? g * (1 + beta) : 1 / (g * (1 + beta)); } // source moving along the line of sight
export function carrierCSS(delta) { return globalThis.xyz2css(globalThis.spec2xyz(globalThis.planck(6504 * delta)), 1); }
export function draw(cx, W, H, theta, beta) {
  cx.fillStyle = '#000'; cx.fillRect(0, 0, W, H);
  const S = Math.min(W * 0.55, H) / 2 - 10, cxp = W * 0.28, cyp = H / 2, sc = S / 7, P = q => [cxp + q[0] * sc, cyp - q[1] * sc];
  cx.strokeStyle = '#555'; cx.lineWidth = 1; cx.strokeRect(cxp - 4.5 * sc, cyp - 2 * sc, 9 * sc, 4 * sc); // gray envelope
  for (const x of [-2, 2]) { cx.beginPath(); cx.moveTo(...P([x, -2])); cx.lineTo(...P([x, 2])); cx.stroke(); } // the | bars
  let n = 0; for (const d of dots()) for (const q of images(d, theta)) { n++; const r = P(q); cx.fillStyle = 'rgba(160,160,160,.35)'; cx.fillRect(r[0] - 1, r[1] - 1, 2, 2); }
  mirrors(theta).forEach((a, i) => { cx.strokeStyle = i ? '#fff' : '#bbb'; cx.lineWidth = i ? 1.5 : 2; cx.beginPath(); cx.moveTo(cxp - Math.cos(a) * S, cyp + Math.sin(a) * S); cx.lineTo(cxp + Math.cos(a) * S, cyp - Math.sin(a) * S); cx.stroke(); });
  for (const d of dots()) { const r = P(d); cx.fillStyle = '#fff'; cx.beginPath(); cx.arc(r[0], r[1], 6, 0, 7); cx.fill(); cx.fillStyle = '#000'; cx.beginPath(); cx.arc(r[0], r[1], 2.2, 0, 7); cx.fill(); }
  const dR = doppler(beta, false), dB = doppler(beta, true), x0 = W * 0.6;
  [[dR, 'front · x', 0.25], [dB, 'back · y', 0.68]].forEach(([dl, lab, fy]) => { const y = H * fy; cx.fillStyle = '#888'; cx.font = '13px ui-monospace,monospace'; cx.fillText(lab + ' · δ = ' + dl.toFixed(3) + ' · carrier ' + Math.round(6504 * dl) + ' K', x0, y - 30);
    const col = carrierCSS(dl), xs = []; for (const d of dots()) { xs.push([d[0], 1]); for (const q of images(d, theta)) xs.push([q[0], 0.25]); }
    xs.forEach(([x, a]) => { cx.globalAlpha = a; cx.fillStyle = col; cx.beginPath(); cx.arc(x0 + 160 + (lab[0] === 'b' ? -x : x) * 18, y, a === 1 ? 7 : 3, 0, 7); cx.fill(); }); cx.globalAlpha = 1; });
  return { images: n, perDot: n / 8, dR, dB };
}
