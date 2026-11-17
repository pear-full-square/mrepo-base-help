# base-docs-vision

The haicc platform's vision: the directions the work takes, not yet settled.

Kept so that decisions take them into account. Parts were agreed with a
person and say so; the rest is direction. Nothing here is built unless
the packages' own documentation says it is: what is built is documented
where it is, and leaves the vision.

## Links

- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Mycelium

From the bottom:

- **Hypercore:** storage and replication. Hyperdrive, and the
  filesystems git engines run on, sit here.
- **mycelium-git:** objects, trees, checkpoints and the repository rules,
  over a backend contract with several engines. p2p-git on Hyperdrive is
  one of the main components.
- **AVRO:** objects become data structures, with schemas and typed values.
  From here up, a URI names a typed value, not stored bytes.
- **Kafka:** streaming and high-volume data: records and topics. On
  Hypercore, a partition is a core, an offset a block index; no central
  broker, its functions taken on by peers.
- **Topics from the ground up:** a Kafka record is the elementary data
  container (the data in its `value`, whose schema is the data's schema;
  metadata in its `headers`; only the properties needed so far). Data
  lives in topics in Kafka's sense, single-partition to start, with
  Kafka's functionality and names, built basic and evolving into
  mycelium's p2p Kafka; state is built from topics, never written
  directly (`mycelium-topic`).
- **Multi-paradigm data:** records in topics are the lower level, objects
  (files, documents, any git object) the higher, side by side in a
  repository; an object may be generated from a change log of records,
  or exist in its own right. Built up as mycelium matures.

`mycelium-uri` and `mycelium-xpath` are the shared vocabulary across all
four. On top sit the **repository paradigms**: the dev env, the test-run
instance, the module repository, data instance repositories. Each is its
own set of rules and capabilities; the request flow, deploy, publish and
sync belong to the paradigms that use them.

## P2P

Fetch and push are the outside world's way: a client reaches a server.
Inside P2P the same needs are met by subscription and replication. The
boundary is found, not assumed, once Hypercore is understood. Links over
copies follow naturally from the cluster: a node holds links and loads
lazily what it reads.

## Values

Agreed with the human, 2026-11-08: the data type, encodings and
containers (compact-encoding the envelope, AVRO the content; RPC on the
replication connection); mycelium repositories, the branch model and
portable execution; the levels' structure, Pear below HAICC.

## Cluster

- No npm inside P2P: a package comes in once, at the boundary, and then
  lives in P2P under its own identity, as a repository.
- A deployment links to packages (gitlinks or a manifest; on Hypercore a
  key and a commit) rather than containing them.
- A package repository holds the bytes; everything else holds links.
  Towards a single code repository: run repositories stay self-contained
  by holding links the cluster resolves, so kept runs get small.
- A seed node starts from a plain base with the runtime (Bare) only; a
  self-contained bootstrap repository sets it up. It is the first
  always-on peer; later nodes need only the bootstrap repository and its
  key.
- A cluster has a deployment repository, alive while the cluster runs:
  what it is, its nodes, its state and its monitoring.

## Operators

Single-concern repositories: each does one step of a multistep process
and keeps the record of it. Input is a request, output its response on
`main`; the next one takes it in itself. Every step can be traced and
rerun on its own. The test-run instance was the first.

## Storage

Bundles are the transport between repositories outside replication:
self-contained, immutable, verifiable, shared by hash. Loose objects stay
the working store; deltas are an optimisation for later.

## Organisations

Agreed 2026-11-02. The layers: the p2p and language substrate, mycelium
the repository layer, splectrum the language layer, haicc the project
layer; Splectral for interaction alongside them. **One rule: engines (all
code) in `pear-full-square`; what is made with an engine in its layer's
organisation.** A module's prefix names its layer (`mycelium-`,
`splectral-`, `haicc-`); the organisation says what kind of thing it is.
Dependencies run one way: everything depends on `pear-full-square`, which
depends on nothing outside itself.

- **Splectrum's tool**: the language layer will have a tool of its own,
  its modules (engines) in `pear-full-square`; the `splectrum`
  organisation holds the language modules made with it.
- **`haiccing`: projects**, run with HAICC's tools. Demo projects first
  (`demo-liveness`, `demo-other-host`: a test cluster, a Splectral install
  with its components, a scenario), deployed with `haicc-deployment` and
  `haicc-reconcile`. A development repository moves there only once the
  project tool can be used: today's, this one included, are manual
  collaboration, not structured by tooling, and stay where they are.

- **`pear-full-square`: the p2p infrastructure.** The p2p series, p2p-git,
  mycelium on the p2p layer, the node and its managers, and the Splectral
  platform (for seeing and working with running systems, the swarm
  first).
- **`splectral`: (interaction) components on the Splectral platform**, completely
  agnostic of p2p: they work in the platform's abstract world (hosts,
  nodes, resources by URI, activity), as mycelium works with the p2p
  layer's abstractions.
- **Splectral, the future vision** (the human, 2026-11-02): a platform for
  multiple functional components that are part of a solution. Approached
  step by step. First feedback towards it, from the local run of the
  demos: a solution (the demo
  app) as one tab with its own menu, its components as tabs inside it;
  time shown on every screen, not only the timeline.
- **`splectrum`: the language layer**: language modules, for building real applications on
  the mycelium p2p platform. What exists now as URI-expressed capabilities,
  together with AVRO (typed values named by URI), becomes a DSL platform:
  that is where splectrum lives.
- **HAICC, human–AI creative collaboration (in `splectrum`)**: the
  eventual tool for the whole cycle: ideas discussed, designed, requested,
  implemented, validated, released and deployed, with the records and the
  repositories as its memory. It is what this repository's process does by
  hand, made explicit and runnable, stage by stage. Its first module is
  the deployment stage, `haicc-reconcile`:
  declare what a module needs, check it, make it so.
- **`p2p-propagate`**: later, a desired state (node types and their
  configurations) carried across a swarm, each node reconciling its part.

## Authority

The split of authority between the swarm (its configuration, on the
master) and the managers (the substrate: containers, networks, ...) is the
current default, and the one implemented. It will be configurable: the
human sees scenarios for other settings, for example a passive swarm whose
configuration a host manages (the swarm cannot manage itself), or an (IoT)
node in a swarm where the node or the swarm manages the OS. Not designed
further yet.

## Packages

Modules are used as packages: sets referenced as one unit (below
mycelium, `third-party` and ours, `p2p`; then `mycelium`; `splectral`;
`haicc`). Third-party
code comes in once, at the boundary, and is ours from then on. Projects
layer as cascading click and runs.

## Releases

- Pear (Holepunch's runtime and platform for p2p applications: staged,
  seeded and released from a `pear://` link) comes in when versions are
  fixed: released versions of Splectral and the tools, run from a link.
  Until then, everything runs from the development tree.
- There is always a public component (Pear's platform, a first fetch), and
  air-gapping is possible: our swarms keep their own DHTs, and what is
  fetched once can be seeded on our own network.
- Nodes keep getting their code by replication of the swarm's packages
  repository, inside the swarm: that is mycelium's, and becomes the
  capability store.


## Pipelines

Discussed with the human, 2026-11-13: a direction for the distant horizon.
What the human said is stated as it is; what is marked proposed or open is
not agreed. The practicalities are designed when the work reaches it.

### The pipeline engine

A platform to run processing pipelines (as StreamSets does), our own, on
p2p, tied in with our request processing.

- **Built from core actions:** the protocols provide core actions; more
  complex processing is built from them, typically the output of one the
  input of the next. New functionality is tried out as a pipeline; a
  protocol package is created only where needed.
- **Run as requests:** each step is a request, executed completely on its
  own, so a pipeline runs asynchronously and in parallel. Which pipeline
  and which step is metadata on the record.
- **Its start:** one ordinary request, of a single type, the only one that
  can come from outside. It is rewritten with the pipeline and step
  identifiers and executed; every other request of the pipeline is
  internal.
- **Its state:** the pipeline's request branch, an execute branch of
  `main` named by the unique pipeline request id. A step merges into that
  branch at its end; the pipeline merges into `main` at its end, as one
  commit, the pipeline request's. The steps' history stays out of `main`.
  A plain request stays as it is (it could be seen as a pipeline of one
  step).
- **Its data:** what passes between steps is the record; larger data is
  on the pipeline's branch, referred to by URI. The pipeline cleans up as
  it runs, so that at merge time only the data that needs merging is
  there.
- **Errors:** handled by the pipeline's definition, for example diverting
  to an error handling path. What happens to the request branch after a
  failure is configuration: discarded, or kept for debugging.
- **Execution plans:** the rewrite is where a plan is made, fixed or on
  the fly.
- **Compiled:** a pipeline written in code, loaded and executed: for
  heavy processing, to gain speed; or for complex jobs over distributed
  remote data, where a plan optimised for the installation can be created
  (long-running batch processing).
- **Written** in a graphical UI or a scripted language. AVRO between the
  steps (schemas: an output checked against the next input).

Proposed, not agreed: the completion of a step places the next one, read
from the definition (no coordinator process); compiled code as a generated
protocol package; the pipeline taking the place of the composite actions
on the roadmap. Open: joins, parallel steps writing the same path, the
definition's format, the grain (a request costs several commits: a step
works on a batch, not on one record).

### A database server

The human: the pipeline engine is a necessity when mycelium is implemented
as a database server. A reading of how they meet, not designed: a query a
pipeline, its operators steps on the core actions (CRUD first); the
execution plan the query plan; the pipeline's branch the transaction (a
snapshot of `main`, one commit at the end, the branch discarded a
rollback); AVRO the rows' schema.

### Data is local

- **Processing is over local stores**, which may be replicas of stores
  from elsewhere. Replicated lazily, such a store works as a cache: a
  block fetched on first read, verified, local from then on.
- **Cache management with a TTL** can be a process on it. Hypercore
  (11.39.6, the one pinned) has `clear` (blocks dropped, fetched again
  when read) and mark and sweep (`startMarking`, `sweep`: what was not
  read since is cleared); it keeps no time per block, so the TTL is ours:
  the period between sweeps, or our own record of use. Only replicas of
  others' cores are cleared, never our own. Open: a TTL per store or per
  source.
- **Applications are designed in local data terms:** a classical
  distributed application is logically one central application, and
  physically runs on each node that has signed into it. To design per
  application: the order of writes (no single place where they arrive),
  global constraints, authority (who is accepted as a writer; every node
  validating what it applies).
- **The atomic commits of `main` come in handy here:** a replica is seen
  only at commit boundaries; a commit is the unit of change, one per
  pipeline request, and names what it was based on; a pipeline reads one
  snapshot throughout. The atomicity is per node: combining two nodes'
  `main` is a merge whose rule is the application's.

### Overlays, and distributed transactions

The human, 2026-11-14 (with the shortcuts moved into `main`, a file
beside the node's document). A node
can draw its data from several mrepos and hold local data beside it: what
is seen is the combination, an overlay; what is stored stays apart, and a
write goes to the local side only. For instance a local layer adds
processed documents to an input data structure while keeping both
separate.

**We can create distributed transactions with these overlays** (the
human). A reading of how, not designed: every party writes its part of a
transaction into its own mrepo, an atomic commit there, tied to the
others by the request's key; nobody writes into another's data, so
nothing is locked. The overlay decides what is seen: the parts become
visible together once all of them are there (or once the one who started
it records that they are), and a transaction that is not completed is
simply never shown and can be cleared. It is the pipeline's request
branch, one commit at the end, across mrepos.


## Agents

Discussed with the human, 2026-11-15. What the human said is stated as
it is; what is marked ours is not agreed.

- **The direction** (the human): "The beauty of haicc is that it will
  have custom help and howto tailored to each specific mrepo. That means
  that you only see what is there and the right version etc. I think this
  is perfect for agents work."
- **What follows from it** (ours): an agent learns an mrepo the way a
  human does, from the mrepo itself: its help (what its packages offer,
  at their installed version) and its howto (how to do things there). It
  sees only what is there, so it cannot reach for what is absent, and the
  help cannot be stale, so it does not guess. Every step it takes is an
  ordinary request: gated, logged, audited, committed.
- **Tried** (2026-11-15, the local machine):
  Claude Code headless, `claude -p`, allowed only the `haicc` command,
  asked what `.` and `host` hold. Told nothing but that `haicc --help`
  exists, it read `help/get` at each, then `crud/read`, and answered
  correctly: six turns, 24 seconds, no command tried that does not exist.
- **Two ways to run an agent** (discussed): Claude drives haicc from
  outside (`claude -p` with `haicc` its only tool: works today, on the
  human's subscription); or haicc starts the agent, a protocol of its own
  whose tools are the mrepo's protocols (to design). The human: with a
  swarm, Claude runs on one node and works from there.
- **Ties in with**: command help (the roadmap's item 8: the structured
  external API, the help flag answered in the request's context, AI
  enhanced help as its third stage) and HAICC, human–AI creative
  collaboration (above). The howto is new: not designed.

## Continuations

Said 2026-11-16, once a command could answer with a continuation (a
script to go on with, run by the terminal). What was said is stated as it is; nothing of it is designed.

- "I think this continuation idea is another good one. Since we keep
  request state the system can write the next set of commands on the
  fly tailored for the mrepo and the interacting user --> please
  execute at your end. (and we can drive the continuation internally as
  well, not going to the inbox. I think I am going to make it the heart
  of a JIT pipeline engine."
- Earlier, on its reach: "any command may return with a continuation,
  i.e. now continue executing this script. It is a bit like an JIT
  pipeline."
- What is built: a fixed script, shell calling `haicc`, answered by a
  deploy, run by the terminal with `sh`; nesting by a script's own
  deploys. Open from here: a continuation written on the fly from the
  request's state; one driven inside an mrepo, not through the inbox; a
  script
  used from elsewhere through the registry ("that functionality will be
  added later, not now").
- Settled for base, 2026-11-17, to build with the solution install:
  one gateway, the inbox, every command submitted there; one language,
  shell calling `haicc`, for a component's scripts and its hooks;
  continuations in a request's response, run by the terminal; hooks run
  by the runtime as console commands; base operations protocols, custom
  versions scripts.

## Repository layers

Proposals on layers beyond `main`, never built:

  - A capability branch holds the installed modules: the code as deployed,
    as plain folders. Inside, code calls code directly; there is no
    catalogue.
  - A categorisation by capability URI belongs to external APIs, where a
    requester names what it wants and the name must be mapped to an
    implementation. It is deferred to that level, together with the
    local-scope overlay below.
  - Capability branches are named by purpose, not by library: a
    capability branch is a deployed environment holding the whole
    capability layer. The repository name already carries the phase.
  - Local scope is config, in its own overlay: `overlay/config`, by
    `main`'s paths, referring to capabilities by URI (deferred, with the
    categorisation, to the external API level).
  - A layer is *local* (a branch here), *imported* (fetched here with its
    history), or *virtual* (resolved from another repository at compose
    time, never stored here). Private config is a virtual layer from the
    private instance repository.

Development and deployment through capability branches, never built:

- The code is developed on `main` as data and deployed as a tree into a
  `capability/<purpose>` branch to operate.
- `capability/default` operates this repository's own functionality.
  `capability/test` is where development deploys and test runs, without
  touching `capability/default`. More test lanes, if needed, are further
  `capability/<purpose>` branches (e.g. `capability/test-isogit`).
- Promotion deploys the tree tested on `capability/test` into
  `capability/default`. The first deployment is a bootstrap by hand.
- Code is tested against every git backend; development may start on
  one (native git, the reference) and add the others.

## Open

- Execution branch prefix: `execute/<target>` (as here) or
  `execution/<target>`.

- Whether history may be rewritten to remove leaked data.
