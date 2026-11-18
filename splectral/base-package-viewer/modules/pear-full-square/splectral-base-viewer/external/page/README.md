# page

The info viewer's page: an mrepo's info by keywords, as `haicc <at> info/get <keywords>` answers, drawn with `ui/page`.

The viewer component's own action, run by its renderer for every page the
browser asks of it: the path below the component the keywords, as the
command line has them. `/viewer/hdlc/validation` is `haicc docs info/get
hdlc/validation`, drawn. The docs mrepo is read unless another is asked
for (`?at=host`).

## Signature

`page(exec, { uri, query, base })`: run as the component's page,
`viewer/page <keywords>`.

## Arguments

- `uri`: the keywords, the path below the component; none: the top.
- `query.at`: the mrepo read, by its position from the root; `docs` by
  default.
- `base`: the component's own address, `/<position>`: its links made
  from it.

## Returns

The page, whole (HTML): the keyword's page, each choice a section, the
keywords below each as links to the same view; where it is, from the
top; the command it shows, at the end.

## Errors

- An `at` that is no position: `not an mrepo's position`.
- What the command answered with an error is said on the page, not
  thrown: a page is always drawn.

## Design

- **The data is the platform's**: asked for with `exec.data(at,
  command)`, run as a terminal runs a command; the page is drawn with
  `exec.element('ui/page', ...)`. The action itself is the processing:
  the answer mapped to the element's input.
- **In step with the command line**: the keywords in the address bar are
  those of `info/get`; the page ends with the command it shows.
