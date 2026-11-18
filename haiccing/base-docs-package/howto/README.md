# howto/

How each pattern of the base family is implemented: a how-to a pattern, its steps as typed commands.

A pattern done for the first time gets a how-to, from its proof of
concept, before the implementation; the code check fails on a pattern
implemented with no how-to naming it (`Pattern: <name>`).

## Links

- [package](package/)
- [protocol-package](protocol-package/)
- [component](component/)
- [documentation-package](documentation-package/)
- [app](app/)
- [mrepo-definition](mrepo-definition/)
- [layer](layer/)
- [hooks](hooks/)
- [service](service/)
- [continuation-script](continuation-script/)
- [documents](documents/)
- [program](program/)
- [platform](platform/)

## Written where

Not in an install: in the development repository the packages are built
in, cloned. The packages do not name it, a repository of the moment: ask
whoever runs the install. How work is done there: `hdlc`. Its `haiccing/` holds
the packages, its `pear-full-square/` their modules, its `tools/` what the
how-tos run (`tools/package-template.sh`, `tools/package-test.js`,
`tools/release.js`, run with `tools/bare`). A fresh clone: `sh
tools/install.sh`, then `tools/bare tools/release.js`, which builds
`sources/`, what an install links (`haicc sources link <clone>/sources`).
