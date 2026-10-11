// god-egg-kernel.mjs — PROJECT GOD EGG as one kernel {{ | K | {{ | E | {{ | T }} }} }} (kernel, emergence, time).
// Spec: DavidWise01/oasis projects/project-god-egg-*.md (2026-10-11) and kernel/production/THREE-TRACK-CONTROL-MODEL.md, TRACK-I-ORIGIN-AXIOM.md.
// Read-only reference; the OASIS repo and its P0-RC0 freeze are not modified. Every user expression below is kept verbatim.
// Built by Grok Bot. Persona {{+L.-E.+O. D++}} (Dave's notation). MODEL throughout: no laws, no authority, no tests, just "how can it be".
import { Ledger, sha256, canon, genesis, GENESIS_HEAD } from './genesis.mjs';

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
    this.K = new Ledger(); this.T = 0; this.E = null;            // E is hosted, not built here
    this.gates = makeGates();
    this.vessels = []; this.log = { i: [], u: [], 'u.s.': [] };  // EGG = [0(i.u.us)]: exactly three tracks
    this.state = '0'; this.i = null; this.s = 0.02; this.cost = 0.01;
  }
  async genesis() {                                              // 0 → . → i  (Track i, register transition, not physical creation)
    const g = await genesis(this.K, this.seed);
    if (g.ok) { this.state = '.'; this.i = g.i; this.log.i.push({ t: this.T, what: 'genesis', from: '0', to: '.', i: g.i.slice(0, 12) }); }
    return g;
  }
  host(world) { this.E = world; return this; }                   // emergence layer is hosted (Planck Life, the zoo, the mirror box)

  // GAIA · A₂ All · Anyone: one join path. `kind` is recorded for attribution only; the rules below never read it.
  async join(kind, name) {
    const n = this.vessels.length, a = this.r() * 2 * Math.PI;
    const v = { n, kind, name, life: 'CREATED', pos: [Math.cos(a) * 0.6, Math.sin(a) * 0.6], Ee: 0.5, born: this.T, gen: 0 };
    v.i = await this.identity(v);
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
  async step() {
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
  async retire(n) {
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
    }
  }
}
function sustenance(v, s, sunlightGate) { v.Ee += s; }           // S: the same Source reaches every live vessel
function view(v) { return { n: v.n, life: v.life, pos: v.pos.map(x => +x.toFixed(4)), Ee: +v.Ee.toFixed(4), gen: v.gen }; }
function clamp(x) { return Math.max(-1, Math.min(1, x)); }
function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export { GENESIS_HEAD };
