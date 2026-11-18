// load: a component's packages loaded from its Splectral side, their
// protocols and actions; the one that answers its pages (README.md beside it).
import { existsSync, readFileSync } from 'bare-fs'
import { join } from 'bare-path'
import { pathToFileURL } from 'bare-url'

export async function load (side) {
  const file = join(side, 'component.json')
  if (!existsSync(file)) throw new Error(`no component here: ${side} (splectral/install first)`)
  const record = JSON.parse(readFileSync(file, 'utf8'))
  const actions = {}
  const protocols = {}
  let top = null
  for (const pkg of record.list ?? []) {
    if (!(record.packages?.[pkg]?.entries ?? []).includes('protocol')) continue
    const bundle = join(side, 'packages', `${pkg}.bundle`)
    if (!existsSync(bundle)) throw new Error(`a package of the component missing: ${bundle}`)
    // its dispatcher: run('/protocol') (imported, nothing else runs)
    const offered = await (await import(pathToFileURL(bundle).href)).run('/protocol')
    for (const [p, fns] of Object.entries(offered.actions ?? {})) actions[p] = { ...actions[p], ...fns }
    for (const [p, cfg] of Object.entries(offered.protocols ?? {})) protocols[p] = cfg
    // the pages: the last package of the list with a protocol, its protocol that has `page`
    const own = Object.keys(offered.protocols ?? {}).find(p => typeof offered.actions?.[p]?.page === 'function')
    if (own) top = { package: pkg, protocol: own }
  }
  if (!top) throw new Error(`${record.component}: no package of its list answers pages (a protocol with the action page)`)
  return { record, actions, protocols, top }
}
