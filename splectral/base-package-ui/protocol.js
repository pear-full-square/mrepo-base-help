// base-package-ui's protocol: ui, an element set, Splectral's first. A
// component lists it; its renderer loads it and calls an element by name
// (ui/page) for the component's own action. No haiccing runtime loads it.
// The work is splectral-base-ui's; here the mounting.
import { page } from './modules/pear-full-square/splectral-base-ui/index.js'

export const protocols = {
  ui: {
    package: 'splectral/base-package-ui',
    description: 'An element set: the elements a component\'s pages are drawn with, each called by name in its renderer.',
    actions: {
      page: { uris: ['.'], args: ['page'], description: 'A whole page: its sections in markdown, the keywords below each as links.' }
    }
  }
}

export const actions = {
  ui: { page }
}
