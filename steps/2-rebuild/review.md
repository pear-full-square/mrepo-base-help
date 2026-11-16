# The package review: findings

`package-review` of `tasks.md`, started 2026-11-16. The approach (the
human): "we start the review and review the extract data structure.
Then based on the extract structure we devise the (static) get for help
and howto." So: first what the extracts hold today, then the packages
against the review's three criteria. Nothing is changed by this pass.
What settles from it is written into `tasks.md`; what is built becomes a
part in `readme.md`.

The criteria (the human, `tasks.md`, "Priorities"): the full install
tests, each package's custom test; rules and design decisions living in
the help and howto where they are implemented; proper howtos.

## The extracts, as they are

Measured on a host deployed from `base-component-haicc`, in service
(2026-11-16, after part 82).

### The help layer

`help/extract` writes every README of the mrepo's linked packages at the
place the README has in its bundle, with `index.json` and
`problems.json`.

```
/help/README.md                                   the mrepo itself
/help/<layer>/README.md                           a layer (package-docs-mrepo)
/help/packages/<org>/<package>/README.md          a package
/help/packages/<org>/<package>/<folder>/...       its folders (mrepo, test, howto, ...)
/help/packages/<org>/<package>/modules/pear-full-square/<module>/...
                                                  the modules it carries, each whole
/help/index.json     { "<uri>": { title, oneliner, links } }
```

- **640 entries** in the index, each a README; 0 problems.
- **Keyed by where a README sits in a package**, nothing else. There is
  no key by protocol and none by action.
- **To find `boot/deploy` one has to know three things the index does
  not hold**: which package brings the protocol `boot` (in the
  protocol's config, `package`: in the runtime's memory for every
  loaded protocol, in the `protocols` layer only for the active ones);
  which module implements it (nowhere: the package's `protocol.js`
  imports it); and that an action is a folder `external/<action>/` of
  that module (a convention). The path is then
  `packages/haiccing/base-package-boot/modules/pear-full-square/mrepo-base-boot/external/deploy`.
- **A module's pages are there once for every package that carries the
  module**: 464 of the 640 entries are module pages, 103 of them
  distinct. `mrepo-base-help`'s are there twelve times: every package
  carries it for its tests. An action's README has no one place.
- **241 entries are tests' pages** (a package's `test/`, a module's
  `test/` and `validate/`, the reports): more than a third.
- **An action is described twice, in two places that do not know each
  other**: its config's `description` (one line, in the module's code,
  the `protocols` layer when active) and its README (`external/<action>/`:
  the one-liner, its signature, arguments, returns, errors).
- **An index entry holds a title, a one-liner and its links.** Sections
  are read from the README when asked (`help/get . <subject> <section>`).

What a protocol's config holds, for comparison (`protocols/boot.json`,
there while `boot` is active):

```
{ "package": "haiccing/base-package-boot",
  "description": "Deploys and tears down child mrepos; executed by the parent.",
  "actions": { "deploy": { "uris": ["<name>", "swarms/<swarm>/<name>"], "target": true,
                           "args": ["package"], "description": "A child mrepo built ..." }, ... } }
```

### The howto layer

`howto/extract` (part 82) writes the how-tos of the linked packages
(`howto/<name>/README.md`):

```
/howto/index.json                { "<activity>": [{ howto, oneliner, package }] }
/howto/<activity>/<name>.json    { howto, title, oneliner, activity, package, help, steps: [{ why, command }] }
/howto/problems.json
```

- **2 how-tos** in a host (`node/deploy`, `container/replica`), 1 in
  the boot mrepo (`host/deploy`); 0 problems.
- **Keyed by a free word** each how-to declares (`Activity: node`). Not
  by protocol, not by action (the human, on seeing it: "To start with
  we would retrieve protocol or protocol action specific info").
- **A how-to's steps are in its document**; its README is in the help
  layer too.

### What the structure says for a static `get`

Ours, to devise together (nothing decided):

- `get boot` and `get boot/deploy` need **an index by protocol and
  action**, made at extraction: for each protocol its package, its
  module, its description, its actions; for each action its
  description, its arguments, where it is offered, and its README's
  place. Everything it needs is in each package's bundle: its
  `/protocol` entry (the config) and its module's `external/`.
- **A module's pages once**, not once a package that carries it: the
  index would be a sixth of its size, and an action's README would have
  one place.
- **The how-tos in the same index**: a how-to filed under the protocol
  or the action it is about is then found from the action, and the
  action from the how-to.
- **Tests' pages**: in the help, or beside it.

## The packages

Sixteen, against the three criteria. "Install test": a test of the
package's own that deploys it in a real, running mrepo.

| package | its protocol, actions | its own test | an install test | how-tos | how-to text in its README |
|---|---|---|---|---|---|
| `package-docs-template` | none | `name`, a placeholder | no | 0 | "From the template", "Running" |
| `package-docs-mrepo` | none | `none`, a dummy | no | 0 | "Usage" in each layer's page |
| `base-package-runtime` | `runtime`, 1 | `start`: a runtime started over an mrepo written for it | in part: not deployed by a boot | 0 | "Usage" |
| `base-package-protocol` | `protocol`, 2 | `mounted`: no mrepo | no | 0 | "Hooks" |
| `base-package-help` | `help`, 2 | `mounted`: no mrepo | no | 0 | "Commands" |
| `base-package-howto` | `howto`, 2 | `mounted`: no mrepo | no | 0 | "Commands", "Writing one" |
| `base-package-service` | `service`, 4 | `mounted`: no mrepo | no | 0 | "States" |
| `base-package-boot` | `boot`, 3 | `mounted`: no mrepo | no | 0 | "Commands", "How to" |
| `base-package-crud` | `crud`, 3 | `mounted`: no mrepo | no | 0 | "Commands" |
| `base-package-haicc` | `haicc`, 1 | `mounted`: no mrepo | no | 0 | "Commands" |
| `base-package-container` | `container`, 5 | `mounted`: no mrepo; its module's test makes a real container | no | 0 | "Commands", "How to" |
| `base-package-splectral` | `splectral`, 3 | `mounted`: its server as a real process, no mrepo | no | 0 | "How to", "Commands" |
| `base-component-boot` | none | `boot`: the boot end to end, between running mrepos | yes | 1 | "Steps" |
| `base-component-haicc` | none | `configured`: no mrepo | no | 2 | "Deploying" |
| `base-app-haicc` | none (an app) | `command`: the app as a process, a boot mrepo's inbox standing in | in part | 0 | "Commands" |
| `base-linux-haicc` | none (sh) | `test/run.sh`: the whole install end to end, 261 checks | yes, for all the others | 0 | "Install", "Commands" |

**Install tests**

- Two of sixteen deploy for real: `base-component-boot` and
  `base-linux-haicc`. The second is where every protocol is proven in a
  running mrepo today: one test for all, in another package.
- Eleven have a test that needs no mrepo (`mounted`, `configured`):
  the protocol as loaded, its config value by value, each action on a
  minimal execution. Each one's README says what is "Not here".
- This is the debt `tasks.md` holds as "Deployed tests" (a package's
  deployed test is its how-to; after swarm nodes run): the nodes run.

**How-tos**

- Three how-tos, all in the two components; no protocol's package has
  one for its own actions.
- Three packages have a "How to" section in their README, written
  before the form existed (`base-package-boot`, `-container`,
  `-splectral`), and nine a "Commands" block of examples: how-to text
  that is not extracted as how-tos.

**Rules and design decisions in the help**

- The modules that state rules or design in their README:
  `mrepo-base-container`, `-crud`, `-howto`, `splectral-server`,
  `pkgm-base-check` ("Rules"); `mrepo-base-boot`, `-execute`, `-help`,
  `-request`, `-runtime`, `mycelium-uri` ("Design"). The others state
  none under such a title (`mrepo-base-haicc`, `-protocol`, `-service`,
  `-xpath`, `mycelium-git`, `mycelium-xpath`).
- The decisions made while building are in the step's record, 83 parts
  of `readme.md`, each with what was decided and why, and in `tasks.md`
  in the words used. Which of them is stated where it is implemented
  has to be gone through part by part, per package: not done in this
  pass.
- A decision found on the way, in code only: a layer's name has to be
  in two fixed lists (`mycelium-git`'s `LAYERS` and `SOLO`,
  `mrepo-base-execute`'s `TARGETS`), so a package cannot bring a layer
  of its own without both modules changing (part 82).

## Devising `get`: said so far (2026-11-16)

- On whether the design documentation is in the help, and whether the
  modules are set up to extract a protocol generically (ours: the
  generic rules are, through the two documentation packages; `rules.md`,
  `vision.md` and the decisions in `steps/` are not; a protocol's config
  and its actions' READMEs are uniform, but nothing names the module
  that implements a protocol), the human: "overall rules and vision is
  part of the hdlc - the haicc delivery lifecycle stuff. Here it
  concerns protocol - overall aim, protocol actions, config options
  etc. Let's work backward: what is the structure you want to run get
  from?"
- So the review's second criterion is narrower than we read it: what
  the help holds here is the protocol: its aim, its actions, its config
  options. The repository's rules, the vision and the record of
  decisions belong to the HDLC, not to an mrepo's help.
- Ours, put back (not answered): one document a protocol, made at
  extraction, `get` for `help` and for `howto` two views of it:

  ```
  { protocol, package, module,
    aim,                 one line: the config's description
    about,               the module README's summary
    sections: { Rules, Design, Config, ... }      the module README's sections
    default,             its default action
    actions: { <action>: {
        aim,             its README's one-liner
        about,           its README's summary
        uris, args, target, states                 from the config: where it is offered, what it takes
        sections: { Signature, Arguments, Returns, Errors, Design }
        howtos: [...]    the how-tos filed under <protocol>/<action> } },
    howtos: [...]        the how-tos filed under <protocol> }
  ```

  Each field has one source there already: the protocol's config (in
  the runtime's memory for every loaded protocol), the module's README,
  each action's README (`external/<action>/`), the packages' how-tos.
  Missing: the module's name in the config.

- On that structure, the human: "with each get we could also include a
  list of cascading keyword, drilling from the top down. The howto's
  are keywords to those sections? Shouldn't we create a normal natural
  language page for the gets? And we shouldn't forget other folders,
  like test. In a way the help protocol could be name info protocol,
  specially on the static side."
- Our reading, put back (not answered): not a document of fields but
  **pages in natural language, addressed by cascading keywords, from
  the top down**; every `get` answers a page and the keywords below it,
  each with its one-liner:

  ```
  (nothing)            the protocols here
  boot                 the protocol's page: its aim, its rules, its config options
  boot/deploy          an action's page
  boot/deploy/errors   a section of it
  boot/howto/host      a how-to filed under it
  boot/test            its tests; boot/test/mounted one of them
  boot/internal        what its actions share
  boot/mrepo           the structure it brings
  ```

  The pages are the READMEs there are (a module's, an action's, a
  test's, a how-to's): what changes is the address (by protocol, not by
  where a README sits in a package; a module's pages once) and that a
  section and a how-to are keywords too. A how-to is a keyword under
  the protocol or the action it is filed at, and each of its steps
  names an action: a keyword back into those pages. Static: one
  protocol, `info` (`extract`, `get`); `help` keeps what depends on the
  context (`annotate`); `howto` keeps `explore` and `plan`.

- The reading confirmed, and more (the human): "yes, and if we need an
  agent to generate a page the we do that on first request and cache
  it. So you can weigh the pros and cons of code or agent generated
  pieces. Do you think we need a data transform of the extract
  information in order to get the static structure?"
- Ours, put back (not answered): a transform of the addresses, not of
  the content, and inside `extract`, not a stage of its own. The pages
  stay as extracted, each once, at the place of its source (a package,
  a module); beside them one map, keyword path to page, with each
  keyword's one-liner and the keywords below it, made from the
  protocols' configs and the bundles' files. `get` resolves a keyword
  through the map and answers the page and its keywords; a section is
  read from the page when asked. Why not a transformed copy: a page
  keeps its source, so a finding can be rooted in the package it
  belongs to; nothing is written twice. Code or agent: code for the map
  and for every keyword that has a page of its own (the same answer
  every time, tested, at no cost); an agent only for a keyword that has
  none (the top page over all protocols, a protocol's page where its
  package and its module each say a part, config options gathered from
  several places), generated on first request, cached under the same
  keyword with what it was made from, so it is made again when a source
  changes, and marked as generated.

- On building `info` so (the map in `extract`, `get` by keyword, code
  only; replacing `help/get`, `help/extract`, `howto/get`), the human:
  "repos created but wait with implementation. for the missing page -
  this is part of haici - continuous improvement. Is the internal
  structure of the package ok? No changes needed?" The two repositories
  exist: `pear-full-square/mrepo-base-info`, `haiccing/base-package-info`.
  **Not to build yet.**
- So a keyword without a page is not `info`'s to generate: `get` says
  what there is and that the page is missing, and the miss is `haici`'s
  to pick up (a page proposed for the package it belongs to).
- Ours, on the package's internal structure, put back (not answered):
  the folders are right as they are (an action a folder
  `external/<action>/`, a README in every folder, `test/`, `howto/`,
  `mrepo/`, `scripts/`): no restructuring. Three things are not uniform
  and would be made so, package by package, in the review:
  1. **A protocol's config does not name its module**: one field.
  2. **The config is written in two places**: in the module for seven
     protocols (`internal/config.js`, and a "Config" section in the
     module's README), in the package's `protocol.js` for three (`boot`,
     `help`, `runtime`), which have no "Config" section. So "config
     options" has a fixed place for seven of ten.
  3. **A protocol is described by two READMEs**, its package's and its
     module's, with no rule on what goes where: four pairs both hold
     "Commands" (`crud`, `container`, `howto`, `splectral`). One of the
     two has to be the protocol's page.
  And one thing to place: what has no protocol (the modules the runtime
  runs on: request, execute, xpath, git, uri; the components, the
  documentation packages, the app) has no keyword under a protocol.
  Ours: a second keyword at the top, `packages`, the tree as it is
  today with a module's pages once.

- On the three things and which README is the protocol's page (ours:
  the module's), the human: "ok, there is the external facing info
  which we have only dealt with upto now. The config in two places, are
  these diffrent configs or should they both be in structure (I would
  say yes)? There is a module for the protocol action code, that is
  where I think the actions should be documented. The package does the
  top level. There will be additional code, like the xpath encapsulated
  module, the URI and XPath specs, there are also the request and
  execute modules. We could have those all within the runtime or split
  them out. What do you think?"
- **Settled by it**: the package does the top level: a protocol's page
  is its package's README; the actions are documented in the module
  that holds their code (`external/<action>/`, as they are). So `boot`
  is the package's page, `boot/deploy` the module's.
- Ours, put back (not answered):
  - The config in two places is one config, the protocol's (its
    actions, where each is offered, what it takes), written in the
    module by seven and in the package by three: to be one place. A
    different config there is too: what a package lays into an mrepo's
    runtime layer (`mrepo/runtime/`: its hooks, its service state).
    Both belong in the structure `get` runs from: `boot/config`, and
    the hooks and state under the package's `mrepo` keyword.
  - The other code: by what it is. **The engine within the runtime**:
    request, execute, and the module that puts XPath to work in an
    mrepo (`mrepo-base-xpath`: shortcuts, links, the mrepo's query):
    they are what the runtime does, no one asks for them by name:
    `runtime/request`, `runtime/execute`, `runtime/xpath`. **The specs
    split out**: how a URI is written and what a query is
    (`mycelium-uri`, `mycelium-xpath`): everyone who types a command
    needs them, whatever the protocol: keywords of their own at the
    top, `uri` and `xpath`, each once, named from every action that
    takes a URI. No package is split for it: the runtime's package
    carries them all as today; only where they are found changes.
