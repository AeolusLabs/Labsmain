import { test } from 'node:test'
import assert from 'node:assert/strict'
import { chooseTwist, modelRay, pickCube, projectPoint, snapQuarters, type Hit, type V3 } from './cube-play.ts'

const MV = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -4.4, 1]
const flat = (p: V3): [number, number] => [p[0] * 100, -p[1] * 100]
const front: Hit = { axis: 2, sign: 1, point: [0, 0, 0.81], cell: [0, 0, 1] }

test('projectPoint and modelRay agree', () => {
  const p: V3 = [0.3, -0.2, 0.5]
  const [px, py] = projectPoint(p, MV, 1.5, 0.8, 900, 600)
  const ray = modelRay(px, py, MV, 1.5, 0.8, 900, 600)
  assert.ok(ray)
  const w: V3 = [p[0] - ray.o[0], p[1] - ray.o[1], p[2] - ray.o[2]]
  const along = w[0] * ray.d[0] + w[1] * ray.d[1] + w[2] * ray.d[2]
  const off = Math.hypot(w[0] - along * ray.d[0], w[1] - along * ray.d[1], w[2] - along * ray.d[2])
  assert.ok(off < 1e-6, `off by ${off}`)
})

test('pickCube hits the front face centre', () => {
  const hit = pickCube({ o: [0, 0, 5], d: [0, 0, -1] }, 0.56, 0.25)
  assert.ok(hit)
  assert.equal(hit.axis, 2)
  assert.equal(hit.sign, 1)
  assert.deepEqual(hit.cell, [0, 0, 1])
  assert.ok(Math.abs(hit.point[2] - 0.81) < 1e-9)
})

test('pickCube misses outside and in the gap', () => {
  assert.equal(pickCube({ o: [2, 0, 5], d: [0, 0, -1] }, 0.56, 0.25), null)
  assert.equal(pickCube({ o: [0.28, 0, 5], d: [0, 0, -1] }, 0.56, 0.25), null)
})

test('pickCube returns the side face from the side', () => {
  const hit = pickCube({ o: [5, 0, 0], d: [-1, 0, 0] }, 0.56, 0.25)
  assert.ok(hit)
  assert.equal(hit.axis, 0)
  assert.equal(hit.sign, 1)
  assert.deepEqual(hit.cell, [1, 0, 0])
})

test('chooseTwist drag right on the front face turns about y positively', () => {
  const t = chooseTwist(front, [40, 0], flat, 0.56)
  assert.ok(t)
  assert.deepEqual([t.ax, t.layer, t.sign], [1, 0, 1])
})

test('chooseTwist drag up turns about x negatively', () => {
  const t = chooseTwist(front, [0, -40], flat, 0.56)
  assert.ok(t)
  assert.deepEqual([t.ax, t.layer, t.sign], [0, 0, -1])
})

test("chooseTwist uses the hit cubelet's layer", () => {
  const right: Hit = { axis: 2, sign: 1, point: [0.56, 0, 0.81], cell: [1, 0, 1] }
  const top: Hit = { axis: 2, sign: 1, point: [0, 0.56, 0.81], cell: [0, 1, 1] }
  const a = chooseTwist(right, [40, 0], flat, 0.56)
  const b = chooseTwist(right, [0, -40], flat, 0.56)
  const c = chooseTwist(top, [40, 0], flat, 0.56)
  assert.ok(a && b && c)
  assert.deepEqual([a.ax, a.layer], [1, 0])
  assert.deepEqual([b.ax, b.layer], [0, 1])
  assert.deepEqual([c.ax, c.layer], [1, 1])
})

test('chooseTwist returns null for a zero drag', () => {
  assert.equal(chooseTwist(front, [0, 0], flat, 0.56), null)
})

test('snapQuarters', () => {
  assert.equal(snapQuarters(0.2, 0), 0)
  assert.equal(snapQuarters(0.9, 0), 1)
  assert.equal(snapQuarters(-1.6, 0), -1)
  assert.equal(snapQuarters(0.5, 3), 1)
  assert.equal(snapQuarters(0.2, -3), 0)
  assert.ok(Object.is(snapQuarters(-0.1, 0), 0))
})
