# base-package-ui

The ui element set, Splectral's first: the elements a component's pages are drawn with.

A Splectral package with UI elements only. A component lists it; the
component's renderer loads it and the component's own action calls an
element by name, `ui/page`, in the renderer's process. An element is a
function: data in, a page or a part of one out, its style with it; it
fetches nothing.

## Links

- [page](modules/pear-full-square/splectral-base-ui/external/page/)
- [howto](howto/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Config

The `ui` protocol's, in `protocol.js`: an element an action.

| element | arguments | draws |
|---|---|---|
| `page` | the page: `{ title, crumbs, sections, error, footer }` | a whole page, its sections in markdown, the keywords below each as links |

## Package

- `protocol.js`: the `ui` element set, its config and its elements,
  from `splectral-base-ui`.
- `main.js`: the dispatcher, the bundle's main, generated.
