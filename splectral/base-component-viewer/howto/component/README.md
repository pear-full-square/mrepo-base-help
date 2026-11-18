# component

A Splectral component: an app, an mrepo Splectral deploys, its packages laid on top, its pages served at its position.

Pattern: splectral-component

A component is a package of the splectral family that is a list: a
renderer, the element sets its pages are drawn with, its own package (a
protocol whose action `page` answers its pages), itself last; and two
hooks, `start` and `stop`, its renderer started and ended. It is
installed in two halves, haicc's then Splectral's.

## Steps

```sh
# cloned from this one (the package how-to); its own package beside it,
# a protocol with the action page (the viewer's a model), its module
cp -a splectral/base-component-viewer splectral/<component>
cp -a splectral/base-package-viewer splectral/<own>
$EDITOR splectral/<component>/mrepo/packages/layer.json
# the check: each pre-release
tools/bare tools/package-test.js splectral/<own> splectral/<component>
# installed on a running Splectral: a plain service-managed mrepo first,
# then the component on top; its service started, its renderer runs
haicc splectral boot/deploy <position> base-package-service
haicc splectral splectral/install <position> splectral/<component>
haicc splectral/<position> service/initialise
haicc splectral/<position> service/start
# its pages: http://127.0.0.1:4400/<position>/
```

## Notes

- **Its list names its own organisation's packages only**:
  `splectral/install` refuses another's.
- **Its own action** (`<protocol>/page`): `page(exec, { uri, query,
  base })`; `exec.data(at, command)` the platform's data, a command as
  typed at a position from the root; `exec.element(name, ...args)` an
  element of a set it lists; it answers the page, HTML.
- **Deploy and teardown**: no upgrade in place. A change is `haicc
  splectral boot/teardown <position>`, then both halves again.
