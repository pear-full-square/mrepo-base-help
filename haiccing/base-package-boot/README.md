# base-package-boot

The boot protocol: it deploys, tears down and redeploys the mrepos linked in an mrepo.

An mrepo that links it can deploy others. A deployed mrepo is built from
a target package's list, placed by its unique URI beside the others
(`<work>/mrepos/local/host`), gets its own runtime, is linked at its
position by a shortcut, and is recorded in this mrepo's `registry`
layer, which the package brings. The first mrepo of a host, the boot mrepo,
is put in place by `haiccing/base-component-boot`, which links this
package.

| | |
|---|---|
| [mrepo/](mrepo/) | its part of an mrepo's structure: the registry layer |
| [test/](test/) | its tests: its protocol as mounted, and the generic ones |
| [test-reports/](test-reports/) | the report of its last pre-release |
| [modules/](modules/) | its code, assembled: ours and the third-party code |

## Commands

```
haicc . boot/deploy host base-component-haicc
haicc host boot/deploy node-1 base-package-runtime
haicc host boot/redeploy node-1
haicc host boot/teardown node-1
haicc . boot/teardown host
```

- `boot/deploy <name> <package>`: the mrepo built at that position from
  the package's list, its runtime started, its shortcut placed. The
  package alone means `haiccing/<package>`.
- `boot/teardown <name>`: its runtime stopped, the mrepo and its shortcut
  removed.
- `boot/redeploy <name> [<package>]`: both in turn.

## How to

See what is deployed, and tear several down at once. The registry is a
layer of nodes, an entry an mrepo by its unique URI; it is read with the
flag that names the layer, and a query selects in it:

```
haicc . boot/deploy host base-component-haicc
haicc . crud/read "local/*" --flags layer=registry
haicc . crud/read "local/*[runtime/pid]" --flags layer=registry
haicc . boot/teardown "local/*" --flags layer=registry
```

The first deploys the host; the second lists every mrepo this one
deployed, each with where it is on this machine, the package it came
from and what runs it; the third only those with a runtime; the last
tears down every one the query selects. An mrepo's own children are in
its own registry: `haicc host crud/read "local/*" --flags layer=registry`.
A node is torn down before its host.

A target is needed: an mrepo cannot deploy or tear down itself. A position
that exists locally, as data in `main`, cannot be a target.

## Package

- `protocol.js`: the `boot` protocol, its config and its actions, from
  `mrepo-base-boot`.
- `main.js`: the dispatcher, the bundle's main, generated.
- `mrepo/`: its part of an mrepo's structure, the `registry` layer.

Written from [splectrum/splectrum-dev-env-3-mycelium](https://github.com/splectrum/splectrum-dev-env-3-mycelium).
