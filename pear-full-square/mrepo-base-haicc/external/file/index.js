// file: haicc <URI> haicc/file <file>, a file of the mrepo's whose lines
// are executed where the URI points (README.md beside it).
import { runLines } from '../script/index.js'

export async function file (exec, { uri, args = [] }) {
  if (exec.resumed) return runLines(exec, null, uri)
  const [path] = args
  if (!path) throw new Error('missing argument: file')
  if (path.startsWith('/') || path.split('/').includes('..')) throw new Error(`not a file of this mrepo: ${path} (a path from its root, its layer first: runtime/hooks/initialise.haicc)`)
  const bytes = await exec.find(`/${path}`)
  if (bytes === null) throw new Error(`no file: ${path}`)
  return runLines(exec, bytes.toString(), uri)
}
