# The pair deploy

Built (2026-11-18) and documented in the packages, where it is kept up to
date from now on (the human, 2026-11-18: "From now on we have to work as
much as possible from the packages, even for documentation that changes
as the implementation progresses"):

- **What it is, and the term**: `base-docs-haicc`, "Levels" (a swarm and
  its nodes) and "Terms" (pair).
- **The folder, the link, who executes what, the rules**:
  `base-docs-package`, `mrepo/`, "The mrepo's folder".
- **The flag**: `base-docs-package`, `mrepo/request/`, "Flags".
- **The code, its signature, what is not yet built**: `mrepo-base-boot`,
  `internal/pair/` ("Not yet"); `external/deploy/`, `external/teardown/`.
- **Its test**: `base-linux-haicc`, `test/pair.sh` (against everything on
  the host) and `test/container.sh` (the install in a container).

How it was decided, the human's words and ours, point by point: this
file's history (`git log -p steps/2-rebuild/pair.md`) and `tasks.md`,
`base-solution-haicc`'s entries of 2026-11-17 and 2026-11-18.
