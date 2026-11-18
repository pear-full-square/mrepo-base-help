# test/mounted/

The package's own test: its protocol as mounted, its action run as the renderer runs it.

The package's `protocol.js` is what the viewer component's renderer
loads. It is checked here without a renderer.

## What it checks

- **What it provides**: one protocol, `viewer`, a function for every
  action configured and no other.
- **Its config, value by value**: the package that brings it; `page`,
  any keywords below the component, no argument.
- **Its action**, on a minimal execution as the renderer hands one (its
  data and its element stand-ins): the keywords asked of the docs mrepo,
  drawn with `ui/page`; another mrepo; an error drawn, not thrown.
- **Nothing forgotten**: the last test fails when the config names an
  action not run here.
