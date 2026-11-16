# For the local agent: what the release is now

Updated 2026-11-16 by the cloud session (parts 60 to 81), for the local agent (a Linux
x86-64 machine with git, curl and tar; no Node.js needed). The task itself
is in `prompt-local.md`; this is its background. The earlier releases (a
setup file, three signed bundles, an executable) are in `local-run.md`,
`local-note.md` and this file's history: none of that applies any more.

## What changed

- **No executable, no setup file.** The boot is its bundle, run with Bare.
  `tools/boot-release.js` and `tools/haicc-try.sh` are gone.
- **No signing.** Nothing is signed; the publisher's key is not used: we
  are not set up for it yet.
- **Releases are yours to create**, on the human's word (below). The
  sources are built locally and linked locally first.
- **The `haicc` command** is an app run with Bare
  (`haiccing/base-app-haicc`, its bundle in the sources). The sh scripts
  (`haiccing/base-linux-haicc`, installed by one file,
  `haicc-install.sh`) are the first step only: a folder linked, Bare put
  in place, the app started.

## Containers (part 79)

A swarm's node can have a replica in a Docker container, made by the
`container` protocol (`haiccing/base-package-container`, in
`base-component-haicc`'s list): `haicc host haicc swarms/swarm-1/node-1
container/create`, then `container/start`, `status`, `stop`, `remove`.
So Docker is a prerequisite of the `haicc` test and of
`base-package-container`'s own: a daemon running, the user allowed to
use it (`docker version` shows a server).

- The image, `haicc-node:<hash>`, is built on the first
  `container/create`: Bare on `debian:bookworm-slim`, which Docker pulls
  once.
- A container is named `haicc-<swarm>-<name>-<hash>` and labelled
  `haicc.folder` with its replica's folder,
  `~/.haicc/work/containers/<swarm>/<name>`: its one writable place.
  It runs as the user who ran `haicc`.
- `haicc boot/teardown` removes the containers of the install with the
  rest. One left by a run that broke off: `docker ps -a --filter
  label=haicc.folder`, `docker rm -f <id>`.
- What we would like to hear from the laptop: whether the test's
  container checks pass as a user who is not root (the cloud session
  runs as root); how long the first `container/create` takes with the
  pull; anything about the socket in the mapped folder (the replica's
  `runtime.sock`: how the node knows its replica is up).

## Splectral (part 80)

An mrepo of its own beside the host (`haiccing/base-package-splectral`):
`haicc . boot/deploy splectral base-package-splectral --flags
continuation=start`. Started, it runs a small server on
`127.0.0.1:4400` (a free port when that one is taken:
`haicc splectral splectral/status` says the URL) with one page: the
install as a tree (each mrepo with its state, a swarm node one node
with its container's), and the commands of the install as they
complete, each with the mrepos it went through; a line opened shows its
record. It follows the boot mrepo's
outbox folder and reads only. `haicc splectral service/stop` ends the
server; `haicc boot/teardown` ends it with the rest. What we would like
to hear from the laptop: how the page looks and behaves in the human's
browser while the cluster script runs.

## What a run is

```sh
tools/bare tools/release.js                  # the sources, built into sources/
sh haiccing/base-linux-haicc/test/run.sh     # the whole flow, in a temporary folder
```

and, for the human, in their own home:

```sh
sh haiccing/base-linux-haicc/haicc-install.sh
haicc sources link <clone>/sources
haicc prereq
haicc boot/deploy
haicc . boot/deploy host base-component-haicc
haicc host service/initialise
haicc host service/start
haicc . crud/create swarms/swarm-1
haicc . crud/read swarms
```

- `haicc`'s own folder is `~/.haicc`: its scripts, the pins, the sources
  list, Bare (unpacked by `haicc prereq` from the sources) and the work
  folder (`~/.haicc/work`: the boot mrepo, the package store).
- Only `haicc sources download bare` reaches the network; nothing in a run
  above does, once `tools/release.js` has fetched Bare's tarball.
- A runtime is a process that keeps running: the boot mrepo's after
  `haicc boot/deploy`, one more for each mrepo deployed. To stop them all
  and start over: `haicc boot/teardown` (every runtime under the work
  folder stopped, the mrepos and the package store removed; Bare, the
  sources and the scripts stay), then `haicc boot/deploy` again.
- A command prints its response record whole, unpacked across lines;
  `haicc --raw <URI> ...` prints it as stored, one line;
  `haicc --output <URI> ...` the output alone.
- **A URI is relative** (part 61): no leading slash; `.` is the local
  root, `host` the position `host`; a leading slash is refused. What an
  action is about comes after it: `haicc host help/get . packages`.
- **A command takes about half a second to start** since it is a Bare
  app (part 60); the sh scripts answer only `sources link`, `sources
  download bare`, `prereq` and the first part of `--help`.
- **Each package carries its test report** (`test-reports/`), written by
  the cloud session's pre-release; `tools/bare tools/release.js
  --strict` says whether each is the one of the bundle just built.

## Releases: created on the local machine

Decided by the human (2026-11-13). The cloud session cannot create a
GitHub release; it can only push commits. So:

- **Where**: a release on each package's own repository
  (`github.com/haiccing/<package>`), not in a repository of sources.
- **What**: what `tools/bare tools/release.js` built for that package,
  from the commit you tested: its bundle and what belongs with it, as
  `sources/` holds it (the manifest entry, its native addons). For
  `base-linux-haicc`: `haicc-install.sh`. Bare is third party: it is not
  ours to release.
- **How**: with `gh`, as you published before (`local-run.md`). The
  script of that time, `tools/publish.sh`, went with the clean-up and
  signed its manifest: do not bring the signing back. The local sources
  keep the structure you know.
- **When**: only on the human's word, and only after the tests of
  `prompt-local.md` passed on that commit.
- **The network is not good enough for many downloads**: prefer few
  files per release over many.
- **Record it** in `local-run.md`, a new section: the commit, each
  repository, its tag, its assets with their sizes and hashes, the URL
  each is downloaded from. The download side is not built yet
  (`haicc sources download` fetches Bare only): it will be written to
  match what you record, so say exactly what you published and how you
  named it.

## Where things stand

`readme.md`, parts 30 to 78, and `handover-next.md`. Before your last
run (`6ebec98`): every package has its own tests and a test report
(parts 47 to 59); the `haicc` command is a Bare app (60); URIs are
relative (61, 62); `crud` makes structure in `main`, the shortcuts are
in `main` and the `xpath` layer is gone (63); the `rest` actions are
removed and a race of `haicc boot/deploy` run again is fixed (64).
**Since your last run**: an execution's branches are squashed into their
targets, one commit in `main` a request, and a removed branch takes its
empty folders (65: a request's cycle no longer slows as requests are
done); a request's log, in its record, with flags (`--flags
log=verbose`, `log=debug`), errors caught at the request, and five new
checks in the code test (66); a query engine in `mycelium-xpath`,
XPath's first phase (67), and `crud` and `haicc` on it (68): a URI is a
query (`haicc . crud/read "swarms/*[size>2]"`, quoted for the shell), a
command is executed at a position inside `main` and at each position a
URI selects (`haicc "swarms/*[state='started']" crud/read .`), and a URI
runs on through shortcuts (`haicc host/node-1 help/get`); a document's
key is written in its URI form there (69: `publicKey` as `public-key`).
The human's three findings from the manual test are built (70): flags
after the URI (`haicc host --flags log=debug -- crud/read .`; a list is
closed by `--` or by the end of the command, nothing else (71); a list
in front of the URI is refused), a record printed
with its entries packed on a line up to the width, the width set and
read with `haicc output` (auto by default: the terminal's; saved in
`~/.haicc/output.width`), `HAICC_WIDTH` gone. And the request records
are reachable (72): `main` is the default layer, a flag changes it:
`haicc . crud/read "done/*[value/value/protocol='boot']" --flags
layer=request`. And the inbox is watched (73): a command is taken in as
it is written, a pass follows a pass that moved something at once; the
`haicc` test should take about a third less time than before (here 142
s, then 93 to 104). In a query a list is a child that repeats and a
position counts from 1 (74: `tags[2]`, `swarms/*[1]`, `[last()]`); a
name in a filter is lowercase, by the URI's rules (`public-key`). And
where an mrepo is placed changed (75): by its unique URI, side by side
under the work folder (`~/.haicc/work/mrepos/local/host`,
`.../local/node-1`), no longer inside the folder of the one that
deployed it. The boot mrepo keeps the mrepo registry (76), a position
in its `main`: `haicc registry/local crud/read "*"` lists the local
mrepos, and several are torn down by a query there (`haicc .
boot/teardown "registry/local/*"`). An mrepo's own record of what it
links is its `links` layer, not for the outside. And a command may
answer with a continuation (77), a script the `haicc` command goes on
with: `haicc . boot/deploy host base-component-haicc --flags
continuation=start` deploys the host, then initialises and starts its
service, each command shown as it runs; `--flags continuation=cluster`
(78) goes further: a place for a swarm in the host's `main`, two nodes
deployed and in service. `haicc boot/teardown` now stops every runtime of the
install, a node inside the host too. An install that is there is not
migrated (our rule: deploy and teardown, no upgrade in place): tear
down with the old `haicc` first, then install and deploy anew. To try
by hand with the human. The `haicc`
test has 207 checks now. New
for you: `tools/commit-bench.js` (the prompt's step 6), the commits
measured on the human's laptop. Known and not
built: our packages are not published, so `haicc sources download`
fetches Bare only; a `haicc` URI that reaches a shortcut among other
positions, or several, is refused (`not yet`); teardown does not cascade (tear down a node before its host;
`haicc boot/teardown` stops everything).
