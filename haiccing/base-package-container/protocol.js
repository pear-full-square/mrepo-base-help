// base-package-container's protocol: container, an mrepo's replica made
// in a container, started, stopped and removed. Linked into an mrepo, its
// config is loaded by the runtime and its actions run.
// The work and the config are mrepo-base-container's; here the mounting.
import { create, start, stop, remove, status, CONFIG } from './modules/pear-full-square/mrepo-base-container/index.js'

export const protocols = {
  container: { package: 'haiccing/base-package-container', ...CONFIG }
}

export const actions = {
  container: { create, start, stop, remove, status }
}
