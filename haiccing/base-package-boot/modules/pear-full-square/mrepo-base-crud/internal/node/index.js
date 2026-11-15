// node: a node as it is stored, and the nodes a URI selects (README.md
// beside it). Paths are written relative, from the mrepo's root.
import { segmented, joined, stepsOf, selects, isName, ROOT } from 'mycelium-uri'
import { query, shortcutsAt, NODE } from 'mrepo-base-xpath'

// A node is a folder holding its document under this name (NODE, the
// mrepo's: mrepo-base-xpath).
export { NODE }

// place(uri): where a request's URI (its segments) points: its layer; the
// names below it when it names one node (names; null when it selects: a
// `*` or a filter in it, a query); and uriOf(names): a node's URI in the
// same format, the request's prefix kept.
export function place (segments) {
  const whole = joined(segmented(segments))
  if (whole === ROOT) throw new Error('not a node: . (the mrepo itself; a layer first: main)')
  const [layer, ...steps] = stepsOf(whole)
  for (const step of steps) {
    const n = step.includes('[') ? step.slice(0, step.indexOf('[')) : step
    if (!isName(n) && n !== '*' && n !== '') throw new Error(`not a name for a node: ${n} (in ${whole}: lowercase words joined by hyphens, no extension)`)
  }
  const prefix = segments.slice(0, -1)
  const skip = joined(prefix) === ROOT ? 0 : joined(prefix).split('/').length
  const uriOf = of => [...prefix, [layer, ...of].slice(skip).join('/') || ROOT]
  return { segments, layer, names: selects(whole) ? null : steps, uriOf, at: of => of.join('/') || ROOT }
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

// select(exec, p): what the URI selects, an array (nothing there: empty,
// not an error): the nodes, each as nodeAt gives it; a value inside a
// node's document, { uri, value }. What is no node (a file, a folder
// without a document) is not among them. A URI does not run through a
// shortcut: refused, said with the way across. -> [{ names, node, value? }]
export async function select (exec, p) {
  const { found, stopped } = await query(exec, p.segments)
  if (stopped.length) {
    const [{ at, rest }] = stopped
    throw new Error(`${at} is a shortcut: a URI does not run through it (haicc ${at} haicc ${rest} ...)`)
  }
  const out = []
  for (const f of found) {
    const names = f.at === ROOT ? [] : f.at.split('/')
    if (f.kind === 'value') { out.push({ names, node: { uri: p.uriOf(names), value: f.value }, value: true }); continue }
    const node = f.kind === 'node' ? await nodeAt(exec, p, names) : null
    exec.log('debug', 'node', { at: p.at(names), there: Boolean(node), children: node?.children.length ?? 0, shortcut: Boolean(node?.shortcuts) })
    if (node) out.push({ names, node })
  }
  return out
}

export { dir as folderOf, inside }
