// remove(exec): the container protocol's remove (README.md beside it).
import { rmSync } from 'bare-fs'
import { docker, available, stateOf } from '../../internal/docker/index.js'
import { replica } from '../../internal/replica/index.js'

export async function remove (exec) {
  const r = replica(exec)
  const recorded = await r.recorded()
  if (!recorded) { await r.refuse(); throw new Error(`no replica: ${r.at}`) }
  available()
  const name = recorded.container?.name ?? r.name
  // Its container, running or not; one that is gone already is no error.
  await exec.step('container', { container: name }, async () => {
    if (stateOf(name) === null) return
    const s = docker('rm', '-f', name)
    if (!s.ok) throw new Error(`its container was not removed: ${name}: ${s.err.split('\n').pop()}`)
  })
  await exec.step('folder', { dir: r.dir }, async () => rmSync(r.dir, { recursive: true, force: true }))
  // its link, the node it was made at, and what was local about it
  exec.remove(r.links)
  exec.remove(r.node)
  if (recorded.link && await exec.find(r.local(recorded.link)) !== null) exec.remove(r.local(recorded.link))
  exec.log('info', 'removed', { at: r.at, mrepo: r.mrepo, container: name })
  return { removed: r.at, container: name }
}
