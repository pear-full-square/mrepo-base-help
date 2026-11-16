# test/

The tests of mrepo-base-container, a section per file, each test by its name.

They need Docker: a daemon that answers. Where none does, they fail and
say so. The packages are read from the development repository's
`sources/` (or `SOURCES`).

## `container.test.js`

- the config: the five actions, each at the mrepo itself
- the replica an action is about: by the mrepo's unique URI, beside the mrepos; its container's name
- Docker: asked through its command line; a command that fails said, not thrown
- a replica made, started, reached, stopped, started again and removed: a real container
- nothing of a replica left when it cannot be made
