# The local agent's runs

The prompt for the next local run (below), and the local agent's note on
its last run, a section above it, newest only: the notes of earlier runs,
and the release records, are in git's history. The local machine works
offline: every download kept in a local source (`~/haicc-mirror/`), so
`tools/install.sh` and `tools/release.js` run with no network.

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
>    haicc . boot/deploy docs base-component-docs
>    haicc . boot/deploy splectral base-package-splectral --flags continuation=start
>    haicc splectral splectral/status          # the server's URL
>    haicc splectral boot/deploy viewer base-package-service
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
