// The component as it is configured: its list of packages and its hooks,
// value by value; then against the packages it lists, their bundles read
// from the sources (SOURCES): each of the splectral organisation; the
// protocols they provide, as its renderer loads them; what answers its
// pages; and the renderer its hooks start, a program. No mrepo is built.
// Every hook file the component brings must be named here.
import test from '../../modules/node_modules/brittle/index.js'
import { readFileSync, readdirSync, existsSync } from '../../modules/node_modules/bare-fs/index.js'
import { join, dirname } from '../../modules/node_modules/bare-path/index.js'
import { fileURLToPath, pathToFileURL } from '../../modules/node_modules/bare-url/index.js'
import os from '../../modules/node_modules/bare-os/index.js'

const pkg = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const json = (...p) => JSON.parse(readFileSync(join(pkg, ...p), 'utf8'))
const hooksDir = join(pkg, 'mrepo', 'runtime', 'hooks')
const brought = {}
for (const f of existsSync(hooksDir) ? readdirSync(hooksDir).sort() : []) readFileSync(join(hooksDir, f), 'utf8').split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#')).forEach((l, i) => { brought[`${f.replace(/\.haicc$/, '')}/${i + 1}`] = l.split(/\s+/) })

const LIST = [
  'splectral/base-package-renderer',
  'splectral/base-package-ui',
  'splectral/base-package-viewer',
  'splectral/base-component-viewer'
]
const RENDERER = 'splectral/packages/splectral/base-package-renderer'

test('its list of packages, itself last; all of its own organisation', (t) => {
  t.alike(json('mrepo', 'packages', 'layer.json').packages, LIST, 'the renderer, the ui element set, the viewer, the component')
  t.ok(LIST.every(p => p.startsWith('splectral/')), 'none of another organisation: no haiccing package')
})

test('its hooks, file by file: start and stop, its renderer; no other runtime config', (t) => {
  t.alike(brought, {
    'start/1': ['runtime/start', '.', RENDERER],
    'stop/1': ['runtime/stop', '.', RENDERER]
  }, 'each hook file, its transition and its command; none that is not named here')
  t.alike(readdirSync(join(pkg, 'mrepo', 'runtime')).sort(), ['hooks'], 'no service state, no boot hook: the base\'s, it replaces none')
  t.is(RENDERER, `splectral/packages/${LIST[0]}`, 'the renderer where splectral/install places it: the first of its list')
})

// The packages it lists, from the sources: as its renderer loads them.
const sources = os.getEnv('SOURCES')
const provided = {}
const entries = {}
const missing = []
if (sources) {
  for (const name of LIST) {
    const file = join(sources, `${name}.bundle`)
    if (!existsSync(file)) { missing.push(name); continue }
    const d = await import(pathToFileURL(file).href)
    entries[name] = await d.run('/', { dryRun: true })
    if (!entries[name].includes('/protocol')) continue
    const offered = await d.run('/protocol')
    for (const [p, cfg] of Object.entries(offered.protocols ?? {})) provided[p] = { ...cfg, from: name, fns: offered.actions[p] }
  }
}

test('the packages it lists: each in the sources; the element set and the pages, as its renderer loads them; the renderer a program', (t) => {
  t.ok(sources, 'SOURCES: the sources folder, the listed packages\' bundles in it')
  t.alike(missing, [], 'every package of the list has its bundle there')
  t.alike(Object.fromEntries(Object.entries(provided).map(([p, c]) => [p, c.from]).sort()), {
    ui: 'splectral/base-package-ui',
    viewer: 'splectral/base-package-viewer'
  }, 'two protocols: the element set, and the viewer\'s own')
  t.ok(typeof provided.viewer?.fns?.page === 'function', 'its pages: the viewer\'s page, the last package with one')
  t.ok(typeof provided.ui?.fns?.page === 'function', 'its element: ui/page')
  t.ok(entries['splectral/base-package-renderer']?.includes('/run'), 'the renderer: a program, its /run entry, what its start hook starts')
})
