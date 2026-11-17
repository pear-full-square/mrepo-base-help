// script(text, { env, io }): a continuation's script run with sh, its
// output said line by line (README.md beside it). -> its exit code
import { spawn } from 'bare-subprocess'

export function script (text, { env, io }) {
  return new Promise(resolve => {
    const child = spawn('sh', ['-c', text, 'haicc-continuation'], { env, stdio: ['ignore', 'pipe', 'pipe'] })
    // each stream's text held until a line ends, then said
    const lines = (say) => {
      let held = ''
      return {
        data: chunk => { held += chunk.toString(); const parts = held.split('\n'); held = parts.pop(); for (const l of parts) say(l) },
        end: () => { if (held) say(held); held = '' }
      }
    }
    const out = lines(io.out)
    const err = lines(io.err)
    child.stdout.on('data', out.data)
    child.stderr.on('data', err.data)
    child.on('exit', code => { out.end(); err.end(); resolve(code ?? 1) })
  })
}
