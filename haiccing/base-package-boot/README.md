# base-package-boot

The boot protocol: it deploys, tears down and redeploys the mrepos linked in an mrepo.

An mrepo that links it can deploy others. A deployed mrepo is built from
a target package's list, placed by its unique URI beside the others
(`<work>/mrepos/local/host`; a swarm's node, deployed at
`swarms/<swarm>/<name>`: `<work>/mrepos/<swarm>/<name>`), gets its own runtime, is linked at its
position by a shortcut, and its link is recorded in this mrepo's `links`
layer, which the package brings. The first mrepo of a host, the boot mrepo,
is put in place by `haiccing/base-component-boot`, which links this
package.

## Links

- [deploy](modules/pear-full-square/mrepo-base-boot/external/deploy/)
- [teardown](modules/pear-full-square/mrepo-base-boot/external/teardown/)
- [redeploy](modules/pear-full-square/mrepo-base-boot/external/redeploy/)
- [howto](howto/)
- [mrepo](mrepo/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Config

The `boot` protocol's, in `protocol.js`: where each action is offered,
what it takes. Each needs a target: `.`, the mrepo itself, cannot be
deployed or torn down.

| action | offered at | arguments |
|---|---|---|
| `deploy` | `<name>`, `swarms/<swarm>/<name>` | the package, required |
| `teardown` | those, and `registry/<swarm>/<name>` | none |
| `redeploy` | as `deploy` | the package, optional: the one it was deployed from |

The positions name structures other packages bring: `swarms/` the haicc
component's, `registry/` the boot component's. A child's own children
are not torn down with it: only the machine's `haicc boot/teardown`
stops every runtime of the install.

## Package

- `protocol.js`: the `boot` protocol, its config and its actions, from
  `mrepo-base-boot`.
- `main.js`: the dispatcher, the bundle's main, generated.
- `mrepo/`: its part of an mrepo's structure, the `links` layer.
