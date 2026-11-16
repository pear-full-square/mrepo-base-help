// The container protocol's config: each action at the mrepo itself (`.`),
// the mrepo whose replica it is about.
const here = description => ({ uris: ['.'], description })
export const CONFIG = {
  description: 'An mrepo\'s replica in a container: made, started, stopped, removed; its state said.',
  actions: {
    create: here('The replica made: an mrepo built from this mrepo\'s own package, beside it, and a container that runs it; linked at the position container.'),
    start: here('The container started: the replica\'s runtime running in it, its inbox operational.'),
    stop: here('The container stopped: the replica\'s runtime ended.'),
    remove: here('The container removed, running or not, the replica\'s folder and its link with it.'),
    status: here('The state of the replica\'s container: none, created, running, exited.')
  }
}
