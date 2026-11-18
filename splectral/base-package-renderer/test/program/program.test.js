// The package's program, run.js, as a component's start hook starts it
// (runtime/start: --dir, --runtime, --state), against a component's
// Splectral side made here: two packages' bundles (an element set and the
// component's own, its page), the component's record. A page asked
// through its inbox, its data answered as the server answers it, the page
// read from its outbox; then ended with its runtime. No mrepo is built.
import test from '../../modules/node_modules/brittle/index.js'
import os from '../../modules/node_modules/bare-os/index.js'
import { spawn } from '../../modules/node_modules/bare-subprocess/index.js'
import Bundle from '../../modules/node_modules/bare-bundle/index.js'
import { mkdtempSync, mkdirSync, writeFileSync, renameSync, readFileSync, readdirSync, rmSync, existsSync } from '../../modules/node_modules/bare-fs/index.js'
import { join, dirname } from '../../modules/node_modules/bare-path/index.js'
import { fileURLToPath } from '../../modules/node_modules/bare-url/index.js'

const pkg = join(dirname(fileURLToPath(import.meta.url)), '..', '..')
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
const until = async (ok, ms = 10000) => { for (let i = 0; i < ms / 50; i++) { if (await ok()) return true; await wait(50) } return false }
// catch: no such process: not alive
const alive = pid => { try { os.kill(pid, 0); return true } catch { return false } }
function bundle (file, main) {
  const b = new Bundle()
  b.write('/package.json', JSON.stringify({ type: 'module' }))
  b.write('/main.js', main, { main: true })
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, b.toBuffer())
}
const put = (folder, key, value) => { writeFileSync(join(folder, `${key}.json.new`), JSON.stringify(value)); renameSync(join(folder, `${key}.json.new`), join(folder, `${key}.json`)) }
const envelope = (key, form) => ({ topic: '/local/demo/splectral/inbox', key, timestamp: new Date().toISOString(), headers: {}, value: { topic: '/splectral', key, timestamp: new Date().toISOString(), headers: {}, value: form } })

test('the program: a component\'s pages made over its Splectral boxes; its state; ended with its runtime', { timeout: 60000 }, async (t) => {
  const dir = mkdtempSync(join(os.tmpdir(), 'renderer-program-'))
  const side = join(dir, 'splectral')
  bundle(join(side, 'packages', 'splectral', 'ui.bundle'), `export async function run () { return { protocols: { ui: {} }, actions: { ui: { page: async (exec, { args: [i] }) => '<h1>' + i.title + '</h1>' } } } }`)
  bundle(join(side, 'packages', 'splectral', 'demo.bundle'), `export async function run () { return { protocols: { demo: {} }, actions: { demo: { page: async (exec, { uri }) => exec.element('ui/page', { title: (await exec.data('docs', ['info/get', uri])).title }) } } } }`)
  mkdirSync(join(side, 'inbox'), { recursive: true })
  mkdirSync(join(side, 'outbox'), { recursive: true })
  writeFileSync(join(side, 'component.json'), JSON.stringify({ at: 'demo', mrepo: 'local/demo', component: 'splectral/component', list: ['splectral/ui', 'splectral/demo', 'splectral/component'], packages: { 'splectral/ui': { entries: ['protocol'] }, 'splectral/demo': { entries: ['protocol'] }, 'splectral/component': { entries: [] } } }))
  const state = join(dir, 'renderer.state.json')
  const runtime = spawn(Bare.argv[0], ['-e', 'setInterval(() => {}, 1000)'], { stdio: 'ignore' })
  const p = spawn(Bare.argv[0], [join(pkg, 'run.js'), `--dir=${dir}`, `--runtime=${runtime.pid}`, `--state=${state}`], { stdio: 'ignore' })
  try {
    t.ok(await until(() => existsSync(state)), 'its state written once it follows its inbox')
    t.is(JSON.parse(readFileSync(state, 'utf8')).pages, 'demo/page', 'what answers its pages: the last package of the list with a page')
    const key = '11111111-1111-4111-8111-111111111111'
    put(join(side, 'inbox'), key, envelope(key, { request: 'page', path: 'hdlc', query: {}, base: '/demo' }))
    t.ok(await until(() => readdirSync(join(side, 'outbox')).length === 1), 'a data request in its outbox')
    const name = readdirSync(join(side, 'outbox'))[0]
    const asked = JSON.parse(readFileSync(join(side, 'outbox', name), 'utf8'))
    t.alike(asked.value.value, { request: 'data', at: 'docs', command: ['info/get', 'hdlc'] })
    rmSync(join(side, 'outbox', name))
    put(join(side, 'inbox'), asked.key, envelope(asked.key, { ...asked.value.value, output: { title: 'HDLC' } }))
    t.ok(await until(() => existsSync(join(side, 'outbox', `${key}.json`))), 'the page answered')
    t.is(JSON.parse(readFileSync(join(side, 'outbox', `${key}.json`), 'utf8')).value.value.output, '<h1>HDLC</h1>', 'made by the component\'s own action, drawn with its element')
    runtime.kill()
    t.ok(await until(() => !alive(p.pid)), 'ended with its runtime')
    t.absent(existsSync(state), 'its state removed')
  } finally {
    // catch: ended already: nothing to signal
    try { runtime.kill() } catch {}
    // catch: ended already: nothing to signal
    try { os.kill(p.pid, 'SIGKILL') } catch {}
    rmSync(dir, { recursive: true, force: true })
  }
})
