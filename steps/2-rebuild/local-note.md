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

## The next run (2026-11-18, from the cloud session): read this first

The prompt for this run, here so it is read with the notes. Write your
own section above this one, as always; this one stays until the next
prompt replaces it.

What it needs on the local machine: as before (Linux x86-64; git, curl,
tar; Docker, its daemon running; a browser for step 6, or Playwright).
**Test only** (the human, 2026-11-18: "test only"): no release, no
product repository written; only the notes are committed.

What is new: Splectral's proof of concept (`base-docs-haicc`, "Levels";
`splectral.md`, the design): Splectral an app platform, a component an
mrepo it deploys in two halves, the info viewer's pages in a browser as
`haicc docs info/get` answers on the command line; a second
organisation, `splectral/`, its packages built beside haiccing's.

> Build the sources from `main`, test them, try Splectral's component
> by hand, and have an AI agent compare the viewer with the command line.
>
> 1. **Update the clone.** Check out `main` and pull. Write down the
>    commit (`<commit>` below).
> 2. **Install the dependencies.** `sh tools/install.sh`; three modules
>    are new (`splectral-base-renderer`, `splectral-base-ui`,
>    `splectral-base-viewer`: links in `node_modules/`, nothing to fetch).
> 3. **Build the sources.** `tools/bare tools/release.js`: now two
>    organisations, `sources/haiccing/` (nineteen bundles) and
>    `sources/splectral/` (four: `base-package-renderer`,
>    `base-package-ui`, `base-package-viewer`, `base-component-viewer`),
>    each with its manifest. `git status` must show no change after it;
>    if it does, say so and stop.
> 4. **Splectral's test, three times**:
>    `sh haiccing/base-linux-haicc/test/splectral.sh` (38 checks; its
>    last lines `# checks = 38/38 pass`, `# ok`, and its timings: write
>    them down, a page's time above all). Nothing left after each run:
>    `pgrep -fa "bin/bare"`. **A run that hangs**: do not stop it at
>    once; look for `runtime-stall.json` under its temporary folder
>    (`/tmp/haicc-splectral.*`; `--keep` keeps it) and copy what it says
>    into your note: a component that stops answering may be the open bug
>    (`tasks.md`, "A runtime that stops taking its inbox in").
> 5. **The other tests**: `sh haiccing/base-linux-haicc/test/run.sh`
>    three times (its count and `# ok`), `sh
>    haiccing/base-linux-haicc/test/container.sh` once; every package's
>    own tests from its bundle, both organisations:
>    `SOURCES=$PWD/sources tools/bare sources/<org>/<package>.bundle
>    /test/full` (exit 0, last line `"ok":true`); then `tools/bare
>    tools/release.js --strict` (every report `current`). Do not run
>    `tools/package-test.js`: the reports are the cloud session's.
> 6. **By hand, as the human would** (an install left running for the
>    human, its URL in your note):
>    ```sh
>    haicc boot/deploy
>    haicc . boot/deploy docs haiccing/base-component-docs
>    haicc . boot/deploy splectral haiccing/base-package-splectral --flags continuation=start
>    haicc splectral splectral/status          # the server's URL
>    haicc splectral boot/deploy viewer haiccing/base-package-service
>    haicc splectral splectral/install viewer splectral/base-component-viewer
>    haicc splectral/viewer service/initialise
>    haicc splectral/viewer service/start
>    ```
>    Then in a browser: `<URL>/viewer/`, `<URL>/viewer/hdlc/validation`,
>    `<URL>/viewer/?at=splectral`; the keywords below a page followed;
>    light and dark; a narrow window. And Splectral's own page, `<URL>/`:
>    the viewer's data requests are among its commands. Stop and start
>    the viewer's service (`haicc splectral/viewer service/stop`): its
>    pages say it does not run, then answer again.
> 7. **An AI agent as the viewer's user** (Claude Code headless, as for
>    the docs review): give it the running install and ask it to answer
>    three questions of its own choosing about the platform twice, once
>    with `haicc docs info/get <keywords>` only, once through the viewer
>    only (`curl <URL>/viewer/<keywords>`, or a browser): is what a person
>    sees the same as what the command line answers, page for page; what
>    is missing or harder in the browser; what is broken. Its findings,
>    in its words, into your note.
> 8. **Your note**: above this section, as always: the commit, each step
>    passed or not with its output's last lines, the timings, the URL of
>    the install left running, the agent's findings. Commit the note to
>    `main` and push.
