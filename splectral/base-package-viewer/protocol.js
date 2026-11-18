// base-package-viewer's protocol: viewer, the info viewer component's own:
// its pages, an mrepo's info by keywords, drawn with an element set the
// component lists. Its renderer loads it; no haiccing runtime does.
// The work is splectral-base-viewer's; here the mounting.
import { page } from './modules/pear-full-square/splectral-base-viewer/index.js'

export const protocols = {
  viewer: {
    package: 'splectral/base-package-viewer',
    description: 'The info viewer\'s pages: an mrepo\'s info by keywords, as info/get answers, drawn.',
    actions: {
      page: { uris: ['**'], description: 'A page: the path below the component its keywords, the docs mrepo read unless another is asked for (?at=<position>).' }
    }
  }
}

export const actions = {
  viewer: { page }
}
