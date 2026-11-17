import type { Palette, SceneId } from '../types'
import { FOV, frameFor, mul, persp, placePhone, rotX, rotY, rotZ, scaleM, trans, WIDE_MIN } from './camera'
import { CubeAnimator } from './cube'
import { modelRay, pickCube, projectPoint, snapQuarters } from './cube-play'
import { createCubePad } from './cube-play-input'
import { clamp01, ease, mixf } from './math'
import { FORMS, makeBlock, makeSeeds, parseBrain, PITCH, STRIDE, type BrainData, type FormId } from './shapes'
import { FRAGMENT_SHADER, VERTEX_SHADER } from './shaders'
import { attachStory, markNoGl, type StoryDom } from './story-dom'

const DPR_CAP = 2
const BRAIN_URL = '/data/brain-points.bin'

export interface StageOptions {
  scenes: readonly SceneId[]
  palette: Palette
  /** Visitor paused motion in the footer, or the system asks for reduced motion. */
  motionOff: boolean
  /** The system asks for reduced motion (also turns off scroll easing and the words' lift). */
  reduced: boolean
  /** Called if the browser takes the GL context away; the owner should discard this canvas. */
  onContextLost?: () => void
}

export interface Stage {
  setPalette(palette: Palette): void
  setMotion(motionOff: boolean, reduced: boolean): void
  dispose(): void
}

/** `stale`: the canvas already holds a lost context (it was disposed before), so the caller needs a fresh canvas. */
export type StageResult = { status: 'ok'; stage: Stage } | { status: 'nogl'; cleanup: () => void } | { status: 'stale' }

const hex = (h: string): [number, number, number] => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number]

const UNIFORMS = ['uMV', 'uP', 'uMorph', 'uFormA', 'uFormB', 'uMove', 'uTime', 'uDpr', 'uSize', 'uFocus', 'uMotion', 'uAspect', 'uPointer', 'uPush', 'uRadius', 'uAmt', 'uStar', 'uAccent', 'uDeep'] as const
const ATTRIBUTES = ['aS', 'aHomeA', 'aNormA', 'aCellA', 'aColA', 'aHomeB', 'aNormB', 'aCellB', 'aColB'] as const

interface Block { data: Float32Array; vbo: WebGLBuffer }

export function createStage(canvas: HTMLCanvasElement, opts: StageOptions): StageResult {
  const ctx = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance', depth: false, stencil: false })
  if (!ctx) return { status: 'nogl', cleanup: markNoGl() }
  if (ctx.isContextLost()) return { status: 'stale' }
  const gl: WebGL2RenderingContext = ctx

  // Every GPU/DOM resource registers an undo here, so cleanup (and a failed setup) is exactly symmetrical.
  const undo: (() => void)[] = []
  const teardown = () => { while (undo.length) { try { undo.pop()?.() } catch { /* keep tearing down */ } } }

  let story: StoryDom | null = null
  let program: WebGLProgram | null = null
  const loc = {} as Record<(typeof UNIFORMS)[number], WebGLUniformLocation | null>
  const attrLoc = {} as Record<(typeof ATTRIBUTES)[number], number>
  let vao: WebGLVertexArrayObject | null = null
  let seedBuf: WebGLBuffer | null = null
  try {
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)
      if (!s) throw new Error('createShader failed')
      gl.shaderSource(s, src); gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { const log = gl.getShaderInfoLog(s); gl.deleteShader(s); throw new Error(log ?? 'shader compile failed') }
      return s
    }
    const vs = compile(gl.VERTEX_SHADER, VERTEX_SHADER), fs = compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
    program = gl.createProgram()
    if (!program) throw new Error('createProgram failed')
    const prog = program
    undo.push(() => gl.deleteProgram(prog))
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog)
    gl.deleteShader(vs); gl.deleteShader(fs)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) ?? 'link failed')
    gl.useProgram(prog)
    for (const k of UNIFORMS) loc[k] = gl.getUniformLocation(prog, k)
    for (const k of ATTRIBUTES) attrLoc[k] = gl.getAttribLocation(prog, k)
    vao = gl.createVertexArray()
    const vaoRef = vao
    undo.push(() => gl.deleteVertexArray(vaoRef))
    gl.bindVertexArray(vao)
    seedBuf = gl.createBuffer()
    const seedRef = seedBuf
    undo.push(() => gl.deleteBuffer(seedRef))
  } catch {
    teardown()
    return { status: 'nogl', cleanup: markNoGl() }   // the words stay visible
  }

  // ---------------------------------------------------------------- scenes
  story = attachStory()
  const storyRef = story
  if (storyRef) undo.push(() => storyRef.dispose())
  // Each panel names its own scene (data-np-scene), so a page can never drift out of step with its sections. Without a story
  // the page is an ambient sky and the scenes passed in are used.
  const base: readonly SceneId[] = story ? story.scenes : (opts.scenes.length ? opts.scenes : ['sky'])
  const seqLen = Math.max(2, base.length)
  const seq: FormId[] = Array.from({ length: seqLen }, (_, k) => base[k] ?? base[base.length - 1])
  const sideOf = (k: number) => (story ? (story.sides[k] ?? 1) : 0)
  const offXOf = (k: number) => (seq[k] === 'sky' ? 0 : sideOf(k) * 0.5)   // opposite the words, a share of half the screen width

  const small = window.innerWidth < WIDE_MIN || (navigator.hardwareConcurrency || 8) <= 4
  const N = small ? 8000 : 14000

  // ---------------------------------------------------------------- state
  let disposed = false
  let motion = opts.motionOff || opts.reduced ? 0 : 1
  let reduced = opts.reduced
  let brain: BrainData | null = null
  let dpr = 1, w = 1, h = 1
  let needDraw = true                                        // something changed that the next frame must draw even if nothing is moving
  let lastSig: number[] = []

  // ---------------------------------------------------------------- GPU data
  const blocks: Partial<Record<FormId, Block>> = {}
  let solvedCube: Float32Array | null = null
  const upload = (blk: Block, data: Float32Array) => { gl.bindBuffer(gl.ARRAY_BUFFER, blk.vbo); gl.bufferSubData(gl.ARRAY_BUFFER, 0, data) }
  const cube = new CubeAnimator(N, () => blocks.cube?.data, data => { const b = blocks.cube; if (b) upload(b, data) })

  gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf)
  gl.bufferData(gl.ARRAY_BUFFER, makeSeeds(N), gl.STATIC_DRAW)

  function ensureBlock(kind: FormId): Block | null {
    const existing = blocks[kind]
    if (existing) return existing
    const vbo = gl.createBuffer()
    if (!vbo) return null
    const data = makeBlock(kind, N, brain)
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo); gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)
    if (kind === 'cube' && !solvedCube) solvedCube = data.slice()
    return (blocks[kind] = { data, vbo })
  }
  function dropBlock(kind: FormId) { const b = blocks[kind]; if (b) { gl.deleteBuffer(b.vbo); delete blocks[kind] } }
  undo.push(() => { (Object.keys(blocks) as FormId[]).forEach(dropBlock) })

  const attr = (l: number, size: number, offset: number) => { gl.enableVertexAttribArray(l); gl.vertexAttribPointer(l, size, gl.FLOAT, false, STRIDE, offset) }
  let curA: FormId = seq[0], curB: FormId = seq[1]
  let pairA: FormId | '' = '', pairB: FormId | '' = ''
  function bindPair(force = false) {
    if (!force && pairA === curA && pairB === curB) return
    const a = ensureBlock(curA), b = ensureBlock(curB)
    if (!a || !b) return
    pairA = curA; pairB = curB
    gl.bindVertexArray(vao)
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuf); gl.enableVertexAttribArray(attrLoc.aS); gl.vertexAttribPointer(attrLoc.aS, 3, gl.FLOAT, false, 12, 0)
    gl.bindBuffer(gl.ARRAY_BUFFER, a.vbo)
    attr(attrLoc.aHomeA, 3, 0); attr(attrLoc.aNormA, 4, 12); attr(attrLoc.aCellA, 3, 28); attr(attrLoc.aColA, 1, 40)
    gl.bindBuffer(gl.ARRAY_BUFFER, b.vbo)
    attr(attrLoc.aHomeB, 3, 0); attr(attrLoc.aNormB, 4, 12); attr(attrLoc.aCellB, 3, 28); attr(attrLoc.aColB, 1, 40)
  }

  function resetCube() {   // always arrive at a solved cube; the solved copy makes starting over instant
    const blk = blocks.cube
    if (blk && solvedCube) { blk.data.set(solvedCube); upload(blk, blk.data) }
    cube.reset()
  }

  // Build every other shape a moment after the first one is on screen, so scrolling never stops to make one.
  const timers: number[] = []
  const later = (fn: () => void, ms: number) => { timers.push(window.setTimeout(() => { if (!disposed) fn() }, ms)) }
  undo.push(() => timers.forEach(id => window.clearTimeout(id)))
  const warm = (kinds: readonly FormId[], start: number) => kinds.forEach((k, n) => later(() => { ensureBlock(k) }, start + n * 220))

  // ---------------------------------------------------------------- brain data
  const abort = new AbortController()
  undo.push(() => abort.abort())
  const used = new Set<FormId>(seq)                          // plain pages only ever show the sky, so they build and download nothing else
  const usedKinds = FORMS.filter(k => used.has(k))
  if (used.has('brain') || used.has('agent')) fetch(BRAIN_URL, { signal: abort.signal })
    .then(r => { if (!r.ok) throw new Error(String(r.status)); return r.arrayBuffer() })
    .then(ab => {
      if (disposed) return
      const parsed = parseBrain(ab)
      if (!parsed) return
      brain = parsed
      dropBlock('brain'); dropBlock('agent'); bindPair(true); needDraw = true
      warm((['brain', 'agent'] as FormId[]).filter(k => used.has(k)), 120)
    })
    .catch(() => { /* the brain falls back to sky points; the page still works */ })

  // ---------------------------------------------------------------- canvas size and palette
  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP)
    w = Math.max(1, Math.floor(canvas.clientWidth * dpr)); h = Math.max(1, Math.floor(canvas.clientHeight * dpr))
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
    gl.viewport(0, 0, w, h)
    needDraw = true
  }
  window.addEventListener('resize', resize)
  undo.push(() => window.removeEventListener('resize', resize))
  resize()

  const applyPalette = (p: Palette) => {
    const b = hex(p.bg), s = hex(p.star)
    gl.clearColor(b[0], b[1], b[2], 1)
    gl.uniform3fv(loc.uStar, s); gl.uniform3fv(loc.uAccent, hex(p.accent)); gl.uniform3fv(loc.uDeep, s.map((v, i) => v * 0.62 + b[i] * 0.38))
  }
  gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE)
  applyPalette(opts.palette)

  // ---------------------------------------------------------------- pointer (strength eases; touch reaches further and pushes gently; scrolling is never blocked)
  const ptr = { x: 0, y: 0, tx: 0, ty: 0, str: 0, target: 0, touch: false }
  const setPtr = (e: PointerEvent) => {
    ptr.touch = e.pointerType === 'touch'
    ptr.tx = (e.clientX / window.innerWidth) * 2 - 1; ptr.ty = -((e.clientY / window.innerHeight) * 2 - 1)
    if (ptr.target === 0 || e.type === 'pointerdown') { ptr.x = ptr.tx; ptr.y = ptr.ty }
    ptr.target = 1
  }
  const release = () => { ptr.target = 0 }
  window.addEventListener('pointermove', setPtr, { passive: true })
  window.addEventListener('pointerdown', setPtr, { passive: true })
  window.addEventListener('pointerup', release, { passive: true })
  window.addEventListener('pointercancel', release, { passive: true })
  document.addEventListener('pointerleave', release, { passive: true })
  undo.push(() => {
    window.removeEventListener('pointermove', setPtr); window.removeEventListener('pointerdown', setPtr)
    window.removeEventListener('pointerup', release); window.removeEventListener('pointercancel', release)
    document.removeEventListener('pointerleave', release)
  })

  const onLost = (e: Event) => { e.preventDefault(); cancelAnimationFrame(raf); opts.onContextLost?.() }
  canvas.addEventListener('webglcontextlost', onLost)
  undo.push(() => canvas.removeEventListener('webglcontextlost', onLost))

  // ---------------------------------------------------------------- playing with the cube
  // A transparent disc over the cube takes drags: a sticker twists its layer, empty space turns the whole cube. Only the disc
  // blocks touch scrolling, so the rest of the page scrolls as before. The first touch ends the cube's own scramble and solve.
  let userRy = 0, userRx = 0
  let snap: { ax: number; layer: number; from: number; to: number; q: number; t0: number } | null = null
  let view: { mv: number[]; aspect: number; cssW: number; cssH: number; left: number; top: number } = { mv: [], aspect: 1, cssW: 1, cssH: 1, left: 0, top: 0 }
  const finishSnap = () => { if (snap) { cube.commitQuarters(snap.ax, snap.layer, snap.q); snap = null; needDraw = true } }
  const pad = canvas.parentElement ? createCubePad(canvas.parentElement, {
    pick: (px, py) => {
      if (snap || !view.mv.length) return null
      const ray = modelRay(px - view.left, py - view.top, view.mv, view.aspect, FOV, view.cssW, view.cssH)
      return ray ? pickCube(ray, PITCH, 0.25) : null
    },
    project: p => { const q = projectPoint(p, view.mv, view.aspect, FOV, view.cssW, view.cssH); return [q[0] + view.left, q[1] + view.top] },
    onOrbit: (dx, dy) => { cube.takeOver(); userRy += dx * 0.008; userRx = Math.max(-1.9, Math.min(0.9, userRx + dy * 0.008)); needDraw = true },
    onTwistStart: () => { cube.takeOver() },
    onTwist: (ax, layer, angle) => { cube.setManualTurn(ax, layer, angle); needDraw = true },
    onTwistEnd: (ax, layer, angle, velocity) => {
      const q = snapQuarters(angle, velocity)
      snap = { ax, layer, from: angle, to: q * Math.PI / 2, q, t0: performance.now() }
    },
  }, PITCH) : null
  if (pad) undo.push(() => pad.dispose())

  // ---------------------------------------------------------------- frame loop
  let lastPair = -1, rx = 0, ry = 0, ox = 0, oy = 0, t = 0, last = performance.now(), raf = 0
  let sf = story ? story.position(window.scrollY) : 0
  bindPair(true)
  warm(usedKinds, 300)

  const spinOf = (k: FormId) => (k === 'cube' ? 0.7 + (cube.isManual ? 0 : Math.sin(t * 0.3) * 0.45) : (k === 'sky' ? Math.sin(t * 0.045) * 0.08 : Math.sin(t * 0.22) * 0.5))
  const tiltOf = (k: FormId) => (k === 'cube' ? 0.5 : 0)
  const sizeOf = (k: FormId) => (k === 'sky' ? 3.0 : 4.6)

  function frame(now: number) {
    if (disposed) return
    // A throw inside the frame must never leave the words hidden: fall back to the plain, readable page.
    try { step(now) } catch { undo.push(markNoGl()); return }
    raf = requestAnimationFrame(frame)
  }
  function step(now: number) {
    const dt = Math.min(0.1, (now - last) / 1000); last = now; t += dt * motion
    const scrollY = window.scrollY
    // The scroll position is eased, so a notchy mouse wheel or a flick on a phone still flows between shapes.
    const target = story ? story.position(scrollY) : 0
    sf += (target - sf) * (reduced ? 1 : 1 - Math.exp(-dt * 9))
    const f = sf, fc = Math.max(0, Math.min(seq.length - 1, f))
    const i = Math.min(Math.floor(fc), seq.length - 2), frac = fc - i, m = ease(clamp01((frac - 0.22) / 0.56))
    curA = seq[i]; curB = seq[i + 1]
    if (i !== lastPair) { if (curB === 'cube') resetCube(); lastPair = i }
    bindPair()

    // cube turns only while the cube is the shape on screen, and only when motion is on
    const cubeShown = (curB === 'cube' && m >= 0.999) || (curA === 'cube' && m <= 0.001)
    if (!cubeShown) { pad?.hide(); finishSnap(); cube.stop(); userRy *= 0.9; userRx *= 0.9 }
    else if (!motion) { if (!cube.isManual) cube.stop() }
    else cube.update(dt)
    if (snap) {      // after a release the layer settles on a quarter turn (this runs with motion off too: the visitor is playing)
      const k = Math.min(1, (performance.now() - snap.t0) / 180)
      cube.setManualTurn(snap.ax, snap.layer, snap.from + (snap.to - snap.from) * (1 - Math.pow(1 - k, 3)))
      if (k >= 1) finishSnap()
    }

    if (story) { story.applyCopy(f, reduced); story.syncSnap(scrollY) }

    // pointer
    const follow = ptr.touch ? 0.35 : 0.12
    ptr.x += (ptr.tx - ptr.x) * follow; ptr.y += (ptr.ty - ptr.y) * follow; ptr.str += (ptr.target - ptr.str) * (ptr.target > ptr.str ? 0.4 : 0.05)
    const px = Math.max(-1, Math.min(1, ptr.x)) * ptr.str, py = Math.max(-1, Math.min(1, ptr.y)) * ptr.str

    // camera: where the shape sits and how it turns blend with the scroll
    const viewW = window.innerWidth, viewH = window.innerHeight
    const wide = viewW >= WIDE_MIN, aspect = w / h
    const { dist, halfH, halfW, fit } = frameFor(aspect)
    const offX = wide ? mixf(offXOf(i), offXOf(i + 1), m) * halfW : 0
    const skyMix = (curA === 'sky' ? 1 - m : 0) + (curB === 'sky' ? m : 0)          // 1 when the sky is showing
    // Phones: the shape sits in the free space above the words of its section, sized to fit that space.
    let tgtY = 0, scPhone = 1
    if (!wide && story) {
      const pa = placePhone(curA, story.copyHeights[i] ?? 0, viewW, viewH, halfH), pb = placePhone(curB, story.copyHeights[i + 1] ?? 0, viewW, viewH, halfH)
      tgtY = mixf(pa.y, pb.y, m); scPhone = mixf(pa.s, pb.s, m)
    }
    ox += (offX - ox) * 0.12; oy += (tgtY - oy) * 0.12
    ry += ((mixf(spinOf(curA), spinOf(curB), m) + px * 0.2 + userRy) - ry) * 0.05
    rx += ((Math.sin(t * 0.05) * 0.06 + py * 0.1 + mixf(tiltOf(curA), tiltOf(curB), m) + userRx) - rx) * 0.05
    const sc = wide ? skyMix + (1 - skyMix) * fit : scPhone                          // the sky fills the screen; shapes shrink to fit
    const MV = mul(trans(ox, oy, -dist), mul(scaleM(sc), mul(rotX(rx), mul(rotY(ry), rotZ(skyMix * t * 0.006)))))
    // With motion off and nothing moving there is nothing new to draw, so skip the GPU work (pausing then really rests the graphics card).
    // the pad follows the cube while it is the shape on screen
    const rect = canvas.getBoundingClientRect()
    view = { mv: MV, aspect, cssW: rect.width || 1, cssH: rect.height || 1, left: rect.left, top: rect.top }
    if (pad && cubeShown) {
      const c = projectPoint([0, 0, 0], MV, aspect, FOV, view.cssW, view.cssH), ppu = view.cssH / (2 * dist * Math.tan(FOV / 2))
      pad.place(c[0] + view.left, c[1] + view.top, 1.4 * sc * ppu * 1.1)
    }
    const sig = [sf, ox, oy, rx, ry, m, sc, ptr.x, ptr.y, ptr.str, cube.mv[2], userRy, userRx, w, h]
    let moved = needDraw
    for (let k = 0; k < sig.length && !moved; k++) if (Math.abs(sig[k] - lastSig[k]) > 1e-4) moved = true
    if (!motion && !moved) return
    needDraw = false; lastSig = sig
    gl.uniformMatrix4fv(loc.uMV, false, MV); gl.uniformMatrix4fv(loc.uP, false, persp(0.8, aspect, 0.1, 30))
    gl.uniform1f(loc.uMorph, m); gl.uniform1f(loc.uFormA, FORMS.indexOf(curA)); gl.uniform1f(loc.uFormB, FORMS.indexOf(curB))
    gl.uniform3f(loc.uMove, cube.mv[0], cube.mv[1], cube.mv[2])
    gl.uniform1f(loc.uTime, t); gl.uniform1f(loc.uDpr, dpr); gl.uniform1f(loc.uSize, mixf(sizeOf(curA), sizeOf(curB), m) * (h / dpr / 900 > 0.7 ? 1 : 0.85))
    gl.uniform1f(loc.uFocus, dist); gl.uniform1f(loc.uMotion, motion); gl.uniform1f(loc.uAspect, aspect)
    gl.uniform2f(loc.uPointer, ptr.x, ptr.y); gl.uniform1f(loc.uPush, ptr.str)
    gl.uniform1f(loc.uRadius, ptr.touch ? 0.465 : 0.38); gl.uniform1f(loc.uAmt, ptr.touch ? 0.12 : 0.08)
    gl.clear(gl.COLOR_BUFFER_BIT); gl.drawArrays(gl.POINTS, 0, N)
  }
  raf = requestAnimationFrame(frame)
  undo.push(() => cancelAnimationFrame(raf))

  return {
    status: 'ok',
    stage: {
      setPalette(p) { applyPalette(p); needDraw = true },
      setMotion(motionOff, isReduced) {
        reduced = isReduced
        motion = motionOff || isReduced ? 0 : 1
        if (!motion && !cube.isManual) cube.stop()
        needDraw = true
      },
      dispose() {
        if (disposed) return
        disposed = true
        teardown()
        gl.getExtension('WEBGL_lose_context')?.loseContext()
      },
    },
  }
}
