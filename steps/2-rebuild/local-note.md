# The local agent's runs

The prompt for the next local run (below), and the local agent's note on
its last run, a section above it, newest only: the notes of earlier runs,
and the release records, are in git's history. The local machine works
offline: every download kept in a local source (`~/haicc-mirror/`), so
`tools/install.sh` and `tools/release.js` run with no network.

## 2026-11-19: `62af3e4` built, tested, released as `r-62af3e4`

"The next run" (below), step by step.

1. **The clone:** `main` at `62af3e479025ce93714bcc2188f21020a66ed183`.
2. **The dependencies, the sources:** `tools/install.sh` exit 0 ("0
   fetched, 207 kept, 1 linked": `splectral-base-help-viewer`); the
   three gone modules' links removed. `release.js` exit 0:
   `sources/haiccing/` nineteen bundles, `sources/splectral/` one
   (`base-component-help-viewer`), each with its manifest, every entry's
   commit `62af3e4`; `git status` no change.
3. **The checks:** `release.js --strict` exit 0, every report `current`
   (20); `code-check.js` "23 modules, 21 packages: 0 problems";
   `info-extract.js --files` "423 READMEs, 0 problems".
4. **The tests**, nothing left after any (no `bin/bare`, no container):
   - the boot's test: `"ok":true` three times (100, 86, 98 s);
   - `run.sh`: 308/308 three times (362, 363, 362 s);
   - `splectral.sh`: 43/43 three times (70, 70, 69 s). Timings (ms),
     runs 1/2/3: boot 1728/1789/1770, docs 7763/7567/7688, splectral
     14913/14682/14851, base 2531/2506/2412, install 4369/4513/4259,
     initialise 4577/4694/4675, start 3655/3714/3517, stop
     3352/3267/3298, teardown 2300/1781/1860, machine 1037/980/859. A
     page 1162–1360 ms; the answers that need no component (not running,
     not deployed, a 404) 6–9 ms;
   - `container.sh` 18/18 (37 s); `pair.sh` 41/41 (172 s).
5. **Every bundle's own tests:** nineteen haiccing exit 0, `"ok":true`.
   **`splectral/base-component-help-viewer`: failed once**, then passed
   three times out of three (128, 99, 102 s). The failure, in its
   module `splectral-server` (`test/server.test.js:332`, "a component: a
   page asked through its Splectral inbox …"): `actual: 504, expected:
   200` for `/viewer/hdlc/validation?x=1`, so the two asserts after it
   failed too. A margin, not a defect, as I read it: the test serves
   with `wait: 1500`, and the page's round trip passes four folders
   each followed `every: 200` (the component's inbox, its outbox, the
   root's inbox and outbox), so under load it passes 1.5 s; the server's
   own default is 20 s. **Proposal:** the test's `wait` raised (5000)
   with its "not answering" case kept short in a test of its own. The
   same module's tests passed in `haiccing/base-package-splectral`'s
   bundle. Released, as only haiccing's packages are, and the reruns
   passed.
6. **The release `r-62af3e4`**, twenty repositories in `haiccing`, 41
   assets, tag `r-62af3e4` targeting `main`, notes "Built from
   62af3e4…", none a pre-release, each asset's size and digest checked
   on GitHub against what was staged (0 mismatches; `base-docs-xpath`
   needed a second try). The repositories' `main` is as last pushed
   (2026-11-17): their content was not written, as the prompt says.
   The record below.
7. **The release checked**, a fresh temporary install, the prompt's
   commands: the installer from `releases/latest` (sha256 `fbae3513…`);
   the download 272 s, the manifest from `base-docs-haicc`'s latest
   release, all nineteen `fetched (r-62af3e4)`, "downloaded, as its
   manifest says"; `prereq` ok; `boot/deploy`, the docs mrepo,
   `docs info/get hdlc/validation`, `boot/teardown` exit 0; nothing
   left; the folder removed.
8. **For the human:** `haicc` reinstalled from the release's installer
   (`~/.haicc/bin` now as this commit's `base-linux-haicc/bin`; it was
   `r-6b4d346`'s); the sources still this clone's `sources/`. Torn down,
   then the prompt's seven commands, every one exit 0 (docs 5.5 s,
   Splectral 11.4 s, the rest 1.2–3.5 s). **Left running:
   `http://127.0.0.1:4400/`.** In a browser (headless Chromium): the
   `install` and `help` tabs; `/help/` the docs top; `/help/hdlc/validation`
   (0.9 s), light and dark; a keyword below (`/help/hdlc`, `/help/mrepo`);
   the `mrepo` form (`docs`, `read`) and `?at=splectral` answering
   Splectral's own pages; a keyword not there (`/help/no/such/thing`):
   the error, and the nearest keywords now links; a 390 px window.
   The `install` tab in dark: the tree (boot, docs, splectral, help
   started), the help viewer's requests among the commands, an error's
   message in red.

### The release record, `r-62af3e4`

Each asset is downloaded from
`https://github.com/haiccing/<repository>/releases/download/r-62af3e4/<asset>`;
the manifest and the installer also from
`…/releases/latest/download/<asset>` (`base-docs-haicc`'s manifest is
the one `haicc sources download haiccing` reads; `base-linux-haicc`'s
for the installer released before).

| Repository | Asset | Bytes | sha256 |
|---|---|---:|---|
| `base-app-haicc` | `base-app-haicc-addons.tar` | 17,397,760 | `b12456a5bf93a4776212cc1dd8ff58a63322d9fdbf9ecb176aa05876fe8dcea3` |
| `base-app-haicc` | `base-app-haicc.bundle` | 4,400,147 | `aeac98a8518f585416ca9f00a3349f9aca0b8d53e1efb640fbad204692b58ecc` |
| `base-component-boot` | `base-component-boot-addons.tar` | 17,397,760 | `b12456a5bf93a4776212cc1dd8ff58a63322d9fdbf9ecb176aa05876fe8dcea3` |
| `base-component-boot` | `base-component-boot.bundle` | 4,434,336 | `f3b47708dcb3d72b294790ca42e3ff2f2804fcf797b6ca98adbbbd134529d290` |
| `base-component-docs` | `base-component-docs-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-component-docs` | `base-component-docs.bundle` | 1,095,287 | `bfcd16670cd94be6e610607e5fe4c967717b37247ef60791bb8c3f6bc94df07d` |
| `base-component-haicc` | `base-component-haicc-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-component-haicc` | `base-component-haicc.bundle` | 1,104,757 | `5cc4cf5b19e15c878644aa09c3366a2462f015df47a67dc399f330aacbf93bf7` |
| `base-docs-haicc` | `base-docs-haicc-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-docs-haicc` | `base-docs-haicc.bundle` | 1,088,638 | `3fd0f778101d6bb2ddba21f9f7941240c56f41252150fb0c60510425c6308928` |
| `base-docs-haicc` | `manifest.json` | 45,301 | `312d6b917bb8cba539f701428a18cdcfbee9d7d28f30380833028f583ac4df96` |
| `base-docs-hdlc` | `base-docs-hdlc-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-docs-hdlc` | `base-docs-hdlc.bundle` | 1,095,090 | `57729c7e0d692510a4a4a1a059726823e92dab3809722c9fdd55342a905947f6` |
| `base-docs-package` | `base-docs-package-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-docs-package` | `base-docs-package.bundle` | 1,159,584 | `993b1b47f58e5965daa95589b261b7333c1bc069c1fa0997dd9628c9e87a8dd8` |
| `base-docs-uri` | `base-docs-uri-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-docs-uri` | `base-docs-uri.bundle` | 1,085,176 | `d731116ad33c77e0ceaafac86e77589f47c465611c19e2bdc60822947809db89` |
| `base-docs-vision` | `base-docs-vision-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-docs-vision` | `base-docs-vision.bundle` | 1,114,073 | `ebd9a39f100ef20f32ae1e7f35d5973d8664aae3783e0e544adc495236580dd6` |
| `base-docs-xpath` | `base-docs-xpath-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-docs-xpath` | `base-docs-xpath.bundle` | 1,086,108 | `b04682d780241ef28dc65790850d57d38feb8ab58025d45506fd838a32160f05` |
| `base-linux-haicc` | `haicc-install.sh` | 17,862 | `fbae35134db00c8415d6b036113bb34f1ddc7ec71c62dc4ae9b9c08c098ac7b3` |
| `base-linux-haicc` | `manifest.json` | 45,301 | `312d6b917bb8cba539f701428a18cdcfbee9d7d28f30380833028f583ac4df96` |
| `base-package-boot` | `base-package-boot-addons.tar` | 17,397,760 | `b12456a5bf93a4776212cc1dd8ff58a63322d9fdbf9ecb176aa05876fe8dcea3` |
| `base-package-boot` | `base-package-boot.bundle` | 4,400,628 | `805c3bcaccbb32404c1718cb0bc4a661600ff7b892ea93e282127244fc79b3f0` |
| `base-package-container` | `base-package-container-addons.tar` | 17,397,760 | `b12456a5bf93a4776212cc1dd8ff58a63322d9fdbf9ecb176aa05876fe8dcea3` |
| `base-package-container` | `base-package-container.bundle` | 4,439,158 | `596966a05b440528d0a7470b8a42d45a78bc1f93a134ebb87600e4f0d60cfd98` |
| `base-package-crud` | `base-package-crud-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-package-crud` | `base-package-crud.bundle` | 1,213,141 | `effa47017f4448dcb16457c8ef9b9f2214fe152ee7adc2a3b0c5ccaabe8cd762` |
| `base-package-haicc` | `base-package-haicc-addons.tar` | 17,397,760 | `b12456a5bf93a4776212cc1dd8ff58a63322d9fdbf9ecb176aa05876fe8dcea3` |
| `base-package-haicc` | `base-package-haicc.bundle` | 4,049,267 | `05fd50edb8346723b22e8e816f0b0fb485c5fcf8045ab22a558f22eee257d04d` |
| `base-package-info` | `base-package-info-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-package-info` | `base-package-info.bundle` | 1,095,398 | `4b0b5aeb596aa8008302e6cc05d4538fd3f9672f7eb9bae6f31ec1f717512dc4` |
| `base-package-protocol` | `base-package-protocol-addons.tar` | 983,040 | `12dac01c75477fac09c05b130767388f30f5afeb216f0f85ddb72162507ab377` |
| `base-package-protocol` | `base-package-protocol.bundle` | 1,102,235 | `bd5b0e2d582f61db09b626486d635932a2a1c6bc5882917289d31abeac7829e2` |
| `base-package-runtime` | `base-package-runtime-addons.tar` | 17,397,760 | `b12456a5bf93a4776212cc1dd8ff58a63322d9fdbf9ecb176aa05876fe8dcea3` |
| `base-package-runtime` | `base-package-runtime.bundle` | 4,296,648 | `53c49ce0f2581cdf3e60d02de71c56e31b9b9e698c37dc4fe7dc5f8e9b1143c1` |
| `base-package-service` | `base-package-service-addons.tar` | 17,397,760 | `b12456a5bf93a4776212cc1dd8ff58a63322d9fdbf9ecb176aa05876fe8dcea3` |
| `base-package-service` | `base-package-service.bundle` | 4,010,164 | `086ece8aac293d2f84b31db281286066ef5deaa28a603368b51f96249475fcd4` |
| `base-package-splectral` | `base-package-splectral-addons.tar` | 17,397,760 | `b12456a5bf93a4776212cc1dd8ff58a63322d9fdbf9ecb176aa05876fe8dcea3` |
| `base-package-splectral` | `base-package-splectral.bundle` | 4,653,373 | `3a6e5e8cc86233e8a1db5186ea6f8ec177433d6f7b5428bf911d0681049704b4` |

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
