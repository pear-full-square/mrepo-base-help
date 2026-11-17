// base-package-service's protocol: service, the service state of an mrepo's
// external API. Linked into an mrepo, its config is loaded by the runtime
// and its actions run; its structure part brings the state, booted.
// The work is mrepo-base-service's; here the mounting.
import { initialise, start, stop, shutdown } from './modules/pear-full-square/mrepo-base-service/index.js'

const at = states => ({ uris: ['.'], states })

export const protocols = {
  service: {
    package: 'haiccing/base-package-service',
    description: 'The service of the mrepo\'s external API, moved between its states: booted, initialised, started.',
    actions: {
      initialise: { ...at(['booted']), description: 'From booted to initialised: the mrepo made ready.' },
      start: { ...at(['initialised']), description: 'From initialised to started: the external API open.' },
      stop: { ...at(['started']), description: 'From started back to initialised: the external API closed.' },
      shutdown: { ...at(['initialised']), description: 'From initialised back to booted.' }
    }
  }
}

export const actions = {
  service: { initialise, start, stop, shutdown }
}
