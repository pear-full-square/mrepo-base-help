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

## What changes

- **`mrepo-base-container`**, reworked: today its actions make a replica
  of the node that deployed it, the node on the host and its copy in the
  container, run from the bundle with no install. The pair deploy puts
  the node itself in the container, on its own install, its folder on the
  host's disk through the mount. Its actions become the pair's (below): the folder, `start.sh`
  and `pair.haicc` written, the container made and started, the shell
  recorded. The `replica` how-to and the component's `cluster` script
  change with them.
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
   the node's script and the node's own folder (the container's install
   kept apart from the host).
