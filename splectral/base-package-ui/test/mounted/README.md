# test/mounted/

The package's own test: its element set as mounted, each element drawn.

The package's `protocol.js` is what a component's renderer loads. It is
checked here without a renderer.

## What it checks

- **What it provides**: one protocol, `ui`, a function for every element
  configured and no other.
- **Its config, value by value**: the package that brings it; `page`,
  its argument the page.
- **Each element drawn**: `page`, a whole page, its markdown, a keyword
  below; no page refused.
- **Nothing forgotten**: the last test fails when the config names an
  element not drawn here.
