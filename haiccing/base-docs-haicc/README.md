# base-docs-haicc

The haicc platform: what it is, its levels from the machine to the swarm, and our terms.

haicc runs software as mrepos: repositories that run, their data in
layers and a runtime executing the requests posted to them. On a
machine, one command reaches an install of mrepos, local ones and
swarms of nodes; each answers about itself. Packages make the mrepos,
protocols are what they offer, and the documentation is read from the
docs mrepo: `haicc docs info/get <keywords>`.

## Links

- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Levels

- **The machine**: on Linux, the `haicc` command: a folder linked or the
  packages downloaded from their releases, Bare put in place, the
  sources. Every command starts here.
- **The boot mrepo**, `local/boot`: the root of an install, the first
  mrepo, put in place by the boot. It deploys the others, keeps the
  mrepo registry, and takes commands at `.`: `haicc . <protocol>/<action>`.
- **The docs mrepo**, `local/docs`: deployed in the boot mrepo, the
  platform's documentation, read with `info`.
- **The host**, `local/host`: the mrepo a machine is managed with,
  service managed; applications, swarms and their nodes are deployed in
  it. `haicc host <protocol>/<action>`.
- **A swarm and its nodes**: a node is an mrepo at
  `swarms/<swarm>/<name>` in the host, `<swarm>/<name>`; it can have a
  replica in a container, linked as `container`.
- **Splectral**: an mrepo beside the host, showing an install in a
  browser.

## Terms

- **mrepo**: a repository that runs; its data in layers, git branches;
  a runtime executing the requests posted to its inbox.
- **layer**: one branch of an mrepo, with a mode: `main` its data,
  `runtime`, `packages`, `protocols`, `links`, `info`,
  the inbox, the outbox, the request layers.
- **request**: a form, `{ protocol, action, uri, args }`, or a command
  as typed; executed, recorded, answered through the outbox.
- **protocol**: what an mrepo offers, a set of actions; one package,
  one protocol; offered once it is active.
- **package**: the unit of delivery, a bundle run with Bare; it carries
  its own copies of what it needs.
- **component**: a package that is a list of packages deployed together.
- **module**: code, carried by packages; a documented method is a
  folder, `external/` for a protocol's actions, `internal/` for code.
- **family**: packages that follow one package specification: `base`.
- **position**: where a command stands; a URI names it.
- **shortcut**: a node in `main` leading to another mrepo; `haicc` hops
  through it.
- **continuation**: a script a command answers with, to go on with.
- **HDLC**: the haicc delivery lifecycle, how work is done.
- **haici**: human ai continuous improvement, findings from the request
  log, fed back to the HDLC.
