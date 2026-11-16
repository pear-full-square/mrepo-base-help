// start(exec): the container protocol's start (README.md beside it).
import { existsSync, rmSync } from 'bare-fs'
import { join } from 'bare-path'
import { docker, available, stateOf } from '../../internal/docker/index.js'
import { replica } from '../../internal/replica/index.js'

// The replica's runtime's socket, in its folder: there once it listens.
const SOCKET = 'runtime.sock'

export async function start (exec, { wait = 20000 } = {}) {
  const r = replica(exec)
  const recorded = await r.recorded()
  if (!recorded) throw new Error(`no replica: ${r.at} (container/create)`)
  available()
  const name = recorded.container?.name ?? r.name
  const was = stateOf(name)
  if (was === null) throw new Error(`its container is gone: ${name} (container/remove, then container/create)`)
  if (was === 'running') { exec.log('verbose', 'running already', { container: name }); return { started: r.at, container: name, state: was } }
  // a socket left by a runtime that did not stop: not this start's
  rmSync(join(r.dir, SOCKET), { force: true })
  const state = await exec.step('container', s => ({ container: name, state: s }), async () => {
    const s = docker('start', name)
    if (!s.ok) throw new Error(`its container did not start: ${name}: ${s.err.split('\n').pop()}`)
    // up when its runtime listens: its socket in the replica's folder
    // time: the wait for its runtime, bounded
    for (const end = Date.now() + wait; Date.now() < end;) {
      const now = stateOf(name)
      if (now === 'running' && existsSync(join(r.dir, SOCKET))) return now
      if (now !== 'running') break
      await new Promise(resolve => setTimeout(resolve, 100))
    }
    const said = docker('logs', '--tail', '5', name)
    throw new Error(`its runtime did not start in its container: ${name} (${stateOf(name) ?? 'gone'})${said.out || said.err ? `: ${(said.err || said.out).split('\n').pop()}` : ''}`)
  })
  exec.log('info', 'started', { at: r.at, container: name })
  return { started: r.at, container: name, state }
}
