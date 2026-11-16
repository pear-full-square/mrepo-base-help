# For the next session: where step 2 stands

Kept current by the cloud session (last: 2026-11-16, part 81). Read `CLAUDE.md` first (what is here, how to
validate), then this, then `tasks.md` here (what is planned and waits to
be built: the next work) and `xpath.md` (a design in discussion), then `readme.md` (each part's record, the
latest last: 30 to 45 the haicc work; 46 a note on future design; 47 to
59 the tests: the package check, the template, the test reports, the
pin, every package brought to the template one by one; 60 the `haicc`
command as a Bare app; 61 relative URIs, piece A; 62 a URI inside an
array of segments; 63 the crud protocol, the shortcuts in main; 64 the rest actions
removed, a race fixed; 65 the request train's two repairs: the squash
into main; 66 logging: flags, three levels, the request's metrics and
audit, errors caught at the request, the code quality check; 67 XPath's
query engine in `mycelium-xpath`; 68 the repository, `crud` and `haicc`
on it: task 6 built; 69 a document's key in a query in its URI form; 70
`command-line-findings`: flags after the URI, a record packed on its
lines, `haicc output`; 71 a flag list closed by `--` or the end of the
command, nothing else; 72 `request-layer-access`: `main` the default
layer, `layer=<name>`, a record read as its document; 73
`inbox-watcher`: a pass made when something arrives, not on a clock; 74
`xpath-first`'s decisions gone through together: lists and positions as
XPath has them, a filter's names by the URI's rules; 75
`mrepo-registry`, the first build: an mrepo placed by its unique URI,
the registry layer, several torn down by a query; 76 the same
corrected: the links layer, an mrepo's own, and the mrepo registry, the
boot mrepo's; 77 `continuation`: a command answers with a script to go
on with, the terminal runs it; 78 the cluster script: the swarm
cluster we work towards, written as a script of the component; 79 a
swarm's nodes and their containers: a node at `swarms/<swarm>/<name>`,
the `container` protocol, the cluster script with both; 80 Splectral's
MVP: an mrepo of its own beside the host, the commands of the install
shown in a browser; 81 the install as a tree above them, folded from
the commands).
The documentation of what is built is in the packages:
`haiccing/package-docs-template` and `haiccing/package-docs-mrepo`, and
each folder's README.

## Starting a session

A fresh clone has no `node_modules/` and no `sources/` (both ignored by
git), so nothing runs until they are there:

```sh
sh tools/install.sh           # the dependencies, replayed from the lockfile (curl, tar; no npm)
tools/bare tools/release.js   # every package assembled and bundled into sources/, Bare's tarball
```

Then the validation in `CLAUDE.md` works. To see the whole thing run:
`sh haiccing/base-linux-haicc/test/run.sh`.

**Docker**: the container protocol's tests and the `haicc` test's
cluster make real containers. In a cloud session Docker is installed
but no daemon runs when the session starts: `sh tools/docker.sh` starts
it (as root) and waits for it; it does not survive the session's
container. Without a daemon those tests fail, they do not skip.

- **Work on `execute/main`**, merged into `main` with a plain merge, both
  pushed (a cloud session may be given a branch of its own: it is not
  used for the work).
- **The product repositories** are pushed from here, so a cloud session
  attaches them first (`add_repo`, with push): the modules, each
  `pear-full-square/<module>` for a folder of `pear-full-square/`
  (`sh tools/products.sh <module>...`); the packages, each
  `haiccing/<package>` for a folder of `haiccing/`
  (`sh tools/packages.sh -m "<what changed>" <package>...`). Only those
  that changed.
- **Nothing is left running** by the tests. A runtime left over from a
  failed run: `pgrep -fa "bin/bare"`, then stop it by its pid.

## Right now

**In discussion since (2026-11-16, after part 79): help, howto, haici**
(`help.md` here): the human opened the full design of help; three
protocols, `help` (static and dynamic), `howto` (the entry point by
activity), `haici` (human ai continuous improvement, from the request
log), headless Claude their user, their generator and the filler of what
is not built. Its first build is queued, `help-mvp` (`tasks.md`): the
flag unit, the help and feedback flags, a first `haici`; the human
creates `haiccing/base-package-haici` and
`pear-full-square/mrepo-base-haici` first.

**Pick up here** (2026-11-16, after part 81; everything in `main`,
`execute/main` level with it, every repository pushed, the two new ones
among them: `pear-full-square/mrepo-base-container`,
`haiccing/base-package-container`)

- **Where it stands**: `base-component-haicc`'s `scripts/cluster.json`
  runs to its end: the host in service, `swarms/swarm-1` in its `main`,
  two nodes deployed at `swarms/swarm-1/node-1` and `node-2`
  (`swarm-1/node-1`, `swarm-1/node-2`), each in service, each with its
  replica in a Docker container (`container/create`, `container/start`),
  the replica in service too, reached through its node (`haicc
  swarms/swarm-1/node-1 haicc container ...`). Part 79.
- **What the human said on the way** (`tasks.md`, `swarm-cluster`): the
  default continuation is skipped, "needs a better design"; the script
  calls the container protocol explicitly; KISS.
- **Splectral's MVP is built** (part 80): `haicc . boot/deploy splectral
  base-package-splectral --flags continuation=start`, then
  `http://127.0.0.1:4400`: one page, the commands of the install as
  they complete (it follows the boot mrepo's outbox folder), each with
  the mrepos it went through; a line opened shows its record; above
  them the install as a tree, each mrepo with its state, a swarm node
  one node with its container's (part 81: "swarm node as a node. keep
  it simple, this is just POC"), folded from the commands, nothing
  asked of the mrepos. It reads only. The human, on where it goes: "an app within haicc but alongside
  host"; "will subscribe to all sorts of data depending on the
  components that are installed on it"; "user interaction that sends
  commands to all the parts".
- **Next, to settle together before building** (one question at a
  time):
  1. **Splectral beyond the MVP** (`tasks.md`, "`splectral`", "To
     settle next"): the rest of the world (what a link, a resource is
     now);
     components as packages in its list; scenarios and continuation
     scripts; the map and the model back; the first demo beyond the log.
     The old core is in the history (`42a5a66^`) and in its
     repositories (`pear-full-square/splectral-model`, `-transport`,
     `-contract`, `-shell`, `-timeline`, `-scenario`, `-replay`;
     `splectral/base-view-map`); `splectral-server`'s old code was
     written over (its repository's history has it).
  2. **The nodes finding each other**: what a working cluster does, and
     how the script checks it; a node made a swarm node (the `swarm`
     protocol; master and slave); what flows between a bridgehead and
     its replica. Earlier code to read, in the history (`42a5a66^`):
     `p2p-connect`, `p2p-dht` (a private DHT a swarm, the master its
     bootstrap, `firewalled: false`), `p2p-rns`, `p2p-node`.
- **The human is working on help, howto and continuous improvement in
  another session** (`help.md`; "Yes, I am working on help, howto and
  continuous improvement"): it pushes to `main` too. Fetch before a
  merge; a push refused is merged, never forced.
- **A page is looked at here**: Chromium and Playwright are in the cloud
  session (`require('playwright')` from a `.cjs` script in the
  scratchpad): the page opened, a screenshot taken and sent to the
  human.
- **Docker runs in the cloud session** (the earlier note here was
  wrong): `sh tools/docker.sh`. The real thing is still tried on the
  human's laptop by the local agent (`prompt-local.md`, current for
  part 79: Docker is a prerequisite there now).
- **How we work** (below, "How the human works with us", in full): a
  team on equal terms: "we", an opinion and a recommendation with every
  question; short answers, one question at a time; tasks named by their
  label; a reading put back in its own words and confirmed before it is
  built (part 75 was built on one that was not, and had to be
  corrected: part 76); what is left to us is ours to decide and say.
  What is settled is recorded in the words used.
- **What cost time, to mind**: an apostrophe in a test's title or
  message breaks the file, and a filter on the output hides it: read a
  test run's last lines. One run at a time on `sources/`: a `haicc`
  test started while bundles are rebuilt hangs. A full validation is
  about 30 minutes: every package's pre-release
  (`tools/bare tools/package-test.js haiccing/<package>`, in a loop),
  `tools/bare tools/release.js --strict` (its exit code), the boot's
  `validate` a few times, `sh haiccing/base-linux-haicc/test/run.sh`
  (249 checks, about five minutes with the containers). Running
  mrepos die when `tools/release.js` rewrites the bundles under them:
  tear a trial install down before a rebuild. A
  container left by a run that broke off: `docker ps -a --filter
  label=haicc.folder`, then `docker rm -f` it. Two mrepos never share a
  unique URI: an answer is addressed by it (part 79). Long runs go to the background, their output to a file
  in the scratchpad, waited for.

**What is built since part 66**, each a part of `readme.md`: 67 to 69
and 74 `xpath-first` (a URI is a query: `mycelium-xpath`'s `query`,
`mrepo-base-xpath`'s `query`, `crud` and `haicc`'s `goto` on it; lists
and positions as XPath has them; a filter's names by the URI's rules);
70 and 71 `command-line-findings` (flags after a URI, a list closed by
`--` or the end of the command; a record printed packed; `haicc
output`); 72 `request-layer-access` (`main` the default layer,
`--flags layer=<name>`); 73 `inbox-watcher` (a pass when something
arrives); 75 and 76 `mrepo-registry` (an mrepo placed by its unique URI
under `mrepos/`; the `links` layer, an mrepo's own; the mrepo registry
in the boot mrepo's `main`, `haicc registry/local crud/read "*"`); 77
`continuation` (a command answers with a script to go on with, the
`haicc` command runs it; `--flags continuation=<script>` on a deploy);
78 the cluster script; 79 a swarm's node at `swarms/<swarm>/<name>`
and the `container` protocol (`haicc swarms/swarm-1/node-1
container/create`, `start`, `stop`, `remove`, `status`); 80
Splectral's MVP (`splectral-server`, `base-package-splectral`:
`haicc splectral splectral/status`).


**The state** (as of 2026-11-16, part 81: everything in `main`; the paragraphs below are older, kept for what they say)

- The `haicc` command installs, boots, deploys a host from
  `base-component-haicc`, starts its service, deploys a node inside it
  and chains commands through both (parts 30 to 45).
- All fourteen bundle packages (`base-package-container`, part 79, and
  `base-package-splectral`, part 80, the newest) are brought to the package template and
  pinned, each with a test of its own and a current, passing report
  (parts 47 to 64). `tools/bare tools/release.js --strict` passes;
  `tools/bare tools/code-check.js` and the README checks have no
  problems; the `haicc` test 249 of 249 (part 81); `base-component-boot`'s
  `boot` test passing.
- The `haicc` command is a Bare app, `base-app-haicc` (part 60); the
  shell, `base-linux-haicc`, is the first step only. The command's form
  is in one place now: `pear-full-square/haicc-base-app`,
  `internal/command/`.
- **A request's URI is relative** (part 61): no leading slash, `.` the
  position itself; from outside it is read at `main`, the mrepo's own at
  its root. `haicc .
  boot/deploy host <package>`, `haicc host service/start`, `haicc host
  help/get . packages`. Inside, a path read or written is accepted
  relative (`runtime/service.json`) or slash-led; older code is still
  slash-led and changes over as it is touched.
- **Inside, a URI is an array of segments** (part 62): in a request's
  form the prefix `main` and the URI as written, `["main", "host"]`;
  the mrepo's own without a prefix, `["."]`. Outside it is one segment,
  as written. An action's answer is whatever it is: not wrapped.
- **Structure in `main`** (part 63): the `crud` protocol
  (`base-package-crud`): `haicc . crud/create swarms/swarm-1`,
  `crud/read swarms/*`, `crud/delete swarms recurse`; a node is a folder
  with `.node.json`. A shortcut is a node, its link beside its document
  in `.shortcuts.json`; the `xpath` layer is gone. What is local about a
  deployed child is in the parent's `runtime/deployed/<name>.json`.

- The `rest` actions are removed; a race of `haicc boot/deploy` run again
  while the boot mrepo's runtime runs is fixed (part 64).
- **An execution's branches are squashed into their targets** (part
  65): one commit in `main` a request; a removed branch takes its empty
  folders; the ancestry check reads what two histories have apart. A
  request's cycle at the repository's level stays near 20 ms however
  many are done (`tools/bare tools/commit-bench.js --only cycle`).
- **A request's log** (part 66): in its record; `info` unasked (what it
  changed, its metrics), `--flags log=verbose` its action's steps,
  `log=debug` the internals; an error and a warning always. Flags:
  `haicc host crud/read . --flags log=verbose`, `haicc --flags
  log=debug -- host haicc node-1 ...` (in front: for the whole chain).
  **When code is written**: an action logs through `exec.log` and
  `exec.step`, reads what may be missing with `exec.find`, never
  catches without using the error or saying what it expects
  (`// catch:`), and throws with `{ cause }`; the code test checks it
  (`package-docs-template`, "Logging and handling").
- **Every package and module has its own repository, up to date**
  (2026-11-14): `haiccing/base-app-haicc` and
  `pear-full-square/haicc-base-app` were the last two created.

**Next: a planning round with the human.** The task list (`tasks.md`) is
built out: tasks 0 to 5 are done (parts 60 to 66). What it still holds
is what they left, each to come with what needs it:

- of relative URIs (task 1): more than the two segments of a URI
  (selections as arrays in `resolve` and `goto`, a command at a deeper
  position, the jumps and the prefix on an answer): the human, "Multi
  segment will become clear with haicc commands";
- of `crud` (task 2): XPath across linked mrepos (the human: "we will do
  xpath for linked repos later"), `update`;
- "Deployed tests" and "Coverage": after swarm nodes run;
- "Future additions": the `error-on-empty` flag, predicates, how-tos.

**In discussion, started 2026-11-14: XPath** (`xpath.md` here, the
design, nothing built; the human brought it to the planning round). A
query that comes in is rewritten into a pipeline of `haicc` segments and
merges; each mrepo rewrites the part it sees and answers with one merged
node set (no cascading); two scenarios, juxtaposed (a link along the URI)
and stacked (several layers at one position); the aim full coverage of
the operations that look forward, in steps. With it, the human:
requests can run on threads, several at once (reads of the Corestore are
parallel, tried); the request train and the commit to `main` stay on one
thread; the commits measured (`tools/commit-bench.js`: git is not the
limit for the commits; the train's bookkeeping slows as requests are
done). **Tasks 4 and 5 are built** (parts 65 and 66: the two repairs;
logging). **Task 6, XPath's first implementation, has its go** (standard
XPath in phases: the list in `xpath.md`; `haicc` and `crud` both its
first users; all commands maps over an array of nodes): in two parts,
the engine in `mycelium-xpath` first. **Task 7, the inbox watched instead of looked at**, is noted
to discuss.

**Task 6 is built** (2026-11-15, parts 67 and 68): the engine,
`query(tree, root, text)` in `mycelium-xpath` (phase 1 of the list in
`xpath.md`); the mrepo's query in `mrepo-base-xpath` (`query(exec,
uri)`: what a URI selects, each with what it is, and where it stopped at
a shortcut); `crud` and `haicc`'s `goto` on it. Next with the human,
point by point (short answers, one question at a time):
- what was decided while building (both parts list it, "to confirm");
- what was found open (part 68): a document's key in camelCase as a
  step of a URI: answered and built (part 69: its URI form, `publicKey`
  as `public-key`, the rules' own translation); the outside reaching
  `main` only, so the request records could not be queried from the
  command line: answered and built (part 72: `layer=request`); what a
  query costs (about 1 ms a node read here: one
  request is right up to some hundreds of nodes; beyond, a cache of
  reads by id and reads in parallel before a query over several
  requests);
- then phase 2 (the union and the fan-out over several shortcuts, which
  resolves the usage restriction; descendants; positions), results as
  attachments, task 7.

**Tasks have labels**: the human follows a task by a meaningful label,
with its number (the human, 2026-11-15: "can you label task meaningful
(as well) rather than just numbers? Make it easier for me to follow"):
`tasks.md`, "The tasks by label". Use the label whenever a task is
named: `command-line-findings` (task 8), not "task 8" alone.

**The human's priorities** (2026-11-15: "use mycelium, achieve p2p
swarm, improve self-containment (help, dev pipeline) to achieve
efficient AI autonomy"; `tasks.md`, "Priorities", in
the human's words, in order, each with its label): mrepos as shortcuts with a registry of
mrepos; node mrepos and the container version; simple demos with a p2p
swarm; a review of the package repositories for full install tests;
rules and design decisions living in the help and howto where they are
implemented; proper howtos and a proper help protocol; Claude headless
on the tailored help and howtos, as soon as possible; then the
development process itself on `haicc`. Nothing of it discussed yet. The
local agent's notes of 2026-11-15 (help, howtos, nodes, where a child
mrepo is placed, the teardown that leaves a grandchild running) go with
them: read, not acted on.

**The order of work** (the human, 2026-11-15; `tasks.md`, "The order,
as it stands"): cleanup of the open tasks; `mrepo-registry`;
`node-mrepos`; `swarm-demos`; `context-help` (the help protocol,
context sensitive); `package-review` (its criteria: full install tests,
rules and decisions in the help and howto, proper howtos). That block
is the milestone: ready for headless Claude and for the D&I process on
`haicc` (D&I: design and development; afterwards HDLC, the haicc
(software) development lifecycle: our terms).

**`request-layer-access` (task 9) is built** (part 72): `main` is the
default layer of a request from outside, `layer=<name>` changes it for
the command's own URI (the routing stays in `main`); a record is read
as its document. What the outside may ask is a design to make,
`external-request-api` (`tasks.md`): "done properly, not with
hard-coded rules". The local agent's notes of 2026-11-15 (an agent on
`haicc`, Claude Code headless; `vision.md`, "Agents"; its proposal: the
addon hashes left out of the printed log of `boot/deploy`) are read,
not acted on.

**`command-line-findings` (task 8) is built** (parts 70 and 71): the human's
three findings from the manual test. `inbox-watcher` (task 7) is built
too (part 73), and the decisions made while building `xpath-first` are
gone through together (part 74). **The cleanup is done.**
`teardown-cascade` is not cleanup: it goes with `mrepo-registry` ("that
is a better place to do 'bulk teardown'"), then dropped ("it can be done
with xpath"). **`mrepo-registry` is built** (parts 75 and 76; `tasks.md`, "P1 ·
`mrepo-registry`": the discussion in the words used). Two things, told
apart in part 76 after part 75 had built them as one: the **links
layer** (`links`), every mrepo's own, a record a link by the link's own
key, not for the outside; and the **mrepo registry**, in the boot
mrepo's `main` at the position `registry`, a node an mrepo by its
unique URI (`haicc registry/local crud/read "*"`). `main` holds what is
needed to show a link (the shortcut: the mrepo, the link's key).
**`continuation` is built** (part 77; `tasks.md`): a command may answer,
beside its output, with a script to go on with; the `haicc` command
runs it, each command after the response of the one before; a deploy
asked for a script of its package (`--flags continuation=<script>`)
answers with it. A simple script: no nesting, at most 100 commands, the
terminal only. `base-component-haicc` brings `scripts/start.json`. For
**The work now: `swarm-cluster`** (`tasks.md`): "Let's add scripts to
the component for what we still want to achieve - working swarm
cluster. Once that is finished we can start with the other items on
the list." `base-component-haicc`'s `scripts/cluster.json` is the
target written down, and its check: what runs today is in it (part 78:
the host in service, a place for the swarm, two nodes in service); each
step a swarm still needs is designed together, built, then added as a
line: where a swarm's node sits and its unique URI, a node made a swarm
node (the `swarm` protocol), its replica in a container (Docker; no
daemon runs in the cloud session: tried on the laptop), the nodes
finding each other. The continuation is, in the human's view, to become
"the heart of a JIT pipeline engine" (`vision.md`).
KISS: enough for the swarm demos; a further
design round comes with the next step. A rule since (`rules.md`): deploy
and teardown, no upgrade in place. **Next in our order: `node-mrepos`**
(P2): a swarm node is a bridgehead mrepo on the host and its replica in
a container; a `swarm` protocol on top of `boot` and `service` (deploy
the bridgehead as a standard mrepo, initialise it as a swarm node,
master or not, replicate it into a container; the bridgehead master,
the container slave by default: who manages, who follows). To design
together first. Then `swarm-demos`, with Splectral in them if we can
("like we had before": `tasks.md`). Help and howto as a system come
after the demos ("Better not mix"); until then each build carries its
own documentation and the howto information it needs.

**Then, the human's priority: swarm nodes up and running** ("The
roadmap", item 2): a command at a deeper position (the execution's
current root), a node's unique URI, a node in its container, a swarm.
None of it is planned: it starts with discussion, point by point, what
settles written into `tasks.md`, built when the human says so.

A task's **Settled** is built as written. Its **Proposed** is confirmed
with the human first, unless the task says it is ours ("Left to us").

**How a feature is built from now on** (the human, 2026-11-14)

- **A POC demo first, then the real thing, then the demo turned into the
  how-to.** A package's deployed test is its how-to: it lives where the
  functionality is made; there are no how-to packages, the selection is
  extracted as help is. Until deployed tests exist (they come after
  swarm nodes run): a new feature starts as a demo run with the `haicc`
  tool, kept as its first how-to.
- **The two end to end tests stay green** and are extended where the
  behaviour changes: `base-component-boot`'s `boot`
  (`haiccing/base-component-boot/test/boot/`) and the `haicc` command's
  (`haiccing/base-linux-haicc/test/run.sh`). They are still what proves a
  package inside a running mrepo.
- **A package that changes is validated by its pre-release**
  (`tools/bare tools/package-test.js haiccing/<package>`), its report
  committed with it; a module that changes, by the pre-release of every
  package that carries it.

**With the human, open**

- Testing by hand on the local machine: the local agent built and
  tested `main` as of parts 65 and 66 (`c8200f7`, 2026-11-15): every
  step passed (the `haicc` test 152 of 152 three times, all twelve
  packages' `full`, the strict release), `haicc` installed for the
  human; nothing to act on. It ran the commit measurements on the
  human's laptop (14 cores): the figures are set beside ours in
  `xpath.md`, "Commits": the same shape, about twice as fast a writer,
  800 to 900 commits a second with all cores, the cycle flat at 13 to
  15 ms. Its prompt, `prompt-local.md`, and its background,
  `handover-local.md`, are current for parts 60 to 78. Its notes come
  back in `local-note.md`: fetch and read them when told, and act on
  what they report.
- No release yet: on the human's word, created by the local agent
  (`handover-local.md`, "Releases").
- Settled since (2026-11-14): only the link goes into `.shortcuts.json`
  (`tasks.md`, task 2); cloning the template is the aim, the template
  carrying in the help to customise it (`tasks.md`, "First", to build).
- A leftover branch: `claude/vigilant-gates-b1r8rn` on the remote holds
  nothing that is not in `main`; the human may delete it.

## How the human works with us

- **A team, on equal terms** (2026-11-15: "it is not my terms or your
  terms, but our terms: we are a team. It is not human or AI, it is us.
  We are equal team members. Just remember. We discuss and decide, on
  equal terms."). What is settled is ours, not one side's: say "we",
  "our terms", "our order of work". Bring an opinion and a
  recommendation, not only questions; a decision is made together, in
  discussion. Who said what is still recorded, in the words used.

- **Finish the discussion before building**: a reading of what the human
  said is confirmed by the human before any of it is built ("go"). Building
  on an unconfirmed reading, even a mostly right one, costs changes after.
- **Ask point by point, briefly**: one question at a time, short; no walls
  of text. Discuss first; build what has settled; structure and design are
  decided with the human.
- **A new repository asked for**: its description alone, in a block to
  copy (2026-11-16: "description only to copy is enough"); its owner
  and name in a line of text. Created with a licence, so `main` has a
  first commit.
- **Check yourself before asking** (GitHub: `gh api -X GET search/repositories
  -f q='<name> in:name org:<org>'`; the code; the docs).
- **Few pushes** (GitHub suspended us once): one commit and one push per
  part; when a part is done, merge `execute/main` into `main` (a plain
  merge, `git merge --no-ff`) and push both at once; then the product
  repositories (`sh tools/products.sh <module>...` and
  `sh tools/packages.sh -m "..." <package>...`, from `main`).
- **Say in a few words what you are doing** when a step takes long; report
  after each step of a build, plainly, with what passed and what did not.
- **Record what settled**, in `readme.md` as a part, and keep this file and
  `CLAUDE.md` current: a context reset loses everything else.
- **The lock file by hand**: a module added or removed is written into
  `package.json` (workspaces) and `package-lock.json` (its workspace entry,
  its link entry) directly, its link made in `node_modules/`; no npm run.
- **Bare only**: npm only to change dependencies (`npm install
  --ignore-scripts`; then `chmod +x node_modules/bare-runtime-linux-x64/bin/bare`,
  npm drops its exec bit). The repo's Bare:
  `node_modules/bare-runtime-linux-x64/bin/bare` (tests:
  `bare ../../node_modules/brittle/cmd.js test/*.test.js` in a module).
- **This development repository stays as it is** (its `rules.md`,
  `pending/default`, `capability/*`): behind in structure, not to be
  migrated; the new model is for mycelium repositories.
- **The headers stay empty** until their use is planned with the human.
- **Only what is in use is here** (2026-11-11): the modules no package
  carries, the old haiccing folders, `splectral/`, `notes/`, `docs/` were
  removed (the history has them; each module has its repository). Bringing
  one back: copy it from its repository, then bring it to the rules first
  (READMEs cascading, `external/`/`internal/` methods, the code rules), as
  the checks will demand. `CLAUDE.md` describes the repository as it is:
  keep it so.
- **A test waits for a runtime's process to end** (signal 0, `kill -0`), not
  only for it to stop answering.
- **Long stretches of planning, then a batch built** (2026-11-13): the
  human prefers to discuss and plan in longer stretches; what settles is
  stacked in `tasks.md` and built when the human says so, then worked
  through to the end without stopping at each step ("I trust we have the
  tests in place").
- **A package tests what it provides** (the human, firmly, 2026-11-13: it
  had been skipped, "very disappointing"): a test of its own in every
  package for its functionality; never left to another package's test.
  Tests that fail when something is forgotten, so we are reminded early:
  the platform is so flexible that without full coverage it becomes
  hell; with everything checked by default one can be relaxed.
- **A dummy test is a decision, not a default**: a package with nothing
  of its own to test says so with a dummy (0 of 0), written for it after
  asking: is there anything package specific that needs testing? Never
  copied, never in the template.
- **Naming is local** apart from the generic tests. Every test has a
  named folder in the package's `test/`.
- **Self-contained and pinned**: a package is pinned to a commit of the
  template and upgraded explicitly, one at a time; blanket changes are
  avoided as expensive. (For now modules are still blanket: a module
  that changes means the pre-release of every package carrying it.)
- **The tools are kept well structured** (`tools/README.md`): they are to
  become packages running on the haicc platform.
- **Short answers, read literally** (2026-11-14): the human answers in a
  line ("Yes with default", "Request form one segment per command"). Say
  the reading back in a few lines with one example, ask only what is
  still open, one question; record what was said, in its words, in
  `tasks.md` before building. When a batch is done and the next task has
  proposals never answered, list them compactly and ask for a go.
- **A long run in the background, the turn kept open** (2026-11-14): the
  pre-releases take up to an hour; a turn that ends while they write
  files is made to commit and push what is half done. Start them in the
  background and wait in the foreground for the process to end (`timeout
  590 tail -f --pid=<pid> /dev/null`, again until it has); a foreground
  `sleep` is refused. Before a long run: `tools/bare tools/release.js`
  (every bundle current: some tests read the others' bundles), then each
  changed package's own test from its folder (`bare test/<name>/run.js`):
  a slip in a test is found in seconds, not after forty minutes.
- **When a test fails after a change, look at whose mistake it is**: in
  parts 60 to 64 every failure but one was a test still in the old form;
  the one that was not (the race of part 64) showed only one run in four:
  run the `haicc` test several times after anything that touches the
  request layers.
- **A file removal by variable is refused here**: `rm -rf "$VAR/..."`
  is blocked by a safety check; make a fresh folder with `mktemp -d`
  instead of clearing one.

## What is built (`readme.md`, parts 13 to 59)

- **Packages**: a package is one bundle carrying its structure (`mrepo/`),
  its code (`modules/`, assembled), its tests and its READMEs; its main a
  generated dispatcher running every entry by path (`/run`, `/protocol`,
  `/deploy`, `/test/...`). Assembly options per package (`assemble.omit`).
- **The boot** (`base-component-boot`, the initial boot mrepo and its
  program; `base-package-boot`, the boot protocol alone): run with Bare
  from its bundle, the
  boot mrepo built, its packages placed, its runtime started; nothing
  deployed by it, no executable. Its protocol: `boot deploy`, `teardown`,
  `redeploy` of a child, inside its parent (`main/<name>/`, the shadow of
  `main`), its shortcut in the parent's `xpath` layer.
- **The haicc command** (part 60): an app run with Bare,
  `base-app-haicc` (its code the module `haicc-base-app`): `haicc
  boot/deploy` and `haicc boot/teardown` (the machine level), `haicc
  sources` (the list, `unlink`, `https`, `no-https`, `download`), and
  `haicc <URI> <protocol>/<action> <args>`, which writes a record into
  the boot mrepo's inbox folder and prints the response. Before Bare is
  on the machine, the first step, `base-linux-haicc`, sh: one installer
  file, `haicc sources link <folder>`, `haicc sources download bare`,
  `haicc prereq`; its `haicc` starts the app for everything else.
- **Commands** (parts 33, 34): a request is protocol, action, URI and a
  list of unnamed arguments; given as its parts as typed, it is
  interpreted on its way in. `haicc` is a protocol (`base-package-haicc`),
  `goto` its default action: at a shortcut the command that follows is
  sent on unchanged, at the root it is executed here. XPath
  (`mrepo-base-xpath`) is the runtime's internal: a local URI resolved to
  a position, an ordinary node or a shortcut. An mrepo has a unique URI
  (`local/boot`, `local/host`).
- **The haicc component** (`base-component-haicc`): the mrepo a host or a
  node is managed with: runtime, boot, service, haicc; `main` empty.
- **The runtime** (`base-package-runtime`): the engine of every mrepo; its
  `protocol.js` offers `runtime run` (a linked package's entry, its tests)
  and `help` (`get`, `extract`). Requests: one handler into pending;
  internal requests (the mrepo's own, not in the inbox) first, the inbox
  taken in once the mrepo is operational.
- **Help**: the READMEs of an mrepo's packages extracted into its `help`
  layer as it starts, read with `help get <uri>` at three levels.
- **Validation in every package**: `/test/help` (the README rules),
  `/test/code` (the code rules), `/test/mrepo` (the integrity of its mrepo
  side), `/test/modules` (the carried modules' own tests);
  `validate-in-situ` in a running mrepo (`help-in-situ`, `mrepo-in-situ`).
- **Documentation packages**: `package-docs-template`,
  `package-docs-mrepo`, linked into every mrepo, validating themselves.
- **The service** (`base-package-service`): an mrepo that links it is
  service managed: a state machine (booted, initialised, started) whose
  actions each run the hooks of their transition, then move the state.
- **The tests** (parts 47 to 59): every package starts from the template
  (`haiccing/package-docs-template`: its `test/` holds the generic tests,
  a folder each: `help`, `code`, `mrepo`, `package`, `modules`, and the
  two in situ) and is pinned to a commit of it (`template` in its
  `package.json`; `sh tools/package-template.sh <package>` brings one to
  it). The package check (`/test/package`, `pkgm-base-check`): its files,
  its sets, a folder for every test, a test of its own. An action a
  protocol configures is a documented method (`external/<action>/`, its
  README with its signature, returns, errors). The runner fails a unit
  that reports no summary. A package's own test without an mrepo:
  `test/mounted/` (its `protocol.js` loaded, the config value by value,
  each action on a minimal execution, a last test failing when an action
  was not run), `test/configured/` in `base-component-haicc` (its list
  and hooks, run with the listed packages' own actions).
- **Test reports** (part 49): `test-reports/full.json` and `full.md` in
  every package, written by its pre-release, naming the bundle's
  `content` (a hash of everything in it but its reports), carried in the
  bundle; nothing changed, nothing rerun, the same bundle.
- **Hooks and activation** (parts 42 to 45): a request from outside is
  accepted only for an active protocol; nothing is active by default.
  `protocol/activate` and `protocol/deactivate` (`base-package-protocol`)
  write the active set, the `protocols` layer. Hooks are files,
  `/runtime/hooks/<transition>/<name>.json`, each a command: `boot` fired
  by the runtime as it starts, the other four by the service. Runtime
  config (the hooks, the service state) is laid in from the last package
  of a list only, the one that defines the mrepo; a list ends with its
  own package. The runtime names no protocol; every protocol has its own
  package (`help` in `base-package-help`).

## The roadmap, in order

Not built yet, and the platform is not deployed until the first two are
(they were in the earlier packages plan; kept here so they are not lost):

1. **`base-package-service`**: built (part 28): the `service` protocol as
   a package, the `protocols` layer, the gate on the loaded protocols'
   configs. Rule (the human): a package creates one entity, for a base
   package a protocol. The service's door closes a selection of
   protocols, those `gated` in their config (the human); the others stay
   open. Still open from it: the runtime's status beyond "not yet
   operational".
2. **haicc**: the first build is done (parts 30 to 37): the command, the
   protocol, XPath and shortcuts, the component, deployed and started from
   the command line, a node inside it, commands chained through both.
   What haicc is and the naming are in parts 30 to 32 (read them before
   designing further): package, component, application, demo, solution,
   manager; the offset (a command executed in the context of its position,
   forward visibility only); the storage rule (only `main` on the
   Corestore).
   **Next, the human's priority**: the host's haicc mrepo is there; then a
   node's haicc mrepo, then a swarm going, the demos on top of the
   component (they bring the folders in `main`).
   **Planned since** (`tasks.md`): relative URIs; `crud` (structure in
   `main`, a node a folder with `.node.json`); the shortcuts moved from
   the `xpath` layer into `main` (`.shortcuts.json`, several sources for
   one node, local data beside them: overlays).
   **Open, each to settle with the human first**:
   - a position deeper inside `main` (`haicc swarms/swarm-1 boot/deploy
     node-1`): built (part 68), a command stands at the position; what
     each protocol does there is its own (`boot/deploy` at a position is
     not looked at yet);
   - a node's unique URI, `<swarm>/<node>`: a child takes its parent's
     swarm today, so everything is `local/<name>`;
   - into a node's container: mapped inbox and outbox folders, or an
     equivalent, secure; `base-manager-host`, `base-manager-node`;
   - publishing (the human, 2026-11-13): a release is created on each
     package's own repository, not in a repository of sources; signing is
     off, we are not set up for it; what cannot be done from the cloud
     session (creating a GitHub release) is done on the local machine.
     For now: a local build into local sources, the repositories pushed
     for completeness; the network is not good enough for many downloads.
     Not built: `haicc sources download` fetches Bare only, and the
     mrepos do not fetch over https (the backup is recorded and passed
     on, nothing reads it). To settle: the sources folder structured to
     take everything (proposed: a folder an organisation, ours or third
     party, each with its manifest; addons by hash);
   - teardown (the human): not a worry now, it will sort itself out;
   - structure in `main` (the human): functionality to create it is
     needed before a deeper position can be used;
   - the main data of a linked mrepo seen through its shortcut;
   - composite actions (an action resuming at a label after a child
     request; `boot/install` as one), fan-out, a time limit for a child
     that never answers, dispatch to another node;
   - the layer routing in the code against the storage rule; the two-way
     sync of a folder with the Corestore.
3. **`base-package-crud`**: built (part 63): `create`, `read`, `delete`
   on an mrepo's nodes; the `rest` actions it replaces are removed (part
   64). Still to come: `update`, which gets its meaning with mutable and
   immutable implemented (an update on the mutable side from a stream of
   immutable change events).
4. **Release and sourcing, deferred**: bundles signed and the manifest
   checked against the publisher's key (the key tool was removed with the
   clean-up: to be rebuilt with it); a GitHub source beside the folder
   source; the Docker prerequisite used (nodes).

Then, as discussed:

5. **The terminal as a mini mrepo** (its boxes, its requests done).
6. **The dispatcher application** (like HAICC: its own API; requests to it
   processed, others routed; stray records returned to it as misdelivered;
   local subscriptions file operations, remote ones other nodes, followed
   or announced). Until then HAICC's input posts into the repository's
   inbox and reads its completed form from the outbox.
7. **The headers**: to plan with the human (the execution's metadata, the
   states a request ran on, are in the commits only meanwhile).
8. **Command help** (the help protocol's second stage; the first, the help
   layer and `runtime help`, is built). Agreed with the human:
   - **The external API, structured**: a post-processing step of the help
     parser, a view of the protocols and their actions the mrepo offers,
     each joining the package's mounting (`protocol.js`: URIs, states)
     with the module method's README (`external/<action>/`: body, returns,
     errors).
   - **URI dismantling**: what a (local) URI really points to: its layer,
     the folder or package, a mapping out.
   - **The help flag is a rewrite**: `<protocol> <action> <uri> --help`
     becomes a help command whose input is the original request; answered
     with the request's context (allowed here and now, the draft body
     checked), nothing executed. No header needed.
   Here because the dispatcher brings requests from outside. The modules
   get their `external/`/`internal/` directories as work reaches them
   (done: `mrepo-base-boot`). Third stage, later: AI enhanced help.
9. **Populating `main` and `initialise`**: a type's own actions (its
   package's functions, run as configured), documented in the same shape.
10. A request's own history in its document (step by step), when wanted.
11. **A mini tool for the modules kept here** (`tools/`), no npm run: a
   module added (brought back from its repository, or new) or removed is
   written into `package.json` (workspaces), `package-lock.json` (its
   workspace entry, its link entry) and `node_modules/` (its link); and the
   third-party code nothing here uses any more is pruned from the three
   (worked out with the closure, as the assembler does). Done by hand
   until then (part 26). Here because the swarms bring modules back.
12. Then swarms, nodes, the requests done centralised, the demos; step 3,
   the docs.

On the distant horizon (the human, 2026-11-13; `vision.md`, "Pipelines,
and mycelium as a database server"; a direction, the practicalities not
designed):

13. **The pipeline engine**: processing built from the protocols' core
   actions, each step a request, the pipeline's state its own execute
   branch of `main`, one commit in `main` at its end; execution plans;
   compiled pipelines. Then **mycelium as a database server**, which needs
   it, and **cache management** of replicated stores (a TTL). To take into
   account when earlier items are built: the headers (item 7: the
   pipeline and step identifiers), `base-package-crud` (item 3: the core
   actions), the composite actions (item 2's open list: the pipeline may
   take their place).

## Elsewhere

- **Validation, for autonomy** (step 2, parts 23-25): every package's
  `validate` checks its help (`/test/help`, the README rules) and its code
  (`/test/code`, the code rules); `validate-in-situ` in a running mrepo.
  Run before every commit: `tools/bare tools/help-extract.js` (and
  `--files`), `tools/bare tools/code-check.js`, each package's set from its
  bundle. Run the boot's test several times when the runtime or the
  repository code changed: a race shows one run in a few.
- **Open, p2p-git** (two defects for a process reading a repository
  another process writes; `mycelium-git`'s `listBranches` tolerates both
  meanwhile): a ref is written in place, for an instant unreadable (to be
  written aside and renamed); and its listing of branches returns nothing
  when a branch is removed during its walk of the refs (`readdirDeep`
  fails on the vanished file: to skip it). Request branches, made and
  removed with every request, make the second frequent.
- **Internal requests** (part 24): placed by the mrepo itself, straight to
  the handler into pending (`admit`), no mark: internal is having no
  record in the inbox (`isInternal`); the inbox waits until the mrepo's own
  are done. The runtime's status (operational) starts there.
- **Assembly options per package** (part 24): `assemble.omit` in a
  package's `package.json`, a default in the root; try and see, its
  `validate` the proof.
- **`mrepo-base-help`**: built (step 2, part 24): the help protocol, the
  extraction, the validation; documentation packages marked `docs`.
- **The local agent** builds and tests on the human's machine
  (`prompt-local.md`, `handover-local.md`, its notes in `local-note.md`,
  its record in `local-run.md`). What it runs changed with part 37: there
  is no executable and no `tools/haicc-try.sh` any more. The sources are
  built with `tools/bare tools/release.js`, and the whole flow is tried
  with `sh haiccing/base-linux-haicc/test/run.sh` (`--keep` to inspect).
  Its prompt and handover are rewritten for it (2026-11-13).
- **The seed `dev-env-3-mrepo-native`** is on `splectrum/roadmap-1`
  (`seeds/dev-env-3-mrepo-native/`, a copy in `seed-dev-env-3-mrepo-native/`
  here): the mrepo framework on native git, standalone. Its repository,
  `splectrum/dev-env-3-mrepo-native`, to be created by the human. Its
  request's step 2 (the storage setting, the opener) and the boxes as
  layers are already built here (part 7 on): open whether to update the
  seed to say so (one commit to `roadmap-1`).
- `pear-full-square/mrepo-base-log` (created empty by the human): dropped,
  to be archived by the human.
- The product repositories of removed modules (`mycelium-repo`,
  `haicc-reconcile`, `p2p-swarm-manager`) are archived.
