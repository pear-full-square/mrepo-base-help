# The pair deploy: a node executed in its container, replicated to the host

A design in discussion (2026-11-17). What is settled is in `tasks.md`,
"The order after the restructure", item 2, `base-solution-haicc`: "The
pattern", "Settled", "Settled too", "The prerequisite". This page works
it out. Nothing of it is built but the prerequisite: a regular haicc
install in a container, from the host's sources
(`haiccing/base-linux-haicc/test/container.sh`).

## What it is

A node deployed at a position of the host runs in a Docker container,
in primary mode: it executes everything. The host keeps a shell at the
position, an empty one: its link, the node's folders, the replica of the
node's data, no runtime. Only between the host and the node in its
container; not the swarm's communication.

**Two installs, independent.** The host and the container each have a
regular haicc install with its own boot mrepo; neither boot mrepo knows
the other. What is deployed on top of them differs (the human,
2026-11-17): on the host, the host haicc and the pair's shell; in the
container, just the node: a node haicc (`base-component-haicc`), in
primary mode, which deploys and manages, from there, the mrepos that
run in the container. The host reaches the node only, never the
container's boot mrepo.

```
host install                                container install (--init)
------------                                --------------------------
its boot mrepo                              its own boot mrepo, independent
host (base-component-haicc)                 the node (base-component-haicc),
  main/swarms/swarm-1/node-1: the shell       primary: executes; deploys and
    a shortcut, the link's record,            manages the mrepos in here
    no runtime
<work>/containers/swarm-1/node-1/  ======  /haicc: haicc's home, mounted
                                              start.sh, scripts/pair.haicc
                                              work/mrepos/swarm-1/node-1
                                                inbox/ outbox/ .git
<work>/replicas/swarm-1/node-1/.git         <sources>: read only, the host's path
  the node's commits, imported forward only
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
   container, the replica, the layers replicated) and the registry's
   entry. No runtime. The node's folder, seen from the host:
   `<work>/containers/swarm-1/node-1/work/mrepos/swarm-1/node-1`.
4. **A command sent to it** goes as to any linked mrepo, unchanged
   (`mrepo-base-execute`'s `lib/remote.js`): a file dropped into the
   node's inbox folder, the response collected from its outbox folder:
   both the mount's. The node's runtime in the container takes it in,
   executes it, answers. Nothing is forwarded by a process of the
   host's. A command for an mrepo the node deployed goes through the
   node, as through any shortcut.
5. **The replica**: before the host takes a response from a pair in, it
   imports the node's new commits into the replica: the node's `.git`
   read through the mount, the objects transferred, each layer moved
   forward only (`mycelium-git`'s `importLayer`; the node the only
   writer, nothing conflicts). So the response's arrival says the replica
   holds what the request did. The layers: a configuration of the pair,
   every layer to start.
6. **Torn down**: `haicc boot/teardown` in the container (its runtimes
   stopped), the container removed, its folder and the replica removed,
   the shell's node, shortcut, record and registry entry removed. The
   machine's `haicc boot/teardown` removes the containers as today (by
   label).
7. **The container not running**: the command dropped into the inbox
   waits there; `haicc` says the node's container is not running (its
   state, from Docker) instead of timing out; the replica as it was.

## What changes

- **`mrepo-base-container`**, reworked: today its actions make a replica
  of the node that deployed it, the node on the host and its copy in the
  container, run from the bundle with no install. The pair deploy puts
  the node itself in the container, with an install, and the copy on the
  host. Its actions become the pair's (below): the folder, `start.sh`
  and `pair.haicc` written, the container made and started, the shell
  recorded. The `replica` how-to and the component's `cluster` script
  change with them.
- **`mrepo-base-execute`**: taking a response in from a linked mrepo,
  the link's record says whether it is a pair; a pair's commits imported
  first (a call into the container module, through the runtime context,
  as `exec.wait` is).
- **`mycelium-git`**: what is there (objects transferred, `importLayer`);
  a fetch from another repository's folder, if not there yet.
- **`base-linux-haicc`**: nothing; its installer is what `start.sh` runs.
- **Tests**: the haicc command's test, section 12 (the cluster), its
  nodes as pairs; the container module's own test.

## Open, for the human

1. **The commands.** Proposed: `container/deploy <position> <package>`
   and `container/teardown <position>`, at any position as `boot/deploy`
   is, beside `container/start`, `stop`, `status`; `container/create`
   and `remove` go. Or `boot/deploy` with a flag, `--flags container`.
2. **Primary mode**: what it is in the node, beyond executing: a setting
   of its install (the node knows it is a pair's primary, its host the
   replica), and whether anything in the node acts on it now, or only
   later (the replication over a stream, from the node's side).
3. **Reading the replica.** Everything sent to the position goes to the
   node, always current. How the host's own copy is read: a flag
   (`--flags replica`, as `layer=` reads another layer), or only by tools
   for now.
4. **The sources as the host's**: the host's folders mounted at their
   paths. Its own downloaded sources (`<home>/sources`) mounted too.
   Fine as it is, or a sources folder of the pair's own.
