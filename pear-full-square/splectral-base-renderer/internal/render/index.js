// render: a component's Splectral inbox followed, its pages made by its
// top package, the data they need asked of the platform (README.md beside it).
import { rmSync } from 'bare-fs'
import { join } from 'bare-path'
import { record, wrap, guid, outboxOf } from 'mrepo-base-request'
import { follow, TOPIC, SIDE } from 'splectral-server'

const completed = form => form && typeof form === 'object' && ('output' in form || 'error' in form)

// side: the component's Splectral side; loaded: what load() gave.
// -> { stop, entries }
export function render ({ side, loaded, timeout = 120, every = 2000 }) {
  const { actions, top, record: installed } = loaded
  const pending = new Map()
  const entries = []
  // (into the outbox, to the server: the core's topic where its answer goes)
  const out = (key, form, topic) => outboxOf(side).write(key, wrap(TOPIC, { ...record(topic, form, key) }))
  // An execution as a component's action sees it: its data asked of the
  // platform, an element drawn by name, its log.
  const execution = () => ({
    log: (level, event, data = {}) => entries.push({ level, event, time: new Date().toISOString(), ...data }),
    data (at, command) {
      const key = guid()
      const answered = new Promise((resolve, reject) => {
        const t = setTimeout(() => { pending.delete(key); reject(new Error(`no answer in ${timeout} s: ${at} ${command.join(' ')}`)) }, timeout * 1000)
        pending.set(key, form => { clearTimeout(t); pending.delete(key); 'error' in form ? reject(new Error(form.error)) : resolve(form.output) })
      })
      out(key, { request: 'data', at, command }, `/${installed.mrepo}/${SIDE}/inbox`)
      return answered
    },
    async element (name, ...args) {
      const [p, a] = String(name).split('/')
      const fn = actions[p]?.[a]
      if (typeof fn !== 'function') throw new Error(`no such element: ${name}`)
      return fn(this, { args })
    }
  })
  const following = follow(join(side, 'inbox'), (envelope, file) => {
    rmSync(join(side, 'inbox', file), { force: true })
    const form = envelope?.value?.value
    if (form?.request === 'data' && completed(form)) return pending.get(envelope.key)?.(form)
    if (form?.request !== 'page' || completed(form)) return
    const exec = execution()
    const started = Date.now()
    Promise.resolve()
      .then(() => actions[top.protocol].page(exec, { uri: form.path ?? '', query: form.query ?? {}, base: form.base ?? '' }))
      .then(output => ({ output: String(output ?? '') }), err => ({ error: err.message }))
      .then(done => {
        exec.log('info', 'page', { path: form.path ?? '', ms: Date.now() - started, ok: !('error' in done) })
        out(envelope.key, { ...form, ...done }, envelope.value.topic)
      })
  }, { every })
  return { stop: () => following.stop(), entries: () => [...entries] }
}
