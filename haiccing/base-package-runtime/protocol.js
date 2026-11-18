// base-package-runtime's protocol, offered in every mrepo (the runtime
// passes it to itself from its run.js; other runtimes skip its bundle).
//   runtime   run: a linked package's entry by path, its tests above all;
//             start, stop: a package's program beside the mrepo; lay: a
//             package's runtime config into the runtime layer
// The work is the module's: mrepo-base-runtime's.
import { runtimeRun, runtimeLay, runtimeStart, runtimeStop } from './modules/pear-full-square/mrepo-base-runtime/index.js'

export const protocols = {
  runtime: {
    package: 'haiccing/base-package-runtime',
    description: 'Runs a linked package\'s entry by path, its tests above all; starts and stops a package\'s program beside the mrepo; lays a package\'s runtime config.',
    actions: {
      run: { uris: ['.'], args: ['target'], description: 'A linked package\'s target (packages/<org>/<package>/<target>), through its dispatcher; with dry-run, what it would run.' },
      start: { uris: ['.'], args: ['package'], description: 'The program of a package placed in the mrepo\'s folder (its path there) started as its own process, ended with the runtime.' },
      stop: { uris: ['.'], args: ['package'], description: 'That program ended.' },
      lay: { uris: ['.'], args: ['package'], description: 'The runtime config of a package placed in the mrepo\'s folder (its hooks) laid into the runtime layer.' }
    }
  }
}

export const actions = {
  runtime: { run: runtimeRun, start: runtimeStart, stop: runtimeStop, lay: runtimeLay }
}
