// node: a node as it is stored, and the nodes a URI selects (README.md
// beside it). Paths are written relative, from the mrepo's root.
import { segmented, joined, isName, ROOT } from 'mycelium-uri'
import { shortcutsAt } from 'mrepo-base-xpath'

// A node is a folder holding its document under this name: hidden (no URI
// has a name starting with a dot), and what keeps the folder in git.
export const NODE = '.node.json'

// place(uri): where a request's URI (its segments) points: its layer, the
// names below it, whether the last selects ('*'), and uriOf(names): a
// node's URI in the same format, the request's prefix kept.
export function place (segments) {
  const whole = joined(segmented(segments))
  if (whole === ROOT) throw new Error('not a node: . (the mrepo itself; a layer first: main)')
  const [layer, ...names] = whole.split('/')
  const star = names.at(-1) === '*'
  for (const n of star ? names.slice(0, -1) : names) if (!isName(n)) throw new Error(`not a name for a node: ${n} (in ${whole}: lowercase words joined by hyphens, no extension)`)
  const prefix = segments.slice(0, -1)
  const skip = joined(prefix) === ROOT ? 0 : joined(prefix).split('/').length
  const uriOf = of => [...prefix, [layer, ...of].slice(skip).join('/') || ROOT]
  return { layer, names: star ? names.slice(0, -1) : names, star, uriOf, at: of => of.join('/') || ROOT }
}

const dir = (p, names) => [p.layer, ...names].join('/')
// A document that may not be there: undefined then; one that is there
// and is no document is an error, not a missing one.
// log: none (one read; select says what was found)
const json = async (exec, path) => {
  const bytes = await exec.find(path)
  if (bytes === null) return undefined
  try { return JSON.parse(bytes.toString()) } catch (err) { throw new Error(`not a document: ${path}`, { cause: err }) }
}
const base = path => path.slice(path.lastIndexOf('/') + 1)

// In main a URI does not run through a shortcut: none of the names above
// the last may be one (through: the last too, for what is below it).
async function inside (exec, p, names, through = false) {
  if (p.layer !== 'main') return
  for (let i = 1; i < names.length + (through ? 1 : 0); i++) {
    const position = names.slice(0, i).join('/')
    if ((await shortcutsAt(exec, position)).length) throw new Error(`${position} is a shortcut: a URI does not run through it (haicc ${position} haicc ${names.slice(i).join('/') || '.'} ...)`)
  }
  exec.log('debug', 'inside', { layer: p.layer, positions: Math.max(0, names.length + (through ? 1 : 0) - 1) })
}

// The names of a node's children: the folders in it that are nodes (each
// holding its document); a hidden folder, or one without, is none.
// log: none (a listing; select says each node and its children)
async function childrenOf (exec, p, names) {
  const found = await exec.select(`${dir(p, names)}/*`)
  const out = []
  for (const [path, n] of found) {
    if (n.type !== 'tree' || base(path).startsWith('.')) continue
    if ((await exec.select(`${path}/${NODE}`)).length) out.push(base(path))
  }
  return out.sort()
}

// nodeAt(exec, p, names): the node there, { uri, value, children }, with
// its shortcuts where it has some (a node that is a link: where its data
// comes from); null when there is none. The layer itself is a node, its
// document {} when it has none.
// log: in select, and in create: each node looked at, at debug
export async function nodeAt (exec, p, names) {
  const value = await json(exec, `${dir(p, names)}/${NODE}`)
  if (value === undefined && names.length) return null
  const node = { uri: p.uriOf(names), value: value ?? {}, children: await childrenOf(exec, p, names) }
  const links = p.layer === 'main' && names.length ? await shortcutsAt(exec, names.join('/')) : []
  return links.length ? { ...node, shortcuts: links } : node
}

// select(exec, p): the nodes the URI selects, an array: the one it names
// (none there: empty, not an error), or with '*' the children of the one
// before it. -> [{ names, node }]
export async function select (exec, p) {
  return exec.step('select', found => ({ uri: [p.layer, ...p.names, ...(p.star ? ['*'] : [])].join('/'), selected: found.length }), async () => {
    await inside(exec, p, p.names, p.star)
    const of = p.star ? (await childrenOf(exec, p, p.names)).map(n => [...p.names, n]) : [p.names]
    const out = []
    for (const names of of) {
      const node = await nodeAt(exec, p, names)
      exec.log('debug', 'node', { at: p.at(names), there: Boolean(node), children: node?.children.length ?? 0, shortcut: Boolean(node?.shortcuts) })
      if (node) out.push({ names, node })
    }
    return out
  })
}

export { dir as folderOf, inside }
