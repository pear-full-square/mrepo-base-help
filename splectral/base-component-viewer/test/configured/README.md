# test/configured/

The component's own test: its list and its hooks, without an mrepo, then against the packages it lists.

## What it checks

- **Its list**: the renderer, the element set, the viewer, the component
  last; none of another organisation.
- **Its hooks, file by file**: `start` and `stop`, the renderer started
  and ended where `splectral/install` places it; no other runtime
  config. A hook file not named in the test fails it.
- **The packages it lists**, read from the sources as its renderer
  loads them: each has its bundle; the two protocols they provide, `ui`
  and `viewer`; its pages the viewer's; the renderer a program.

## Sources

`SOURCES`: the sources folder, with the listed packages' bundles. Without
it the test fails.

## Not here

The component installed on a running Splectral, its renderer started by
its hook, a page served: the `haicc` command's end to end test,
`splectral.sh`.
