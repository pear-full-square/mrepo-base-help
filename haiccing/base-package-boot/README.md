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

- [mrepo](mrepo/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Commands

```
haicc . boot/deploy host base-component-haicc
haicc host boot/deploy node-1 base-package-runtime
haicc host boot/redeploy node-1
haicc host boot/teardown node-1
haicc host boot/deploy swarms/swarm-1/node-1 base-component-haicc
haicc . boot/teardown host
```

- `boot/deploy <name> <package>`: the mrepo built at that position from
  the package's list, its runtime started, its shortcut placed. The
  package alone means `haiccing/<package>`. One name below `main`, the
  mrepo is in this mrepo's swarm (`local/host`); at
  `swarms/<swarm>/<name>`, below a swarm's node made first
  (`crud/create swarms/<swarm>`), it is that swarm's node:
  `<swarm>/<name>`.
- `boot/teardown <name>`: its runtime stopped, the mrepo and its shortcut
  removed.
- `boot/redeploy <name> [<package>]`: both in turn.

## How to

See what the install has deployed, and tear several down at once. The
boot mrepo keeps the mrepo registry in its `main`, at the position
`registry`: a node an mrepo it deployed, by its unique URI.

```
haicc . boot/deploy host base-component-haicc
haicc registry/local crud/read "*"
haicc . crud/read "registry/local/*[runtime/pid]"
haicc . boot/teardown "registry/local/*"
```

The first deploys the host; the second lists the local mrepos, each
with where it is on this machine, the package it came from and what
runs it; the third only those with a runtime; the last tears down every
one the query selects. A node an mrepo deployed is torn down before that
mrepo; `haicc boot/teardown` stops every runtime of the install.

## Package

- `protocol.js`: the `boot` protocol, its config and its actions, from
  `mrepo-base-boot`.
- `main.js`: the dispatcher, the bundle's main, generated.
- `mrepo/`: its part of an mrepo's structure, the `links` layer.
