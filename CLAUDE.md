# CLAUDE.md — dev-env-3-mycelium

How to work in this repository, for AI use. Keep this file up to date as
the landscape changes: it describes what is here now.

**Read first**, before any work: `haiccing/base-docs-hdlc/README.md`, how
work is done (autonomy, single concern, documentation, validation,
branches, products, scheduled work), and `haiccing/base-docs-haicc/README.md`,
the platform and our terms. They are the rules; this file is what is
only this repository's.

- **The aim:** full AI autonomy, from a need to running software that
  satisfies it. Structure and design are decided with the human, not
  alone; discuss first, write what has settled.

## What is here

Only what is in use. What nothing uses is removed (it stays in the
history, and each package and module has its own repository).

- `haiccing/`: the packages, each at the path of its repository:
  `base-package-runtime`, `-protocol`, `-help`, `-howto`, `-info`,
  `-boot`, `-service`, `-haicc`, `-crud`, `-container`, `-splectral`
  (one package, one protocol); the components `base-component-boot` (the
  boot mrepo and the program that puts it in place), `base-component-haicc`
  (the haicc mrepo, a host or a node) and `base-component-docs` (the docs
  mrepo); `base-app-haicc` (the `haicc` command, an app run with Bare)
  and `base-linux-haicc` (the first step on Linux, sh scripts); the
  documentation packages `base-docs-package` (the package specification,
  compile time and run time; the template a package is brought to, its
  `test/` the generic tests), `base-docs-hdlc`, `base-docs-haicc`,
  `base-docs-uri`, `base-docs-xpath`, `base-docs-vision`.
- `pear-full-square/`: the modules those packages carry, and
  `pkgm-base-manager`, which the tools use.
- `tools/`: today's HDLC tooling (`base-docs-hdlc`, "Tooling"). `sources/`
  and `node_modules/` are ignored by git: a fresh clone needs
  `sh tools/install.sh`, then `tools/bare tools/release.js`.
- `steps/`: the records. Where work stands: `steps/2-rebuild/readme.md`
  and, after a context reset, `steps/2-rebuild/handover-next.md`: how the
  human works with us, what is done, what is open. Scheduled work:
  `steps/2-rebuild/tasks.md`. Designs in discussion:
  `steps/2-rebuild/xpath.md`, `steps/2-rebuild/help.md`. The package
  review: `steps/2-rebuild/review.md`.

## Validation, the commands

The rules are `base-docs-hdlc`'s "Validation"; here, how each is run.

- A package's pre-release: `tools/bare tools/package-test.js haiccing/<package>`.
- Everything: `tools/bare tools/release.js --strict`.
- The checks: `tools/bare tools/info-extract.js` (and `--files`),
  `tools/bare tools/code-check.js`.
- The boot's test, several times:
  `SOURCES=$PWD/sources tools/bare sources/haiccing/base-component-boot.bundle /test/validate`;
  nothing left running after (`pgrep -fa "bin/bare"`).
- The `haicc` command end to end: `sh haiccing/base-linux-haicc/test/run.sh`.
- Docker, for what makes containers: in a cloud session no daemon runs
  when it starts: `sh tools/docker.sh`; no container left after
  (`docker ps -a --filter label=haicc.folder`).
- A new package: the template's "A new package" (`base-docs-package`).

## Execution

- **Product repositories:** a session attaches them and pushes: each
  module's (`sh tools/products.sh <module>...`, from `main`) and each
  package's (`sh tools/packages.sh -m "<what changed>" <package>...`).
  New repositories are created by the human.
- **Planning:** the phase's request comes from `splectrum/roadmap-1`; the
  work is planned here, as it goes, and its outcome reported back.
- In a Claude Code cloud session, execution runs on `execute/main`, merged
  into `main` with a plain merge, both pushed. No commit while a build
  runs over the tree.
