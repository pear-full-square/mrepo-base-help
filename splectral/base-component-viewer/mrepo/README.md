# mrepo/

The component's part of the structure: its list of packages, and the runtime config laid on top of its mrepo.

- **Its packages** (`packages/layer.json`): the renderer, the `ui`
  element set, the viewer's own package, this component last; all of
  the `splectral` organisation, placed on the mrepo's Splectral side, not
  in its `packages` layer.
- **Its runtime config**: its hooks, below, laid by the mrepo itself
  (`runtime/lay`).

## The base

What it is laid on top of, `base-package-service`, brings `boot` and
`initialise`; this brings `start` and `stop` and replaces nothing. No
haiccing runtime loads its packages.

## Runtime config

- `start`: the renderer started beside the mrepo, `runtime/start .
  splectral/packages/splectral/base-package-renderer`: from then on the
  component answers its pages.
- `stop`: the renderer ended, `runtime/stop` of the same.
