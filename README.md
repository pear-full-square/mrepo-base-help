# dev-env-3-mycelium

The development environment for the third development phase of
SPLectrum: mycelium repositories on a swarm, on the HAICC platform.

- `haiccing/`: the packages, each at the path of its repository.
- `pear-full-square/`: the modules the packages carry, each at the path of
  its repository.
- [tools/](tools/): assembling, bundling and testing packages, bringing
  one to the package template, the release into the local sources, the
  product repositories, the checks.
- The documentation is in the documentation packages, `haiccing/base-docs-*`:
  how work is done (`base-docs-hdlc`), the platform (`base-docs-haicc`),
  a package and its mrepo (`base-docs-package`), URIs (`base-docs-uri`),
  queries (`base-docs-xpath`), the vision (`base-docs-vision`).
- `steps/`: the records of the work; where it stands:
  `steps/2-rebuild/readme.md`.

Only what is in use is kept here: what is not is in the history and in
each module's own repository. `CLAUDE.md` says how the work is done.
Seeded from `splectrum/dev-env-2-p2p-cluster@c6b73bb`.
