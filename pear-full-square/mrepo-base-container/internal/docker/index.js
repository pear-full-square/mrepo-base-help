// docker: the one part that talks to Docker, through its command line;
// also available, imageOf, stateOf (README.md beside it).
import { spawnSync } from 'bare-subprocess'
import { mkdtempSync, writeFileSync, copyFileSync, readFileSync, rmSync } from 'bare-fs'
import { join } from 'bare-path'
import { tmpdir } from 'bare-os'
import crypto from 'bare-crypto'

// The image a replica's container is made from: Bare on a plain base,
// named by the Bare it holds.
export const IMAGE = 'haicc-node'
const BASE = 'debian:bookworm-slim'
const last = text => text.split('\n').pop()

// log: none (one call of the command line; its callers say what they did)
export function docker (...args) {
  const r = spawnSync('docker', args, { stdio: ['ignore', 'pipe', 'pipe'] })
  const out = (r.stdout ?? '').toString().trim()
  const err = r.error ? r.error.message : (r.stderr ?? '').toString().trim()
  return { ok: r.status === 0, out, err }
}

// Docker there and its daemon answering: its version; throws when not.
// log: none (a question; the action that asks fails with what it says)
export function available () {
  const r = docker('version', '--format', '{{.Server.Version}}')
  if (!r.ok || !r.out) throw new Error(`no Docker: ${last(r.err) || 'its daemon does not answer'}`)
  return r.out
}

// The image for a Bare binary: there already, or built now.
// log: none (its caller's step says the image and whether it was built)
export function imageOf (bare) {
  const tag = `${IMAGE}:${crypto.createHash('sha256').update(readFileSync(bare)).digest('hex').slice(0, 12)}`
  if (docker('image', 'inspect', tag).ok) return { image: tag, built: false }
  const dir = mkdtempSync(join(tmpdir(), 'haicc-image-'))
  try {
    copyFileSync(bare, join(dir, 'bare'))
    writeFileSync(join(dir, 'Dockerfile'), `FROM ${BASE}\nCOPY --chmod=755 bare /usr/local/bin/bare\nENTRYPOINT ["bare"]\n`)
    const r = docker('build', '-q', '-t', tag, dir)
    if (!r.ok) throw new Error(`the image was not built: ${tag}: ${last(r.err)}`)
    return { image: tag, built: true }
  } finally { rmSync(dir, { recursive: true, force: true }) }
}

// A container's state, by its name: created, running, paused, exited, ...;
// null when there is none.
// log: none (a question)
export function stateOf (name) {
  const r = docker('inspect', '--type', 'container', '--format', '{{.State.Status}}', name)
  return r.ok ? r.out : null
}
