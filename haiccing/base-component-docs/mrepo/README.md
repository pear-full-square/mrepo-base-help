# mrepo/

The component's part of the structure: the list of the packages the docs mrepo is made of, and its runtime config.

- **Its packages** (`packages/layer.json`): the runtime, the protocol
  protocol, the info protocol, the documentation packages, and this
  component last.
- **Its runtime config**: its hooks, below. No service state: the docs
  mrepo is not service managed.
- **Nothing else**: no data. `main` stays empty.

## Runtime config

With no service, everything hangs on `boot`, which its runtime fires
each time it starts:

- `info` and `runtime` activated: the docs mrepo answers `info/get`.
- Its info extracted: the documentation packages' pages, by keywords.

Runtime config is laid in from the last package of a list only, the one
that defines the mrepo. So the component states its own in full.
