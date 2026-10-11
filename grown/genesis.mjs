// genesis.mjs — Track i: 0 -> . -> i as a testable, append-only genesis transition.
// "from nothing comes something" is Dave's symbolic MODEL (see OASIS TRACK-I-ORIGIN-AXIOM.md); this is a state-register transition, not physical creation.
export const GENESIS_HEAD = 'ROOT0:P369:GENESIS';
const te = new TextEncoder();
export async function sha256(s) { const b = await crypto.subtle.digest('SHA-256', te.encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
export function canon(v) { if (Array.isArray(v)) return '[' + v.map(canon).join(',') + ']'; if (v && typeof v === 'object') return '{' + Object.keys(v).sort().map(k => JSON.stringify(k) + ':' + canon(v[k])).join(',') + '}'; return JSON.stringify(v); }
// Ledger over a storage array of serialized lines (simulates an append-only file). Hash-chained.
export class Ledger {
  constructor(storage = []) { this.log = storage; this.cp = null; }
  async validate() {
    let prev = GENESIS_HEAD, n = 0;
    for (const line of this.log) {
      let r; try { r = JSON.parse(line); } catch (e) { return { ok: false, n, reason: 'corrupt: torn/unparseable record at ' + n }; }
      const { hash, ...body } = r;
      if (body.prev !== prev || hash !== await sha256(canon(body))) return { ok: false, n, reason: 'corrupt: chain/hash mismatch at ' + n };
      prev = hash; n++;
    }
    return { ok: true, n, head: prev };
  }
  async reserve(id, epoch, h) {
    const v = await this.validate(); if (!v.ok) return { ok: false, reason: 'refused (' + v.reason + ')' };
    const recs = this.log.map(l => JSON.parse(l)).filter(r => r.id === id);
    const same = recs.find(r => r.epoch === epoch);
    if (same) return same.h === h ? { ok: true, previous: true } : { ok: false, reason: 'double-vote' };
    if (recs.some(r => r.epoch > epoch)) return { ok: false, reason: 'epoch-rollback' };
    const body = { id, epoch, h, prev: v.head, seq: v.n }; const hash = await sha256(canon(body));
    this.log.push(JSON.stringify({ ...body, hash })); return { ok: true, seq: v.n, hash };
  }
  async checkpoint() { const v = await this.validate(); if (v.ok) this.cp = { n: v.n, head: v.head }; return this.cp; }
  async recover() { if (!this.cp) { this.log.length = 0; } else this.log.length = this.cp.n; const v = await this.validate(); return { ...v, fromCheckpoint: this.cp }; }
}
// state register: '0' until an authorized genesis is durably appended, then '.', identity i.
export async function genesis(L, seed, { authorized = true, nonce = 'n0' } = {}) {
  if (!authorized) return { ok: false, state: '0', reason: 'denied: unauthorized' };
  const prov = canon({ epoch: 0, head: GENESIS_HEAD, seed });
  const i = await sha256(prov);
  const r = await L.reserve('genesis', 0, await sha256(canon({ i, nonce })));
  if (!r.ok) return { ok: false, state: '0', reason: r.reason, i };
  return { ok: true, state: '.', i, prov, idempotent: !!r.previous, seq: r.seq };
}
