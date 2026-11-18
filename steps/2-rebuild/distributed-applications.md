# Distributed applications on haicc

A design in discussion (2026-11-18), from the Splectral proof of concept
(`splectral.md`) and the discussion after it. The design itself, written
up for reading and comment: the doc "Distributed applications on haicc",
https://claude.ai/artifact/73tvSUZoir4CsYdTCpiVxx (the pattern, its
communication, data and processing, merge failures, upgrades, from one
machine to many, what is open). This page holds what belongs with the
code: the proof of concept's review, and what comes of it.

## Settled

- **Three component types** (the human, 2026-11-18, on our answer to
  "If I have data repo components, data transformation components and UI
  interaction components: are these three types sufficient to build
  distributed applications?"): data, transformation, interaction; the
  interaction type the boundary with anything outside (people through a
  UI, agents, systems, devices, timers), ours, not contradicted.
- **Three platforms, haicc on top** (the human: "your fourth would in
  our case come as 3 platform + haicc on top so that each of the three
  'pillars' has standard packages in a dedicated organisation"): each
  pillar a platform of its own, its standard packages in an organisation
  of its own; haicc on top, one way of working across the three.
- **The organisations** (the human, 2026-11-18): "myctrans, myctral are
  the organisations for data transformation and data repositories. That
  will allow us to build up packages with core functionality for each
  area and a natural separation of concerns." So: `myctral` the data
  repositories, `myctrans` the data transformation, `splectral` the
  interaction.
- **Streaming applications** (the human): "The data applications that we
  build that way are streaming applications that work on immutable data
  change records which are merged in to the visible state by myctrans
  components. The mycelium repository will have the full mycelium stack
  built on the streaming layer. Those components are then part of
  myctral. And data commit in a data repo means that the higher level
  components are accordingly updated (mutable records etc.)" Our reading
  (that `myctrans` merges) corrected by the human: "data repo validates
  and commit the immutable based data structures (of mycelium); the
  merge is myctral, in the data repository, myctrans transforms,
  prepares and manages; Conflict is resolved in negotiation between the
  data repo and the data processor." So: the data repository validates,
  merges and commits mycelium's data structures, immutable at their
  base; `myctrans` components transform, prepare the changes and manage
  the processing; a conflict is negotiated between the two (the
  repository refuses and says why, the component prepares again).
- **Splectral starts with the terminal equivalent** (the human): "we
  start on spectral with component that issue commands through the
  server. However, They could also link in data into their mrepo (more
  direct). But we want to start with a terminal equivalent."
- **A processing component holds processing state, not data** (the
  human: "A processing component holds processing state, not no state").

## The proof of concept reviewed

Reviewed 2026-11-18, at `e34d7d6` (the code that runs: the runtime's new
`start`, `stop` and `lay`, the server's components and routing,
`splectral/install`, the renderer, the viewer and `ui`; not in depth: the
tools' changes for two organisations, the tests, the READMEs). The
human: "It sounds like a sound initial poc."

What is strong: it follows the design closely: the two halves of the
install, one gateway for data requests, the mrepo laying its own hooks,
files written whole, clear errors (503 when a component is not running,
504 on a time limit), HTML escaped first. Nothing blocks it as a proof
of concept. The findings, most serious first; none fixed yet, the code
being the colleague's who built it:

1. **`runtime/stop` can signal another process.** The renderer's pid is
   kept in a state file in the mrepo's folder; `end` sends SIGTERM, then
   SIGKILL, once `stateOf` has found a process with that pid alive
   (`mrepo-base-runtime/internal/program/index.js`, `stateOf` line 29,
   `end` line 57). A renderer that died, its pid reused (likeliest after
   a reboot: the state file outlives it), and `stop` ends an unrelated
   process. The same kind as the pair deploy's first danger (`pair.md`).
   **Fix**: record the process's start time (`/proc/<pid>/stat`, field
   22) or check its command line holds the bundle's path, before a
   signal.
2. **Readers delete from the writer's box.** The server removes what it
   reads from a component's outbox (`splectral-server/internal/components/index.js`
   lines 34, 39) and, on a time limit, its own request from the
   component's inbox (line 82); the renderer removes what it reads from
   its inbox (`splectral-base-renderer/internal/render/index.js` line
   39). Right for folders, against the rule settled since ("single
   writer, single reader both ways"), and it does not carry to a
   Hypercore, where a reader cannot remove. **Fix**: a reader keeps its
   own position; what was read retired by its writer, or by commit times
   later. A design point, not a bug of the proof of concept.
3. **`runtime/lay` replaces runtime files without a word.** Every
   `mrepo/runtime/` file of the package is put into the runtime layer
   (`mrepo-base-runtime/external/lay/index.js` line 22): a component
   bringing `boot.haicc` or `initialise.haicc` replaces the base's hook,
   its protocol activations with it. **Fix**: refuse a file that is
   there, or say each one replaced.
4. **A failed install cannot be tried again.** The packages are placed
   and `component.json` written (`splectral-server/external/install/index.js`
   line 68) before the hooks are laid (line 74); a lay that fails leaves
   it, and a second install is refused, "a component there already"
   (line 40): only a teardown recovers. **Fix**: `component.json` written
   after the lay, or removed when it fails.
5. **A data request's error can end the server.** The server runs a
   component's data request and writes the answer back
   (`ask(...).then(write)`, `splectral-server/internal/components/index.js`
   line 40), with nothing to catch an exception: an unhandled rejection,
   which in Bare can end the server's process; the component then waits
   out its own 120 s. **Fix**: catch, and write `{ error }` back.
6. **What piles up** (known, fine for now): the server keeps a torn-down
   component's record (`components/<at>.json`), answering 404; the boot
   mrepo's outbox takes a file each data request, a page's. Commit times
   and the retiring of records, later.
7. **The server answers any page in the browser** (`serve`, line 84):
   fine while the viewer only reads (`info/get`); the server answering
   its own pages only, before a page has buttons (`splectral.md`, the
   human's answer 3).

## What comes of it

- The findings 1, 3, 4 and 5 fixed in the proof of concept's code,
  before it is built on; 2 with the first data repository (below), whose
  readers keep their own position.
- The design's next steps (the doc, "Open and next"): a data repository
  that only merges and commits, a processing component proposing changes
  against a base commit, the forms of a proposed change and of a
  refusal, validation at the merge, active-passive for a processing
  component, a Splectral component deployed as a pair.
