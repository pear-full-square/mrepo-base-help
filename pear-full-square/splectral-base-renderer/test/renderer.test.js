import test from 'brittle'
import os from 'bare-os'
import process from 'bare-process'
import { spawn } from 'bare-subprocess'
import Bundle from 'bare-bundle'
import { mkdtempSync, mkdirSync, writeFileSync, renameSync, readFileSync, readdirSync, rmSync, existsSync } from 'bare-fs'
import { join, dirname } from 'bare-path'
import { tmpdir } from 'bare-os'
import { fileURLToPath } from 'bare-url'
import { load, render } from '../index.js'

const here = join(dirname(fileURLToPath(import.meta.url)), '..')
const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
const until = async (ok, ms = 5000) => { for (let i = 0; i < ms / 50; i++) { if (await ok()) return true; await wait(50) } return false }
// catch: no such process: not alive
const alive = pid => { try { os.kill(pid, 0); return true } catch { return false } }

// A package's bundle as the renderer loads one: its dispatcher's
// run('/protocol') answering with its protocols and actions.
function bundle (file, main) {
  const b = new Bundle()
  b.write('/package.json', JSON.stringify({ type: 'module' }))
  b.write('/main.js', main, { main: true })
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, b.toBuffer())
}
// A component's Splectral side as splectral/install leaves it: an element
// set (ui), the top package (demo, its page), the component itself.
function side () {
  const dir = mkdtempSync(join(tmpdir(), 'renderer-'))
  const s = join(dir, 'splectral')
  bundle(join(s, 'packages', 'splectral', 'ui.bundle'), `export async function run () { return { protocols: { ui: { actions: { page: {} } } }, actions: { ui: { page: async (exec, { args: [input] }) => '<h1>' + input.title + '</h1>' } } } }`)
  bundle(join(s, 'packages', 'splectral', 'demo.bundle'), `export async function run () { return { protocols: { demo: { actions: { page: {} } } }, actions: { demo: { page: async (exec, { uri, query, base }) => {
    if (uri === 'fail') throw new Error('it failed')
    const answer = await exec.data(query.at ?? 'docs', ['info/get', uri])
    exec.log('verbose', 'drawn', { uri })
    return exec.element('ui/page', { title: answer.title + ' at ' + base })
  } } } } }`)
  writeFileSync(join(s, 'packages', 'splectral', 'component.bundle'), '')
  mkdirSync(join(s, 'inbox'), { recursive: true })
  mkdirSync(join(s, 'outbox'), { recursive: true })
  writeFileSync(join(s, 'component.json'), JSON.stringify({ at: 'demo', mrepo: 'local/demo', component: 'splectral/component', list: ['splectral/ui', 'splectral/demo', 'splectral/component'], packages: { 'splectral/ui': { entries: ['protocol'] }, 'splectral/demo': { entries: ['protocol'] }, 'splectral/component': { entries: [] } } }))
  return { dir, side: s }
}
const put = (folder, key, value) => { writeFileSync(join(folder, `${key}.json.new`), JSON.stringify(value)); renameSync(join(folder, `${key}.json.new`), join(folder, `${key}.json`)) }
const envelope = (key, form) => ({ topic: '/local/demo/splectral/inbox', key, timestamp: new Date().toISOString(), headers: {}, value: { topic: '/splectral', key, timestamp: new Date().toISOString(), headers: {}, value: form } })
const taken = (folder, key) => existsSync(join(folder, `${key}.json`)) ? JSON.parse(readFileSync(join(folder, `${key}.json`), 'utf8')) : null

test('load: the component\'s packages, as the runtime loads protocols; the last with a page its top', async (t) => {
  const { dir, side: s } = side()
  try {
    const l = await load(s)
    t.alike(Object.keys(l.actions).sort(), ['demo', 'ui'], 'the protocols of its list, the component itself none')
    t.alike(l.top, { package: 'splectral/demo', protocol: 'demo' }, 'its pages: the last package with a protocol that has page')
    await t.exception(load(join(dir, 'none')), /no component here/)
  } finally { rmSync(dir, { recursive: true, force: true }) }
})

test('render: a page asked in the inbox, its data asked through the outbox, an element drawn, the page answered; an error said', { timeout: 30000 }, async (t) => {
  const { dir, side: s } = side()
  const inbox = join(s, 'inbox')
  const outbox = join(s, 'outbox')
  const r = render({ side: s, loaded: await load(s), every: 200 })
  try {
    const key = '11111111-1111-4111-8111-111111111111'
    put(inbox, key, envelope(key, { request: 'page', path: 'hdlc', query: {}, base: '/demo' }))
    t.ok(await until(() => readdirSync(outbox).length === 1), 'a data request in its outbox')
    t.absent(existsSync(join(inbox, `${key}.json`)), 'the page request taken from the inbox')
    const name = readdirSync(outbox)[0]
    const asked = JSON.parse(readFileSync(join(outbox, name), 'utf8'))
    t.alike(asked.value.value, { request: 'data', at: 'docs', command: ['info/get', 'hdlc'] }, 'the data the page needs: a command at a position')
    t.is(asked.value.topic, '/local/demo/splectral/inbox', 'its answer to come back to its inbox')
    rmSync(join(outbox, name))
    // the platform's answer, as the server writes it
    put(inbox, asked.key, envelope(asked.key, { ...asked.value.value, output: { title: 'HDLC' } }))
    t.ok(await until(() => taken(outbox, key)), 'the page answered under its own key')
    t.alike(taken(outbox, key).value.value, { request: 'page', path: 'hdlc', query: {}, base: '/demo', output: '<h1>HDLC at /demo</h1>' }, 'made by the top package with its element')
    const bad = '22222222-2222-4222-8222-222222222222'
    put(inbox, bad, envelope(bad, { request: 'page', path: 'fail', query: {}, base: '/demo' }))
    t.ok(await until(() => taken(outbox, bad)))
    t.is(taken(outbox, bad).value.value.error, 'it failed', 'an action that throws: the page\'s error')
    t.ok(r.entries().some(e => e.event === 'drawn'), 'what the action logged kept')
  } finally {
    r.stop()
    rmSync(dir, { recursive: true, force: true })
  }
})

test('the program: its state once it follows its inbox, removed as it ends; ended with its runtime', { timeout: 30000 }, async (t) => {
  const { dir } = side()
  const state = join(dir, 'renderer.state.json')
  const runtime = spawn(Bare.argv[0], ['-e', 'setInterval(() => {}, 1000)'], { stdio: 'ignore' })
  const p = spawn(Bare.argv[0], [join(here, 'test', 'renderer.js'), `--dir=${dir}`, `--state=${state}`, `--runtime=${runtime.pid}`], { stdio: 'ignore' })
  try {
    t.ok(await until(() => existsSync(state), 10000), 'its state written')
    const s = JSON.parse(readFileSync(state, 'utf8'))
    t.alike([s.pid, s.component, s.pages], [p.pid, 'splectral/component', 'demo/page'], 'its pid, the component, what answers its pages')
    runtime.kill()
    t.ok(await until(() => !alive(p.pid), 10000), 'ended with its runtime')
    t.absent(existsSync(state), 'its state removed')
  } finally {
    // catch: ended already: nothing to signal
    try { runtime.kill() } catch {}
    // catch: ended already: nothing to signal
    try { os.kill(p.pid, 'SIGKILL') } catch {}
    rmSync(dir, { recursive: true, force: true })
  }
})
