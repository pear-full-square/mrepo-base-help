# load

Loads a component's packages from its Splectral side: their protocols and actions, and the one that answers its pages.

## Signature

`load(side)`: `side` the component's Splectral side, `<the mrepo's
folder>/splectral`, as `splectral/install` left it: `component.json`,
`packages/`.

## Returns

`{ record, actions, protocols, top }`: what was installed; the actions by
protocol; the protocols' configs; `top`, `{ package, protocol }`, what
answers the pages.

## Errors

- No `component.json`: `no component here`.
- A package of the list with a protocol, its bundle missing.
- None answers pages: `no package of its list answers pages`.

## Design

- **As the runtime loads protocols**: each package of the list with a
  `protocol` entry, its bundle's dispatcher imported, `run('/protocol')`.
  Nothing of haiccing's is loaded: the list is the component's.
- **The pages are the top package's**: the last package of the list with
  a protocol whose actions include `page`, as the last of an mrepo's list
  defines it. The element sets come before it.
