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
- **A finding is rooted where it belongs**: in the package that owns
  what it is about (the help layer's URI names the package a README
  comes from; a protocol's config names its package), not where it was
  seen; one seen through `base-component-haicc` may be the service
  protocol's, and reach the packages that use it.
- **`haici` proposes; the change goes through the development process**
  (author, checks, pre-release): it never edits a package. Its findings
  the input to `dev-on-haicc`. Not answered; the human: haici "goes much
  further".

**Settled** (the human, on `haici`)

- "The information in the request log is rich, and we start simple
  learning from it. Slowly we build up sophistication. It will
  definitely identify additions and improvements to help and to howto
  so an install will generate ci information that then needs to be
  applied to the resp. packages. And an improvement in e.g. the haicc
  component package is e.g. for the service protocol so information
  needs to be rooted where it belongs and affects other packages as
  well." (ci: continuous improvement.)

## Headless Claude

**Settled** (the human)

- "calculate in that we are going to use headless Claude."
- "Headless Claude as generator as well, not only user."
- "And generating dynamic howto feedback."
- It fills the gap of what is not built yet (above).
- "Our setup is recursive and fractal. Headless claude is launched from
  the platform and sends commands to the platform."
- "As the protocols take shape, actions identified but not all
  implemented we use hc (headless claude) to fill in the missing
  implementations (as a 'functions call') where required. We continue
  to provide code implementations. Higher level reports and assessments
  will always remain with hc." (hc: headless Claude.)
- "Now you will be the biggest consumer of the platform, so generate the
  most usage data, and that should help us to improve the platform
  experience - I wonder, we need feedback commands to gather 'in the
  field experiences' as they happen. Maybe as a flag so it can be
  attached to the command it refers to."
- **The feedback flag's rule**: "it has to be the last flag on the last
  command part. All text following the flag is the feedback text."
  (`haicc host crud/read swarms --flags log=verbose feedback the answer
  does not say which layer it read`: the text as it is, `--` and `=`
  included; the shell's own quoting still applies.)
- **The feedback flag is a rewrite** (the human, correcting our reading
  of it as a value in the record): "it should trigger a feedback
  processing command. Note that feedback can be supplied on anything
  that exists as command. By suffixing feedback whatever it is attached
  to is not executed but feedback submission is (like help flag trigger
  help protocol)."
- **The help flag written the same way**, `--flags help` at the end of
  the last part, a rewrite into the `help` protocol (asked: one kind of
  flag with `feedback`): "yes if you are happy with having one flexible
  flag setup. But we need to design a proper flag handling unit, or at
  least review if the existing implementation is scalable."

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
- **An action implemented by hc**: an action documented (its
  `external/<action>/` README: signature, arguments, returns, errors)
  and not coded is marked so in its `protocol.js`; the runtime runs hc
  with that README as its contract and the request as its input, and
  its answer is the action's answer. The commands hc sends on the way
  are ordinary requests to the platform. A code implementation replaces
  it, the README unchanged; reports and assessments stay hc's.
- **Feedback on a command**: the `feedback` flag (its rule above)
  rewrites the command into `haici`'s feedback command, run where the
  command would have run (its last part), its input the original
  command and the text; the command itself is not run. Feedback after
  the fact: the command typed again with the flag; `haici` finds its
  earlier run in the request log.

  ```
  haicc host crud/read swarms --flags feedback the answer does not say which layer it read
      runs haici/feedback: the command crud/read swarms at host, the text; crud/read not run
  ```

**To settle**

- One structured form for every help and howto answer, a record (JSON)
  the agent reads as it is and the terminal shows to a person.
- How a finding travels from an install back to where its package is
  developed.

## Flags

**The review** (ours, 2026-11-16, of `mrepo-base-request/lib/flags.js`
and its users): right for its three flags (`log`, `layer`,
`continuation`), not for what comes. One central enumeration (a new
flag changes a module every package carries; `continuation` is boot's);
one kind only (a modifier: nothing for a rewrite); no flag takes the
rest of the line (`--` in a feedback text would close the list); every
flag carried down a chain (right for `log`, not for `layer` or a
rewrite); flags not documented, so help cannot list them.

**Proposed** (ours): a flag unit that parses and resolves only.

- A flag declared by the package that owns it, in its `protocol.js`
  beside its actions: its values, its kind, its scope (`log`, `layer`:
  the request's own package). The runtime collects them from the linked
  packages as it collects protocols: the flags there are depend on where
  one stands.
- Kinds: a modifier (how a request is handled: `log`, `layer`, `guide`);
  an option, given to one action (`continuation`); a rewrite, the
  command turned into another protocol's, nothing executed (`help` into
  `help`, `feedback` into `haici`), before the command is checked at the
  door, so help can say why a command is not allowed.
- Scopes: the chain (`log`), the step (`layer`, `continuation`), the
  last part (a rewrite).
- A tail flag takes the rest of the line as its value, and is last
  (`feedback`).
- Each flag documented as an action is, a README in its module: help
  lists the flags there are here.
