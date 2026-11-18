# page

Draws a whole page: its sections in markdown, the keywords below each as links.

The `ui` element set's first element. An element is a function: data in,
a page (or part of one) out, its style with it; it fetches nothing. A
component's own action calls it, in the renderer's process, by name:
`ui/page`.

## Signature

`page(exec, { args })`: called as the element `ui/page`.

## Arguments

1. The page: `{ title, crumbs, sections, error, footer }`.
   - `crumbs`: `[{ label, href }]`, where the page is, from the top.
   - `sections`: `[{ title, markdown, below }]`; `below` the keywords
     under it, `[{ label, href, oneliner }]`.
   - `error`: said above the sections.
   - `footer`: a line of markdown at the end.

## Returns

The page, whole: HTML, its style in it; light and dark follow the
browser; nothing loaded from elsewhere.

## Errors

No page given: `missing argument: page`.
