# Prompt for the local agent

Give this to Claude Code on the local machine (Linux x86-64; git, curl,
tar; Docker, its daemon running and the user allowed to use it, for the
nodes' containers; `gh`, logged in, for the releases).
Nothing is signed. This run builds the sources, tests them, then
**releases them** (the human, 2026-11-17: "Local should also build and
push the releases") and tests the install from GitHub. Only the notes
are committed.

> Build the sources locally, test them, release every package on GitHub,
> install from the release, and prepare the human's test session.
>
> 1. **Update the clone.** In your clone of
>    https://github.com/splectrum/splectrum-dev-env-3-mycelium, check out
>    `main` and pull. Write down the commit: it is the one you build,
>    test and release (`<commit>` below, short form).
> 2. **Install the dependencies.** `sh tools/install.sh`, then check that
>    `node_modules/bare-runtime-linux-x64/bin/bare` exists.
> 3. **Build the sources.** `tools/bare tools/release.js`: every
>    package's bundle and the manifest (`sources/haiccing/`, nineteen
>    bundles), the native addons (`sources/addons/`), Bare's tarball
>    (`sources/holepunchto/`), and the installer again,
>    `haiccing/base-linux-haicc/haicc-install.sh`. `git status` must show
>    no change after it; if it does, say so in your note and stop before
>    the release.
> 4. **Run the test of the `haicc` command** three times:
>    `sh haiccing/base-linux-haicc/test/run.sh`. 303 checks; its last
>    lines `# checks = 303/303 pass` and `# ok`. `docker version` must
>    show a server first. Nothing left after each run:
>    `pgrep -fa "bin/bare"`, `docker ps -a --filter label=haicc.folder`.
> 5. **Run the packages' own tests**, each from its bundle, for every
>    bundle in `sources/haiccing/`:
>    `SOURCES=$PWD/sources tools/bare sources/haiccing/<package>.bundle /test/full`
>    (exit 0, last line `"ok":true`). Do not run `tools/package-test.js`:
>    the reports are the cloud session's to commit. Then
>    `tools/bare tools/release.js --strict`: every report `current`; say
>    in your note if one is not.
> 6. **The docs view**: `tools/bare tools/info-view.js` deploys the docs
>    mrepo in a transient install and writes `sources/info-view.html`, one
>    page to browse every package's info by keywords. It must end with
>    `"problems":0` and leave nothing running. Keep the page for the
>    human.
> 7. **Release**, only when 4 and 5 passed on `<commit>`. As
>    `steps/2-rebuild/handover-local.md`, "Releases", and as you did for
>    `r-46a3b3f` (`local-run.md`):
>    - the package repositories are already written from `main`
>      (`tools/packages.sh`, by the cloud session); run it again only if
>      `<commit>` changed a package, and say so;
>    - a release `r-<commit>` on each package's repository
>      (`github.com/haiccing/<package>`), its tag at that repository's
>      `main`: its bundle, its manifest entry, its addons, as `sources/`
>      holds them; `base-linux-haicc`: `haicc-install.sh` and
>      `manifest.json` (the sources' `haiccing/manifest.json` as it is),
>      marked latest. Sizes and digests on GitHub checked against the
>      local files.
>    - The packages are not those of `r-46a3b3f`: the docs packages are
>      now `base-docs-*` and `base-component-docs`, with bundles; there is
>      no `base-package-help`, `base-package-howto`, `package-docs-mrepo`
>      or `package-docs-package` any more (the info protocol replaced help
>      and howto). Release only what the manifest names. Say in your note
>      which old repositories are left without a current release, for the
>      human to decide on.
>    - Record it in `local-run.md`, a new section at the top: the commit,
>      each repository, its tag, its assets with sizes and sha256.
> 8. **Install from GitHub**, in a clean temporary folder
>    (`--home=` and `--bin=` there), the steps of the how-to `install`
>    (`haiccing/base-linux-haicc/howto/install/`) as written: the
>    installer from the latest release, `haicc sources download bare
>    haiccing`, `haicc prereq`, `haicc boot/deploy`, `haicc . boot/deploy
>    host base-component-haicc --flags continuation=cluster`,
>    `haicc boot/teardown`. Every command exit 0; nothing left; the
>    folder removed.
> 9. **Install it for the human**, in their home folder, from the release:
>    `haicc-install.sh` from the latest release, `haicc sources download
>    bare haiccing`, `haicc prereq` (every line `ok`). If an earlier
>    install is there or left a boot mrepo running, say so and leave it:
>    `haicc boot/teardown` with the old `haicc` is the human's (no upgrade
>    in place). Do not run `haicc boot/deploy`: that is the human's.
> 10. **Tell the human** it is ready: what 4, 5 and 6 printed last, the
>    release, where `haicc` was registered, the docs view
>    (`sources/info-view.html`), and the test session below.
> 11. **Write a note back** in `steps/2-rebuild/local-note.md`: a new
>    section at the top, dated, naming `<commit>`: what ran, each result,
>    anything that did not run as written and why (a proposal and a patch
>    if you have one). Commit only `local-note.md` and `local-run.md` on
>    `execute/main`, merge into `main` (a plain merge), push both.
>
> Do not change the code: report, and propose.

## The human's test session: what to cover

What is new since the last local run (`61314e0`), each to try by hand,
in this order. A URI has no leading slash: `.` is the root (the boot
mrepo), `host` the position `host`.

1. **Install and boot**, from the release (above): `haicc boot/deploy`;
   `haicc . boot/deploy host base-component-haicc --flags
   continuation=start` (the host deployed, then its service initialised
   and started, each command shown as it runs).
2. **The info protocol**, which replaced help and howto: `haicc . info/get`,
   `haicc . info/get boot`, `haicc . info/get boot/deploy`, `haicc host
   info/get`; keywords from the top down, each answer a page and the
   keywords below it.
3. **The docs mrepo**, the install's manual: `haicc . boot/deploy docs
   base-component-docs`, then `haicc docs info/get` (every package the
   sources hold, documented); and the same as one page,
   `sources/info-view.html`, in a browser.
4. **Hooks**: the service's transitions run their hooks, `.haicc` files,
   one command a line, as the mrepo's own requests: watch
   `haicc host service/stop` and `service/start` (a few seconds each:
   their cost is noted, a cheaper request pipeline moved back).
5. **Scripts**: lines run where the URI points, each after the one
   before, the first that fails ending it:
   `haicc host haicc/script . 'crud/create notes/a
   crud/read notes/a'`; at a position, `haicc host haicc/script notes
   'crud/read a'`; from stdin, a heredoc:
   `haicc host haicc/script . <<'EOF'` … `EOF`; a line that fails (its
   number said, exit 1).
6. **The install's scripts**: a file `~/.haicc/scripts/<name>.haicc`
   (lines as above, `#` comments); `haicc scripts` lists them;
   `haicc host haicc/file . <name>` runs one at the host. A package's
   scripts would go in `~/.haicc/scripts/<org>/<package>/`.
7. **The registry reference**: `haicc registry/local crud/read "*"` (the
   local mrepos), `haicc registry/local/host crud/read .` (the host by its
   reference, wherever it is linked).
8. **A swarm and its nodes**: a swarm is a node whose document says so,
   `haicc host crud/create swarms/swarm-1 '{"kind":"swarm"}'`; or all of
   it at once, the component's script, `haicc . boot/deploy host
   base-component-haicc --flags continuation=cluster` (after `haicc
   boot/teardown` and `haicc boot/deploy`, the host not there yet: a
   swarm of two nodes, each with its replica in a container; `docker
   ps`); `haicc host/swarms/swarm-1/node-1/container crud/read .`
   answered from inside a container.
9. **Splectral**, to watch the commands arrive: `haicc . boot/deploy
   splectral base-package-splectral --flags continuation=start`, then
   `haicc splectral splectral/status` for the page's URL.
10. **The log and flags**: `haicc host crud/read . --flags log=verbose`,
   `haicc --flags log=debug -- host crud/read .`, the request records:
   `haicc host crud/read "done/*" --flags layer=request`.
11. **Teardown**: `haicc boot/teardown` (every runtime stopped, the
   containers removed; the scripts and the sources kept).

Write down anything surprising: what was said, what was expected. The
findings come back to the cloud session as before.
