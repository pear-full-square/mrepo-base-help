// base-package-protocol's protocol: protocol, activating and deactivating
// the protocols an mrepo offers to the outside. Linked into an mrepo, its
// config is loaded by the runtime and its actions run.
// The work is mrepo-base-protocol's; here the mounting.
import { activate, deactivate } from './modules/pear-full-square/mrepo-base-protocol/index.js'

// The protocol protocol's config, the package's: activate and deactivate,
// at the mrepo itself, their argument the protocol's name.
const one = { uris: ['.'], args: ['protocol'] }

export const protocols = {
  protocol: {
    package: 'haiccing/base-package-protocol',
    description: 'The protocols an mrepo offers to the outside: activated and deactivated.',
    actions: {
      activate: { ...one, description: 'A loaded protocol made active: requests from outside are accepted for it. Its config written into the protocols layer.' },
      deactivate: { ...one, description: 'An active protocol made inactive again: its file removed from the protocols layer.' }
    }
  }
}

export const actions = {
  protocol: { activate, deactivate }
}
