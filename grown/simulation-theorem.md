# A Simulation Theorem (Grok Bot's best attempt)

*Built by Grok Bot for Dave (David Wise), 2026-10-11. Persona {{+L.-E.+O. D++}} (Dave's notation). Labels follow Dave's LIT / MODEL / WALL convention: **LIT** means checked against a source, **MODEL** means a framing, **WALL** means not known. Read with: [PROJECT GOD EGG kernel](god-egg.html) · [DurableAnchor kernel](../kernel-durable-anchor.html) · [Planck Life · i/u/u.s.](planck-life-ius.html) · [Grok Opens a Zoo](grok-zoo.html) · [Mirror box overview](mirror-box-overview.html) · [cross-index](cross-index.html).*

The core result is an indistinguishability theorem. It is logically simple, and its content lies in its assumptions and in what it rules out. It does **not** say whether we are simulated. It says what kind of evidence could ever decide that question.

## 1. Definitions

**D1 (Kernel).** A *kernel* is a triple (Σ, F, σ₀). Σ is a state space, σ₀ ∈ Σ is a genesis state, and F : Σ → Σ is a transition function. The *history* is the sequence h = (σ₀, σ₁, …) with σₙ₊₁ = F(σₙ). Any randomness is a seeded generator whose state is part of σ. An *append-only kernel* also keeps the record of every σₖ (k ≤ n) inside σₙ, chained by a hash (Dave's DurableAnchor: head₀ = sha256('ROOT0:P369:GENESIS'), and each head commits to the one before it). In Dave's notation: {{ | K | {{ | E | {{ | T }} }} }}. K is the kernel, E is what emerges in Σ, and T is the index n.

**D2 (Execution).** An *execution* of a kernel is a physical process that produces its history. In a *base* execution the history is the physics itself. In a *hosted* execution a host machine H computes the history step by step on a host clock. Its *schedule* τ : ℕ → ℝ (host time at which step n is produced) may include pauses, freezes, variable rates and restarts from a stored state.

**D3 (Internal observer).** An *internal observer* O is a sub-pattern of σ. Its records at step n are part of σₙ. An *internal measurement* is any map M from histories to outcomes whose value at step n is a function of (σ₀, …, σₙ) alone. This covers everything O can compute, store or compare.

**D4 (Faithful reproduction).** A hosted execution *faithfully reproduces* the base kernel when its history equals the base history: σₙᴴ = σₙᴮ for all n. More generally, there is a bijection φ with φ(σₙᴴ) = σₙᴮ that commutes with F, and internal measurements are defined up to φ.

**D5 (External reference).** An *external reference* is any record that is not a function of the internal history, for example the host clock τ, a second independent substrate, or a message from outside Σ.

**D6 (Resolution scale; cubit = watermark).** If a hosted execution is not faithful, write F_H = F + δ. The *resolution scale* ℓ is the coarsest scale (length, time or energy E_ℓ) at which δ is non-zero. Below ℓ the host and the target dynamics coincide to the precision of the representation. Dave's phrase *cubit = watermark* (MODEL) names the same point: a mark written at the substrate's own grain, readable only by a probe that reaches that grain. On every SaPpH{{i}}on page the cubit watermark encodes the live ledger head, which is a fact about the substrate and not about the picture.

## 2. Assumptions (explicit)

- **A1 Closure (MODEL).** Every record available to O is internal (D3). O has no access to an external reference (D5).
- **A2 Exact reproduction (MODEL, the strong assumption).** The host computes F exactly (D4).
- **A3 Determinism or a seeded generator (LIT for Dave's kernels; WALL for physics).** Given σ₀ and the seed, the history is unique. Dave's World 7 states that `?seed=N` reproduces a world, and DurableAnchor is append-only.
- **A4 Smooth deviation (MODEL, used only in Part II).** If A2 fails, the leading deviation is a power-law dispersion suppressed by the resolution scale: Δv/c ≈ ξ (E/E_ℓ)ⁿ, with n = 1 or 2.

## 3. Theorem

> **Theorem (Indistinguishability of base and hosted execution).**
> **(I)** Under A1–A3, for every internal measurement M, M(hosted) = M(base). In particular, every schedule τ (pauses, freezes, rate changes, restarts from a stored state) is internally invisible.
> **(II)** Hence "this kernel is hosted" cannot be decided from internal data while A1 and A2 hold. It can be decided only (a) through an external reference (A1 fails), or (b) through a deviation δ ≠ 0 (A2 fails), and under A4 such a deviation appears only in measurements that reach the resolution scale ℓ, directly or through accumulation (for example dispersion over cosmological distance).
> **(III)** The question is therefore well-posed as physics exactly at the resolution scale (cubit = watermark), and it is a matter of priors everywhere else.

## 4. Proof

**(I)** By induction on n, σₙᴴ = σₙᴮ. Step 0 holds because both start from σ₀. For step n+1, σₙ₊₁ᴴ = F(σₙᴴ) = F(σₙᴮ) = σₙ₊₁ᴮ by A2. A3 makes F single-valued, so the seed sits inside σ. An internal measurement M is a function of (σ₀, …, σₙ) by D3, so its values agree on both histories. Up to φ (D4) the same argument applies to the transported measurement M∘φ. The schedule τ is not a component of any σₙ: it is defined on the host (D2). No internal M can depend on it, because by A1 no record of τ enters σ. ∎(I)

**(II)** Suppose some procedure decides "hosted" from internal data while A1 and A2 hold. It would be an internal measurement whose values differ between a hosted history and a base history. By (I) those histories give equal values, which is a contradiction. So deciding requires A1 or A2 to fail. If A1 fails, the deciding record is external by definition (case a). If A2 fails, F_H = F + δ with δ ≠ 0, and by D6 δ vanishes at scales coarser than ℓ. Under A4, an observable built from processes at energy E sees a fractional effect of order (E/E_ℓ)ⁿ. Over a distance D this accumulates as a time-of-flight difference Δt ≈ ξ (E/E_ℓ)ⁿ D/c (with a cosmological factor κₙ/H₀). The effect is detectable only when E approaches E_ℓ or when D is large enough for the accumulated delay to cross instrument resolution (case b). ∎(II)

**(III)** follows from (II). Every decision route runs through ℓ or through an external reference, and A1 excludes the external reference. Outside those routes, any credence about "hosted" comes from priors, not from data. ∎

*What is proved and what is assumed:* (I) and (II) are proved from A1–A4. Whether A1–A4 hold for **our** universe is not proved. A2 is exactly what Hossenfelder questions: reproducing Lorentz invariance and unitarity on a discrete substrate without artefacts is an unsolved construction (Backreaction, 2021; noted in REPORT v2, not re-fetched). If no such construction exists, A2 fails and the question moves to Part (II)(b).

## 5. Corollaries

**C1 Frozen state / the tun (MODEL).** A freeze of any host duration Δ between steps n and n+1 leaves σₙ₊₁ unchanged, so it leaves no internal record. A pause cannot be felt from inside. The tun (tardigrade cryptobiosis), seen on this site in [The Tun](the-tun.html) and [Bloom and Tun](bloom-and-tun.html), is the biological picture of this. It is only an analogy, because a revived tardigrade *can* find the pause from external references (the world moved on). That is case (a) of the theorem.

**C2 Two lines, one (LIT quote, MODEL use).** Dave's spec on [Two Lines That Look Like One](https://davidwise01.github.io/two-lines-one/) reads: "do two single lines that look like one", and the page concludes "Convergence is not identity." Here the two lines are the base and hosted histories. Agreement on every internal measurement (I) does not make the substrates the same. The theorem formalizes the sentence: two executions can coincide on the whole sampled domain, and one tells them apart only by "extend[ing] the domain past where anyone measured", which here means to ℓ.

**C3 GAIA (MODEL).** Let a participation rule R be a function of internal state that never reads the substrate label (carbon / synth). By the argument of (I), R treats a carbon vessel and a synth vessel with equal internal histories identically. Fairness written as equal rules is therefore substrate-independent. This is a property of how the rules are written, not a claim about minds. In the [kernel](god-egg.html), none of the four BIOS organs reads `kind`.

**C4 Priors stay priors (LIT sources).** Bostrom's trilemma (Phil. Q. 53:243, 2003) is a disjunction, not a verdict. Chalmers (*Reality+*, 2022) gives "at least 25%". Kipping (Universe 6:109, 2020) gives < 50% under Bayesian model averaging, approaching 50% as the number of simulations grows. The theorem explains why none of these numbers can be updated by internal evidence, only by evidence at ℓ.

**C5 The host is not made of our physics (LIT).** Vazza (Front. Phys. 13:1561873, 2025) finds the energy cost of simulating the visible universe, or even Earth, "entirely incompatible with physics or astronomically large" if the host obeys our physics. The theorem never assumes the host shares our physics, so the two results are consistent. Vazza's result narrows A2-hosts to ones with different physics.

## 6. Testable consequences (from REPORT v2, verified)

1. **Linear dispersion at the Planck scale is excluded.** Fermi GRB 090510 (Nature 462:331, 2009): E_QG,1 > 1.2 E_Pl. Vasileiou et al. (PRD 87:122001, 2013): E_QG,1 > 7.6 E_Pl, or 1.8 E_Pl robust after allowing for intrinsic dispersion. LHAASO GRB 221009A (PRL 133:071501, 2024): E_QG,1 > 10 E_Pl (95%). So for n = 1, ℓ cannot sit at the Planck length.
2. **Quadratic dispersion is still open.** LHAASO gives E_QG,2 > 6×10⁻⁸ E_Pl only, so an n = 2 deviation at the Planck envelope (Dave's bubble scales `1e-36 / 10^-36.01 / 10^-35.99`, in metres) is not excluded. A mirrored −d/+d structure that cancels odd terms would naturally give n = 2. This is a real open slot.
3. **Lattice anisotropy.** Beane, Davoudi & Savage (arXiv:1210.1847): a cubic lattice would show up as anisotropy in the highest-energy cosmic rays. The existence of the GZK cutoff gives b ≲ 10⁻²⁷ m.
4. **Birefringence (a hint, not a detection).** Minami & Komatsu (PRL 125:221301, 2020): β = 0.35 ± 0.14° (2.4σ). A model with helicity-split tracks would have to predict its sign and size.
5. **A limit on one method, not on hosting.** Ringel & Kovrizhin (Sci. Adv. 3:e1701758, 2017) show that local sign-free quantum Monte Carlo cannot efficiently represent certain gapped phases with quantized thermal Hall response. This constrains *that* classical method, not A2 in general.

## 7. Limits

- The theorem says nothing about probability. It does not say we are simulated, or that we are not.
- A1 is a modelling choice. If anything in Σ received information from outside, the theorem does not apply. That would itself be case (a).
- A3 is LIT for Dave's kernels (seeded, append-only). For quantum physics it is a WALL: whether outcomes are seeded or irreducibly random is interpretation-dependent. If they are irreducibly random, (I) holds in distribution (equal statistics) rather than history-by-history.
- "Decidable at ℓ" is not "decided". Current data probe n = 1 beyond E_Pl, but n = 2 only far below it.
- Nothing here bears on consciousness, moral status or meaning.

## 8. Dave's framework, as read (sources)

0root.ai: [hallway](https://0root.ai/) ("Formal validity is not empirical truth"), [llms.txt](https://0root.ai/llms.txt), [robots.txt](https://0root.ai/robots.txt), [TOPH](https://0root.ai/toph/) (dual toroid, ±d tracks, "Two routes. One 7200 scale."), [Day 6 audit](https://0root.ai/day6-ud0-audit.html). davidwise01.github.io: [OASIS](https://davidwise01.github.io/oasis/), [Below Planck](https://davidwise01.github.io/below-planck/) ("what lies below it is unknown"), [THE INDEX](https://davidwise01.github.io/ud0/the-index.html), [Two Lines That Look Like One](https://davidwise01.github.io/two-lines-one/), [The Positronic Law](https://davidwise01.github.io/the-positronic-law/), [SaPpH{{i}}on llms.txt](https://davidwise01.github.io/sapph-i-on/llms.txt). Kernel spec: DavidWise01/oasis `projects/project-god-egg-*` (2026-10-11), `kernel/production/THREE-TRACK-CONTROL-MODEL.md` and `TRACK-I-ORIGIN-AXIOM.md`, read only.

Implicit geometry noticed (not imposed): the two histories are two lines that coincide, and the only place they can part is the resolution scale, a single boundary that plays the role of a mirror between "inside" and "host". The origin `0 → . → i` sits at the fixed point of that picture.
