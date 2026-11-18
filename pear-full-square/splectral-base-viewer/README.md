# splectral-base-viewer

The info viewer: an mrepo's info read by keywords in a browser, as the command line reads it.

Splectral's first component's own code. The browser's path below the
component is the keywords of `info/get`; the page is that command's
answer, drawn with the `ui` element set; the docs mrepo by default, any
mrepo of the install by its position. Offered by
`splectral/base-package-viewer` as the protocol `viewer`, its action
`page`.

## Links

- [external](external/)
- [test](test/)

## Tests

- `brittle-bare test/*.test.js` (Bare installed): the page asked for, its data asked of the platform, drawn with an element.
