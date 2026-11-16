// stop(exec): the container protocol's stop (README.md beside it).
import { docker, available, stateOf } from '../../internal/docker/index.js'
import { replica } from '../../internal/replica/index.js'

export async function stop (exec) {
  const r = replica(exec)
  const recorded = await r.recorded()
  if (!recorded) throw new Error(`no replica: ${r.at} (container/create)`)
  available()
  const name = recorded.container?.name ?? r.name
  const was = stateOf(name)
  if (was === null) throw new Error(`its container is gone: ${name} (container/remove, then container/create)`)
  if (was !== 'running' && was !== 'paused') { exec.log('verbose', 'not running', { container: name, state: was }); return { stopped: r.at, container: name, state: was } }
  // asked to end (SIGTERM: its runtime closes), killed after ten seconds
  const state = await exec.step('container', s => ({ container: name, state: s }), async () => {
    const s = docker('stop', '-t', '10', name)
    if (!s.ok) throw new Error(`its container did not stop: ${name}: ${s.err.split('\n').pop()}`)
    return stateOf(name)
  })
  exec.log('info', 'stopped', { at: r.at, container: name })
  return { stopped: r.at, container: name, state }
}
