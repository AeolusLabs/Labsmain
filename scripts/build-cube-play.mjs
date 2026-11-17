// Transpiles the real engine modules the cube test page needs into public/cube-play/ (git-ignored output).
// Usage: node scripts/build-cube-play.mjs
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import ts from 'typescript'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'components/new/engine')
const out = join(root, 'public/cube-play')
const modules = ['math', 'shapes', 'shaders', 'camera', 'cube', 'cube-play', 'cube-play-input']

mkdirSync(out, { recursive: true })
for (const name of modules) {
  const code = readFileSync(join(src, `${name}.ts`), 'utf8')
  const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText
    .replace(/(from\s+['"])(\.\/[\w-]+)(['"])/g, '$1$2.js$3')
  writeFileSync(join(out, `${name}.js`), js)
}
console.log(`cube-play: wrote ${modules.length} modules to public/cube-play/`)
