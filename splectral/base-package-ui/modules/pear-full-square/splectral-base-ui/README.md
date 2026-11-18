# splectral-base-ui

Splectral's first element set, `ui`: the elements a component's pages are drawn with.

An element is a function: data in, a page or a part of one out, its
style with it. It fetches nothing and keeps nothing: the data is the
platform's, the processing the component's. Offered by
`splectral/base-package-ui` as the protocol `ui`, an element an action;
a component's own action calls one by name in its renderer's process.

## Links

- [external](external/)
- [internal](internal/)
- [test](test/)

## Elements

| element | draws | from |
|---|---|---|
| `ui/page` | a whole page: sections in markdown, the keywords below each as links | an info page (`info/get`), or any text |

## Tests

- `brittle-bare test/*.test.js` (Bare installed): the markdown drawn, the page element.
