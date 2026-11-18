# The docs reviewed by an AI agent as their user

## 2026-11-18, `6b4d346` (release `r-6b4d346`)

"The next run" (`local-note.md`, 2026-11-17), step 10. The reviewer: a
fresh agent with no knowledge of the code or of this repository, given
only a temporary install from the release (`--home=`/`--bin=` in a
temporary folder; the sources linked from a folder holding the release's
downloaded files, the network here slow) and the rule: `haicc --help`,
`haicc <URI> info/get [keywords]`, command output; no repository, no
source code, no `steps/`. Its eleven tasks done by what the docs said,
the commands run; torn down after (nothing left, the folder removed).
Findings 1 and 3 checked again by the local agent in another temporary
install: as reported.

### Verdict

All eleven tasks reached from haicc's own docs. The how-tos are the
strong part: their steps ran as written (but one, finding 1), and the
"no X here: nearest …, below it …" errors recover well. Weak: three
pages contradict each other on what a continuation script is; one
how-to command is wrong; the docs mrepo is advertised in `--help` but
not deployed, with no word there on how; the request log cannot be
found by the words an agent tries; the package how-tos only work inside
a development repository they never name.

### Findings, most blocking first

1. **The Splectral how-to's command fails.** `docs info/get splectral
   howto watch` and the signature `splectral/start [<port>]`:
   `haicc splectral splectral/start 4401` → `haicc: not offered:
   splectral start at 4401` (exit 1): the port is taken as the target
   URI. `splectral/start . 4401` works. While the server runs, a start
   answers the old URL; the port changes only after `splectral/stop .`.
   **Proposal:** the signature `splectral/start . [<port>]`, the how-to
   stopping first; say once (`--help`, the URI page) that an action's
   first argument is its target URI.
2. **A continuation script, three ways.** `--help`:
   "continuation=<script> … run here with sh, HAICC_AT its position";
   `docs info/get boot deploy`: "shell text, read from the package's
   bundle (`scripts/<script>.sh`) … (`HAICC_AT`)"; `docs info/get
   package` (the structure table): "`scripts/` … (`<name>.json`)". What
   runs (and `package howto continuation-script` says): `scripts/<name>
   .haicc`, sent as `haicc/script` (output `[{"line":"service/initialise",
   …}]`). **Proposal:** `.haicc` and `haicc/script` everywhere; sh and
   `HAICC_AT` gone.
3. **The docs mrepo advertised, not deployed.** `--help` ends "the
   platform's documentation: haicc docs info/get"; after the boot:
   `haicc: haicc docs: no node there` (exit 1). Its deploy is only in
   `. info/get howto docs`; that page and base-component-docs's say it
   is deployed "as part of the boot install": it is not. **Proposal:**
   the deploy command in `--help` (`haicc . boot/deploy docs
   base-component-docs`), the error pointing to it; or deploy it with
   the boot, as the pages say.
4. **The request log not found by keyword.** `docs info/get log`,
   `request`, `changed`, `runtime log`: "no … here". The answer is
   three levels down (`package mrepo request`, `a-request`); the working
   query only a `--help` example. **Proposal:** a top keyword or how-to
   `log`: a request's record, its log, `request.changed`, with the
   query, e.g. `crud/read "done/*[…]/value/value/log[event=
   'request.changed']" --flags layer=request`.
5. **The package how-tos assume the development repository, unnamed.**
   `docs info/get package howto package` and `protocol-package`:
   `cp -a haiccing/<candidate>`, `sh tools/package-template.sh`,
   `tools/bare tools/package-test.js`, `pear-full-square/<module>`; only
   `hdlc tooling` says "the development repository's `tools/`", and no
   page says what it is or where to get it. An agent with haicc alone
   stops here. **Proposal:** a page "where packages are written" (the
   repository, its clone, `install.sh`, the tools), linked from
   `package howto`.
6. **A package's scripts not runnable by name.** `haicc host haicc/file
   . haiccing/base-component-haicc/start` → `no script …
   (…/home/scripts/haiccing/base-component-haicc/start.haicc)` (exit 3);
   `haicc scripts` prints nothing, `<home>/scripts` is not there. The
   script how-to's example `haiccing/base-component-haicc/node` is in no
   scripts table. A user's own script (`<home>/scripts/check.haicc`)
   worked. **Proposal:** say how a package's scripts reach
   `<home>/scripts` (or drop the example), and that the user makes the
   folder.
7. **"boot/teardown", two commands.** The replica how-to: "`boot/
   teardown` does not know of containers"; the machine level's `haicc
   boot/teardown` removed them (`"containers":2`). **Proposal:** name
   which one the page means (the mrepo's `. boot/teardown <position>`).
8. **The registry page and what it lists.** `. info/get howto registry`:
   every mrepo "it or its children deployed"; with swarm-1's two nodes
   running, `crud/read "registry/*/*"` listed only `local/docs` and
   `local/host`. **Proposal:** correct the sentence, or say where the
   nodes are registered.
9. **`package` and `haicc` ambiguous in the docs mrepo.** `docs info/get
   package`: two pages, the first base-component-docs's own two-line
   "## Package" section, the specification second; `docs info/get
   haicc`: four whole pages (~1,500 words); the `package mrepo` menu
   lists `package/mrepo/packages` twice. **Proposal:** a section's title
   not competing with a package's keyword; the duplicate merged.
10. **Output hard to take in.** `haicc boot/deploy`: one JSON line with
    every addon's hash (~20 KB); `--output` of a deploy with a
    continuation: two JSON documents (a JSON parser: "Extra data");
    pages come as JSON strings even with `--output`. **Proposal:** a
    summary for `boot/deploy`, the two documents said, a page printed as
    text.
11. **Exit codes off the table.** `haicc host nosuch/thing` exits 1 (the
    table: 2, not a command); `haicc host` exits 2, "no command 'host'",
    no hint to add `<protocol>/<action>`.
12. **Small.** `--help`'s `boot/deploy node-1 base-package-runtime`
    against the how-to's `swarms/swarm-1/node-1 base-component-haicc`
    (both work); `crud read` names `mycelium-xpath`, a module, not the
    keyword `xpath`; `docs info/get howto`: nothing (no how-to index at
    the top of the docs mrepo).

### Per task

1. **Install and boot: yes.** The setup, `--help`, `haicc boot/deploy`;
   `. info/get`, the boot how-to at `. info/get howto boot`.
2. **A host in service: yes.** `. info/get howto deploy`, four
   commands, each exit 0.
3. **A node and a command to it: yes.** `docs info/get haicc howto
   deploy`; `--help`'s variant worked too.
4. **A swarm of two, with containers: yes.** The replica how-to for
   node-1, node-2 by a heredoc script; the one command
   (`--flags continuation=cluster`, 74 s); the containers running.
5. **A record by query: yes.** `docs info/get xpath`, `crud read`,
   `howto registry`: `crud/read "registry/local/*[runtime/pid]/uri"`,
   `swarms/*[kind='swarm']`; `name()` in a step refused ("bad segment
   'name()'"), consistent with the page (a filter function only).
6. **Scripts: partly.** `haicc/script` with a heredoc first time; from
   a file: a package's scripts failed (6), the user's own worked.
7. **The log and what changed: partly.** Through `--help`'s example,
   not by keywords (4).
8. **The actions offered: yes.** `haicc host info/get` the protocols,
   each page's Config table; `crud/read "*" --flags layer=protocols`
   the live set; errors name the alternatives (`no action: crud frob
   (create, delete, read)`).
9. **Splectral: yes, one failure.** `docs info/get splectral howto
   watch`; `splectral/status` → `http://127.0.0.1:4400`, the page 200;
   another port as written failed (1).
10. **Teardown: yes.** `container/remove` twice, `. boot/teardown host`,
    `haicc boot/teardown`.
11. **A package of one's own: no, from outside.** `docs info/get
    package howto`: eleven pattern how-tos, clear in themselves, all
    needing the unnamed repository (5).

The docs mrepo found through `. info/get howto`, then `docs`; deployed
and used as the main source.

### The docs as a whole

- **Finding things:** the top-down menus with their one-liners work; the
  "nearest … below it" errors are the best part. Missing at the top: the
  words an agent tries first, `log`, `request`, `scripts`, `howto` (in
  the docs mrepo); `package` and `haicc` collide.
- **Correctness:** the continuation (2), Splectral's start (1), the docs
  mrepo "part of the boot install" (3), the registry's scope (8), the
  teardown and containers (7).
- **Completeness:** an action's page (Signature, Arguments, Returns,
  Errors) good for crud, script, deploy. Missing: the target URI first,
  a page on the request log, where `<home>/scripts` comes from, a page
  as text.
- **Terms:** the haicc Terms good; "boot/teardown" two things,
  "continuation" three.
- **Size:** most pages 300–1,000 words; too much at once: `docs info/get
  haicc` (four pages), `package` (~2,000 words), `vision` (~3,300).
- **Consistency:** `--help` and the how-tos agree on most commands; not
  on the continuation (sh against `.haicc`) and the node's example.
