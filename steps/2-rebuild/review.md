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
