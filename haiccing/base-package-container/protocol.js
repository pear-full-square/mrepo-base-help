// base-package-container's protocol: container, an mrepo's replica made
// in a container, started, stopped and removed. Linked into an mrepo, its
// config is loaded by the runtime and its actions run.
// The work is mrepo-base-container's; here the mounting.
import { create, start, stop, remove, status } from './modules/pear-full-square/mrepo-base-container/index.js'

// The container protocol's config, the package's: each action at the mrepo itself (`.`),
// the mrepo whose replica it is about.
const here = description => ({ uris: ['.'], description })

export const protocols = {
  container: {
    package: 'haiccing/base-package-container',
    description: 'An mrepo\'s replica in a container: made, started, stopped, removed; its state said.',
    actions: {
      create: here('The replica made: an mrepo built from this mrepo\'s own package, beside it, and a container that runs it; linked at the position container.'),
      start: here('The container started: the replica\'s runtime running in it, its inbox operational.'),
      stop: here('The container stopped: the replica\'s runtime ended.'),
      remove: here('The container removed, running or not, the replica\'s folder and its link with it.'),
      status: here('The state of the replica\'s container: none, created, running, exited.')
    }
  }
}

export const actions = {
  container: { create, start, stop, remove, status }
}
