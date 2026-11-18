// splectral-base-renderer: a component's renderer, the light process that
// runs its packages over its Splectral inbox and outbox (README.md beside each).
//   internal/   load: the component's packages loaded; render: its inbox
//               followed, its pages made; program: the renderer as a program
export { load } from './internal/load/index.js'
export { render } from './internal/render/index.js'
export { program } from './internal/program/index.js'
