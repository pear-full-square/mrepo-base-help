// main(argv, { env, bare, io }): the haicc command line (README.md beside it).
import { existsSync } from 'bare-fs'
import { join } from 'bare-path'
import os from 'bare-os'
import process from 'bare-process'
import { viewOf } from 'mrepo-base-request'
import { command, isRoot } from '../command/index.js'
import { request } from '../request/index.js'
import { unpack } from '../unpack/index.js'
import { outcome } from '../outcome/index.js'
import { script } from '../script/index.js'
import { sourcesCommand } from '../sources/index.js'
import { outputCommand, widthOf } from '../output/index.js'
import { MACHINE } from '../boot/index.js'
import { CONFIG } from '../config.js'
import { Failure } from '../failure.js'
import { USAGE } from '../usage.js'

// console: the command line's own output: what the user asked for, and what went wrong
// (columns: the terminal's width now, null when the output is none)
const CONSOLE = { out: line => console.log(line), err: line => console.error(line), stdio: 'inherit', columns: () => (process.stdout.isTTY ? process.stdout.columns : null) }

export async function main (argv, { env = {}, bare = os.execPath(), io = CONSOLE } = {}) {
  const home = env.HAICC_HOME || join(os.homedir(), '.haicc')
  const work = env.HAICC_WORK || join(home, 'work')
  // the mrepo commands go to: the root, the boot mrepo; or, from a hook,
  // the mrepo that runs it (HAICC_MREPO, its folder; HAICC_MREPO_URI, its
  // unique URI): its own inbox
  const own = env.HAICC_MREPO ? { dir: env.HAICC_MREPO, uri: env.HAICC_MREPO_URI || CONFIG.root.uri } : null
  const root = own ? own.dir : viewOf(work, CONFIG.root.name)
  try {
    const c = command(argv)
    if (c.kind === 'usage') { io.out(USAGE); return 0 }
    if (c.kind === 'sources') {
      for (const line of sourcesCommand(home, c.args, { org: CONFIG.org, err: io.err })) io.out(line)
      return 0
    }
    if (c.kind === 'output') {
      for (const line of outputCommand(home, c.args, io.columns?.() ?? null)) io.out(line)
      return 0
    }
    if (c.kind === 'machine') {
      const r = await MACHINE[c.protocol][c.action]({ home, work, root, bare, org: CONFIG.org, boot: CONFIG.boot, stdio: io.stdio })
      if (typeof r === 'number') return r
      io.out(JSON.stringify(r))
      return 0
    }
    // a command for the mrepos: into the root mrepo's inbox, its response printed
    if (!existsSync(join(root, 'inbox'))) throw new Failure(own ? `no mrepo at ${root} (HAICC_MREPO)` : `no boot mrepo at ${work} (haicc boot/deploy)`, 3)
    const timeout = Number(env.HAICC_TIMEOUT) > 0 ? Number(env.HAICC_TIMEOUT) : 120
    const print = c.print ?? (env.HAICC_OUTPUT === '1' ? 'output' : env.HAICC_RAW === '1' ? 'raw' : 'record')
    // one command sent, its response printed; -> its outcome
    const send = async parts => {
      const { text } = await request(root, parts, { uri: own ? own.uri : CONFIG.root.uri, reply: CONFIG.reply, timeout })
      if (print === 'raw') io.out(text.replace(/\n$/, ''))
      if (print === 'record') io.out(unpack(text, widthOf(home, io.columns?.() ?? null).width))
      const o = outcome(text)
      if (!o) throw new Failure('the response holds no completed form', 5)
      if ('error' in o) throw new Failure(o.error, 1)
      if (print === 'output') io.out(JSON.stringify(o.output))
      return o
    }
    const o = await send(c.parts)
    // A continuation: the response says what to go on with, a script, shell
    // text calling haicc: run with sh for the position it names (HAICC_AT),
    // haicc on the PATH, printing as this command does; where it stops
    // with another exit code, this command fails.
    if (o.continuation) {
      const { at, script: text } = o.continuation
      if (print === 'record') io.out(`# the continuation, run for ${at}`)
      const shell = { ...env, HAICC_HOME: home, HAICC_WORK: work, HAICC_AT: at, PATH: `${join(home, 'bin')}:${env.PATH ?? '/usr/local/bin:/usr/bin:/bin'}`, ...(print === 'output' ? { HAICC_OUTPUT: '1' } : print === 'raw' ? { HAICC_RAW: '1' } : {}) }
      const code = await script(text, { env: shell, io })
      if (code !== 0) throw new Failure(`the continuation stopped: exit ${code}`, 1)
    }
    return 0
  } catch (err) {
    if (err.message) io.err(`haicc: ${err.message}`)
    return err instanceof Failure ? err.code : 1
  }
}
