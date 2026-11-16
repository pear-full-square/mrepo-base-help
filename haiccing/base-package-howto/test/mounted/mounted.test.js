// The package's protocol as it is mounted: its protocol.js, what a runtime
// loads through the dispatcher's /protocol entry (imported here directly:
// this test is itself run by the dispatcher), its config value by value,
// the layer it brings, and each action run on a minimal execution: the
// layer extracted from small bundles written for the test, then read. No
// mrepo is built. Every action the config names must be run here: the
// last test fails when one was left out.
import test from '../../modules/node_modules/brittle/index.js'
import os from '../../modules/node_modules/bare-os/index.js'
import Bundle from '../../modules/node_modules/bare-bundle/index.js'
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from '../../modules/node_modules/bare-fs/index.js'
import { join, dirname } from '../../modules/node_modules/bare-path/index.js'
import { fileURLToPath } from '../../modules/node_modules/bare-url/index.js'
import * as mounted from '../../protocol.js'

const pkg = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const B = v => Buffer.from(JSON.stringify(v))
const J = b => JSON.parse(b.toString())
const HOWTO = (title, activity, check = '# the check: it answers') => `# ${title}\n\nDoes ${title} here.\n\nActivity: ${activity}\n\n## Steps\n\n\`\`\`sh\n# what it needs first\nhaicc . crud/create swarms/swarm-1\n${check}\nhaicc . crud/read swarms/swarm-1\n\`\`\`\n`

// An execution as an action sees it: its files by path, its writes
// applied at once; the mrepo's folder, its packages' bundles in it.
function execution (files = {}, dir = null) {
  const abs = p => (p.startsWith('/') ? p : `/${p}`)
  const writes = []
  const exec = {
    runtime: { dir },
    read: async p => { if (!(abs(p) in files)) throw new Error(`nothing at ${p}`); return files[abs(p)] },
    find: async function (p) { try { return await this.read(p) } catch { return null } },
    log: function (level, event, data = {}) { (this.entries ??= []).push({ level, event, ...data }) },
    step: async function (event, data, fn, level = 'verbose') { const r = await fn(); (this.entries ??= []).push({ level, event, ...(typeof data === 'function' ? data(r) : data) }); return r },
    put: (p, bytes) => { writes.push(['put', abs(p)]); files[abs(p)] = Buffer.from(bytes) },
    remove: p => { writes.push(['remove', abs(p)]); delete files[abs(p)] }
  }
  return { exec, files, writes }
}
function bundle (dir, name, files) {
  const b = new Bundle()
  for (const [p, text] of Object.entries(files)) b.write(p, Buffer.from(text))
  mkdirSync(join(dir, 'packages', name.split('/')[0]), { recursive: true })
  writeFileSync(join(dir, 'packages', `${name}.bundle`), b.toBuffer())
}
const ran = new Set()
// an action that wrote into the execution's log as it ran: every one must
const logged = new Set()
const act = async (name, exec, form) => {
  ran.add(name)
  const before = exec.entries?.length ?? 0
  try { return await mounted.actions.howto[name](exec, form) } finally { if ((exec.entries?.length ?? 0) > before) logged.add(name) }
}

test('loaded as a runtime loads it: one protocol, howto, its config and its actions', (t) => {
  t.alike(Object.keys(mounted.protocols), ['howto'], 'the package provides the howto protocol, and no other')
  t.alike(Object.keys(mounted.actions), ['howto'])
  t.alike(Object.keys(mounted.actions.howto).sort(), Object.keys(mounted.protocols.howto.actions).sort(), 'a function for every action configured, and no other')
})

test('its config, value by value; the layer it brings', (t) => {
  const cfg = mounted.protocols.howto
  t.is(cfg.package, 'haiccing/base-package-howto', 'the package that brings it')
  t.ok(cfg.description, 'its description')
  t.alike(Object.keys(cfg).sort(), ['actions', 'default', 'description', 'package'], 'nothing else: not behind a state')
  t.is(cfg.default, 'get', 'its default action: howto alone is howto/get')
  t.alike(Object.keys(cfg.actions).sort(), ['extract', 'get'])
  for (const [name, a] of Object.entries(cfg.actions)) {
    t.alike(a.uris, ['.'], `${name}: at the mrepo itself`)
    t.ok(a.description, `${name}: its description`)
    t.absent('states' in a || 'target' in a, `${name}: no states, no target`)
  }
  t.alike([cfg.actions.get.args, 'args' in cfg.actions.extract], [['what?'], false], 'get: what is asked, optional; extract: no argument')
  const layer = JSON.parse(readFileSync(join(pkg, 'mrepo', 'howto', 'layer.json'), 'utf8'))
  t.alike([layer.mode, Boolean(layer.description)], ['atomic', true], 'its structure: the howto layer, atomic')
})

test('extract, then get: the layer from the packages\' how-tos, read by activity', async (t) => {
  const dir = mkdtempSync(join(os.tmpdir(), 'howto-mounted-'))
  try {
    bundle(dir, 'haiccing/one', { '/README.md': '# one\n\nOne.\n', '/howto/deploy/README.md': HOWTO('deploy', 'node'), '/howto/replica/README.md': HOWTO('replica', 'container') })
    bundle(dir, 'haiccing/two', { '/howto/deploy/README.md': HOWTO('deploy', 'host'), '/howto/odd/README.md': HOWTO('odd', 'host', '# and then') })
    const { exec, files, writes } = execution({ '/packages/manifest.json': B({ packages: { 'haiccing/one': {}, 'haiccing/two': {} } }) }, dir)
    await t.exception(act('get', exec, {}), /no how-tos extracted in this mrepo yet \(howto\/extract\)/, 'get before any extraction: said')
    t.alike(await act('extract', exec, { uri: ['.'] }), { howtos: 4, activities: ['container', 'host', 'node'], changed: true, problems: 1 }, 'extract: the how-tos of both packages, their activities; one against its form, counted')
    t.alike(Object.keys(files).filter(p => p.startsWith('/howto/')).sort(), ['/howto/container/replica.json', '/howto/host/deploy.json', '/howto/host/odd.json', '/howto/index.json', '/howto/layer.json', '/howto/node/deploy.json', '/howto/problems.json'], 'the layer written: the index, the problems, a document a how-to, its config when it had none')
    t.alike(J(files['/howto/problems.json']), [{ package: 'haiccing/two', howto: 'odd', check: 'steps', detail: 'its last step is not the check (its why starts with "the check"): haicc . crud/read swarms/swarm-1' }], 'the problem: a how-to whose last step is not the check')
    const n = writes.length
    t.alike([(await act('extract', exec, { uri: ['.'] })).changed, writes.length], [false, n], 'again: nothing changed, nothing written')
    await t.exception(act('extract', exec, { uri: ['main', 'x'] }), /howto extract: the whole mrepo only/)
    const all = await act('get', exec, {})
    t.alike(all.activities.map(a => [a.activity, a.howtos.map(h => h.howto)]), [['container', ['container/replica']], ['host', ['host/deploy', 'host/odd']], ['node', ['node/deploy']]], 'get: what can be done here, by activity')
    t.alike((await act('get', exec, { args: ['host'] })).howtos.map(h => [h.howto, h.package]), [['host/deploy', 'haiccing/two'], ['host/odd', 'haiccing/two']], 'an activity: its how-tos, their package')
    const one = await act('get', exec, { args: ['node/deploy'] })
    t.alike([one.howto, one.package, one.help, one.steps], ['node/deploy', 'haiccing/one', 'packages/haiccing/one/howto/deploy', [{ why: 'what it needs first', command: 'haicc . crud/create swarms/swarm-1' }, { why: 'the check: it answers', command: 'haicc . crud/read swarms/swarm-1' }]], 'one how-to: its steps as typed, each with why, the last the check')
    t.alike([(await act('get', exec, { args: ['pipeline'] })).found, exec.entries.at(-1).level], [false, 'warn'], 'what is not there: said, a warning, no error')
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('every action the config names was run here', (t) => {
  t.alike([...ran].sort(), Object.keys(mounted.protocols.howto.actions).sort(), 'extract and get')
  t.alike([...logged].sort(), Object.keys(mounted.protocols.howto.actions).sort(), 'and each wrote into the request\'s log as it ran: an action that logs nothing fails this')
})
