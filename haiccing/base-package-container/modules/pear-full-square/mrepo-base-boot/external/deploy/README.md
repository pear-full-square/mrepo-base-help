# deploy

Builds a child mrepo inside its parent from a target package, links its packages and starts its runtime.

The target package's `mrepo/packages/layer.json` lists the packages the
child is made of, in order. Each is fetched into the work folder's store,
which the parent's packages manifest names. Their `mrepo/` parts are laid
in, in that order, and the child is built at `<parent>/main/<name>/`.

## Signature

`deploy(exec, { uri, args })`: requested as `boot/deploy <name>
<package>`. `uri` is the child's position as the form holds it,
`["main", "<name>"]`: one name below `main`; or a swarm's node,
`["main", "swarms/<swarm>/<name>"]`, below its swarm's node, which is
there already (`crud/create swarms/<swarm>`).

## Arguments

1. The target package, `<org>/<package>`. Required. The package alone
   means `haiccing/<package>`.

## Returns

`{ deployed, mrepo, package, packages, layers, runtime: { pid } }`;
`deployed` is the position as written at `main`, `<name>` or
`swarms/<swarm>/<name>`; `mrepo` is the child's unique URI.

Asked for a script of the package (the request's flag,
`continuation=<script>`), it answers with it as its continuation: the
script's commands, read from the package's bundle (`scripts/<script>.json`),
written from the deployed mrepo's own place. A script the package has
not is refused before anything is built, with those it has.

What it writes in the parent:

- `main/<name>/.node.json`: the child's node, an empty document.
- `main/<name>/.shortcuts.json`: its shortcut, `[{ "mrepo", "link" }]`:
  which mrepo, and the link's own key: what is needed to show it, since
  `main` replicates.
- `links/<key>.json`: the link's record in the links layer, by that
  key: what is local to this machine about it: its URI, the position
  that links to it (`at`), how it came about (`deployed`), where it is
  (`folder`, from this mrepo's own folder), the package it was deployed
  from, the packages placed, its layers, its runtime's process.
- `main/registry/<swarm>/<name>/.node.json`: the same record as a node
  of the mrepo registry, by its unique URI; only where `main` has the
  node `registry`: the boot mrepo.

Where the child is built: by its unique URI under the work folder's
`mrepos/`, `<work>/mrepos/<swarm>/<name>`, side by side with the others;
nothing of it inside this mrepo's folder.

## Errors

- No target, `main` itself or the root: `missing argument: target`. One
  cannot deploy the mrepo itself.
- A URI that is not in `main`: `not a position in main`.
- A position that is neither one name nor `swarms/<swarm>/<name>`: `not
  a position for an mrepo`. The swarm `local`: `not a swarm`.
- A swarm's node whose swarm has no node yet: `no node there:
  swarms/<swarm>`.
- No package: `missing argument: package`.
- The child is deployed already, or its folder is in the way.
- The position exists locally, as data in `main`: the boot protocol
  cannot target it.
- The parent's packages manifest names no store.
- The target lists no packages; its runtime does not start.

## Design

- A documentation package, marked `docs` in its manifest entry, brings no
  structure.
  READMEs are never laid in.
- The packages are linked individually into the child's `packages/`.
- The child has no presence in the parent's `main`: its shortcut is all
  the parent holds of it.
- The child's unique URI is `<swarm>/<name>`. One name below `main`, it
  is in its parent's swarm: what the boot mrepo deploys is `local/<name>`.
  At `swarms/<swarm>/<name>` it is in the swarm its position names:
  `swarms/swarm-1/node-1` is `swarm-1/node-1`. It is written into the
  child's own runtime layer, `/runtime/mrepo.json`, where it has one.
- The runtime is started from the child's own packages, by its directory.
