# base-package-viewer

The info viewer: an mrepo's info read by keywords in a browser, as the command line reads it.

The viewer component's own package. Its protocol, `viewer`, answers the
component's pages: the browser's path below the component is the
keywords of `info/get`, the page that command's answer, drawn with the
`ui` element set. The docs mrepo is read unless another is asked for:
`/viewer/hdlc/validation` is `haicc docs info/get hdlc/validation`;
`/viewer/service?at=host` is `haicc host info/get service`.

## Links

- [page](modules/pear-full-square/splectral-base-viewer/external/page/)
- [test](test/)
- [test-reports](test-reports/)
- [modules](modules/)

## Config

The `viewer` protocol's, in `protocol.js`.

| action | offered at | arguments |
|---|---|---|
| `page` | any keywords below the component | none; `?at=<position>` the mrepo read, `docs` by default |

## Package

- `protocol.js`: the `viewer` protocol, its config and its action, from
  `splectral-base-viewer`.
- `main.js`: the dispatcher, the bundle's main, generated.
