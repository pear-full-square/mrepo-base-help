# base-package-container

The container protocol: an mrepo's replica made in a container, started, stopped and removed.

An mrepo that links it can be given a replica in a Docker container: an
mrepo built from its own package, run by Bare inside the container, its
unique URI the mrepo's with `container` behind it. The mrepo on the host is the bridgehead: it links
its replica at the position `container` and reaches it as any linked
mrepo. This is how a swarm node gets its container.

## Links

- [create](modules/pear-full-square/mrepo-base-container/external/create/)
- [start](modules/pear-full-square/mrepo-base-container/external/start/)
- [status](modules/pear-full-square/mrepo-base-container/external/status/)
- [stop](modules/pear-full-square/mrepo-base-container/external/stop/)
- [remove](modules/pear-full-square/mrepo-base-container/external/remove/)
- [howto](howto/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Needs

Docker, its daemon running, on Linux. Without it every action but a
`status` of an mrepo without a replica fails: `no Docker`.

## Config

The `container` protocol's, in `protocol.js`: every action at the mrepo
itself, `.`, the one whose replica it is about; no arguments.

| action | what it does | repeated |
|---|---|---|
| `create` | the replica built beside the mrepos (the work folder's `containers/`), its container made, not started; the first on a machine builds the image | no |
| `start` | the container started, answered when the replica's runtime runs in it | yes |
| `status` | `none`, `created`, `running`, `exited`; `gone` when removed outside this protocol | yes |
| `stop` | the container stopped; it can be started again | yes |
| `remove` | the container, the replica's folder and its link removed, running or not | |

## Package

- `protocol.js`: the `container` protocol, its config and its actions,
  from `mrepo-base-container`.
- `main.js`: the dispatcher, the bundle's main, generated.
- No structure of its own: the replica's node is made in `main`, its
  link's record in the `links` layer, both the runtime package's.
