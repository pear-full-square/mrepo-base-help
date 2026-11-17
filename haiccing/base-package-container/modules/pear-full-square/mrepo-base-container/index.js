// mrepo-base-container: its documented methods, a directory each (README.md beside each).
//   external/   the container protocol's actions: create, start, stop,
//               remove, status
//   internal/   docker: the one part that talks to Docker; replica: the
//               replica an action is about
export { create } from './external/create/index.js'
export { start } from './external/start/index.js'
export { stop } from './external/stop/index.js'
export { remove } from './external/remove/index.js'
export { status } from './external/status/index.js'
export { docker, available, imageOf, stateOf, IMAGE } from './internal/docker/index.js'
export { replica, AT, CONTAINERS, MOUNT } from './internal/replica/index.js'
