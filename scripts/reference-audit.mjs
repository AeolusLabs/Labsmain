import { readFile, writeFile } from 'node:fs/promises'
import { gunzipSync } from 'node:zlib'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const read = (name) => readFile(path.join(root, name), 'utf8')
const html = await read('architecture/AeolusLabs Website.html')
const tokens = JSON.parse(await read('design-system/tokens.json'))
const embedded = (text, type) => {
  const marker = `<script type="__bundler/${type}">`
  const start = text.indexOf(marker)
  if (start < 0) throw new Error(`Missing reference ${type}`)
  return JSON.parse(text.slice(start + marker.length, text.indexOf('</script>', start)))
}
const manifest = embedded(html, 'manifest')
const order = embedded(html, 'page_order')
const flat = new Map(Object.entries(tokens).flatMap(([group, entries]) =>
  Object.entries(entries).map(([name, value]) => [`${group}.${name}`, value])))
function resolve(key, trail = []) {
  if (!flat.has(key) || trail.includes(key)) throw new Error(`Invalid token ${key}`)
  return String(flat.get(key)).replace(/\{([a-z0-9.-]+)\}/g, (_, ref) => resolve(ref, [...trail, key]))
}
const normalize = (value) => value.toLowerCase().replace(/!important/g, '')
  .replace(/([\d.]+)rem/g, (_, number) => `${Number(number) * 16}px`)
  .replace(/#([a-f\d])([a-f\d])([a-f\d])\b/g, '#$1$1$2$2$3$3')
  .replace(/\{\{accent\}\}/g, tokens.color.accent.toLowerCase()).replace(/\s+/g, '')
  .replace(/(-?)0\.(\d+)/g, '$1.$2')
const candidates = new Map()
for (const key of flat.keys()) {
  const value = normalize(resolve(key))
  const entries = candidates.get(value) ?? []
  entries.push(key)
  candidates.set(value, entries)
}
const family = {
  'font-size': ['type.'], 'line-height': ['leading.'], 'letter-spacing': ['tracking.'],
  'font-weight': ['weight.'], 'border-radius': ['radius.'], 'box-shadow': ['shadow.'],
  'max-width': ['size.', 'measure.'], 'min-height': ['size.', 'space.'],
  width: ['size.', 'marquee.'], height: ['size.', 'space.', 'marquee.'],
  'grid-template-columns': ['grid.'], 'z-index': ['z.'],
}
const occurrences = new Map()
const boards = []
for (const id of order) {
  const resource = manifest[id]
  const bytes = Buffer.from(resource.data, 'base64')
  const page = (resource.compressed ? gunzipSync(bytes) : bytes).toString('utf8')
  const template = embedded(page, 'template')
  boards.push({ id, title: /<title>(.*?)<\/title>/.exec(template)?.[1] })
  // Ignore font-face assets and export runtime; inspect only authored page styles.
  const styles = [...template.matchAll(/\bstyle="([^"]*)"/g)].map((match) => match[1])
  styles.push(...[...template.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
    .map((match) => match[1].replace(/@font-face\s*\{[^}]*\}/g, '')))
  for (let style of styles) {
    style = style.replaceAll('{{accent}}', tokens.color.accent).replace(/@media[^{}]*\{/g, '{')
    for (const [, property, raw] of style.matchAll(/([a-z-]+)\s*:\s*([^;{}]+)/g)) {
      let values = []
      let groups = family[property]
      if (groups) values = [raw.trim()]
      else if (/^(padding|margin|gap|column-gap|row-gap)(-|$)/.test(property)) {
        groups = ['space.', 'layout.', 'control.']
        values = raw.match(/clamp\([^)]*\)|-?[\d.]+(?:px|rem)/g) ?? []
      } else if (['color', 'background', 'background-color'].includes(property) && /^(#|rgba?\(|radial-gradient)/.test(raw.trim())) {
        groups = ['color.', 'gradient.']
        values = [raw.trim()]
      }
      for (const value of values) {
        if (/^(0|none|auto|100%|50%|inherit|normal|max-content)$/.test(normalize(value))) continue
        const key = `${property}: ${value}`
        const record = occurrences.get(key) ?? { property, value, count: 0, boards: new Set(), tokens: [] }
        record.count++
        record.boards.add(boards.at(-1).title)
        record.tokens = (candidates.get(normalize(value)) ?? []).filter((key) => groups.some((group) => key.startsWith(group)))
        occurrences.set(key, record)
      }
    }
  }
}
const decisions = [...occurrences.values()].map((record) => ({ ...record, boards: [...record.boards] }))
const missing = decisions.filter((record) => record.tokens.length === 0)
const result = {
  scope: 'Extracted visual roles and dimensional values across 14 boards; not production remodel verification',
  exclusions: ['Export frame dimensions/runtime', 'Intrinsic asset sizes', 'Structural zero/auto/percentages', 'Algorithm constants', 'One-off illustration coordinates'],
  boards, decisions, missing,
}
const outputIndex = process.argv.indexOf('--output')
if (outputIndex >= 0) await writeFile(path.join(root, process.argv[outputIndex + 1]), `${JSON.stringify(result, null, 2)}\n`)
console.log(`Reference audit: ${boards.length} boards, ${decisions.length} decisions, ${missing.length} unmapped.`)
if (missing.length) {
  console.error(JSON.stringify(missing, null, 2))
  process.exitCode = 1
}
