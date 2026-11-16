// status(exec): the container protocol's status (README.md beside it).
import { available, stateOf } from '../../internal/docker/index.js'
import { replica } from '../../internal/replica/index.js'

export async function status (exec) {
  const r = replica(exec)
  const recorded = await r.recorded()
  if (!recorded) { exec.log('verbose', 'no replica', { at: r.at }); return { replica: null, state: 'none' } }
  available()
  const name = recorded.container?.name ?? r.name
  // (gone: recorded here, its container not there any more)
  const state = stateOf(name) ?? 'gone'
  exec.log('verbose', 'state', { container: name, state })
  return { replica: r.at, mrepo: r.mrepo, container: name, image: recorded.container?.image ?? null, state }
}
