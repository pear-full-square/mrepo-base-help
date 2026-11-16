# Help, howto, haici: the platform's knowledge and its learning

In discussion with the human, started 2026-11-16 (`help-and-howtos`,
`context-help`, `rules-in-help`, `claude-headless` of `tasks.md`). A
design: little of it is built. It grows as the discussion goes; what is
built leaves this file and becomes a part in `readme.md`.

Read as a task in `tasks.md` is read: **Settled** is what the human said
or confirmed; **Proposed** is ours, put to the human and not yet
answered; **To settle** is open. The syntax in the examples is
illustration only.

The opening (the human): "I want to design the help protocol in full,
part is already implemented."

## What is built

- The `help` layer: every README of an mrepo's linked packages
  extracted at the URI it documents, with an index and the problems
  against the README rules; by a hook, at `boot` or at the service's
  `initialise` (`base-package-help`, `mrepo-base-help`).
- `help/get . [<subject>] [oneliner | summary | detail | <section>]`:
  a README, each link with its one-liner; the nearest help named when
  there is none. Offered at `.` only.
- `haicc --help`: the app's usage, written by hand.

Agreed earlier, not built: `haicc help/get` without a URI, the machine
level's help (`local-note.md`, 2026-11-15); the roadmap's item 8 (the
external API structured from `protocol.js` and `external/<action>/`,
URI dismantling, the help flag as a rewrite answered in the request's
context, nothing executed); a package's deployed test is its how-to,
extracted like help (`tasks.md`).

## Three protocols

**Settled** (the human)

- "There is static help, about the package static composition. Help
  also includes design docs etc. It is complete. Then there is the
  dynamic help: given a command describe and give context help. A third
  block are the how-to s and these are very important."
- **`howto` is a protocol of its own** (asked "Should how-to get is own
  protocol?"; our yes, with `howto/run` answering with a continuation
  script; the human: "Ok").
- "howto would use help to guide along the way."
- "how-to is the entry point to scope an activity on the platform. A
  full command is entry point for help. And both also give structured
  access to their knowledge. It is like: what do you want to do plus
  how-to options. Can be single word: boot or pipeline."
- **A third protocol, `haici`**: "we need a third protocol, more
  general, for learning and continuous improvement: haici - human ai
  continuous improvement."
- "haici goes much further than simple learning and improvement, but in
  a natural way. The request log is the one place that has all the
  information, so it must start from there: haici parses the request
  log into sections: metrics, warnings error, auditing, and also use of
  the protocols, what was requested from help, what users are looking
  for etc."
- "The three protocols: help howto and haici will be developed step by
  step, but the gap of missing functionality is filled by using
  headless claude."

**Proposed** (ours)

- One package each, one protocol each: `base-package-help`,
  `base-package-howto`, `base-package-haici`.
- **`help`**: static help as built (`help/get . <subject>`, the
  documentation tree), and dynamic help: a full command with `--help`
  (`haicc host boot/deploy node-1 base-component-haicc --help`) answered
  with the action's documentation and the check where it stands
  (active here, arguments right), nothing executed. From a command's
  help, the how-tos that use it.
- **`howto`**, `get` its default action:

  ```
  haicc howto                  # what can be done here: the activities
  haicc howto boot             # the boot how-tos here, a one-liner each
  haicc howto boot/node        # one how-to: its steps, the why, links to help
  haicc howto/run boot/node    # run it, guided
  haicc host howto swarm       # inside the host: only what is there
  ```

  A word that is not an activity names those that are.
- **A how-to's source**: one README, its activity in a line, the steps
  as typed commands each with a line of why, ending with the check that
  proves it worked; extracted into its own layer, `howto`, and into the
  script `howto/run` runs. Checked by rules, as a README is.
- **Activity words**: each how-to declares its own; a protocol's name is
  an activity by default (`boot`, `service`, `crud`); `pipeline`,
  `swarm` exist once a how-to declares them. No fixed list.
- **A guided run**: each step's dynamic help, then the step (a
  continuation script: a step's `--help`, then the step); stopped at the
  first check that fails, saying why in the help's words; guided by
  default, `--flags guide=off` for a plain run; resumed from the step it
  stopped at.
- **`haici`**: from the request log (the records and their logs, part
  66): its sections, metrics, warnings and errors, audit, the use of the
  protocols, what was asked of help, what users look for (a help or a
  how-to that was not found, a command that does not exist: the misses
  are the signal). A note by hand from a person or an agent, in the same
  form. Findings over a scope (a how-to, a package, an activity, a
  period): what was seen, its evidence (request ids), the change
  proposed, its target, a status; raised and accepted by a human or an
  AI alike. A guided run's steps read together by a run id on each
  request: the first use of the headers, to plan.
- **`haici` proposes; the change goes through the development process**
  (author, checks, pre-release): it never edits a package. Its findings
  the input to `dev-on-haicc`. Not answered; the human: haici "goes much
  further".

## Headless Claude

**Settled** (the human)

- "calculate in that we are going to use headless Claude."
- "Headless Claude as generator as well, not only user."
- "And generating dynamic howto feedback."
- It fills the gap of what is not built yet (above).

**Proposed** (ours)

- **As a user**: one entry point, `haicc howto`; every answer gives its
  next steps as commands it can type; the levels save its tokens;
  `--help` its dry run; an error names what is there and a next command;
  its scope is what is active where it stands (with
  `--allowedTools "Bash(haicc:*)"`).
- **As a generator**: a package's static help from its code, tests and
  the design records (the rules and decisions moved out of `steps/`
  into the READMEs where they are implemented: `rules-in-help`); a
  how-to from a POC demo or a deployed test. What it writes passes the
  same mechanical rules; it is committed, and the generation recorded
  (its prompt, its inputs) so it can be run again.
- **Its acceptance**: a generated how-to counts once a second headless
  Claude, given only `haicc howto` and the activity, finds it and does
  it. The packages' own test, run on the laptop.
- **Filling the gap**: what a protocol does not do yet, headless Claude
  does, until it is built; the request log shows where it did, and so
  what to build next.

**To settle**

- One structured form for every help and howto answer, a record (JSON)
  the agent reads as it is and the terminal shows to a person.
- How headless Claude fills a gap: from outside, driving `haicc` and
  reading the request log (`layer=request`), or started by the mrepo
  (`vision.md`, "Agents": the two ways).
