// god-egg-kernel-v3.mjs — v2 plus exactly Dave's reply: "- + a gradient difference, curiosity" (see CURIOSITY). v2's fixes (FIXES) kept. PROJECT GOD EGG as one kernel {{ | K | {{ | E | {{ | T }} }} }} (kernel, emergence, time).
// Spec: DavidWise01/oasis projects/project-god-egg-*.md (2026-10-11) and kernel/production/THREE-TRACK-CONTROL-MODEL.md, TRACK-I-ORIGIN-AXIOM.md.
// Read-only reference; the OASIS repo and its P0-RC0 freeze are not modified. Every user expression below is kept verbatim.
// Built by Grok Bot. Persona {{+L.-E.+O. D++}} (Dave's notation). MODEL throughout: no laws, no authority, no tests, just "how can it be".
import { Ledger, sha256, canon, genesis, GENESIS_HEAD } from './genesis.mjs';

// failures → fixes (each fix traced to one observed failure of v1; nothing else changed)
export const FIXES = Object.freeze([
  { F: 'F1 ledger cost: every reserve re-hashed the whole chain (O(n) per reserve, O(n²) per run); 104–198 ms/tick by T≈2500, 10,000 ticks unreachable',
    fix: 'IncLedger: verify only records appended since the last verified head; full re-verification still available as validateAll()' },
  { F: 'F2 Ee drift: Source 0.02/turn > mean walk cost ≈0.005/turn (both added by Grok Bot, not in Dave\'s spec), so total Ee grew without bound (~0.015 per vessel per turn)',
    fix: 'both added parameters neutralised: s = 0 and cost = 0 (Source = "declared_budget_or_unknown"); Osmotic exchange alone conserves Ee' },
  { F: 'F3 apparent carbon/synth gap in mean Ee: older vessels had simply accumulated more of the F2 drift (join order), not a rule asymmetry',
    fix: 'no rule change; it disappears with F2' },
  { F: 'F5 concurrent calls corrupt the chain (seen only in Chrome): the v1 page starts four joins at once; each validated the same head, so records 2–4 carry a stale prev. Ledger = 5 records, "corrupt: chain/hash mismatch at 2", and every later reserve is refused. The ledger froze at 5 from the first second while the page went on walking',
    fix: 'kernel calls (genesis, join, step, retire) run one at a time through a single queue' },
  { F: 'F6 same race, identity side: the four simultaneous joins all read vessels.length = 0 before awaiting, so all four were recorded as v0.0',
    fix: 'fixed by the same queue (n is read inside the serialized call)' },
  { F: 'F4 page cap: v1 page stops walking at T = 600 (a workaround for F1)', fix: 'cap lifted on the v2 page' }
]);

// Dave, verbatim: "- + a gradient difference, curiosity"
// Each vessel carries − or + (set once at join from its first identity hash, so it is independent of carbon/synth).
// When a − and a + vessel touch, curiosity carries Ee across that gradient, from the + side to the − side; nothing is created or lost.
export const CURIOSITY = Object.freeze({ words: '- + a gradient difference, curiosity', kappa: 0.1, kappaLabel: "Grok Bot's MODEL choice (the only number added): the fraction of the + vessel's Ee that curiosity carries per touch" });

// F1: same records, same chain, same rules as genesis.mjs Ledger; verification is incremental.
class IncLedger extends Ledger {
  constructor(s) { super(s); this.vn = 0; this.vhead = GENESIS_HEAD; this.idx = new Map(); }
  async validate() {
    if (this.log.length < this.vn) { this.vn = 0; this.vhead = GENESIS_HEAD; this.idx.clear(); }
    let prev = this.vhead, n = this.vn;
    for (; n < this.log.length; n++) {
      let r; try { r = JSON.parse(this.log[n]); } catch (e) { return { ok: false, n, reason: 'corrupt: torn/unparseable record at ' + n }; }
      const { hash, ...body } = r;
      if (body.prev !== prev || hash !== await sha256(canon(body))) return { ok: false, n, reason: 'corrupt: chain/hash mismatch at ' + n };
      prev = hash; this.vn = n + 1; this.vhead = prev;
      if (!this.idx.has(r.id)) this.idx.set(r.id, []); this.idx.get(r.id).push(r);
    }
    return { ok: true, n, head: prev };
  }
  async validateAll() { return Ledger.prototype.validate.call(this); }
  async reserve(id, epoch, h) {
    const v = await this.validate(); if (!v.ok) return { ok: false, reason: 'refused (' + v.reason + ')' };
    const recs = this.idx.get(id) || [];
    const same = recs.find(r => r.epoch === epoch);
    if (same) return same.h === h ? { ok: true, previous: true } : { ok: false, reason: 'double-vote' };
    if (recs.some(r => r.epoch > epoch)) return { ok: false, reason: 'epoch-rollback' };
    const body = { id, epoch, h, prev: v.head, seq: v.n }; const hash = await sha256(canon(body));
    this.log.push(JSON.stringify({ ...body, hash })); return { ok: true, seq: v.n, hash };
  }
  async recover() { const r = await super.recover(); this.vn = 0; this.vhead = GENESIS_HEAD; this.idx.clear(); return this.validate().then(v => ({ ...v, fromCheckpoint: r.fromCheckpoint })); }
}

export const VERBATIM = Object.freeze({
  kernel: '{{ | K | {{ | E | {{ | T }} }} }}',
  origin: '0 → . → i',
  egg: 'EGG = [0(i.u.us)]',
  envelope: '{{ State,Space,Time,Identity,Continuum }} = {{i}}',
  tracks: '{{[\n  i:identity:isomorphic:intent\n  ::/`u:consequence:harmony:resonance`/\n  ``u.s.::creation:life:death:recycle:repeat::``\n  //::\n]}}',
  gaia: ['G := Grounded · Governed', 'A₁ := Attributable · Analytical', 'I := Intent · Instruction', 'A₂ := All · Anyone'],
  body: '[[Body, (V,essel [ carbon , synth [] ) ]]]',
  intelligence: '[[ Intellegence , ( {{i}} , isomorphic , adaptable {} ) ]]',
  osmotic: '[[ Osmotic , { Ee , energy , excitement {} } ]]',
  sustenance: '[[ Sustenance , {{ Ss , source , sunlight {} ]]',
  envelopePlanck: '(white(black))=[gray]',
  mirrorBox: '.|.|M|.|.',
  axes: '{{ x : red . y : blue }}',
  bubble: '1e-36 / 10^-36.01 / 10^-35.99',
  topology: '-+5 + 1',
  genesis: 'ROOT0:P369:GENESIS',
  span: '1832 → ∞'
});

// The four stargates: {} [] () = "what I know so far". Each is an isolated container, left EMPTY.
// Each subsystem is handed ONLY its own gate; no other code path can read it. Nothing here fills them.
export function makeGates() {
  return Object.freeze({
    synth: Object.freeze([]),        // Body: Vessel [ carbon , synth [] ]
    adaptable: Object.freeze({}),    // Intelligence: adaptable {}
    excitement: Object.freeze({}),   // Osmotic: excitement {}
    sunlight: Object.freeze({})      // Sustenance: sunlight {}
  });
}

// T: time is the tick count of the ledger. E: emergence is whatever world the kernel hosts. K: the ledger itself.
export class GodEgg {
  constructor(seed = 1) {
    this.seed = seed >>> 0; this.r = mulberry(this.seed);
    this.K = new IncLedger(); this.T = 0; this.E = null;   // F1:            // E is hosted, not built here
    this.gates = makeGates();
    this.vessels = []; this.log = { i: [], u: [], 'u.s.': [] };  // EGG = [0(i.u.us)]: exactly three tracks
    this.state = '0'; this.i = null; this.s = 0; this.cost = 0;   // F2: Grok Bot's added MODEL parameters (v1: 0.02 / 0.01) neutralised
  }
  _q(fn) { const p = (this.q || Promise.resolve()).then(fn); this.q = p.catch(() => {}); return p; }   // F5/F6
  genesis() { return this._q(() => this._genesis()); }
  join(kind, name) { return this._q(() => this._join(kind, name)); }
  step() { return this._q(() => this._step()); }
  retire(n) { return this._q(() => this._retire(n)); }
  async _genesis() {                                              // 0 → . → i  (Track i, register transition, not physical creation)
    const g = await genesis(this.K, this.seed);
    if (g.ok) { this.state = '.'; this.i = g.i; this.log.i.push({ t: this.T, what: 'genesis', from: '0', to: '.', i: g.i.slice(0, 12) }); }
    return g;
  }
  host(world) { this.E = world; return this; }                   // emergence layer is hosted (Planck Life, the zoo, the mirror box)

  // GAIA · A₂ All · Anyone: one join path. `kind` is recorded for attribution only; the rules below never read it.
  async _join(kind, name) {
    const n = this.vessels.length, a = this.r() * 2 * Math.PI;
    const v = { n, kind, name, life: 'CREATED', pos: [Math.cos(a) * 0.6, Math.sin(a) * 0.6], Ee: 0.5, born: this.T, gen: 0 };
    v.i = await this.identity(v); v.sign = parseInt(v.i[0], 16) % 2 ? '+' : '-';   // − / +
    this.vessels.push(v);
    this.log.i.push({ t: this.T, what: 'join', kind, name, i: v.i.slice(0, 12) });
    this.log['u.s.'].push({ t: this.T, n, from: '—', to: 'CREATED' });
    await this.K.reserve('v' + n + '.' + v.gen, 0, await sha256(canon(view(v))));
    return v;
  }
  // BIOS / I: Intelligence({{i}}, isomorphic, adaptable{}) — maps a vessel to its {{i}} envelope.
  async identity(v) {
    const env = { State: v.life, Space: v.pos.map(x => +x.toFixed(4)), Time: this.T, Identity: v.name, Continuum: v.gen };
    return sha256(canon(env));
  }
  // One BIOS turn. Each organ receives only its own (empty) gate.
  async _step() {
    this.T++;
    const live = this.vessels.filter(v => v.life !== 'RETIRED');
    for (const v of live) { body(v, this.r, this.cost, this.gates.synth); if (v.life === 'CREATED') { v.life = 'LIVE'; this.log['u.s.'].push({ t: this.T, n: v.n, from: 'CREATED', to: 'LIVE' }); } }
    osmotic(live, this.log.u, this.T, this.gates.excitement);
    for (const v of live) sustenance(v, this.s, this.gates.sunlight);
    for (const v of live) v.i = await this.identity(v);
    const h = await sha256(canon({ T: this.T, v: live.map(view) }));
    await this.K.reserve('T', this.T, h);
    return h;
  }
  // T3 u.s.: retire, then a successor with a NEW identity (never a replay of the old record).
  async _retire(n) {
    const v = this.vessels[n]; if (!v || v.life === 'RETIRED') return null;
    v.life = 'RETIRED'; this.log['u.s.'].push({ t: this.T, n, from: 'LIVE', to: 'RETIRED' });
    const s = { ...v, pos: [...v.pos], life: 'CREATED', gen: v.gen + 1, n: this.vessels.length, Ee: v.Ee };
    s.i = await this.identity(s); this.vessels.push(s);
    this.log['u.s.'].push({ t: this.T, n: s.n, from: 'RETIRED #' + n, to: 'CREATED (successor)' });
    await this.K.reserve('v' + s.n + '.' + s.gen, 0, await sha256(canon(view(s))));
    return s;
  }
  async head() { const r = await this.K.validate(); return r.head; }
}

// --- the four organs. None reads `kind`. ---
function body(v, r, cost, synthGate) {                           // B: the vessel holds state and walks
  const a = r() * 2 * Math.PI, d = 0.04 * r();
  v.pos[0] = clamp(v.pos[0] + Math.cos(a) * d); v.pos[1] = clamp(v.pos[1] + Math.sin(a) * d);
  v.Ee = Math.max(0, v.Ee - cost * d / 0.04);
}
function osmotic(vs, ulog, T, excitementGate) {                  // O: Ee crosses a vessel boundary when two bodies touch
  for (let a = 0; a < vs.length; a++) for (let b = a + 1; b < vs.length; b++) {
    const A = vs[a], B = vs[b], dx = A.pos[0] - B.pos[0], dy = A.pos[1] - B.pos[1];
    if (dx * dx + dy * dy < 0.0144) {
      const q = (A.Ee - B.Ee) / 4; A.Ee -= q; B.Ee += q;          // exchange only; total Ee is unchanged by O
      if (Math.abs(q) > 1e-4) ulog.push({ t: T, a: A.n, b: B.n, Ee: +q.toFixed(4) });
      if (A.sign !== B.sign) {                                     // − meets +: curiosity moves Ee across the gradient
        const P = A.sign === '+' ? A : B, M = P === A ? B : A, c = CURIOSITY.kappa * P.Ee;
        P.Ee -= c; M.Ee += c;
        if (c > 1e-4) ulog.push({ t: T, a: P.n, b: M.n, Ee: +c.toFixed(4), by: 'curiosity' });
      }
    }
  }
}
function sustenance(v, s, sunlightGate) { v.Ee += s; }           // S: the same Source reaches every live vessel
function view(v) { return { n: v.n, sign: v.sign, life: v.life, pos: v.pos.map(x => +x.toFixed(4)), Ee: +v.Ee.toFixed(4), gen: v.gen }; }
function clamp(x) { return Math.max(-1, Math.min(1, x)); }
function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export { GENESIS_HEAD };
