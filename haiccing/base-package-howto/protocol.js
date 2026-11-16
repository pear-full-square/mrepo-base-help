// base-package-howto's protocol: howto, an mrepo's how-tos by activity,
// extracted from its packages' how-tos and read. Linked into an mrepo, its
// config is loaded by the runtime and its actions run; its structure part
// brings the howto layer.
// The work and the config are mrepo-base-howto's; here the mounting.
import { get, extractAction, CONFIG } from './modules/pear-full-square/mrepo-base-howto/index.js'

export const protocols = {
  howto: { package: 'haiccing/base-package-howto', ...CONFIG }
}

export const actions = {
  howto: { get, extract: extractAction }
}
