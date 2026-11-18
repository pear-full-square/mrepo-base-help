# For the next session: where step 2 stands

Read, in this order: `CLAUDE.md` (what is here, how to validate); then
`haiccing/base-docs-hdlc/README.md` (how work is done) and
`haiccing/base-docs-haicc/README.md` (the platform and our terms); then
`tasks.md` here (the open scheduled work); then the designs in
discussion: `xpath.md`, `splectral.md`, `distributed-applications.md`.
What is built is documented in the packages; the history is git's.

## Starting a session

A fresh clone has no `node_modules/` and no `sources/` (both ignored by
git), so nothing runs until they are there:

```sh
sh tools/install.sh           # the dependencies, replayed from the lockfile (curl, tar; no npm)
tools/bare tools/release.js   # every package assembled and bundled into sources/, Bare's tarball
```

Then the validation in `CLAUDE.md` works. To see the whole thing run:
`sh haiccing/base-linux-haicc/test/run.sh`.

**Docker**: the container protocol's tests and the `haicc` test's
cluster make real containers. In a cloud session Docker is installed
but no daemon runs when the session starts: `sh tools/docker.sh` starts
it (as root) and waits for it; it does not survive the session's
container. Without a daemon those tests fail, they do not skip.

- **Work on `execute/main`**, merged into `main` with a plain merge, both
  pushed (a cloud session may be given a branch of its own: it is not
  used for the work).
- **The product repositories** are pushed from here, so a cloud session
  attaches them first (`add_repo`, with push): the modules, each
  `pear-full-square/<module>` for a folder of `pear-full-square/`
  (`sh tools/products.sh <module>...`); the packages, each
  `haiccing/<package>` for a folder of `haiccing/`
  (`sh tools/packages.sh -m "<what changed>" <package>...`). Only those
  that changed.
- **A browser**: Chromium and Playwright are installed in a cloud
  session (`require('playwright')`, no install), for a page's
  screenshot (Splectral's, the docs view).
- **Nothing is left running** by the tests. A runtime left over from a
  failed run: `pgrep -fa "bin/bare"`, then stop it by its pid.

## Right now

What is open, all of it in `tasks.md`:

- **With the human next**: Splectral after its proof of concept
  (`splectral.md`, "Open, one at a time"): the family's documentation
  package, the repositories the human creates for the new Splectral
  packages and modules (nothing pushed to them yet), today's page as a
  component, info views on every mrepo.
- **To build**: `base-solution-haicc` (host, docs and Splectral as one
  install); `help-mvp`, step 3 (the flag unit, `help/annotate`,
  `haici/feedback`); `install-tests` with `runnable-howtos`, after the
  proof of concept's fixes (`distributed-applications.md`, "What comes
  of it").
- **The next phase**: the nodes of a swarm finding each other
  (`swarm-cluster`); then `claude-headless` and `dev-on-haicc`.
- **The local agent**: its prompt and its last note, `local-note.md`;
  its instructions, `handover-local.md`.
- **Product repositories**: last pushed 2026-11-17 (the scripts and
  hooks milestone); everything since is in `main` only, not pushed: the
  pair deploy, the runtime's stall report, the documentation offloaded
  into the docs packages, Splectral's proof of concept (its `splectral`
  packages and modules need repositories the human creates). Pushed when
  the human asks (`CLAUDE.md`, "Execution").
- **Designs, for reading and comment**: distributed applications, the doc
  "Distributed applications on haicc"
  (https://claude.ai/artifact/73tvSUZoir4CsYdTCpiVxx), its settled points
  in the vision (`base-docs-vision`, "Distributed applications",
  "Pipelines"); `distributed-applications.md` here.
- **Waiting on the human** (in `tasks.md`): the readings of
  `runnable-howtos` (setting the scene, an intention: a command or
  inferred); the open questions of `distributed-applications.md`.
