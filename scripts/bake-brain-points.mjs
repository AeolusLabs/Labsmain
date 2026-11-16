// Bakes a surface point sample from a brain GLB into a small binary file for the particle prototype.
// Usage: node scripts/bake-brain-points.mjs <input.glb> [count] [output.bin]
// Output layout: int16 x,y,z * N (little-endian, +-32767 = +-1 unit box) then int8 nx,ny,nz * N (+-127).
// The sample is shuffled, so any prefix of the file is itself an even sample (use fewer points on phones).
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const [, , input, countArg = "16000", output = "public/data/brain-points.bin"] = process.argv;
if (!input) { console.error("usage: node scripts/bake-brain-points.mjs <input.glb> [count] [output.bin]"); process.exit(1); }
const N = Number(countArg);

const buf = readFileSync(input);
if (buf.toString("ascii", 0, 4) !== "glTF") throw new Error("not a GLB file");
const jsonLen = buf.readUInt32LE(12);
const gltf = JSON.parse(buf.toString("utf8", 20, 20 + jsonLen));
const binStart = 20 + jsonLen + 8;                       // skip the BIN chunk header
const bin = buf.subarray(binStart);

function accessor(i) {
  const a = gltf.accessors[i], bv = gltf.bufferViews[a.bufferView];
  const comps = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[a.type];
  const off = (bv.byteOffset || 0) + (a.byteOffset || 0);
  const stride = bv.byteStride || comps * (a.componentType === 5126 || a.componentType === 5125 ? 4 : 2);
  const out = new Float64Array(a.count * comps);
  for (let k = 0; k < a.count; k++)
    for (let c = 0; c < comps; c++) {
      const p = off + k * stride + c * 4;
      out[k * comps + c] = a.componentType === 5126 ? bin.readFloatLE(p) : bin.readUInt32LE(p);
    }
  return { data: out, comps };
}

// Node transform of the export root (Sketchfab's Y-up rotation), column-major 4x4.
const m = gltf.nodes[0].matrix || [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
const tf = (x, y, z) => [m[0] * x + m[4] * y + m[8] * z, m[1] * x + m[5] * y + m[9] * z, m[2] * x + m[6] * y + m[10] * z];

const tris = [];                                         // {a,b,c: [x,y,z]}
for (const mesh of gltf.meshes)
  for (const prim of mesh.primitives) {
    const pos = accessor(prim.attributes.POSITION).data, idx = accessor(prim.indices).data;
    for (let t = 0; t < idx.length; t += 3) {
      const v = [0, 1, 2].map(o => { const i = idx[t + o] * 3; return tf(pos[i], pos[i + 1], pos[i + 2]); });
      tris.push(v);
    }
  }
console.log("triangles", tris.length);

// Orient for a side-on view: x = front/back, y = up, z = left/right. Check the result visually and flip if needed.
const orient = ([x, y, z]) => [-z, y, x];
const P = tris.map(t => t.map(orient));

let min = [1e9, 1e9, 1e9], max = [-1e9, -1e9, -1e9];
for (const t of P) for (const v of t) for (let k = 0; k < 3; k++) { min[k] = Math.min(min[k], v[k]); max[k] = Math.max(max[k], v[k]); }
const ctr = min.map((lo, k) => (lo + max[k]) / 2), half = Math.max(...min.map((lo, k) => (max[k] - lo) / 2));
console.log("bbox", min.map(n => n.toFixed(1)), max.map(n => n.toFixed(1)), "half", half.toFixed(1));

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const len = a => Math.hypot(a[0], a[1], a[2]);
const cum = new Float64Array(P.length); let total = 0;
P.forEach((t, i) => { total += len(cross(sub(t[1], t[0]), sub(t[2], t[0]))) / 2; cum[i] = total; });

let seed = 20261116;
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const pick = r => { let lo = 0, hi = cum.length - 1; while (lo < hi) { const mid = (lo + hi) >> 1; if (cum[mid] < r) lo = mid + 1; else hi = mid; } return lo; };

const pos = new Int16Array(N * 3), nrm = new Int8Array(N * 3);
for (let i = 0; i < N; i++) {
  const t = P[pick(rnd() * total)];
  let u = rnd(), v = rnd(); if (u + v > 1) { u = 1 - u; v = 1 - v; }
  const w = 1 - u - v;
  for (let k = 0; k < 3; k++) pos[i * 3 + k] = Math.round(((t[0][k] * w + t[1][k] * u + t[2][k] * v - ctr[k]) / half) * 32767);
  const n = cross(sub(t[1], t[0]), sub(t[2], t[0])), l = len(n) || 1;
  for (let k = 0; k < 3; k++) nrm[i * 3 + k] = Math.round((n[k] / l) * 127);
}
mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, Buffer.concat([Buffer.from(pos.buffer), Buffer.from(nrm.buffer)]));
console.log("wrote", output, N, "points,", N * 9, "bytes");
