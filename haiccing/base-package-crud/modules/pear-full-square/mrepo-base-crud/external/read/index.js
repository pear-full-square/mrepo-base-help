// read: crud/read <URI>, the nodes a URI selects (README.md beside it).
import { place, select } from '../../internal/node/index.js'

// log: in select (../../internal/node/index.js): the step, and each node
export async function read (exec, { uri }) {
  return (await select(exec, place(uri))).map(s => s.node)
}
