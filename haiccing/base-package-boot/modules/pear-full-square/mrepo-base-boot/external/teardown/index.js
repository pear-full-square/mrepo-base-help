// teardown(exec, { uri }): the boot protocol's teardown (README.md beside it).
import { rmSync } from 'bare-fs'
import { stop } from 'mrepo-base-runtime'
import { segmented, ROOT } from 'mycelium-uri'
import { query, registered, REGISTRY, MAIN } from 'mrepo-base-xpath'
import { child } from '../../internal/child.js'

// Several at once: a URI read at the registry (layer=registry) selects
// entries there, by unique URI (local/*, a filter on what an entry says):
// each torn down at the position that links to it. -> a list
async function several (exec, uri) {
  const { found } = await query(exec, uri)
  const out = []
  for (const f of found) {
    // (an entry is a node; a folder above the entries, a swarm's, is none)
    const entry = f.kind === 'node' && f.at !== ROOT ? await registered(exec, f.at) : null
    if (entry?.at) out.push(await teardown(exec, { uri: [MAIN, entry.at] }))
  }
  exec.log('verbose', 'several', { uri: uri.join('/'), tornDown: out.length })
  return out
}

export async function teardown (exec, { uri }) {
  if (segmented(uri)[0] === REGISTRY) return several(exec, uri)
  const c = child(exec, uri)
  const recorded = await c.recorded()
  if (!recorded) { await c.refuse(); throw new Error(`not deployed: ${c.at}`) }
  // Its runtime stopped first (when it runs), waited for until its process
  // has ended (mrepo-base-runtime's stop: asked, then SIGTERM, then SIGKILL).
  const stopped = await exec.step('runtime', r => ({ pid: recorded.runtime?.pid ?? null, stopped: r ?? null }), () => stop({ repo: c.dir, pid: recorded.runtime?.pid }))
  await exec.step('folder', { dir: c.dir }, async () => rmSync(c.dir, { recursive: true, force: true }))
  // its link, the node it was made at, and what was local about it
  exec.remove(c.links)
  exec.remove(c.node)
  if (await exec.find(c.local) !== null) exec.remove(c.local)
  exec.log('info', 'torn down', { at: c.at, mrepo: c.mrepo, runtime: stopped ?? null })
  return { tornDown: c.at }
}
