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

- On the configs and the other code, the human: "I want the config in
  the package not the module. Module is code. I was talking about the
  code modules for the integrated internal code - request execute xpath
  - for base we'll leave them all in runtime. Although XPath on its own
  could carry quite a bit of info and help and howto. Request will
  become more evolved, and there is quite a bit on execute as well"
- **Settled by it**:
  - **A protocol's config is in its package, not in its module**: a
    module is code. Seven modules hold one today (`internal/config.js`:
    `crud`, `container`, `haicc`, `howto`, `protocol`, `service`,
    `splectral`), with a "Config" section in their README and a test of
    it: each moves to its package (`protocol.js`, its README, its own
    test), as `boot`, `help` and `runtime` have it.
  - **The integrated internal code stays in the runtime, for base**:
    request, execute, xpath (and with them the URI and XPath specs: not
    split out, against what we put). Each may grow into more of its
    own: XPath "could carry quite a bit of info and help and howto",
    request "will become more evolved", "there is quite a bit on
    execute as well".
- Ours, following from it: within the runtime each keeps a keyword of
  its own (`runtime/request`, `runtime/execute`, `runtime/xpath`,
  `runtime/uri`), so one that grows is lifted out without what is below
  it changing.

## Where the design stands (2026-11-16; nothing of it built, to wait)

Settled, each above in the words used:

- **`info`**: the static side, a protocol of its own (`extract`,
  `get`); `help` keeps what depends on the context (`annotate`),
  `howto` keeps `explore` and `plan`. `info/get` replaces `help/get`,
  `help/extract` and `howto/get`.
- **Pages in natural language, addressed by cascading keywords from the
  top down**, no dot: `haicc host info/get boot/deploy`. Every `get`
  answers a page and the keywords below it, each with its one-liner.
  Static: the same wherever in the mrepo the command stands.
- **To start with, by protocol and protocol action.** A protocol's page
  is its package's README (the package does the top level); an action's
  is its module's (`external/<action>/`). The other folders are
  keywords too (`test`, `internal`, `mrepo`, `scripts`).
- **A how-to is a keyword** under the protocol or the action it is
  about; its steps name actions, keywords back into the pages.
- **A protocol's config is in its package.**
- **The engine's code within the runtime**, for base.
- **A missing page is `haici`'s**: `get` says it is missing; no page is
  made up by `info`. An agent's page, where one is wanted, is generated
  on first request and cached.
- **The pages are the READMEs as they are**; `extract` adds a map from
  keyword to page (ours, not objected to).
- **Rules and vision are the HDLC's**, not an mrepo's help.

- **The top page** (`info/get` with nothing asked) **is the top page of
  the package** that defines the mrepo (the human, on our proposal: "the
  top page of the package."): in a host `base-component-haicc`'s README,
  then its keywords, the protocols here. A component needs no keyword of
  its own: it is the top. (Ours, not answered: the two documentation
  packages as keywords beside the protocols, `mrepo` and `package`.)

Open, to settle one at a time:

- Whether a how-to is filed by what it declares, wherever it lives
  (ours), or only by the package of its protocol.
- How a page is shown at the terminal and handed to an agent.
- `help/annotate`'s and `howto`'s default: "what can be done here".

## The structure of `info`, settled (2026-11-16, a new session)

The three open points above have "nothing to do with the info protocol
nor the review" (the human): left for later. The question put: the
review first, or `info` first. Ours: `info` first, small, then the
review through it.

- **Generic, for additional sources** (the human): "set up info
  generically so it finds additional sources (e.g. examples next to
  test). For the review we focus mainly on the completeness of the
  documentation and build on the keywords."
- **The keywords are made by the links, not by the folders.** Ours was
  folders as keywords with three rewrites in `info`; the human: "The
  other way is that the cascading links creates the hierarchical
  structure with keywords and sections so 'system folders' can be
  jumped over if needed." So `info` knows no package, module or
  `external/`: it follows the links tables. "that allows us to put
  other category structures in if we require them (e.g. to structure
  howto at package level rather than post extract)."; "that allows us
  to do this in phases. Because we can set / amend the categorisations
  in the template and then cascade the changes down the packages."
- What follows from it (ours, agreed with it):
  1. Only a README's links table makes keywords; a link in a section's
     prose is a reference.
  2. The keyword is the link's text in URI form (today the folder,
     `[deploy/](deploy/)`: nothing changes by default); where a jump
     makes a long name, the author names it.
  3. A `##` section is a keyword below its page.
  4. A page reached by two paths: two addresses, one page.
  5. The check: every README reached from the top, every link resolves,
     two keywords never one name at one place. A jumped folder keeps its
     README and is reached by some path.
  6. A category is a page: a README whose table groups what is below
     it (how-tos by category in the package's `howto/`). The activity
     index `howto/extract` makes today goes.
- **Every structure is decided in the packages**: the review writes it.
- **Examples**: the human: "don't you need a cascading link example for
  the implementation of info/extract?" Yes: the template shows each
  rule.

### The template

- The human: "This template should be cloned for implementation of
  packages. That means it should have all those structures in there,
  and examples for continuation. (Info also covers package
  generation)." Asked what we want to start from (ours: in practice the
  nearest working package, renamed by hand): "so it should be identify
  the best clone candidate. That should be described in the template
  docs then."
- So a new package is a clone of the best candidate among the packages
  there are; the template documents how to choose it and the steps, as
  a how-to. Ours, to put when the template is written: the same kind
  (protocol, component, documentation, app), the same parts, then the
  most recently pinned with a current report; the clone brought to the
  current template first (`tools/package-template.sh`), then renamed.
- Where it is included today: deployed in the five packages that
  define an mrepo (`base-component-boot`, `base-component-haicc`,
  `base-package-runtime`, `-service`, `-splectral`); pinned by thirteen
  packages, at five commits.
- **Renamed `package-docs-package`** (the human: "The docs mrepo is
  about the mrepo, should docs template not be called docs package
  then?"; "I'll rename template to package").
- **Documentation packages independent of an implementation** (the
  human): "With this patter we pull in general purpose information
  through docs repos - that allows us to include vision, rules and
  other stuff and keep the implementation packages simpler. This points
  to implementation independent docs packages." So the HDLC's rules and
  vision have a place: a documentation package in an mrepo's list
  (ours: `package-docs-hdlc`, when its content is settled).
- **Each package governs its own section** (the human): "each
  implementation package has a top level readme, the entry point. Then
  there is the generic structure of all the included packages with
  their own top level readme, now sitting at a lower level in the new
  implementation package. These can set the keywords and
  categorisation for their own section." A parent links to a child's
  top only.
- **An included package's keyword is its name without the prefix**
  (ours; the human: "yes, keyword from the name without prefix"):
  `base-package-boot` `boot`, `package-docs-mrepo` `mrepo`,
  `package-docs-package` `package`. The top package needs none.

### Modules and third-party code

- The human: "how do we deal with modules? They have their own internal
  documentation but are heavily duplicated across the packages that are
  included." Then: "so we create a modules structure at top level. This
  is an extraction job. However each protocol package keeps it own
  module category and lists only those of the package pointing to top
  level repo. Yes?" Yes.
- So: a module's pages once an mrepo, by its name (464 module pages in
  a host today, 103 distinct); its README governs its section; a
  package's link into its own copy resolves to that page; a top keyword
  `modules`, every module once, **a flat list by full name** (ours,
  "yes": the families by prefix as headings on its page, not
  keywords); a package's `modules` lists only what it carries. Copies
  that differ: the page from the package that offers its actions, else
  the first in deploy order; the difference a problem.
- **Third-party code** (the human: "And do we do something similar for
  the node_modules and addons stuff?"; ours, "yes"): one generated page,
  `third-party`, from the packages' `third-party.json`: each module once,
  its version, licence, which of ours use it, its addon and platform,
  where from. Their READMEs are not extracted.

### The structure

```
(top)                the mrepo's own package: its README, its links table
  <package>          each included package, its name without the prefix
    <its keywords>   its README's links table: jumps, link text, categories
    <section>        a README's ## section
    modules          the modules it carries, each pointing to the top
  modules            every module once, flat, by full name (generated)
    <module>         its README governs its section
  third-party        one generated page
```

Generated pages are code's, from data, marked so. `info/get`: a page
and the keywords below it, each with its one-liner. Anything that does
not fit is a problem, never resolved silently; a missing page `haici`'s.

On our three small points (the human):

1. A package keyword the same as a reserved one: "I don't think there is
   a clash, but the top level package name would be the same as one of
   the level 1. Only becomes a clash when package itself is included
   elsewhere. Wouldn't worry, unlikely and minor."
2. The tools outside an mrepo: "the tools scripts we have will be
   integrated into the package structure soon when we implement HDLC,
   the haicc delivery lifecycle".
3. Linked mrepos: "documentation is per mrepo, independenly, currently
   only concerned with what is within, not the linking".

### The phases (ours, written up on the human's word)

1. `package-docs-package`: the template renamed (the human renames the
   repository; here the pins, the lists, the tools, the records).
2. The template's rules: "READMEs" for `info` (the links table, the
   link text the keyword, jumps, categories), its example showing each
   rule, "a new package": the clone candidate and its how-to.
3. `info`: `extract` (the keyword map, the modules once, the
   third-party page, the check), `get`, the `info` layer (named in
   `mycelium-git` and `mrepo-base-execute`); `help/get`, `help/extract`,
   `howto/get` removed. `base-package-info` written the new way.
4. The review, package by package: the documentation complete, in the
   keyword structure; the config moved into the package.

### The menu and the included packages (2026-11-17)

- **The links a menu, a label each** (the human): "is duplication of the
  one-liner necessary, I would say avoid it. Shouldn't a link + label be
  enough in the table? You could treat the links nearly as navigation
  structure / menu." A one-liner lives once, in its own README.
- **The included packages on the README** (the human): "the included
  packages are known and I think these should be on the readme, if not as
  link then as enumeration." Ours: links, checked against the list in
  deploy order. "yes to both, go ahead with the template rules".
- **Siblings, named** (the human): "The package readme list the
  linked-in packages with a relative URI (i,.e sibling). On extraction
  they get changed to child links. What about calling the first set of
  links the package links and the included packages dependencies (or
  Included Packages)?"
- **Keywords later** (the human): "Don't worry about keywords too much,
  currently we set up the folder structure (and the keywords that come
  from it) before we go into detail on categorisation."
- Built (part 84): the template's rules, `## Links` (the menu, every
  README with a folder below) and `## Included packages` (a package that
  defines an mrepo, `../<package>/`); "A new package", the clone
  candidate and its steps; the template's own READMEs as menus.
- The menu's name: "happy with your links naming" (the human): `## Links`.
- **A new package, a how-to in time** (the human): "actually, the new
  package should eventually be driven by howto". It is a section of the
  template now, its steps the development repository's tools; when the
  HDLC brings those into packages as protocol actions, it becomes the
  template's how-to.
- **`info` tested on `package-docs-package`** (the human: "will you test
  the info protocol on the package docs package?"). Ours: three levels:
  `mrepo-base-info`'s own test on the template's tree (the keywords
  expected; the problems as fixtures of its own); the generic `help`
  test of every package an `info` test; the `haicc` test on a host, its
  component with `## Included packages`.

### The documentation packages (2026-11-17)

- The human: "what other docs package should we create. I am happy to
  have all documentation covered by such packages."
- **The HDLC** (the human): "hdlc - yes, that will become the 'build
  pipeline', very important. One caveat, may that on not end up as a
  package - a protocol? Do we document it now and transfer it to a
  package when it is built?" Ours: documented now, what does not depend
  on an implementation (the lifecycle, its rules, autonomy, the vision)
  stays in the documentation package; the tools' part, a section marked
  as today's tooling, moves into the protocol's package when it is built
  (its actions documented in its module; "A new package" its how-to).
- **No protocol documentation package**: the human, "doesn't protocol
  overlap with mrepo?", then "and in fact that is a part of package.";
  "why not package only, compile time and run time?" So **one**
  documentation package for the package, compile time (the template as
  it is) and run time (`package-docs-mrepo` merged in: each layer one
  page, what a package lays in and what it holds running). Of a
  protocol: what a package writes (`protocol.js`, the config) and how a
  running mrepo treats it (loading, the gate, activation, hooks,
  states), each in its place there. The table of protocols in
  `/protocols`, out of date, goes.
- **On pinning, corrected** (the human): "I think you overdo it with
  pinning. We don't pin by commit but by the package contents. Each
  package should run its test without dependencies. What you state as
  pinned is the commit they were created from I suspect." Yes: a
  package's report certifies its contents by hash; `template.commit`
  records only where its copies came from; a template change changes no
  package.
- **A family's specification** (the human): "for self containment
  reasons: the package specification should go with each 'family' of
  packages. We are currently building in base. All packages in base
  follow the base package docs. When we switch to another family, there
  may be breaking changes." So the template becomes
  **`base-docs-package`** ("so it should be base-docs-package, yes"),
  and the documentation packages carry the family: `base-docs-hdlc`,
  `base-docs-xpath`, `base-docs-haicc`. A new family brings its own.
- **URI within XPath** (the human): "I would put URI within the XPath
  docs package." Then, on where XPath's code belongs: "it will be used
  everywhere because of its internal use, but haicc is the one that
  does the hops (externally) We have a similar thing with URI. As far as
  use is concerned, part of XPath, as far as meaning is concerned an
  independent unit." So: **`base-docs-xpath`** documents the URI as a
  unit of its own within it, and the query; XPath within one mrepo is
  internal, used everywhere (the runtime's); across mrepos, the hops,
  it is `haicc`'s (phase 2 of `xpath.md` built in `mrepo-base-haicc`).
- **The list**: `base-docs-package` (renamed, `package-docs-mrepo` merged
  in), `base-docs-hdlc`, `base-docs-xpath` (the URI within it),
  `base-docs-haicc` (the overview and our terms). The repositories by
  the human.
- **The URI its own documentation package after all** (the human: "ok,
  agreed. And that means we keep docs URI as well"): `base-docs-uri`, an
  independent unit by meaning (how a URI is written, data names);
  `base-docs-xpath` links to it where a query is a URI. The list:
  `base-docs-package`, `base-docs-hdlc`, `base-docs-uri`,
  `base-docs-xpath`, `base-docs-haicc`.
- **haicc by meaning** (the human: "ok, haicc info in different places
  depending on meaning and docs haicc is the platform, linux haicc and
  app haicc commandline, and then the protocol package haicc"):
  `base-docs-haicc` the platform (what it is, its levels, our terms);
  the command line, as typed and as built, in `base-linux-haicc` and
  `base-app-haicc`; the hops, `haicc/goto`, in `base-package-haicc`.
- **A roadmap, for self-containment** (the human): "It completes the
  whole package, and haiccing as an org is self-contained."; "don't
  forget that haicci will generate future work requests, and then there
  is planning and such. Our aim is that AI autonomous mode may do items
  of the HDLC on its own."; "Then I favour splitting in three: vision,
  scheduled work, the delivery lifecycle (how work is done)". So:
  `base-docs-vision` (directions, not settled), scheduled work (data:
  requests from `haici` and people, plans, items and their states; in
  `tasks.md` until the HDLC protocol gives it an mrepo of its own; ours,
  not answered), `base-docs-hdlc` (how work is done).
- **Offload the development repository** (the human): "I propose to
  offload as much as we can from this dev-env repo into those docs
  containers." The repositories to create: `base-docs-package` (the
  rename), `base-docs-hdlc`, `base-docs-vision`, `base-docs-uri`,
  `base-docs-xpath`, `base-docs-haicc`.
- **Where an AI expects the static documentation** (the human, on our
  answer of files in the development repository: "you get it wrong
  here. You will be working on haic, slowly all the repositiories will
  be within the platform. For the linux host there is a commandline
  entry point to an install. The install consists of local mrepos, of
  swarms and nodes. You can request info from any of the mrepos in the
  structure. However, your access is through the linux commandline. In
  that sense it is not relevant to include the docs packages in all
  mrepos because they are about static data, but we can if you prefer
  to have it at hand everywhere.") Ours: once, at the root.
- **A docs mrepo** (the human): "what about creating a docs mrepo in the
  boot mrepo? Boot itself only has the boot and crud protocols really,
  it is minimal."; "command would be haicc docs info/get ...". So
  `base-component-docs`: the runtime, the protocol protocol, `info`, the
  documentation packages, the component last; no service, `info`
  activated and extracted at `boot`; deployed in the boot mrepo at
  `docs`; read with `haicc docs info/get <keywords>`. The documentation
  packages leave every other list; an mrepo's own `info` is about what
  is deployed in it. Deployed by the install (ours, not answered).
- **Deployed by the boot install** (the human): "it is part of the boot
  install, I think host will be as well. We don't do it you
  'automatically' because we lack the functionality." So for now a
  command, as the host's: `haicc . boot/deploy docs base-component-docs`;
  the boot install doing both when it can.

## The review, a package at a time (2026-11-17)

The human: "Have a look at the boot package, what is still missing? I
think we should make a list of missing tests and examples - both
transient installs - that should be added (later)."

### base-package-boot

Sound: three actions, each its page in the module (Signature, Arguments
where it takes any, Returns, Errors, Design); the config in
`protocol.js`; `mounted`, the config value by value and every refusal.

**Documentation, now** (ours, put to the human):

1. The menu has no jump to the actions: `info/get boot/deploy` is not
   there, only `boot/modules/mrepo-base-boot/external/deploy`.
2. No "Config" section: where each action is offered (`<name>`,
   `swarms/<swarm>/<name>`, for teardown `registry/<swarm>/<name>`), a
   target needed, `package` required for `deploy`, optional for
   `redeploy`.
3. "Commands" and "How to" become how-tos: a child deployed; a swarm's
   node deployed; the registry read and several torn down.
4. `teardown`'s page: its URI forms, one child or a registry query.
5. A claim to settle: the README says a node an mrepo deployed is torn
   down before that mrepo; the action orders nothing so (only the
   machine's `haicc boot/teardown` stops every runtime): the claim
   wrong, or the behaviour missing (`teardown-cascade`, `tasks.md`).

**Done** (2026-11-17): the menu jumps to the three actions
(`boot/deploy`, `boot/teardown`, `boot/redeploy`); "Config" in the
README, a table of where each action is offered and what it takes, the
positions' coupling to the components named; "Commands" and "How to"
became three how-tos, `howto/child`, `howto/swarm-node`,
`howto/registry`; `teardown`'s page names its three URI forms. The
cascade claim (5) removed: today a child's children are not torn down
with it; the cascade is the boot component's override (`review-code`).

**Tests and examples, later: each a transient install** (`install-tests`,
`tasks.md`):

- Tests of its own (today in other packages' tests only): deploy for
  real (the runtime answering, the shortcut, the `links` record, the
  registry's node); teardown (all of it gone); redeploy (from the
  package it was deployed from, and another); a swarm's node
  (`<swarm>/<name>`); teardown by a registry query; teardown of a child
  with a child inside, as A5 settles.
- Examples (`example/`): a host and a node, deployed, read through
  both, torn down; a swarm of two nodes; the registry listed, queried,
  torn down by a query.

- **The human, on boot's config**: "where each action is offered:
  <name>, swarms/<swarm>/<name>, and for teardown also
  registry/<swarm>/<name>; --> isn't this component stuff. The package
  here is the protocol (only) no?" Yes: the config names positions
  other packages' structures bring (`swarms/`, the haicc component's;
  `registry/`, the boot component's), and derives a node's unique URI
  from the path. Ours, put to the human: the protocol offered anywhere
  below `main` (`**`, a target needed, as `crud`); a position's meaning
  from the structure's documents (a swarm a node whose document says
  so; the unique URI from the nearest swarm node above, else `local`);
  `teardown` a query, whatever it selects torn down, the registry's
  layout not the action's. A design change: decided before code.
- **Settled** (the human): "yes, structure documents give positions their
  meaning. Meaning is set by components or solution. We are going to
  create the solution package later, stuff that should go there can be
  parked. In this case the structure goes into the boot component. And
  the component needs to supply the 'management logic' that comes with
  the (simple) deploy and teardown. Now, shouldn't that be an override
  of the boot protocol actions? How do you see that working?"
- Ours, put to the human: an extension, not an override (two
  implementations of one protocol, which runs depending on the list's
  order; a component carrying code). The protocol does the simple thing,
  offered anywhere below `main`, the unique URI from the nearest swarm
  node's document, else `local`. **Action hooks**, beside the
  transition hooks: `mrepo/runtime/hooks/boot.deploy/`,
  `boot.teardown/`, run after the action as the mrepo's own, a hook
  naming values of the action it follows (`registry/{uri}`): the one new
  mechanism. Logic that needs code a protocol of its own (`registry`:
  record, remove, list), listed by the boot component, called by its
  hooks. The boot component: the registry's structure, its hooks (after
  deploy recorded, after teardown removed, before teardown what the
  child deployed torn down: the cascade). Parked for the solution:
  `swarms/`, the cluster, the mrepos of an install.
- The human: "what about actions that need to run before the command
  (teardown)". Ours, put to the human: two points an action,
  `<protocol>.<action>.before/` and `.after/`, run in the same request's
  execution, in name order. A before hook prepares or refuses: one that
  fails fails the request, the action not run (a guard too). An after
  hook records: one that fails fails the request, the action's effects
  outside the repository staying: bookkeeping that cannot fail goes
  after, what can fail before. The cascade a before hook
  (`boot.teardown.before`: what the child deployed torn down first), each
  teardown running its own before hooks, as deep as the tree; which
  mrepos the child deployed the `registry` protocol's to answer.
  Parameters: the action's form before, its output too after.
- The human: "yes, but that would be as good as replacing the original
  action with some override, don't you think so?" Ours: functionally
  yes; hooks scatter the flow (before, the action, after) and their
  order between packages is a question of its own. So, put to the human:
  **an override as a script**: the component redefines an action,
  `mrepo/runtime/actions/<protocol>.<action>.json`, a list of commands
  as a continuation script is; inside it the protocol's action is the
  original, outside (a request, a hook) the override; one request, one
  execution, one record, a failing command stopping it there; parameters
  from the request and the steps before; one override an action an
  mrepo, by the package that defines it, as runtime config is. In place
  of the before and after hooks.
- The human: "the override would be a script. It would mean that the
  component replace protocol action mapping with a script". Our reading,
  put back: the runtime maps each protocol action to its implementation
  (today the package's `protocol.js`); the package defining an mrepo may
  replace an entry with a script, `mrepo/runtime/actions/<protocol>.<action>.json`,
  laid into the runtime layer as hooks are; only the implementation
  changes, the interface (where offered, what it takes, the gate) stays
  the protocol's; inside the script the action is the original; one
  mapping an mrepo. To settle while building: the parameters
  (`{target}`, `{package}`, a step's output), the script's answer (the
  original action's output). Built as its own part: the mapping
  overridable in the runtime, a `registry` protocol (the registry's
  logic out of `mrepo-base-boot`), the boot component's scripts
  (`teardown` with the cascade, `deploy`), boot offered anywhere below
  `main`, the unique URI from the structure's documents; a proof of
  concept and its how-to first.
- The human: "However, there must be a way to call the base
  implementation. what about protocol/boot/deploy?" Ours: yes, explicit,
  in place of a rule by context: `boot/teardown` the action as the mrepo
  maps it, overridden or not; `protocol/boot/teardown` the protocol's
  own implementation, always. The cascade needs both: `boot/teardown
  {each}` through the override, `protocol/boot/teardown {target}` the
  base. Internal by a rule already there: the protocol protocol is never
  activated for the outside, so an override is not bypassed from
  outside. The runtime: a command of three parts, `protocol/<protocol>/<action>`,
  sent to the package's function directly, the action's own gate and
  arguments. To confirm.
- **Settled** (the human): "yes, record it as settled, but we don't need
  internal/external constraint at the moment. Let commandline open to
  target the protocol version as well." So: a component replaces a
  protocol action's mapping with a script
  (`mrepo/runtime/actions/<protocol>.<action>.json`); `boot/teardown` the
  action as mapped, `protocol/boot/teardown` the protocol's own
  implementation, open to the command line too, no constraint. A code
  change, after the review (`review-code`, `tasks.md`).
- **Replaced** (the human, thinking the override through): "I don't
  think we should implement it for base. It would be nice that we can
  run base on one boot component and we need to three versions of them
  (host, node and container node). I propose we use script and implement
  script actions of the form script/deploy-node." Ours, put back: a
  `script` protocol, its actions the scripts the mrepo's packages bring.
  The human: "we have a component and a script library within that we
  can then use to do custom versions of functionality. boot/deploy what
  probably a bad idea, better is service/initialise that would run
  differently for each type for instance. We try it out when we do the
  solution install stuff."; "all command run as haicc (the external
  commands) but we need some more discussion on this."; "scripts will be
  able to replace protocols, my take would be that base operations are
  protocols and custom versions are expressed as scripts (in the base
  family)." **Settled**: no override for base; base operations
  protocols, custom versions scripts in a component's script library;
  tried with the solution install (`base-solution-haicc`, `tasks.md`).
  Open: how scripts run.
- **How scripts run, settled** (the human): "can we create the scripts
  as shell scripts?"; ours: yes, outside a request (a script inside one
  calling its own mrepo would wait on itself). The human: "if we submit
  all request to inbox for base then we can use a single gateway for
  launching commands. ... I saw an internal script with another
  implementation and I don't think it is helpful to have two
  languages." Ours: three ways of launching today (the command line,
  boot hooks placed by the runtime, service hooks run inside the
  transition's request) and the continuation's command lists run by the
  terminal; one gateway, one language, put back with its consequences.
  The human: "let's lift the restrictions for base. We'll solve the
  different routes later, can be done with internal inbox and such, but
  KISS and leave it for now. In base haicc and sh will be present (linux
  pc and container). If we do mobile we do browser stuff. continuations
  and hook are put in request response and handled by terminal to submit
  automatically. Although we have lifted access restrictions, we can
  still tag requests and internally or externally triggered." Recorded
  in `tasks.md`, `base-solution-haicc`. Ours: a runtime restarting by itself
  has no terminal for its boot hooks. The human: "can't the runtime issue
  a console command?" Ours: yes, `sh <hook>`, not waited for, `haicc`
  and `sh` being everywhere in base; hooks the runtime's always,
  continuations the terminal's. The human: "hooks run by the runtime".

### base-package-crud

Sound: three actions, each its page in the module (Signature, Arguments
where it takes any, Returns, Errors, Design for `delete`); the config in
`protocol.js`, no `update`; `mounted`, the config value by value, each
action and each refusal, nothing written by a refused one.

**Documentation, done** (2026-11-17): the menu jumps to `create`,
`read`, `delete`; "Config" a table (where offered, the target, the
arguments; no `update`); "Commands" two how-tos, `howto/structure`
(nodes created, read, removed, repeated) and `howto/query` (every child,
a filter, a value inside a document, another layer's records, a
selection removed).

**Tests and examples, later** (`install-tests`): the protocol in a
running mrepo, through the inbox (today the `haicc` command's end to end
test only, as `mounted` says); a selection removed by a filter
(`crud/delete "swarms/*[size<2]"`, read's path, not tested itself);
examples: a swarm's structure built, queried, removed.

**Across the modules, for later** (ours, put to the human): every
module's README says `npm test`, and its `package.json` runs
`bare ../../node_modules/brittle/cmd.js`, a path of this development
repository: in the module's own repository neither holds. Bare only, and
self-contained: the module's test command its own. **Done** (the human: "can't we make
the changes now?"): every module's `test` is `brittle-bare
test/*.test.js`, `brittle` and `bare-runtime` its dev dependencies (the
versions the root pins), its `package-lock.json` entry the same; its
README names that command. **Corrected** (2026-11-17): `bare-runtime` out of the
modules' dev dependencies, `brittle` kept: the assembly carries a
module's dependencies into each package (`modules/node_modules`), so
every package carried Bare's 93 MB binary, pushed with the milestone to
the product repositories. `brittle-bare` uses the Bare installed, a
prerequisite.

### base-package-info, -protocol, -service, -haicc

Sound in all four: each action its page in its module (Signature,
Returns, Errors; Arguments where it takes any; Design where there is a
choice made); the config in `protocol.js`; `mounted` tests.

**Documentation, done** (2026-11-17, no rebuild between packages, the
human: "do a number of repos"): the menus jump to the actions
(`protocol`, `service`, `haicc`; `info` had them); "Config" a table in
each (`service`'s states merged into it: from, to, what its hooks do);
"Commands" become how-tos: `info` `howto/read` (the docs mrepo and an
mrepo's own, by keywords, a choice, extracted again), `service`
`howto/lifecycle` (initialise, start, behind the door, stop, shutdown),
`haicc` `howto/hop` (once, chained, at a position inside, below a
shortcut refused). `protocol` has no how-to of its own: activating is
the hooks' (`base-docs-package`, `howto/hooks`).

**Settled design, to build** (`tasks.md`, `base-solution-haicc`):
`protocol`'s "Hooks" (a JSON command a file) and "the protocol protocol
not a request from outside" change with the scripts (hooks shell, run
by the runtime) and the restrictions lifted for base.

**Tests and examples, later** (`install-tests`): each protocol in a
running mrepo through the inbox (today the `haicc` command's end to end
test); `goto` at a query's positions (several nodes selected); `service`
in each state refusing the others; examples: a host's lifecycle, a
chain of hops.

### base-package-runtime, -container, -splectral

Sound in all three: each action its page in its module; the config in
`protocol.js`; their own tests.

**Documentation, done** (2026-11-17): the menus jump to the actions;
"Config" a table in each (`container`'s and `splectral`'s "Commands"
folded into it); how-tos: `runtime` `howto/test-in-situ` (a set's dry
run, the in-situ set, one module's tests, in a running mrepo),
`container` `howto/node` (its "How to": a swarm's node given its
container, reached, removed before its teardown), `splectral`
`howto/watch` (its "How to": the install's commands seen in a browser).

**Settled design, to build** (`base-solution-haicc`): `splectral`'s
script `start` and the haicc component's `cluster` are JSON command
lists answered as continuations: shell scripts with the scripts'
building.

**Tests and examples, later** (`install-tests`): `runtime/run` from the
command line (today in `base-component-boot`'s boot test, by its
inbox); `container` without Docker (`no Docker`, each action) and
`status` `gone`; `splectral` on a taken port, started again; examples:
a node in its container, Splectral watching a cluster deployed.

### base-component-haicc, base-component-docs

Sound: each its list and its hooks, checked value by value and walked
by its own test, `configured`, against the packages listed.

**Documentation, done** (2026-11-17):

- `base-component-haicc`'s how-tos addressed the boot mrepo (`haicc .
  crud/create swarms/swarm-1`, `haicc swarms/swarm-1/node-1 ...`) while
  saying "in this host", and named keywords of before (`container/replica`,
  `node/deploy`): rewritten at the host (`haicc host ...`, `haicc host
  haicc swarms/swarm-1/node-1 ...`), the replica removed before its node
  in `replica`; a third how-to, `cluster`: the host and a swarm of two
  nodes in containers by the script `cluster`, read, taken down.
- `base-component-docs`'s `mrepo/` page: `documents: sources`, every
  other package documented.

**Settled design, to build**: `cluster` and `start` shell scripts with
the scripts' building; `swarms/` parked for the solution.

**Code, later** (`review-code`): `documents: sources` reads the folder
sources only (`available`, `mrepo-base-boot`): an install from
`github:<org>` gets a docs mrepo documenting its list alone. The
github source's manifest read as well.

**Tests and examples, later** (`install-tests`): the cluster taken down
(each replica removed, the nodes, the host); the docs mrepo from a
github source; examples: a host with one node step by step (`deploy`,
`replica`), the cluster.

### base-app-haicc, base-linux-haicc

**Documentation, done** (2026-11-17): menus with a `howto/`; the app's
command list left to `haicc --help` (its examples), its forms kept; two
how-tos, `output` (whole, raw, output alone, the width) and `flags`
(log, layer, continuation; where a flag list goes); the Linux package's
"Install" a how-to, `install` (downloaded or a folder linked, offline);
"only `haicc sources download bare` reaches the network" corrected: every
download does. And `base-component-boot`'s how-to `boot`, ours of
earlier today, corrected: the machine's `haicc boot/teardown` removes
what the boot put in place, so a boot after it builds anew.

**Tests and examples, later** (`install-tests`): `haicc output <width>`
kept across commands; `sources download bare haiccing` in one command;
`--home` and `--bin` elsewhere; example: an install from the releases.

### The documentation packages

`base-docs-package`, `-uri`, `-xpath`: current. Brought up to date
(2026-11-17): `base-docs-haicc`'s terms (`hook`, `docs mrepo`);
`base-docs-hdlc`'s "Validation" (partial while changes are made, the
human: "Don't always build everything while we are making changes";
everything before a milestone) and "Products" (when the human asks, or
at an agreed milestone); `base-docs-vision`'s "Continuations" (the
scripts settled for base, to build).

### review-code, done (2026-11-17)

- **Boot positions from the structure's documents**: built (`tasks.md`,
  `review-code`). The human, on the key: "kind of folder, so you propose
  to use kind for data structure type? Later down the line this will
  become schema then." Ours: yes, `kind` names the type of the data
  structure at a node, what the position is; a schema, later, describes
  that type (its fields, its check, its AVRO form): the document keeps
  `kind`, its value the schema's name. No rename then.
- **Documents from GitHub**: no change needed. The human: "yes, we work
  airgapped and never install direct from the internet." A principle:
  an install deploys from a sources folder only; a download fills that
  folder. To write into `base-docs-haicc` (after the build running now).
