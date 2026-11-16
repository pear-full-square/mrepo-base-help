# Tasks: discussed, waiting to be built

Tasks discussed with the human and stacked here, to be built later in
batches: on to swarm nodes up and running (not planned yet); then
"Deployed tests" and "Coverage". ("First" and "Test reports" are built:
kept here for what they left. Task 0, a Bare app for `haicc`, is built:
`readme.md`, part 60; task 3, the rest actions removed: part 64.) A task is removed from this file when it is built:
its record is then a part in `readme.md`.

A design in discussion, a file of its own: `xpath.md` (XPath across
links: a query as a pipeline of `haicc` segments and merges). Task 4,
the request train's two repairs, is built: part 65. Task 5, logging, is built: part 66. Task 6, XPath, the first implementation, is built: parts 67 and 68; what was decided while building is in those parts, to confirm. Noted
to discuss: task 7, the inbox watched. Task 8, the human's findings from the manual test (flags after the URI, a record packed on its lines, `haicc output`): settled with the local agent, waits for the go. Task 9, the request records reachable by a flag, `layer=request` (the human's direction): in discussion.

## Priorities (the human, 2026-11-15)

The human: "I think we have a clear list of priorities: use mycelium,
achieve p2p swarm, improve self-containment (help, dev pipeline) to
achieve efficient AI autonomy."

The list as the human gave it ("We need to set some priorities"), in
that order, in the human's words, each with a label to follow it by
(the human: "can you label task meaningful (as well) rather than just
numbers? Make it easier for me to follow"). Under which of the three
aims each falls is our reading, to confirm. Nothing of it discussed
yet, none has a go.

| | label | the human | aim (our reading) |
|---|---|---|---|
| P1 | `mrepo-registry` | "Implementation of mrepos as shortcuts with a 'registry' of mrepos." | use mycelium |
| | `continuation` | a command may answer with a script to continue with, run by the terminal, paced by each response (a JIT pipeline): demos that run on their own, howtos that run | built, part 77: a simple script, no nesting, ceiling 100 |
| | `swarm-cluster` | a working swarm cluster, written as scripts of the component (takes P2 and P3 together) | the work now: `cluster.json` begun, part 78; the swarm's own steps to design |
| P2 | `node-mrepos` | "Then creating node mrepos, how to create the container version." | p2p swarm |
| P3 | `swarm-demos` | "Then we can do simple demos with a p2p swarm." | p2p swarm |
| P4 | `install-tests-review` | "We need to do a review of the package repos for 'full install tests'." | self-containment |
| P5 | `rules-in-help` | "We need to make sure that rules and design decisions live in the help and howto where they are implemented (XPath e.g.)." | self-containment |
| P6 | `help-and-howtos` | "We need proper howtos, we need a proper help protocol." | self-containment |
| P7 | `claude-headless` | "I want to use claude headless ASAP using the tailored help and howtos." | self-containment |
| P8 | `dev-on-haicc` | "Then we need to 'haicc' the development process." | self-containment (dev pipeline) |

**The order, as it stands** (the human, 2026-11-15, after the list:
"if the priority list start with the open tasks first (cleanup), then
registry design + mrepo as shortcut, then swarm node creation (container
mrepo). What else on that list?"):

1. **Cleanup** (done, parts 70 to 74): the open tasks: `xpath-first`'s
   decisions confirmed (part 74),
   `command-line-findings` (built, parts 70, 71),
   `request-layer-access` (built, part 72), `inbox-watcher` (built,
   part 73: "inbox-watcher: yes"). `teardown-cascade` is not cleanup: "no: We
   will have the mrepo registry soon and that is a better place to do
   'bulk teardown'": it goes with `mrepo-registry`. (Which of them are cleanup is our reading, to
   confirm.)
2. `mrepo-registry`: the registry's design, an mrepo as a shortcut.
3. `node-mrepos`: swarm node creation, the container mrepo.
4. `swarm-demos`: simple demos with a p2p swarm.
5. `context-help`: the help protocol, context sensitive help (the
   human: "help howtos and install custom test are very closely
   related, they develop together. I also think that testing the review
   would benefit from a working help protocol. So I would put that 5,
   context sensitive help").
6. `package-review`: the review of the package repositories ("Then 6
   and 7 as amongst the criteria for review"): its criteria, among
   others: the full install tests, each package's custom test
   (`install-tests-review`); rules and design decisions living in the
   help and howto where they are implemented (`rules-in-help`); proper
   howtos (`help-and-howtos`).

**The milestone** this block (5 and 6) achieves (the human): "ready to
start using headless claude (AI autonomy) and tackling the D&I process
using haicc": `claude-headless`, then `dev-on-haicc`. D&I: "design and
development, which will then become HDLC afterwards (haicc (software)
development lifecycle)": our terms ("it is not my terms or your terms,
but our terms: we are a team").

From before the list, not placed: `xpath-phase-2`; "Deployed tests" and
"Coverage" (below).

What the local agent's notes of 2026-11-15 hold for them
(`local-note.md`):

- `mrepo-registry`: point 4, settled there: the parent's `main/<name>/`
  holds the shortcut only, the mrepo is placed elsewhere.
  With it, `teardown-cascade` (point 5: a teardown leaves a node inside
  the host running): the registry is the place for a bulk teardown.
- `node-mrepos`: point 3: the nodes now are the bridgehead for the
  container nodes.
- `help-and-howtos`: points 1 and 2: `haicc help/get` without a URI,
  the machine level's help, settled; an mrepo's own help and where a
  howto lives, proposed there, not answered.
- `claude-headless`: `vision.md`, "Agents"; tried once.

Not placed in this list by the human, to ask where they go:
`inbox-watcher` (task 7), `command-line-findings` (task 8, settled,
waits for the go), `request-layer-access` (task 9), `xpath-phase-2`
(the union and the fan-out over shortcuts; `xpath.md`), and
`teardown-cascade`: a teardown leaves a node inside the host running
(`local-note.md`, point 5).

## The tasks by label

| | label | what | where it stands |
|---|---|---|---|
| 0 | `haicc-app` | the `haicc` command as a Bare app | built, part 60 |
| 1 | `relative-uris` | relative URIs, a URI as segments | built, parts 61, 62 |
| 2 | `crud` | the crud protocol, the shortcuts in `main` | built, part 63 |
| 3 | `rest-removed` | the rest actions removed | built, part 64 |
| 4 | `request-train-repairs` | a removed branch's folders, the squash into `main` | built, part 65 |
| 5 | `logging` | flags, three levels, the request's metrics and audit | built, part 66 |
| 6 | `xpath-first` | XPath phase 1: the engine, `crud` and `haicc` on it | built, parts 67 to 69; its decisions gone through together, part 74 |
| | `data-names-in-queries` | a document's key in its URI form in a query | built, part 69 |
| 7 | `inbox-watcher` | the inbox watched by a file watcher, not polled | built, part 73 |
| 8 | `command-line-findings` | flags after the URI, a record packed on its lines, `haicc output` | built, parts 70 and 71 |
| 9 | `request-layer-access` | the request records reachable, `layer=request` | built, part 72 |
| | `external-request-api` | what the outside may ask (protocols, actions), designed, not hard-coded | to discuss |
| P1 | `mrepo-registry` | mrepos as shortcuts, a registry of the host-local mrepos | built, parts 75 and 76 (the links layer, an mrepo's own; the mrepo registry, the boot mrepo's); the rest for the next design round |
| P2 to P8 | above | the other priorities | not discussed yet |

How to read a task:

- **Settled** is what the human said or confirmed. Build it as written.
- **Left to us** is what the human handed over: ours to decide and to
  change while building. Say what was done.
- **Proposed** is ours, put to the human and not yet answered. Confirm it
  with the human before building ("go"), unless the task says it is ours
  to keep or change.
- **Where** names the code found when the task was discussed, to start
  from; check it again, the code may have moved.

Validation, the commit, the merge and the product repositories: as
`CLAUDE.md` and `handover-next.md` say, for every task.

## First: every package tests what it provides

Raised by the human, 2026-11-13, on seeing haiccing packages without
tests of their own: "very disappointing that this was skipped". A debt in
what is built, not a new feature. Proposed order: before task 1, so the
change of every command in task 1 is made with these tests in place.

**What was found** (checked 2026-11-13)

- The four generic tests are in every package (`help`, `code`, `mrepo`,
  `modules`); their code is in the carried modules, so a package's
  `test/` shows only the sets and the runner.
- A test of its own: only `base-package-runtime` (`start`) and
  `base-component-boot` (`boot`). None in `base-package-boot`, `-haicc`,
  `-help`, `-protocol`, `-service`, nor in `base-component-haicc`.
- The protocols are tested by their modules' unit tests (the actions
  called as functions) and by two end to end tests that live elsewhere
  (the boot component's, the `haicc` command's). A protocol package's
  README says so itself ("tested by the boot package, which can deploy
  one"). It came about when the protocols were split into packages of
  their own (parts 28, 37, 43 to 45): the tests stayed where they were.
- No test validates a package against the structure
  `haiccing/package-docs-template` documents, and no rule says which
  tests of its own a package must have: a package with none passes.

**Settled** (the human)

- For each package there are custom tests, at the haiccing level (the
  package's own, in its `test/`), for the functionality it provides.
- For a protocol: a test mrepo is created, with some test data, and the
  actions are tested. The hooks are tested. The specific configs are
  tested.
- Not the way: adding tests package by package by hand, as an
  afterthought ("that is not how we do it"). The structure of a haiccing
  package is in a package in haiccing; the question the human asked:
  where is the test that validates the structure of a haiccing package?
  There was none.
- **Built one by one, and double checked** with the human.
- **Tests that fail when something is forgotten**, so we are reminded
  early. The reason: the platform is so flexible that without full
  coverage testing in place it becomes hell; when everything is checked
  by default, one can be relaxed about it.

- **Naming is local** (2026-11-14): apart from the generic tests, a
  test's name is the package's own, a lot of freedom. A test can be a
  full deployment package, with several swarms if needed: as integration
  tests they can be very powerful.
- **Every test has a named folder** in the haiccing package's `test/`
  folder, a folder a test or a test group, the generic ones included. One
  existed (`test/modules/run.js`, in the runtime's and the boot's
  packages) and was removed by us in `fb547c9` (part 22), when the
  dispatcher took the generic tests over: against this rule.
- **This session**: the generic tests, and tests that run without
  building a test mrepo. The aim: confidence that a new implementation
  adheres to the rules and standards; with it the implementation speed is
  high. There are complex items on the roadmap that can only succeed with
  full test coverage in place.
- **A generic test of the test coverage** is added, on the modules and on
  the haiccing packages as well. On the list; its implementation is
  looked at later ("Coverage", below).

- **A protocol package is tested on the pattern it must expose** (the
  module and method pattern): possible without an mrepo.
- **A package without custom tests gets a dummy**, so there is a 0/0
  entry. Not part of the template: it is done explicitly; one must have
  asked oneself the question: is there anything package specific that
  needs testing?
- **The template is the start of every package** (2026-11-14): if the
  folders are part of the template structure they are there from the
  start; a new package is created by cloning it from the template.
- **Pinned, upgraded explicitly** (the model; not built, and not how we
  work right now): haiccing packages are self-contained, each pinned to a
  commit of the template. Upgrading a package's template is an explicit
  step, done as and when appropriate, never set off by a change of the
  template (no blanket retest): blanket changes are often unnecessary and
  expensive in resources.
- **For now the blanket approach**, because our test coverage is
  insufficient and it costs us.

**Built so far** (in `main` since 2026-11-14, the template passing its
own full set; its repository and the check module's pushed; each further
step shown to the human first)

- Part 47: the rule that a package tests what it provides, and the check,
  `/test/package`, in every package's `validate` and `full`; the same
  over all packages from `tools/bare tools/code-check.js`.
- Part 48: the template up to standard. Every generic test a named
  folder in `haiccing/package-docs-template/test/` (`help`, `code`,
  `mrepo`, `package`, `modules`, `help-in-situ`, `mrepo-in-situ`), each
  its `run.js` and README; the dispatcher finds a test from its folder;
  the check asks a folder for every test a set names, and no longer a
  fixed name for a protocol's test (naming is local).
- Part 49: the test reports, in the template ("Test reports", below).
- Part 50: the pin (`template` in `package.json`), the step that brings a
  package to the template (`sh tools/package-template.sh <package>`, then
  its pages by hand, then `tools/bare tools/package-test.js`), and
  `package-docs-mrepo` brought to it.
- Part 51: `base-package-runtime` brought to the template; the boot
  component's `boot` test green again. The order from here (the human):
  up the protocol stack, one by one.
- Part 52: every action a protocol configures is a documented method
  (checked without an mrepo); the runtime's `run` moved into
  `external/run/`; every package has a test of its own, a dummy where
  nothing is specific to it (an explicit decision, never from the
  template); `package-docs-mrepo`'s dummy, `test/none/`.
- Part 53: `base-package-protocol` brought to the template, its own
  test `mounted` (the pattern for the protocol packages in this session:
  `protocol.js` loaded, the config value by value, each action on a
  minimal execution, the last test failing when an action was not run);
  the runner fails a unit that reports no summary.
- Parts 54 to 59: `base-package-help`, `-service`, `-boot`, `-haicc`,
  `base-component-boot` and `base-component-haicc` brought to the
  template, each with a test of its own.
- **Where it stands** (2026-11-14): all ten bundle packages are brought
  to the template and pinned, each with a current, passing report;
  `tools/bare tools/release.js --strict` passes; `tools/bare
  tools/code-check.js`: no problems.

  | package | its own test | still to come, in a running mrepo |
  |---|---|---|
  | `package-docs-template` | none asked (the template) | |
  | `package-docs-mrepo` | `none`: a dummy, nothing package specific | |
  | `base-package-runtime` | `start`: the runtime started over an mrepo | `runtime/run` requested, its boot hooks |
  | `base-package-protocol` | `mounted` | activate and deactivate requested, the gate |
  | `base-package-help` | `mounted` | extracted by a hook, read by commands |
  | `base-package-service` | `mounted` | requested, the door, a failing hook rolled back |
  | `base-package-boot` | `mounted` | a child built and started by a request |
  | `base-package-haicc` | `mounted` | a command as typed, carried through shortcuts |
  | `base-component-boot` | `boot`: end to end, between running mrepos | |
  | `base-component-haicc` | `configured` | deployed whole, its door, a node inside it |

  `mounted` and `configured` need no mrepo (this session's kind): the
  package's `protocol.js` or its list and hooks, value by value, each
  action on a minimal execution, a last test failing when an action or a
  hook was left out. Each test's README says what is "Not here".
- **Left**:
  - the tests in a running mrepo, the third column: a test mrepo with
    test data, the helper that makes one, and the check from the `done`
    history that every action was requested and every hook ran
    ("Proposed", below);
  - `base-linux-haicc`: shell scripts, no bundle, so it carries no
    generic test and the package check skips it; its own test is
    `test/run.sh`. Since part 60 it is the first step only (a folder
    linked, Bare put in place, the app started); the command itself is
    `base-app-haicc`, a bundle with the generic tests, a test of its own
    and a report.

**Open**

- **Cloning the template is the aim** (the human, 2026-11-14): the
  template itself is what is cloned, and it carries in the help to
  customise it. To build: the template reshaped so a clone is a clean,
  working package whose READMEs say how to make it one's own (today its
  folders hold documentation, an `example/` and a placeholder `name/`).
- The pin as built (ours, shown to the human with part 50): `template`
  in `package.json`, `{ repository, commit }`, the commit of the
  template's own repository, `haiccing/package-docs-template`.
- Whether the modules a package carries follow the same rule (kept until
  it is upgraded). Put to the human; the answer: blanket for now.

**Proposed** (step 2 on: one package at a time, each shown to the human)

- The check goes one level deeper than a test being there, from what the
  test mrepo records: at the end of a protocol's test, the `done` history
  is compared with the protocol's config, and an action never requested
  fails the test; the same for the hooks the package brings (each must
  have run). An action or a hook added later without a test then fails
  that package's own test.
- One helper that makes a test mrepo from a list of packages and test
  data, starts it, sends requests, compares the history and stops it,
  shared by these tests (the runtime package's `start` test is the
  model).
- What each test covers:
  - `base-package-runtime`: `runtime/run` (a linked package's test, a dry
    run, `/run` refused), its boot hooks, the internal requests first;
  - `base-package-protocol`: activate and deactivate through requests,
    the active set, a request for a protocol that is not active refused,
    its config (at the mrepo itself, its argument);
  - `base-package-service`: the states and each transition, the actions
    refused in the wrong state, each transition's hooks run in order, a
    failing hook failing the transition and rolling it back;
  - `base-package-help`: a test mrepo with READMEs to extract; `extract`,
    `get` at its three levels and one section, nothing extracted yet;
  - `base-package-haicc`: `goto` at the root executed there, at a
    shortcut sent on (a linked child as test data), no command, a chain;
  - `base-package-boot`: a child deployed, redeployed and torn down in a
    test mrepo, its shortcut, its runtime started and stopped;
  - `base-component-haicc`: deployed whole: what its `boot` hooks
    activate, help extracted on `initialise`, `boot` activated on `start`
    and deactivated on `stop`, its door;
  - `base-component-boot` (`boot`) and `base-package-runtime` (`start`):
    reviewed against the same standard.
- The READMEs that say "tested by the boot package" are corrected as
  each package gets its test.

**Where**

- `haiccing/package-docs-template/README.md` and `test/README.md` (the
  structure, the sets, the targets); `pear-full-square/pkgm-base-check`
  (`internal/rules`, `internal/mrepo`, `validate/`); `tools/lib/dispatcher.js`
  (which generic units a package gets).
- `haiccing/base-package-runtime/test/start/` (a test mrepo written,
  the runtime started, answering, stopped);
  `haiccing/base-component-boot/test/boot/` (the lifecycle through
  requests).
- Each protocol's module tests, to see what is covered as functions:
  `pear-full-square/mrepo-base-*/test/`.

## Deployed tests: the tests that deploy floating test mrepos

In discussion with the human, 2026-11-14: the design, point by point.
What "First" left: each package's test in a running mrepo.

**Settled** (the human)

- **A package's deployed test is its how-to** ("How-tos", under "Future
  additions"): it lives where the functionality is made.
- **The test itself is the deployable thing** (ours, put three times, not
  objected to; it follows from the line above): its folder holds an
  `mrepo/` with the test data and the configs under test, and a list
  naming the packages it needs, the package under test among them. A test
  mrepo is defined as a real one is; nothing of it is built by test-only
  code.
- **Deployed the real way**, of course: through a boot mrepo, with the
  boot protocol. **The `haicc` tool can deploy them.** Once there is
  structure in the boot mrepo (tasks 1 and 2), they are given a location
  there.
- **Why it matters** (the human): if requirements become POCs, then
  how-tos, and are collocated (self-contained), then each installed
  package can create help and how-tos that are 100% tailored and kept
  fresh through the documentation and implementation rules. Very few
  designs can beat this.

- **Not constrained** (the human): what a deployed test is, is not
  fixed. There are types of deployed test, and types keep being added
  over time. (Our proposal of one list of steps, the source of both the
  test's script and the how-to's text, is then one type to consider, not
  the definition.)
- **When** (the human's proposal, agreed by us): deployed tests are
  tackled after swarm nodes are up and running. Until then (ours): a new
  feature starts as a POC demo run with the `haicc` tool, kept as its
  first how-to; the two end to end tests (`base-component-boot`'s `boot`,
  `base-linux-haicc`'s `run.sh`) stay green and are extended where the
  behaviour changes; each package's `mounted` or `configured` test says
  what is "Not here".

**To settle** (when the work reaches it)

- What a test deploys as its target: a unit inside a package
  (`<org>/<package>/test/<name>`), where `boot/deploy` takes a package
  today.
- Which boot mrepo: one the machine has (the `haicc` tool's), the tests
  at their location in it; or a temporary one where there is none (the
  pre-release).
- How the test talks to it: commands as someone would type them; whether
  the steps are one source for both the how-to's text and the test's
  script.
- "Nothing forgotten", from the `done` history: every action requested,
  every hook run.
- Where the shared helper lives. Cleanup; what runs in `validate` and
  what in `full`. More than one mrepo: a node inside a host, later
  swarms.

## Test reports: proof of test execution

The human, 2026-11-14. Part of the standard: it is in the template.

**Settled** (the human)

- We need proof of test execution: each package has a test report that
  shows it passed all the tests within the package, created before any
  release.
- Its place: a folder `test-reports/` at the package's top (not
  `test/reports/`: every folder of `test/` is a test).
- What it holds: the result of the `full` set (every unit, its tests and
  asserts, its failures) and what was tested (the package, the Bare
  version, the date); tied to the content, so a report for an older state
  is recognisably stale.
- **Nothing changed, nothing rerun**: when the content is the same there
  is no need for a new report, and the release build creates the same
  release.
- **A production pipeline concern**: the release only needs to know that
  the standards were upheld. The final test run is part of the
  pre-release; the report is then added and the release built: the bundle
  contains its pre-release report.

**Built, in the template** (part 49 in `readme.md`)

- `haiccing/package-docs-template/test-reports/`: its README, and the
  template's own report, `full.json`, with `full.md`, the same to read (a
  sentence, an overview table, a table of the units; the human's wish),
  written from it by the pre-release.
- A rule found on the way: what is tested must not depend on a report
  (the content hash leaves the reports out): no link from a README to a
  report file.
- `tools/package-test.js <package folder>...`: a package's pre-release.
  `tools/package-bundle.js` gives every bundle its `content` (a hash of
  everything in it but its test reports), in the manifest;
  `tools/lib/report.js` says a report's status against it (current,
  stale, failed, none); `tools/release.js` states each package's and
  refuses with `--strict` unless all are current.
- The package check asks for `test-reports/` with its README.

**Left**

- The nine other bundle packages have no `test-reports/` and no report:
  each gets them when it is brought to the template ("First").
- `tools/release.js` as a whole with the report part was not run (it
  rebuilds every package): its report part was run on its own, over the
  manifest as it is. It runs whole when the packages are brought in line.
- A check of the report where the package is deployed (in situ: the
  bundle a running mrepo holds carries a current, passing report): not
  built, to discuss.

## Coverage: a generic test of the test coverage

The human, 2026-11-14: wanted, on the modules and on the haiccing
packages as well; put on the list, the implementation looked at later.

**What was found** (2026-11-14)

- The test runner measures it on Bare: `brittle --coverage` (`bare-cov`
  1.2.3, here already): statements, branches, functions and lines a file,
  as text and as JSON (`coverage-final.json`).
- Each module's own unit tests today, functions called: 100% in 13 of 19
  modules; `mrepo-base-boot` 95.8, `mrepo-base-execute` 91.9, `p2p-mrepo`
  94.4, `pkgm-base-manager` 97.5, `mrepo-base-request` 64.4,
  `mrepo-base-runtime` 56.3. Lines: 97 to 100 for most, 66 and 55 for the
  last two. Branches: 69 to 100.
- Code run in a separate process (the runtime a test starts) is not
  measured as it stands: the last two are higher in truth. Following
  child processes is part of the work.

**Open** (put to the human, not answered: implementation later)

- The bar: every function called by a test as the hard rule, lines and
  branches reported with the uncovered lines listed; or every line run.
  Ours: the first to start, tightened to the second once green.
- What coverage means for a haiccing package: its own tests against the
  code it carries and its own entry points.

## 1 · relative-uris: Relative URIs

Discussed 2026-11-13, while designing task 2, which builds on it.

**Settled** (the human)

- A URI in a command, which today starts at `/`, is in fact the mrepo's
  `main`: a request from outside is naturally restricted to `main`.
- **Relative throughout**: a URI never has a leading slash. It is
  relative to where its writer stands.
  - From outside, the writer stands at `main`: `.` becomes `main`, `host`
    becomes `main/host`.
  - The mrepo itself stands at its root, the folder above the layers: `.`
    is that root, and its own commands name the layer first
    (`protocol/activate . help`).
- `.` is written where `/` was: the position itself. A command that
  gives no URI means `.` (`haicc host service/start`).
- **One standard, inside the code too, in the long run.** Writing to one
  standard outside and another inside leads to confusion, and certain
  patterns do not work. The easiest first is fine; the code can start to
  accept `.` and no slash, and change over gradually.
- **The current root can move away from the mrepo's root**:
  `haicc test/mydata/users users/check-addresses *` (the position
  `test/mydata/users` in `main`; there the protocol `users`, its action
  `check-addresses`, the URI `*`). An action written with relative URIs
  works wherever its root is.
- **A position can be a selection**:
  `haicc test/mydata/users[name=s*] users/check-addresses *`. The command
  is executed once for each node selected, that node the current root.
- **The rule: all node selections are arrays.** Most are singletons; the
  system is then ready for set processing, as in the example. (From an
  earlier discussion of the human's; found written nowhere in this
  repository, 2026-11-13.)
- **An action's result is an array too**, because its input is in
  essence XPath: `crud/read swarms` gives an array holding one node,
  `crud/read *` an array of all of them, the same shape. A set comes in,
  a set goes out.
- **A response can contain any data type** (the human, 2026-11-14,
  asked whether an action that is not about nodes, `service/start`,
  should also answer with an array of one: "No, response can contain any
  data type."). So nothing wraps an action's answer: what reads nodes
  answers with an array of them, by what it is; `service/start` answers
  its object as it does now.
- **A URI is of type array of URI segments** (the human, the same
  answer: "URI is of type Array of Namepart strings.", then corrected:
  "name part uri segments rather than individual name parts"). Our
  reading, to confirm before it is built: a URI as data is an array of
  segments, each a relative URI of one or more name parts
  (`"swarms/swarm-1/node-1"`), not split into single names and not one
  joined string. The segments are the fixed chunks the rewrites work on:
  the layer, each jump, the URI where the command was executed:
  `["main", "host", "swarms/swarm-1/node-1"]`. The prefix is of the same
  type, so joining prefix and URI is joining two arrays, and the
  boundaries stay. The string form is how one segment is typed.
- **In the request's form: one segment per command** (the human,
  2026-11-14, asked whether the type applies to the form too: "Request
  form one segment per command"). So the form's URI is of that type too,
  and each command in a chain gives one segment, its URI whole as typed.
  The human, on our reading of the details: "What exists now should
  run as the uri as is with prefix main, 2 segments. For external just
  one segment. So implement an array internally. Multi segment will
  become clear with haicc commands." So, to build now:
  - inside, a form's URI is an array: for a request from outside the
    prefix `main` and the URI as it is written, two segments:
    `["main", "host"]`, `["main", "."]`;
  - outside, a URI is one segment, as it is written today;
  - more segments than that (jumps, a command executed at a deeper
    position) are not designed now: they come with the `haicc` commands
    that need them.
- **An empty selection is not an error** inside: it gives an empty
  array, also for a plain path with a typo in it. Whether that is an
  error is for the one who submits the request to check. No rule of ours
  tells a plain path from a pattern.
- **URIs are rewritten on exit, by a prefix** (the human). There will be
  many rewrites: a linked mrepo that returns URIs needs them rewritten to
  the mrepo that links it, and so on outwards. Instead of rewriting the
  data, the output carries a prefix for its URIs: when a data set crosses
  a boundary only the prefix is updated, and any tool showing the URIs
  reconstructs them (prefix and URI).
  - The prefix may be stored as an array, because the rewrites are fixed
    chunks (the human; agreed by us: a rewrite is then an operation on
    whole elements, and the array keeps the boundaries a joined string
    loses, one chunk an mrepo crossed, so a tool can rebuild the path or
    the chain of `haicc` commands that reaches it).
  - **Jumps are made with the `haicc` command, and it creates the
    prefix** (the human; the current implementation works this way: each
    hop takes its own `haicc <URI>` off, the rest is executed in the
    context of that position, and a request that sent a command on
    records where, `remote.at`). So every jump adds its position as a
    chunk, and the array is the chain of jumps:
    `haicc host haicc node-1 crud/read swarms` answers with the URI
    `swarms` and the jumps `[]` inside `node-1`, `["node-1"]` back in
    `host`, `["host", "node-1"]` back in the boot mrepo. Nothing is
    rewritten on the way back: each jump puts its own chunk in front.
    A jump to an ordinary position adds a chunk the same way:
    `haicc test/mydata/users ...` gives `["test/mydata/users"]`. The
    execution's current root is the sum of its jumps.
  - **There is still the internal layer prefix** (the human): inside an
    mrepo a URI names its layer, so the layer (`main`) is part of the
    prefix there, in front of the jumps: `["main"]` inside `node-1`,
    `["main", "node-1"]` in `host`, `["main", "host", "node-1"]` in the
    boot mrepo.
  - **The prefix is in the request's data structure** (the human), not
    in a header. The headers stay empty.
- The flag `error-on-empty` is not in this round: "Future additions",
  below.

- **What an action is about is an argument**, not the request's URI
  (agreed): `help/get` and `runtime/run` take their subject, written from
  the mrepo's root (`packages/...`), as their first argument:
  `haicc . help/get . packages oneliner`. An argument is data, not
  access.
- **A `./` prefix is allowed** (the human): `./sources` is the position
  `sources`. It is how a position at the local root named like one of the
  `haicc` script's own commands is typed.

**Left to us** (the human: "you know best how it fits in")

- The changeover, in four steps; this task builds the first two:
  1. requests first: everything written or stored as a request is
     relative (commands, hooks, the form); one function at the boundary
     serves the code that still wants slash-led paths;
  2. the interface accepts both: the validator and the read and write
     calls take `.` and no leading slash as well as the old form, meaning
     the same;
  3. modules change over as they are touched, starting with `crud`,
     written relative from its first line; when none uses the old form,
     the validator refuses it;
  4. the current root moves: reads and writes relative to the
     execution's root (the roadmap's "execution context opened at a
     position"): a task of its own, after `crud`. An action at a moved
     root reaches the mrepo's own state (the service state in `runtime`)
     through the runtime's view the execution has, not through its own
     root: to settle then.
- The order of the tasks: this one first, validated end to end, then
  task 2 on top, so `crud` needs no adapter and its tests are written
  once.

**Proposed** (ours, to keep or change while building; say what was done)

- Selections as arrays, in this task: `resolve` gives an array of
  positions and `goto` executes at each (it follows from the rule; the
  code gives one position and executes once today); only singletons and
  `*` can occur until predicates are built. A command executed at
  several positions runs in the one execution: one failure, nothing
  merged.
- The prefix's exact shape in the form (one array whose first chunk is
  the layer, or the layer beside it), and how a tool shows it to a sender
  outside, who stands at `main` and does not write the layer: ours to
  work out.
- A leading slash is refused in a request's URI.
- `./` is accepted wherever a URI is written and is not part of its
  canonical form (`./host` is `host`).
- A subject left out is the root: `haicc host help/get` is help on the
  mrepo itself.
- The `haicc` script: a first word that is one of its own commands
  (`sources`, `prereq`) is that command; `.`, a word starting with `./`,
  and anything else is a URI. The machine level stays: `haicc boot/deploy`,
  `haicc boot/teardown`, a protocol and action with no URI before them.

| Today | Relative |
|---|---|
| `haicc / boot/deploy host <package>` | `haicc . boot/deploy host <package>` |
| `haicc /host service/start` | `haicc host service/start` |
| `haicc /host haicc /node-1 service/start` | `haicc host haicc node-1 service/start` |
| `haicc / help/get /packages oneliner` | `haicc . help/get . packages oneliner` |
| `haicc /host help/get /` | `haicc host help/get` |
| a hook: `protocol/activate / help` | `protocol/activate . help` |

**The build** (ours; analysed 2026-11-14)

- **Piece A, requests relative: built** (`readme.md`, part 61). What it
  settled, for B and C to build on:
  - the URI functions are `mycelium-uri`'s (`relative`, `from`, `within`,
    `slashed`, `unslashed`, `ROOT`); `MAIN` is `mrepo-base-request`'s;
  - a request's form holds its URI from the mrepo's root (`main/host`);
    what an action says back names a position as written at `main`
    (`"deployed":"host"`, `remote.at`), and help's URIs from the root
    (`packages`);
  - a config's `uris` are written at `main` and matched against the part
    after it; `check` takes where a request was written (`at`);
  - `exec.run(command, { at })`; `goto` executes at `main` and at the
    root (`.`), nowhere deeper yet;
  - inside, every read and write is still slash-led (`exec.read`, the
    help index's keys, the topics, a package's own targets
    `/test/validate`): that is piece B and step 3 of the changeover.
- **Piece B, the interface accepts both: built** with `crud` (part 63):
  an execution's reads and writes take `runtime/service.json` as well as
  `/runtime/service.json`. Not done: `mycelium-uri`'s `validate` and the
  repository's own reads stay slash-led; modules change over as they are
  touched.
- **Piece C, in part built** (`readme.md`, part 62): inside, a URI is an
  array of segments, the prefix `main` and the URI as written for a
  request from outside; outside it is one segment; an action's answer is
  not wrapped. **Left of it**, to come with the `haicc` commands that
  need them (the human: "Multi segment will become clear with haicc
  commands"): `resolve` giving an array of positions and `goto`
  executing at each; a command executed at a deeper position (its prefix
  the position's segments); the jumps as segments and the prefix on what
  an answer returns.

**Where**

- `pear-full-square/mrepo-base-request/lib/command.js`: `interpret` adds
  the leading slash to a URI given without one.
- `pear-full-square/mrepo-base-request/index.js`: `check` (the URI
  canonical, matched against the action's `uris`), `matches`, `missing`
  (`target`: the URI is not `/`).
- The protocols' configs, their `uris` patterns (`/`, `/<name>`, `/**`):
  each module's `internal/config.js`, each package's `protocol.js`. Only
  requests from outside are matched against them.
- `pear-full-square/mrepo-base-haicc/external/goto/`,
  `pear-full-square/mrepo-base-xpath/internal/resolve/` (a URI resolved
  to a position in `main`), `pear-full-square/mrepo-base-boot` (the
  target's name from the URI), `mrepo-base-help` (`get`) and
  `mrepo-base-runtime/lib/protocol.js` (`run`): the two whose subject
  becomes an argument.
- `pear-full-square/haicc-base-app/internal/command/` (a first part
  starting with `/` is a command for the mrepos; `/` sent as it is,
  another URI as `haicc <uri> ...`), its tests, and the app's own test,
  `haiccing/base-app-haicc/test/command/`.
- The hooks' files in the components' `mrepo/runtime/hooks/`.
- The tests that type commands: `haiccing/base-linux-haicc/test/run.sh`
  (114 checks), `haiccing/base-component-boot/test/boot/`, the modules'
  tests; the READMEs that show commands.

## 2 · crud: The crud protocol

Built (`readme.md`, part 63), with the shortcuts moved into `main` and
the `xpath` layer removed. Left from it, each to come with what needs it:

- **XPath across linked mrepos** (the human, 2026-11-14: "we will do
  xpath for linked repos later"): reading through a link (a local read
  of a replica) beside the `haicc` jump; a selection that crosses a
  link; several sources and local data combined at one node (the rule
  when two hold the same name); a write then goes to the local side
  only. A demo first. **In discussion since** (2026-11-14): `xpath.md`
  here, the design: a query rewritten into a pipeline of `haicc`
  segments and merges.
- **Internal use on other layers**: the existing files there
  (`runtime/service.json`) are not nodes; they move to the node form
  when an internal use comes.
- **`update`**: with mutable and immutable (the roadmap's item 3).
- **The two repositories exist**: `pear-full-square/mrepo-base-crud`,
  `haiccing/base-package-crud`.

## 4 · request-train-repairs: The request train: two repairs

Built (`readme.md`, part 65): a removed branch takes its empty folders
with it; an execution's branches are squashed into their targets; the
ancestry check reads what two histories have apart. A request's cycle on
one thread stays near 20 ms however many are done (it was 42 ms rising
to 212 ms within 200). Left from it, each to come with what needs it:

- **The later request run again** (the human: "initial implementation"):
  a squash onto a target that moved merges, and a conflict throws, as a
  merge did. With one request at a time it does not occur; the rerun
  comes with requests executed in parallel (`xpath.md`, "Parallel
  execution: threads").
- **The objects a removed branch leaves**: a collection for the
  filesystem layers (`xpath.md`, "Commits", space).
- **`p2p-git`'s own two defects on refs** (the handover, "Elsewhere"),
  untouched: the adapter works around both.

## 5 · logging: Logging: the levels in use, the level a request's flag

Built (`readme.md`, part 66): the flags (`--flags`, space separated, a
flag alone or `key=value`, to the end of the command or `--`, held
through a chain until changed, one that is none ignored with a
warning); three levels, `log=info|verbose|debug`, an error and a warning
always; `info` made at the request, its metrics and its audit; an
action's steps measured for it (`exec.step`); errors caught at the
request, a catch in between using its error or saying what it expects,
a thrown one carrying its cause; a file that may not be there (`find`);
the retrofit through every module; the code quality check. Left from
it, each to come with what needs it:

- **The runtime's part after a request is completed** (its record
  merged, moved to done): not logged, the record is closed by then.
- **A log's size**: not bounded.
- **`error-on-empty`**, the second flag: "Future additions", below; the
  place for it is there (`FLAGS`, `mrepo-base-request`).
- **What the entries hold** is ours to change as we learn what we need
  (the human: "You decide output format, does not need to be fixed").

## 6 · xpath-first: XPath, the first implementation

Discussed with the human, 2026-11-14 and 15: `xpath.md` holds it as it
went, each answer in its words. This is what of it is to be built first.
"It is to get going and gain experience."

**Settled** (the human; `xpath.md` for each)

- **A module in mycelium**: the engine is `mycelium-xpath`, generic.
- **On git**: "So now we implement on git with a choice of git on
  corestore or git on filesystem": the trees and documents as
  `mycelium-git` gives them, on either storage, as today.
- **Parse, process and continue, all in one request**: enough parsed
  to have a segment, it processed, then the next.
- **A segment runs up to a filter or a shortcut**; from one local root
  to the next.
- **A node set is a pointer**, not its nodes read out: a reference a
  node.
- **A command's URI resolves to an array of references**, the local
  roots of the operation that follows; `crud/read` reads what is at
  each. The routing URI (`haicc <URI>`) is resolved before the command;
  a command's own URI is the command's, with the same module.
- **An attribute is a leaf key and value of a node's document**; the
  node's own name by the usual function.
- **A JSON document is a tree**: a path goes on inside it.
- **One read state**: the commit read at, for every part of the query.
- **Create walks the URI**, making what is not there, to its end.
- **The usage restriction**: a query goes on from one shortcut at a
  time; from several, or from shortcuts beside ordinary nodes, it says
  so and stops: a known issue, resolved with the union, the next step.
- **Measured from the request's record** (`--flags log=verbose`), to
  see whether a query should run as one request or several.

**Proposed** (ours, to confirm before building)

- **What of XPath goes in now**: phase 1 of the list in `xpath.md`,
  "Standard XPath, in phases" (the human: "yes standard XPath, but in
  phases. Maybe make a list and then mark what goes in now. When that
  is done, then you can go the implementation"): steps by name, `*` and
  `.`; filters on a leaf (equals, differs, compares, is there, by a
  path inside the document), joined with `and`, `or`, `not()`, several
  in a row; `name()`, `starts-with()`, `contains()`; strings and
  numbers. Standard only: no wildcard in a value.
- **The module's interface**: it is handed the tree (`children(node)`,
  as today), and, new, how a node's document is read and where a
  segment has to stop (a shortcut). It answers with the references,
  and, where it stopped, at which node and with what of the query left.
- **A node's document**: for a node in `main`, its `.node.json`; for a
  record in a layer, the file itself. Handed in by who calls.
- **A reference**: the node's path and its id in the repository (a
  tree's or a file's), at the state read.
- **The first users** (the human: "haicc and crud - both"): the routing
  URI, `haicc <query> <command>`: the command executed at each node
  the query selects, the current root moved there; and `crud`'s own
  URI: `read` and `delete` hand it to the module whole, `create` walks
  as it does.
- **All commands are maps over an array of nodes** (the human): a
  command is its operation mapped over the nodes its URI resolves to.
  The array is of nodes, not of answers: a response stays any data
  type, the action's own (the human: "what has response to do with URI
  always returning an array?"). Results as attachments of a request:
  the human's direction, not designed, not in this task.
- **In two parts**: first the engine in `mycelium-xpath` with its own
  tests, which nothing else depends on; then the repository, `crud`
  and `haicc` on it. **Part one is built** (part 67 of `readme.md`):
  `query(tree, root, text)`, phase 1 of the list, with what was decided
  while building, to confirm. **Part two is built** (part 68): a URI
  with a filter valid, the repository as a tree for a query, the mrepo's
  query in `mrepo-base-xpath`, `crud` and `haicc`'s `goto` on it, the
  `haicc` test with filters; what was decided, what was found open and
  what a query costs are in the part.
- **A URI with a filter is a valid URI**: `mycelium-uri` checks its
  names as it does, and a filter for its brackets and quotes only; what
  is in a filter is the module's to read.
- **At the command line** a query is quoted, its brackets and stars
  being the shell's too: `haicc . crud/read "users[name='s*']"`.
- **Tests**: the module's own, on plain objects and on a repository on
  each engine; `crud`'s; the `haicc` test with a filter; a demo first,
  kept as its how-to.

**Where**

- `pear-full-square/mycelium-xpath/lib/xpath.js` (`select`: a path and
  `*`; `objectChildren`); `mycelium-git/lib/repo.js` (the repository as
  a tree: `children`, `select`, `read`, `find`);
  `mrepo-base-xpath/internal/resolve/` (a shortcut: `shortcutsAt`);
  `mrepo-base-crud/internal/node/` (`place`, `select`, `nodeAt`);
  `mycelium-uri/lib/uri.js` (`validate`, `SEGMENT`);
  `mrepo-base-execute/index.js` (`exec.select`, the execution's view
  over its branch).

## 7 · inbox-watcher: The inbox watched, not looked at

**Built**: part 73 of `readme.md` (the folders watched, a pass at once
after one that moved something, a slow look as the net; the growing
folder left as the second matter it is).

Noted 2026-11-15, to discuss. The human, on how a file in the inbox
folder gets into git (the runtime looks every 200 ms, lists the whole
folder and the whole `inbox` layer, commits what is new): "wouldn't it
be better with a filewatcher?"

**Proposed** (ours, not answered)

- The inbox folder watched (`bare-fs`'s `watch`): a file dropped taken
  in at once; nothing listed while nothing happens. The same for a
  waiting request's answer in a child's outbox folder, and for the
  `haicc` app waiting for its response.
- One listing as the runtime starts, for what came while it was down;
  a slow look kept as a net, for an event missed.
- The folder that only grows is a second matter: what was taken in
  moved out of the folder, or folders by date (`xpath.md`: how many to
  a folder).
- Measured before and after: a request's time through a running mrepo,
  from its record.

**Where**

- `pear-full-square/mrepo-base-runtime/index.js` (the poller, `every`);
  `mrepo-base-request/lib/boxes.js` (`post`: the folder's new files
  committed); `mrepo-base-request/index.js` (`request`: a waiting
  principal's answer collected from the outbox folder);
  `haicc-base-app/internal/request/` (the app waiting for its answer).

## 8 · command-line-findings: The human's findings from the manual test: flags after the URI; a record packed on its lines; `haicc output`

The human tried `haicc` by hand on the laptop (`main` as of `c8200f7`)
and settled three findings with the local agent, 2026-11-15:
`local-note.md`, "the human's manual test", holds each with the human's
words. **Built**: part 70 of `readme.md`, with what was left to us.

**Settled** (the human, through the local agent)

- **Flags come after the URI** (part 66's reading was wrong): "The
  flags should be after host and -- is used to say: this is where the
  next command starts." `haicc host --flags log=debug -- crud/read .`:
  the flags after a URI are that step's; `--` marks where the next
  command starts, and is optional ("yes, -- optional"). A flag still
  persists down the chain until changed. Then, on our first build
  (part 70), which ended an unclosed list by guessing: "Strict
  implementation please: -- or end-of-command closes the flag section"
  (part 71).
- **A record printed with its attributes packed on a line**: an opened
  container's entries fill a line up to the width, separated by `, `;
  an entry is never split across lines; one that does not fit on a line
  of its own is opened below, as now (the sample in the note, confirmed
  by the human).
- **The width**: `auto` is the default, the terminal's width read each
  time a record is printed (80 when the output is not a terminal);
  `haicc output` says the width in force, `haicc output <number>` sets
  a fixed width, `haicc output auto` back to the default ("Keep haicc
  output (read and set number and auto) and auto as default"). It is
  saved, in haicc's own folder, `~/.haicc` ("if it can be set, then it
  needs to be saved"). `HAICC_WIDTH` is removed ("remove HAICC_WIDTH").

**Left to us**

- `output` becomes one of the command's own words: a position named so
  is reached as `./output` (the local agent's proposal).
- How the terminal's width is read (`bare-tty` is in the lockfile).
- Where a flag list after the URI of a command that is not passed on
  ends (to its end, as now).

**Where**

- `pear-full-square/mrepo-base-request/lib/flags.js` (`split`),
  `lib/command.js` (`interpret`: a list in front, a list after);
  `pear-full-square/haicc-base-app/internal/command/` (the flags in
  front, `forMrepos`), `internal/unpack/` (the record printed),
  `internal/usage.js`; `haiccing/base-linux-haicc/test/run.sh`, section
  9b (the flags' checks); `haiccing/package-docs-mrepo/mrepo/request/`
  ("Flags").

## 9 · request-layer-access: The request records reachable: the layer switched in the request

Found open in part 68: the outside reaches `main` only, so the request
records cannot be queried from the command line. The human, 2026-11-15:
"we will have to make the request log records reachable, probably the
easiest at this stage is to switch layer in the request. Maybe use a
flag for that? layer=request". **Built**: part 72 of `readme.md`.

**Proposed** (ours, to confirm)

- **`main` is the default layer** (2026-11-16, on our calling the
  prefix `main` a hard-coded rule: "layer=main is not hardcoded rule,
  but a default that can be changed by flag").
- **A flag, `layer=<name>`**: the command's own URI is read at that
  layer instead of `main`: `haicc . crud/read "done/*[value/uri='main/host']"
  --flags layer=request`. The routing URI (`haicc <URI>`) stays in
  `main`: positions and shortcuts are there. As any flag it holds
  through a chain, so the records of a linked mrepo are read the same
  way (`haicc host crud/read done/* --flags layer=request`).
- ~~Read only outside `main`~~: dropped. Our answer together,
  2026-11-15: "we don't need to 'close functionality doors' at this
  moment, but we will need to design an 'external request (allowed
  protocol & actions) API. I want it done properly, not with hard-coded
  rules." So the flag opens the layer to whatever the protocols offer
  there, and what the outside may ask becomes a design of its own:
  `external-request-api`, below.
- **A record is a file**: `crud/read` answers with a file's document
  there, `{ uri, value }` (today what is no node is left out).

**Where**

- `pear-full-square/mrepo-base-request/lib/flags.js` (`FLAGS`),
  `lib/command.js` (`formOf`: the prefix, `OUTSIDE`), `index.js`
  (`check`: the prefix `main`); `mrepo-base-crud/internal/node/`
  (`select`: what is no node left out); `mrepo-base-xpath/internal/query/`.

## P1 · `mrepo-registry`: mrepos as shortcuts, with a registry of the host-local mrepos

Next in our order of work, after the cleanup (done, parts 70 to 74).
Discussed 2026-11-16; **the first build is done** (part 75 of
`readme.md`): the four points of "Proposed first build" below. What it
left out is listed there, for the next design round.

**Said so far** (2026-11-16, on what is settled and what the registry
is)

- "what is settled is the structure within the repo: swarm/node and
  local/host plus other local mrepos. The local repos are created in
  the boot mrepo (like host) and sit at root. (duplicated in registry)"
- "This clears the way for the mrepo deployment with shortcut."
- "Note that the registry is only for 'host local' mrepos. (not those
  in containers)."
- "With the registry we don't need special cascading teardown, it can
  be done with xpath so that item can be dropped." (`teardown-cascade`
  is dropped: a teardown of several is a query over the registry.)
- "If you like you can do the container node creation as well."
  (`node-mrepos`, P2.)
- A question put to us: "Do we create a swarm protocol?"

**Said next** (2026-11-16, on our asking where the registry lives, and
on a swarm protocol)

- "swarm nodes have a local bridgehead mrepo and an mrepo in the
  container."
- "If you like a mrepo local registry - not of deploy but shortcuts -
  we may consider a layer for that information? The shortcut info can
  contain information that it was deployed or just linked etc. This
  linking / deploying is going to be very important so makes sense to
  keep good record of it."
- The swarm protocol: "When we create a swarm protocol it will 'sit on
  top' of other protocols like service. Sequence would be: deploy local
  bridgehead node as standard mrepo then initialise it as a swarm node
  (master or not), then replicate in container (default configuration
  is bridgehead is master and container is slave). What do you think?"

**Said after that** (2026-11-16, on `main` and the registry, and on
master and slave, which we had read as who writes)

- "for shortcuts main keeps in-situ shortcut info, with 'visible'
  state. Registry can 'reverse index', structure the repositories in a
  structure geared towards admin and xpath queries for instance, and
  contains full information (including internal management stuff)."
- "node bridgehead master-slave: who is boss, who manages and who
  follow. Master write config, slave follow it. Both get info from the
  swarm (flow into container then bridgehead) but the master acts on
  it. Plus the bridgehead master can take input from host. There will
  be a layered approach of who can do what, but we will build it up
  gradually."

**Then, on our asking whether only the boot mrepo creates local
mrepos** (2026-11-16): "for the host registry: currently haicc registry
is for the mrepos created by the haicc install on the host. Keep it
simple for the moment, our aim is to achieve simple swarm demos and
that is it. We just need enough functionality to achieve that and will
do a further design round with the next step: KISS."

**Proposed first build** (ours, to confirm: the least that clears the
way for the swarm demos)

- **Placed by its unique URI**: an mrepo deployed is placed side by
  side with the others under the work folder, `mrepos/<swarm>/<name>`
  (`mrepos/local/host`), not inside its parent's `main/` folder. The
  parent's `main/<name>/` holds the shortcut only (settled).
- **A `registry` layer** in the mrepo that deploys, an entry a mrepo it
  deployed, by unique URI: where it is on this machine, the package it
  came from, what runs it, the position that links to it. It replaces
  today's record in the runtime layer (`runtime/deployed/<name>.json`).
  Written by `boot/deploy`, `redeploy` and `teardown` only.
- **Where a shortcut leads** is read from the registry, not worked out
  from the folder structure.
- **A teardown of several** is a query over the registry, read with
  `layer=registry`.
- Not in it, for the next design round: who may deploy; a shortcut to
  an mrepo that was not deployed here (linked); the reverse index; the
  visible state in `main`; the `swarm` protocol and the containers.

**On the proposed first build** (2026-11-16; no go yet)

- "for fancy new functionality we need help and howto properly in
  place so it is easy to check what can be done where."
- On our not migrating an install that is there: "We do a deploy
  teardown philosophy and don't do upgrades on running installs, that
  will be a rule. An update will be a new install in passive mode
  (reading data from previous) with switchover." Written into
  `rules.md`, "Development and deployment".

**The go** (2026-11-16, on our asking whether the first build comes
now or after help and howto): "do help documentation, and required
howtos info but focus on the build. Once we have container nodes and we
can achieve the simple demos that we approach help and howto
systematically. Better not mix." So: the proposed first build, with its
documentation and the howto information it needs; help and howto as a
system after the container nodes and the demos.

**For the demos** (`swarm-demos`, P3): "Would be nice if we could have
splectral in those demos (like we had before)." Splectral: the view of
a swarm in a browser, with its observers of the p2p events; removed
from this repository when what nothing used was removed
(`readme.md`, part 21 or so: "the `splectral-*`", "`splectral/`"), kept
in the history and in its own repositories; reviewed in
`steps/1-review/findings.md`. To bring back when the work reaches the
demos.

**The first build mixed two registries up** (2026-11-16, on seeing
`haicc . crud/read "local/*" --flags layer=registry`): "You have mixed
up registries. There is the registry in boot: haicc registry/local
crud/read * And there is the mrepo runtime registry, but that is for
mrepo use, not external. I think in mrepo the layer should be links or
something like that. The repo wants an easy lookup of all linked mrepos
with full detail, not keyed on URI so it can use it for reverse lookups
(indexing). So mrepo internal it is a link registry, the boot contains
a mrepo registry."

And: "the deploy protocol needs to create and use the main shortcuts
info and the links layer."

So there are two, and part 75 built one thing for both:

- **The link registry**, inside every mrepo that links others: a layer,
  `links` or the like, for the mrepo's own use, not for the outside: all
  the mrepos it links, with full detail, not keyed on their URI.
- **The mrepo registry**, in the boot mrepo: the mrepos of the haicc
  install, reached as a position: `haicc registry/local crud/read *`.

Corrected: part 76 of `readme.md`. The key, on our asking: "you are
doing the implementation, and this is for internal use. So you tell me.
The link layer is all the link information organised for admin, main
contain the information for rendering." Ours: a key of its own a link,
named by its shortcut in `main`.

**Our reading so far, to confirm** (ours, put back in the discussion)

- The registry is a record of shortcuts, not of deployments: a layer,
  an entry a shortcut: where it leads on this machine, how it came
  about (deployed here, from which package; or linked to an mrepo that
  was there), what runs it. `main` keeps the link only, as today (it
  replicates; the layer is this machine's).
- A swarm node is one mrepo in two places: the bridgehead on the host
  (a standard mrepo, deployed as any, so in the registry) and its
  replica in a container (not in the registry).
- A `swarm` protocol on top of `boot` and `service`: a node is deployed
  (`boot/deploy`), made a swarm node (its swarm, its role), then
  replicated into a container.

**From before** (`local-note.md`, 2026-11-15, point 4): the parent's
`main/<name>/` holds the shortcut only, the mrepo is placed elsewhere;
proposed there, not answered: every mrepo side by side under `mrepos/`,
by its unique URI.

**What is there today, to start from**: a child is built inside its
parent's `main/` folder on disk (the shadow of `main`); in the parent's
`main` its node and its shortcut (`main/<name>/.node.json`,
`.shortcuts.json`: `{ mrepo: local/<name> }`); what is local to the
machine about it (its package, the packages placed, its layers, its
runtime's process) in the parent's runtime layer,
`runtime/deployed/<name>.json`: a registry of a kind already, one a
parent. `pear-full-square/mrepo-base-boot/internal/child.js`,
`mrepo-base-xpath/internal/shortcut/` (`shadowOf`, `linkOf`: where a
shortcut leads on disk).

## `continuation` (was `demo-scripts`): a command answers with a script to continue with; the terminal runs it

Raised 2026-11-16, once `mrepo-registry` was built ("now we can use
this to deploy host and a swarm with some (bare) nodes"). **Built**:
part 77 of `readme.md`, as settled at the end of what follows ("forget
nesting of continuations for now. We just do a simple script. terminal
executes. ceiling 100").

**Said**: "What we will need for the demos (that run on their own) is a
script of commands that gets executed on boot. So haicc . boot/deploy
host base-demo-haicc install the haicc component and then executes a
script (for further configuration or end-to-end deploy to teardown. The
demo repo could contain more than one demo, then we can use the flags:
haicc . boot/deploy base-demo-haicc --flags post-deploy=[script] These
scripts then can become part of howtos. What do you think?"

**Then, on our proposing that the deployed mrepo runs its script
itself**: "you can use a script from host by using the registry to
target the mrepo directly rather that through the parent. That
functionality will be added later, not now. Can you pace the requests
from the response seen in the terminal? Read the script from the bundle
and execute it in the terminal, I think that is better. So adding the
post-deploy flag returns the script in the response and the terminal
uses it to execute the script from there. What do you think?"

**And its name, and its reach** (on our terms for it): "then we should
not call it post deploy, it is more something like 'continuation'. And
it can be used in general. For instance any command may return with a
continuation, i.e. now continue executing this script. It is a bit like
an JIT pipeline."

So: the terminal runs the script, not the mrepo. The deploy answers
with the script, read from the package's bundle; the `haicc` command
then sends its commands one by one, each after the response of the one
before. Simpler than ours below (no runner in the runtime), and the
demo is seen as it runs. Our earlier view, kept for the record:

**Our view, put back** (ours, to settle together)

- Yes: a script is a howto that runs, so it cannot go stale, and it is
  the "demo first, kept as its how-to" we already work by.
- A script: a named list of commands, in the package (its `mrepo/`
  part), written from where the deployed mrepo stands, so it does not
  depend on where it is deployed.
- Run by the deployed mrepo itself, as its own requests, one after the
  other, each waited for, stopping at the first that fails: a command
  sent on to a linked mrepo has to be answered before the next starts,
  which a hook does not wait for today.
- The flag picks the script for that deploy; run again later by name.
- To settle: from whose place the commands are written; where a script
  lives and what names it; what says a demo is done and how it went.

## `swarm-cluster`: a working swarm cluster, written as scripts of the component

The work now (2026-11-16): "Let's add scripts to the component for what
we still want to achieve - working swarm cluster. Once that is finished
we can start with the other items on the list." It takes `node-mrepos`
(P2) and `swarm-demos` (P3) together: the script is the target and its
check.

**Built so far** (part 78): `base-component-haicc`'s
`scripts/cluster.json`: the host in service, a place for the swarm in
its `main`, two nodes deployed and in service.

**Said before, on a swarm node** (in the `mrepo-registry` discussion,
above): a swarm node has a local bridgehead mrepo and an mrepo in a
container; a `swarm` protocol on top of others like `service`: "deploy
local bridgehead node as standard mrepo then initialise it as a swarm
node (master or not), then replicate in container (default
configuration is bridgehead is master and container is slave)"; master
and slave: "who is boss, who manages and who follow. Master write
config, slave follow it. Both get info from the swarm (flow into
container then bridgehead) but the master acts on it. Plus the
bridgehead master can take input from host." Docker for the first
container node ("that is fine"). Splectral in the demos, if we can.

**To design together, each a line of the script once built**

- Where a swarm's node sits and what it is called: today one name below
  the host's `main`, `local/node-1`; a swarm's would be at
  `swarms/swarm-1/node-1`, `swarm-1/node-1`.
- A node made a swarm node: the `swarm` protocol's first action; what
  it writes (the swarm, the role).
- Its replica in a container: what runs there, how it is reached, what
  flows between the two.
- The nodes finding each other: what a working cluster does, and how
  the script checks it.

## `external-request-api`: what the outside may ask, designed, not hard-coded

Raised 2026-11-15, with `request-layer-access`: "we will need to design
an 'external request (allowed protocol & actions) API. I want it done
properly, not with hard-coded rules." To discuss; not placed in the
order of work yet.

**What is there today, to start from**: a request from outside is
checked in `mrepo-base-request` (`check`): its protocol loaded and
active, its action in the protocol's config, its URI one the action's
config names (`uris`), the service's state where the action names
states; and, hard-coded, the prefix `main`. The protocols' configs are
in the `protocols` layer, a file a protocol.

## Future additions

Not for this round. Noted so they are not lost; each is discussed again
before it is built.

### The flag error-on-empty

The human, 2026-11-13: of no importance at the moment.

**Settled** (the human)

- A flag `error-on-empty` for the XPath: with it, a selection that
  matches nothing fails the request. Without it an empty selection gives
  an empty array (task 1).
- It is needed for a subset of commands only. It can be added to a
  request by the user, or set for specific protocols (like `service`).
- It is a local matter: how a package is made, and what type of mrepo it
  is for. The configs must be well documented.

**Proposed** (not answered: the human set the whole flag aside)

- In the form: a property of the request, `errorOnEmpty: true`, applying
  to every selection evaluated for it.
- At the command line: an option before the URI, where `--raw` and
  `--output` go: `haicc --error-on-empty hots service/start`.
- In a config: the same property on a protocol, or on one of its actions.

### Predicates in a URI

`haicc test/mydata/users[name=s*] users/check-addresses *` (the human's
example, task 1). Not valid in our URIs today; `mycelium-xpath` knows
only `*`. Task 1 is built so that it does not block them. In discussion
since (2026-11-14), with the other XPath operations: `xpath.md` here.

### How-tos

Discussed 2026-11-14; to design properly later.

**Settled** (the human)

- The earlier demo packages (a swarm and its nodes deployed, the
  functionality shown) were in a sense how-tos.
- Our packages are self-contained and final (no major version upgrades),
  so a how-to stays relevant to the context it was written in.
- One package with many how-tos, or several packages: ours to decide, we
  are the user of them.

- **The name** (the human's proposal, after our decision below):
  `base-how-[category]-[collection]`: a how-to package is a collection,
  in a category. Our reading, put to the human: it names every how-to
  package, the ones to read too, so the split below becomes: a collection
  may hold how-tos to read and scenarios to run; examples:
  `base-how-package-making`, `base-how-package-testing`,
  `base-how-haicc-deploying`. Not confirmed.

- **Our list goes in one**, under implementation (the human): the
  how-tos about how we build (a new package, a protocol, a package's own
  test, a newer template, a release) are one collection in the category
  `implementation`.
- **More important: the how-tos around functionality** (the human): for
  the functionality that is being created, its specifics, the configs
  available, and simple demos of these features.
- **A way to develop functionality** (the human): prove it in a POC
  demo, then implement the real thing, and turn the POC into a how-to.

- **A package's deployed test can be the how-to** (the human, the last
  word so far): that makes sense, because how-tos live where they are
  generated. Then there are **no special how-to packages** (the name
  `base-how-[category]-[collection]` and the collections above are
  dropped): instead **an extraction, like help**, from which an up to
  date selection can be built.
- What follows for a deployed test (ours): it has to read as a how-to:
  its README says what the functionality is, the configs available and
  the steps; its steps are the commands as someone would type them. The
  help layer already extracts every test's README at its URI: the
  selection is a view over that; how a test is marked as a how-to is to
  design.

**Decided** (ours, told to the human; before the name was proposed, and
overtaken by the line above for the how-tos that are run)

- Not one collection. By what a how-to is:
  - **one that is read** (a procedure for making something) lives with
    what it is about: making packages in `package-docs-template`,
    operating an mrepo in `package-docs-mrepo`, a folder each, so it
    lands in the help layer and travels with the template a package is
    pinned to;
  - **one that is run** (a scenario deployed and shown, the demo kind) is
    a package of its own: its list, its tests and its report prove it
    works, and it is pinned to the packages it shows.
- Why: a how-to found from where the work already is; each stays true
  for its own context when something else moves on; a collection would
  mix contexts and be published again whole for any change.
- Kept honest: few, only for tasks that span several places; steps as
  commands, ending with the check that proves it worked.
- The first ones to read: a new package from the template; a protocol
  (its module, its methods, its package); a package's own test, the
  "nothing to test" decision included; a package brought to a newer
  template; a release (the pre-release, then strict).
