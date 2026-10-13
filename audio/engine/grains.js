// Synchronous granular engine voice (AudioWorklet). The recording is cut into whole engine cycles (build-grains.mjs),
// each tagged with its pitch. The recording plays on, cycle after cycle resampled to the wanted pitch, while it stays
// within RUN_ON of it; only then it jumps to a random one of the NEAREST closest cycles not among the last RECENT played.
// Long natural runs matter: hopping between a handful of short cycles at a steady rpm repeats one pattern dozens of
// times a second, which rings as a pure tone over the engine. A jump is a 12 ms crossfade that lets the previous cycle
// run on into its own recorded continuation while the new one fades in.
const XF = 0.012, RUN_ON = 0.1
// a small bank (the idle) must not exclude most of itself: the empty pool used to replay one cycle over and over
const NEAREST = n => Math.max(2, Math.min(24, Math.floor(n / 3))), RECENT = n => Math.max(1, Math.min(48, Math.floor(n / 4)))

class EngineGrains extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [{ name: 'pitch', defaultValue: 40, minValue: 1, maxValue: 2000, automationRate: 'k-rate' }]
  }
  constructor(options) {
    super()
    const { pcm, grains, rate, seed } = options.processorOptions
    this.pcm = pcm
    this.g = grains
    // positions are counted in the bank's samples (rate); the decoded pcm is at the context rate
    this.toPcm = sampleRate / rate
    this.step = rate / sampleRate
    this.byPitch = grains.map((_, i) => i).sort((a, b) => grains[a][2] - grains[b][2])
    this.recent = []
    this.cur = -1; this.pos = 0; this.ratio = 1
    this.tail = null; this.fadeIn = Infinity
    let s = seed >>> 0
    this.random = () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296 }
  }
  pick(p) {
    const g = this.g, c = this.cur, n = c + 1
    if (c >= 0 && n < g.length && g[c][0] + g[c][1] === g[n][0] && Math.abs(g[n][2] / p - 1) < RUN_ON) return n
    // binary search the pitch order, widen to the closest cycles not played recently, and prefer the recording already
    // playing (a cycle from another microphone costs as much as 3 % of pitch): banks mix several recordings
    const order = this.byPitch, src = c >= 0 ? g[c][3] : -1
    let lo = 0, hi = order.length
    while (lo < hi) { const m = (lo + hi) >> 1; if (g[order[m]][2] < p) lo = m + 1; else hi = m }
    const pool = []
    let a = lo - 1, b = lo
    while (pool.length < 3 * NEAREST(g.length) && (a >= 0 || b < order.length)) {
      const da = a >= 0 ? Math.abs(Math.log(g[order[a]][2] / p)) : Infinity, db = b < order.length ? Math.abs(Math.log(g[order[b]][2] / p)) : Infinity
      const i = da <= db ? order[a--] : order[b++]
      if (!this.recent.includes(i)) pool.push([i, Math.min(da, db) + (g[i][3] === src ? 0 : 0.03)])
    }
    if (!pool.length) return order[Math.min(lo, order.length - 1)]
    pool.sort((x, y) => x[1] - y[1])
    return pool[Math.floor(this.random() * Math.min(NEAREST(g.length), pool.length))][0]
  }
  read(src) {
    const x = src * this.toPcm, i = Math.floor(x), f = x - i, pcm = this.pcm
    return i + 1 < pcm.length ? pcm[i] + (pcm[i + 1] - pcm[i]) * f : 0
  }
  process(_, outputs, params) {
    const out = outputs[0][0]
    if (!out) return true
    const p = params.pitch[0], g = this.g, xf = Math.max(1, Math.round(XF * sampleRate))
    if (this.cur >= 0) this.ratio = p / g[this.cur][2] * this.step
    for (let k = 0; k < out.length; k++) {
      if (this.cur < 0 || this.pos >= g[this.cur][1]) {
        const next = this.pick(p), jumped = this.cur < 0 || g[this.cur][0] + g[this.cur][1] !== g[next][0]
        if (jumped && this.cur >= 0) this.tail = { at: g[this.cur][0] + this.pos, ratio: this.ratio, n: 0 }
        this.cur = next; this.pos = 0; this.ratio = p / g[next][2] * this.step
        this.fadeIn = jumped ? 0 : xf
        this.recent.push(next); if (this.recent.length > RECENT(g.length)) this.recent.shift()
      }
      let v = this.read(g[this.cur][0] + this.pos)
      if (this.fadeIn < xf) {
        const u = (this.fadeIn + 0.5) / xf
        v *= Math.sin(u * Math.PI / 2)
        if (this.tail) { v += this.read(this.tail.at) * Math.cos(u * Math.PI / 2); this.tail.at += this.tail.ratio }
        if (++this.fadeIn >= xf) this.tail = null
      }
      out[k] = v
      this.pos += this.ratio
    }
    return true
  }
}
registerProcessor('engine-grains', EngineGrains)
