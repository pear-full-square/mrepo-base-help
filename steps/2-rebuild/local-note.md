# The local agent's runs

The prompt for the next local run (below), and the local agent's note on
its last run, a section above it, newest only: the notes of earlier runs,
and the release records, are in git's history. The local machine works
offline: every download kept in a local source (`~/haicc-mirror/`), so
`tools/install.sh` and `tools/release.js` run with no network.

## 2026-11-18: Splectral's proof of concept, `e78c495`, tested

"The next run" (below), test only: no release, no product repository.

1. **The clone:** `main` at `e78c495`.
2. **The dependencies:** `tools/install.sh` exit 0 ("0 fetched, 207
   kept, 3 linked"): the three splectral modules linked.
3. **The sources:** `release.js` exit 0, `sources/haiccing/` nineteen
   bundles, `sources/splectral/` four and its manifest; `git status` no
   change.
4. **Splectral's test, three times:** 38/38 `# ok` each (65, 71, 72 s);
   nothing left (no `bin/bare`, no `/tmp/haicc-splectral.*`); no hang.
   Timings (ms), runs 1/2/3: boot 1395/1969/1818, docs 6387/8583/8508,
   splectral 11930/14488/13372, base 2200/2599/2550, install
   3684/4237/4674, initialise 3896/4697/3746, start 3923/3965/3783, stop
   3605/3753/3765, teardown 2766/1900/1978, machine 878/983/1192. Pages:
   a viewer page 1.2–1.5 s each (1191–1478 ms), the not-running and
   not-deployed answers 8–13 ms.
5. **The other tests:** `run.sh` 303/303 three times (371, 366, 366 s),
   nothing left; `container.sh` 18/18 (40 s), no container left; every
   bundle's `/test/full`, both organisations (23), exit 0, `"ok":true`;
   `release.js --strict` exit 0, every report `current` (23).
6. **By hand**, in the human's install (`~/.haicc`; its sources now this
   clone's `sources/`, the release's `~/.haicc/sources` unlinked, kept):
   the eight commands every one exit 0 (docs 7.7 s, Splectral 15.9 s,
   the rest 1.6–5.4 s). **Left running: `http://127.0.0.1:4400`**, the
   viewer at `/viewer/`. In a browser (Playwright's headless Chromium):
   `/viewer/`, `/viewer/hdlc/validation`, `/viewer/?at=splectral` drawn,
   light and dark, a 390 px window wrapping cleanly; every keyword link
   below `/viewer/` (28), `?at=splectral` (22, `?at` kept) and
   `/viewer/hdlc` (13) answers 200 with no error. Splectral's page `/`:
   the tree (boot, docs, splectral, viewer started) and the viewer's
   data requests among its commands (`haicc docs info/get
   hdlc/validation`, through `local/docs`). `service/stop`: `/viewer/`
   503, "not running: viewer (its service not started? haicc
   splectral/viewer service/start)"; `service/start`: 200 again (0.9 s).
   Small: the not-running page has no dark style.
7. **An AI agent as the viewer's user** (Claude Code headless, an empty
   folder, only `haicc … info/get` and `curl` to the viewer allowed; 157
   s). Its findings, in its words, shortened:
   - "Same text on every page compared": ten keyword sets (root, haicc,
     boot, boot howto, boot howto deploy, hdlc, hdlc validation, hdlc
     branches, its-files, crud) and `splectral info/get` against
     `?at=splectral`: body, order of the choices, below and oneliners
     the same; links to the matching keyword path.
   - Differences: the viewer adds an `<h1>` from the title where a page
     has none ("Validation"); the below entries' `choices` count missing
     in the viewer ("no hint a click opens 3–4 stacked pages"); the
     request record (log, metrics, `remote`) not shown; the footer's
     command slash-joined (`hdlc/validation`), which works.
   - Harder in the browser: "no route from Splectral into the viewer":
     `/` has no link to `/viewer/`, the viewer none back, another
     position only by typing `?at=`; keywords in the text (`xpath`,
     `package howto package`) not links; an error page's nearby keywords
     not links. Harder on the command line: about 30 lines of JSON
     around each answer, the page one string with `\n`, tables raw.
   - Unclear both ways: `haicc/package` three sections all "Package";
     `haicc/test-reports` the same generic text four times.
   - **Broken:** bold that begins with a code span not rendered, the
     `**` shown: `/viewer/haicc` (base-app-haicc, Commands: "**A
     `<protocol>/<action>` without a URI**", "**`haicc scripts`**", …),
     `/viewer/hdlc` and `/viewer/hdlc/branches` ("**`main` holds
     settled state**"). The deploy how-to ends on `haicc host info/get`,
     no host in this install ("no node there"). No dead link found.
   Checked by me: the `**` as reported (`/viewer/hdlc/branches`: `<li>**<code>main</code>
   holds settled state**`); `/` has no link to `/viewer`; an unknown
   keyword's page answers 200 (as the test expects).

## The next run (2026-11-19, from the cloud session): read this first

The prompt for this run, here so it is read with the notes. Write your
own section above this one, as always; this one stays until the next
prompt replaces it.

What it needs on the local machine: as before (Linux x86-64; git, curl,
tar; Docker, its daemon running; `gh`, logged in, allowed to create
releases on `haiccing/*`; a browser for step 6, or Playwright).
**Build, test and release** (the human, 2026-11-19: "leave a note for
local, for doing the build, test and release"): release only once every
test of steps 3 to 5 passed on the commit; the product repositories'
content is not written (the cloud session's, when the human asks).

What is new since the last run (`base-docs-haicc`, "Platforms";
`splectral.md`): three platforms on haicc, each its own organisation,
packages named `<org>/<package>` always (`haicc boot/deploy docs
haiccing/base-component-docs`, the package alone refused); an
organisation's manifest released with its documentation package
(haiccing's on `haiccing/base-docs-haicc`); Splectral's help viewer one
package, `splectral/base-component-help-viewer`, and the Splectral site,
a tab each (`/help/...`).

> Build the sources from `main`, test them, release haiccing's packages,
> and check the release by downloading it into a fresh install.
>
> 1. **Update the clone.** Check out `main` and pull. Write down the
>    commit (`<commit>` below, its first seven characters `<c7>`).
> 2. **Install the dependencies, build the sources.** `sh
>    tools/install.sh` (one module new, `splectral-base-help-viewer`;
>    three gone: their links in `node_modules/` can be removed), then
>    `tools/bare tools/release.js`: `sources/haiccing/` (nineteen
>    bundles), `sources/splectral/` (one, `base-component-help-viewer`),
>    each with its manifest (the commit in every entry is `<commit>`).
>    `git status` must show no change after it; if it does, say so and
>    stop.
> 3. **The checks and the reports.** `tools/bare tools/release.js
>    --strict` (exit 0: every report `current`); `tools/bare
>    tools/code-check.js` and `tools/bare tools/info-extract.js --files`
>    (0 problems each). Do not run `tools/package-test.js`: the reports
>    are the cloud session's.
> 4. **The tests, three times each where said**: the boot's test three
>    times (`SOURCES=$PWD/sources tools/bare
>    sources/haiccing/base-component-boot.bundle /test/validate`, `"ok":true`);
>    `sh haiccing/base-linux-haicc/test/run.sh` three times (308
>    checks), `sh haiccing/base-linux-haicc/test/splectral.sh` three
>    times (43 checks; its timings, a page's above all), `sh
>    haiccing/base-linux-haicc/test/container.sh` and `test/pair.sh` once
>    (18 and 41). Nothing left after each: `pgrep -fa "bin/bare"`, `docker
>    ps -a --filter label=haicc.folder`. A run that hangs: look for
>    `runtime-stall.json` under its temporary folder and copy what it
>    says into your note.
> 5. **Every bundle's own tests**, both organisations:
>    `SOURCES=$PWD/sources tools/bare sources/<org>/<package>.bundle
>    /test/full` (exit 0, last line `"ok":true`; twenty).
> 6. **Release haiccing's packages** (`handover-local.md`, "Releases";
>    only if 3 to 5 passed). For each package in
>    `sources/haiccing/manifest.json`, a release on its own repository,
>    tag `r-<c7>`, target `main`:
>    ```sh
>    gh release create r-<c7> --repo haiccing/<package> --target main \
>      --title "r-<c7>" --notes "Built from <commit>." \
>      sources/haiccing/<package>.bundle [<package>-addons.tar]
>    ```
>    `<package>-addons.tar`: only for a package whose manifest entry
>    names addons; a tar holding `addons/<sha256>` for each of them, from
>    `sources/addons/` (`tar -cf <package>-addons.tar -C sources
>    addons/<sha256>...`). The manifest, `sources/haiccing/manifest.json`,
>    an asset of `haiccing/base-docs-haicc`'s release `r-<c7>`, and, for
>    the installer released before, of a release `r-<c7>` on
>    `haiccing/base-linux-haicc` too, with `haicc-install.sh`
>    (`haiccing/base-linux-haicc/haicc-install.sh`). Mark none a
>    pre-release: `haicc sources download` reads `releases/latest`.
>    Splectral's is not released: its manifest's home,
>    `splectral/base-docs-splectral`, is not created yet.
> 7. **Check the release**: a fresh install in a temporary folder,
>    downloading what you published, then a boot:
>    ```sh
>    T=$(mktemp -d)
>    curl -fsSLO https://github.com/haiccing/base-linux-haicc/releases/latest/download/haicc-install.sh
>    sh haicc-install.sh --home="$T/home" --bin="$T/bin"
>    PATH=$T/bin:$PATH haicc sources download bare haiccing
>    PATH=$T/bin:$PATH haicc prereq
>    PATH=$T/bin:$PATH haicc boot/deploy
>    PATH=$T/bin:$PATH haicc . boot/deploy docs haiccing/base-component-docs
>    PATH=$T/bin:$PATH haicc docs info/get hdlc/validation
>    PATH=$T/bin:$PATH haicc boot/teardown
>    ```
>    Every bundle fetched from `r-<c7>`, checked (sha256), the page
>    answered; nothing left; the folder removed.
> 8. **By hand, for the human** (their install, `~/.haicc`, its sources
>    this clone's `sources/`): tear down what runs (`haicc boot/teardown`),
>    then
>    ```sh
>    haicc boot/deploy
>    haicc . boot/deploy docs haiccing/base-component-docs
>    haicc . boot/deploy splectral haiccing/base-package-splectral --flags continuation=start
>    haicc splectral boot/deploy help haiccing/base-package-service
>    haicc splectral splectral/install help splectral/base-component-help-viewer
>    haicc splectral/help service/initialise
>    haicc splectral/help service/start
>    ```
>    Left running for the human: `http://127.0.0.1:4400/` (the site:
>    `install` and `help` tabs), `/help/hdlc/validation`. A look in a
>    browser: a page, a keyword below, the `mrepo` form (`splectral`),
>    a keyword not there, light and dark.
> 9. **Your note**: a section at the top of this file, as always: the
>    commit, each step's result and timings, and the release record
>    (`handover-local.md`, "Record it": each repository, its tag, its
>    assets with sizes and sha256, the URL each is downloaded from).
>    Commit the note alone to `main` and push.
