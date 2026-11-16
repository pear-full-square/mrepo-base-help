# mrepo/

The boot protocol's part of an mrepo's structure: the registry layer.

- **The `registry` layer** (`registry/layer.json`): where `boot/deploy`
  records each mrepo it deploys, a node by the mrepo's unique URI
  (`registry/local/host`), and `boot/teardown` removes it. Empty until
  the first deploy.
