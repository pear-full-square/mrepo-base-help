# The pair deploy: a node executed in its container, on its own haicc install

A design in discussion (2026-11-17). What is settled is in `tasks.md`,
"The order after the restructure", item 2, `base-solution-haicc`: "The
pattern", "Settled", "Settled too", "The prerequisite". This page works
it out. Nothing of it is built but the prerequisite: a regular haicc
install in a container, from the host's sources
(`haiccing/base-linux-haicc/test/container.sh`).

## Simplified (the human, 2026-11-17)

"the only thing we need is a second haicc install in the container to
run the container side - that in itself represents write". So no
replication and no primary and replica: the container's own haicc install
is what writes the node's data; the host shares the node's folder
through the mount and reads it there. Replicating commits comes with a
node on another machine, where there is no shared folder; recorded in
`tasks.md`, not built now. What is below is the design with that taken
out.

## Settled: who executes what (the human, 2026-11-17)

"The container has a haicc registry with the node mrepo registered, and
it executes the commands on it. The host has the node also registered in
the registry, and forwards all node commands to it, but it forwards the
haicc platform commands acting on the container mrepo to the container
haicc platform."

- **The container's platform**: its registry has the node; it executes
  the platform commands on it (the boot protocol's).
- **The host's platform**: its registry has the node too; every command
  for the node it forwards to the node; a platform command acting on
  the node it forwards to the container's platform.
- **The host's own**: the container's lifecycle, through Docker.

## Settled: the open points (the human, 2026-11-17)

1. **No new protocol**: "it doesn't warrant a new protocol since it is a
   routing directive". The node deployed into a container by
   `boot/deploy` with a flag, its teardown and redeploy routed by the
   link's type.
2. **Reading**: "In this mode we read the data from the container node
   directly": the node answers, as every command for it; no copy on the
   host, no reading mode of the host's own.
3. **The sources**: the host's folders, mounted read only at their own
   paths.
4. **What is shared**: "only sources and node mrepo is shared, all mrepo
   downstream from the node mrepo live in the container only". The
   container's install, its boot mrepo and every mrepo the node deploys
   stay in the container; the host's folder for the pair is the node's
   mrepo folder alone.

### What follows, to settle before building

- **The platform commands' route.** The container's boot mrepo is not
  shared, so the host cannot drop a platform command into its inbox.
  Proposed: the host's platform runs the container's `haicc` command in
  it (`docker exec <container> haicc <the command>`), the container's
  platform's own terminal; its answer the host's action's answer. The
  same for the first deploy of the node and for its teardown. A routing
  through Docker, used only for the platform commands; everything else
  through the node's shared folder.
- **The first request.** With nothing of the container's home shared,
  `start.sh` is not a file of the host's: the container's command line
  itself (`sh -c '<install if not there; boot>'`, the installer copied
  in or mounted read only beside the sources); the node then deployed by
  a platform command (`docker exec`, above). Started again, the command
  line boots again; whether the boot starts the node's runtime again,
  to check.
- **A shared folder at the node's place.** The node's folder is mounted
  where the container's install places it
  (`/haicc/work/mrepos/<swarm>/<name>`), so the mount point is there
  before the deploy. Today `boot/deploy` refuses a folder that is there
  ("in the way") and `boot/teardown` removes the folder, which a mount
  point cannot be. Proposed: deploy takes an empty folder that is there;
  teardown empties it and removes it when it can.

## What it is

A node deployed at a position of the host runs in a Docker container,
on a second haicc install there, which executes everything and writes
its data. The host keeps a shell at the position, an empty one: its link
and the node's folder, shared through the mount; no runtime. Only between the host and the node in its
container; not the swarm's communication.

**Two installs, independent.** The host and the container each have a
regular haicc install with its own boot mrepo; neither boot mrepo knows
the other. What is deployed on top of them differs (the human,
2026-11-17): on the host, the host haicc and the pair's shell; in the
container, just the node: a node haicc (`base-component-haicc`), which
deploys and manages, from there, the mrepos that run in the
container. The host reaches the node only, never the
container's boot mrepo.

```
host install                                container install (--init)
------------                                --------------------------
its boot mrepo                              its own boot mrepo, independent
host (base-component-haicc)                 the node (base-component-haicc),
  main/swarms/swarm-1/node-1: the shell       executes, writes; deploys and
    a shortcut, the link's record,            manages the mrepos in here
    no runtime
<work>/containers/swarm-1/node-1/  ======  /haicc: haicc's home, mounted
                                              start.sh, scripts/pair.haicc
                                              work/mrepos/swarm-1/node-1
                                                inbox/ outbox/ .git
                                            <sources>: read only, the host's path
```

## How it works

1. **Placed**: the container's haicc home is a folder of the host's,
   `<work>/containers/<swarm>/<name>/`, mounted at `/haicc`; the host's
   sources mounted read only at their own paths. The image a plain
   `debian:bookworm-slim`; `--init`; as the host's user. As the
   prerequisite's test does.
2. **The first request, without a terminal**: the host writes two files
   into that folder before it starts the container:
   - `start.sh`, the container's entrypoint: the install if it is not
     there (the installer, `haicc sources link` for each of the host's
     folders, `haicc prereq`), then `haicc boot/deploy`, then the node's
     script, then it stays (`exec sleep infinity`);
   - `scripts/pair.haicc`, the node's script, run as the install's
     script by name (`haicc . haicc/file . pair`): the swarm's node made
     with its document (`{"kind":"swarm"}`), the node deployed at the
     same position as on the host (`boot/deploy swarms/swarm-1/node-1
     base-component-haicc`: its unique URI `swarm-1/node-1`, as on the
     host), its service initialised and started.
   No `docker exec`: the container boots itself. Started again (the
   machine rebooted), `start.sh` runs again: the install there, the boot
   there, the node brought back.
3. **The shell**: on the host, the position's node and its shortcut, the
   link's record (`how: 'pair'`, the node's folder in the mount, the
   container) and the registry's entry. No runtime. The node's folder, seen from the host:
   `<work>/containers/swarm-1/node-1/work/mrepos/swarm-1/node-1`.
4. **A command sent to it** goes as to any linked mrepo, unchanged
   (`mrepo-base-execute`'s `lib/remote.js`): a file dropped into the
   node's inbox folder, the response collected from its outbox folder:
   both the mount's. The node's runtime in the container takes it in,
   executes it, answers. Nothing is forwarded by a process of the
   host's. A command for an mrepo the node deployed goes through the
   node, as through any shortcut.
5. **Torn down**: `haicc boot/teardown` in the container (its runtimes
   stopped), the container removed, its folder removed,
   the shell's node, shortcut, record and registry entry removed. The
   machine's `haicc boot/teardown` removes the containers as today (by
   label).
6. **The container not running**: the command dropped into the inbox
   waits there; `haicc` says the node's container is not running (its
   state, from Docker) instead of timing out.

## The link type, and what the shared folder means

The host links a folder whose mrepo another install runs. Today's code
takes every linked folder for one of its own (`how: 'deployed'`) or for
a replica it made (`how: 'container'`, the design this replaces). Read
from the code (2026-11-17), what follows from the folder shared between
two installs:

1. **Not the host's runtime.** A child's teardown and redeploy
   (`mrepo-base-boot`) stop its runtime with `mrepo-base-runtime`'s
   `stop({ repo, pid })`: asked over its socket, then signalled by the
   pid it recorded. The node's pid is the container's: on the host it is
   another process, or none, and `SIGTERM`, `SIGKILL` would go to it.
   **Rule** (the human, 2026-11-17: "the haicc platform commands for
   container nodes need to be executed by the container haicc platform.
   I think it should only affect the boot protocol - or in general
   protocols executed by the haicc platform that act on the container
   mrepo"): the host never starts, stops or signals a container-run
   mrepo. A platform command on it, the boot protocol's (`deploy`,
   `teardown`, `redeploy` at a position linked `how: 'container'`), is
   not executed by the host's platform: it is sent to the container's,
   its boot mrepo, whose inbox and outbox are in the mount, and executed
   there, on the container's own registry and runtimes; its answer is
   the host's action's answer, as through a shortcut. The node's own
   protocols (service, crud, info, haicc, the boot protocol it executes
   for the mrepos it deploys) are the node's, sent to it as to any
   linked mrepo. Only the container's lifecycle (made, started,
   stopped, removed) is the host's, through Docker.
2. **The socket is not shared.** `runtime.sock` is in the mrepo's folder
   when the path is short enough for a Unix socket, else in the
   temporary folder by the path's hash. Inside the container the path
   is short (`/haicc/work/...`), on the host it is long: the two sides
   name the socket differently, and the host's `/tmp` is not the
   container's. **Rule**: the host speaks to the node only through its
   inbox and outbox folders; its state comes from Docker and the node's
   answers.
3. **Two registries.** The container's install records its node, and
   the mrepos the node deploys, in its own boot mrepo; the host records
   the shell in its own. The same unique URI in both, neither seeing the
   other. **Rule**: the host's entry says the mrepo is container-run;
   what the node deploys is in the container's registry only, reached
   from the host through the node.
4. **Paths are each side's.** What the node records holds the
   container's paths (`/haicc/...`); the sources are at the same path
   on both sides (mounted so), nothing else is. **Rule**: the host uses
   no absolute path read from the node's data; the link's record holds
   the folder as the host sees it.
5. **The machine's teardown.** `haicc boot/teardown` on the host stops
   the runtimes it finds under `<work>/mrepos/` (it never walks
   `containers/`: good, it does not touch the container's), then removes
   the containers it finds by each `.git` under `<work>/containers/` and
   its folder's label. With the container's whole home there, the
   `.git` folders are deeper (`.../work/mrepos/...`) and the label is
   the home's: none is found, the containers stay. **Rule**: the
   containers found by the pair's folder, the home, labelled with it;
   nothing walked inside it; the folder removed after.
6. **One writer.** The node's runtime alone writes its repository and
   its outbox; the host only adds files to its inbox (written whole,
   then renamed: never read half written) and reads its outbox.
   **Rule**: the host never opens the node's repository to write; read
   only, if it reads it at all (open question 2).
7. **File events across the mount**: the same kernel, a file the host
   writes is seen by the container's watcher; the runtime's slow look
   covers an event missed. Nothing to do.
8. **The user**: the container runs as the host's user, so what it
   writes the host can remove. **Rule**: kept (`--user`, as the test).
9. **Versions**: both installs from the same sources, so the same
   versions; a new release linked on the host reaches the container
   only when its install is deployed again. For base: the same sources,
   both deployed again; two versions talking is for later.

**The link type** that follows: the link's record says its mrepo is
**run by another install**, here a container's: `how: 'container'`
(today's meaning, a replica, goes with today's actions), with the
container's name and image, the pair's folder (the container's home, as
the host sees it), the node's folder in it, and the container's boot
mrepo's folder in it, where the platform commands for the node go. Every action that would
act on a linked mrepo's runtime or folder (the boot protocol's
teardown and redeploy, the machine's teardown, a status) reads `how`
first.

## What changes

- **`mrepo-base-container`**, reworked: today its actions make a replica
  of the node that deployed it, the node on the host and its copy in the
  container, run from the bundle with no install. The pair deploy puts
  the node itself in the container, on its own install, its folder on the
  host's disk through the mount. Its actions become the pair's (below): the folder, `start.sh`
  and `pair.haicc` written, the container made and started, the shell
  recorded. The `replica` how-to and the component's `cluster` script
  change with them.
- **`mrepo-base-boot`**: at a position linked `how: 'container'`,
  `deploy`, `teardown` and `redeploy` are sent to the container's boot
  mrepo and its answer taken in (rule 1), as a command sent on through
  a shortcut is (`mrepo-base-execute`'s `lib/remote.js`), not executed
  here.
- **`haicc-base-app`**: the machine's teardown finds the containers by
  the pair's folder (rule 5).
- **`base-linux-haicc`**: nothing; its installer is what `start.sh` runs.
- **Tests**: the haicc command's test, section 12 (the cluster), its
  nodes as pairs; the container module's own test.

## Open, for the human

1. **The commands.** Proposed: `container/deploy <position> <package>`
   and `container/teardown <position>`, at any position as `boot/deploy`
   is, beside `container/start`, `stop`, `status`; `container/create`
   and `remove` go. Or `boot/deploy` with a flag, `--flags container`.
2. **Reading the node's data on the host**, through the mount, without
   the node: a flag, or only by tools for now. Everything sent to the
   position goes to the node.
3. **The sources as the host's**: the host's folders mounted at their
   paths. Its own downloaded sources (`<home>/sources`) mounted too.
   Fine as it is, or a sources folder of the pair's own.
4. **What is mounted**: the container's whole haicc home (as tested,
   the simplest; it survives the container removed) or only `start.sh`,
   the node's script, the node's own folder and the container's boot
   mrepo's (rule 1: the platform commands go there); the rest of the
   container's install kept apart from the host.
