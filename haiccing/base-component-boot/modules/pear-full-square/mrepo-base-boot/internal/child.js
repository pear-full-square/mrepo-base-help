// child(exec, uri): the child mrepo a boot action names; shared by the
// actions (not documented: a helper).
//   uri       the request's, its segments: ['main', '<name>']
//   at        its position as written at main: <name>
//   dir       its folder: by its unique URI, side by side with the others
//             under the work folder's mrepos/: <work>/mrepos/<swarm>/<name>
//   folder    the same, relative to this mrepo's own folder
//   node      its node's document, in main: main/<name>/.node.json
//   links     its shortcuts, in main beside it: main/<name>/.shortcuts.json,
//             a list; the child is one entry, { mrepo }: only the link
//   local     what is local to this machine about it (where it is, the
//             position that links to it, the package it was deployed
//             from, the packages placed, its layers, its runtime's
//             process): its entry in the registry layer, a node by its
//             unique URI: registry/<swarm>/<name>/.node.json; main
//             replicates, this does not
//   mrepo     its unique URI: in its parent's swarm, <swarm>/<name>
//   recorded  its link and what is local, as one record; null: not deployed
//   exists    whether a node is there already without being this link:
//             data in main at that position. The boot protocol cannot
//             target that: refuse() throws then
// A target is needed: main itself, or the root, is the mrepo, which one
// cannot deploy or tear down.
import { join, dirname, relative } from 'bare-path'
import { segmented, joined, within, ROOT } from 'mycelium-uri'
import { MREPOS } from 'mrepo-base-request'
import { shortcutOf, shortcutsAt, registered, entryOf, uriOf } from 'mrepo-base-xpath'

export const NODE = '.node.json'

export function child (exec, segments) {
  if (segments === undefined || segmented(segments).at(-1) === ROOT) throw new Error('missing argument: target')
  const uri = joined(segments)
  if (uri === 'main') throw new Error('missing argument: target')
  const at = within('main', uri)
  if (at === null) throw new Error(`not a position in main: ${uri} (main/<name>)`)
  if (!/^[a-z][a-z0-9-]*$/.test(at)) throw new Error(`not a name for an mrepo: ${at} (one segment: lowercase letters, digits, hyphens)`)
  const dir = exec.runtime.dir
  if (!dir) throw new Error('no directory in the context')
  const mrepo = uriOf(exec.runtime.uri, at)
  // placed by its unique URI, side by side with the others under the work
  // folder's mrepos/ (beside its parent, where there is no work folder)
  const placed = join(exec.runtime.work ? join(exec.runtime.work, MREPOS) : dirname(dir), mrepo)
  const local = entryOf(mrepo)
  const linked = async () => (await shortcutsAt(exec, at)).find(l => l.mrepo === mrepo) ?? null
  const exists = async () => (await exec.select(`main/${at}`)).length > 0 && !(await linked())
  exec.log('debug', 'child', { at, mrepo, dir: placed })
  return {
    name: at,
    at,
    dir: placed,
    // (as the registry says it: relative to this mrepo's own folder)
    folder: relative(dir, placed),
    node: `main/${at}/${NODE}`,
    links: shortcutOf(at),
    local,
    mrepo,
    recorded: async () => { const l = await linked(); return l ? { ...l, ...(await registered(exec, mrepo) ?? {}) } : null },
    exists,
    refuse: async () => { if (await exists()) throw new Error(`${at} exists locally: the boot protocol cannot target it`) }
  }
}
