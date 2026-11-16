// child(exec, uri): the child mrepo a boot action names; shared by the
// actions (not documented: a helper).
//   uri       the request's, its segments: ['main', '<name>'], or a
//             swarm's node: ['main', 'swarms/<swarm>/<name>']
//   at        its position as written at main: <name>, or
//             swarms/<swarm>/<name> (the swarm's node there already:
//             above() throws when it is not)
//   name      its own name: the last of its position
//   dir       its folder: by its unique URI, side by side with the others
//             under the work folder's mrepos/: <work>/mrepos/<swarm>/<name>
//   folder    the same, relative to this mrepo's own folder
//   node      its node's document, in main: main/<name>/.node.json
//   links     its shortcuts, in main beside it: main/<name>/.shortcuts.json,
//             a list; the child is one entry, { mrepo, link }: what is
//             needed to show the link: which mrepo, and the link's key
//   local     what is local to this machine about it (where it is, the
//             position that links to it, how it came about, the package
//             it was deployed from, the packages placed, its layers, its
//             runtime's process): its link's record in the links layer,
//             by the link's key: links/<key>.json (local(key): its path);
//             main replicates, this does not
//   registry  its node in the mrepo registry, in main, by its unique URI:
//             main/registry/<swarm>/<name>/.node.json (swarm: its
//             swarm's node above it); written where registers() says
//             this mrepo keeps one: the boot mrepo
//   mrepo     its unique URI, <swarm>/<name>: one name below main, in
//             its parent's swarm (local/host); a swarm's node, in the
//             swarm its position names (swarms/swarm-1/node-1:
//             swarm-1/node-1)
//   recorded  its link and what is local, as one record; null: not deployed
//   exists    whether a node is there already without being this link:
//             data in main at that position. The boot protocol cannot
//             target that: refuse() throws then
// A target is needed: main itself, or the root, is the mrepo, which one
// cannot deploy or tear down.
import { join, dirname, relative } from 'bare-path'
import { segmented, joined, within, ROOT } from 'mycelium-uri'
import { MREPOS } from 'mrepo-base-request'
import { shortcutOf, shortcutsAt, linked, linkPath, registryOf, uriOf, REGISTRY, LOCAL } from 'mrepo-base-xpath'

export const NODE = '.node.json'
// Where a swarm's nodes are, in main: swarms/<swarm>/<name>.
export const SWARMS = 'swarms'
const NAME = /^[a-z][a-z0-9-]*$/

export function child (exec, segments) {
  if (segments === undefined || segmented(segments).at(-1) === ROOT) throw new Error('missing argument: target')
  const uri = joined(segments)
  if (uri === 'main') throw new Error('missing argument: target')
  const at = within('main', uri)
  if (at === null) throw new Error(`not a position in main: ${uri} (main/<name>)`)
  // one name below main, or a swarm's node: swarms/<swarm>/<name>
  const names = at.split('/')
  const swarm = names.length === 3 && names[0] === SWARMS ? names[1] : null
  if (!names.every(n => NAME.test(n)) || !(names.length === 1 || swarm)) throw new Error(`not a position for an mrepo: ${at} (<name>, or ${SWARMS}/<swarm>/<name>: lowercase letters, digits, hyphens)`)
  // (local: the swarm of what is not in one)
  if (swarm === LOCAL) throw new Error(`not a swarm: ${LOCAL} (the mrepos in no swarm: one name below main)`)
  const name = names.at(-1)
  const dir = exec.runtime.dir
  if (!dir) throw new Error('no directory in the context')
  const mrepo = swarm ? `${swarm}/${name}` : uriOf(exec.runtime.uri, name)
  // placed by its unique URI, side by side with the others under the work
  // folder's mrepos/ (beside its parent, where there is no work folder)
  const placed = join(exec.runtime.work ? join(exec.runtime.work, MREPOS) : dirname(dir), mrepo)
  const shortcut = async () => (await shortcutsAt(exec, at)).find(l => l.mrepo === mrepo) ?? null
  const exists = async () => (await exec.select(`main/${at}`)).length > 0 && !(await shortcut())
  exec.log('debug', 'child', { at, mrepo, dir: placed })
  return {
    name,
    at,
    // a swarm's node: its swarm's node is there (made first: crud/create)
    above: async () => { if (swarm && await exec.find(`main/${SWARMS}/${swarm}/${NODE}`) === null) throw new Error(`no node there: ${SWARMS}/${swarm} (crud/create ${SWARMS}/${swarm})`) },
    dir: placed,
    // (as its link's record says it: relative to this mrepo's own folder)
    folder: relative(dir, placed),
    node: `main/${at}/${NODE}`,
    links: shortcutOf(at),
    local: linkPath,
    mrepo,
    // (the mrepo registry: there where main has the node `registry`: the boot mrepo)
    registry: `${registryOf(mrepo)}/${NODE}`,
    swarm: `${registryOf(mrepo.split('/')[0])}/${NODE}`,
    registers: async () => (await exec.find(`main/${REGISTRY}/${NODE}`)) !== null,
    recorded: async () => { const l = await shortcut(); return l ? { ...l, ...(await linked(exec, l.link) ?? {}) } : null },
    exists,
    refuse: async () => { if (await exists()) throw new Error(`${at} exists locally: the boot protocol cannot target it`) }
  }
}
