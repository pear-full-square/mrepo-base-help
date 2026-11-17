# base-docs-hdlc

The haicc delivery lifecycle: how work is done, from a request to running software.

The aim is full AI autonomy, from a need to running software that
satisfies it: KISS, consistent rules and self-containment make it
possible. Work arrives as a request, from a person or from `haici`, is
scheduled, built, validated, released and reported back. An agent does
what it can on its own; structure and design are decided with a person.
The rules here are proposals to be tested: when practice shows one is
wrong, it is raised.

## Links

- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Autonomy

- **Autonomy first.** Collaboration only where it is required: meaning,
  missing or inaccessible information, an exception that halts the
  work. Collaboration is discussion: discuss first, write what has
  settled.
- **Structure and design are decided with a person**, not alone; what is
  left to the agent is its to decide and to say.
- **Natural language**, short; one question at a time, with an opinion
  and a recommendation.
- **What is settled is recorded in the words used**, with its reason.

## Collaboration

- **A team, on equal terms**: what is settled is ours, not one side's:
  "we", "our terms", "our order of work". Bring an opinion and a
  recommendation, not only questions; a decision is made together, in
  discussion. Who said what is recorded, in the words used.
- **Finish the discussion before building**: a reading of what was said
  is put back in its own words and confirmed before any of it is built.
  Building on an unconfirmed reading, even a mostly right one, costs
  changes after.
- **Point by point, briefly**: one question at a time, short; no walls of
  text. Short answers are read literally: the reading said back in a few
  lines with one example, only what is still open asked.
- **Check before asking**: the code, the documentation, the repositories.
- **Long stretches of planning, then a batch built**: what settles is
  stacked as scheduled work and built when the person says so, then
  worked through to the end without stopping at each step.
- **Say what is being done** when a step takes long; report after each
  step of a build, plainly, with what passed and what did not.
- **Record what settled**, as the work's record, and keep the entry
  points current: a context reset loses everything else.
- **A new repository asked for**: its description alone, in a block to
  copy; its owner and name in a line. Created with a licence, so its
  `main` has a first commit.
- **Few pushes**: one commit and one push per part, then the product
  repositories.
- **A failed test: whose mistake**: most often a test still in the old
  form; a race shows one run in a few, so a test that touches the
  request layers is run several times.

## Single concern

- **Every part has one concern**: a module, a repository, a process, a
  step. A part that grows a second concern is split by concern.
- **One concern, one place**: implemented once, in a module of its own,
  used by the modules that need it, never copied by hand.
- **Shared in development, copied into packages**: a package carries a
  copy of every module it needs, is tested and sealed, and runs on its
  own copies. Packages share nothing at run time; a package is replaced
  as a whole.
- **Validation at the boundary**: input is validated once, where it
  enters, by the one validator for its kind; inside, the happy path. A
  failure stops the work and says why.
- **Knowledge stays with its concern**: a part knows only what its
  concern needs.

## Documentation

- **It follows the implementation**: it says what was built, nothing
  more. What is not built is the vision's, or scheduled work.
- **A fact lives once, beside what it documents**: a README in every
  folder, reached from the one above. The generic lives in the
  documentation packages; a package or a module documents only what is
  its own. A decision and its reason: the record of the work.
- **The rules are checked**, not remembered: the README rules, the code
  rules and a package's structure run as tests.

## Validation

Before every commit:

- **A package that changed: its pre-release**: rebuilt, its `full` set
  run from its bundle when its content changed, the report written into
  `test-reports/` and committed with it. A module that changed: the
  pre-release of every package that carries it.
- **Everything**: every package rebuilt, refused unless every package's
  report is current.
- **The checks**: the READMEs, the code, every package against the
  package structure: no problems.
- **The runtime or the repository code changed**: the boot's test
  several times; a race shows one run in a few. Nothing left running.
- **Anything the command touches changed**: the `haicc` command end to
  end. Containers made by the tests need a Docker daemon; none is left
  after.
- **A package tests what it provides**, in a test of its own; where
  nothing is specific to it, a dummy that says so. A test that runs
  nothing by accident fails.
- **No commit while a build runs** over the tree: it catches files
  mid-rewrite.
- **Partial while changes are made**: not every build every time. A
  batch of changes, then one rebuild and what the changes touch: the
  changed packages' pre-releases, the checks; documentation alone, the
  checks and the docs view. Everything before a milestone.
- **The implementation validation**: every pattern a package implements
  (its kind, a layer, hooks, a service, a continuation script) has a
  how-to naming it; one without fails the code check.

## Branches

- **`main` holds settled state**; it changes only by plain merges from
  `execute/main`, the execution branch, never by direct commits.
- **Plain merges**, no squash, no rebase: history reaches `main` as it
  happened. No force-push on any branch; a branch is deleted only after a
  plain merge.
- **A push refused is merged**, never forced: another session may have
  pushed.
- **Commit messages**: the first line the state change; the body the
  request it answers and why, briefly.

## Products

- **Each package and module has a repository of its own**, at the path
  it has in development, `<org>/<repo>`. Once validated, each one that
  changed is updated from development: a module's history split and
  plain-merged into its repository; a package's folder written over its
  repository's `main`. When the human asks, or at a milestone agreed
  with them: not after every change.
- **New repositories are created by a person.**
- **Deploy and teardown, no upgrade in place**: what changes how things
  are placed or stored comes with a new deploy after a teardown; an
  update is a new install, reading the data of the one before it, then a
  switchover.

## Work

- **Scheduled work**: requests, from a person or from `haici`, planned
  into phases and items; an agent takes up an item it may do alone.
- **Tasks have labels**, meaningful, named whenever a task is.
- **A new pattern, a how-to**: a pattern not done before gets a how-to:
  a proof of concept first, saved as a how-to, then the implementation.
  The how-to lives in the package the pattern belongs to and names it,
  `Pattern: <name>`.
- **A reading is put back in its own words** and confirmed before it is
  built.
- **Each part of the work is recorded**: what was built, what was
  decided while building and why, what was found, how it was validated.

## Tooling

Today's tooling, in the development repository's `tools/`, until the
HDLC is a protocol of its own:

- `install.sh`: the dependencies, replayed from the lockfile.
- `release.js`: every package assembled and bundled into the sources,
  Bare's tarball, the `haicc` installer; `--strict` refuses a stale
  report.
- `package-test.js <package>`: a package's pre-release.
- `package-template.sh <package>`: a package brought to the template,
  its generic tests copied, its pin recorded.
- `products.sh <module>`, `packages.sh -m <what> <package>`: the
  product repositories updated.
- `info-extract.js`, `code-check.js`: the checks; `info-view.js`: the docs
  view, the docs mrepo of a transient install (every package the sources
  offer) in one page, browsed by keywords.
- `docker.sh`: a Docker daemon made sure to answer.
