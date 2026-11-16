// deploy(exec, { uri, args: [package] }): the boot protocol's deploy (README.md beside it).
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'bare-fs'
import { join, dirname } from 'bare-path'
import { tmpdir } from 'bare-os'
import { start } from 'mrepo-base-runtime'
import { guid } from 'mrepo-base-request'
import { build } from '../../internal/build/index.js'
import { parseSource, scriptOf, scriptsOf } from '../../internal/fetch/index.js'
import { lay } from '../../internal/lay/index.js'
import { place } from '../../internal/place/index.js'
import { child } from '../../internal/child.js'

// The organisation of a package named without one.
const ORG = 'haiccing'

// (link: the key of the link, when it has one already: a redeploy keeps it)
export async function deploy (exec, { uri, args = [], flags = {} }, { link: kept = null } = {}) {
  const c = child(exec, uri)
  if (await c.recorded()) throw new Error(`deployed already: ${c.at}`)
  // a position that exists locally (data in main there): not a target
  await c.refuse()
  if (existsSync(c.dir)) throw new Error(`in the way: ${c.dir}`)
  if (!args[0]) throw new Error('missing argument: package')
  // <org>/<package>; the package alone: ours
  const target = args[0].includes('/') ? args[0] : `${ORG}/${args[0]}`
  // The store and the sources: the mapping the parent's packages manifest records.
  const manifest = await exec.find('/packages/manifest.json')
  let mine = null
  if (manifest !== null) { try { mine = JSON.parse(manifest.toString()) } catch (err) { throw new Error('not a document: /packages/manifest.json', { cause: err }) } }
  if (!mine?.store) throw new Error('no store: the parent\'s packages manifest names none')
  const store = mine.store
  const sources = (mine.sources || []).map(parseSource)
  // The target's list laid in: each package's mrepo/ part, in that order,
  // runtime config from the last only; built at its own place, by its
  // unique URI.
  const tmp = mkdtempSync(join(tmpdir(), `deploy-${c.name}-`))
  try {
    const { list } = await exec.step('lay', r => ({ package: target, packages: r.list.length }), async () => lay({ store, sources, target, into: tmp }))
    // A continuation asked for (the flag: continuation=<script>): a script
    // of the package deployed, by its name, answered with the deploy for
    // who asked to go on with, its commands written from the mrepo's own
    // place. One that is not there: refused, before anything is built.
    const script = typeof flags.continuation === 'string' ? flags.continuation : null
    const commands = script ? scriptOf({ store, pkg: target, name: script }) : null
    if (script && commands === null) throw new Error(`no script: ${script} (${target} has ${scriptsOf({ store, pkg: target }).join(', ') || 'none'})`)
    // Its identity, in its runtime layer (where it has one): its unique URI.
    if (existsSync(join(tmp, 'runtime', 'layer.json'))) writeFileSync(join(tmp, 'runtime', 'mrepo.json'), JSON.stringify({ uri: c.mrepo }, null, 2) + '\n')
    mkdirSync(dirname(c.dir), { recursive: true })
    const { layers } = await exec.step('build', r => ({ dir: c.dir, layers: r.layers.length }), () => build({ from: tmp, dir: c.dir, setting: false }))
    const { packages } = await exec.step('place', r => ({ packages: Object.keys(r.packages).length }), () => place({ dir: c.dir, store, sources, list }))
    // What is local to this machine about it: not in main, which replicates.
    const record = { package: target, packages: Object.keys(packages), layers }
    // (its link's record says besides: which mrepo, linked where, how, placed where)
    const link = kept ?? guid()
    const entry = () => ({ key: link, uri: c.mrepo, at: c.at, how: 'deployed', folder: c.folder, ...record })
    // Its runtime started, from its own packages/ (its pinned runtime), by
    // its directory: its inbox operational. Not when it has no runtime.
    const runtime = join(c.dir, 'packages', 'haiccing', 'base-package-runtime.bundle')
    if (existsSync(runtime)) {
      const s = await exec.step('runtime', r => ({ started: Boolean(r), pid: r?.pid ?? null }), () => start({ repo: c.dir, bundle: runtime }))
      if (!s) throw new Error(`its runtime did not start: ${c.dir}`)
      record.runtime = { pid: s.pid }
    } else exec.log('verbose', 'no runtime', { package: target })
    // Its node, in main, and beside it its shortcuts: which mrepo, and the
    // link's key: what is needed to show it. The rest in the links layer.
    exec.put(c.node, Buffer.from('{}\n'))
    exec.put(c.links, Buffer.from(JSON.stringify([{ mrepo: c.mrepo, link }], null, 2) + '\n'))
    exec.put(c.local(link), Buffer.from(JSON.stringify(entry(), null, 2) + '\n'))
    // The mrepo registry, where this mrepo keeps one (the boot mrepo): the
    // mrepo's node there, by its unique URI, with the same record.
    if (await c.registers()) {
      if (await exec.find(c.swarm) === null) exec.put(c.swarm, Buffer.from('{}\n'))
      exec.put(c.registry, Buffer.from(JSON.stringify(entry(), null, 2) + '\n'))
    }
    if (commands) { exec.continuation(commands, c.at); exec.log('verbose', 'continuation', { script, commands: commands.length }) }
    exec.log('info', 'deployed', { at: c.at, mrepo: c.mrepo, package: target })
    return { deployed: c.at, mrepo: c.mrepo, ...record }
  } finally { rmSync(tmp, { recursive: true, force: true }) }
}
