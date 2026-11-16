// create(exec): the container protocol's create (README.md beside it).
import process from 'bare-process'
import os from 'bare-os'
import { existsSync, rmSync } from 'bare-fs'
import { join } from 'bare-path'
import { guid } from 'mrepo-base-request'
import { install, origin } from 'mrepo-base-boot'
import { docker, available, imageOf } from '../../internal/docker/index.js'
import { replica, MOUNT } from '../../internal/replica/index.js'

// The replica's runtime, from its own packages, as its container sees it.
const RUNTIME = join('packages', 'haiccing', 'base-package-runtime.bundle')

export async function create (exec) {
  const r = replica(exec)
  if (await r.recorded()) throw new Error(`created already: ${r.at}`)
  // a position that exists locally (data in main there): not the replica's
  await r.refuse()
  available()
  // The replica is made of what this mrepo is made of: its own package,
  // the last of its list, from the same store.
  const { store, sources, packages } = await origin(exec)
  const target = packages.at(-1)
  if (!target) throw new Error('no package to make a replica from: the mrepo\'s packages manifest lists none')
  let made = false
  try {
    // Its folder, beside the mrepos; its identity, its own unique URI.
    const record = await install(exec, { store, sources, target, dir: r.dir, uri: r.mrepo })
    if (!existsSync(join(r.dir, RUNTIME))) throw new Error(`no runtime to run in a container: ${target} lists no base-package-runtime`)
    // The image: Bare, the one that runs this mrepo.
    const { image } = await exec.step('image', i => ({ image: i.image, built: i.built }), async () => imageOf(process.execPath))
    // The container: the replica's folder its only writable place, as the
    // user who owns it; nothing started yet.
    const { uid, gid } = os.userInfo()
    const args = ['create', '--name', r.name,
      '--label', `haicc.mrepo=${r.mrepo}`, '--label', `haicc.folder=${r.dir}`,
      '--user', `${uid}:${gid}`, '--read-only', '--cap-drop', 'ALL', '--security-opt', 'no-new-privileges',
      '--tmpfs', '/tmp:rw,nosuid,size=64m',
      '-v', `${r.dir}:${MOUNT}`,
      image, join(MOUNT, RUNTIME), MOUNT]
    await exec.step('container', { container: r.name, image }, async () => {
      const c = docker(...args)
      if (!c.ok) throw new Error(`its container was not made: ${r.name}: ${c.err.split('\n').pop()}`)
      made = true
    })
    // Its node, in main, and beside it its shortcut; its link's record,
    // what is local to this machine about it: where it is, what runs it.
    const link = guid()
    const container = { name: r.name, image }
    exec.put(r.node, Buffer.from('{}\n'))
    exec.put(r.links, Buffer.from(JSON.stringify([{ mrepo: r.mrepo, link }], null, 2) + '\n'))
    exec.put(r.local(link), Buffer.from(JSON.stringify({ key: link, uri: r.mrepo, at: r.at, how: 'container', folder: r.folder, ...record, container }, null, 2) + '\n'))
    exec.log('info', 'created', { at: r.at, mrepo: r.mrepo, container: r.name, image })
    return { created: r.at, mrepo: r.mrepo, container, ...record }
  } catch (err) {
    // nothing of it left: its container, when it was made, and its folder
    if (made) docker('rm', '-f', r.name)
    rmSync(r.dir, { recursive: true, force: true })
    throw err
  }
}
